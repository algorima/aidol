"""
Seed the local database with dummy data for development.

Usage:
    python backend/scripts/seed_db.py
"""

import os
import sys

# Add backend directory to sys.path to allow imports from aidol package
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
# Add scripts directory to sys.path to allow imports from seeds package
sys.path.append(os.path.join(os.path.dirname(__file__)))

# pylint: disable=wrong-import-position

import traceback

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from aioia_core.settings import DatabaseSettings
from aioia_core.models import BaseModel

# Import all models to ensure they are registered with BaseModel.metadata
# pylint: disable=unused-import
from aidol.models import aidol
from aidol.models import aidol_lead
from aidol.models import chatroom
from aidol.models import companion
from aidol.models import companion_relationship
from aidol.models import highlight

# Import seed functions
from seeds.aidols import seed_aidols
from seeds.companions import seed_companions
from seeds.companion_relationships import seed_companion_relationships
from seeds.aidol_highlights import seed_aidol_highlights
from seeds.highlight_messages import seed_highlight_messages
from seeds.chatrooms import seed_chatrooms
from seeds.messages import seed_messages


def seed_db():
    """Seed the database with dummy data."""
    # Force SQLite for local dev script if not set
    if not os.getenv("DATABASE_URL"):
        os.environ["DATABASE_URL"] = "sqlite:///local_database.db"

    print("Initializing database connection...")
    db_settings = DatabaseSettings()
    print(f"Connecting to: {db_settings.url}")
    
    engine = create_engine(db_settings.url)
    
    # Create tables
    print("Creating tables...")
    BaseModel.metadata.create_all(bind=engine)
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    try:
        # Run seed functions in order
        
        # 1. Aidols (Groups)
        # Returns: {name: DBAIdol}
        aidols_map = seed_aidols(db)
        
        # Create a simple ID map for companions seeding
        aidol_id_map = {name: aidol_obj.id for name, aidol_obj in aidols_map.items()}
        
        # 2. Companions
        # Returns: {name: DBCompanion}
        companions_map = seed_companions(db, aidol_map=aidol_id_map)
        
        # 3. Companion Relationships
        seed_companion_relationships(db, companions_map)
        
        # 4. Aidol Highlights
        # Returns: {title: DBAIdolHighlight}
        highlights_map = seed_aidol_highlights(db, aidols_map)
        
        # 5. Highlight Messages
        seed_highlight_messages(db, highlights_map, companions_map)
        
        # 6. Chatrooms
        # Returns: {name: DBChatroom}
        chatrooms_map = seed_chatrooms(db)
        
        # 7. Messages
        seed_messages(db, chatrooms_map, companions_map)

        db.commit()
        print("\nDatabase seeding completed successfully!")

    except Exception as e: # pylint: disable=broad-exception-caught
        print(f"\nError seeding database: {e}")
        db.rollback()
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    seed_db()
