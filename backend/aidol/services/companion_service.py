"""
Companion service

Business logic for Companion operations including grade and MBTI calculation.
"""

from aidol.schemas.companion import (
    Companion,
    CompanionPublic,
    CompanionStats,
    Grade,
    Status,
)


def calculate_grade(stats: CompanionStats) -> Grade:
    """Calculate grade based on stats average.

    - A: 80-100
    - B: 60-79
    - C: 40-59
    - F: 0-39
    """
    avg = (
        (stats.vocal or 0)
        + (stats.dance or 0)
        + (stats.rap or 0)
        + (stats.visual or 0)
        + (stats.stamina or 0)
        + (stats.charm or 0)
    ) / 6
    if avg >= 80:
        return Grade.A
    if avg >= 60:
        return Grade.B
    if avg >= 40:
        return Grade.C
    return Grade.F


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


def to_companion_public(companion: Companion) -> CompanionPublic:
    """Convert Companion to CompanionPublic with calculated grade and mbti."""
    # Build stats object
    stats = companion.stats if companion.stats else CompanionStats()

    # Calculate grade from stats
    grade = calculate_grade(stats)

    # Calculate MBTI from 4 dimensions
    mbti = calculate_mbti(
        companion.mbti_energy,
        companion.mbti_perception,
        companion.mbti_judgment,
        companion.mbti_lifestyle,
    )

    return CompanionPublic(
        id=companion.id,
        aidol_id=companion.aidol_id,
        name=companion.name,
        gender=companion.gender,
        grade=grade,
        biography=companion.biography,
        profile_picture_url=companion.profile_picture_url,
        position=companion.position,
        status=companion.status,
        mbti=mbti,
        stats=stats,
        created_at=companion.created_at,
        updated_at=companion.updated_at,
    )
