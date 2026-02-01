"""
Environment settings for aidol module.

Provides GoogleAPISettings for image generation with Google Gemini.
"""

from typing import ClassVar

from pydantic_settings import BaseSettings


class GoogleAPISettings(BaseSettings):
    """
    Google API authentication settings for Gemini image generation.

    Supports multiple authentication methods:
    - Explicit api_key parameter
    - GOOGLE_API_KEY environment variable
    - Application Default Credentials (ADC) when api_key is None

    For local development:
        export GOOGLE_API_KEY=your-api-key
        # or
        gcloud auth application-default login

    For GCP deployment:
        ADC is automatically available via attached service account.

    Environment variables:
        GOOGLE_API_KEY: Google API key (optional, ADC used if not set)
    """

    INI_SECTION: ClassVar[str] = "google"

    api_key: str | None = None

    class Config:
        env_prefix = "GOOGLE_"
