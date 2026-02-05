"""
Companion Relationship repository

Implements BaseRepository pattern for BaseCrudRouter compatibility.
"""

from datetime import timezone

from aioia_core.repositories import BaseRepository
from sqlalchemy.orm import Session

from aidol.models import DBCompanionRelationship
from aidol.schemas import (
    CompanionRelationship,
    CompanionRelationshipCreate,
    CompanionRelationshipUpdate,
)
from aidol.services.companion_relationship_service import get_intimacy_type


def _convert_db_relationship_to_model(
    db_relationship: DBCompanionRelationship,
) -> CompanionRelationship:
    """Convert DB CompanionRelationship to Pydantic model.

    Includes calculated 'type' field from intimacy score.
    """
    return CompanionRelationship(
        id=db_relationship.id,
        from_companion_id=db_relationship.from_companion_id,
        to_companion_id=db_relationship.to_companion_id,
        intimacy=db_relationship.intimacy,
        nickname=db_relationship.nickname,
        type=get_intimacy_type(db_relationship.intimacy).value,
        created_at=db_relationship.created_at.replace(tzinfo=timezone.utc),
        updated_at=db_relationship.updated_at.replace(tzinfo=timezone.utc),
    )


def _convert_relationship_schema_to_db(
    schema: CompanionRelationshipCreate | CompanionRelationshipUpdate,
) -> dict:
    """Convert CompanionRelationship schema to DB model data dict."""
    return schema.model_dump(exclude_unset=True)


class CompanionRelationshipRepository(
    BaseRepository[
        CompanionRelationship,
        DBCompanionRelationship,
        CompanionRelationshipCreate,
        CompanionRelationshipUpdate,
    ]
):
    """
    Database-backed CompanionRelationship repository.

    Extends BaseRepository for CRUD operations compatible with BaseCrudRouter.
    """

    def __init__(self, db_session: Session):
        super().__init__(
            db_session=db_session,
            db_model=DBCompanionRelationship,
            convert_to_model=_convert_db_relationship_to_model,
            convert_to_db_model=_convert_relationship_schema_to_db,
        )
