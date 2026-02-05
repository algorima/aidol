"""LLM Provider Protocol for AIdol.

This module defines the LLMProvider Protocol for platform-agnostic LLM integration.
Implementations can use any LLM SDK (LangChain, LiteLLM, direct API calls, etc.).
Uses LangChain message types for type safety in the interface.
"""

# pylint: disable=unnecessary-ellipsis,redundant-returns-doc

from __future__ import annotations

from collections.abc import Sequence
from typing import Protocol

import litellm
from langchain_core.messages import BaseMessage

from aidol.schemas import ModelSettings


def lookup_context_window(model_name: str) -> int:
    """Look up the total context window for a given model using LiteLLM's model_cost.

    In LiteLLM's model_cost structure:
    - 'max_input_tokens': Total context window size (input + output combined)
    - 'max_tokens'/'max_output_tokens': Maximum output tokens only

    Returns the value of 'max_input_tokens' which represents the total context window.
    Raises ValueError if not found.
    """
    if model_name in litellm.model_cost:
        model_info = litellm.model_cost[model_name]
        if "max_input_tokens" in model_info:
            return model_info["max_input_tokens"]
    raise ValueError(
        f"Context window for model '{model_name}' not found in LiteLLM model_cost."
    )


class ProviderConstraints(Protocol):
    """Protocol for provider constraints used in context building.

    Defines only the constraint properties needed by MessageContextBuilder.
    This minimal interface allows integrators to pass their existing provider
    implementations without implementing the full LLMProvider interface.
    """

    @property
    def require_first_user_message(self) -> bool:
        """Whether the provider requires first message to be from user."""
        ...

    @property
    def combine_system_messages(self) -> bool:
        """Whether multiple system messages should be combined into one."""
        ...

    @property
    def enforce_alternating_turns(self) -> bool:
        """Whether messages must alternate between user and assistant."""
        ...


class LLMProvider(ProviderConstraints, Protocol):
    """Protocol for LLM providers.

    Extends ProviderConstraints with full LLM functionality.
    Defines the interface for LLM integration in AIdol.
    Implementations are free to use any underlying SDK.

    Example implementations:
    - LangChain wrapper (for LangChain-based integrators)
    - LiteLLM direct calls (for standalone aidol)
    - Direct API calls (for custom integrations)

    Uses LangChain message types for type safety in the interface.
    """

    @property
    def require_first_user_message(self) -> bool:
        """Whether the provider requires first message to be from user.

        Anthropic: True (Claude requires user message first)
        OpenAI: False (GPT accepts system-only conversations)
        """
        ...

    @property
    def combine_system_messages(self) -> bool:
        """Whether multiple system messages should be combined into one.

        Anthropic: True (Claude prefers single system message)
        OpenAI: False (GPT handles multiple system messages)
        """
        ...

    @property
    def enforce_alternating_turns(self) -> bool:
        """Whether messages must alternate between user and assistant.

        Anthropic: True (Claude requires strict alternation)
        OpenAI: False (GPT allows consecutive same-role messages)
        """
        ...

    def completion(
        self,
        model_settings: ModelSettings,
        messages: Sequence[BaseMessage],
        response_format: dict[str, str] | None = None,
    ) -> str:
        """Generate completion from messages.

        Args:
            model_settings: Model configuration (model name, temperature, etc.)
            messages: LangChain messages (BaseMessage).
            response_format: Optional response format specification.
                Example: {"type": "json_object"}
                Note: Not all providers support this (e.g., Anthropic ignores it).

        Returns:
            Generated text response.

        Raises:
            Implementation-specific exceptions propagate to caller.
        """
        ...

    def get_context_size(self, model_name: str) -> int:
        """Get the maximum total context window size for the given model.

        The context window represents the total number of tokens that can be used
        for both input messages and model output combined in a single API call.
        This is NOT the maximum output tokens alone.

        This value is used by the application to:
        1. Check if input messages exceed the available token limit
        2. Reserve tokens for model output (completion)
        3. Truncate old messages when the context becomes too large

        Args:
            model_name: Model identifier (e.g., 'gpt-4o', 'claude-3-opus-20240229')

        Returns:
            Maximum total context window size in tokens (input + output combined).
        """
        ...
