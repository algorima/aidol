from sqlalchemy.orm import Session

from aidol.models.chatroom import DBChatroom, DBMessage
from aidol.models.companion import DBCompanion


def seed_messages(
    db: Session,
    chatrooms_map: dict[str, DBChatroom],
    companions_map: dict[str, DBCompanion],
) -> None:
    """
    Seed messages in chatrooms.

    Args:
        db: Database session
        chatrooms_map: Map of chatroom name -> DBChatroom
        companions_map: Map of companion name -> DBCompanion
    """
    print("Seeding messages...")

    # Structure: Chatroom Name -> List of (Companion Name, Content)
    CHATS_DATA = {
        "General Chat": [
            ("Minji", "Hello everyone! How is your day?"),
            ("Hanni", "I'm hungry... what should I eat?"),
            ("Danielle", "Let's eat pizza! 🍕"),
            ("IU", "Pizza sounds good."),
            ("Wonyoung", "I want salad! 🥗"),
        ],
        "K-Pop Talk": [
            ("Karina", "Did you hear the new song?"),
            ("Winter", "It's so catchy!"),
            ("Giselle", "I've been listening to it all day."),
        ],
        "Korean Learning": [
            ("IU", "안녕하세요! (Hello!)"),
            ("Minji", "반갑습니다~ (Nice to meet you~)"),
        ],
    }

    for room_name, messages in CHATS_DATA.items():
        if room_name not in chatrooms_map:
            continue

        chatroom = chatrooms_map[room_name]

        for comp_name, content in messages:
            if comp_name not in companions_map:
                continue

            companion = companions_map[comp_name]

            # Simple check to avoid exact duplicates (optional)
            existing = (
                db.query(DBMessage)
                .filter(
                    DBMessage.chatroom_id == chatroom.id,
                    DBMessage.companion_id == companion.id,
                    DBMessage.content == content,
                )
                .first()
            )

            if existing:
                continue

            msg = DBMessage(
                chatroom_id=chatroom.id,
                sender_type="companion",
                content=content,
                companion_id=companion.id,
            )
            db.add(msg)

    db.flush()
    print("Messages seeded.")
