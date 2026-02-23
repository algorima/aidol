"""Unit tests for chatroom router helper functions."""

from __future__ import annotations

import unittest

from aidol.api.chatroom import ChatroomRouter, _resolve_llm_status_code


class TestChatroomRouterHelpers(unittest.TestCase):
    """Tests for chatroom helper functions."""

    def test_resolve_llm_status_code_uses_exception_status_code(self) -> None:
        """HTTP status should be taken from provider exception when valid."""

        class ProviderError(Exception):
            status_code = 503

        status_code = _resolve_llm_status_code(ProviderError("unavailable"))
        self.assertEqual(status_code, 503)

    def test_resolve_llm_status_code_falls_back_to_500(self) -> None:
        """Invalid/missing status code should fallback to HTTP 500."""
        status_code = _resolve_llm_status_code(RuntimeError("unknown"))
        self.assertEqual(status_code, 500)

    def test_error_detail_builds_code_and_detail_payload(self) -> None:
        """Structured error detail should include code and detail fields."""
        result = ChatroomRouter._error_detail(
            code="FIRST_RESPONSE_ALREADY_EXISTS",
            detail="Initial response already exists for this chatroom.",
        )
        self.assertEqual(
            result,
            {
                "code": "FIRST_RESPONSE_ALREADY_EXISTS",
                "detail": "Initial response already exists for this chatroom.",
            },
        )


if __name__ == "__main__":
    unittest.main()
