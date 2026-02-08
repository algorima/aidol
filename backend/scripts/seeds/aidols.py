from sqlalchemy.orm import Session
from aidol.models.aidol import DBAIdol

# Dummy data for Aidol groups
AIDOLS_DATA = [
    {
        "name": "NewJeans",
        "concept": "Y2K High Teen",
        "profile_image_url": "https://api.dicebear.com/7.x/identicon/svg?seed=NewJeans",
        "email": "newjeans@example.com",
        "greeting": "Hello, we are NewJeans!",
    },
    {
        "name": "AESPA",
        "concept": "Metaverse & Kwangya",
        "profile_image_url": "https://api.dicebear.com/7.x/identicon/svg?seed=AESPA",
        "email": "aespa@example.com",
        "greeting": "Be my ae! Hi, we are AESPA!",
    },
    {
        "name": "IVE",
        "concept": "Narcissistic Chaebol Crush",
        "profile_image_url": "https://api.dicebear.com/7.x/identicon/svg?seed=IVE",
        "email": "ive@example.com",
        "greeting": "Dive into IVE! Hello, we are IVE!",
    }
]

def seed_aidols(db: Session) -> dict[str, DBAIdol]:
    """Seed the aidols table and return a dict of {name: DBAIdol}."""
    print("Seeding aidols...")
    results = {}
    
    for aidol_data in AIDOLS_DATA:
        name = aidol_data["name"]
        
        # Check if aidol already exists
        existing = (
            db.query(DBAIdol)
            .filter(DBAIdol.name == name)
            .first()
        )
        if existing:
            print(f"Skipping {name} (already exists)")
            results[name] = existing
            continue

        aidol = DBAIdol(**aidol_data)
        db.add(aidol)
        db.flush()  # Flush to get the ID without committing
        print(f"Added {name}")
        results[name] = aidol
        
    return results
