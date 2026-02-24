"""
Companion service

Business logic for Companion operations including grade calculation.
"""

from aidol.context.persona import calculate_mbti
from aidol.schemas.companion import Companion, CompanionPublic, CompanionStats, Grade


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
