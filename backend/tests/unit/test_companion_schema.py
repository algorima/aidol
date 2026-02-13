"""
Companion 스키마 유닛 테스트

스키마 검증:
- CompanionStats: 스탯 범위 검증 (0-100)
- CompanionCreate: 생성 요청 스키마
- CompanionPublic: 응답 스키마 (민감 정보 제외)
- Enums: Gender, Grade, Position
"""

import unittest
from datetime import datetime

from pydantic import ValidationError

from aidol.schemas import (
    CompanionCreate,
    CompanionPublic,
    CompanionStats,
    CompanionStatus,
    Gender,
    Grade,
    Position,
)


class TestCompanionStatsSchema(unittest.TestCase):
    """CompanionStats 스키마 유닛 테스트"""

    def test_default_value_zero(self):
        """모든 스탯 기본값은 0"""
        stats = CompanionStats()

        self.assertEqual(stats.vocal, 0)
        self.assertEqual(stats.dance, 0)
        self.assertEqual(stats.rap, 0)
        self.assertEqual(stats.visual, 0)
        self.assertEqual(stats.stamina, 0)
        self.assertEqual(stats.charm, 0)

    def test_valid_range(self):
        """0-100 범위의 값은 유효"""
        stats = CompanionStats(vocal=50, dance=100, rap=0)

        self.assertEqual(stats.vocal, 50)
        self.assertEqual(stats.dance, 100)
        self.assertEqual(stats.rap, 0)

    def test_error_on_range_exceeded(self):
        """100 초과 값은 ValidationError 발생"""
        with self.assertRaises(ValidationError):
            CompanionStats(vocal=101)

    def test_error_on_negative_value(self):
        """음수 값은 ValidationError 발생"""
        with self.assertRaises(ValidationError):
            CompanionStats(vocal=-1)


class TestCompanionEnums(unittest.TestCase):
    """Companion 관련 Enum 유닛 테스트"""

    def test_gender_enum_values(self):
        """Gender enum 값 확인"""
        self.assertEqual(Gender.MALE.value, "male")
        self.assertEqual(Gender.FEMALE.value, "female")

    def test_grade_enum_values(self):
        """Grade enum 값 확인"""
        self.assertEqual(Grade.A.value, "A")
        self.assertEqual(Grade.F.value, "F")

    def test_position_enum_values(self):
        """Position enum 값 확인"""
        self.assertEqual(Position.LEADER.value, "leader")
        self.assertEqual(Position.MAIN_VOCAL.value, "mainVocal")


class TestCompanionCreateSchema(unittest.TestCase):
    """CompanionCreate 스키마 유닛 테스트"""

    def test_empty_request_valid(self):
        """모든 필드가 optional이므로 빈 요청도 유효"""
        companion = CompanionCreate()

        self.assertIsNone(companion.name)
        self.assertIsNone(companion.aidol_id)

    def test_system_prompt_inclusion(self):
        """생성 요청에 system_prompt 포함 가능"""
        companion = CompanionCreate(
            name="테스트",
            system_prompt="You are a helpful idol.",
        )

        self.assertEqual(companion.system_prompt, "You are a helpful idol.")

    def test_mbti_valid_range(self):
        """MBTI 점수는 1-10 범위"""
        companion = CompanionCreate(mbti_energy=5, mbti_perception=7)

        self.assertEqual(companion.mbti_energy, 5)
        self.assertEqual(companion.mbti_perception, 7)

    def test_error_on_mbti_range_exceeded(self):
        """MBTI 점수 10 초과시 ValidationError"""
        with self.assertRaises(ValidationError):
            CompanionCreate(mbti_energy=11)

    def test_error_on_mbti_range_below_min(self):
        """MBTI 점수 1 미만시 ValidationError"""
        with self.assertRaises(ValidationError):
            CompanionCreate(mbti_energy=0)


class TestCompanionPublicSchema(unittest.TestCase):
    """CompanionPublic 스키마 유닛 테스트"""

    def test_system_prompt_excluded(self):
        """CompanionPublic에는 system_prompt 필드가 없어야 함"""
        fields = CompanionPublic.model_fields.keys()

        self.assertNotIn("system_prompt", fields)
        self.assertIn("id", fields)
        self.assertIn("name", fields)
        self.assertIn("mbti", fields)  # 계산된 MBTI 필드

    def test_response_serialization_excludes_sensitive_info(self):
        """직렬화 시 system_prompt가 없어야 함"""
        now = datetime.now()
        public = CompanionPublic(
            id="test-id",
            name="테스트 컴패니언",
            status=CompanionStatus.DRAFT,
            created_at=now,
            updated_at=now,
        )
        data = public.model_dump(by_alias=True)

        self.assertIn("id", data)
        self.assertNotIn("systemPrompt", data)
        self.assertNotIn("system_prompt", data)


if __name__ == "__main__":
    unittest.main()
