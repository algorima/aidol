"""Unit tests for ChatroomRepository using mocked session."""

from __future__ import annotations

import unittest
from datetime import datetime
from types import SimpleNamespace
from unittest.mock import MagicMock

from aidol.repositories.chatroom import ChatroomRepository


def _build_ranked_messages_mock() -> MagicMock:
    """Build a mock subquery object with .c.* columns used by repository code."""
    ranked_messages = MagicMock()
    ranked_messages.c = SimpleNamespace(
        chatroom_id=MagicMock(name="chatroom_id_col"),
        rn=MagicMock(name="rn_col"),
        created_at=MagicMock(name="created_at_col"),
        content=MagicMock(name="content_col"),
    )
    ranked_messages.c.created_at.is_.return_value = MagicMock(name="is_none_expr")
    ranked_messages.c.created_at.desc.return_value = MagicMock(name="created_at_desc")
    ranked_messages.c.content.label.return_value = MagicMock(name="content_label")
    ranked_messages.c.created_at.label.return_value = MagicMock(name="created_at_label")
    return ranked_messages


class TestChatroomRepository(unittest.TestCase):
    """Tests for chatroom repository query mapping behavior."""

    def test_get_my_chatrooms_with_last_message_maps_rows(self) -> None:
        """Maps query rows into ChatroomWithLastMessage with UTC timestamps."""
        mock_session = MagicMock()
        repository = ChatroomRepository(mock_session)

        ranked_messages = _build_ranked_messages_mock()

        first_query = MagicMock()
        first_query.filter.return_value = first_query
        first_query.subquery.return_value = ranked_messages

        second_query = MagicMock()
        second_query.outerjoin.return_value = second_query
        second_query.filter.return_value = second_query
        second_query.order_by.return_value = second_query

        chatroom_a = SimpleNamespace(
            id="chatroom-a",
            name="A",
            language="ko",
            created_at=datetime(2026, 2, 16, 1, 0, 0),
            updated_at=datetime(2026, 2, 16, 1, 1, 0),
        )
        chatroom_b = SimpleNamespace(
            id="chatroom-b",
            name="B",
            language="ko",
            created_at=datetime(2026, 2, 16, 1, 2, 0),
            updated_at=datetime(2026, 2, 16, 1, 3, 0),
        )
        second_query.all.return_value = [
            (chatroom_a, datetime(2026, 2, 16, 1, 5, 0), "hello"),
            (chatroom_b, None, None),
        ]

        mock_session.query.side_effect = [first_query, second_query]

        items = repository.get_my_chatrooms_with_last_message("owner-1")

        self.assertEqual(len(items), 2)
        self.assertEqual(items[0].id, "chatroom-a")
        self.assertIsNotNone(items[0].last_message)
        self.assertEqual(items[0].last_message.content, "hello")
        self.assertIsNotNone(items[0].last_message.created_at.tzinfo)
        self.assertIsNotNone(items[0].created_at.tzinfo)
        self.assertEqual(items[1].id, "chatroom-b")
        self.assertIsNone(items[1].last_message)


if __name__ == "__main__":
    unittest.main()
