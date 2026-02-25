"""
아이돌 그룹 엠블럼/로고 생성 스크립트
=======================================
20개 그룹별 모던 K-pop 스타일 엠블럼을 생성합니다.

사용법:
    export GOOGLE_API_KEY="AIzaSy..."
    pip install google-genai Pillow
    python generate_group_emblems.py --dry-run    # 프롬프트 확인
    python generate_group_emblems.py              # 전체 생성
"""

import os
import sys
import time
import json
import argparse
from pathlib import Path
from datetime import datetime

from google import genai
from google.genai import types
from PIL import Image

# === 설정 ===
OUTPUT_DIR = Path(__file__).parent / "output" / "emblems"
LOG_FILE = OUTPUT_DIR / "generation_log.json"

MODEL = "gemini-3-pro-image-preview"
ASPECT_RATIO = "1:1"

# === 20개 그룹 정의 (이름, 한글명, 타입, 레터링 힌트) ===
# 실제 K-pop 로고 = 커스텀 워드마크. 글자 자체가 디자인.
GROUPS = [
    ("CREED", "크리드", "boy_group",
     "Extra-bold condensed all-caps. The two E letters share a connected vertical stroke in the middle, forming a unified ligature. Sharp angular terminals on C and D. Aggressive, authoritative."),
    ("ARDOR", "아더", "boy_group",
     "Heavy italic sans-serif, all letters leaning forward with urgency. The A has no crossbar — just two diagonal strokes meeting at a sharp peak. Bold, passionate energy."),
    ("KLAV", "클라브", "boy_group",
     "Clean geometric sans-serif with precise mathematical spacing. The K and V mirror each other's diagonal strokes. The A has a flat top like a piano key shape. Refined, classical-modern."),
    ("PLUME", "플룸", "girl_group",
     "Elegant thin-weight extended sans-serif with generous letter-spacing. The tail of the E extends into a delicate upward flick like a feather tip. Light, airy, sophisticated."),
    ("CIEL", "시엘", "girl_group",
     "Rounded geometric sans-serif, medium weight. The C curves almost into a full circle. The I has no serifs, just a clean vertical stroke. The dot of the I is replaced by a tiny circle. Soft, open, dreamy."),
    ("DAZE", "데이즈", "girl_group",
     "The letters have slightly rounded edges and the Z is rotated 2-3 degrees, creating a subtle off-balance feeling. Medium-weight sans-serif. Hypnotic, slightly surreal."),
    ("AXIS", "악시스", "mixed",
     "Geometric sans-serif where the X is perfectly centered and enlarged slightly, becoming the visual anchor. The A and S mirror each other in weight. Symmetrical, balanced, precise."),
    ("NODE", "노드", "mixed",
     "Monospaced geometric letterforms where the O is a perfect circle and the D echoes it. Small dots at the terminals of N and E, like connection nodes. Clean, technical."),
    ("CLEF", "클레프", "mixed",
     "The C and L flow together in a continuous connected stroke, resembling a treble clef curve. Elegant medium-weight sans-serif. The ligature IS the identity. Musical, harmonious."),
    ("NEXO", "넥소", "boy_group",
     "Bold geometric all-caps where the X is formed by two overlapping V shapes, creating an interlocking effect. The O is hexagonal rather than round. Futuristic, connected."),
    ("VERVE", "버브", "boy_group",
     "Black-weight italic sans-serif with extreme forward lean. Each letter slightly overlaps the next, creating kinetic energy. The two V letters bookend the word with sharp diagonals. Dynamic, vital."),
    ("AURA", "오라", "girl_group",
     "Thin-to-medium weight with elegant contrast. The two A letters are identical but the U between them has an unusually wide bowl, creating a soft glow-like open space. Luminous, warm."),
    ("BIJOU", "비쥬", "girl_group",
     "Geometric sans-serif where the O is a diamond/rhombus shape instead of a circle. The J descends below the baseline with a precise angular turn. Faceted, crystalline, precious."),
    ("TROVE", "트로브", "mixed",
     "Bold condensed all-caps with the O split into two halves with a hairline gap — like a chest opening. Sturdy, weighty letterforms. Rich, substantial."),
    ("HELIX", "헬릭스", "mixed",
     "The H and X share mirrored diagonal strokes. Medium-weight sans-serif with subtle rounded terminals. The I is slightly rotated, creating a spiral suggestion. Interconnected, evolving."),
    ("NOVA", "노바", "boy_group",
     "Extra-bold geometric all-caps. The O has four tiny notches at cardinal points, making it a subtle four-pointed star. Clean, explosive energy in heavy simple forms."),
    ("FLORA", "플로라", "girl_group",
     "Light-weight extended sans-serif with rounded terminals on every letter. The O has a tiny stem descending from it like a flower bud. Organic, delicate, botanical."),
    ("TRACE", "트레이스", "mixed",
     "Medium sans-serif where the letters gradually decrease in opacity from T (100%) to E (60%), creating a fading trail effect. The baseline curves gently upward. Journey, path."),
    ("CREST", "크레스트", "boy_group",
     "Heavy extended all-caps with strong horizontal emphasis. The T at the end has an extra-wide crossbar that extends over the adjacent letters like a protective roof. Regal, commanding."),
    ("FLEUR", "플뢰르", "girl_group",
     "Elegant transitional serif with high contrast between thick and thin strokes. The F has a decorative terminal that curves like a petal. The R's leg extends with a graceful kick. Refined, French-inspired."),
]

# === 공통 프롬프트 ===
COMMON_PROMPT = """Design a custom wordmark logo for a K-pop idol group.

CRITICAL — THE WORDMARK IS THE LOGO:
- The group name rendered in CUSTOM LETTERING is the entire logo
- No separate icon or symbol placed next to or above the text
- The letterforms themselves ARE the design — through ligatures, modified strokes,
  removed crossbars, connected letters, or clever negative space
- Reference: BTS (two trapezoids), BLACKPINK (mirrored C and N, removed A crossbar),
  aespa (interlocked a+e forming butterfly), LE SSERAFIM (custom Ringside modification)

TYPOGRAPHY:
- Custom-designed letterforms, NOT a stock font used as-is
- Every letter should feel intentionally crafted
- Geometric precision: mathematically exact spacing, consistent stroke widths
- All-caps (unless the concept specifically calls for mixed case)

STYLE:
- Pure white lettering on solid black background
- NO color, NO gradients, NO metallic effects, NO chrome, NO shadows, NO 3D, NO glow
- NO decorative elements around the text (no stars, notes, crowns, borders, shields)
- Clean vector-art quality with sharp crisp edges
- Must be legible and recognizable even at small sizes (like a favicon)

COMPOSITION:
- The wordmark is centered on the canvas
- Generous negative space around the letters — let it breathe
- The logo should feel like it was designed by a top Korean design agency
  (HuskyFox, Studio XXX) for a major entertainment company debut

ABSOLUTELY NOT:
- No icon or symbol separate from the letters
- No realistic imagery, no illustrations, no people
- No extra text, taglines, subtitles, dates
- No busy or cluttered composition"""


def build_emblem_prompt(name: str, kr_name: str, group_type: str, lettering_hint: str) -> str:
    """그룹별 엠블럼 생성 프롬프트를 조합합니다."""
    return f"""{COMMON_PROMPT}

GROUP NAME: {name}
CUSTOM LETTERING DIRECTION: {lettering_hint}

Generate ONLY the wordmark logo — white on black, nothing else."""


def generate_emblem(
    client: genai.Client,
    prompt: str,
    retry_count: int = 3,
):
    """Gemini API로 엠블럼을 생성합니다."""
    for attempt in range(retry_count):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=[prompt],
                config=types.GenerateContentConfig(
                    response_modalities=["TEXT", "IMAGE"],
                    image_config=types.ImageConfig(
                        aspect_ratio=ASPECT_RATIO,
                    ),
                ),
            )

            for part in response.parts:
                if part.inline_data is not None:
                    return part.as_image()
                elif part.text is not None:
                    print(f"    model: {part.text[:80]}...")

            print(f"    [Warning] No image in response (attempt {attempt + 1}/{retry_count})")

        except Exception as e:
            print(f"    [Error] Attempt {attempt + 1}/{retry_count}: {e}")
            if attempt < retry_count - 1:
                wait_time = (attempt + 1) * 10
                print(f"    Waiting {wait_time}s before retry...")
                time.sleep(wait_time)

    return None


def save_image(img, filepath: Path):
    """이미지를 저장합니다."""
    import io

    if not isinstance(img, Image.Image):
        img_bytes = img.image_bytes
        pil_img = Image.open(io.BytesIO(img_bytes))
    else:
        pil_img = img
    pil_img.save(str(filepath))
    return pil_img


def main():
    parser = argparse.ArgumentParser(description="아이돌 그룹 엠블럼 생성 (20개)")
    parser.add_argument("--dry-run", action="store_true", help="프롬프트만 출력하고 API 호출하지 않음")
    parser.add_argument("--start", type=int, default=0, help="시작 인덱스 (0-based)")
    parser.add_argument("--count", type=int, default=0, help="생성할 수량 (0=전체)")
    parser.add_argument("--delay", type=float, default=8.0, help="각 생성 사이 대기 시간(초)")
    args = parser.parse_args()

    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key and not args.dry_run:
        print("[Error] GOOGLE_API_KEY 환경변수를 설정해주세요.")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 슬라이싱
    groups = GROUPS[args.start:]
    if args.count > 0:
        groups = groups[:args.count]

    total = len(groups)

    print("=" * 60)
    print("AIdol Group Emblem Generator")
    print(f"Model: {MODEL}")
    print(f"Total groups: {total}")
    print(f"Output: {OUTPUT_DIR}")
    if args.dry_run:
        print("MODE: DRY RUN")
    print("=" * 60)
    print()

    client = None
    if not args.dry_run:
        client = genai.Client(api_key=api_key)

    log = {
        "generated_at": datetime.now().isoformat(),
        "model": MODEL,
        "results": [],
    }

    success_count = 0
    fail_count = 0

    for idx, (name, kr_name, group_type, concept) in enumerate(groups):
        prompt = build_emblem_prompt(name, kr_name, group_type, concept)
        filename = f"{name}.png"

        print(f"[{idx + 1}/{total}] {name} ({kr_name}) [{group_type}]")

        if args.dry_run:
            print(f"  Concept: {concept[:80]}...")
            print(f"  File: {filename}")
            print()
            continue

        image = generate_emblem(client, prompt)

        if image is not None:
            filepath = OUTPUT_DIR / filename
            save_image(image, filepath)
            print(f"    Saved: {filepath}")
            log["results"].append({
                "group": name,
                "filename": filename,
                "status": "success",
                "timestamp": datetime.now().isoformat(),
            })
            success_count += 1
        else:
            print(f"    [FAILED] {name}")
            log["results"].append({
                "group": name,
                "filename": filename,
                "status": "failed",
                "timestamp": datetime.now().isoformat(),
            })
            fail_count += 1

        # 중간 로그 저장
        with open(LOG_FILE, "w") as f:
            json.dump(log, f, indent=2, ensure_ascii=False)

        if idx < total - 1 and not args.dry_run:
            print(f"    Waiting {args.delay}s...")
            time.sleep(args.delay)

    print()
    print("=" * 60)
    print("완료!")
    print(f"  성공: {success_count}장")
    print(f"  실패: {fail_count}장")
    print(f"  출력: {OUTPUT_DIR}")
    print(f"  로그: {LOG_FILE}")
    print("=" * 60)


if __name__ == "__main__":
    main()
