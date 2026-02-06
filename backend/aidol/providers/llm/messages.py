"""LLM message types for provider abstraction.

Simple dataclass hierarchy replacing LangChain message types.
Provides type-safe messages for LLM API calls.
"""

from dataclasses import dataclass


@dataclass
class LLMMessage:
    """Base class for LLM chat messages.

    All LLM messages have content. Subclasses define the role.
    """

    content: str


@dataclass
class SystemMessage(LLMMessage):
    """System prompt message (role: system)."""


@dataclass
class HumanMessage(LLMMessage):
    """User message (role: user)."""


@dataclass
class AIMessage(LLMMessage):
    """Assistant message (role: assistant)."""
