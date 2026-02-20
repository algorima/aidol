"""Unit tests for chat prompt composition."""

import unittest
from datetime import datetime, timezone

from aidol.prompts.composer import (
    build_chat_system_prompt,
    get_level,
    render_chat_base_prompt,
)
from aidol.schemas import (
    Companion,
    CompanionStats,
    CompanionStatus,
    Gender,
    Grade,
    Position,
)


class TestPromptComposer(unittest.TestCase):
    """Tests for base/system prompt composition."""

    def _build_companion(
        self,
        grade: Grade | None = Grade.B,
        system_prompt: str | None = None,
        stats: CompanionStats | None = None,
    ) -> Companion:
        return Companion(
            id="companion-id",
            aidol_id="aidol-id",
            name="Haru",
            gender=Gender.FEMALE,
            grade=grade,
            biography="Main vocal trainee.",
            profile_picture_url=None,
            position=Position.MAIN_VOCAL,
            status=CompanionStatus.PUBLISHED,
            system_prompt=system_prompt,
            mbti_energy=8,
            mbti_perception=7,
            mbti_judgment=9,
            mbti_lifestyle=6,
            stats=stats or CompanionStats(vocal=80, dance=70, rap=60, visual=75),
            created_at=datetime(2025, 1, 1, tzinfo=timezone.utc),
            updated_at=datetime(2025, 1, 1, tzinfo=timezone.utc),
        )

    def test_render_chat_base_prompt_includes_companion_values(self) -> None:
        """Rendered base prompt should include companion attributes."""
        companion = self._build_companion()
        prompt = render_chat_base_prompt(companion)

        self.assertIn("Haru", prompt)
        self.assertIn("Main vocal trainee.", prompt)
        self.assertIn("- 등급: B", prompt)
        self.assertIn("INFP", prompt)  # MBTI is derived by calculate_mbti()
        self.assertIn("- 에너지: [점수: 8/10]", prompt)
        self.assertIn("- 인식: [점수: 7/10]", prompt)
        self.assertIn("- 판단: [점수: 9/10]", prompt)
        self.assertIn("- 생활: [점수: 6/10]", prompt)
        self.assertNotIn("{DATETIME}", prompt)

    def test_render_chat_base_prompt_calculates_grade_when_missing(self) -> None:
        """If companion.grade is missing, grade should be calculated from stats."""
        stats = CompanionStats(
            vocal=90,
            dance=90,
            rap=90,
            visual=90,
            stamina=90,
            charm=90,
        )
        companion = self._build_companion(grade=None, stats=stats)
        prompt = render_chat_base_prompt(companion)

        self.assertIn("- 등급: A", prompt)

    def test_build_chat_system_prompt_appends_extension_prompt(self) -> None:
        """Companion-specific system prompt should be appended as extension."""
        companion = self._build_companion(system_prompt="Always end with one nickname.")
        prompt = build_chat_system_prompt(companion)

        self.assertIn("## 추가 캐릭터 설정 (선택)", prompt)
        self.assertIn("Always end with one nickname.", prompt)

    def test_build_chat_system_prompt_without_extension(self) -> None:
        """Without extension, final prompt should match base prompt."""
        companion = self._build_companion(system_prompt=None)
        base_prompt = render_chat_base_prompt(companion)
        final_prompt = build_chat_system_prompt(companion)

        self.assertEqual(final_prompt, base_prompt)

    def test_build_chat_system_prompt_ignores_blank_extension(self) -> None:
        """Whitespace-only extension prompt should be ignored."""
        companion = self._build_companion(system_prompt=" \n\t ")
        base_prompt = render_chat_base_prompt(companion)
        final_prompt = build_chat_system_prompt(companion)

        self.assertEqual(final_prompt, base_prompt)
        self.assertNotIn("## 추가 캐릭터 설정 (선택)", final_prompt)

    def test_render_chat_base_prompt_uses_fallback_values_for_missing_fields(self) -> None:
        """Missing optional fields should render stable fallback text."""
        companion = self._build_companion()
        companion.name = "   "
        companion.gender = None
        companion.position = None
        companion.biography = "   "
        companion.mbti_energy = None
        companion.mbti_perception = None
        companion.mbti_judgment = None
        companion.mbti_lifestyle = None

        prompt = render_chat_base_prompt(companion)

        self.assertIn("- 이름: 이름 미정", prompt)
        self.assertIn("- 성별: 미정", prompt)
        self.assertIn("- 포지션: 포지션 미정", prompt)
        self.assertIn("- 서사(배경): 서사 정보 없음", prompt)
        self.assertIn("- MBTI 성향: 정보 없음", prompt)
        self.assertIn("- 에너지: [점수: 미정] 자연스럽고 무난한 인사", prompt)
        self.assertIn("- 인식: [점수: 미정] 균형 잡힌 표현", prompt)
        self.assertIn("- 판단: [점수: 미정] 적당한 감정 표현", prompt)
        self.assertIn("- 생활: [점수: 미정] 자연스러운 흐름", prompt)

    def test_render_chat_base_prompt_applies_name_fallback_in_judgment_template(self) -> None:
        """Name fallback should be applied before judgment template formatting."""
        companion = self._build_companion()
        companion.name = None
        companion.mbti_judgment = 1

        prompt = render_chat_base_prompt(companion)

        self.assertIn("안녕하세요. 이름 미정입니다. 잘 부탁드려요.", prompt)

    def test_get_level_maps_boundaries(self) -> None:
        """MBTI level mapping should follow low/mid/high boundaries."""
        self.assertEqual(get_level(1), "low")
        self.assertEqual(get_level(3), "low")
        self.assertEqual(get_level(4), "mid")
        self.assertEqual(get_level(6), "mid")
        self.assertEqual(get_level(7), "high")
        self.assertEqual(get_level(10), "high")


if __name__ == "__main__":
    unittest.main()
