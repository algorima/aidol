"""
Companion Relationship schemas

Schema hierarchy:
- CompanionRelationshipBase: 공통 필드
- CompanionRelationshipCreate: 생성 요청
- CompanionRelationshipUpdate: 수정 요청
- CompanionRelationship: 응답 스키마

친밀도(intimacy)만 DB에 저장하고, 레벨명은 서비스에서 계산해서 반환
IntimacyType, get_intimacy_type은 aidol.services에서 import
"""

from datetime import datetime

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field

# ---------------------------------------------------------------------------
# CompanionRelationship Schemas
# ---------------------------------------------------------------------------


class CompanionRelationshipBase(BaseModel):
    """Base companion relationship model with common fields."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    from_companion_id: str | None = Field(
        default=None, description="관계 출발 Companion ID"
    )
    to_companion_id: str | None = Field(
        default=None, description="관계 대상 Companion ID"
    )
    intimacy: int | None = Field(
        default=None, ge=0, le=100, description="친밀도 (0-100)"
    )
    nickname: str | None = Field(default=None, description="관계 별명")


class CompanionRelationshipCreate(CompanionRelationshipBase):
    """Schema for creating a companion relationship."""


class CompanionRelationshipUpdate(CompanionRelationshipBase):
    """Schema for updating a companion relationship (all fields optional)."""


class CompanionRelationship(CompanionRelationshipBase):
    """Companion relationship response schema with id and timestamps."""

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="Relationship ID")
    type: str = Field(..., description="관계 유형 (계산된 값)")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
