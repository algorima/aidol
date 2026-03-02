"""
Environment settings for aidol module.

Provides GoogleGenAISettings for image generation with Google Gemini.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Environment-based settings for aidol module."""

    openai_model: str = "gpt-4o-mini"
    gemini_model: str = "gemini-3-flash-preview"
    gemini_reasoning_effort: str = "low"

    class Config:
        env_prefix = "AIDOL_"


class GoogleGenAISettings(BaseSettings):
    """
    Google Gen AI SDK settings for Gemini image generation.

    Supports two authentication methods:
    1. Google AI API: GOOGLE_API_KEY
    2. Vertex AI API (ADC): GOOGLE_CLOUD_PROJECT

    For Google AI API:
        export GOOGLE_API_KEY=your-api-key

    For Vertex AI with ADC:
        export GOOGLE_CLOUD_PROJECT=your-project-id
        gcloud auth application-default login

    Note: Vertex AI uses location="global" (hardcoded) because
    Gemini image generation models only support the global endpoint.

    Environment variables:
        GOOGLE_API_KEY: Google API key (optional)
        GOOGLE_CLOUD_PROJECT: GCP project ID for Vertex AI (optional)
    """

    api_key: str | None = None
    cloud_project: str | None = None

    class Config:
        env_prefix = "GOOGLE_"
