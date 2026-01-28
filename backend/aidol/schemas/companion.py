"""
Companion (member) schemas

Schema hierarchy:
- CompanionStats: Nested stats object for request/response
- CompanionBase: Mutable fields (used in Create/Update)
- CompanionCreate: Base + system_prompt (mutable, but sensitive)
- CompanionUpdate: All fields optional for partial updates
- Companion: Response with all fields including system_prompt (internal use)
- CompanionPublic: Response without sensitive fields (API use)
"""

from datetime import datetime

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field

# ---------------------------------------------------------------------------
# Nested Objects
# ---------------------------------------------------------------------------


class CompanionStats(BaseModel):
    """Nested stats object for API request/response."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    vocal: int = Field(default=0, ge=0, le=100, description="Vocal skill")
    dance: int = Field(default=0, ge=0, le=100, description="Dance skill")
    rap: int = Field(default=0, ge=0, le=100, description="Rap skill")
    visual: int = Field(default=0, ge=0, le=100, description="Visual score")
    stamina: int = Field(default=0, ge=0, le=100, description="Stamina")
    charm: int = Field(default=0, ge=0, le=100, description="Charm score")


# ---------------------------------------------------------------------------
# Request Schemas
# ---------------------------------------------------------------------------


class CompanionBase(BaseModel):
    """Base companion model with common mutable fields.

    Contains fields that can be modified after creation.
    Excludes system_prompt (sensitive, requires explicit inclusion).
    """

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    aidol_id: str | None = Field(default=None, description="AIdol group ID")
    name: str | None = Field(default=None, description="Companion name")
    gender: str | None = Field(default=None, description="Gender")
    grade: str | None = Field(default=None, description="Grade level")
    biography: str | None = Field(default=None, description="Companion biography")
    profile_picture_url: str | None = Field(
        default=None, description="Profile picture URL"
    )
    position: str | None = Field(default=None, description="Position in group")

    # MBTI scores (1-10)
    mbti_energy: int | None = Field(default=None, ge=1, le=10, description="E↔I (1-10)")
    mbti_perception: int | None = Field(
        default=None, ge=1, le=10, description="S↔N (1-10)"
    )
    mbti_judgment: int | None = Field(
        default=None, ge=1, le=10, description="T↔F (1-10)"
    )
    mbti_lifestyle: int | None = Field(
        default=None, ge=1, le=10, description="J↔P (1-10)"
    )

    # Stats (nested object)
    stats: CompanionStats = Field(
        default_factory=CompanionStats, description="Ability stats"
    )


class CompanionCreate(CompanionBase):
    """Schema for creating a companion (no id).

    Includes system_prompt for creation (excluded from response for security).
    """

    system_prompt: str | None = Field(
        default=None, description="AI system prompt (not exposed in responses)"
    )


class CompanionUpdate(BaseModel):
    """Schema for updating a companion (all fields optional)."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    aidol_id: str | None = Field(default=None, description="AIdol group ID")
    name: str | None = Field(default=None, description="Companion name")
    gender: str | None = Field(default=None, description="Gender")
    grade: str | None = Field(default=None, description="Grade level")
    biography: str | None = Field(default=None, description="Companion biography")
    profile_picture_url: str | None = Field(
        default=None, description="Profile picture URL"
    )
    position: str | None = Field(default=None, description="Position in group")
    system_prompt: str | None = Field(
        default=None, description="AI system prompt (not exposed in responses)"
    )

    # MBTI scores (1-10)
    mbti_energy: int | None = Field(default=None, ge=1, le=10, description="E↔I (1-10)")
    mbti_perception: int | None = Field(
        default=None, ge=1, le=10, description="S↔N (1-10)"
    )
    mbti_judgment: int | None = Field(
        default=None, ge=1, le=10, description="T↔F (1-10)"
    )
    mbti_lifestyle: int | None = Field(
        default=None, ge=1, le=10, description="J↔P (1-10)"
    )

    # Stats (nested object, optional for updates)
    stats: CompanionStats | None = Field(default=None, description="Ability stats")


# ---------------------------------------------------------------------------
# Response Schemas
# ---------------------------------------------------------------------------


class Companion(CompanionBase):
    """Companion response schema with id and timestamps.

    Includes system_prompt for internal use (Service layer).
    Use CompanionPublic for API responses to exclude sensitive fields.
    """

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="Companion ID")
    system_prompt: str | None = Field(
        default=None, description="AI system prompt (sensitive, internal use only)"
    )
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


class CompanionPublic(BaseModel):
    """Public companion response schema for frontend.

    - Excludes system_prompt for security
    - Uses nested stats object
    - Includes calculated mbti string
    """

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="Companion ID")
    aidol_id: str | None = Field(default=None, description="AIdol group ID")
    name: str | None = Field(default=None, description="Companion name")
    gender: str | None = Field(default=None, description="Gender")
    grade: str | None = Field(default=None, description="Grade level")
    biography: str | None = Field(default=None, description="Companion biography")
    profile_picture_url: str | None = Field(
        default=None, description="Profile picture URL"
    )
    position: str | None = Field(default=None, description="Position in group")
    mbti: str | None = Field(default=None, description="Calculated MBTI (e.g., ENFP)")
    stats: CompanionStats = Field(
        default_factory=CompanionStats, description="Ability stats"
    )
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
