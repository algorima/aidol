"""
AIdol (group) schemas

Schema hierarchy:
- AIdolBase: Mutable fields (used in Create/Update)
- AIdolCreate: API body (anonymous_id excluded, read from Cookie)
- AIdolCreateWithAnonymousId: Internal (anonymous_id included, for repository)
- AIdolUpdate: Base fields only
- AIdol: Response with all fields including anonymous_id (internal use)
- AIdolPublic: Response without sensitive fields (API use)
"""

from datetime import datetime
from enum import Enum, unique

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field

# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------


@unique
class Status(str, Enum):
    """Status for draft pattern."""

    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"


# ---------------------------------------------------------------------------
# Request Schemas
# ---------------------------------------------------------------------------


class AIdolBase(BaseModel):
    """Base AIdol model with mutable fields.

    Contains only fields that can be modified after creation.
    Excludes anonymous_id (immutable, set at creation only).
    """

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    name: str | None = Field(default=None, description="AIdol group name")
    email: str | None = Field(default=None, description="Creator email")
    greeting: str | None = Field(default=None, description="Greeting message")
    concept: str | None = Field(default=None, description="Group concept or theme")
    profile_image_url: str | None = Field(default=None, description="Profile image URL")
    status: Status = Field(default=Status.DRAFT, description="Group status")


class AIdolCreate(AIdolBase):
    """API body schema for creating an AIdol group.

    anonymous_id is excluded (read from Cookie by router).
    """


class AIdolCreateWithAnonymousId(AIdolBase):
    """Internal schema for repository with anonymous_id.

    Used by router to pass Cookie-based anonymous_id to repository.
    """

    anonymous_id: str | None = Field(
        default=None, description="Anonymous user identifier from Cookie"
    )


class AIdolUpdate(BaseModel):
    """Schema for updating an AIdol group (all fields optional)."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    name: str | None = Field(default=None, description="AIdol group name")
    email: str | None = Field(default=None, description="Creator email")
    greeting: str | None = Field(default=None, description="Greeting message")
    concept: str | None = Field(default=None, description="Group concept or theme")
    profile_image_url: str | None = Field(default=None, description="Profile image URL")
    status: Status = Field(default=Status.DRAFT, description="Group status")


class AIdol(AIdolBase):
    """AIdol response schema with id and timestamps.

    Includes optional anonymous_id for ownership verification.
    Use AIdolPublic for API responses to exclude sensitive fields.
    """

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="AIdol group ID")
    anonymous_id: str | None = Field(
        default=None, description="Anonymous user identifier (sensitive, internal use)"
    )
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


class AIdolPublic(AIdolBase):
    """Public AIdol response schema without sensitive fields.

    Excludes anonymous_id for API responses.
    """

    model_config = ConfigDict(
        populate_by_name=True, from_attributes=True, alias_generator=camelize
    )

    id: str = Field(..., description="AIdol group ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")


# ---------------------------------------------------------------------------
# Image Generation
# ---------------------------------------------------------------------------


class ImageGenerationRequest(BaseModel):
    """Request schema for image generation."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    prompt: str = Field(
        ...,
        max_length=200,
        description="Text description for image generation (max 200 chars)",
    )


class ImageGenerationData(BaseModel):
    """Image generation result data."""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    image_url: str = Field(..., description="Generated image URL")
    width: int = Field(..., description="Image width in pixels")
    height: int = Field(..., description="Image height in pixels")
    format: str = Field(..., description="Image format (e.g., png, jpg)")


class ImageGenerationResponse(BaseModel):
    """Response schema for image generation."""

    data: ImageGenerationData
