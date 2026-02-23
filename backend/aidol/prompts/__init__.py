"""Prompt utilities for AIdol chat."""

from aidol.prompts.composer import (
    build_chat_system_prompt,
    build_initial_system_prompt,
    render_chat_base_prompt,
    render_initial_base_prompt,
)
from aidol.prompts.first_system_prompt import FIRST_PROMPT_TEMPLATE

__all__ = [
    "FIRST_PROMPT_TEMPLATE",
    "build_chat_system_prompt",
    "build_initial_system_prompt",
    "render_chat_base_prompt",
    "render_initial_base_prompt",
]
