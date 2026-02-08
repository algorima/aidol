"""
AIdol repository factories

Uses BaseRepositoryFactory for BaseCrudRouter compatibility.
"""

from aioia_core.factories import BaseRepositoryFactory

from aidol.repositories.aidol import AIdolRepository
from aidol.repositories.aidol_lead import AIdolLeadRepository
from aidol.repositories.chatroom import ChatroomRepository
from aidol.repositories.companion import CompanionRepository
from aidol.repositories.companion_relationship import CompanionRelationshipRepository
from aidol.repositories.highlight import (
    AIdolHighlightRepository,
    HighlightMessageRepository,
)


class AIdolRepositoryFactory(BaseRepositoryFactory[AIdolRepository]):
    """Factory for creating AIdol repositories."""

    def __init__(self):
        super().__init__(repository_class=AIdolRepository)


class ChatroomRepositoryFactory(BaseRepositoryFactory[ChatroomRepository]):
    """Factory for creating Chatroom repositories."""

    def __init__(self):
        super().__init__(repository_class=ChatroomRepository)


class CompanionRepositoryFactory(BaseRepositoryFactory[CompanionRepository]):
    """Factory for creating Companion repositories."""

    def __init__(self):
        super().__init__(repository_class=CompanionRepository)


class AIdolLeadRepositoryFactory(BaseRepositoryFactory[AIdolLeadRepository]):
    """Factory for creating AIdolLead repositories."""

    def __init__(self):
        super().__init__(repository_class=AIdolLeadRepository)


class AIdolHighlightRepositoryFactory(BaseRepositoryFactory[AIdolHighlightRepository]):
    """Factory for creating AIdolHighlight repositories."""

    def __init__(self):
        super().__init__(repository_class=AIdolHighlightRepository)


class HighlightMessageRepositoryFactory(
    BaseRepositoryFactory[HighlightMessageRepository]
):
    """Factory for creating HighlightMessage repositories."""

    def __init__(self):
        super().__init__(repository_class=HighlightMessageRepository)


class CompanionRelationshipRepositoryFactory(
    BaseRepositoryFactory[CompanionRelationshipRepository]
):
    """Factory for creating CompanionRelationship repositories."""

    def __init__(self):
        super().__init__(repository_class=CompanionRelationshipRepository)
