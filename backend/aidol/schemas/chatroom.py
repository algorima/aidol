"""
AIdol chatroom, message, and related schemas
"""

from datetime import datetime, timezone
from enum import Enum, unique

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field

# =============================================================================
# Enums
# =============================================================================


@unique
class SenderType(str, Enum):
    """
    Sender types for chat messages.

    Core types for AIdol standalone. Platform-specific integrators
    may define their own extended SenderType with additional values.
    """

    USER = "USER"
    COMPANION = "COMPANION"


@unique
class AudioFormat(str, Enum):
    """Audio format types."""

    MP3 = "MP3"
    WAV = "WAV"
    OGG = "OGG"


# =============================================================================
# Message Schemas
# =============================================================================


class MessageBase(BaseModel):
    """Base message model with common fields."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    content: str = Field(..., description="Message content")
    sender_type: SenderType = Field(
        default=SenderType.USER, description="Type of the sender"
    )


class Message(MessageBase):
    """Message response schema with id and timestamp."""

    model_config = ConfigDict(
        frozen=True, populate_by_name=True, alias_generator=camelize
    )

    id: str = Field(..., description="Unique message identifier")
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="Message creation timestamp",
    )

    def is_user(self) -> bool:
        """Check if message is from user"""
        return self.sender_type == SenderType.USER

    def is_companion(self) -> bool:
        """Check if message is from companion (AI)"""
        return self.sender_type == SenderType.COMPANION


class CompanionMessage(Message):
    """Companion message response schema."""

    sender_type: SenderType = Field(
        default=SenderType.COMPANION, description="Type of the sender"
    )


class MessageCreate(MessageBase):
    """API body schema for creating a message (no id, no timestamp).

    anonymous_id is excluded (read from Cookie by router).
    """


class MessageCreateWithAnonymousId(MessageBase):
    """Internal schema for repository with anonymous_id.

    Used by router to pass Cookie-based anonymous_id to repository.
    """

    anonymous_id: str | None = Field(
        default=None, description="Anonymous user identifier for analytics"
    )


class CompanionMessageCreate(MessageCreateWithAnonymousId):
    """Schema for creating a companion message.

    companion_id is optional for aidol standalone but may be required for platform integration.
    When provided, it's used to identify the companion in the platform's companion system.
    """

    sender_type: SenderType = Field(
        default=SenderType.COMPANION, description="Type of the sender"
    )
    companion_id: str | None = Field(
        default=None, description="Companion ID for platform integration"
    )


# =============================================================================
# Chatroom Schemas
# =============================================================================


class ChatroomBase(BaseModel):
    """Base chatroom model with common fields."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    name: str = Field(..., description="Chatroom name")
    language: str = Field(default="en", description="Chatroom language")


class Chatroom(ChatroomBase):
    """Chatroom response schema with id and timestamps."""

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="Chatroom ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


class ChatroomCreate(ChatroomBase):
    """Schema for creating a chatroom (no id)."""


class ChatroomCreateWithAnonymousId(ChatroomBase):
    """Internal schema for creating a chatroom with owner anonymous_id."""

    anonymous_id: str = Field(..., description="Chatroom owner anonymous identifier")


class ChatroomUpdate(BaseModel):
    """Schema for updating a chatroom (all fields optional)."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    name: str | None = Field(default=None, description="Chatroom name")
    language: str | None = Field(default=None, description="Chatroom language")


class LastMessage(BaseModel):
    """Last message summary for chatroom list responses."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    created_at: datetime = Field(..., description="Last message creation timestamp")
    content: str = Field(..., description="Last message content")


class ChatroomWithLastMessage(Chatroom):
    """Chatroom response schema with last message summary."""

    last_message: LastMessage | None = Field(
        default=None, description="Last message in the chatroom"
    )
