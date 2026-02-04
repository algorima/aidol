"""OpenAI LLM Provider for AIdol standalone.

Default provider implementation using LangChain ChatOpenAI.
Uses aioia-core OpenAIAPISettings for configuration.
"""

from __future__ import annotations

from collections.abc import Sequence

from aioia_core.settings import OpenAIAPISettings
from langchain_core.messages import BaseMessage
from langchain_openai import ChatOpenAI

from aidol.providers.llm.base import lookup_context_window
from aidol.schemas import ModelSettings


class OpenAILLMProvider:
    """OpenAI LLM Provider using LangChain.

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
        messages: Sequence[BaseMessage],
        response_format: dict[str, str] | None = None,
    ) -> str:
        """Generate completion using ChatOpenAI.

        Args:
            model_settings: Model configuration (chat_model, temperature, etc.)
            messages: LangChain messages (BaseMessage).
            response_format: Optional response format (e.g., {"type": "json_object"}).

        Returns:
            Generated text response.
        """
        # Build model_kwargs with optional response_format
        model_kwargs: dict[str, dict[str, str]] = {}
        if response_format:
            model_kwargs["response_format"] = response_format

        # Initialize ChatOpenAI with model settings and explicit API key injection
        chat_model = ChatOpenAI(
            model=model_settings.chat_model,
            temperature=model_settings.temperature,
            seed=model_settings.seed,
            frequency_penalty=model_settings.frequency_penalty,
            model_kwargs=model_kwargs,
            openai_api_key=self._settings.api_key,  # type: ignore[arg-type]
            openai_organization=self._settings.organization,  # type: ignore[arg-type]
        )

        # Generate response
        response = chat_model.generate([list(messages)])
        return response.generations[0][0].text

    def get_context_size(self, model_name: str) -> int:
        """Get maximum context window size for OpenAI model.

        Uses LiteLLM's model_cost for dynamic lookup.

        Args:
            model_name: Model identifier (e.g., 'gpt-4o', 'gpt-4o-mini')

        Returns:
            Maximum context window size in tokens.
        """
        return lookup_context_window(model_name)
