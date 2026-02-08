# pylint: disable=duplicate-code
"""
Companion Relationship API router

Public endpoints for Companion Relationship CRUD operations.
Public access pattern: no authentication required.
"""

from aioia_core.errors import ErrorResponse
from aioia_core.fastapi import BaseCrudRouter
from aioia_core.settings import JWTSettings
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker

from aidol.protocols import (
    CompanionRelationshipRepositoryFactoryProtocol,
    CompanionRelationshipRepositoryProtocol,
)
from aidol.schemas import (
    CompanionRelationship,
    CompanionRelationshipCreate,
    CompanionRelationshipUpdate,
)


class RelationshipSingleItemResponse(BaseModel):
    """Single item response for Relationship."""

    data: CompanionRelationship


class RelationshipPaginatedResponse(BaseModel):
    """Paginated response for Relationship."""

    data: list[CompanionRelationship]
    total: int


class CompanionRelationshipRouter(
    BaseCrudRouter[
        CompanionRelationship,
        CompanionRelationshipCreate,
        CompanionRelationshipUpdate,
        CompanionRelationshipRepositoryProtocol,
    ]
):
    """
    Companion Relationship router with public endpoints.

    Public CRUD pattern: no authentication required.
    """

    def _register_routes(self) -> None:
        """Register routes (public CRUD)"""
        self._register_public_list_route()
        self._register_public_get_route()
        self._register_public_create_route()
        self._register_public_delete_route()

    def _register_public_list_route(self) -> None:
        """GET /{resource_name} - List Relationships (public)"""

        @self.router.get(
            f"/{self.resource_name}",
            response_model=RelationshipPaginatedResponse,
            status_code=status.HTTP_200_OK,
            summary="List Companion Relationships",
            description="List all Companion Relationships with pagination, sorting, and filtering",
        )
        async def list_relationships(
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
            repository: CompanionRelationshipRepositoryProtocol = Depends(
                self.get_repository_dep
            ),
        ):
            """List Companion Relationships with pagination, sorting, and filtering."""
            sort_list, filter_list = self._parse_query_params(sort_param, filters_param)
            items, total = repository.get_all(
                current=current,
                page_size=page_size,
                sort=sort_list,
                filters=filter_list,
            )
            return RelationshipPaginatedResponse(data=items, total=total)

    def _register_public_get_route(self) -> None:
        """GET /{resource_name}/{id} - Get a Relationship (public)"""

        @self.router.get(
            f"/{self.resource_name}/{{item_id}}",
            response_model=RelationshipSingleItemResponse,
            status_code=status.HTTP_200_OK,
            summary="Get Companion Relationship",
            description="Get a Companion Relationship by ID",
            responses={
                404: {"model": ErrorResponse, "description": "Relationship not found"},
            },
        )
        async def get_relationship(
            item_id: str,
            repository: CompanionRelationshipRepositoryProtocol = Depends(
                self.get_repository_dep
            ),
        ):
            """Get a Companion Relationship by ID."""
            item = repository.get_by_id(item_id)
            if not item:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Relationship not found",
                )
            return RelationshipSingleItemResponse(data=item)

    def _register_public_create_route(self) -> None:
        """POST /{resource_name} - Create a Relationship (public)"""

        @self.router.post(
            f"/{self.resource_name}",
            response_model=RelationshipSingleItemResponse,
            status_code=status.HTTP_201_CREATED,
            summary="Create Companion Relationship",
            description="Create a new Companion Relationship",
        )
        async def create_relationship(
            request: CompanionRelationshipCreate,
            repository: CompanionRelationshipRepositoryProtocol = Depends(
                self.get_repository_dep
            ),
        ):
            """Create a new Companion Relationship."""
            created = repository.create(request)
            return RelationshipSingleItemResponse(data=created)

    def _register_public_delete_route(self) -> None:
        """DELETE /{resource_name}/{id} - Delete a Relationship (public)"""

        @self.router.delete(
            f"/{self.resource_name}/{{item_id}}",
            status_code=status.HTTP_204_NO_CONTENT,
            summary="Delete Companion Relationship",
            description="Delete a Companion Relationship by ID",
            responses={
                404: {"model": ErrorResponse, "description": "Relationship not found"},
            },
        )
        async def delete_relationship(
            item_id: str,
            repository: CompanionRelationshipRepositoryProtocol = Depends(
                self.get_repository_dep
            ),
        ):
            """Delete a Companion Relationship by ID."""
            item = repository.get_by_id(item_id)
            if not item:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Relationship not found",
                )
            repository.delete(item_id)
            return None


def create_companion_relationship_router(
    db_session_factory: sessionmaker,
    repository_factory: CompanionRelationshipRepositoryFactoryProtocol,
    jwt_settings: JWTSettings | None = None,
    resource_name: str = "companion-relationships",
    tags: list[str] | None = None,
) -> APIRouter:
    """
    Create Companion Relationship router with dependency injection.

    Args:
        db_session_factory: Database session factory
        repository_factory: Factory implementing CompanionRelationshipRepositoryFactoryProtocol
        jwt_settings: Optional JWT settings for authentication
        resource_name: Resource name for routes (default: "companion-relationships")
        tags: Optional OpenAPI tags

    Returns:
        FastAPI APIRouter instance
    """
    router = CompanionRelationshipRouter(
        model_class=CompanionRelationship,
        create_schema=CompanionRelationshipCreate,
        update_schema=CompanionRelationshipUpdate,
        db_session_factory=db_session_factory,
        repository_factory=repository_factory,
        user_info_provider=None,
        jwt_secret_key=jwt_settings.secret_key if jwt_settings else None,
        resource_name=resource_name,
        tags=tags or ["CompanionRelationship"],
    )
    return router.get_router()
