"""Unit tests for chatroom schemas."""

import unittest

from pydantic import ValidationError

from aidol.schemas import ChatroomCreate


class TestChatroomCreateSchema(unittest.TestCase):
    """Tests for ChatroomCreate validation rules."""

    def test_companion_id_is_required(self) -> None:
        """companion_id must be provided when creating chatroom."""
        with self.assertRaises(ValidationError):
            ChatroomCreate.model_validate(
                {"name": "My Chatroom", "language": "ko"}
            )

    def test_companion_id_accepts_camel_case_alias(self) -> None:
        """companionId alias should map to companion_id field."""
        schema = ChatroomCreate.model_validate(
            {
                "name": "My Chatroom",
                "language": "ko",
                "companionId": "companion-uuid",
            }
        )
        self.assertEqual(schema.companion_id, "companion-uuid")


if __name__ == "__main__":
    unittest.main()
