"""LLM Provider abstractions for AIdol.

This module defines the LLMProvider Protocol for platform-agnostic LLM integration.
Integrators can implement this protocol using any LLM SDK (LangChain, LiteLLM, etc.).
"""

from aidol.providers.llm.base import LLMProvider

__all__ = ["LLMProvider"]
