"""Tests for aidol context utility functions.

Tests for ensure_first_user_message and deduplicate_consecutive_same_role_messages.
"""

from __future__ import annotations

import unittest

from aidol.context import (
    deduplicate_consecutive_same_role_messages,
    ensure_first_user_message,
)
from aidol.providers.llm.messages import AIMessage, HumanMessage, SystemMessage


class TestEnsureFirstUserMessage(unittest.TestCase):
    """Tests for ensure_first_user_message function."""

    def test_ensure_first_user_message_user_message_exists(self) -> None:
        """Test ensure_first_user_message function when a user message already exists."""
        messages = [
            SystemMessage(content="System prompt"),
            HumanMessage(content="User message"),
            AIMessage(content="Assistant response"),
        ]
        ensure_first_user_message(messages)
        self.assertEqual(len(messages), 3)
        self.assertEqual(messages[0].content, "System prompt")
        self.assertEqual(messages[1].content, "User message")
        self.assertEqual(messages[2].content, "Assistant response")

    def test_ensure_first_user_message_user_message_added(self) -> None:
        """Test ensure_first_user_message function when a user message needs to be added."""
        messages = [
            SystemMessage(content="System prompt"),
            AIMessage(content="Assistant response"),
        ]
        ensure_first_user_message(messages)
        self.assertEqual(len(messages), 3)
        self.assertEqual(messages[0].content, "System prompt")
        self.assertEqual(messages[1].content, ".")
        self.assertEqual(messages[2].content, "Assistant response")


class TestDeduplicateConsecutiveSameRoleMessages(unittest.TestCase):
    """Tests for deduplicate_consecutive_same_role_messages function."""

    def test_deduplicate_consecutive_same_role_messages_no_change(self) -> None:
        """Test deduplicate_consecutive_same_role_messages function when no change is needed."""
        messages = [
            SystemMessage(content="System prompt"),
            HumanMessage(content="User message"),
            AIMessage(content="Assistant response"),
        ]
        result = deduplicate_consecutive_same_role_messages(messages)
        self.assertEqual(len(result), 3)
        self.assertEqual(result[0].content, "System prompt")
        self.assertEqual(result[1].content, "User message")
        self.assertEqual(result[2].content, "Assistant response")

    def test_deduplicate_consecutive_same_role_messages_replace_human_message(
        self,
    ) -> None:
        """Test deduplicate_consecutive_same_role_messages function when replacing human messages."""
        messages = [
            SystemMessage(content="System prompt"),
            HumanMessage(content="User message 1"),
            HumanMessage(content="User message 2"),
            AIMessage(content="Assistant response"),
        ]
        result = deduplicate_consecutive_same_role_messages(messages)
        self.assertEqual(len(result), 3)
        self.assertEqual(result[0].content, "System prompt")
        self.assertEqual(result[1].content, "User message 2")
        self.assertEqual(result[2].content, "Assistant response")

    def test_deduplicate_consecutive_same_role_messages_replace_ai_message(
        self,
    ) -> None:
        """Test deduplicate_consecutive_same_role_messages function when replacing AI messages."""
        messages = [
            SystemMessage(content="System prompt"),
            HumanMessage(content="User message"),
            AIMessage(content="Assistant response 1"),
            AIMessage(content="Assistant response 2"),
        ]
        result = deduplicate_consecutive_same_role_messages(messages)
        self.assertEqual(len(result), 3)
        self.assertEqual(result[0].content, "System prompt")
        self.assertEqual(result[1].content, "User message")
        self.assertEqual(result[2].content, "Assistant response 2")


if __name__ == "__main__":
    unittest.main()
