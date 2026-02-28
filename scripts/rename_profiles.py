from __future__ import annotations

"""프리셋 아이돌 그룹 멤버와 프로필 사진 매칭 + 이름 변경 (v2: 132명)

generate_profile_photos_v3.py가 생성한 이미지를 멤버 이름으로 매핑합니다.
소스: output/profiles/{male,female}/male_NN.png, female_NN.png
출력: output/profiles/renamed/{이름}_{NN}_{gender}.png

사용법:
    python rename_profiles.py
    python rename_profiles.py --dry-run  # 매핑만 확인
"""
import json
import shutil
import argparse
from pathlib import Path

SOURCE_DIR = Path(__file__).parent / "output" / "profiles"
MALE_SRC = SOURCE_DIR / "male" / "final"
FEMALE_SRC = SOURCE_DIR / "female" / "final"
OUTPUT_DIR = SOURCE_DIR / "renamed"

# === 132명 멤버 레지스트리 (generate_profile_photos_v3.py와 동일 순서) ===

# 보이그룹 멤버 (40명)
_BOY_GROUPS = {
    "CREED": ["도현", "서진", "건", "태빈", "은호"],
    "ARDOR": ["시우", "한결", "영준", "정우", "재윤"],
    "KLAV": ["찬", "지호", "세빈", "루안"],
    "NEXO": ["승현", "하온", "민재", "동혁", "이든"],
    "VERVE": ["재혁", "한솔", "윤재", "경민", "호진", "성우"],
    "NOVA": ["시현", "정민", "현우", "태건", "준서", "은찬", "승우", "지훈", "한빈", "도운"],
    "CREST": ["선호", "태윤", "준영", "유찬", "성빈"],
}

# 걸그룹 멤버 (52명)
_GIRL_GROUPS = {
    "PLUME": ["서연", "하은", "시연", "채린", "소율"],
    "CIEL": ["예서", "린", "유하", "지원"],
    "DAZE": ["다은", "나은", "시은", "해원"],
    "AURA": ["하린", "수현", "예은", "보라", "민서"],
    "BIJOU": ["채연", "소현", "지안", "다인", "하영", "은지", "시아", "서아"],
    "FLORA": ["예린", "수빈", "지현", "소희", "다현", "아영"],
    "FLEUR": ["가영", "미소", "주하", "율하", "하율", "서윤", "지영", "세은", "여름", "초원",
              "하늘", "별", "나라", "새벽", "보미", "로하", "한별", "아린", "자윤", "단비"],
}

# 혼성그룹 멤버 (남22 + 여18 = 40명)
_MIXED_GROUPS = {
    "AXIS": {"준혁": "male", "수아": "female", "원호": "male", "나윤": "female", "솔": "female"},
    "NODE": {"정빈": "male", "예진": "female", "태우": "male", "리아": "female"},
    "CLEF": {"지환": "male", "하나": "female", "빈": "male", "연서": "female"},
    "TROVE": {"도윤": "male", "채은": "female", "한": "male", "규민": "male", "나영": "female"},
    "HELIX": {"성진": "male", "소연": "female", "현": "male", "유진": "female", "재원": "male", "다연": "female", "윤": "male"},
    "TRACE": {
        "호준": "male", "윤아": "female", "종원": "male", "선우": "male", "지수": "female",
        "현서": "male", "진혁": "male", "예주": "female", "예준": "male", "채영": "female",
        "민수": "male", "유빈": "female", "건우": "male", "세연": "female", "재민": "male",
    },
}

# 멤버 리스트 구성
male_members: list[tuple[str, str]] = []   # (이름, 그룹명)
female_members: list[tuple[str, str]] = []

for group, members in _BOY_GROUPS.items():
    for name in members:
        male_members.append((name, group))

for group, members in _GIRL_GROUPS.items():
    for name in members:
        female_members.append((name, group))

for group, members_dict in _MIXED_GROUPS.items():
    for name, gender in members_dict.items():
        if gender == "male":
            male_members.append((name, group))
        else:
            female_members.append((name, group))


def rename_gender(
    src_dir: Path,
    members: list[tuple[str, str]],
    gender: str,
    prefix: str,
    dry_run: bool,
) -> list[dict]:
    """한 성별의 final/ 폴더 내 모든 파일을 순서대로 라벨링합니다.

    파일을 정렬 후 순번대로 멤버 이름 배정.
    멤버 수(62/70)를 넘는 파일은 preset_NN으로 라벨링.
    """
    mapping_log = []

    # final/ 폴더의 모든 png 파일을 정렬
    all_files = sorted(src_dir.glob(f"{prefix}_*.png"))
    if not all_files:
        print(f"  [WARNING] {src_dir}에 파일이 없습니다.")
        return mapping_log

    total_members = len(members)

    for seq, src in enumerate(all_files):
        seq_num = seq + 1  # 1-indexed

        if seq < total_members:
            name, group = members[seq]
            new_name = f"{name}_{seq_num:02d}_{gender}.png"
            label = f"{group:8s} | {name}"
        else:
            name = f"preset_{seq_num:03d}"
            group = "EXTRA"
            new_name = f"{name}_{gender}.png"
            label = f"{'EXTRA':8s} | {name}"

        dest = OUTPUT_DIR / new_name

        if not dry_run:
            shutil.copy2(src, dest)
        print(f"  [{seq_num:03d}] {label:20s} | {src.name} -> {new_name}")
        mapping_log.append({
            "number": seq_num, "name": name, "group": group,
            "gender": gender, "source": src.name, "renamed": new_name,
        })

    return mapping_log


def main():
    parser = argparse.ArgumentParser(description="프로필 사진 라벨링 (final/ 폴더 기준, 변형 포함)")
    parser.add_argument("--dry-run", action="store_true", help="매핑만 확인하고 복사하지 않음")
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 기존 renamed/ 파일 정리
    if not args.dry_run:
        for old in OUTPUT_DIR.glob("*.png"):
            old.unlink()

    print(f"남자 멤버: {len(male_members)}명")
    print(f"여자 멤버: {len(female_members)}명")
    print(f"소스: {MALE_SRC} / {FEMALE_SRC}")
    print()

    all_mapping = []

    # 남자 매핑
    print("=" * 60)
    print("남자 프로필 라벨링")
    print("=" * 60)
    m_log = rename_gender(MALE_SRC, male_members, "male", "male", args.dry_run)
    all_mapping.extend(m_log)

    print()
    print("=" * 60)
    print("여자 프로필 라벨링")
    print("=" * 60)
    f_log = rename_gender(FEMALE_SRC, female_members, "female", "female", args.dry_run)
    all_mapping.extend(f_log)

    # 매핑 로그 저장
    if not args.dry_run:
        log_path = OUTPUT_DIR / "mapping_log.json"
        with open(log_path, "w") as f:
            json.dump(all_mapping, f, indent=2, ensure_ascii=False)
        print(f"\n매핑 로그: {log_path}")

    print()
    print("=" * 60)
    if not args.dry_run:
        total = len(list(OUTPUT_DIR.glob("*.png")))
        print(f"완료! {total}장 라벨링됨 -> {OUTPUT_DIR}")
    else:
        print(f"DRY RUN: 복사 건너뜀 (매핑 {len(all_mapping)}건)")
    print("=" * 60)


if __name__ == "__main__":
    main()
