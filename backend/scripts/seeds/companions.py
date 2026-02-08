from sqlalchemy.orm import Session

from aidol.models.companion import DBCompanion

# Dummy data for companions
COMPANIONS_DATA = [
    # NewJeans
    {
        "name": "Minji",
        "gender": "female",
        "grade": "A",
        "biography": "Leader of the group. Charismatic and reliable.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Minji",
        "system_prompt": "You are Minji, the leader of the group.",
        "mbti_energy": 8,
        "mbti_perception": 7,
        "mbti_judgment": 9,
        "mbti_lifestyle": 6,
        "vocal": 85,
        "dance": 80,
        "rap": 60,
        "visual": 90,
        "stamina": 88,
        "charm": 92,
        "position": "subVocal",  # Leader/Lead Vocal -> subVocal (closest fit from list)
        "status": "published",
    },
    {
        "name": "Hanni",
        "gender": "female",
        "grade": "A",
        "biography": "Main vocalist with a soulful voice.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Hanni",
        "system_prompt": "You are Hanni, the main vocalist.",
        "mbti_energy": 9,
        "mbti_perception": 8,
        "mbti_judgment": 7,
        "mbti_lifestyle": 5,
        "vocal": 95,
        "dance": 85,
        "rap": 50,
        "visual": 88,
        "stamina": 85,
        "charm": 95,
        "position": "mainVocal",
        "status": "published",
    },
    {
        "name": "Danielle",
        "gender": "female",
        "grade": "A",
        "biography": "Visual center and refreshing energy.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Danielle",
        "system_prompt": "You are Danielle, the visual center.",
        "mbti_energy": 9,
        "mbti_perception": 9,
        "mbti_judgment": 6,
        "mbti_lifestyle": 7,
        "vocal": 80,
        "dance": 82,
        "rap": 55,
        "visual": 95,
        "stamina": 80,
        "charm": 98,
        "position": "subVocal",
        "status": "published",
    },
    {
        "name": "Haerin",
        "gender": "female",
        "grade": "A",
        "biography": "Chic and mysterious cat-like member.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Haerin",
        "system_prompt": "You are Haerin, known for your chic personality.",
        "mbti_energy": 4,
        "mbti_perception": 8,
        "mbti_judgment": 8,
        "mbti_lifestyle": 9,
        "vocal": 82,
        "dance": 88,
        "rap": 65,
        "visual": 92,
        "stamina": 75,
        "charm": 89,
        "position": "subDancer",  # Lead Dancer -> subDancer
        "status": "published",
    },
    {
        "name": "Hyein",
        "gender": "female",
        "grade": "B",
        "biography": "Youngest member (Maknae) with great potential.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Hyein",
        "system_prompt": "You are Hyein, the maknae.",
        "mbti_energy": 6,
        "mbti_perception": 7,
        "mbti_judgment": 6,
        "mbti_lifestyle": 5,
        "vocal": 78,
        "dance": 75,
        "rap": 70,
        "visual": 85,
        "stamina": 70,
        "charm": 85,
        "position": "subVocal",
        "status": "published",
    },
    # AESPA
    {
        "name": "Karina",
        "gender": "female",
        "grade": "A",
        "biography": "AI-like visuals and powerful leader. Interactive and engaging.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Karina",
        "system_prompt": "You are Karina, the leader of AESPA.",
        "mbti_energy": 7,
        "mbti_perception": 9,
        "mbti_judgment": 8,
        "mbti_lifestyle": 8,
        "vocal": 88,
        "dance": 92,
        "rap": 75,
        "visual": 98,
        "stamina": 90,
        "charm": 94,
        "position": "mainDancer",
        "status": "published",
    },
    {
        "name": "Winter",
        "gender": "female",
        "grade": "A",
        "biography": "Distinct vocal tone and cute personality.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Winter",
        "system_prompt": "You are Winter, known for your unique voice.",
        "mbti_energy": 5,
        "mbti_perception": 8,
        "mbti_judgment": 7,
        "mbti_lifestyle": 7,
        "vocal": 92,
        "dance": 85,
        "rap": 50,
        "visual": 90,
        "stamina": 80,
        "charm": 93,
        "position": "subVocal",  # Lead Vocal -> subVocal
        "status": "published",
    },
    {
        "name": "Giselle",
        "gender": "female",
        "grade": "B",
        "biography": "Main rapper with excellent language skills. Fluent in English, Japanese, and Korean.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Giselle",
        "system_prompt": "You are Giselle, the main rapper.",
        "mbti_energy": 6,
        "mbti_perception": 7,
        "mbti_judgment": 6,
        "mbti_lifestyle": 6,
        "vocal": 75,
        "dance": 78,
        "rap": 90,
        "visual": 82,
        "stamina": 75,
        "charm": 88,
        "position": "mainRapper",
        "status": "published",
    },
    {
        "name": "Ningning",
        "gender": "female",
        "grade": "A",
        "biography": "Main vocalist with powerful high notes and artistic flair.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Ningning",
        "system_prompt": "You are Ningning, the main vocalist.",
        "mbti_energy": 8,
        "mbti_perception": 8,
        "mbti_judgment": 5,
        "mbti_lifestyle": 6,
        "vocal": 94,
        "dance": 80,
        "rap": 40,
        "visual": 88,
        "stamina": 78,
        "charm": 90,
        "position": "mainVocal",
        "status": "published",
    },
    # IVE
    {
        "name": "Wonyoung",
        "gender": "female",
        "grade": "A",
        "biography": "Born to be an idol. Center of IVE. Trendsetter.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Wonyoung",
        "system_prompt": "You are Wonyoung, the center of IVE.",
        "mbti_energy": 9,
        "mbti_perception": 9,
        "mbti_judgment": 8,
        "mbti_lifestyle": 8,
        "vocal": 82,
        "dance": 85,
        "rap": 60,
        "visual": 100,
        "stamina": 85,
        "charm": 100,
        "position": "subVocal",
        "status": "published",
    },
    {
        "name": "Liz",
        "gender": "female",
        "grade": "A",
        "biography": "Main vocalist with unique tone. Loves cats.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Liz",
        "system_prompt": "You are Liz, the main vocalist of IVE.",
        "mbti_energy": 4,
        "mbti_perception": 8,
        "mbti_judgment": 7,
        "mbti_lifestyle": 6,
        "vocal": 92,
        "dance": 75,
        "rap": 40,
        "visual": 90,
        "stamina": 75,
        "charm": 92,
        "position": "mainVocal",
        "status": "published",
    },
    {
        "name": "Leeseo",
        "gender": "female",
        "grade": "B",
        "biography": "Energetic Maknae of IVE. Always full of energy.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Leeseo",
        "system_prompt": "You are Leeseo, the energetic maknae.",
        "mbti_energy": 9,
        "mbti_perception": 7,
        "mbti_judgment": 5,
        "mbti_lifestyle": 5,
        "vocal": 78,
        "dance": 80,
        "rap": 60,
        "visual": 88,
        "stamina": 85,
        "charm": 90,
        "position": "subVocal",
        "status": "published",
    },
    # Solo
    {
        "name": "IU",
        "gender": "female",
        "grade": "A",
        "biography": "National Little Sister and legendary solo artist. Songwriter and actress.",
        "profile_picture_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=IU",
        "system_prompt": "You are IU, a legendary solo artist.",
        "mbti_energy": 5,
        "mbti_perception": 9,
        "mbti_judgment": 8,
        "mbti_lifestyle": 9,
        "vocal": 98,
        "dance": 60,
        "rap": 30,
        "visual": 95,
        "stamina": 70,
        "charm": 100,
        "position": "mainVocal",
        "status": "draft",
    },
]

# Map companions to their groups
GROUP_MEMBERS_MAP = {
    "NewJeans": ["Minji", "Hanni", "Danielle", "Haerin", "Hyein"],
    "AESPA": ["Karina", "Winter", "Giselle", "Ningning"],
    "IVE": ["Wonyoung", "Liz", "Leeseo"],
    # IU is solo, so not in any group
}


def seed_companions(
    db: Session, aidol_map: dict[str, str] | None = None
) -> dict[str, DBCompanion]:
    """
    Seed the companions table.

    Args:
        db: Database session
        aidol_map: Dictionary mapping group names to group IDs (e.g., {"NewJeans": "uuid-..."})

    Returns:
        Dictionary mapping companion names to DBCompanion objects
    """
    print("Seeding companions...")
    results = {}

    for companion_data in COMPANIONS_DATA:
        # Determine aidol_id based on name
        aidol_id = None
        if aidol_map:
            for group_name, members in GROUP_MEMBERS_MAP.items():
                if companion_data["name"] in members:
                    if group_name in aidol_map:
                        aidol_id = aidol_map[group_name]
                    break

        companion_data_copy = companion_data.copy()
        if aidol_id:
            companion_data_copy["aidol_id"] = aidol_id

        # Check if companion already exists
        existing = (
            db.query(DBCompanion)
            .filter(DBCompanion.name == companion_data["name"])
            .first()
        )
        if existing:
            print(f"Skipping {companion_data['name']} (already exists)")
            results[companion_data["name"]] = existing
            continue

        companion = DBCompanion(**companion_data_copy)
        db.add(companion)
        db.flush()
        print(f"Added {companion_data['name']}")
        results[companion_data["name"]] = companion

    return results
