"""
Unit tests for Companion Service business logic.
"""

import unittest
from datetime import datetime

from aidol.schemas.companion import (
    Companion,
    CompanionStats,
    Gender,
    Grade,
    Position,
    Status,
)
from aidol.services.companion_service import (
    calculate_grade,
    calculate_mbti,
    to_companion_public,
)

# pylint: disable=no-member


class TestCompanionService(unittest.TestCase):
    """
    유닛 테스트: Companion 서비스 비즈니스 로직 검증

    이 테스트는 DB나 외부 의존성 없이 순수 로직 함수들을 검증합니다:
    - 등급(Grade) 계산
    - MBTI 계산
    - 스키마 변환(to_companion_public)
    """

    def test_calculate_grade(self):
        """
        능력치 평균에 따른 등급 계산 검증

        시나리오:
        - A등급: 평균 80 이상
        - B등급: 평균 60 이상 80 미만
        - C등급: 평균 40 이상 60 미만
        - F등급: 평균 40 미만
        - 기대 결과: 각 구간별 정확한 Grade 반환
        """
        # Case 1: A Grade (Avg 90)
        stats_a = CompanionStats(
            vocal=90, dance=90, rap=90, visual=90, stamina=90, charm=90
        )
        self.assertEqual(calculate_grade(stats_a), Grade.A)

        # Case 2: B Grade (Avg 70)
        stats_b = CompanionStats(
            vocal=70, dance=70, rap=70, visual=70, stamina=70, charm=70
        )
        self.assertEqual(calculate_grade(stats_b), Grade.B)

        # Case 3: C Grade (Avg 50)
        stats_c = CompanionStats(
            vocal=50, dance=50, rap=50, visual=50, stamina=50, charm=50
        )
        self.assertEqual(calculate_grade(stats_c), Grade.C)

        # Case 4: F Grade (Avg 30)
        stats_f = CompanionStats(
            vocal=30, dance=30, rap=30, visual=30, stamina=30, charm=30
        )
        self.assertEqual(calculate_grade(stats_f), Grade.F)

    def test_calculate_mbti(self):
        """
        4가지 성향 점수(1-10)에 따른 MBTI 문자열 계산 검증

        규칙:
        - Energy: 1-5(E), 6-10(I)
        - Perception: 1-5(S), 6-10(N)
        - Judgment: 1-5(T), 6-10(F)
        - Lifestyle: 1-5(J), 6-10(P)
        """
        # Case 1: E S T J (All <= 5)
        # 1, 1, 1, 1 -> E S T J
        self.assertEqual(calculate_mbti(1, 1, 1, 1), "ESTJ")

        # Case 2: I N F P (All > 5)
        # 10, 10, 10, 10 -> I N F P
        self.assertEqual(calculate_mbti(10, 10, 10, 10), "INFP")

        # Case 3: Mixed (E N T P)
        # Energy=1(E), Perception=10(N), Judgment=1(T), Lifestyle=10(P)
        self.assertEqual(calculate_mbti(1, 10, 1, 10), "ENTP")

        # Case 4: Missing values -> None
        self.assertIsNone(calculate_mbti(None, 1, 1, 1))

    def test_to_companion_public(self):
        """
        Companion 모델 -> Public 스키마 변환 검증

        시나리오:
        - Companion 객체를 Public 스키마로 변환
        - 기대 결과: grade와 mbti가 계산되어 포함됨
        """
        # Given: Companion 모델 객체
        companion = Companion(
            id="test-id",
            aidol_id="group-id",
            name="Test Member",
            gender=Gender.FEMALE,
            biography="Bio",
            profile_picture_url="http://url",
            position=Position.MAIN_VOCAL,
            status=Status.PUBLISHED,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            # Stats for Grade B (70)
            stats=CompanionStats(
                vocal=70, dance=70, rap=70, visual=70, stamina=70, charm=70
            ),
            # MBTI for ENTP (1-5)
            mbti_energy=3,
            mbti_perception=3,
            mbti_judgment=3,
            mbti_lifestyle=3,
        )

        # When: 변환
        public_data = to_companion_public(companion)

        # Then: 검증
        self.assertEqual(public_data.name, "Test Member")
        self.assertEqual(public_data.grade, Grade.B)
        self.assertEqual(public_data.mbti, "ESTJ")
        self.assertEqual(public_data.stats.vocal, 70)
