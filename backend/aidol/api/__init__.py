"""
AIdol API routers
"""

from aidol.api.aidol import AIdolRouter, create_aidol_router
from aidol.api.chatroom import ChatroomRouter, create_chatroom_router
from aidol.api.companion import CompanionRouter, create_companion_router

__all__ = [
    "AIdolRouter",
    "ChatroomRouter",
    "CompanionRouter",
    "create_aidol_router",
    "create_chatroom_router",
    "create_companion_router",
]
