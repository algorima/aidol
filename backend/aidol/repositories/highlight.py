"""
Highlight repository

Implements BaseRepository pattern for BaseCrudRouter compatibility.
"""

from datetime import timezone

from aioia_core.repositories import BaseRepository
from sqlalchemy.orm import Session

from aidol.models import DBAIdolHighlight, DBHighlightMessage
from aidol.schemas import (
    AIdolHighlight,
    AIdolHighlightCreate,
    AIdolHighlightUpdate,
    HighlightMessage,
    HighlightMessageCreate,
    HighlightMessageUpdate,
)

# ---------------------------------------------------------------------------
# AIdolHighlight Repository
# ---------------------------------------------------------------------------


def _convert_db_highlight_to_model(db_highlight: DBAIdolHighlight) -> AIdolHighlight:
    """Convert DB Highlight to Pydantic model."""
    return AIdolHighlight(
        id=db_highlight.id,
        aidol_id=db_highlight.aidol_id,
        title=db_highlight.title,
        thumbnail_url=db_highlight.thumbnail_url,
        subtitle=db_highlight.subtitle,
        created_at=db_highlight.created_at.replace(tzinfo=timezone.utc),
        updated_at=db_highlight.updated_at.replace(tzinfo=timezone.utc),
    )


def _convert_highlight_schema_to_db(
    schema: AIdolHighlightCreate | AIdolHighlightUpdate,
) -> dict:
    """Convert Highlight schema to DB model data dict."""
    return schema.model_dump(exclude_unset=True)


class AIdolHighlightRepository(
    BaseRepository[
        AIdolHighlight, DBAIdolHighlight, AIdolHighlightCreate, AIdolHighlightUpdate
    ]
):
    """
    Database-backed AIdolHighlight repository.

    Extends BaseRepository for CRUD operations compatible with BaseCrudRouter.
    """

    def __init__(self, db_session: Session):
        super().__init__(
            db_session=db_session,
            db_model=DBAIdolHighlight,
            convert_to_model=_convert_db_highlight_to_model,
            convert_to_db_model=_convert_highlight_schema_to_db,
        )


# ---------------------------------------------------------------------------
# HighlightMessage Repository
# ---------------------------------------------------------------------------


def _convert_db_message_to_model(db_message: DBHighlightMessage) -> HighlightMessage:
    """Convert DB HighlightMessage to Pydantic model."""
    return HighlightMessage(
        id=db_message.id,
        highlight_id=db_message.highlight_id,
        companion_id=db_message.companion_id,
        sequence=db_message.sequence,
        content=db_message.content,
        created_at=db_message.created_at.replace(tzinfo=timezone.utc),
        updated_at=db_message.updated_at.replace(tzinfo=timezone.utc),
    )


def _convert_message_schema_to_db(
    schema: HighlightMessageCreate | HighlightMessageUpdate,
) -> dict:
    """Convert HighlightMessage schema to DB model data dict."""
    return schema.model_dump(exclude_unset=True)


class HighlightMessageRepository(
    BaseRepository[
        HighlightMessage,
        DBHighlightMessage,
        HighlightMessageCreate,
        HighlightMessageUpdate,
    ]
):
    """
    Database-backed HighlightMessage repository.

    Extends BaseRepository for CRUD operations compatible with BaseCrudRouter.
    """

    def __init__(self, db_session: Session):
        super().__init__(
            db_session=db_session,
            db_model=DBHighlightMessage,
            convert_to_model=_convert_db_message_to_model,
            convert_to_db_model=_convert_message_schema_to_db,
        )
