"""
AIdol persona schema
"""

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field


class Persona(BaseModel):
    """Chat agent persona"""

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    name: str | None = Field(default=None, description="Agent name")
    system_prompt: str | None = Field(
        default=None, description="System prompt for the agent"
    )
    timezone_name: str = Field(
        default="UTC", description="Timezone for real-time context (e.g., 'Asia/Seoul')"
    )
