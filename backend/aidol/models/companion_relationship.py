"""
Companion Relationship database model

단방향 관계 모델 - from_companion → to_companion
"""

from aioia_core.models import BaseModel
from sqlalchemy import ForeignKey, Index, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class DBCompanionRelationship(BaseModel):
    """Companion Relationship database model (단방향)"""

    __tablename__ = "companion_relationships"

    # id, created_at, updated_at inherited from BaseModel
    from_companion_id: Mapped[str | None] = mapped_column(
        ForeignKey("companions.id"), nullable=True
    )
    to_companion_id: Mapped[str | None] = mapped_column(
        ForeignKey("companions.id"), nullable=True
    )
    intimacy: Mapped[int | None] = mapped_column(Integer, nullable=True)
    nickname: Mapped[str | None] = mapped_column(String, nullable=True)

    __table_args__ = (
        Index("ix_companion_relationships_from_companion_id", "from_companion_id"),
        Index("ix_companion_relationships_to_companion_id", "to_companion_id"),
    )
