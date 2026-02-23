"""
AIdol LLM model settings schemas
"""

from humps import camelize
from pydantic import BaseModel, ConfigDict, Field


class ModelSettingsBase(BaseModel):
    """Base settings for LLM model configuration, excluding the model name.

    Contains common parameters used across all model settings.
    Platform-specific extensions can inherit from this class.
    """

    model_config = ConfigDict(populate_by_name=True, alias_generator=camelize)

    temperature: float = Field(
        default=0.0, description="Sampling temperature (0.0-2.0)"
    )
    seed: int | None = Field(
        default=None, description="Random seed for reproducibility"
    )
    frequency_penalty: float = Field(
        default=0.0, description="Frequency penalty (-2.0-2.0)"
    )
    reasoning_effort: str | None = Field(
        default=None,
        description="Reasoning effort level for supported models (e.g., low/medium/high)",
    )


class ModelSettings(ModelSettingsBase):
    """Settings for LLM model configuration, including the model name.

    Used by LLMProvider.completion() to configure model behavior.
    """

    chat_model: str = Field(..., description="The model name (e.g., 'gpt-4o')")
