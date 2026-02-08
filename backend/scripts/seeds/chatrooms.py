from sqlalchemy.orm import Session
from aidol.models.chatroom import DBChatroom

CHATROOMS_DATA = [
    {"name": "General Chat", "language": "en"},
    {"name": "K-Pop Talk", "language": "en"},
    {"name": "Girl Groups", "language": "en"},
    {"name": "Boy Groups", "language": "en"}, # Just for variety
    {"name": "Music Recommendations", "language": "en"},
    {"name": "Korean Learning", "language": "ko"},
]

def seed_chatrooms(db: Session) -> dict[str, DBChatroom]:
    """
    Seed chatrooms.
    
    Args:
        db: Database session
    
    Returns:
        Dictionary mapping chatroom names to DBChatroom objects
    """
    print("Seeding chatrooms...")
    results = {}
    
    for data in CHATROOMS_DATA:
        # Check existing
        existing = (
            db.query(DBChatroom)
            .filter(DBChatroom.name == data["name"])
            .first()
        )
        
        if existing:
            print(f"Skipping chatroom {data['name']} (already exists)")
            results[data["name"]] = existing
            continue
            
        chatroom = DBChatroom(**data)
        db.add(chatroom)
        db.flush()
        print(f"Added chatroom: {data['name']}")
        results[data["name"]] = chatroom
        
    return results
