"""
CompanionRelationship 스키마 유닛 테스트

스키마 검증:
- CompanionRelationshipCreate: 생성 요청 스키마
- IntimacyType: 친밀도 레벨 Enum
- get_intimacy_type: 친밀도 → 레벨명 변환 함수
"""

import unittest
from datetime import datetime

from pydantic import ValidationError

from aidol.schemas import (
    CompanionRelationship,
    CompanionRelationshipCreate,
    CompanionRelationshipUpdate,
)
from aidol.services.companion_relationship_service import (
    IntimacyType,
    get_intimacy_type,
)


class TestIntimacyTypeEnum(unittest.TestCase):
    """IntimacyType enum 유닛 테스트"""

    def test_enum_values(self):
        """IntimacyType enum 값 확인"""
        self.assertEqual(IntimacyType.AWKWARD.value, "아직 어색해요")
        self.assertEqual(IntimacyType.POLITE.value, "예의를 차려요")
        self.assertEqual(IntimacyType.FRIENDLY.value, "조금 친해요")
        self.assertEqual(IntimacyType.BANTER.value, "티키타카")
        self.assertEqual(IntimacyType.TRUST.value, "서로 신뢰해요")
        self.assertEqual(IntimacyType.EMOTIONAL.value, "정서적으로 의지해요")
        self.assertEqual(IntimacyType.BESTIE.value, "찐친")
        self.assertEqual(IntimacyType.SOULMATE.value, "항상 함께해요")


class TestGetIntimacyType(unittest.TestCase):
    """get_intimacy_type 함수 유닛 테스트"""

    def test_threshold_boundaries(self):
        """각 threshold 경계값 테스트"""
        # 최저: 15 미만
        self.assertEqual(get_intimacy_type(0), IntimacyType.AWKWARD)
        self.assertEqual(get_intimacy_type(14), IntimacyType.AWKWARD)

        # 15-29
        self.assertEqual(get_intimacy_type(15), IntimacyType.AWKWARD)
        self.assertEqual(get_intimacy_type(29), IntimacyType.AWKWARD)

        # 30-44
        self.assertEqual(get_intimacy_type(30), IntimacyType.POLITE)
        self.assertEqual(get_intimacy_type(44), IntimacyType.POLITE)

        # 45-59
        self.assertEqual(get_intimacy_type(45), IntimacyType.FRIENDLY)
        self.assertEqual(get_intimacy_type(59), IntimacyType.FRIENDLY)

        # 60-69
        self.assertEqual(get_intimacy_type(60), IntimacyType.BANTER)
        self.assertEqual(get_intimacy_type(69), IntimacyType.BANTER)

        # 70-79
        self.assertEqual(get_intimacy_type(70), IntimacyType.TRUST)
        self.assertEqual(get_intimacy_type(79), IntimacyType.TRUST)

        # 80-89
        self.assertEqual(get_intimacy_type(80), IntimacyType.EMOTIONAL)
        self.assertEqual(get_intimacy_type(89), IntimacyType.EMOTIONAL)

        # 90-99
        self.assertEqual(get_intimacy_type(90), IntimacyType.BESTIE)
        self.assertEqual(get_intimacy_type(99), IntimacyType.BESTIE)

        # 100
        self.assertEqual(get_intimacy_type(100), IntimacyType.SOULMATE)

    def test_none_returns_awkward(self):
        """None 입력 시 AWKWARD 반환"""
        self.assertEqual(get_intimacy_type(None), IntimacyType.AWKWARD)


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

    def test_response_includes_type_field(self):
        """응답 스키마에 type 필드 포함 (계산된 값)"""
        now = datetime.now()
        relationship = CompanionRelationship(
            id="test-id",
            intimacy=75,
            type="서로 신뢰해요",
            created_at=now,
            updated_at=now,
        )

        self.assertEqual(relationship.id, "test-id")
        self.assertEqual(relationship.type, "서로 신뢰해요")


if __name__ == "__main__":
    unittest.main()
