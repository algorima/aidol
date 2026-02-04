"""
AIdol repository protocols for type-safe dependency injection.

Defines the interface that AIdol Router expects from repositories.
Platform-specific integrators implement these protocols via adapters.
"""

# pylint: disable=unnecessary-ellipsis

from typing import Protocol

import PIL.Image
from aioia_core import CrudRepositoryProtocol
from pydantic import BaseModel
from sqlalchemy.orm import Session

from aidol.schemas import (
    AIdol,
    AIdolCreateWithClaim,
    AIdolLead,
    AIdolLeadCreate,
    AIdolUpdate,
    Chatroom,
    ChatroomCreate,
    ChatroomUpdate,
    Companion,
    CompanionCreate,
    CompanionUpdate,
    Message,
    MessageCreate,
)


class NoUpdate(BaseModel):
    """Placeholder for repositories without update support."""


class ChatroomRepositoryProtocol(
    CrudRepositoryProtocol[Chatroom, ChatroomCreate, ChatroomUpdate], Protocol
):
    """Protocol defining chatroom repository expectations.

    This protocol enables type-safe dependency injection by defining
    the exact interface that ChatroomRouter uses. Platform-specific
    adapters implement this protocol to convert their repository
    responses to aidol schemas.

    Inherits CRUD operations from CrudRepositoryProtocol.
    Additional domain-specific methods:
        get_messages_by_chatroom_id: Get messages with pagination.
        add_message_to_chatroom: Add a message to a chatroom.
    """

    def get_messages_by_chatroom_id(
        self, chatroom_id: str, limit: int, offset: int
    ) -> list[Message]:
        """Get messages from a chatroom with pagination.

        Args:
            chatroom_id: Chatroom ID.
            limit: Maximum number of messages.
            offset: Number of messages to skip.
        """
        ...

    def add_message_to_chatroom(
        self, chatroom_id: str, message: MessageCreate
    ) -> Message:
        """Add a message to a chatroom.

        Args:
            chatroom_id: Chatroom ID.
            message: MessageCreate or CompanionMessageCreate schema.
        """
        ...


class ChatroomRepositoryFactoryProtocol(Protocol):
    """Protocol for factory that creates ChatroomRepositoryProtocol instances.

    Implementations:
        - aidol.factories.ChatroomRepositoryFactory (standalone)
        - ChatroomRepositoryFactoryAdapter (platform integration)
    """

    def create_repository(
        self, db_session: Session | None = None
    ) -> ChatroomRepositoryProtocol:
        """Create a repository instance.

        Args:
            db_session: Optional database session.
        """
        ...


class AIdolRepositoryProtocol(
    CrudRepositoryProtocol[AIdol, AIdolCreateWithClaim, AIdolUpdate], Protocol
):
    """Protocol defining AIdol repository expectations.

    This protocol enables type-safe dependency injection by defining
    the exact interface that AIdolRouter uses. Inherits CRUD operations
    from CrudRepositoryProtocol.
    """


class AIdolRepositoryFactoryProtocol(Protocol):
    """Protocol for factory that creates AIdolRepositoryProtocol instances.

    Implementations:
        - aidol.factories.AIdolRepositoryFactory (standalone)
    """

    def create_repository(
        self, db_session: Session | None = None
    ) -> AIdolRepositoryProtocol:
        """Create a repository instance.

        Args:
            db_session: Optional database session.
        """
        ...


class CompanionRepositoryProtocol(
    CrudRepositoryProtocol[Companion, CompanionCreate, CompanionUpdate], Protocol
):
    """Protocol defining Companion repository expectations.

    This protocol enables type-safe dependency injection by defining
    the exact interface that CompanionRouter uses. Inherits CRUD operations
    from CrudRepositoryProtocol.
    """


class CompanionRepositoryFactoryProtocol(Protocol):
    """Protocol for factory that creates CompanionRepositoryProtocol instances.

    Implementations:
        - aidol.factories.CompanionRepositoryFactory (standalone)
    """

    def create_repository(
        self, db_session: Session | None = None
    ) -> CompanionRepositoryProtocol:
        """Create a repository instance.

        Args:
            db_session: Optional database session.
        """
        ...


class ImageStorageProtocol(Protocol):
    """Protocol for image storage operations.

    Enables dependency injection of storage implementations.
    Platform-specific adapters implement this protocol.

    Implementations:
        - ImageStorageAdapter (platform integration via StorageService)
    """

    def upload_image(self, image: PIL.Image.Image) -> str:
        """Upload an image and return the permanent URL.

        Args:
            image: PIL Image object to upload.
        """
        ...


class AIdolLeadRepositoryProtocol(
    CrudRepositoryProtocol[AIdolLead, AIdolLeadCreate, NoUpdate], Protocol
):
    """Protocol defining AIdolLead repository expectations.

    Inherits CRUD operations from CrudRepositoryProtocol.
    """


class AIdolLeadRepositoryFactoryProtocol(Protocol):
    """Protocol for factory that creates AIdolLeadRepositoryProtocol instances."""

    def create_repository(
        self, db_session: Session | None = None
    ) -> AIdolLeadRepositoryProtocol:
        """Create a repository instance."""
        ...
