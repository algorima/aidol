"""백엔드 전달용 시드 데이터 JSON 생성

모든 시드 데이터를 DB 스키마에 맞춰 하나의 JSON으로 통합합니다.

출력: scripts/output/seed_data.json
구조:
  - aidols: 20개 그룹 (엠블럼 URL 포함)
  - companions: 259명 멤버 (프로필 이미지 URL, MBTI, 스탯, 바이오)
  - highlights: 40개 하이라이트 (썸네일 URL, 스크립트)

이미지 URL은 /images/seed/ 기준 상대 경로.
"""

from __future__ import annotations

import json
import os
from pathlib import Path

OUTPUT_DIR = Path(__file__).parent / "output"
PROFILES_JSON = OUTPUT_DIR / "member_profiles.json"
HIGHLIGHTS_JSON = OUTPUT_DIR / "group_highlights.json"
SEED_OUTPUT = OUTPUT_DIR / "seed_data.json"

IMAGE_BASE = "/images/seed"


def load_json(path: Path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def build_profile_image_map() -> dict[str, str]:
    """멤버 이름 → 프로필 이미지 URL 매핑"""
    img_dir = Path("public/images/seed/profiles")
    mapping: dict[str, str] = {}

    for f in img_dir.iterdir():
        if not f.suffix == ".png":
            continue
        if f.name.startswith("preset_"):
            continue
        # 도현_01_male.png → 도현
        name = f.name.rsplit("_", 2)[0]
        mapping[name] = f"{IMAGE_BASE}/profiles/{f.name}"

    return mapping


def build_preset_image_map(profiles: list[dict]) -> dict[str, str]:
    """프리셋 멤버 이름 → 프리셋 이미지 URL 매핑 (성별별 순서 기반)"""
    img_dir = Path("public/images/seed/profiles")

    male_files = sorted([f.name for f in img_dir.iterdir()
                         if f.name.startswith("preset_") and "male" in f.name and "female" not in f.name])
    female_files = sorted([f.name for f in img_dir.iterdir()
                           if f.name.startswith("preset_") and "female" in f.name])

    male_presets = [p for p in profiles if p["is_preset"] and p["gender"] == "male"]
    female_presets = [p for p in profiles if p["is_preset"] and p["gender"] == "female"]

    mapping: dict[str, str] = {}
    for member, filename in zip(male_presets, male_files):
        mapping[member["name"]] = f"{IMAGE_BASE}/profiles/{filename}"
    for member, filename in zip(female_presets, female_files):
        mapping[member["name"]] = f"{IMAGE_BASE}/profiles/{filename}"

    return mapping


def build_thumbnail_map() -> dict[str, str]:
    """(그룹_content_id) → 썸네일 URL 매핑"""
    img_dir = Path("public/images/seed/thumbnails")
    mapping: dict[str, str] = {}

    for f in img_dir.iterdir():
        if not f.suffix == ".png":
            continue
        # KLAV_11_범인은_이_안에.png → KLAV, 11
        parts = f.name.split("_", 2)
        if len(parts) >= 2:
            group = parts[0]
            content_id = parts[1].lstrip("0") or "0"
            key = f"{group}_{content_id}"
            mapping[key] = f"{IMAGE_BASE}/thumbnails/{f.name}"

    return mapping


def main():
    profiles = load_json(PROFILES_JSON)
    groups_data = load_json(HIGHLIGHTS_JSON)

    profile_img_map = build_profile_image_map()
    preset_img_map = build_preset_image_map(profiles)
    thumbnail_map = build_thumbnail_map()

    # 1. aidols (그룹)
    aidols = []
    for g in groups_data:
        emblem_file = f"{g['group_name']}.png"
        emblem_exists = Path(f"public/images/seed/emblems/{emblem_file}").exists()

        aidols.append({
            "name": g["group_name"],
            "name_kr": g["group_name_kr"],
            "type": g["type"],
            "member_count": g["member_count"],
            "status": g["status"],
            "profile_image_url": f"{IMAGE_BASE}/emblems/{emblem_file}" if emblem_exists else None,
        })

    # 2. companions (멤버)
    companions = []
    for p in profiles:
        if p["is_preset"]:
            img_url = preset_img_map.get(p["name"])
        else:
            img_url = profile_img_map.get(p["name"])

        companions.append({
            "aidol_group": p["group"] if not p["is_preset"] else None,
            "name": p["name"],
            "gender": p["gender"],
            "grade": p["grade"],
            "biography": p["biography"],
            "profile_picture_url": img_url,
            "mbti_energy": p["mbti_energy"],
            "mbti_perception": p["mbti_perception"],
            "mbti_judgment": p["mbti_judgment"],
            "mbti_lifestyle": p["mbti_lifestyle"],
            "vocal": p["stats"]["vocal"],
            "dance": p["stats"]["dance"],
            "rap": p["stats"]["rap"],
            "visual": p["stats"]["visual"],
            "stamina": p["stats"]["stamina"],
            "charm": p["stats"]["charm"],
            "status": "PUBLISHED" if not p["is_preset"] else "DRAFT",
            "is_preset": p["is_preset"],
        })

    # 3. highlights (하이라이트)
    highlights = []
    for g in groups_data:
        gname = g["group_name"]
        for h in g["highlights"]:
            cid = h["content_id"]
            thumb_key = f"{gname}_{cid}"
            thumb_url = thumbnail_map.get(thumb_key)

            highlights.append({
                "aidol_group": gname,
                "content_id": cid,
                "title": h["title"],
                "is_premium": h["is_premium"],
                "thumbnail_url": thumb_url,
                "scenes": h["scenes"],
            })

    # 통합 출력
    seed_data = {
        "meta": {
            "generated_at": __import__("datetime").datetime.now().isoformat(),
            "counts": {
                "aidols": len(aidols),
                "companions": len(companions),
                "companions_group": len([c for c in companions if not c["is_preset"]]),
                "companions_preset": len([c for c in companions if c["is_preset"]]),
                "highlights": len(highlights),
            },
            "image_base_url": IMAGE_BASE,
        },
        "aidols": aidols,
        "companions": companions,
        "highlights": highlights,
    }

    with open(SEED_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(seed_data, f, ensure_ascii=False, indent=2)

    # 요약
    meta = seed_data["meta"]["counts"]
    print("=== 시드 데이터 JSON 생성 완료 ===")
    print(f"그룹:       {meta['aidols']}개")
    print(f"멤버(그룹):  {meta['companions_group']}명")
    print(f"멤버(프리셋): {meta['companions_preset']}명")
    print(f"하이라이트:   {meta['highlights']}개")
    print()

    # 이미지 매핑 검증
    no_img = [c["name"] for c in companions if c["profile_picture_url"] is None]
    no_thumb = [h["title"] for h in highlights if h["thumbnail_url"] is None]
    if no_img:
        print(f"[WARNING] 이미지 없는 멤버: {len(no_img)}명")
        for name in no_img[:5]:
            print(f"  - {name}")
    else:
        print("이미지 매핑: 전원 OK")

    if no_thumb:
        print(f"[WARNING] 썸네일 없는 하이라이트: {len(no_thumb)}개")
    else:
        print("썸네일 매핑: 전체 OK")

    print(f"\n출력: {SEED_OUTPUT}")


if __name__ == "__main__":
    main()
