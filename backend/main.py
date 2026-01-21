"""
Standalone FastAPI application for AIdol.

This module provides the entry point for running AIdol as an independent service.

Usage:
    uvicorn main:app --reload

Environment Variables:
    DATABASE_URL: PostgreSQL database URL
    OPENAI_API_KEY: OpenAI API key for image generation
    JWT_SECRET_KEY: JWT secret key (default: dev-secret for development)
    LOG_LEVEL: Logging level (default: INFO)
"""

import io
import logging
import os
import uuid
from pathlib import Path

import PIL.Image
from aioia_core.errors import (
    INTERNAL_SERVER_ERROR,
    VALIDATION_ERROR,
    ErrorResponse,
    extract_error_code_from_exception,
    get_error_detail_from_exception,
)
from aioia_core.models import Base
from aioia_core.settings import DatabaseSettings, JWTSettings, OpenAIAPISettings
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from aidol.api.aidol import create_aidol_router
from aidol.api.companion import create_companion_router
from aidol.factories import AIdolRepositoryFactory, CompanionRepositoryFactory
from aidol.protocols import ImageStorageProtocol

# Configure logging
logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


# ==============================================================================
# Local Image Storage (Standalone mode)
# ==============================================================================


class LocalImageStorage(ImageStorageProtocol):
    """Local file system image storage for standalone mode."""

    def __init__(self, storage_dir: Path, base_url: str):
        self.storage_dir = storage_dir
        self.base_url = base_url
        self.storage_dir.mkdir(parents=True, exist_ok=True)

    def upload_image(self, image: PIL.Image.Image) -> str:
        """Save image to local storage and return URL."""
        filename = f"{uuid.uuid4()}.png"
        filepath = self.storage_dir / filename

        # Convert to PNG and save
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        buffer.seek(0)

        with open(filepath, "wb") as f:
            f.write(buffer.getvalue())

        return f"{self.base_url}/{filename}"


# ==============================================================================
# Initialize Settings from Environment Variables
# ==============================================================================

# BaseSettings automatically reads from environment variables
db_settings = DatabaseSettings()  # DATABASE_URL
openai_settings = OpenAIAPISettings()  # OPENAI_API_KEY
jwt_settings = JWTSettings()  # JWT_SECRET_KEY

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

IMAGES_DIR = Path(__file__).parent / "public" / "images"
image_storage = LocalImageStorage(
    storage_dir=IMAGES_DIR,
    base_url="/images",
)

logger.info("Image storage initialized: %s", IMAGES_DIR)


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

# Mount static files for images
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")


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
    openai_settings=openai_settings,
    jwt_settings=jwt_settings,
    db_session_factory=db_session_factory,
    repository_factory=AIdolRepositoryFactory(),
    image_storage=image_storage,
    user_info_provider=None,  # Standalone mode: no user authentication
)
app.include_router(aidol_router, prefix="/aidol")

# Create and include Companion router
companion_router = create_companion_router(
    jwt_settings=jwt_settings,
    db_session_factory=db_session_factory,
    repository_factory=CompanionRepositoryFactory(),
    user_info_provider=None,  # Standalone mode: no user authentication
)
app.include_router(companion_router, prefix="/aidol")

logger.info("AIdol and Companion routers registered")


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
