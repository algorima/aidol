"""
Standalone FastAPI application for AIdol.

This module provides the entry point for running AIdol as an independent service.

Usage:
    uvicorn main:app --reload

Environment Variables:
    DATABASE_URL: PostgreSQL database URL (default: sqlite:///./local_database.db)
    GOOGLE_API_KEY: Google API key for image generation (optional, ADC supported)
    LOG_LEVEL: Logging level (default: INFO)

Authentication:
    For image generation, one of the following is required:
    - GOOGLE_API_KEY environment variable
    - Application Default Credentials (gcloud auth application-default login)
"""

import base64
import io
import logging
import os

import PIL.Image
from aioia_core.errors import (
    INTERNAL_SERVER_ERROR,
    VALIDATION_ERROR,
    ErrorResponse,
    extract_error_code_from_exception,
    get_error_detail_from_exception,
)
from aioia_core.models import Base
from aioia_core.settings import DatabaseSettings, OpenAIAPISettings
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from aidol.api.aidol import create_aidol_router
from aidol.api.chatroom import create_chatroom_router
from aidol.api.companion import create_companion_router
from aidol.api.lead import create_lead_router
from aidol.factories import (
    AIdolLeadRepositoryFactory,
    AIdolRepositoryFactory,
    ChatroomRepositoryFactory,
    CompanionRepositoryFactory,
)
from aidol.protocols import ImageStorageProtocol
from aidol.settings import GoogleGenAISettings, Settings

# Configure logging
logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


# ==============================================================================
# Base64 Image Storage (Standalone mode)
# ==============================================================================


class Base64ImageStorage(ImageStorageProtocol):
    """Base64 Data URL image storage for standalone mode."""

    def upload_image(self, image: PIL.Image.Image) -> str:
        """Convert image to Base64 Data URL."""
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        b64 = base64.b64encode(buffer.getvalue()).decode()
        return f"data:image/png;base64,{b64}"


# ==============================================================================
# Initialize Settings from Environment Variables
# ==============================================================================

# BaseSettings automatically reads from environment variables
db_settings = DatabaseSettings()  # DATABASE_URL
openai_settings = OpenAIAPISettings()  # OPENAI_API_KEY
google_settings = GoogleGenAISettings()  # GOOGLE_API_KEY or Vertex AI with ADC
model_settings = Settings()  # AIDOL_* settings

if google_settings.api_key:
    logger.info("Image generation: Google AI API (GOOGLE_API_KEY)")
elif google_settings.cloud_project:
    logger.info(
        "Image generation: Vertex AI with ADC (project=%s)",
        google_settings.cloud_project,
    )
else:
    logger.warning(
        "Image generation: Not configured. "
        "Set GOOGLE_API_KEY or GOOGLE_CLOUD_PROJECT"
    )

logger.info("Loaded settings from environment variables")
logger.info(
    "Database: %s", db_settings.url.rsplit("@", maxsplit=1)[-1]
)  # Hide credentials


# ==============================================================================
# Initialize Database
# ==============================================================================

engine = create_engine(db_settings.url, echo=False)
Base.metadata.create_all(engine)
db_session_factory = sessionmaker(bind=engine)

logger.info("Database initialized")


# ==============================================================================
# Initialize Image Storage
# ==============================================================================

image_storage = Base64ImageStorage()

logger.info("Image storage initialized (Base64 Data URL)")


# ==============================================================================
# Create FastAPI app
# ==============================================================================

app = FastAPI(
    title="AIdol API",
    version="0.1.0",
    description="Create and chat with your own AI idol group",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================================================================
# Error Handlers
# ==============================================================================


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTPException with consistent error response format."""
    error_code = extract_error_code_from_exception(exc)
    detail = get_error_detail_from_exception(exc)

    logger.warning(
        "HTTPException: %s %s | status=%d | code=%s",
        request.method,
        request.url,
        exc.status_code,
        error_code,
    )

    error_data = ErrorResponse(status=exc.status_code, detail=detail, code=error_code)
    return JSONResponse(status_code=exc.status_code, content=error_data.model_dump())


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle Pydantic validation errors."""
    first_error = exc.errors()[0] if exc.errors() else {}
    field = (
        first_error.get("loc", ["unknown"])[-1] if first_error.get("loc") else "unknown"
    )

    detail = f"Validation error in field '{field}': {first_error.get('msg', 'Invalid value')}"

    logger.warning(
        "ValidationError: %s %s | errors=%s",
        request.method,
        request.url,
        exc.errors(),
    )

    error_data = ErrorResponse(status=422, detail=detail, code=VALIDATION_ERROR)
    return JSONResponse(status_code=422, content=error_data.model_dump())


@app.exception_handler(Exception)
async def internal_exception_handler(request: Request, exc: Exception):
    """Handle unexpected exceptions."""
    logger.error(
        "Unexpected error: %s %s | exc=%r",
        request.method,
        request.url,
        exc,
        exc_info=True,
    )

    error_data = ErrorResponse(
        status=500,
        detail="Internal Server Error",
        code=INTERNAL_SERVER_ERROR,
    )
    return JSONResponse(status_code=500, content=error_data.model_dump())


# ==============================================================================
# Routes
# ==============================================================================

# Create and include AIdol router
aidol_router = create_aidol_router(
    google_settings=google_settings,
    db_session_factory=db_session_factory,
    repository_factory=AIdolRepositoryFactory(),
    image_storage=image_storage,
)
app.include_router(aidol_router)

# Create and include Companion router
companion_router = create_companion_router(
    google_settings=google_settings,
    db_session_factory=db_session_factory,
    repository_factory=CompanionRepositoryFactory(),
    image_storage=image_storage,
)
app.include_router(companion_router)

# Create and include Lead router
lead_router = create_lead_router(
    db_session_factory=db_session_factory,
    aidol_repository_factory=AIdolRepositoryFactory(),
    lead_repository_factory=AIdolLeadRepositoryFactory(),
)
app.include_router(lead_router)

# Create and include Chatroom router
chatroom_router = create_chatroom_router(
    openai_settings=openai_settings,
    model_settings=model_settings,
    companion_repository_factory=CompanionRepositoryFactory(),
    db_session_factory=db_session_factory,
    repository_factory=ChatroomRepositoryFactory(),
)
app.include_router(chatroom_router, prefix="/aidol")

logger.info("AIdol, Companion, Lead, and Chatroom routers registered")


@app.get("/healthz", tags=["management"])
async def health_check():
    """
    Health check endpoint.

    Returns:
        dict: Status message
    """
    return {"status": "healthy", "service": "aidol"}


@app.get("/", tags=["management"])
async def root():
    """
    Root endpoint.

    Returns:
        dict: Welcome message with documentation link
    """
    return {
        "message": "AIdol API",
        "description": "Create and chat with your own AI idol group",
        "docs": "/docs",
    }
