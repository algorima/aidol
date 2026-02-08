"""
AIdol repositories
"""

from aidol.repositories.aidol import AIdolRepository
from aidol.repositories.aidol_lead import AIdolLeadRepository
from aidol.repositories.chatroom import ChatroomRepository
from aidol.repositories.companion import CompanionRepository
from aidol.repositories.companion_relationship import CompanionRelationshipRepository
from aidol.repositories.highlight import (
    AIdolHighlightRepository,
    HighlightMessageRepository,
)

__all__ = [
    "AIdolRepository",
    "AIdolLeadRepository",
    "AIdolHighlightRepository",
    "ChatroomRepository",
    "CompanionRepository",
    "CompanionRelationshipRepository",
    "HighlightMessageRepository",
]
