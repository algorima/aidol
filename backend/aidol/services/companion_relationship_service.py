"""
Companion Relationship 서비스

친밀도 관련 비즈니스 로직을 제공합니다.
"""

from enum import Enum


class IntimacyType(str, Enum):
    """친밀도 레벨 (threshold 기반)"""

    AWKWARD = "아직 어색해요"  # 15
    POLITE = "예의를 차려요"  # 30
    FRIENDLY = "조금 친해요"  # 45
    BANTER = "티키타카"  # 60
    TRUST = "서로 신뢰해요"  # 70
    EMOTIONAL = "정서적으로 의지해요"  # 80
    BESTIE = "찐친"  # 90
    SOULMATE = "항상 함께해요"  # 100


INTIMACY_THRESHOLDS = [
    (100, IntimacyType.SOULMATE),
    (90, IntimacyType.BESTIE),
    (80, IntimacyType.EMOTIONAL),
    (70, IntimacyType.TRUST),
    (60, IntimacyType.BANTER),
    (45, IntimacyType.FRIENDLY),
    (30, IntimacyType.POLITE),
    (15, IntimacyType.AWKWARD),
]


def get_intimacy_type(intimacy: int | None) -> IntimacyType:
    """친밀도 점수로 레벨 반환"""
    if intimacy is None:
        return IntimacyType.AWKWARD
    for threshold, level in INTIMACY_THRESHOLDS:
        if intimacy >= threshold:
            return level
    return IntimacyType.AWKWARD
