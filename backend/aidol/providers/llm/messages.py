"""LLM message types for provider abstraction.

Simple dataclass hierarchy replacing LangChain message types.
Provides type-safe messages for LLM API calls.

Usage with dataclasses.asdict() for LLM API format:
    >>> from dataclasses import asdict
    >>> asdict(HumanMessage(content="Hello"))
    {'content': 'Hello', 'role': 'user'}
"""

from dataclasses import dataclass, field


@dataclass
class LLMMessage:
    """Base class for LLM chat messages.

    All LLM messages have content and role.
    Subclasses set the role field to their specific value.
    """

    content: str
    role: str = field(default="", init=False)


@dataclass
class SystemMessage(LLMMessage):
    """System prompt message (role: system)."""

    role: str = field(default="system", init=False)


@dataclass
class HumanMessage(LLMMessage):
    """User message (role: user)."""

    role: str = field(default="user", init=False)


@dataclass
class AIMessage(LLMMessage):
    """Assistant message (role: assistant)."""

    role: str = field(default="assistant", init=False)
