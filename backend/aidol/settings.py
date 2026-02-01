"""
Environment settings for aidol module.

Provides GoogleAPISettings for image generation with Google Gemini.
"""

from typing import ClassVar

from pydantic import Field
from pydantic_settings import BaseSettings


class GoogleAPISettings(BaseSettings):
    """
    Google API authentication settings for Gemini image generation.

    Supports two authentication methods:
    1. Google AI API: GOOGLE_API_KEY
    2. Vertex AI API (ADC): GOOGLE_GENAI_USE_VERTEXAI + GOOGLE_CLOUD_PROJECT + GOOGLE_CLOUD_LOCATION

    For Google AI API:
        export GOOGLE_API_KEY=your-api-key

    For Vertex AI with ADC:
        export GOOGLE_GENAI_USE_VERTEXAI=true
        export GOOGLE_CLOUD_PROJECT=your-project-id
        export GOOGLE_CLOUD_LOCATION=us-central1
        gcloud auth application-default login

    Environment variables:
        GOOGLE_API_KEY: Google API key (optional)
        GOOGLE_GENAI_USE_VERTEXAI: Enable Vertex AI mode (optional)
        GOOGLE_CLOUD_PROJECT: GCP project ID for Vertex AI (optional)
        GOOGLE_CLOUD_LOCATION: GCP region for Vertex AI (optional)
    """

    INI_SECTION: ClassVar[str] = "google"

    api_key: str | None = None
    use_vertexai: bool = Field(default=False, alias="GOOGLE_GENAI_USE_VERTEXAI")
    cloud_project: str | None = Field(default=None, alias="GOOGLE_CLOUD_PROJECT")
    cloud_location: str | None = Field(default=None, alias="GOOGLE_CLOUD_LOCATION")

    class Config:
        env_prefix = "GOOGLE_"
        populate_by_name = True
