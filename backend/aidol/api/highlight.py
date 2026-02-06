# pylint: disable=duplicate-code
"""
AIdol Highlight API router

Public endpoints for AIdol Highlight retrieval and messages.
Public access pattern: no authentication required.
"""

from aioia_core.errors import ErrorResponse
from aioia_core.fastapi import BaseCrudRouter
from aioia_core.settings import JWTSettings
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session, sessionmaker

from aidol.protocols import (
    AIdolHighlightRepositoryFactoryProtocol,
    AIdolHighlightRepositoryProtocol,
    HighlightMessageRepositoryFactoryProtocol,
    HighlightMessageRepositoryProtocol,
)
from aidol.schemas import (
    AIdolHighlight,
    AIdolHighlightCreate,
    AIdolHighlightUpdate,
    HighlightMessage,
)


class HighlightSingleItemResponse(BaseModel):
    """Single item response for Highlight."""

    data: AIdolHighlight


class HighlightPaginatedResponse(BaseModel):
    """Paginated response for Highlight."""

    data: list[AIdolHighlight]
    total: int


class HighlightRouter(
    BaseCrudRouter[
        AIdolHighlight,
        AIdolHighlightCreate,
        AIdolHighlightUpdate,
        AIdolHighlightRepositoryProtocol,
    ]
):
    """
    AIdol Highlight router with public endpoints.

    Public CRUD pattern: no authentication required.
    """

    def __init__(
        self,
        message_repository_factory: HighlightMessageRepositoryFactoryProtocol,
        **kwargs,
    ):
        self.message_repository_factory = message_repository_factory
        super().__init__(**kwargs)

    def _register_routes(self) -> None:
        """Register routes (public list + messages)"""
        self._register_public_list_route()
        self._register_public_get_messages_route()

    def _register_public_list_route(self) -> None:
        """GET /{resource_name} - List Highlights (public)"""

        @self.router.get(
            f"/{self.resource_name}",
            response_model=HighlightPaginatedResponse,
            status_code=status.HTTP_200_OK,
            summary="List Highlights",
            description="List all Highlights with pagination, sorting, and filtering",
        )
        async def list_highlights(
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
            repository: AIdolHighlightRepositoryProtocol = Depends(
                self.get_repository_dep
            ),
        ):
            """List Highlights with pagination, sorting, and filtering."""
            sort_list, filter_list = self._parse_query_params(sort_param, filters_param)
            items, total = repository.get_all(
                current=current,
                page_size=page_size,
                sort=sort_list,
                filters=filter_list,
            )
            return HighlightPaginatedResponse(data=items, total=total)

    def _register_public_get_messages_route(self) -> None:
        """GET /{resource_name}/{id}/messages - Get messages from a Highlight"""

        @self.router.get(
            f"/{self.resource_name}/{{item_id}}/messages",
            response_model=list[HighlightMessage],
            status_code=status.HTTP_200_OK,
            summary="Get Highlight messages",
            description="Get messages from a Highlight",
            responses={
                404: {"model": ErrorResponse, "description": "Highlight not found"},
            },
        )
        async def get_highlight_messages(
            item_id: str,
            db_session: Session = Depends(self.get_db_dep),
            repository: AIdolHighlightRepositoryProtocol = Depends(
                self.get_repository_dep
            ),
        ):
            """Get messages from a Highlight."""
            # Verify highlight exists
            highlight = repository.get_by_id(item_id)
            if not highlight:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Highlight not found",
                )

            # Get message repository with same db session
            message_repository = self.message_repository_factory.create_repository(
                db_session
            )

            # Get messages filtered by highlight_id, ordered by sequence
            messages, _ = message_repository.get_all(
                filters=[
                    {
                        "field": "highlight_id",
                        "operator": "eq",
                        "value": item_id,
                    }
                ],
                sort=[("sequence", "asc")],
            )

            return messages


def create_highlight_router(
    db_session_factory: sessionmaker,
    highlight_repository_factory: AIdolHighlightRepositoryFactoryProtocol,
    message_repository_factory: HighlightMessageRepositoryFactoryProtocol,
    jwt_settings: JWTSettings | None = None,
    resource_name: str = "aidol-highlights",
    tags: list[str] | None = None,
) -> APIRouter:
    """
    Create Highlight router with dependency injection.

    Args:
        db_session_factory: Database session factory
        highlight_repository_factory: Factory implementing AIdolHighlightRepositoryFactoryProtocol
        message_repository_factory: Factory implementing HighlightMessageRepositoryFactoryProtocol
        jwt_settings: Optional JWT settings for authentication
        resource_name: Resource name for routes (default: "aidol-highlights")
        tags: Optional OpenAPI tags

    Returns:
        FastAPI APIRouter instance
    """
    router = HighlightRouter(
        message_repository_factory=message_repository_factory,
        model_class=AIdolHighlight,
        create_schema=AIdolHighlightCreate,
        update_schema=AIdolHighlightUpdate,
        db_session_factory=db_session_factory,
        repository_factory=highlight_repository_factory,
        user_info_provider=None,
        jwt_secret_key=jwt_settings.secret_key if jwt_settings else None,
        resource_name=resource_name,
        tags=tags or ["Highlight"],
    )
    return router.get_router()
