"""
AIdol persona schema and utilities

Persona is the input model for MessageContextBuilder, containing:
- K-pop domain fields (gender, position, grade, biography)
- MBTI personality scores (4 dimensions)
- Optional extension prompt (appended to builder-generated base prompt)
"""

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field

from aidol.schemas.companion import Gender, Grade, Position


class Persona(BaseModel):
    """Chat agent persona for LLM context building.

    This is a transient model created at conversation time, not an API/DB contract.
    MessageContextBuilder uses these fields to generate system prompts.
    """

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    # Basic fields
    name: str | None = Field(default=None, description="Agent name")
    timezone_name: str = Field(
        default="UTC", description="Timezone for real-time context (e.g., 'Asia/Seoul')"
    )

    # K-pop domain fields (used by builder to render prompts)
    gender: Gender | None = Field(default=None, description="Gender")
    position: Position | None = Field(default=None, description="Position in group")
    grade: Grade = Field(..., description="Grade level")
    biography: str | None = Field(default=None, description="Background story")

    # MBTI personality scores (1-10 for each dimension)
    mbti_energy: int | None = Field(
        default=None, ge=1, le=10, description="Energy dimension (1-5: E, 6-10: I)"
    )
    mbti_perception: int | None = Field(
        default=None, ge=1, le=10, description="Perception dimension (1-5: S, 6-10: N)"
    )
    mbti_judgment: int | None = Field(
        default=None, ge=1, le=10, description="Judgment dimension (1-5: T, 6-10: F)"
    )
    mbti_lifestyle: int | None = Field(
        default=None, ge=1, le=10, description="Lifestyle dimension (1-5: J, 6-10: P)"
    )

    # Extension prompt (appended to builder-generated base prompt)
    system_prompt: str | None = Field(
        default=None,
        description="Optional extension prompt appended to builder-generated base prompt",
    )


def calculate_mbti(
    energy: int | None,
    perception: int | None,
    judgment: int | None,
    lifestyle: int | None,
) -> str | None:
    """Calculate MBTI string from 4 dimension scores.

    Each score is 1-10:
    - energy: 1-5 = E, 6-10 = I
    - perception: 1-5 = S, 6-10 = N
    - judgment: 1-5 = T, 6-10 = F
    - lifestyle: 1-5 = J, 6-10 = P

    Returns None if any dimension is missing.
    """
    if any(v is None for v in (energy, perception, judgment, lifestyle)):
        return None

    assert energy is not None
    assert perception is not None
    assert judgment is not None
    assert lifestyle is not None

    e_i = "E" if energy <= 5 else "I"
    s_n = "S" if perception <= 5 else "N"
    t_f = "T" if judgment <= 5 else "F"
    j_p = "J" if lifestyle <= 5 else "P"

    return f"{e_i}{s_n}{t_f}{j_p}"
