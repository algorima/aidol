"""
Highlight schemas

Schema hierarchy:
- AIdolHighlightBase: 공통 필드
- AIdolHighlightCreate: 생성 요청
- AIdolHighlightUpdate: 수정 요청
- AIdolHighlight: 응답 스키마

- HighlightMessageBase: 공통 필드
- HighlightMessageCreate: 생성 요청
- HighlightMessageUpdate: 수정 요청
- HighlightMessage: 응답 스키마
"""

from datetime import datetime

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field


# ---------------------------------------------------------------------------
# AIdolHighlight Schemas
# ---------------------------------------------------------------------------


class AIdolHighlightBase(BaseModel):
    """Base highlight model with common fields."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    aidol_id: str | None = Field(default=None, description="AIdol group ID")
    title: str = Field(..., description="하이라이트 제목")
    thumbnail_url: str = Field(..., description="썸네일 이미지 URL")
    subtitle: str = Field(..., description="부제목")


class AIdolHighlightCreate(AIdolHighlightBase):
    """Schema for creating a highlight."""

    pass


class AIdolHighlightUpdate(BaseModel):
    """Schema for updating a highlight (all fields optional)."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    aidol_id: str | None = Field(default=None, description="AIdol group ID")
    title: str | None = Field(default=None, description="하이라이트 제목")
    thumbnail_url: str | None = Field(default=None, description="썸네일 이미지 URL")
    subtitle: str | None = Field(default=None, description="부제목")


class AIdolHighlight(AIdolHighlightBase):
    """Highlight response schema with id and timestamps."""

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="Highlight ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


# ---------------------------------------------------------------------------
# HighlightMessage Schemas
# ---------------------------------------------------------------------------


class HighlightMessageBase(BaseModel):
    """Base highlight message model with common fields."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    highlight_id: str | None = Field(default=None, description="Highlight ID")
    companion_id: str | None = Field(default=None, description="Companion ID")
    sequence: int = Field(..., description="채팅 순서")
    content: str = Field(..., description="메시지 내용")


class HighlightMessageCreate(HighlightMessageBase):
    """Schema for creating a highlight message."""

    pass


class HighlightMessageUpdate(BaseModel):
    """Schema for updating a highlight message (all fields optional)."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    highlight_id: str | None = Field(default=None, description="Highlight ID")
    companion_id: str | None = Field(default=None, description="Companion ID")
    sequence: int | None = Field(default=None, description="채팅 순서")
    content: str | None = Field(default=None, description="메시지 내용")


class HighlightMessage(HighlightMessageBase):
    """Highlight message response schema with id and timestamps."""

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="Message ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
