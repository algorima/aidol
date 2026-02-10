import json
import os
import sys
import traceback

# Add backend directory to sys.path to allow imports from aidol package
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

# pylint: disable=wrong-import-position
from aioia_core.settings import DatabaseSettings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from aidol.models.aidol import DBAIdol
from aidol.models.companion import DBCompanion
from aidol.models.highlight import DBAIdolHighlight, DBHighlightMessage

# pylint: enable=wrong-import-position


def import_data():
    """Import data from data.json to the local database."""
    # Force SQLite for local dev script if not set
    if not os.getenv("DATABASE_URL"):
        os.environ["DATABASE_URL"] = "sqlite:///local_database.db"

    # Path to data.json
    data_file_path = os.path.join(os.path.dirname(__file__), "data.json")

    print("Initializing database connection...")
    db_settings = DatabaseSettings()
    print(f"Connecting to: {db_settings.url}")

    engine = create_engine(db_settings.url)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    try:
        with open(data_file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # 1. Aidols
        print("Importing Aidols...")
        for item in data.get("aidols", []):
            aidol = DBAIdol(
                id=item["id"],
                name=item["name"],
                email=item["email"],
                greeting=item["greeting"],
                concept=item["concept"],
                profile_image_url=item["profileImageUrl"],
                anonymous_id=item["anonymousId"],
            )
            db.merge(aidol)

        # 2. Companions
        print("Importing Companions...")
        for item in data.get("companions", []):
            companion = DBCompanion(
                id=item["id"],
                aidol_id=item["aidolId"],
                name=item["name"],
                gender=item["gender"],
                grade=item["grade"],
                position=item["position"],
                biography=item["biography"],
                profile_picture_url=item["profilePictureUrl"],
                system_prompt=item["systemPrompt"],
                mbti_energy=item["mbtiEnergy"],
                mbti_perception=item["mbtiPerception"],
                mbti_judgment=item["mbtiJudgment"],
                mbti_lifestyle=item["mbtiLifestyle"],
                vocal=item["vocal"],
                dance=item["dance"],
                rap=item["rap"],
                visual=item["visual"],
                stamina=item["stamina"],
                charm=item["charm"],
                status=item.get("status", "draft"),
            )
            db.merge(companion)

        # 3. Aidol Highlights
        print("Importing Aidol Highlights...")
        for item in data.get("aidol_highlights", []):
            highlight = DBAIdolHighlight(
                id=item["id"],
                aidol_id=item["aidolId"],
                title=item["title"],
                thumbnail_url=item["thumbnailUrl"] or "",
                subtitle=item["subtitle"],
            )
            db.merge(highlight)

        # 4. Highlight Messages
        print("Importing Highlight Messages...")
        # To avoid primary key constraint violation if there is no explicit ID in JSON for messages
        # We might need to delete existing messages fo these highlights first or check if they have IDs.
        # Checking schema: DBHighlightMessage inherits from BaseModel which has ID.
        # data.json messages usually don't have IDs.
        # Strategy: Delete existing messages for imported highlights to avoid duplication, then insert new.

        # Collect highlight IDs from messages to clean up
        highlight_ids = set(
            msg["highlightId"] for msg in data.get("highlight_messages", [])
        )
        if highlight_ids:
            db.query(DBHighlightMessage).filter(
                DBHighlightMessage.highlight_id.in_(highlight_ids)
            ).delete(synchronize_session=False)

        for item in data.get("highlight_messages", []):
            message = DBHighlightMessage(
                # Generate ID or let DB handle if not present? BaseModel generates UUID if not provided.
                highlight_id=item["highlightId"],
                companion_id=item["companionId"],
                sequence=item["sequence"],
                content=item["content"],
            )
            db.add(
                message
            )  # Use add for new messages since they likely don't have IDs in JSON

        db.commit()
        print("\nData import completed successfully!")

    except Exception as e:  # pylint: disable=broad-exception-caught
        print(f"\nError importing data: {e}")
        db.rollback()
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    import_data()
