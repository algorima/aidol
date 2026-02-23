"""Unit tests for GeminiLLMProvider."""

from __future__ import annotations

import unittest
from unittest.mock import patch

from litellm.types.utils import ModelResponse

from aidol.providers.llm.gemini import GeminiLLMProvider
from aidol.providers.llm.messages import HumanMessage, SystemMessage
from aidol.schemas import ModelSettings
from aidol.settings import GoogleGenAISettings


class TestGeminiLLMProvider(unittest.TestCase):
    """Tests for Gemini provider behavior."""

    def test_constraint_flags_are_false(self) -> None:
        """Gemini provider should not require special message constraints."""
        provider = GeminiLLMProvider(settings=GoogleGenAISettings(api_key="google-key"))
        self.assertFalse(provider.require_first_user_message)
        self.assertFalse(provider.combine_system_messages)
        self.assertFalse(provider.enforce_alternating_turns)

    def test_resolve_model_name_keeps_prefixed_model(self) -> None:
        """Provider-prefixed model should pass through unchanged."""
        provider = GeminiLLMProvider(settings=GoogleGenAISettings(api_key="google-key"))
        model = provider._resolve_model_name("gemini/gemini-2.5-flash")
        self.assertEqual(model, "gemini/gemini-2.5-flash")

    def test_resolve_model_name_uses_gemini_prefix_with_api_key(self) -> None:
        """Bare model should map to gemini/* when api_key exists."""
        provider = GeminiLLMProvider(settings=GoogleGenAISettings(api_key="google-key"))
        model = provider._resolve_model_name("gemini-2.5-flash")
        self.assertEqual(model, "gemini/gemini-2.5-flash")

    def test_resolve_model_name_uses_vertex_prefix_with_cloud_project(self) -> None:
        """Bare model should map to vertex_ai/* when cloud_project exists."""
        provider = GeminiLLMProvider(
            settings=GoogleGenAISettings(api_key="", cloud_project="my-project")
        )
        model = provider._resolve_model_name("gemini-2.5-pro")
        self.assertEqual(model, "vertex_ai/gemini-2.5-pro")

    def test_resolve_model_name_fallbacks_to_gemini_prefix(self) -> None:
        """Without settings, bare model should fallback to gemini/*."""
        provider = GeminiLLMProvider(settings=GoogleGenAISettings())
        model = provider._resolve_model_name("gemini-2.5-flash")
        self.assertEqual(model, "gemini/gemini-2.5-flash")

    @patch("aidol.providers.llm.gemini.litellm.completion")
    def test_completion_includes_reasoning_and_api_key(self, mock_completion) -> None:
        """Gemini API mode should pass api_key and reasoning settings."""
        provider = GeminiLLMProvider(settings=GoogleGenAISettings(api_key="google-key"))
        mock_completion.return_value = ModelResponse(
            model="gemini/gemini-2.5-flash",
            choices=[
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": "seoul"},
                    "finish_reason": "stop",
                }
            ],
        )
        model_settings = ModelSettings(
            chat_model="gemini-2.5-flash",
            temperature=0.2,
            seed=7,
            frequency_penalty=0.3,
            reasoning_effort="low",
        )
        messages = [SystemMessage(content="sys"), HumanMessage(content="capital?")]

        result = provider.completion(
            model_settings,
            messages,
            response_format={"type": "json_object"},
        )

        self.assertEqual(result, "seoul")
        kwargs = mock_completion.call_args.kwargs
        self.assertEqual(kwargs["model"], "gemini/gemini-2.5-flash")
        self.assertEqual(kwargs["api_key"], "google-key")
        self.assertEqual(kwargs["reasoning_effort"], "low")
        self.assertEqual(kwargs["seed"], 7)
        self.assertEqual(kwargs["frequency_penalty"], 0.3)
        self.assertEqual(kwargs["response_format"], {"type": "json_object"})
        self.assertFalse(kwargs["stream"])
        self.assertEqual(
            kwargs["messages"],
            [
                {"role": "system", "content": "sys"},
                {"role": "user", "content": "capital?"},
            ],
        )

    @patch("aidol.providers.llm.gemini.litellm.completion")
    def test_completion_vertex_mode_omits_api_key(self, mock_completion) -> None:
        """Vertex mode should use vertex_ai prefix and avoid api_key."""
        provider = GeminiLLMProvider(
            settings=GoogleGenAISettings(api_key="", cloud_project="my-project")
        )
        mock_completion.return_value = ModelResponse(
            model="vertex_ai/gemini-2.5-pro",
            choices=[
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": "ok"},
                    "finish_reason": "stop",
                }
            ],
        )
        model_settings = ModelSettings(chat_model="gemini-2.5-pro", temperature=0.0)

        result = provider.completion(model_settings, [HumanMessage(content="ping")])

        self.assertEqual(result, "ok")
        kwargs = mock_completion.call_args.kwargs
        self.assertEqual(kwargs["model"], "vertex_ai/gemini-2.5-pro")
        self.assertNotIn("api_key", kwargs)

    @patch("aidol.providers.llm.gemini.litellm.completion")
    def test_completion_raises_on_empty_string(self, mock_completion) -> None:
        """Empty content should raise an exception."""
        provider = GeminiLLMProvider(settings=GoogleGenAISettings(api_key="google-key"))
        mock_completion.return_value = ModelResponse(
            model="gemini/gemini-2.5-flash",
            choices=[
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": "   "},
                    "finish_reason": "stop",
                }
            ],
        )
        model_settings = ModelSettings(chat_model="gemini-2.5-flash")

        with self.assertRaisesRegex(ValueError, "empty response content"):
            provider.completion(model_settings, [HumanMessage(content="hello")])

    def test_extract_text_from_block_list(self) -> None:
        """List-based content blocks should be converted into text."""
        provider = GeminiLLMProvider(settings=GoogleGenAISettings(api_key="google-key"))
        result = provider._extract_text(
            [
                {"type": "text", "text": "first"},
                {"type": "text", "text": "second"},
            ]
        )
        self.assertEqual(result, "first\nsecond")

    @patch("aidol.providers.llm.gemini.lookup_context_window", return_value=654321)
    def test_get_context_size_delegates_lookup(self, mock_lookup) -> None:
        """Context size should be resolved via lookup utility."""
        provider = GeminiLLMProvider(settings=GoogleGenAISettings(api_key="google-key"))
        size = provider.get_context_size("gemini-2.5-flash")
        self.assertEqual(size, 654321)
        mock_lookup.assert_called_once_with("gemini-2.5-flash")


if __name__ == "__main__":
    unittest.main()
