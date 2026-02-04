"""Context engineering for AIdol.

This module provides context composition utilities for LLM calls.
Integrators can extend these base implementations for platform-specific features.

Components:
- MessageContextBuilder: Builder pattern for assembling LLM context
"""

from aidol.context.builder import (
    MessageContextBuilder,
    deduplicate_consecutive_same_role_messages,
    ensure_first_user_message,
    format_datetime_korean,
    format_utc_offset,
    verify_system_messages_at_front,
)

__all__ = [
    "MessageContextBuilder",
    "deduplicate_consecutive_same_role_messages",
    "ensure_first_user_message",
    "format_datetime_korean",
    "format_utc_offset",
    "verify_system_messages_at_front",
]
