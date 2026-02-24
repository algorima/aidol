"""Unit tests for prompt rendering (builder module)."""

import unittest

from aidol.context import Persona
from aidol.context.builder import (
    _append_extension_prompt,
    _build_prompt_values,
    get_level,
)
from aidol.prompts.base_system_prompt import COMMON_SYSTEM_PROMPT_BASE
from aidol.schemas.companion import Gender, Grade, Position


class TestPromptRendering(unittest.TestCase):
    """Tests for prompt rendering functions in builder module."""

    def _build_persona(
        self,
        grade: Grade | None = Grade.B,
        system_prompt: str | None = None,
    ) -> Persona:
        return Persona(
            name="Haru",
            gender=Gender.FEMALE,
            grade=grade,
            biography="Main vocal trainee.",
            position=Position.MAIN_VOCAL,
            mbti_energy=8,
            mbti_perception=7,
            mbti_judgment=9,
            mbti_lifestyle=6,
            system_prompt=system_prompt,
        )

    def _render_base_prompt(self, persona: Persona) -> str:
        """Render base prompt from persona fields."""
        return COMMON_SYSTEM_PROMPT_BASE.format(**_build_prompt_values(persona))

    def _build_full_prompt(self, persona: Persona) -> str:
        """Build full prompt with optional extension appended."""
        base_prompt = self._render_base_prompt(persona)
        return _append_extension_prompt(base_prompt, persona.system_prompt)

    def test_render_base_prompt_includes_persona_values(self) -> None:
        """Rendered base prompt should include persona attributes."""
        persona = self._build_persona()
        prompt = self._render_base_prompt(persona)

        self.assertIn("Haru", prompt)
        self.assertIn("Main vocal trainee.", prompt)
        self.assertIn("- 등급: B", prompt)
        self.assertIn("INFP", prompt)  # MBTI is derived by calculate_mbti()
        self.assertIn("- 에너지: [점수: 8/10]", prompt)
        self.assertIn("- 인식: [점수: 7/10]", prompt)
        self.assertIn("- 판단: [점수: 9/10]", prompt)
        self.assertIn("- 생활: [점수: 6/10]", prompt)

    def test_build_full_prompt_appends_extension_prompt(self) -> None:
        """Persona-specific system prompt should be appended as extension."""
        persona = self._build_persona(system_prompt="Always end with one nickname.")
        prompt = self._build_full_prompt(persona)

        self.assertIn("## 추가 캐릭터 설정 (선택)", prompt)
        self.assertIn("Always end with one nickname.", prompt)

    def test_build_full_prompt_without_extension(self) -> None:
        """Without extension, final prompt should match base prompt."""
        persona = self._build_persona(system_prompt=None)
        base_prompt = self._render_base_prompt(persona)
        full_prompt = self._build_full_prompt(persona)

        self.assertEqual(full_prompt, base_prompt)

    def test_build_full_prompt_ignores_blank_extension(self) -> None:
        """Whitespace-only extension prompt should be ignored."""
        persona = self._build_persona(system_prompt=" \n\t ")
        base_prompt = self._render_base_prompt(persona)
        full_prompt = self._build_full_prompt(persona)

        self.assertEqual(full_prompt, base_prompt)
        self.assertNotIn("## 추가 캐릭터 설정 (선택)", full_prompt)

    def test_render_base_prompt_uses_fallback_values_for_missing_fields(
        self,
    ) -> None:
        """Missing optional fields should render stable fallback text."""
        persona = self._build_persona()
        persona.name = "   "
        persona.gender = None
        persona.position = None
        persona.biography = "   "
        persona.mbti_energy = None
        persona.mbti_perception = None
        persona.mbti_judgment = None
        persona.mbti_lifestyle = None

        prompt = self._render_base_prompt(persona)

        self.assertIn("- 이름: 이름 미정", prompt)
        self.assertIn("- 성별: 미정", prompt)
        self.assertIn("- 포지션: 포지션 미정", prompt)
        self.assertIn("- 등급: B", prompt)
        self.assertIn("- 서사(배경): 서사 정보 없음", prompt)
        self.assertIn("- MBTI 성향: 정보 없음", prompt)
        self.assertIn("- 에너지: [점수: 미정] 자연스럽고 무난한 인사", prompt)
        self.assertIn("- 인식: [점수: 미정] 균형 잡힌 표현", prompt)
        self.assertIn("- 판단: [점수: 미정] 적당한 감정 표현", prompt)
        self.assertIn("- 생활: [점수: 미정] 자연스러운 흐름", prompt)

    def test_render_base_prompt_applies_name_fallback_in_judgment_template(
        self,
    ) -> None:
        """Name fallback should be applied before judgment template formatting."""
        persona = self._build_persona()
        persona.name = None
        persona.mbti_judgment = 1

        prompt = self._render_base_prompt(persona)

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
