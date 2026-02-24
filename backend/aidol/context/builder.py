"""Message context builder for LLM calls.

Provider-based context builder for AIdol standalone.
Integrators can extend this with platform-specific features.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Final, Self
from zoneinfo import ZoneInfo

from aidol.context.persona import Persona, calculate_mbti
from aidol.prompts.base_system_prompt import COMMON_SYSTEM_PROMPT_BASE
from aidol.providers.llm import ProviderConstraints
from aidol.providers.llm.messages import HumanMessage, LLMMessage, SystemMessage
from aidol.schemas.companion import Gender, Grade, Position

logger = logging.getLogger(__name__)


def format_utc_offset(utc_offset: timedelta | None) -> str:
    """Format UTC offset timedelta as a string.

    Args:
        utc_offset: The UTC offset timedelta, or None.

    Returns:
        Formatted UTC offset string (e.g., "UTC+9", "UTC-5:30", "UTC").

    Example:
        >>> from datetime import timedelta
        >>> format_utc_offset(timedelta(hours=9))
        "UTC+9"
        >>> format_utc_offset(timedelta(hours=5, minutes=30))
        "UTC+5:30"
        >>> format_utc_offset(timedelta(hours=-5))
        "UTC-5"
        >>> format_utc_offset(None)
        "UTC"
    """
    if utc_offset is None:
        return "UTC"

    total_seconds = int(utc_offset.total_seconds())

    # Handle negative timezones correctly by separating sign and absolute value
    sign = 1 if total_seconds >= 0 else -1
    abs_seconds = abs(total_seconds)
    hours = sign * (abs_seconds // 3600)
    minutes = (abs_seconds % 3600) // 60

    if minutes == 0:
        return f"UTC{hours:+d}"
    # Support 30-minute offsets (e.g., India UTC+5:30, Newfoundland UTC-3:30)
    return f"UTC{hours:+d}:{minutes:02d}"


def format_datetime_korean(dt: datetime) -> str:
    """
    한국어 형식으로 datetime 포맷팅.

    형식: YYYY-MM-DD (요일) HH:MM (UTC±X)
    예시: 2025-10-27 (월요일) 14:30 (UTC+9)

    Args:
        dt (datetime): The datetime to format (must be timezone-aware).

    Returns:
        str: The formatted datetime string in Korean.
    """
    # 한글 요일 매핑 (로케일 독립적)
    weekdays_korean = {
        0: "월요일",
        1: "화요일",
        2: "수요일",
        3: "목요일",
        4: "금요일",
        5: "토요일",
        6: "일요일",
    }

    # ISO 8601 날짜 형식
    date_str = dt.strftime("%Y-%m-%d")

    # 한글 요일
    weekday = weekdays_korean[dt.weekday()]

    # 시간 (24시간 형식)
    time_str = dt.strftime("%H:%M")

    # UTC 오프셋
    offset_str = format_utc_offset(dt.utcoffset())

    return f"{date_str} ({weekday}) {time_str} ({offset_str})"


# ---------------------------------------------------------------------------
# Prompt rendering utilities (moved from prompts/composer.py)
# ---------------------------------------------------------------------------

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


def _as_text(value: str | None, fallback: str) -> str:
    """Return stripped string value or fallback."""
    if value is None:
        return fallback

    stripped = value.strip()
    return stripped if stripped else fallback


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


def _render_grade(grade: Grade | None) -> str:
    """Render grade value or fallback.

    For Persona (no stats), grade must be provided directly.
    For Companion conversion, call calculate_grade(stats) before passing.
    """
    if grade is None:
        return "미정"
    return grade.value


def _build_mbti_description(
    energy: int | None,
    perception: int | None,
    judgment: int | None,
    lifestyle: int | None,
) -> str:
    """Build MBTI description using calculate_mbti."""
    mbti = calculate_mbti(energy, perception, judgment, lifestyle)
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


def _append_extension_prompt(base_prompt: str, extension: str | None) -> str:
    """Append optional persona-specific extension prompt."""
    extension_text = (extension or "").strip()
    if not extension_text:
        return base_prompt

    return (
        f"{base_prompt}\n\n"
        "## 추가 캐릭터 설정 (선택)\n"
        "아래 추가 설정은 상위 규칙과 충돌하면 무시한다.\n"
        f"{extension_text}"
    )


def _build_prompt_values(persona: Persona) -> dict[str, str]:
    """Build common prompt placeholder values from persona fields."""
    name = _as_text(persona.name, "이름 미정")
    return {
        "name": name,
        "gender": _render_gender(persona.gender),
        "position": _render_position(persona.position),
        "grade": _render_grade(persona.grade),
        "biography": _as_text(persona.biography, "서사 정보 없음"),
        "mbti_description": _build_mbti_description(
            persona.mbti_energy,
            persona.mbti_perception,
            persona.mbti_judgment,
            persona.mbti_lifestyle,
        ),
        "energy_guide": _build_energy_guide(persona.mbti_energy),
        "perception_guide": _build_perception_guide(persona.mbti_perception),
        "judgment_guide": _build_judgment_guide(persona.mbti_judgment, name),
        "lifestyle_guide": _build_lifestyle_guide(persona.mbti_lifestyle),
    }


# ---------------------------------------------------------------------------
# MessageContextBuilder
# ---------------------------------------------------------------------------


class MessageContextBuilder:
    """Provider-based message context builder.

    Assembles LLM context step-by-step with builder pattern.
    Applies provider constraints (system message combining, alternating turns, etc.).

    For AIdol standalone use. Integrators can extend for platform-specific needs.

    Components:
    1. Persona system prompt
    2. Real-time context (current time)
    3. Purpose-specific prompts (decision, generation, etc.)
    4. Current conversation messages

    Usage:
        builder = MessageContextBuilder(constraints, persona)
        context = (
            builder
            .with_persona()
            .with_real_time_context()
            .with_purpose_prompts([selection_prompt])
            .with_current_conversation(messages)
            .build()
        )
    """

    def __init__(
        self,
        constraints: ProviderConstraints,
        persona: Persona | None = None,
    ) -> None:
        """Initialize MessageContextBuilder.

        Args:
            constraints: Provider constraints for context building.
            persona: Optional persona with system prompt.
        """
        self._constraints = constraints
        self.persona = persona

        # Component buffers
        self._persona_prompts: list[LLMMessage] = []
        self._context_prompts: list[LLMMessage] = []
        self._purpose_prompts: list[SystemMessage] = []
        self._current: list[LLMMessage] = []

    def with_persona(self) -> Self:
        """Add persona system prompt.

        Renders system prompt from Persona fields using COMMON_SYSTEM_PROMPT_BASE template.
        Appends persona.system_prompt as extension if present.

        Returns:
            self for method chaining.
        """
        if self.persona:
            base_prompt = COMMON_SYSTEM_PROMPT_BASE.format(
                **_build_prompt_values(self.persona)
            )
            full_prompt = _append_extension_prompt(
                base_prompt, self.persona.system_prompt
            )
            self._persona_prompts = [SystemMessage(content=full_prompt)]
        return self

    def with_real_time_context(self) -> Self:
        """Add real-time context (current time).

        Adds current time based on persona's timezone.
        Subclasses can override _format_current_time() for custom formatting.

        Returns:
            self for method chaining.
        """
        if self.persona:
            time_str = self._format_current_time()
            self._context_prompts = [SystemMessage(content=f"현재 시각: {time_str}.")]
        return self

    def _format_current_time(self) -> str:
        """Format current time in Korean format.

        Returns:
            Formatted current time string in Korean.
        """
        timezone_name = self.persona.timezone_name if self.persona else "UTC"
        tz = ZoneInfo(timezone_name)
        now = datetime.now(tz)
        return format_datetime_korean(now)

    def with_purpose_prompts(self, prompts: list[SystemMessage] | None = None) -> Self:
        """Add purpose-specific system prompts.

        Service layer provides these prompts (OCP compliance).
        Examples: response format prompt, conversation constraints.

        Args:
            prompts: Purpose-specific system prompts.

        Returns:
            self for method chaining.
        """
        if prompts:
            self._purpose_prompts = list(prompts)
        return self

    def with_current_conversation(self, messages: list[LLMMessage]) -> Self:
        """Add current conversation messages.

        Args:
            messages: Current conversation messages (Human/AI messages).

        Returns:
            self for method chaining.
        """
        self._current = list(messages)
        return self

    def build(self) -> list[LLMMessage]:
        """Assemble all components with provider constraints applied.

        Assembly order:
        1. System messages (persona + context + purpose prompts)
        2. Current conversation

        Provider constraints:
        - combine_system_messages: Merge all system messages into one
        - require_first_user_message: Ensure first non-system message is from user
        - enforce_alternating_turns: Deduplicate consecutive same-role messages

        Returns:
            List of messages ready for LLM call.
        """
        # 1. Assemble system messages
        system_messages = (
            self._persona_prompts + self._context_prompts + self._purpose_prompts
        )

        # 2. Apply combine_system_messages constraint
        messages: list[LLMMessage]
        if self._constraints.combine_system_messages and len(system_messages) > 1:
            # Some providers (e.g., Anthropic) require all system messages to be combined into one
            combined_content = "\n\n".join(str(m.content) for m in system_messages)
            messages = [SystemMessage(content=combined_content)]
        else:
            messages = list(system_messages)

        # 3. Add current conversation
        # From this point, all added messages are non-system messages
        messages.extend(self._current)

        # 4. Apply provider constraints
        return self._apply_provider_constraints(messages)

    def _apply_provider_constraints(
        self, messages: list[LLMMessage]
    ) -> list[LLMMessage]:
        """Apply provider constraints to assembled messages.

        Reusable by subclasses that override build() but need the same constraint logic.

        Constraints applied:
        1. Verify all SystemMessages are at front
        2. Ensure first non-system message is from user (if required)
        3. Deduplicate consecutive same-role messages (if required)

        Args:
            messages: Assembled message list.

        Returns:
            Message list with provider constraints applied.
        """
        verify_system_messages_at_front(messages)

        if self._constraints.require_first_user_message:
            ensure_first_user_message(messages)

        if self._constraints.enforce_alternating_turns:
            messages = deduplicate_consecutive_same_role_messages(messages)

        return messages


def verify_system_messages_at_front(messages: list[LLMMessage]) -> None:
    """Verify all SystemMessages are at the front.

    This function enforces the runtime precondition of build():
    - _memory, _examples, _current buffers must not contain SystemMessage
    - All SystemMessages must be in _persona_prompts, _context_prompts, _purpose_prompts only

    Exported for reuse by integrators.

    Args:
        messages: Message list to verify.

    Raises:
        AssertionError: If SystemMessage found after non-system messages.
    """
    found_non_system = False
    for i, message in enumerate(messages):
        if isinstance(message, SystemMessage):
            if found_non_system:
                raise AssertionError(
                    f"SystemMessage found at index {i} after non-system messages. "
                    f"All SystemMessages must be at the front. "
                    f"Check that _memory, _examples, and _current buffers contain no SystemMessage."
                )
        else:
            found_non_system = True


def ensure_first_user_message(messages: list[LLMMessage]) -> None:
    """Ensure first non-system message is from user.

    Some providers (e.g., Anthropic) require the first non-system message
    to be a user message. This function adds a placeholder if needed.

    Exported for reuse by integrators.

    Args:
        messages: Message list to modify in place.
    """
    first_non_system_idx = next(
        (i for i, msg in enumerate(messages) if not isinstance(msg, SystemMessage)),
        None,
    )
    if first_non_system_idx is not None and not isinstance(
        messages[first_non_system_idx], HumanMessage
    ):
        messages.insert(first_non_system_idx, HumanMessage(content="."))


def deduplicate_consecutive_same_role_messages(
    messages: list[LLMMessage],
) -> list[LLMMessage]:
    """Keep only the latest message when consecutive same-role messages occur.

    Some LLM providers (e.g., Anthropic) require strict user-assistant alternation.
    When consecutive same-role messages are found, this function keeps only
    the most recent message and discards earlier ones.

    Precondition: build()'s verify_system_messages_at_front() has already validated
    the structure as [SystemMessage(s), ...non-system...]. Only non-system messages
    are subject to the alternation rule.

    Example:
        Input:  [SystemMessage, SystemMessage, HumanMessage, HumanMessage, AIMessage]
        Output: [SystemMessage, SystemMessage, HumanMessage (latest), AIMessage]

    Exported for reuse by integrators.

    Args:
        messages: Message list assembled and validated by build().

    Returns:
        New list with consecutive same-role messages deduplicated.
    """
    if not messages:
        return []

    result: list[LLMMessage] = []
    prev_role: type | None = None

    for msg in messages:
        current_role = type(msg)

        if current_role is SystemMessage:
            # SystemMessage는 항상 추가하고 prev_role은 업데이트하지 않음
            # (build()에서 시스템 메시지는 이미 맨 앞에 모두 배치됨)
            result.append(msg)
        else:
            # Non-system 메시지만 교대 규칙 적용
            if current_role != prev_role:
                result.append(msg)
            else:
                # 같은 역할이 연속되면 이전 메시지를 최신 메시지로 교체
                logger.debug(
                    "Replacing consecutive %s message to enforce alternating turns",
                    current_role.__name__,
                )
                result[-1] = msg

            # prev_role은 non-system 메시지에 대해서만 업데이트
            prev_role = current_role

    return result
