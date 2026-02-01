"""
Environment settings for aidol module.

Provides GoogleGenAISettings for image generation with Google Gemini.
"""

from typing import ClassVar

from pydantic_settings import BaseSettings


class GoogleGenAISettings(BaseSettings):
    """
    Google Gen AI SDK settings for Gemini image generation.

    Supports two authentication methods:
    1. Google AI API: GOOGLE_API_KEY
    2. Vertex AI API (ADC): GOOGLE_CLOUD_PROJECT + GOOGLE_CLOUD_LOCATION

    For Google AI API:
        export GOOGLE_API_KEY=your-api-key

    For Vertex AI with ADC:
        export GOOGLE_CLOUD_PROJECT=your-project-id
        export GOOGLE_CLOUD_LOCATION=global
        gcloud auth application-default login

    Environment variables:
        GOOGLE_API_KEY: Google API key (optional)
        GOOGLE_CLOUD_PROJECT: GCP project ID for Vertex AI (optional)
        GOOGLE_CLOUD_LOCATION: GCP region for Vertex AI (optional)
    """

    INI_SECTION: ClassVar[str] = "google"

    api_key: str | None = None
    cloud_project: str | None = None
    cloud_location: str | None = None

    class Config:
        env_prefix = "GOOGLE_"
