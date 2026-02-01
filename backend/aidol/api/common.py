"""
Common API utilities.

Shared functions for registering common routes across different routers.
"""

from aioia_core.errors import ErrorResponse
from fastapi import APIRouter, HTTPException, status

from aidol.protocols import ImageStorageProtocol
from aidol.schemas import (
    ImageGenerationData,
    ImageGenerationRequest,
    ImageGenerationResponse,
)
from aidol.services import ImageGenerationService
from aidol.settings import GoogleAPISettings


def register_image_generation_route(
    router: APIRouter,
    resource_name: str,
    google_settings: GoogleAPISettings | None,
    image_storage: ImageStorageProtocol,
) -> None:
    """
    Register image generation route to the given router.

    Args:
        router: FastAPI APIRouter instance
        resource_name: Resource name for the route path
        google_settings: Google API settings (API Key or Vertex AI with ADC)
        image_storage: Image Storage instance
    """

    @router.post(
        f"/{resource_name}/images",
        response_model=ImageGenerationResponse,
        status_code=status.HTTP_201_CREATED,
        summary="Generate image",
        description=f"Generate image for {resource_name}",
        responses={
            500: {"model": ErrorResponse, "description": "Image generation failed"},
        },
    )
    async def generate_image(request: ImageGenerationRequest):
        """Generate image from prompt."""
        service = ImageGenerationService(settings=google_settings)
        image = service.generate_and_download_image(
            prompt=request.prompt,
            size="1024x1024",
            quality="standard",
        )

        if image is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Image generation failed",
            )

        # Upload to permanent storage
        image_url = image_storage.upload_image(image)

        return ImageGenerationResponse(
            data=ImageGenerationData(
                image_url=image_url,
                width=1024,
                height=1024,
                format="png",
            )
        )
