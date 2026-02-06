# pylint: disable=duplicate-code
"""
AIdol API router

Public endpoints for AIdol group creation and retrieval.
Public access pattern: no authentication required.
"""

from typing import Annotated

from aioia_core.auth import UserInfoProvider
from aioia_core.errors import ErrorResponse
from aioia_core.fastapi import BaseCrudRouter
from aioia_core.settings import JWTSettings
from fastapi import APIRouter, Cookie, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker

from aidol.api.common import register_image_generation_route
from aidol.protocols import (
    AIdolRepositoryFactoryProtocol,
    AIdolRepositoryProtocol,
    ImageStorageProtocol,
)
from aidol.schemas import (
    AIdol,
    AIdolCreate,
    AIdolCreateWithAnonymousId,
    AIdolPublic,
    AIdolUpdate,
)
from aidol.settings import GoogleGenAISettings


class AIdolCreateResponse(BaseModel):
    """Response for AIdol creation (only id)."""

    id: str


class AIdolPaginatedResponse(BaseModel):
    """Paginated response for AIdol (public)."""

    data: list[AIdolPublic]
    total: int


class AIdolRouter(
    BaseCrudRouter[
        AIdol, AIdolCreateWithAnonymousId, AIdolUpdate, AIdolRepositoryProtocol
    ]
):
    """
    AIdol router with public endpoints.

    Public CRUD pattern: no authentication required.
    Returns AIdolPublic (excludes anonymous_id) for all responses.
    """

    def __init__(
        self,
        google_settings: GoogleGenAISettings | None,
        image_storage: ImageStorageProtocol,
        **kwargs,
    ):
        self.google_settings = google_settings
        self.image_storage = image_storage
        super().__init__(**kwargs)

    def _register_routes(self) -> None:
        """Register routes (public CRUD + image generation)"""
        # Register shared image generation route
        register_image_generation_route(
            router=self.router,
            resource_name=self.resource_name,
            google_settings=self.google_settings,
            image_storage=self.image_storage,
        )

        self._register_public_list_route()
        self._register_public_my_route()
        self._register_public_create_route()
        self._register_public_get_route()
        self._register_public_update_route()

    def _register_public_list_route(self) -> None:
        """GET /{resource_name} - List AIdols (public)"""

        @self.router.get(
            f"/{self.resource_name}",
            response_model=AIdolPaginatedResponse,
            status_code=status.HTTP_200_OK,
            summary="List AIdols",
            description="List all AIdol groups with pagination, sorting, and filtering",
        )
        async def list_aidols(
            current: int = Query(1, ge=1, description="Current page number"),
            page_size: int = Query(
                10, alias="pageSize", ge=1, le=100, description="Items per page"
            ),
            sort_param: str | None = Query(
                None,
                alias="sort",
                description='Sorting criteria in JSON format. Example: [["createdAt","desc"]]',
            ),
            filters_param: str | None = Query(
                None,
                alias="filters",
                description="Filter conditions (JSON format)",
            ),
            repository: AIdolRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """List AIdols with pagination, sorting, and filtering."""
            sort_list, filter_list = self._parse_query_params(sort_param, filters_param)
            items, total = repository.get_all(
                current=current,
                page_size=page_size,
                sort=sort_list,
                filters=filter_list,
            )
            # Convert to Public schema (exclude anonymous_id)
            public_items = [AIdolPublic(**item.model_dump()) for item in items]
            return AIdolPaginatedResponse(data=public_items, total=total)

    def _register_public_my_route(self) -> None:
        """GET /{resource_name}/my - List my AIdols (filtered by cookie)"""

        @self.router.get(
            f"/{self.resource_name}/my",
            response_model=AIdolPaginatedResponse,
            status_code=status.HTTP_200_OK,
            summary="List my AIdols",
            description="List AIdol groups owned by the current user (based on cookie)",
        )
        async def list_my_aidols(
            current: int = Query(1, ge=1, description="Current page number"),
            page_size: int = Query(
                10, alias="pageSize", ge=1, le=100, description="Items per page"
            ),
            sort_param: str | None = Query(
                None,
                alias="sort",
                description='Sorting criteria in JSON format. Example: [["createdAt","desc"]]',
            ),
            filters_param: str | None = Query(
                None,
                alias="filters",
                description="Filter conditions (JSON format)",
            ),
            anonymous_id: Annotated[
                str | None, Cookie(alias="aioia_anonymous_id")
            ] = None,
            repository: AIdolRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """List my AIdols filtered by anonymous_id from cookie."""
            if not anonymous_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="aioia_anonymous_id cookie is required",
                )

            sort_list, filter_list = self._parse_query_params(sort_param, filters_param)

            # Ensure filter_list is a list
            if filter_list is None:
                filter_list = []

            # Add anonymous_id filter to existing filters
            anonymous_id_filter = {
                "field": "anonymous_id",
                "operator": "eq",
                "value": anonymous_id,
            }
            filter_list.append(anonymous_id_filter)

            items, total = repository.get_all(
                current=current,
                page_size=page_size,
                sort=sort_list,
                filters=filter_list,
            )
            # Convert to Public schema (exclude anonymous_id)
            public_items = [AIdolPublic(**item.model_dump()) for item in items]
            return AIdolPaginatedResponse(data=public_items, total=total)

    def _register_public_update_route(self) -> None:
        """PATCH /{resource_name}/{id} - Update AIdol group (public)"""

        @self.router.patch(
            f"/{self.resource_name}/{{item_id}}",
            response_model=AIdolPublic,
            status_code=status.HTTP_200_OK,
            summary="Update AIdol group",
            description="Update AIdol group by ID (public endpoint). Returns updated AIdol data directly.",
            responses={
                404: {"model": ErrorResponse, "description": "AIdol group not found"},
            },
        )
        async def update_aidol(
            item_id: str,
            data: AIdolUpdate,
            repository: AIdolRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Update AIdol group."""
            # TODO: Verify ClaimToken if strict ownership is required (Sprint 1)
            updated = repository.update(item_id, data)
            if not updated:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="AIdol group not found",
                )

            # Return updated AIdol as public schema
            return AIdolPublic(**updated.model_dump())

    def _register_public_create_route(self) -> None:
        """POST /{resource_name} - Create an AIdol group (public)"""

        @self.router.post(
            f"/{self.resource_name}",
            response_model=AIdolCreateResponse,
            status_code=status.HTTP_201_CREATED,
            summary="Create AIdol group",
            description="Create a new AIdol group (public endpoint). Returns only the created id.",
        )
        async def create_aidol(
            request: AIdolCreate,
            anonymous_id: Annotated[
                str | None, Cookie(alias="aioia_anonymous_id")
            ] = None,
            repository: AIdolRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Create a new AIdol group."""
            if not anonymous_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="aioia_anonymous_id cookie is required",
                )

            # Convert body schema to internal schema with anonymous_id from Cookie
            create_data = AIdolCreateWithAnonymousId(
                **request.model_dump(), anonymous_id=anonymous_id
            )
            created = repository.create(create_data)

            # Return only id
            return AIdolCreateResponse(id=created.id)

    def _register_public_get_route(self) -> None:
        """GET /{resource_name}/{id} - Get an AIdol group (public)"""

        @self.router.get(
            f"/{self.resource_name}/{{item_id}}",
            response_model=AIdolPublic,
            status_code=status.HTTP_200_OK,
            summary="Get AIdol group",
            description="Get AIdol group by ID (public endpoint). Returns AIdol data directly.",
            responses={
                404: {"model": ErrorResponse, "description": "AIdol group not found"},
            },
        )
        async def get_aidol(
            item_id: str,
            repository: AIdolRepositoryProtocol = Depends(self.get_repository_dep),
        ):
            """Get AIdol group by ID."""
            aidol = self._get_item_or_404(repository, item_id)
            # Return AIdol as public schema
            return AIdolPublic(**aidol.model_dump())


def create_aidol_router(
    google_settings: GoogleGenAISettings | None,
    db_session_factory: sessionmaker,
    repository_factory: AIdolRepositoryFactoryProtocol,
    image_storage: ImageStorageProtocol,
    jwt_settings: JWTSettings | None = None,
    user_info_provider: UserInfoProvider | None = None,
    resource_name: str = "aidols",
    tags: list[str] | None = None,
) -> APIRouter:
    """
    Create AIdol router with dependency injection.

    Args:
        google_settings: Google API settings (uses ADC if api_key is None)
        db_session_factory: Database session factory
        repository_factory: Factory implementing AIdolRepositoryFactoryProtocol
        image_storage: Image storage for permanent URLs
        jwt_settings: Optional JWT settings for authentication
        user_info_provider: Optional user info provider
        resource_name: Resource name for routes (default: "aidols")
        tags: Optional OpenAPI tags

    Returns:
        FastAPI APIRouter instance
    """
    router = AIdolRouter(
        google_settings=google_settings,
        image_storage=image_storage,
        model_class=AIdol,
        create_schema=AIdolCreate,
        update_schema=AIdolUpdate,
        db_session_factory=db_session_factory,
        repository_factory=repository_factory,
        user_info_provider=user_info_provider,
        jwt_secret_key=jwt_settings.secret_key if jwt_settings else None,
        resource_name=resource_name,
        tags=tags or ["AIdol"],
    )
    return router.get_router()
