"""
CompanionRelationship 스키마 유닛 테스트

스키마 검증:
- CompanionRelationshipCreate: 생성 요청 스키마
- CompanionRelationshipUpdate: 업데이트 요청 스키마
- CompanionRelationship: 응답 스키마
"""

import unittest
from datetime import datetime

from pydantic import ValidationError

from aidol.schemas import (
    CompanionRelationship,
    CompanionRelationshipCreate,
    CompanionRelationshipUpdate,
)


class TestCompanionRelationshipCreateSchema(unittest.TestCase):
    """CompanionRelationshipCreate 스키마 유닛 테스트"""

    def test_all_fields_optional(self):
        """생성 스키마는 모든 필드가 optional (제약조건은 나중에)"""
        relationship = CompanionRelationshipCreate()

        self.assertIsNone(relationship.from_companion_id)
        self.assertIsNone(relationship.to_companion_id)
        self.assertIsNone(relationship.intimacy)
        self.assertIsNone(relationship.nickname)

    def test_intimacy_range_valid(self):
        """intimacy는 0-100 범위"""
        relationship = CompanionRelationshipCreate(intimacy=50)
        self.assertEqual(relationship.intimacy, 50)

    def test_error_on_intimacy_over_100(self):
        """intimacy 100 초과 시 ValidationError"""
        with self.assertRaises(ValidationError):
            CompanionRelationshipCreate(intimacy=101)

    def test_error_on_intimacy_negative(self):
        """intimacy 음수 시 ValidationError"""
        with self.assertRaises(ValidationError):
            CompanionRelationshipCreate(intimacy=-1)


class TestCompanionRelationshipUpdateSchema(unittest.TestCase):
    """CompanionRelationshipUpdate 스키마 유닛 테스트"""

    def test_all_fields_optional(self):
        """업데이트 스키마는 모든 필드가 optional"""
        update = CompanionRelationshipUpdate()

        self.assertIsNone(update.intimacy)
        self.assertIsNone(update.nickname)

    def test_partial_update(self):
        """부분 업데이트 가능"""
        update = CompanionRelationshipUpdate(intimacy=75)

        self.assertEqual(update.intimacy, 75)
        self.assertIsNone(update.nickname)


class TestCompanionRelationshipResponseSchema(unittest.TestCase):
    """CompanionRelationship 응답 스키마 유닛 테스트"""

    def test_response_schema_fields(self):
        """응답 스키마에 id, timestamps 필드 포함"""
        now = datetime.now()
        relationship = CompanionRelationship(
            id="test-id",
            intimacy=75,
            created_at=now,
            updated_at=now,
        )

        self.assertEqual(relationship.id, "test-id")
        self.assertEqual(relationship.intimacy, 75)
        self.assertEqual(relationship.created_at, now)
        self.assertEqual(relationship.updated_at, now)


if __name__ == "__main__":
    unittest.main()
