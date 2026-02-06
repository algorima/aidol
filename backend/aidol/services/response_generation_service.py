"""Response generation service for TEXT responses.

Service layer for generating LLM responses.
Integrators can extend for AUDIO/VIDEO response types.
"""

from __future__ import annotations

from langchain_core.messages import BaseMessage, SystemMessage

from aidol.providers.llm import LLMProvider
from aidol.schemas import ModelSettings


class ResponseGenerationService:
    """Response generation service for TEXT responses.

    Basic implementation for text-only response generation.
    Integrators can extend for additional response types (AUDIO/VIDEO).

    Responsibilities:
    - Provide response format prompts (empty for TEXT)
    - Generate response from prepared context
    """

    def __init__(
        self,
        provider: LLMProvider,
        model_settings: ModelSettings,
    ) -> None:
        """Initialize ResponseGenerationService.

        Args:
            provider: LLMProvider for LLM calls.
            model_settings: Model configuration (model name, temperature, etc.)
        """
        self.provider = provider
        self.model_settings = model_settings

    def get_response_format_prompts(self) -> list[SystemMessage]:
        """Get response format prompts for TEXT responses.

        This method encapsulates the responsibility of creating format-specific prompts,
        ensuring that prompt configuration remains within the service layer.

        TEXT responses don't require additional format prompts.
        Integrators can override for AUDIO/VIDEO response types.

        Returns:
            Empty list for TEXT responses.
        """
        return []

    def generate_response(self, context: list[BaseMessage]) -> str:
        """Generate response from prepared context.

        Args:
            context: Prepared context from ContextService.

        Returns:
            Generated text response.
        """
        return self.provider.completion(self.model_settings, context)
