"""OpenAI LLM Provider for AIdol standalone.

Default provider implementation using LiteLLM.
Uses aioia-core OpenAIAPISettings for configuration.
"""

from __future__ import annotations

from collections.abc import Sequence

import litellm
from aioia_core.settings import OpenAIAPISettings

from aidol.providers.llm.base import lookup_context_window
from aidol.providers.llm.messages import (
    AIMessage,
    HumanMessage,
    LLMMessage,
    SystemMessage,
)
from aidol.schemas import ModelSettings


def _to_litellm_format(messages: Sequence[LLMMessage]) -> list[dict[str, str]]:
    """Convert LLMMessage to LiteLLM message format.

    Args:
        messages: LLMMessage list.

    Returns:
        List of dicts with 'role' and 'content' keys for LiteLLM.
    """
    result: list[dict[str, str]] = []
    for msg in messages:
        if isinstance(msg, SystemMessage):
            role = "system"
        elif isinstance(msg, HumanMessage):
            role = "user"
        elif isinstance(msg, AIMessage):
            role = "assistant"
        else:
            raise ValueError(f"Unknown message type: {type(msg)}")
        result.append({"role": role, "content": msg.content})
    return result


class OpenAILLMProvider:
    """OpenAI LLM Provider using LiteLLM.

    Default implementation for AIdol standalone apps.
    Uses aioia-core OpenAIAPISettings for explicit API key injection.

    Constraint properties:
    - require_first_user_message: False (OpenAI accepts system-only)
    - combine_system_messages: False (OpenAI handles multiple system messages)
    - enforce_alternating_turns: False (OpenAI allows consecutive same-role)
    """

    def __init__(self, settings: OpenAIAPISettings | None = None) -> None:
        """Initialize with explicit settings injection.

        Args:
            settings: OpenAI API settings. If None, loads from environment variables.
        """
        self._settings = settings or OpenAIAPISettings()

    @property
    def require_first_user_message(self) -> bool:
        """OpenAI accepts system-only conversations."""
        return False

    @property
    def combine_system_messages(self) -> bool:
        """OpenAI handles multiple system messages natively."""
        return False

    @property
    def enforce_alternating_turns(self) -> bool:
        """OpenAI allows consecutive messages from same role."""
        return False

    def completion(
        self,
        model_settings: ModelSettings,
        messages: Sequence[LLMMessage],
        response_format: dict[str, str] | None = None,
    ) -> str:
        """Generate completion using LiteLLM.

        Args:
            model_settings: Model configuration (chat_model, temperature, etc.)
            messages: LLM messages (LLMMessage subclasses).
            response_format: Optional response format (e.g., {"type": "json_object"}).

        Returns:
            Generated text response.
        """
        # Convert to LiteLLM format
        litellm_messages = _to_litellm_format(messages)

        # Build kwargs
        kwargs: dict = {
            "model": model_settings.chat_model,
            "messages": litellm_messages,
            "temperature": model_settings.temperature,
            "api_key": self._settings.api_key,
        }

        # Add optional parameters
        if model_settings.seed is not None:
            kwargs["seed"] = model_settings.seed
        if model_settings.frequency_penalty != 0.0:
            kwargs["frequency_penalty"] = model_settings.frequency_penalty
        if response_format:
            kwargs["response_format"] = response_format
        if self._settings.organization:
            kwargs["organization"] = self._settings.organization

        # Call LiteLLM
        response = litellm.completion(**kwargs)

        # Extract content from LiteLLM response
        return response.choices[0].message.content

    def get_context_size(self, model_name: str) -> int:
        """Get maximum context window size for OpenAI model.

        Uses LiteLLM's model_cost for dynamic lookup.

        Args:
            model_name: Model identifier (e.g., 'gpt-4o', 'gpt-4o-mini')

        Returns:
            Maximum context window size in tokens.
        """
        return lookup_context_window(model_name)
