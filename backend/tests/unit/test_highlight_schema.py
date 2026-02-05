"""
Highlight 스키마 유닛 테스트

스키마 검증:
- AIdolHighlightCreate: 생성 요청 스키마 (필수 필드 검증)
- HighlightMessageCreate: 메시지 생성 요청 스키마
"""

import unittest
from datetime import datetime

from pydantic import ValidationError

from aidol.schemas import (
    AIdolHighlight,
    AIdolHighlightCreate,
    AIdolHighlightUpdate,
    HighlightMessageCreate,
    HighlightMessageUpdate,
)


class TestAIdolHighlightCreateSchema(unittest.TestCase):
    """AIdolHighlightCreate 스키마 유닛 테스트"""

    def test_required_fields(self):
        """title, thumbnail_url, subtitle은 필수"""
        highlight = AIdolHighlightCreate(
            title="테스트 하이라이트",
            thumbnail_url="https://example.com/thumb.jpg",
            subtitle="부제목",
        )

        self.assertEqual(highlight.title, "테스트 하이라이트")
        self.assertEqual(highlight.thumbnail_url, "https://example.com/thumb.jpg")
        self.assertEqual(highlight.subtitle, "부제목")

    def test_aidol_id_optional(self):
        """aidol_id는 optional"""
        highlight = AIdolHighlightCreate(
            title="테스트",
            thumbnail_url="https://example.com/thumb.jpg",
            subtitle="부제목",
        )

        self.assertIsNone(highlight.aidol_id)

    def test_error_on_missing_required_fields(self):
        """필수 필드 누락 시 ValidationError"""
        with self.assertRaises(ValidationError):
            AIdolHighlightCreate()  # type: ignore[call-arg]

        with self.assertRaises(ValidationError):
            AIdolHighlightCreate(title="테스트")  # type: ignore[call-arg]


class TestAIdolHighlightUpdateSchema(unittest.TestCase):
    """AIdolHighlightUpdate 스키마 유닛 테스트"""

    def test_all_fields_optional(self):
        """업데이트 스키마는 모든 필드가 optional"""
        update = AIdolHighlightUpdate()

        self.assertIsNone(update.title)
        self.assertIsNone(update.thumbnail_url)

    def test_partial_update(self):
        """부분 업데이트 가능"""
        update = AIdolHighlightUpdate(title="새 제목")

        self.assertEqual(update.title, "새 제목")
        self.assertIsNone(update.subtitle)


class TestAIdolHighlightResponseSchema(unittest.TestCase):
    """AIdolHighlight 응답 스키마 유닛 테스트"""

    def test_response_includes_id_and_timestamps(self):
        """응답 스키마에 id, created_at, updated_at 포함"""
        now = datetime.now()
        highlight = AIdolHighlight(
            id="test-id",
            title="테스트",
            thumbnail_url="https://example.com/thumb.jpg",
            subtitle="부제목",
            created_at=now,
            updated_at=now,
        )

        self.assertEqual(highlight.id, "test-id")
        self.assertEqual(highlight.created_at, now)


class TestHighlightMessageCreateSchema(unittest.TestCase):
    """HighlightMessageCreate 스키마 유닛 테스트"""

    def test_required_fields(self):
        """sequence, content는 필수"""
        message = HighlightMessageCreate(
            sequence=1,
            content="안녕하세요!",
        )

        self.assertEqual(message.sequence, 1)
        self.assertEqual(message.content, "안녕하세요!")

    def test_companion_id_optional(self):
        """highlight_id, companion_id는 optional"""
        message = HighlightMessageCreate(
            sequence=1,
            content="메시지",
        )

        self.assertIsNone(message.highlight_id)
        self.assertIsNone(message.companion_id)

    def test_error_on_missing_required_fields(self):
        """필수 필드 누락 시 ValidationError"""
        with self.assertRaises(ValidationError):
            HighlightMessageCreate()  # type: ignore[call-arg]

        with self.assertRaises(ValidationError):
            HighlightMessageCreate(sequence=1)  # type: ignore[call-arg]


class TestHighlightMessageUpdateSchema(unittest.TestCase):
    """HighlightMessageUpdate 스키마 유닛 테스트"""

    def test_all_fields_optional(self):
        """업데이트 스키마는 모든 필드가 optional"""
        update = HighlightMessageUpdate()

        self.assertIsNone(update.sequence)
        self.assertIsNone(update.content)


if __name__ == "__main__":
    unittest.main()
