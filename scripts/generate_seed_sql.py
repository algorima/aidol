#!/usr/bin/env python3
"""
프리셋 아이돌 그룹 데이터 SQL INSERT문 생성기

group_highlights.json을 읽어 다음 테이블의 INSERT문을 생성합니다:
  1. aidols (20개 그룹: 15 프리셋 + 3 내 그룹 + 2 다른 그룹)
  2. companions (~130명 멤버)
  3. aidol_highlights (40개 하이라이트, free/premium)
  4. highlight_messages (~550개 대사)

사용법:
  python scripts/generate_seed_sql.py > scripts/output/seed.sql
"""

from __future__ import annotations

import json
import uuid
from pathlib import Path

DATA_PATH = Path(__file__).parent / "output" / "group_highlights.json"
MAPPING_PATH = Path(__file__).parent / "output" / "profiles" / "renamed" / "mapping_log.json"

# 이미지 URL 기본 경로 (Next.js public/ 기준)
IMAGE_BASE = "/images/seed"

GROUP_TYPE_TO_GENDER = {
    "boy_group": "male",
    "girl_group": "female",
    "mixed": None,
}


def esc(text: str) -> str:
    """SQL 문자열 이스케이프"""
    return text.replace("'", "''")


def sql_str(value: str | None) -> str:
    """문자열 → SQL 값"""
    if value is None:
        return "NULL"
    return f"'{esc(value)}'"


def build_profile_lookup() -> dict[str, str]:
    """mapping_log.json에서 멤버 이름 → renamed 파일명 매핑을 구성합니다."""
    if not MAPPING_PATH.exists():
        return {}
    with open(MAPPING_PATH, encoding="utf-8") as f:
        mapping = json.load(f)
    # (이름, 그룹) → renamed 파일명
    lookup: dict[str, str] = {}
    for entry in mapping:
        key = f"{entry['group']}:{entry['name']}"
        lookup[key] = entry["renamed"]
    return lookup


def get_profile_url(profile_lookup: dict[str, str], group: str, member: str) -> str | None:
    """멤버의 프로필 이미지 URL을 반환합니다."""
    key = f"{group}:{member}"
    renamed = profile_lookup.get(key)
    if renamed:
        return f"{IMAGE_BASE}/profiles/{renamed}"
    return None


def get_emblem_url(group_name: str) -> str:
    """그룹 엠블럼 URL을 반환합니다."""
    return f"{IMAGE_BASE}/emblems/{group_name}.png"


def get_thumbnail_url(group_name: str, content_id: int, title: str) -> str:
    """하이라이트 썸네일 URL을 반환합니다."""
    safe_title = title.replace(" ", "_").replace("/", "_")
    return f"{IMAGE_BASE}/thumbnails/{group_name}_{content_id:02d}_{safe_title}.png"


def main():
    with open(DATA_PATH, encoding="utf-8") as f:
        groups = json.load(f)

    profile_lookup = build_profile_lookup()

    # ID 추적용
    aidol_ids: dict[str, str] = {}
    companion_ids: dict[tuple[str, str], str] = {}
    highlight_ids: dict[tuple[str, int], str] = {}

    now = "NOW()"

    print("-- ==============================================")
    print("-- AIdol 프리셋 데이터 시드")
    print("-- 생성: generate_seed_sql.py")
    print("-- ==============================================")
    print()
    print("BEGIN;")
    print()

    # ── 1. aidols ──
    print("-- ----------------------------------------------")
    print("-- 1. aidols (20개 그룹)")
    print("--    anonymous_id = NULL → 시스템 프리셋 그룹")
    print("--    status: PUBLISHED / DRAFT")
    print("-- ----------------------------------------------")
    for group in groups:
        gname = group["group_name"]
        aid = str(uuid.uuid4())
        aidol_ids[gname] = aid
        anon_id = group.get("anonymous_id")
        status = group.get("status", "DRAFT")
        emblem_url = get_emblem_url(gname)
        print(
            f"INSERT INTO aidols (id, name, concept, profile_image_url, anonymous_id, status, created_at, updated_at)"
            f"\n  VALUES ({sql_str(aid)}, {sql_str(gname)}, {sql_str(group['group_name_kr'])}, {sql_str(emblem_url)}, {sql_str(anon_id)}, {sql_str(status)}, {now}, {now});"
        )
    print()

    # ── 2. companions ──
    print("-- ----------------------------------------------")
    print("-- 2. companions")
    print("-- ----------------------------------------------")
    for group in groups:
        gname = group["group_name"]
        aid = aidol_ids[gname]
        group_gender = GROUP_TYPE_TO_GENDER.get(group["type"])
        member_genders = group.get("member_genders", {})
        print(f"-- {gname} ({group['group_name_kr']}) [{group['type']}]")
        for member in group["members"]:
            cid = str(uuid.uuid4())
            companion_ids[(gname, member)] = cid
            # 혼성그룹: per-member gender 사용
            gender = member_genders.get(member, group_gender)
            profile_url = get_profile_url(profile_lookup, gname, member)
            print(
                f"INSERT INTO companions (id, aidol_id, name, gender, profile_picture_url, status, created_at, updated_at)"
                f"\n  VALUES ({sql_str(cid)}, {sql_str(aid)}, {sql_str(member)}, {sql_str(gender)}, {sql_str(profile_url)}, 'active', {now}, {now});"
            )
        print()

    # ── 3. aidol_highlights ──
    print("-- ----------------------------------------------")
    print("-- 3. aidol_highlights (40개 하이라이트)")
    print("--    is_premium: false=무료, true=프리미엄")
    print("-- ----------------------------------------------")
    for group in groups:
        gname = group["group_name"]
        aid = aidol_ids[gname]
        print(f"-- {gname}")
        for hl in group["highlights"]:
            hid = str(uuid.uuid4())
            highlight_ids[(gname, hl["content_id"])] = hid
            title = hl["title"]
            subtitle = hl["scenes"][0]["scene"] if hl["scenes"] else None
            is_premium = hl.get("is_premium", False)
            thumbnail_url = get_thumbnail_url(gname, hl["content_id"], title)
            print(
                f"INSERT INTO aidol_highlights (id, aidol_id, title, thumbnail_url, subtitle, is_premium, created_at, updated_at)"
                f"\n  VALUES ({sql_str(hid)}, {sql_str(aid)}, {sql_str(title)}, {sql_str(thumbnail_url)}, {sql_str(subtitle)}, {'true' if is_premium else 'false'}, {now}, {now});"
            )
        print()

    # ── 4. highlight_messages ──
    print("-- ----------------------------------------------")
    print("-- 4. highlight_messages")
    print("--    companion_id = NULL → 비멤버 발화 (MC, 나레이션 등)")
    print("-- ----------------------------------------------")
    for group in groups:
        gname = group["group_name"]
        members = group["members"]
        for hl in group["highlights"]:
            hid = highlight_ids[(gname, hl["content_id"])]
            print(f"-- {gname} > {hl['title']} (content_id={hl['content_id']})")
            seq = 1
            for scene in hl["scenes"]:
                for line in scene["lines"]:
                    mid = str(uuid.uuid4())

                    # 발화자 → companion_id 매핑
                    speaker = line.get("speaker", "")
                    content = line.get("text", "")

                    # direction/narration은 speaker 없음
                    if line["type"] in ("direction", "narration"):
                        comp_id_sql = "NULL"
                        # direction/narration 텍스트를 content에 포함
                        if line["type"] == "direction":
                            content = f"[연출] {content}"
                        else:
                            content = f"[나레이션] {content}"
                    elif speaker in members:
                        comp_id = companion_ids[(gname, speaker)]
                        comp_id_sql = sql_str(comp_id)
                    elif speaker == "전원":
                        # "전원" → companion_id NULL, 특수 표기
                        comp_id_sql = "NULL"
                        content = f"[전원] {content}"
                    else:
                        # MC, 강사, 사장님, 소방관, 주민 등 외부 인물
                        comp_id_sql = "NULL"
                        content = f"[{speaker}] {content}"

                    print(
                        f"INSERT INTO highlight_messages (id, highlight_id, companion_id, sequence, content, created_at, updated_at)"
                        f"\n  VALUES ({sql_str(mid)}, {sql_str(hid)}, {comp_id_sql}, {seq}, {sql_str(content)}, {now}, {now});"
                    )
                    seq += 1
            print()

    print("COMMIT;")
    print()
    print(f"-- 총 aidols: {len(aidol_ids)}개")
    print(f"-- 총 companions: {len(companion_ids)}개")
    print(f"-- 총 aidol_highlights: {len(highlight_ids)}개")

    total_msgs = sum(
        sum(len(line) for scene in hl["scenes"] for line in [scene["lines"]])
        for group in groups
        for hl in group["highlights"]
    )
    print(f"-- 총 highlight_messages: ~{total_msgs}개")


if __name__ == "__main__":
    main()
