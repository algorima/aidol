"""Unit tests for OpenAILLMProvider."""

from __future__ import annotations

import unittest
from unittest.mock import patch

from aioia_core.settings import OpenAIAPISettings
from litellm.types.utils import ModelResponse

from aidol.providers.llm.messages import HumanMessage, SystemMessage
from aidol.providers.llm.openai import OpenAILLMProvider
from aidol.schemas import ModelSettings


class TestOpenAILLMProvider(unittest.TestCase):
    """Tests for OpenAI provider behavior."""

    def setUp(self) -> None:
        self.provider = OpenAILLMProvider(
            settings=OpenAIAPISettings(api_key="openai-key", organization="org-123")
        )

    def test_constraint_flags_are_false(self) -> None:
        """OpenAI provider should not require special message constraints."""
        self.assertFalse(self.provider.require_first_user_message)
        self.assertFalse(self.provider.combine_system_messages)
        self.assertFalse(self.provider.enforce_alternating_turns)

    @patch("aidol.providers.llm.openai.litellm.completion")
    def test_completion_sends_required_kwargs(self, mock_completion) -> None:
        """Provider should pass required arguments and return response text."""
        mock_completion.return_value = ModelResponse(
            model="gpt-4o-mini",
            choices=[
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": "hello"},
                    "finish_reason": "stop",
                }
            ],
        )
        model_settings = ModelSettings(chat_model="gpt-4o-mini", temperature=0.3)
        messages = [SystemMessage(content="sys"), HumanMessage(content="hi")]

        result = self.provider.completion(model_settings, messages)

        self.assertEqual(result, "hello")
        mock_completion.assert_called_once()
        kwargs = mock_completion.call_args.kwargs
        self.assertEqual(kwargs["model"], "gpt-4o-mini")
        self.assertEqual(kwargs["temperature"], 0.3)
        self.assertEqual(kwargs["api_key"], "openai-key")
        self.assertEqual(kwargs["organization"], "org-123")
        self.assertFalse(kwargs["stream"])
        self.assertEqual(
            kwargs["messages"],
            [
                {"role": "system", "content": "sys"},
                {"role": "user", "content": "hi"},
            ],
        )

    @patch("aidol.providers.llm.openai.litellm.completion")
    def test_completion_sends_optional_kwargs(self, mock_completion) -> None:
        """Provider should include optional model settings when provided."""
        mock_completion.return_value = ModelResponse(
            model="gpt-4o-mini",
            choices=[
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": "done"},
                    "finish_reason": "stop",
                }
            ],
        )
        model_settings = ModelSettings(
            chat_model="gpt-4o-mini",
            temperature=0.1,
            seed=42,
            frequency_penalty=0.5,
        )

        result = self.provider.completion(
            model_settings,
            [HumanMessage(content="ping")],
            response_format={"type": "json_object"},
        )

        self.assertEqual(result, "done")
        kwargs = mock_completion.call_args.kwargs
        self.assertEqual(kwargs["seed"], 42)
        self.assertEqual(kwargs["frequency_penalty"], 0.5)
        self.assertEqual(kwargs["response_format"], {"type": "json_object"})

    @patch("aidol.providers.llm.openai.lookup_context_window", return_value=123456)
    def test_get_context_size_delegates_lookup(self, mock_lookup) -> None:
        """Context size should be resolved via lookup utility."""
        size = self.provider.get_context_size("gpt-4o-mini")
        self.assertEqual(size, 123456)
        mock_lookup.assert_called_once_with("gpt-4o-mini")


if __name__ == "__main__":
    unittest.main()
