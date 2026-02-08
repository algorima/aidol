from sqlalchemy.orm import Session
from aidol.models.highlight import DBHighlightMessage, DBAIdolHighlight
from aidol.models.companion import DBCompanion

def seed_highlight_messages(
    db: Session, 
    highlights_map: dict[str, DBAIdolHighlight], 
    companions_map: dict[str, DBCompanion]
) -> None:
    """
    Seed messages into highlights.
    
    Args:
        db: Database session
        highlights_map: Map of highlight title -> DBAIdolHighlight
        companions_map: Map of companion name -> DBCompanion
    """
    print("Seeding highlight messages...")
    
    # Data structure: Highlight Title -> List of (Companion Name, Content)
    MESSAGES_DATA = {
        "Hype Boy MV Behind": [
            ("Minji", "This day was so hot! ☀️"),
            ("Hanni", "But the clothes were so cute!"),
            ("Danielle", "I loved the location, it felt like a movie."),
            ("Haerin", "Running scene was tiring but fun."),
            ("Hyein", "Make sure to watch until the end!"),
        ],
        "Savage Concept Teaser": [
            ("Karina", "Did you like the new concept?"),
            ("Winter", "Savage!"),
            ("Giselle", "The visuals are insane."),
            ("Ningning", "My ae looks so good too."),
        ],
        "Love Dive Practice": [
            ("Wonyoung", "One, two, three, four!"),
            ("Liz", "Practice makes perfect."),
            ("Leeseo", "Breath holding challenge again?"),
        ]
    }
    
    for highlight_title, messages in MESSAGES_DATA.items():
        if highlight_title not in highlights_map:
            continue
            
        highlight = highlights_map[highlight_title]
        
        for i, (comp_name, content) in enumerate(messages):
            if comp_name not in companions_map:
                continue
                
            companion = companions_map[comp_name]
            
            # Check existing (simple check by sequence and highlight)
            existing = (
                db.query(DBHighlightMessage)
                .filter(
                    DBHighlightMessage.highlight_id == highlight.id,
                    DBHighlightMessage.sequence == i
                )
                .first()
            )
            
            if existing:
                continue
                
            msg = DBHighlightMessage(
                highlight_id=highlight.id,
                companion_id=companion.id,
                sequence=i,
                content=content
            )
            db.add(msg)
            
    db.flush()
    print("Highlight messages seeded.")
