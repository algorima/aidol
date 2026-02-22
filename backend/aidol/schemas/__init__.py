"""
AIdol Pydantic schemas
"""

from aidol.schemas.aidol import (
    AIdol,
    AIdolBase,
    AIdolCreate,
    AIdolCreateWithAnonymousId,
    AIdolPublic,
    AIdolUpdate,
    ImageGenerationData,
    ImageGenerationRequest,
    ImageGenerationResponse,
)
from aidol.schemas.aidol import Status as AIdolStatus
from aidol.schemas.aidol_lead import AIdolLead, AIdolLeadBase, AIdolLeadCreate
from aidol.schemas.chatroom import (
    AudioFormat,
    Chatroom,
    ChatroomBase,
    ChatroomCreate,
    ChatroomCreateWithAnonymousId,
    ChatroomListItem,
    ChatroomUpdate,
    CompanionMessage,
    CompanionMessageCreate,
    LastMessage,
    Message,
    MessageBase,
    MessageCreate,
    MessageCreateWithAnonymousId,
    SenderType,
)
from aidol.schemas.companion import (
    Companion,
    CompanionBase,
    CompanionCreate,
    CompanionPublic,
    CompanionStats,
    CompanionUpdate,
    Gender,
    Grade,
    Position,
)
from aidol.schemas.companion import Status as CompanionStatus
from aidol.schemas.companion_relationship import (
    CompanionRelationship,
    CompanionRelationshipBase,
    CompanionRelationshipCreate,
    CompanionRelationshipUpdate,
)
from aidol.schemas.highlight import (
    AIdolHighlight,
    AIdolHighlightBase,
    AIdolHighlightCreate,
    AIdolHighlightUpdate,
    HighlightMessage,
    HighlightMessageBase,
    HighlightMessageCreate,
    HighlightMessageUpdate,
)
from aidol.schemas.model_settings import ModelSettings, ModelSettingsBase
from aidol.schemas.persona import Persona

__all__ = [
    # AIdol
    "AIdol",
    "AIdolBase",
    "AIdolCreate",
    "AIdolCreateWithAnonymousId",
    "AIdolPublic",
    "AIdolUpdate",
    "ImageGenerationData",
    "ImageGenerationRequest",
    "ImageGenerationResponse",
    "AIdolStatus",
    # AIdolLead
    "AIdolLead",
    "AIdolLeadBase",
    "AIdolLeadCreate",
    # Chatroom
    "AudioFormat",
    "Chatroom",
    "ChatroomBase",
    "ChatroomCreate",
    "ChatroomCreateWithAnonymousId",
    "ChatroomListItem",
    "ChatroomUpdate",
    "CompanionMessage",
    "CompanionMessageCreate",
    "LastMessage",
    "Message",
    "MessageBase",
    "MessageCreate",
    "MessageCreateWithAnonymousId",
    "SenderType",
    # Companion
    "Companion",
    "CompanionBase",
    "CompanionCreate",
    "CompanionPublic",
    "CompanionStats",
    "CompanionUpdate",
    "Gender",
    "Grade",
    "Position",
    "CompanionStatus",
    # CompanionRelationship
    "CompanionRelationship",
    "CompanionRelationshipBase",
    "CompanionRelationshipCreate",
    "CompanionRelationshipUpdate",
    # Highlight
    "AIdolHighlight",
    "AIdolHighlightBase",
    "AIdolHighlightCreate",
    "AIdolHighlightUpdate",
    "HighlightMessage",
    "HighlightMessageBase",
    "HighlightMessageCreate",
    "HighlightMessageUpdate",
    # Model Settings
    "ModelSettings",
    "ModelSettingsBase",
    # Persona
    "Persona",
]
