"""Unit tests for ChatroomRepository using mocked session."""

from __future__ import annotations

import unittest
from datetime import datetime
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from aidol.models import DBChatroom
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
            companion_id="companion-a",
            created_at=datetime(2026, 2, 16, 1, 0, 0),
            updated_at=datetime(2026, 2, 16, 1, 1, 0),
        )
        chatroom_b = SimpleNamespace(
            id="chatroom-b",
            name="B",
            language="ko",
            companion_id="companion-b",
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
        self.assertEqual(items[0].companion_id, "companion-a")
        first_last_message = items[0].last_message
        self.assertIsNotNone(first_last_message)
        if first_last_message is None:
            self.fail("last_message should not be None for chatroom-a")
        self.assertEqual(first_last_message.content, "hello")
        self.assertIsNotNone(first_last_message.created_at.tzinfo)
        self.assertIsNotNone(items[0].created_at.tzinfo)
        self.assertEqual(items[1].id, "chatroom-b")
        self.assertEqual(items[1].companion_id, "companion-b")
        self.assertIsNone(items[1].last_message)
        second_query.join.assert_not_called()

    def test_get_my_chatrooms_with_last_message_applies_filters(self) -> None:
        """Builds DB filter conditions when filters are provided."""
        mock_session = MagicMock()
        repository = ChatroomRepository(mock_session)

        filter_payload = [
            {"field": "companion_id", "operator": "eq", "value": "companion-a"}
        ]
        filter_condition = DBChatroom.companion_id == "companion-a"

        ranked_messages = _build_ranked_messages_mock()

        first_query = MagicMock()
        first_query.filter.return_value = first_query
        first_query.subquery.return_value = ranked_messages

        second_query = MagicMock()
        second_query.outerjoin.return_value = second_query
        second_query.filter.return_value = second_query
        second_query.order_by.return_value = second_query
        second_query.all.return_value = []

        mock_session.query.side_effect = [first_query, second_query]

        with patch.object(
            repository,
            "_build_filter_conditions",
            return_value=[filter_condition],
        ) as build_filter_conditions_mock:
            repository.get_my_chatrooms_with_last_message(
                "owner-1", filters=filter_payload
            )

        build_filter_conditions_mock.assert_called_once_with(filter_payload)
        second_query.filter.assert_called_once()

    def test_get_my_chatrooms_with_last_message_reuses_prefiltered_ids_for_rows(
        self,
    ) -> None:
        """Rows query should not duplicate aidol/filters join conditions."""
        mock_session = MagicMock()
        repository = ChatroomRepository(mock_session)

        ranked_messages = _build_ranked_messages_mock()

        first_query = MagicMock()
        first_query.filter.return_value = first_query
        first_query.subquery.return_value = ranked_messages

        second_query = MagicMock()
        second_query.outerjoin.return_value = second_query
        second_query.join.return_value = second_query
        second_query.filter.return_value = second_query
        second_query.order_by.return_value = second_query
        second_query.all.return_value = []

        mock_session.query.side_effect = [first_query, second_query]

        repository.get_my_chatrooms_with_last_message(
            "owner-1",
            aidol_id="aidol-1",
        )

        second_query.join.assert_not_called()


if __name__ == "__main__":
    unittest.main()
