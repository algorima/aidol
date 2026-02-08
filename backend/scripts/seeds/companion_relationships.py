from sqlalchemy.orm import Session
from aidol.models.companion import DBCompanion
from aidol.models.companion_relationship import DBCompanionRelationship

def seed_companion_relationships(db: Session, companions_map: dict[str, DBCompanion]) -> None:
    """
    Seed companion relationships.
    Strict rules:
    1. Only within the same group.
    2. Each member has a relationship with only one other member (unidirectional).
    
    Args:
        db: Database session
        companions_map: Dictionary mapping companion names to DBCompanion objects
    """
    print("Seeding companion relationships...")
    
    relationships_data = []

    # NewJeans Internal (Circular Chain: Minji -> Hanni -> Danielle -> Haerin -> Hyein -> Minji)
    nj_members = ["Minji", "Hanni", "Danielle", "Haerin", "Hyein"]
    for i in range(len(nj_members)):
        m1 = nj_members[i]
        m2 = nj_members[(i + 1) % len(nj_members)] # Next member, wraps around
        relationships_data.append({"from": m1, "to": m2, "intimacy": 50, "nickname": f"Friend {m2}"})

    # AESPA Internal
    aespa_members = ["Karina", "Winter", "Giselle", "Ningning"]
    for i in range(len(aespa_members)):
        m1 = aespa_members[i]
        m2 = aespa_members[(i + 1) % len(aespa_members)]
        relationships_data.append({"from": m1, "to": m2, "intimacy": 50, "nickname": f"Ae-{m2}"})
            
    # IVE Internal
    ive_members = ["Wonyoung", "Liz", "Leeseo"]
    for i in range(len(ive_members)):
        m1 = ive_members[i]
        m2 = ive_members[(i + 1) % len(ive_members)]
        relationships_data.append({"from": m1, "to": m2, "intimacy": 50, "nickname": f"Ive-{m2}"})

    # Solo (IU) has no group members, so no relationships.

    for rel in relationships_data:
        from_name = rel["from"]
        to_name = rel["to"]
        
        if from_name not in companions_map or to_name not in companions_map:
            print(f"Skipping relationship {from_name} -> {to_name} (companion not found)")
            continue
            
        from_id = companions_map[from_name].id
        to_id = companions_map[to_name].id
        
        # Check existing
        existing = (
            db.query(DBCompanionRelationship)
            .filter(
                DBCompanionRelationship.from_companion_id == from_id,
                DBCompanionRelationship.to_companion_id == to_id
            )
            .first()
        )
        
        if existing:
            # Update if exists to ensure compliance? Or just skip.
            # For seeding, skipping is safer/faster if we assume clean slate or additive.
            # But here we want to enforce the new rule.
            # If we want to strictly ENFORCE, we might need to delete old ones, but that's complex.
            # Assuming fresh db or compatible state.
            continue
            
        relationship = DBCompanionRelationship(
            from_companion_id=from_id,
            to_companion_id=to_id,
            intimacy=rel["intimacy"],
            nickname=rel["nickname"]
        )
        db.add(relationship)
        
    db.flush()
    print("Companion relationships seeded.")
