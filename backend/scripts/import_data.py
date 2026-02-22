import argparse
import json
import os
import sys
import traceback
from pathlib import Path
from typing import Any

# Add backend directory to sys.path to allow imports from aidol package
BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BACKEND_DIR))

# pylint: disable=wrong-import-position
from aioia_core.models import Base
from aioia_core.settings import DatabaseSettings
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from aidol.models.aidol import DBAIdol
from aidol.models.companion import DBCompanion
from aidol.models.highlight import DBAIdolHighlight, DBHighlightMessage

# pylint: enable=wrong-import-position

REQUIRED_TOP_LEVEL_LIST_KEYS = (
    "aidols",
    "companions",
    "aidol_highlights",
    "highlight_messages",
)


def _load_data(data_file_path: Path) -> dict[str, Any]:
    if not data_file_path.exists():
        raise FileNotFoundError(f"Data file not found: {data_file_path}")

    with data_file_path.open("r", encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, dict):
        raise ValueError("data.json root must be a JSON object.")

    return data


def _ensure_required_lists(data: dict[str, Any]) -> None:
    for key in REQUIRED_TOP_LEVEL_LIST_KEYS:
        if key not in data:
            raise ValueError(f"Missing required key: '{key}'.")
        if not isinstance(data[key], list):
            raise ValueError(f"'{key}' must be a list.")


def _require_string(
    item: dict[str, Any], key: str, context: str, allow_empty: bool = False
) -> str:
    value = item.get(key)
    if not isinstance(value, str):
        raise ValueError(f"{context}: '{key}' must be a string.")
    if not allow_empty and not value.strip():
        raise ValueError(f"{context}: '{key}' must be non-empty.")
    return value.strip() if not allow_empty else value


def _ensure_unique_ids(items: list[Any], entity_name: str) -> set[str]:
    seen: set[str] = set()
    for index, item in enumerate(items):
        if not isinstance(item, dict):
            raise ValueError(f"{entity_name}[{index}] must be an object.")
        context = f"{entity_name}[{index}]"
        item_id = _require_string(item, "id", context)
        if item_id in seen:
            raise ValueError(f"Duplicate id '{item_id}' in {entity_name}.")
        seen.add(item_id)
    return seen


def _validate_data(data: dict[str, Any]) -> dict[str, int]:
    _ensure_required_lists(data)

    aidols: list[Any] = data["aidols"]
    companions: list[Any] = data["companions"]
    aidol_highlights: list[Any] = data["aidol_highlights"]
    highlight_messages: list[Any] = data["highlight_messages"]

    aidol_ids = _ensure_unique_ids(aidols, "aidols")
    companion_ids = _ensure_unique_ids(companions, "companions")
    highlight_ids = _ensure_unique_ids(aidol_highlights, "aidol_highlights")
    _ensure_unique_ids(highlight_messages, "highlight_messages")

    # Validate aidols
    for index, aidol in enumerate(aidols):
        context = f"aidols[{index}]"
        _require_string(aidol, "name", context)
        _require_string(aidol, "status", context)
        profile_image_url = aidol.get("profile_image_url")
        if profile_image_url is not None and not isinstance(profile_image_url, str):
            raise ValueError(f"{context}: 'profile_image_url' must be a string or null.")

    # Validate companions and FK to aidols
    for index, companion in enumerate(companions):
        context = f"companions[{index}]"
        _require_string(companion, "name", context)
        _require_string(companion, "status", context)

        aidol_id = companion.get("aidol_id")
        if aidol_id is not None:
            if not isinstance(aidol_id, str) or not aidol_id.strip():
                raise ValueError(f"{context}: 'aidol_id' must be a non-empty string or null.")
            if aidol_id not in aidol_ids:
                raise ValueError(
                    f"{context}: 'aidol_id' references missing aidol '{aidol_id}'."
                )

    # Validate highlights and FK to aidols
    for index, highlight in enumerate(aidol_highlights):
        context = f"aidol_highlights[{index}]"
        _require_string(highlight, "title", context, allow_empty=True)
        _require_string(highlight, "thumbnail_url", context, allow_empty=True)
        _require_string(highlight, "subtitle", context, allow_empty=True)

        is_premium = highlight.get("is_premium")
        if not isinstance(is_premium, bool):
            raise ValueError(f"{context}: 'is_premium' must be a boolean.")

        aidol_id = highlight.get("aidol_id")
        if aidol_id is not None:
            if not isinstance(aidol_id, str) or not aidol_id.strip():
                raise ValueError(f"{context}: 'aidol_id' must be a non-empty string or null.")
            if aidol_id not in aidol_ids:
                raise ValueError(
                    f"{context}: 'aidol_id' references missing aidol '{aidol_id}'."
                )

    # Validate highlight messages and FK to highlights/companions
    for index, message in enumerate(highlight_messages):
        context = f"highlight_messages[{index}]"

        highlight_id = _require_string(message, "highlight_id", context)
        if highlight_id not in highlight_ids:
            raise ValueError(
                f"{context}: 'highlight_id' references missing highlight '{highlight_id}'."
            )

        companion_id = message.get("companion_id")
        if companion_id is not None:
            if not isinstance(companion_id, str) or not companion_id.strip():
                raise ValueError(
                    f"{context}: 'companion_id' must be a non-empty string or null."
                )
            if companion_id not in companion_ids:
                raise ValueError(
                    f"{context}: 'companion_id' references missing companion "
                    f"'{companion_id}'."
                )

        sequence = message.get("sequence")
        if not isinstance(sequence, int):
            raise ValueError(f"{context}: 'sequence' must be an integer.")

        content = message.get("content")
        if not isinstance(content, str):
            raise ValueError(f"{context}: 'content' must be a string.")

    return {
        "aidols": len(aidols),
        "companions": len(companions),
        "aidol_highlights": len(aidol_highlights),
        "highlight_messages": len(highlight_messages),
    }


def _upsert_aidols(db: Session, aidols: list[Any]) -> None:
    for item in aidols:
        db.merge(
            DBAIdol(
                id=item["id"],
                name=item.get("name"),
                concept=item.get("concept"),
                profile_image_url=item.get("profile_image_url"),
                anonymous_id=item.get("anonymous_id"),
                email=item.get("email"),
                greeting=item.get("greeting"),
                status=item.get("status", "DRAFT"),
            )
        )


def _upsert_companions(db: Session, companions: list[Any]) -> None:
    for item in companions:
        db.merge(
            DBCompanion(
                id=item["id"],
                aidol_id=item.get("aidol_id"),
                name=item.get("name"),
                gender=item.get("gender"),
                grade=item.get("grade"),
                biography=item.get("biography"),
                profile_picture_url=item.get("profile_picture_url"),
                system_prompt=item.get("system_prompt"),
                mbti_energy=item.get("mbti_energy"),
                mbti_perception=item.get("mbti_perception"),
                mbti_judgment=item.get("mbti_judgment"),
                mbti_lifestyle=item.get("mbti_lifestyle"),
                vocal=item.get("vocal"),
                dance=item.get("dance"),
                rap=item.get("rap"),
                visual=item.get("visual"),
                stamina=item.get("stamina"),
                charm=item.get("charm"),
                position=item.get("position"),
                status=item.get("status", "DRAFT"),
            )
        )


def _upsert_highlights(db: Session, highlights: list[Any]) -> None:
    for item in highlights:
        db.merge(
            DBAIdolHighlight(
                id=item["id"],
                aidol_id=item.get("aidol_id"),
                title=item.get("title", ""),
                thumbnail_url=item.get("thumbnail_url", ""),
                subtitle=item.get("subtitle", ""),
                is_premium=item.get("is_premium", False),
            )
        )


def _upsert_highlight_messages(db: Session, messages: list[Any]) -> None:
    for item in messages:
        db.merge(
            DBHighlightMessage(
                id=item["id"],
                highlight_id=item.get("highlight_id"),
                companion_id=item.get("companion_id"),
                sequence=item.get("sequence"),
                content=item.get("content", ""),
            )
        )


def _delete_seed_tables(db: Session) -> None:
    # Delete in FK-safe order.
    db.query(DBHighlightMessage).delete(synchronize_session=False)
    db.query(DBAIdolHighlight).delete(synchronize_session=False)
    db.query(DBCompanion).delete(synchronize_session=False)
    db.query(DBAIdol).delete(synchronize_session=False)


def _ensure_default_sqlite_url() -> None:
    if os.getenv("DATABASE_URL"):
        return

    db_path = BACKEND_DIR / "local_database.db"
    os.environ["DATABASE_URL"] = f"sqlite:///{db_path.as_posix()}"


def import_data(
    data_file_path: Path | None = None,
    reset_seed_tables: bool = False,
) -> None:
    """Import data from data.json into local database."""
    _ensure_default_sqlite_url()

    if data_file_path is None:
        data_file_path = Path(__file__).with_name("data.json")

    print("Loading and validating data...")
    data = _load_data(data_file_path)
    validated_counts = _validate_data(data)

    print("Initializing database connection...")
    db_settings = DatabaseSettings()
    print(f"Connecting to: {db_settings.url}")

    engine = create_engine(db_settings.url)
    Base.metadata.create_all(bind=engine)
    session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = session_local()

    try:
        if reset_seed_tables:
            print("Resetting seed tables...")
            _delete_seed_tables(db)
            db.flush()

        print("Upserting Aidols...")
        _upsert_aidols(db, data["aidols"])
        db.flush()

        print("Upserting Companions...")
        _upsert_companions(db, data["companions"])
        db.flush()

        print("Upserting AIdol Highlights...")
        _upsert_highlights(db, data["aidol_highlights"])
        db.flush()

        print("Upserting Highlight Messages...")
        _upsert_highlight_messages(db, data["highlight_messages"])
        db.commit()

        print("\nData import completed successfully!")
        print("Validated counts from data.json:")
        print(f"- aidols: {validated_counts['aidols']}")
        print(f"- companions: {validated_counts['companions']}")
        print(f"- aidol_highlights: {validated_counts['aidol_highlights']}")
        print(f"- highlight_messages: {validated_counts['highlight_messages']}")

        print("\nCurrent DB row counts:")
        print(f"- aidols: {db.query(DBAIdol).count()}")
        print(f"- companions: {db.query(DBCompanion).count()}")
        print(f"- aidol_highlights: {db.query(DBAIdolHighlight).count()}")
        print(f"- highlight_messages: {db.query(DBHighlightMessage).count()}")

    except Exception as exc:  # pylint: disable=broad-exception-caught
        print(f"\nError importing data: {exc}")
        db.rollback()
        traceback.print_exc()
        raise
    finally:
        db.close()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Import data.json into local database.")
    parser.add_argument(
        "--file",
        default=str(Path(__file__).with_name("data.json")),
        help="Path to data.json (default: backend/scripts/data.json).",
    )
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Delete rows in aidols/companions/aidol_highlights/highlight_messages before import.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    import_data(data_file_path=Path(args.file), reset_seed_tables=args.reset)
