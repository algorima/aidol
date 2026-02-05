"""
Companion Relationship schemas

Schema hierarchy:
- CompanionRelationshipBase: 공통 필드
- CompanionRelationshipCreate: 생성 요청
- CompanionRelationshipUpdate: 수정 요청
- CompanionRelationship: 응답 스키마

친밀도(intimacy)만 DB에 저장하고, 레벨명은 계산해서 반환
"""

from datetime import datetime
from enum import Enum

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field


# ---------------------------------------------------------------------------
# Intimacy Type (계산용)
# ---------------------------------------------------------------------------


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


# ---------------------------------------------------------------------------
# CompanionRelationship Schemas
# ---------------------------------------------------------------------------


class CompanionRelationshipBase(BaseModel):
    """Base companion relationship model with common fields."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    from_companion_id: str | None = Field(default=None, description="관계 출발 Companion ID")
    to_companion_id: str | None = Field(default=None, description="관계 대상 Companion ID")
    intimacy: int | None = Field(default=None, ge=0, le=100, description="친밀도 (0-100)")
    nickname: str | None = Field(default=None, description="관계 별명")


class CompanionRelationshipCreate(CompanionRelationshipBase):
    """Schema for creating a companion relationship."""

    pass


class CompanionRelationshipUpdate(BaseModel):
    """Schema for updating a companion relationship (all fields optional)."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    from_companion_id: str | None = Field(default=None, description="관계 출발 Companion ID")
    to_companion_id: str | None = Field(default=None, description="관계 대상 Companion ID")
    intimacy: int | None = Field(default=None, ge=0, le=100, description="친밀도 (0-100)")
    nickname: str | None = Field(default=None, description="관계 별명")


class CompanionRelationship(CompanionRelationshipBase):
    """Companion relationship response schema with id and timestamps."""

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="Relationship ID")
    type: str = Field(default=None, description="관계 유형 (계산된 값)")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
