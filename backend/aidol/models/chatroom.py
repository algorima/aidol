"""
Chatroom and message database models

Uses aioia_core.models.BaseModel which provides:
- id: Mapped[str] (primary key, UUID default)
- created_at: Mapped[datetime]
- updated_at: Mapped[datetime]
"""

from aioia_core.models import BaseModel
from sqlalchemy import ForeignKey, Index, String, Text
from sqlalchemy.orm import Mapped, mapped_column


class DBChatroom(BaseModel):
    """Chatroom database model"""

    __tablename__ = "chatrooms"

    # id, created_at, updated_at inherited from BaseModel
    companion_id: Mapped[str] = mapped_column(
        ForeignKey("companions.id"), nullable=False, index=True
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    language: Mapped[str] = mapped_column(String, nullable=False, default="en")
    anonymous_id: Mapped[str | None] = mapped_column(
        String(36), nullable=True, index=True
    )  # Anonymous user identifier for ownership

    __table_args__ = (Index("ix_chatrooms_language", "language"),)


class DBMessage(BaseModel):
    """Message database model"""

    __tablename__ = "messages"

    # id, created_at, updated_at inherited from BaseModel
    chatroom_id: Mapped[str] = mapped_column(ForeignKey("chatrooms.id"), nullable=False)
    sender_type: Mapped[str] = mapped_column(
        String, nullable=False
    )  # "user" | "companion"
    content: Mapped[str] = mapped_column(Text, nullable=False)
    anonymous_id: Mapped[str | None] = mapped_column(
        String(36), nullable=True, index=True
    )  # Anonymous user identifier for DAU/MAU analytics
    companion_id: Mapped[str | None] = mapped_column(
        String, nullable=True, index=True
    )  # Companion identifier for analytics

    __table_args__ = (
        Index("ix_messages_chatroom_created", "chatroom_id", "created_at"),
        Index("ix_messages_sender_type", "sender_type"),
    )
