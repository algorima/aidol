"""LLM message types for provider abstraction.

Simple dataclass hierarchy replacing LangChain message types.
Provides type-safe messages for LLM API calls.

Usage with dataclasses.asdict() for LLM API format:
    >>> from dataclasses import asdict
    >>> asdict(HumanMessage(content="Hello"))
    {'content': 'Hello', 'role': 'user'}

Multimodal content (images) uses list format:
    >>> asdict(HumanMessage(content=[
    ...     {"type": "text", "text": "What's in this image?"},
    ...     {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,..."}}
    ... ]))
    {'content': [...], 'role': 'user'}
"""

from dataclasses import dataclass, field
from typing import Literal, TypedDict


class TextBlock(TypedDict):
    """Text content block in OpenAI/LiteLLM format."""

    type: Literal["text"]
    text: str


class ImageUrlValue(TypedDict):
    """Image URL value in OpenAI/LiteLLM format."""

    url: str


class ImageUrlBlock(TypedDict):
    """Image content block in OpenAI/LiteLLM format."""

    type: Literal["image_url"]
    image_url: ImageUrlValue


# Content block types for multimodal messages
ContentBlock = TextBlock | ImageUrlBlock

# Message content can be simple string or list of content blocks
MessageContent = str | list[ContentBlock]


@dataclass
class LLMMessage:
    """Base class for LLM chat messages.

    All LLM messages have content and role.
    Subclasses set the role field to their specific value.

    Content can be:
    - str: Simple text message
    - list: Multimodal content (text + images) in OpenAI format
    """

    content: MessageContent
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
