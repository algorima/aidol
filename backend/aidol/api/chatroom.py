"""
Chatroom API router

Implements BaseCrudRouter pattern for consistency with aioia-core patterns.
"""

from aioia_core.auth import UserInfoProvider
from aioia_core.errors import ErrorResponse
from aioia_core.fastapi import BaseCrudRouter
from aioia_core.settings import JWTSettings, OpenAIAPISettings
from fastapi import APIRouter, Depends, HTTPException, status
from humps import camelize
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import Session, sessionmaker

from aidol.context import MessageContextBuilder
from aidol.protocols import (
    ChatroomRepositoryFactoryProtocol,
    ChatroomRepositoryProtocol,
    CompanionRepositoryFactoryProtocol,
)
from aidol.providers.llm import OpenAILLMProvider
from aidol.schemas import (
    Chatroom,
    ChatroomCreate,
    ChatroomUpdate,
    CompanionMessageCreate,
    Message,
    MessageCreate,
    ModelSettings,
    Persona,
    SenderType,
)
from aidol.services import ResponseGenerationService
from aidol.settings import Settings

# Maximum number of messages to fetch for conversation history
DEFAULT_HISTORY_LIMIT = 200


class ChatroomSingleItemResponse(BaseModel):
    """Single item response for chatroom."""

    data: Chatroom


class GenerateResponse(BaseModel):
    """Response schema for generate_response endpoint."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    message_id: str = Field(..., description="Message ID")
    content: str = Field(..., description="AI response content")


def _to_langchain_messages(messages: list[Message]) -> list[BaseMessage]:
    """
    Convert Message schemas to LangChain BaseMessage format.

    Args:
        messages: List of Message from repository.

    Returns:
        List of LangChain BaseMessage (HumanMessage or AIMessage).
    """
    result: list[BaseMessage] = []
    for msg in messages:
        if msg.sender_type == SenderType.USER:
            result.append(HumanMessage(content=msg.content))
        else:
            result.append(AIMessage(content=msg.content))
    return result


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

    def _register_routes(self) -> None:
        """Register routes (fancall pattern: public CRUD + message endpoints)"""
        # Chatroom CRUD (public, no auth)
        self._register_public_create_route()
        self._register_public_get_route()

        # Message endpoints (public)
        self._register_get_messages_route()
        self._register_send_message_route()
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
            repository: ChatroomRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Send a message to a chatroom."""
            # Pass MessageCreate directly (aioia-core pattern)
            return repository.add_message_to_chatroom(
                chatroom_id=item_id,
                message=request,
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

            # Get companion repository with same db session (Buppy pattern)
            companion_repository = self.companion_repository_factory.create_repository(
                db_session
            )

            # Get companion by ID
            companion = companion_repository.get_by_id(companion_id)
            if companion is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Companion with id {companion_id} not found",
                )

            # Get conversation history
            messages = repository.get_messages_by_chatroom_id(
                chatroom_id=item_id,
                limit=DEFAULT_HISTORY_LIMIT,
                offset=0,
            )

            # Convert to LangChain BaseMessage format
            # Reverse: DB returns newest-first, LLM needs chronological order
            langchain_messages = _to_langchain_messages(list(reversed(messages)))

            # Create persona from companion (KST fixed for MVP)
            persona = Persona(
                name=companion.name,
                system_prompt=companion.system_prompt,
                timezone_name="Asia/Seoul",
            )
            provider = OpenAILLMProvider(settings=self.openai_settings)
            model_settings = ModelSettings(chat_model=self.model_settings.openai_model)

            # Generate text response using ResponseGenerationService
            context = (
                MessageContextBuilder(provider, persona)
                .with_persona()
                .with_real_time_context()
                .with_current_conversation(langchain_messages)
                .build()
            )
            service = ResponseGenerationService(provider, model_settings)
            response_text = service.generate_response(context)

            # Save companion message (repository handles commit)
            # Use CompanionMessageCreate (no id) - aioia-core pattern
            companion_message = repository.add_message_to_chatroom(
                chatroom_id=item_id,
                message=CompanionMessageCreate(
                    content=response_text,
                    companion_id=companion_id,
                ),
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
        tags=tags or ["Aidol"],
    )
    return router.get_router()
