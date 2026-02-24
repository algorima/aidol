"""Prompt utilities for AIdol chat."""

from aidol.prompts.base_system_prompt import COMMON_SYSTEM_PROMPT_BASE
from aidol.prompts.chat_prompt import CHAT_PROMPT
from aidol.prompts.composer import (
    build_chat_system_prompt,
    build_initial_system_prompt,
    render_chat_base_prompt,
    render_initial_base_prompt,
)
from aidol.prompts.greeting_prompt import GREETING_PROMPT

__all__ = [
    "CHAT_PROMPT",
    "COMMON_SYSTEM_PROMPT_BASE",
    "GREETING_PROMPT",
    "build_chat_system_prompt",
    "build_initial_system_prompt",
    "render_chat_base_prompt",
    "render_initial_base_prompt",
]
