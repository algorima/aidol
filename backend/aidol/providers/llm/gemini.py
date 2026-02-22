"""Gemini LLM Provider for AIdol standalone.

Uses LiteLLM for Gemini API / Vertex AI calls.
"""

from __future__ import annotations

from collections.abc import Sequence
from dataclasses import asdict

import litellm
from litellm.types.utils import Choices, ModelResponse

from aidol.providers.llm.base import lookup_context_window
from aidol.providers.llm.messages import LLMMessage
from aidol.schemas import ModelSettings
from aidol.settings import GoogleGenAISettings


class GeminiLLMProvider:
    """Gemini LLM Provider using LiteLLM."""

    def __init__(self, settings: GoogleGenAISettings | None = None) -> None:
        """Initialize Gemini provider settings.

        Args:
            settings: Google Gen AI settings.
                - api_key: Google AI API key (Gemini API mode)
                - cloud_project: GCP project id (Vertex AI mode)
        """
        self._settings = settings or GoogleGenAISettings()

    @property
    def require_first_user_message(self) -> bool:
        """Gemini accepts system-first conversation."""
        return False

    @property
    def combine_system_messages(self) -> bool:
        """Gemini handles multiple system messages."""
        return False

    @property
    def enforce_alternating_turns(self) -> bool:
        """Gemini allows consecutive messages from same role."""
        return False

    def completion(
        self,
        model_settings: ModelSettings,
        messages: Sequence[LLMMessage],
        response_format: dict[str, str] | None = None,
    ) -> str:
        """Generate completion using LiteLLM."""
        litellm_messages = [asdict(msg) for msg in messages]
        model = self._resolve_model_name(model_settings.chat_model)

        kwargs: dict = {
            "model": model,
            "messages": litellm_messages,
            "temperature": model_settings.temperature,
        }
        reasoning_effort = model_settings.reasoning_effort

        # Gemini API key mode.
        if model.startswith("gemini/") and self._settings.api_key:
            kwargs["api_key"] = self._settings.api_key

        if model_settings.seed is not None:
            kwargs["seed"] = model_settings.seed
        if model_settings.frequency_penalty != 0.0:
            kwargs["frequency_penalty"] = model_settings.frequency_penalty
        if reasoning_effort:
            kwargs["reasoning_effort"] = reasoning_effort
        if response_format:
            kwargs["response_format"] = response_format

        response = litellm.completion(**kwargs, stream=False)

        assert isinstance(response, ModelResponse)
        choice = response.choices[0]
        assert isinstance(choice, Choices)
        text = self._extract_text(choice.message.content)
        if text is not None:
            return text

        raise ValueError("Gemini returned empty response content.")

    def _resolve_model_name(self, chat_model: str) -> str:
        """Resolve model name to provider-prefixed format for LiteLLM.

        Rules:
        - Already prefixed (`gemini/...` or `vertex_ai/...`): keep as-is
        - api_key present: use Gemini API (`gemini/...`)
        - cloud_project present: use Vertex AI (`vertex_ai/...`)
        - fallback: default to Gemini API prefix
        """
        if "/" in chat_model:
            return chat_model

        if self._settings.api_key:
            return f"gemini/{chat_model}"
        if self._settings.cloud_project:
            return f"vertex_ai/{chat_model}"
        return f"gemini/{chat_model}"

    def _extract_text(self, content) -> str | None:
        """Extract plain text from provider response content."""
        if isinstance(content, str):
            stripped = content.strip()
            return stripped if stripped else None

        if isinstance(content, list):
            texts: list[str] = []
            for block in content:
                if not isinstance(block, dict):
                    continue

                text = block.get("text")
                if isinstance(text, str) and text.strip():
                    texts.append(text.strip())

            if texts:
                return "\n".join(texts)

        return None

    def get_context_size(self, model_name: str) -> int:
        """Get maximum context window size for Gemini model."""
        return lookup_context_window(model_name)
