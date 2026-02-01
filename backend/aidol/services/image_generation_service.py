"""
Image generation service for AIdol

Generates images using OpenAI DALL-E 3 for AIdol emblems and Companion profiles.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from io import BytesIO
from typing import Literal

import PIL.Image
from google import genai
from google.genai import errors as genai_errors

logger = logging.getLogger(__name__)


@dataclass
class ImageGenerationResponse:
    """Structured response for compatibility (legacy)"""

    url: str | None = None
    revised_prompt: str | None = None


class ImageGenerationService:
    """Service for generating images using Google Gemini 3 (Imagen)."""

    client: "genai.Client | None" = None

    def __init__(self, api_key: str | None = None, settings=None):
        """
        Initialize the Image Generation service.

        Supports two authentication methods:
        1. Google AI API: api_key parameter
        2. Vertex AI API (ADC): settings with use_vertexai=True, cloud_project, cloud_location

        Args:
            api_key: Google API Key (for Google AI API).
            settings: GoogleAPISettings with Vertex AI configuration (for ADC).
        """
        # Priority 1: Explicit api_key
        if api_key:
            self.client = genai.Client(api_key=api_key)
        # Priority 2: Settings with api_key
        elif settings and getattr(settings, "api_key", None):
            self.client = genai.Client(api_key=settings.api_key)
        # Priority 3: Vertex AI mode with ADC
        elif settings and getattr(settings, "use_vertexai", False):
            project = getattr(settings, "cloud_project", None)
            location = getattr(settings, "cloud_location", None)
            if project and location:
                self.client = genai.Client(
                    vertexai=True,
                    project=project,
                    location=location,
                )
            else:
                logger.error(
                    "Vertex AI mode requires GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION"
                )
                self.client = None
        else:
            logger.error(
                "No authentication configured. "
                "Set GOOGLE_API_KEY or enable Vertex AI mode with "
                "GOOGLE_GENAI_USE_VERTEXAI, GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION"
            )
            self.client = None

    def generate_and_download_image(
        self,
        prompt: str,
        size: Literal["1024x1024"] = "1024x1024",  # pylint: disable=unused-argument
        quality: Literal["standard"] = "standard",  # pylint: disable=unused-argument
    ) -> PIL.Image.Image | None:
        """
        Generate an image using Gemini 3 and return as PIL Image.

        Args:
            prompt: Text description.
            size: Ignored (Gemini specific).
            quality: Ignored (Gemini specific).

        Returns:
            PIL Image object, or None if generation fails.
        """
        if not self.client:
            logger.error("Gemini client not initialized")
            return None

        try:
            logger.info("Generating image with Gemini 3 (prompt: %s)...", prompt[:50])

            response = self.client.models.generate_content(
                model="gemini-3-pro-image-preview",
                contents=[prompt],  # type: ignore[arg-type]
            )

            # Iterate parts to find the image
            if response.parts:
                for part in response.parts:
                    if part.inline_data and part.inline_data.data:
                        logger.info("Successfully generated image via Gemini.")
                        # Manually convert bytes to PIL Image to ensure it's a standard PIL object
                        # compatible with main.py's save(format="PNG") call.
                        return PIL.Image.open(BytesIO(part.inline_data.data))

            logger.warning("No image data found in Gemini response.")
            return None

        except genai_errors.APIError as e:
            logger.error("Gemini API error: code=%s, message=%s", e.code, e.message)
            return None

    # Legacy methods for compatibility if needed (can be removed or shimmed)
    def generate_image(self, *args, **kwargs):  # pylint: disable=unused-argument
        """Deprecated: Use generate_and_download_image instead."""
        logger.warning("generate_image is deprecated for Gemini service.")
