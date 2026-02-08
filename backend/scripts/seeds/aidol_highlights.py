from sqlalchemy.orm import Session

from aidol.models.aidol import DBAIdol
from aidol.models.highlight import DBAIdolHighlight

HIGHLIGHTS_DATA = [
    {
        "group": "NewJeans",
        "title": "Hype Boy MV Behind",
        "subtitle": "Behind the scenes of Hype Boy music video",
        "thumbnail_url": "https://img.youtube.com/vi/11cta61wi0g/maxresdefault.jpg",
    },
    {
        "group": "NewJeans",
        "title": "Ditto Performance",
        "subtitle": "Special performance video for Ditto",
        "thumbnail_url": "https://img.youtube.com/vi/pSUydWEqKwE/maxresdefault.jpg",
    },
    {
        "group": "AESPA",
        "title": "Savage Concept Teaser",
        "subtitle": "P.O.S (Case Ver.)",
        "thumbnail_url": "https://img.youtube.com/vi/WPdWvnAAurg/maxresdefault.jpg",
    },
    {
        "group": "IVE",
        "title": "Love Dive Practice",
        "subtitle": "Dance practice video (Fixed Ver.)",
        "thumbnail_url": "https://img.youtube.com/vi/Y8JFxS1HlDo/maxresdefault.jpg",
    },
]


def seed_aidol_highlights(
    db: Session, aidols_map: dict[str, DBAIdol]
) -> dict[str, DBAIdolHighlight]:
    """
    Seed aidol highlights.

    Args:
        db: Database session
        aidols_map: Dictionary mapping group names to DBAIdol objects

    Returns:
        Dictionary mapping highlight titles to DBAIdolHighlight objects
    """
    print("Seeding aidol highlights...")
    results = {}

    for data in HIGHLIGHTS_DATA:
        group_name = data.pop("group")

        if group_name not in aidols_map:
            print(f"Skipping highlight for {group_name} (group not found)")
            continue

        aidol_id = aidols_map[group_name].id
        data["aidol_id"] = aidol_id

        # Check existing
        existing = (
            db.query(DBAIdolHighlight)
            .filter(
                DBAIdolHighlight.title == data["title"],
                DBAIdolHighlight.aidol_id == aidol_id,
            )
            .first()
        )

        if existing:
            print(f"Skipping highlight {data['title']} (already exists)")
            results[data["title"]] = existing
            continue

        highlight = DBAIdolHighlight(**data)
        db.add(highlight)
        db.flush()
        print(f"Added highlight: {data['title']}")
        results[data["title"]] = highlight

    return results
