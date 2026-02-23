"""Prompt composition helpers for chat generation."""

from __future__ import annotations

from typing import Final

from aidol.schemas import Companion, Gender, Position
from aidol.services.companion_service import calculate_grade, calculate_mbti

from .base_system_prompt import CHAT_SYSTEM_PROMPT_TEMPLATE
from .first_system_prompt import FIRST_PROMPT_TEMPLATE

# Intentional nested mapping for score-tier text guides.
# pylint: disable=consider-using-namedtuple-or-dataclass
MBTI_GUIDE_MAP: dict[str, dict[str, str]] = {
    "energy": {
        "low": (
            '조심스럽고 수줍은 톤. "음... 안녕..." / '
            '"처음이라 좀 긴장되네요" / 이모지 적게 사용'
        ),
        "mid": "자연스럽고 무난한 인사",
        "high": (
            '에너지 넘치고 반가움을 적극 표현. "헤이!! 드디어 만났다!!" / '
            "이모지 많이, 느낌표 다수"
        ),
    },
    "perception": {
        "low": (
            '구체적이고 현실적인 언급. "오늘 연습 끝나고 바로 왔어요" / '
            "일상적인 디테일 포함"
        ),
        "mid": "균형 잡힌 표현",
        "high": (
            '추상적이거나 상상력 있는 표현. "우리 만남은 운명인 것 같아" / '
            "비유적 표현"
        ),
    },
    "judgment": {
        "low": (
            '간결하고 사실적. "안녕하세요. {name}입니다. 잘 부탁드려요." / '
            "감정 표현 절제"
        ),
        "mid": "적당한 감정 표현",
        "high": (
            '따뜻하고 감정적. "정말 기다렸어요 ㅠㅠ 너무 반가워!!" / '
            "하트, 감정 이모지 활용"
        ),
    },
    "lifestyle": {
        "low": ('정돈된 느낌의 인사. 자기소개 순서가 명확. "먼저 제 소개를 하자면..."'),
        "mid": "자연스러운 흐름",
        "high": (
            '자유롭고 즉흥적. 화제 전환 빠름. "아 맞다 그거보다 우리 뭐하고 놀지?!"'
        ),
    },
}

POSITION_MAP: Final[dict[Position, str]] = {
    Position.MAIN_VOCAL: "메인보컬",
    Position.SUB_VOCAL: "서브보컬",
    Position.MAIN_DANCER: "메인댄서",
    Position.SUB_DANCER: "서브댄서",
    Position.MAIN_RAPPER: "메인래퍼",
    Position.SUB_RAPPER: "서브래퍼",
}


def get_level(score: int) -> str:
    """1-10 점수를 low/mid/high로 변환."""
    if score <= 3:
        return "low"
    if score <= 6:
        return "mid"
    return "high"


def render_chat_base_prompt(companion: Companion) -> str:
    """Render shared chat system prompt with companion attributes."""
    return CHAT_SYSTEM_PROMPT_TEMPLATE.format(**_build_prompt_values(companion))


def build_chat_system_prompt(companion: Companion) -> str:
    """Build final system prompt with optional companion-specific extension."""
    return _append_extension_prompt(
        base_prompt=render_chat_base_prompt(companion),
        extension=companion.system_prompt,
    )


def render_initial_base_prompt(companion: Companion) -> str:
    """Render initial-response prompt with companion attributes."""
    return FIRST_PROMPT_TEMPLATE.format(**_build_prompt_values(companion))


def build_initial_system_prompt(companion: Companion) -> str:
    """Build initial-response prompt with optional companion-specific extension."""
    return _append_extension_prompt(
        base_prompt=render_initial_base_prompt(companion),
        extension=companion.system_prompt,
    )


def _as_text(value: str | None, fallback: str) -> str:
    """Return stripped string value or fallback."""
    if value is None:
        return fallback

    stripped = value.strip()
    return stripped if stripped else fallback


def _append_extension_prompt(base_prompt: str, extension: str | None) -> str:
    """Append optional companion-specific extension prompt."""
    extension_text = (extension or "").strip()
    if not extension_text:
        return base_prompt

    return (
        f"{base_prompt}\n\n"
        "## 추가 캐릭터 설정 (선택)\n"
        "아래 추가 설정은 상위 규칙과 충돌하면 무시한다.\n"
        f"{extension_text}"
    )


def _build_prompt_values(companion: Companion) -> dict[str, str]:
    """Build common prompt placeholder values from companion fields."""
    name = _as_text(companion.name, "이름 미정")
    return {
        "name": name,
        "gender": _render_gender(companion.gender),
        "position": _render_position(companion.position),
        "grade": _render_grade(companion),
        "biography": _as_text(companion.biography, "서사 정보 없음"),
        "mbti_description": _build_mbti_description(companion),
        "energy_guide": _build_energy_guide(companion.mbti_energy),
        "perception_guide": _build_perception_guide(companion.mbti_perception),
        "judgment_guide": _build_judgment_guide(companion.mbti_judgment, name),
        "lifestyle_guide": _build_lifestyle_guide(companion.mbti_lifestyle),
    }


def _render_gender(gender: Gender | None) -> str:
    if gender is None:
        return "미정"
    if gender == Gender.MALE:
        return "남성"
    return "여성"


def _render_position(position: Position | None) -> str:
    if position is None:
        return "포지션 미정"
    return POSITION_MAP.get(position, "포지션 미정")


def _render_grade(companion: Companion) -> str:
    grade = companion.grade or calculate_grade(companion.stats)
    return grade.value


def _build_mbti_description(companion: Companion) -> str:
    """Build MBTI description using existing service function."""
    mbti = calculate_mbti(
        companion.mbti_energy,
        companion.mbti_perception,
        companion.mbti_judgment,
        companion.mbti_lifestyle,
    )
    if mbti is None:
        return "- MBTI 성향: 정보 없음 (대화 흐름에 맞춰 자연스럽게 반응)"
    return f"- MBTI 성향: {mbti}"


def _level_from_optional_score(score: int | None) -> str:
    """Map optional score to level; missing score defaults to mid."""
    if score is None:
        return "mid"
    return get_level(score)


def _build_energy_guide(score: int | None) -> str:
    level = _level_from_optional_score(score)
    guide = MBTI_GUIDE_MAP["energy"][level]
    return _with_score(guide, score)


def _build_perception_guide(score: int | None) -> str:
    level = _level_from_optional_score(score)
    guide = MBTI_GUIDE_MAP["perception"][level]
    return _with_score(guide, score)


def _build_judgment_guide(score: int | None, name: str) -> str:
    level = _level_from_optional_score(score)
    template = MBTI_GUIDE_MAP["judgment"][level]
    guide = template.format(name=name)
    return _with_score(guide, score)


def _build_lifestyle_guide(score: int | None) -> str:
    level = _level_from_optional_score(score)
    guide = MBTI_GUIDE_MAP["lifestyle"][level]
    return _with_score(guide, score)


def _with_score(guide: str, score: int | None) -> str:
    """Attach raw MBTI score next to guide text."""
    score_text = f"{score}/10" if score is not None else "미정"
    return f"[점수: {score_text}] {guide}"
