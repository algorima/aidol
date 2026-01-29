# pylint: disable=R0801
"""
Companion API router

Public endpoints for Companion creation and retrieval.
Public access pattern: no authentication required.
"""

from aioia_core.auth import UserInfoProvider
from aioia_core.errors import ErrorResponse
from aioia_core.fastapi import BaseCrudRouter
from aioia_core.settings import JWTSettings
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker

from aidol.protocols import (
    CompanionRepositoryFactoryProtocol,
    CompanionRepositoryProtocol,
    ImageStorageProtocol,
)
from aidol.schemas import (
    Companion,
    CompanionCreate,
    CompanionPublic,
    CompanionUpdate,
    Gender,
    ImageGenerationData,
    ImageGenerationRequest,
    ImageGenerationResponse,
)
from aidol.services import ImageGenerationService
from aidol.services.companion_service import to_companion_public


class CompanionPaginatedResponse(BaseModel):
    """Paginated response for Companion (public)."""

    data: list[CompanionPublic]
    total: int


class CompanionRouter(
    BaseCrudRouter[
        Companion, CompanionCreate, CompanionUpdate, CompanionRepositoryProtocol
    ]
):
    """
    Companion router with public endpoints.

    Public CRUD pattern: no authentication required.
    Returns CompanionPublic (excludes system_prompt) for all responses.
    """

    def __init__(
        self,
        google_api_key: str | None,
        image_storage: ImageStorageProtocol,
        **kwargs,
    ):
        super().__init__(**kwargs)
        self.google_api_key = google_api_key
        self.image_storage = image_storage

    def _register_routes(self) -> None:
        """Register routes (public CRUD + image generation)"""
        self._register_image_generation_route()
        self._register_public_list_route()
        self._register_public_create_route()
        self._register_public_get_route()
        self._register_public_update_route()
        self._register_public_delete_route()

    def _register_public_list_route(self) -> None:
        """GET /{resource_name} - List Companions (public)"""

        @self.router.get(
            f"/{self.resource_name}",
            response_model=CompanionPaginatedResponse,
            status_code=status.HTTP_200_OK,
            summary="List Companions",
            description="List all Companions with optional filtering by gender and cast status",
        )
        async def list_companions(
            gender: Gender | None = Query(None, description="Filter by gender"),
            is_cast: bool | None = Query(
                None, alias="isCast", description="Filter by cast status"
            ),
            repository: CompanionRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """List Companions with optional gender and isCast filters."""
            filter_list: list[dict] = []

            # Add filters only if provided
            if gender is not None:
                filter_list.append(
                    {"field": "gender", "operator": "eq", "value": gender.value}
                )

            # isCast is derived from aidol_id presence
            # isCast=true → aidol_id is not null (belongs to a group)
            # isCast=false → aidol_id is null (not in a group)
            if is_cast is True:
                filter_list.append(
                    {"field": "aidol_id", "operator": "ne", "value": None}
                )
            elif is_cast is False:
                filter_list.append(
                    {"field": "aidol_id", "operator": "eq", "value": None}
                )

            items, total = repository.get_all(
                filters=filter_list if filter_list else None,
            )
            # Convert to Public schema (exclude system_prompt)
            public_items = [to_companion_public(c) for c in items]
            return CompanionPaginatedResponse(data=public_items, total=total)

    def _register_public_create_route(self) -> None:
        """POST /{resource_name} - Create a Companion (public)"""

        @self.router.post(
            f"/{self.resource_name}",
            response_model=CompanionPublic,
            status_code=status.HTTP_201_CREATED,
            summary="Create Companion",
            description="Create a new Companion. Returns the created companion data.",
        )
        async def create_companion(
            request: CompanionCreate,
            repository: CompanionRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Create a new Companion."""
            # Exclude system_prompt from request - should not be set via API
            sanitized_data = request.model_dump(exclude={"system_prompt"})
            sanitized_request = CompanionCreate(**sanitized_data)

            created = repository.create(sanitized_request)
            # Return created companion as public schema
            return to_companion_public(created)

    def _register_public_get_route(self) -> None:
        """GET /{resource_name}/{id} - Get a Companion (public)"""

        @self.router.get(
            f"/{self.resource_name}/{{item_id}}",
            response_model=CompanionPublic,
            status_code=status.HTTP_200_OK,
            summary="Get Companion",
            description="Get Companion by ID (public endpoint). Returns companion data directly.",
            responses={
                404: {"model": ErrorResponse, "description": "Companion not found"},
            },
        )
        async def get_companion(
            item_id: str,
            repository: CompanionRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Get Companion by ID."""
            companion = self._get_item_or_404(repository, item_id)
            # Return companion as public schema
            return to_companion_public(companion)

    def _register_public_update_route(self) -> None:
        """PATCH /{resource_name}/{id} - Update Companion (public)"""

        @self.router.patch(
            f"/{self.resource_name}/{{item_id}}",
            response_model=CompanionPublic,
            status_code=status.HTTP_200_OK,
            summary="Update Companion",
            description="Update Companion by ID (public endpoint). Returns updated companion data directly.",
            responses={
                404: {"model": ErrorResponse, "description": "Companion not found"},
            },
        )
        async def update_companion(
            item_id: str,
            data: CompanionUpdate,
            repository: CompanionRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Update Companion."""
            # Exclude system_prompt from request - should not be set via API
            sanitized_data = data.model_dump(
                exclude={"system_prompt"}, exclude_unset=True
            )
            sanitized_request = CompanionUpdate(**sanitized_data)

            updated = repository.update(item_id, sanitized_request)
            if not updated:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Companion not found",
                )

            # Return updated companion as public schema
            return to_companion_public(updated)

    def _register_public_delete_route(self) -> None:
        """DELETE /{resource_name}/{id} - Remove Companion from Group (public)"""

        @self.router.delete(
            f"/{self.resource_name}/{{item_id}}",
            response_model=CompanionPublic,
            status_code=status.HTTP_200_OK,
            summary="Remove Companion from Group",
            description="Remove Companion from AIdol group (unassign aidol_id). Does not delete the record.",
            responses={
                404: {"model": ErrorResponse, "description": "Companion not found"},
            },
        )
        async def delete_companion(
            item_id: str,
            repository: CompanionRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Remove Companion from Group (Unassign)."""
            # Get item first
            self._get_item_or_404(repository, item_id)

            # Update aidol_id to None (remove from group)
            update_data = CompanionUpdate(aidol_id=None)

            updated = repository.update(item_id, update_data)

            if not updated:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Companion not found",
                )

            # Return updated companion as public schema
            return to_companion_public(updated)

    def _register_image_generation_route(self) -> None:
        """POST /{resource_name}/images - Generate image for Companion profile"""

        @self.router.post(
            f"/{self.resource_name}/images",
            response_model=ImageGenerationResponse,
            status_code=status.HTTP_201_CREATED,
            summary="Generate image",
            description="Generate image for Companion profile",
            responses={
                500: {"model": ErrorResponse, "description": "Image generation failed"},
            },
        )
        async def generate_image(request: ImageGenerationRequest):
            """Generate image from prompt."""
            # Generate and download image
            service = ImageGenerationService(api_key=self.google_api_key)
            image = service.generate_and_download_image(
                prompt=request.prompt,
                size="1024x1024",
                quality="standard",
            )

            if image is None:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Image generation failed",
                )

            # Upload to permanent storage
            image_url = self.image_storage.upload_image(image)

            return ImageGenerationResponse(
                data=ImageGenerationData(
                    image_url=image_url,
                    width=1024,
                    height=1024,
                    format="png",
                )
            )


def create_companion_router(
    google_api_key: str | None,
    db_session_factory: sessionmaker,
    repository_factory: CompanionRepositoryFactoryProtocol,
    image_storage: ImageStorageProtocol,
    jwt_settings: JWTSettings | None = None,
    user_info_provider: UserInfoProvider | None = None,
    resource_name: str = "companions",
    tags: list[str] | None = None,
) -> APIRouter:
    """
    Create Companion router with dependency injection.

    Args:
        google_api_key: Google API Key for image generation
        db_session_factory: Database session factory
        repository_factory: Factory implementing CompanionRepositoryFactoryProtocol
        image_storage: Image storage for permanent URLs
        jwt_settings: Optional JWT settings for authentication
        user_info_provider: Optional user info provider
        resource_name: Resource name for routes (default: "companions")
        tags: Optional OpenAPI tags

    Returns:
        FastAPI APIRouter instance
    """
    router = CompanionRouter(
        google_api_key=google_api_key,
        image_storage=image_storage,
        model_class=Companion,
        create_schema=CompanionCreate,
        update_schema=CompanionUpdate,
        db_session_factory=db_session_factory,
        repository_factory=repository_factory,
        user_info_provider=user_info_provider,
        jwt_secret_key=jwt_settings.secret_key if jwt_settings else None,
        resource_name=resource_name,
        tags=tags or ["Companion"],
    )
    return router.get_router()
