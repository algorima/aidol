"""
Chatroom API router

Implements BaseCrudRouter pattern for consistency with aioia-core patterns.
"""

import logging
from typing import Annotated

from aioia_core.auth import UserInfoProvider
from aioia_core.errors import ErrorResponse
from aioia_core.fastapi import BaseCrudRouter
from aioia_core.settings import JWTSettings, OpenAIAPISettings
from fastapi import APIRouter, Cookie, Depends, HTTPException, status
from humps import camelize
from litellm.exceptions import BadRequestError, RateLimitError, ServiceUnavailableError
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import Session, sessionmaker

from aidol.context import MessageContextBuilder, Persona
from aidol.prompts import CHAT_PROMPT, GREETING_PROMPT
from aidol.protocols import (
    ChatroomRepositoryFactoryProtocol,
    ChatroomRepositoryProtocol,
    CompanionRepositoryFactoryProtocol,
)
from aidol.providers.llm import GeminiLLMProvider, LLMProvider, OpenAILLMProvider
from aidol.providers.llm.messages import (
    AIMessage,
    HumanMessage,
    LLMMessage,
    SystemMessage,
)
from aidol.schemas import (
    Chatroom,
    ChatroomCreate,
    ChatroomUpdate,
    Companion,
    CompanionMessageCreate,
    Message,
    MessageCreate,
    MessageCreateWithAnonymousId,
    ModelSettings,
    SenderType,
)
from aidol.services import ResponseGenerationService
from aidol.settings import Settings

# Maximum number of messages to fetch for conversation history
DEFAULT_HISTORY_LIMIT = 200
KST_TIMEZONE_NAME = "Asia/Seoul"
FIRST_RESPONSE_ALREADY_EXISTS_CODE = "FIRST_RESPONSE_ALREADY_EXISTS"
FIRST_RESPONSE_ALREADY_EXISTS_DETAIL = (
    "Initial response already exists for this chatroom."
)
logger = logging.getLogger(__name__)


class ChatroomSingleItemResponse(BaseModel):
    """Single item response for chatroom."""

    data: Chatroom


class GenerateResponse(BaseModel):
    """Response schema for generate_response endpoint."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    message_id: str = Field(..., description="Message ID")
    content: str = Field(..., description="AI response content")


def _to_llm_messages(messages: list[Message]) -> list[LLMMessage]:
    """Convert Message schemas to LLMMessage format.

    Args:
        messages: List of Message from repository.

    Returns:
        List of LLMMessage (HumanMessage or AIMessage).
    """
    result: list[LLMMessage] = []
    for msg in messages:
        if msg.sender_type == SenderType.USER:
            result.append(HumanMessage(content=msg.content))
        else:
            result.append(AIMessage(content=msg.content))
    return result


def _resolve_llm_status_code(exc: Exception) -> int:
    """Resolve HTTP status code from provider exception."""
    status_code = getattr(exc, "status_code", None)
    if isinstance(status_code, int) and 400 <= status_code <= 599:
        return status_code
    return status.HTTP_500_INTERNAL_SERVER_ERROR


class ChatroomRouter(
    BaseCrudRouter[Chatroom, ChatroomCreate, ChatroomUpdate, ChatroomRepositoryProtocol]
):
    """
    Chatroom router with custom message endpoints.

    Extends BaseCrudRouter for consistent architecture pattern.
    Disables default CRUD endpoints and provides custom message endpoints.
    """

    def __init__(
        self,
        model_settings: Settings,
        openai_settings: OpenAIAPISettings,
        companion_repository_factory: CompanionRepositoryFactoryProtocol,
        **kwargs,
    ):
        super().__init__(**kwargs)
        self.model_settings = model_settings
        self.openai_settings = openai_settings
        self.companion_repository_factory = companion_repository_factory

    def _get_companion_or_404(
        self, db_session: Session, companion_id: str
    ) -> Companion:
        """Get companion by id or raise HTTP 404."""
        companion_repository = self.companion_repository_factory.create_repository(
            db_session
        )
        companion = companion_repository.get_by_id(companion_id)
        if companion is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Companion with id {companion_id} not found",
            )
        return companion

    def _get_history_messages(
        self, repository: ChatroomRepositoryProtocol, chatroom_id: str
    ) -> tuple[list[Message], list[LLMMessage]]:
        """Load chatroom history and convert it to chronological LLM messages."""
        messages = repository.get_messages_by_chatroom_id(
            chatroom_id=chatroom_id,
            limit=DEFAULT_HISTORY_LIMIT,
            offset=0,
        )
        llm_messages = _to_llm_messages(list(reversed(messages)))
        return messages, llm_messages

    def _build_persona(self, companion: Companion) -> Persona:
        """Create persona for response generation (KST fixed for MVP)."""
        return Persona(
            name=companion.name,
            timezone_name=KST_TIMEZONE_NAME,
            # K-pop domain fields
            gender=companion.gender,
            position=companion.position,
            grade=companion.grade,
            biography=companion.biography,
            # MBTI scores
            mbti_energy=companion.mbti_energy,
            mbti_perception=companion.mbti_perception,
            mbti_judgment=companion.mbti_judgment,
            mbti_lifestyle=companion.mbti_lifestyle,
            # Extension prompt (if any)
            system_prompt=companion.system_prompt,
        )

    def _resolve_runtime(
        self,
        item_id: str,
        companion_id: str,
    ) -> tuple[LLMProvider, str, str, ModelSettings]:
        """Resolve provider/runtime settings for response generation."""
        chat_model = (
            self.model_settings.gemini_model or self.model_settings.openai_model
        )
        if self.model_settings.gemini_model:
            provider: LLMProvider = GeminiLLMProvider()
            provider_name = "gemini"
            reasoning_effort = self.model_settings.gemini_reasoning_effort
        else:
            provider = OpenAILLMProvider(settings=self.openai_settings)
            provider_name = "openai"
            reasoning_effort = None

        logger.info(
            "Using chat model | chatroom_id=%s companion_id=%s provider=%s model=%s reasoning_effort=%s",
            item_id,
            companion_id,
            provider_name,
            chat_model,
            reasoning_effort,
        )
        model_settings = ModelSettings(
            chat_model=chat_model,
            reasoning_effort=reasoning_effort,
        )
        return provider, provider_name, chat_model, model_settings

    def _generate_response_text(
        self,
        item_id: str,
        companion_id: str,
        persona: Persona,
        llm_messages: list[LLMMessage],
        purpose_prompt: str,
    ) -> str:
        """Generate response text from LLM with shared logging/error handling."""
        provider, provider_name, chat_model, model_settings = self._resolve_runtime(
            item_id=item_id,
            companion_id=companion_id,
        )

        context = (
            MessageContextBuilder(provider, persona)
            .with_persona()
            .with_real_time_context()
            .with_purpose_prompts([SystemMessage(content=purpose_prompt)])
            .with_current_conversation(llm_messages)
            .build()
        )
        service = ResponseGenerationService(provider, model_settings)
        try:
            return service.generate_response(context)
        # Catch expected LLM provider failures only.
        except (BadRequestError, RateLimitError, ServiceUnavailableError) as exc:
            status_code = _resolve_llm_status_code(exc)
            logger.error(
                "AI response generation failed | chatroom_id=%s companion_id=%s provider=%s model=%s status_code=%s error=%s",
                item_id,
                companion_id,
                provider_name,
                chat_model,
                status_code,
                str(exc),
                exc_info=True,
            )
            raise HTTPException(
                status_code=status_code,
                detail=self._error_detail(
                    code=type(exc).__name__,
                    detail=str(exc),
                ),
            ) from exc

    def _save_companion_message(
        self,
        repository: ChatroomRepositoryProtocol,
        chatroom_id: str,
        companion_id: str,
        content: str,
    ) -> Message:
        """Persist companion message to chatroom."""
        return repository.add_message_to_chatroom(
            chatroom_id=chatroom_id,
            message=CompanionMessageCreate(
                content=content,
                companion_id=companion_id,
            ),
        )

    @staticmethod
    def _error_detail(code: str, detail: str) -> dict[str, str]:
        """Build structured error detail consumed by aioia_core handlers."""
        return {"code": code, "detail": detail}

    def _register_routes(self) -> None:
        """Register routes (fancall pattern: public CRUD + message endpoints)"""
        # Chatroom CRUD (public, no auth)
        self._register_public_create_route()
        self._register_public_get_route()

        # Message endpoints (public)
        self._register_get_messages_route()
        self._register_send_message_route()
        self._register_generate_initial_response_route()
        self._register_generate_response_route()

    def _register_public_create_route(self) -> None:
        """POST /{resource_name} - Create a chatroom (public, fancall pattern)"""

        @self.router.post(
            f"/{self.resource_name}",
            response_model=ChatroomSingleItemResponse,
            status_code=status.HTTP_201_CREATED,
            summary="Create chatroom",
            description="Create a new chatroom (public endpoint)",
        )
        async def create_chatroom(
            request: ChatroomCreate,
            repository: ChatroomRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Create a new chatroom."""
            created = repository.create(request)
            return ChatroomSingleItemResponse(data=created)

    def _register_public_get_route(self) -> None:
        """GET /{resource_name}/{id} - Get a chatroom (public, fancall pattern)"""

        @self.router.get(
            f"/{self.resource_name}/{{item_id}}",
            response_model=ChatroomSingleItemResponse,
            status_code=status.HTTP_200_OK,
            summary="Get chatroom",
            description="Get chatroom by ID (public endpoint)",
            responses={
                404: {"model": ErrorResponse, "description": "Chatroom not found"},
            },
        )
        async def get_chatroom(
            item_id: str,
            repository: ChatroomRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Get chatroom by ID."""
            chatroom = self._get_item_or_404(repository, item_id)
            return ChatroomSingleItemResponse(data=chatroom)

    def _register_get_messages_route(self) -> None:
        """GET /{resource_name}/{id}/messages - Get messages from a chatroom"""

        @self.router.get(
            f"/{self.resource_name}/{{item_id}}/messages",
            response_model=list[Message],
            status_code=status.HTTP_200_OK,
            summary="Get messages",
            description="Get messages from a chatroom",
        )
        async def get_messages(
            item_id: str,
            limit: int = 100,
            offset: int = 0,
            repository: ChatroomRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Get messages from a chatroom."""
            return repository.get_messages_by_chatroom_id(
                chatroom_id=item_id,
                limit=limit,
                offset=offset,
            )

    def _register_send_message_route(self) -> None:
        """POST /{resource_name}/{id}/messages - Send a message to a chatroom"""

        @self.router.post(
            f"/{self.resource_name}/{{item_id}}/messages",
            response_model=Message,
            status_code=status.HTTP_201_CREATED,
            summary="Send message",
            description="Send a message to a chatroom",
        )
        async def send_message(
            item_id: str,
            request: MessageCreate,
            anonymous_id: Annotated[
                str | None, Cookie(alias="aioia_anonymous_id")
            ] = None,
            repository: ChatroomRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Send a message to a chatroom."""
            # Guard Clause: aioia_anonymous_id cookie is required
            if not anonymous_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="aioia_anonymous_id cookie is required",
                )

            # Verify chatroom exists
            self._get_item_or_404(repository, item_id)

            # Enforce sender_type as USER to prevent spoofing
            request.sender_type = SenderType.USER

            # Convert to internal schema with anonymous_id from Cookie
            message_data = MessageCreateWithAnonymousId(
                **request.model_dump(), anonymous_id=anonymous_id
            )

            # Pass MessageCreateWithAnonymousId to repository
            return repository.add_message_to_chatroom(
                chatroom_id=item_id,
                message=message_data,
            )

    def _register_generate_initial_response_route(self) -> None:
        """POST /{resource_name}/{id}/companions/{companion_id}/initial-response."""

        @self.router.post(
            f"/{self.resource_name}/{{item_id}}/companions/{{companion_id}}/initial-response",
            response_model=GenerateResponse,
            status_code=status.HTTP_201_CREATED,
            summary="Generate initial AI response",
            description="Generate first AI response for an empty chatroom with a specific companion",
            responses={
                409: {
                    "model": ErrorResponse,
                    "description": "Initial response already exists",
                },
            },
        )
        async def generate_initial_response(
            item_id: str,
            companion_id: str,
            db_session: Session = Depends(self.get_db_dep),
            repository: ChatroomRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Generate initial AI response for a chatroom."""
            # Verify chatroom exists
            self._get_item_or_404(repository, item_id)

            companion = self._get_companion_or_404(db_session, companion_id)
            messages, llm_messages = self._get_history_messages(repository, item_id)

            if messages:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail=self._error_detail(
                        FIRST_RESPONSE_ALREADY_EXISTS_CODE,
                        FIRST_RESPONSE_ALREADY_EXISTS_DETAIL,
                    ),
                )

            persona = self._build_persona(companion)
            response_text = self._generate_response_text(
                item_id=item_id,
                companion_id=companion_id,
                persona=persona,
                llm_messages=llm_messages,
                purpose_prompt=GREETING_PROMPT,
            )

            companion_message = self._save_companion_message(
                repository=repository,
                chatroom_id=item_id,
                companion_id=companion_id,
                content=response_text,
            )
            return GenerateResponse(
                message_id=companion_message.id,
                content=response_text,
            )

    def _register_generate_response_route(self) -> None:
        """POST /{resource_name}/{id}/companions/{companion_id}/response - Generate AI response"""

        @self.router.post(
            f"/{self.resource_name}/{{item_id}}/companions/{{companion_id}}/response",
            response_model=GenerateResponse,
            status_code=status.HTTP_201_CREATED,
            summary="Generate AI response",
            description="Generate AI response for a chatroom with a specific companion",
        )
        async def generate_response(
            item_id: str,
            companion_id: str,
            db_session: Session = Depends(self.get_db_dep),
            repository: ChatroomRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Generate AI response for a chatroom."""
            # Verify chatroom exists
            self._get_item_or_404(repository, item_id)

            companion = self._get_companion_or_404(db_session, companion_id)
            _, llm_messages = self._get_history_messages(repository, item_id)
            persona = self._build_persona(companion)
            response_text = self._generate_response_text(
                item_id=item_id,
                companion_id=companion_id,
                persona=persona,
                llm_messages=llm_messages,
                purpose_prompt=CHAT_PROMPT,
            )
            companion_message = self._save_companion_message(
                repository=repository,
                chatroom_id=item_id,
                companion_id=companion_id,
                content=response_text,
            )

            return GenerateResponse(
                message_id=companion_message.id,
                content=response_text,
            )


def create_chatroom_router(
    openai_settings: OpenAIAPISettings,
    model_settings: Settings,
    companion_repository_factory: CompanionRepositoryFactoryProtocol,
    db_session_factory: sessionmaker,
    repository_factory: ChatroomRepositoryFactoryProtocol,
    jwt_settings: JWTSettings | None = None,
    user_info_provider: UserInfoProvider | None = None,
    resource_name: str = "chatrooms",
    tags: list[str] | None = None,
) -> APIRouter:
    """
    Create chatroom router with dependency injection.

    Args:
        openai_settings: OpenAI API settings for LLM provider
        model_settings: Environment settings for aidol
        companion_repository_factory: Factory for CompanionRepository.
            For standalone: Use aidol.factories.CompanionRepositoryFactory.
            For platform integration: Use CompanionRepositoryFactoryAdapter.
        db_session_factory: Database session factory
        repository_factory: Factory implementing ChatroomRepositoryFactoryProtocol.
            For standalone: Use aidol.factories.ChatroomRepositoryFactory.
            For platform integration: Use ChatroomRepositoryFactoryAdapter.
        jwt_settings: Optional JWT settings for authentication
        user_info_provider: Optional user info provider
        resource_name: Resource name for routes (default: "chatrooms")
        tags: Optional OpenAPI tags

    Returns:
        FastAPI APIRouter instance
    """
    router = ChatroomRouter(
        model_settings=model_settings,
        openai_settings=openai_settings,
        companion_repository_factory=companion_repository_factory,
        model_class=Chatroom,
        create_schema=ChatroomCreate,
        update_schema=ChatroomUpdate,
        db_session_factory=db_session_factory,
        repository_factory=repository_factory,
        user_info_provider=user_info_provider,
        jwt_secret_key=jwt_settings.secret_key if jwt_settings else None,
        resource_name=resource_name,
        tags=tags or ["Chatroom"],
    )
    return router.get_router()
