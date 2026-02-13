"""
Highlight database models

- DBAIdolHighlight: 아이돌 그룹의 하이라이트
- DBHighlightMessage: 하이라이트 내 메시지
"""

from aioia_core.models import BaseModel
from sqlalchemy import ForeignKey, Index, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column


class DBAIdolHighlight(BaseModel):
    """AIdol Highlight database model"""

    __tablename__ = "aidol_highlights"

    # id, created_at, updated_at inherited from BaseModel
    aidol_id: Mapped[str | None] = mapped_column(ForeignKey("aidols.id"), nullable=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    thumbnail_url: Mapped[str] = mapped_column(String, nullable=False)
    subtitle: Mapped[str] = mapped_column(String, nullable=False)
    is_premium: Mapped[bool] = mapped_column(default=False, nullable=False)

    __table_args__ = (Index("ix_aidol_highlights_aidol_id", "aidol_id"),)


class DBHighlightMessage(BaseModel):
    """Highlight Message database model"""

    __tablename__ = "highlight_messages"

    # id, created_at, updated_at inherited from BaseModel
    highlight_id: Mapped[str | None] = mapped_column(
        ForeignKey("aidol_highlights.id"), nullable=True
    )
    companion_id: Mapped[str | None] = mapped_column(
        ForeignKey("companions.id"), nullable=True
    )
    sequence: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    __table_args__ = (
        Index("ix_highlight_messages_highlight_id", "highlight_id"),
        Index("ix_highlight_messages_companion_id", "companion_id"),
    )
