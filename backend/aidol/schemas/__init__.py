"""
AIdol Pydantic schemas
"""

from aidol.schemas.aidol import (
    AIdol,
    AIdolBase,
    AIdolCreate,
    AIdolCreateWithClaim,
    AIdolPublic,
    AIdolUpdate,
    ImageGenerationData,
    ImageGenerationRequest,
    ImageGenerationResponse,
)
from aidol.schemas.aidol_lead import AIdolLead, AIdolLeadBase, AIdolLeadCreate
from aidol.schemas.chatroom import (
    AudioFormat,
    Chatroom,
    ChatroomBase,
    ChatroomCreate,
    ChatroomUpdate,
    CompanionMessage,
    CompanionMessageCreate,
    Message,
    MessageBase,
    MessageCreate,
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
from aidol.schemas.model_settings import ModelSettings, ModelSettingsBase
from aidol.schemas.persona import Persona

__all__ = [
    # AIdol
    "AIdol",
    "AIdolBase",
    "AIdolCreate",
    "AIdolCreateWithClaim",
    "AIdolPublic",
    "AIdolUpdate",
    "ImageGenerationData",
    "ImageGenerationRequest",
    "ImageGenerationResponse",
    # AIdolLead
    "AIdolLead",
    "AIdolLeadBase",
    "AIdolLeadCreate",
    # Chatroom
    "AudioFormat",
    "Chatroom",
    "ChatroomBase",
    "ChatroomCreate",
    "ChatroomUpdate",
    "CompanionMessage",
    "CompanionMessageCreate",
    "Message",
    "MessageBase",
    "MessageCreate",
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
    # Model Settings
    "ModelSettings",
    "ModelSettingsBase",
    # Persona
    "Persona",
]
