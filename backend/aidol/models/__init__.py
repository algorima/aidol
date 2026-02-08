"""
AIdol database models
"""

from aidol.models.aidol import DBAIdol
from aidol.models.aidol_lead import DBAIdolLead
from aidol.models.chatroom import DBChatroom, DBMessage
from aidol.models.companion import DBCompanion
from aidol.models.companion_relationship import DBCompanionRelationship
from aidol.models.highlight import DBAIdolHighlight, DBHighlightMessage

__all__ = [
    "DBAIdol",
    "DBAIdolLead",
    "DBChatroom",
    "DBCompanion",
    "DBCompanionRelationship",
    "DBAIdolHighlight",
    "DBHighlightMessage",
    "DBMessage",
]
