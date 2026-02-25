"""
하이라이트 썸네일 생성 스크립트 v2
===================================
group_highlights.json 기반으로 40개 하이라이트 썸네일을 자동 생성합니다.
30개 콘텐츠 템플릿별 씬 프롬프트를 사용하며, 멤버 프로필 이미지를 레퍼런스로 전달합니다.

사용법:
    export GOOGLE_API_KEY="AIzaSy..."
    pip install google-genai Pillow
    python generate_highlight_thumbnails_v2.py --dry-run    # 프롬프트 확인
    python generate_highlight_thumbnails_v2.py              # 전체 생성
"""

from __future__ import annotations

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
DATA_FILE = Path(__file__).parent / "output" / "group_highlights.json"
PROFILE_DIR = Path(__file__).parent / "output" / "profiles" / "renamed"
OUTPUT_DIR = Path(__file__).parent / "output" / "highlight_thumbnails"
LOG_FILE = OUTPUT_DIR / "generation_log_v2.json"

MODEL = "gemini-3-pro-image-preview"
TARGET_WIDTH = 690
TARGET_HEIGHT = 460

# === 30개 콘텐츠별 씬 프롬프트 ===
# content_id → scene description for thumbnail
CONTENT_SCENE_PROMPTS = {
    1: """EXTREME CLOSE-UP group selfie, team game competition scene,
members split into two teams with competitive playful expressions,
some pointing at opponents with challenging grins, others looking nervous,
bright colorful game show lighting, energetic fun atmosphere, faces 90% of frame""",

    2: """EXTREME CLOSE-UP group selfie in a kitchen cooking scene,
members wearing aprons with flour on faces, one holding a huge mixing bowl,
chaotic fun cooking energy, some ingredients visible near faces,
warm bright kitchen lighting, joyful messy cooking vibes, faces 90% of frame""",

    3: """EXTREME CLOSE-UP group selfie, chase/hide-and-seek scene,
one member with sunglasses looking cool as hunter, others looking scared and excited,
members huddled together trying to hide, adrenaline-filled expressions,
dynamic lighting with shadows, action energy, faces 90% of frame""",

    4: """EXTREME CLOSE-UP group selfie in a cozy living room,
members in casual pajamas looking shocked at something funny,
one member caught eating snacks with guilty expression, others pointing and laughing,
warm home lighting, domestic comedy energy, faces 90% of frame""",

    5: """EXTREME CLOSE-UP group selfie at a fish market/outdoor food location,
members with amazed curious expressions trying local food, some looking disgusted hilariously,
one member bravely trying something while others watch in horror,
bright natural daylight, travel adventure energy, faces 90% of frame""",

    6: """EXTREME CLOSE-UP group selfie during a chat/talk session,
members sitting in a circle with dramatic debate expressions,
some passionately arguing, others laughing at the chaos,
warm ambient living room lighting, cozy talk show energy, faces 90% of frame""",

    7: """EXTREME CLOSE-UP group selfie on a road trip adventure,
members squished together in a vehicle with exhausted but happy expressions,
some sleeping on others shoulders, travel-worn but bonding moment,
natural golden hour light through window, road trip vibes, faces 90% of frame""",

    8: """EXTREME CLOSE-UP group selfie at a hidden local restaurant,
members with ecstatic expressions tasting amazing food, some with chopsticks near mouths,
one member with tears of joy from delicious food, others reaching for more,
warm restaurant mood lighting, foodie adventure energy, faces 90% of frame""",

    9: """EXTREME CLOSE-UP group selfie during budget travel planning,
members looking at a tiny budget with dramatic despair expressions,
one member counting coins dramatically, others looking worried but amused,
flat neutral lighting, budget survival comedy energy, faces 90% of frame""",

    10: """EXTREME CLOSE-UP group selfie in a dark spooky location,
faces lit dramatically from phone flashlights below creating horror movie effect,
members clinging to each other with genuinely scared expressions,
dark atmosphere with dramatic shadows, horror-comedy energy, faces 90% of frame""",

    11: """EXTREME CLOSE-UP group selfie during detective role-play,
members with suspicious squinting detective expressions, some pointing accusations,
one member looking nervously guilty, others with intense investigative gazes,
moody noir-style lighting, mystery thriller energy, faces 90% of frame""",

    12: """EXTREME CLOSE-UP group selfie in an escape room,
members looking at a puzzle with intense concentration and slight panic,
time pressure visible in their expressions, some eureka moment faces,
dramatic countdown lighting, intellectual thriller energy, faces 90% of frame""",

    13: """EXTREME CLOSE-UP group selfie during a barista challenge,
members with coffee-splattered aprons looking at latte art attempts,
one proud of their creation while others have failed hilariously,
warm cafe lighting, skill challenge comedy energy, faces 90% of frame""",

    14: """EXTREME CLOSE-UP group selfie showing off a learned skill,
members holding juggling balls with mix of proud and frustrated expressions,
one successfully performing while others still struggling,
bright practice room lighting, 24-hour challenge energy, faces 90% of frame""",

    15: """EXTREME CLOSE-UP group selfie in firefighter gear,
members wearing heavy gear with exhausted but determined expressions,
some looking up at something tall with fear, others encouraging,
outdoor bright sunlight, extreme challenge energy, faces 90% of frame""",

    16: """EXTREME CLOSE-UP group selfie during an emotional interview moment,
one member with tears being comforted by others with warm proud smiles,
intimate emotional bonding expressions, tissues and warm feelings visible,
soft warm studio lighting, touching heartfelt energy, faces 90% of frame""",

    17: """EXTREME CLOSE-UP group selfie in a cozy dorm after concert,
members in comfortable clothes looking tired but blissfully happy,
one playing piano in background, others with post-concert glow,
warm dim evening lighting, peaceful wind-down energy, faces 90% of frame""",

    18: """EXTREME CLOSE-UP group selfie eating late-night ramen,
members with sleepy happy expressions, steam from ramen visible,
chopsticks and noodles near mouths, red cheeks from hot soup,
warm single overhead light, late-night bonding energy, faces 90% of frame""",

    19: """EXTREME CLOSE-UP group selfie at karaoke,
members with enthusiastic singing expressions, some holding invisible mics,
one member belting out a note with eyes closed, others cheering,
colorful neon karaoke lighting, music party energy, faces 90% of frame""",

    20: """EXTREME CLOSE-UP group selfie during MBTI discussion,
members in animated debate with exaggerated expressions of disagreement,
some pointing at each other passionately, others covering face laughing,
bright casual hangout lighting, personality debate energy, faces 90% of frame""",

    21: """EXTREME CLOSE-UP group selfie during concert rehearsal,
members in practice wear looking focused and slightly tired,
some doing dance moves while taking selfie, determined expressions,
bright dance practice room lighting with mirrors, pre-show energy, faces 90% of frame""",

    22: """EXTREME CLOSE-UP group selfie at a sports day event,
members looking competitive with headbands, some flexing muscles jokingly,
post-exercise sweaty glowing faces with victory and defeat expressions,
bright outdoor sunlight, athletic team spirit energy, faces 90% of frame""",

    23: """EXTREME CLOSE-UP group selfie during cooking competition,
members proudly holding up their completed dishes near faces,
competitive proud expressions, some dishes look questionable,
bright kitchen fluorescent lighting, cooking battle energy, faces 90% of frame""",

    24: """EXTREME CLOSE-UP group selfie during punishment game,
some members with watery eyes from spicy food, others laughing hard,
one member counting tiny sesame seeds with a miserable expression,
bright flat lighting, variety show punishment comedy energy, faces 90% of frame""",

    25: """EXTREME CLOSE-UP group selfie during fan quiz challenge,
members with shocked embarrassed expressions hearing questions about themselves,
some hiding faces in hands, others with knowing smirks,
studio panel show lighting, fan interaction energy, faces 90% of frame""",

    26: """EXTREME CLOSE-UP group selfie watching sunrise at a beach,
members with peaceful awestruck expressions, warm golden sunrise glow on faces,
some with slightly teary emotional eyes, hair tousled by morning breeze,
warm golden hour lighting, serene bonding moment energy, faces 90% of frame""",

    27: """EXTREME CLOSE-UP group selfie at a fashion market/shopping trip,
members trying on various accessories and hats near faces,
playful fashionable poses with shopping bags barely visible,
bright shopping mall lighting, fashion challenge energy, faces 90% of frame""",

    28: """EXTREME CLOSE-UP group selfie writing wish messages,
members holding colorful balloons near their happy hopeful faces,
emotional warm smiles with a sense of promise and dreams,
soft warm outdoor lighting, wish and dream energy, faces 90% of frame""",

    29: """EXTREME CLOSE-UP group selfie at a surprise birthday party,
birthday member in center with shocked tears of joy,
others cheering with huge smiles, cake candles glowing on faces,
warm candlelight and party lighting, celebration love energy, faces 90% of frame""",

    30: """EXTREME CLOSE-UP group selfie during charades/body language game,
members with exaggerated hilarious expressions mid-game,
one doing a ridiculous pose while others guess with confused faces,
bright variety show lighting, physical comedy energy, faces 90% of frame""",
}

# === 공통 프롬프트 ===
COMMON_THUMBNAIL_PROMPT = """Generate a single group scene image of these K-pop idol members together.

CRITICAL REQUIREMENTS:
- Use the provided reference photos as the EXACT faces for each member in the scene
- Each member's face must closely match their reference photo
- Faces should be the PRIMARY FOCUS, large and clearly visible
- Image aspect ratio must be 3:2 (landscape, wider than tall)
- ABSOLUTELY NO TEXT, no titles, no captions, no watermarks, no logos
- No UI elements, no frames, no borders

COMPOSITION — MOST IMPORTANT:
- EXTREME CLOSE-UP GROUP SELFIE framing like a YouTube thumbnail
- Faces must fill 80-90% of the entire image
- Heads may be cropped at edges — camera is very close
- Like members holding a phone at arm's length for group selfie
- Minimal background visible — just faces packed tightly

PHOTOGRAPHY STYLE:
- Matte, flat, slightly desaturated color grading
- Natural candid smartphone selfie feel
- Cool neutral white balance
- Avoid overly polished CGI look — real casual selfie moment"""


def load_highlights():
    """group_highlights.json에서 하이라이트 데이터를 로드합니다."""
    with open(DATA_FILE, encoding="utf-8") as f:
        return json.load(f)


def find_profile_image(name: str, gender: str) -> Path | None:
    """멤버 이름과 성별로 프로필 이미지를 찾습니다."""
    # renamed/ 디렉토리에서 이름_XX_gender.png 패턴 검색
    pattern = f"{name}_*_{gender}.png"
    matches = list(PROFILE_DIR.glob(pattern))
    if matches:
        return matches[0]
    return None


def load_member_images(
    members: list[str],
    member_genders: dict[str, str],
) -> list[tuple[str, Image.Image]]:
    """멤버 프로필 이미지를 로드합니다 (최대 5명)."""
    images = []
    for name in members[:5]:
        gender = member_genders.get(name, "male")
        path = find_profile_image(name, gender)
        if path and path.exists():
            img = Image.open(path)
            images.append((name, img))
            print(f"    ref: {name} ({path.name})")
        else:
            print(f"    [skip] {name}: 프로필 이미지 없음")
    return images


def generate_thumbnail(
    client: genai.Client,
    scene_prompt: str,
    member_images: list[tuple[str, Image.Image]],
    retry_count: int = 3,
):
    """멤버 프로필 이미지를 레퍼런스로 사용하여 썸네일을 생성합니다."""
    member_names = ", ".join(name for name, _ in member_images)
    ref_images = [img for _, img in member_images]

    full_prompt = f"""{COMMON_THUMBNAIL_PROMPT}

Members (in order of reference images): {member_names}
Number of members in scene: {len(member_images)}

SCENE DESCRIPTION:
{scene_prompt}

The faces from the reference images must be preserved as accurately as possible."""

    contents = [full_prompt] + ref_images

    for attempt in range(retry_count):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=contents,
                config=types.GenerateContentConfig(
                    response_modalities=["TEXT", "IMAGE"],
                    image_config=types.ImageConfig(
                        aspect_ratio="3:2",
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


def resize_to_target(img) -> Image.Image:
    """이미지를 690x460으로 리사이즈합니다."""
    import io

    if not isinstance(img, Image.Image):
        img_bytes = img.image_bytes
        pil_img = Image.open(io.BytesIO(img_bytes))
    else:
        pil_img = img
    return pil_img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)


def main():
    parser = argparse.ArgumentParser(description="하이라이트 썸네일 생성 v2 (40개, group_highlights.json 기반)")
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

    # 데이터 로드
    groups = load_highlights()

    # 전체 하이라이트 태스크 구성
    tasks = []
    for group in groups:
        gname = group["group_name"]
        members = group["members"]
        member_genders = group.get("member_genders", {})

        for hl in group["highlights"]:
            content_id = hl["content_id"]
            title = hl["title"]
            is_premium = hl.get("is_premium", False)

            scene_prompt = CONTENT_SCENE_PROMPTS.get(content_id)
            if not scene_prompt:
                print(f"[Warning] content_id={content_id}에 대한 씬 프롬프트가 없습니다. 기본 프롬프트 사용.")
                scene_prompt = """EXTREME CLOSE-UP group selfie, members with fun playful expressions,
bright cheerful lighting, casual fun energy, faces 90% of frame"""

            tasks.append({
                "group": gname,
                "members": members,
                "member_genders": member_genders,
                "content_id": content_id,
                "title": title,
                "is_premium": is_premium,
                "scene_prompt": scene_prompt,
            })

    # 슬라이싱
    start = args.start
    end = start + args.count if args.count > 0 else len(tasks)
    tasks = tasks[start:end]
    total = len(tasks)

    print("=" * 60)
    print("Highlight Thumbnail Generator v2")
    print(f"Model: {MODEL}")
    print(f"Target size: {TARGET_WIDTH}x{TARGET_HEIGHT} (3:2)")
    print(f"Total thumbnails: {total}")
    print(f"Profile images dir: {PROFILE_DIR}")
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
        "target_size": f"{TARGET_WIDTH}x{TARGET_HEIGHT}",
        "results": [],
    }

    success_count = 0
    fail_count = 0

    for idx, task in enumerate(tasks):
        gname = task["group"]
        title = task["title"]
        content_id = task["content_id"]
        members = task["members"]
        is_premium = task["is_premium"]

        print(f"[{idx + 1}/{total}] {gname} > [{content_id:02d}] \"{title}\" {'(premium)' if is_premium else '(free)'}")
        print(f"  Members: {', '.join(members[:5])}{'...' if len(members) > 5 else ''}")

        if args.dry_run:
            print(f"  Scene: {task['scene_prompt'][:100]}...")
            print()
            continue

        # 멤버 이미지 로드
        member_images = load_member_images(members, task["member_genders"])

        if not member_images:
            print(f"    [FAILED] 멤버 이미지를 로드할 수 없습니다.")
            log["results"].append({
                "group": gname,
                "content_id": content_id,
                "title": title,
                "status": "failed",
                "reason": "no_member_images",
                "timestamp": datetime.now().isoformat(),
            })
            fail_count += 1
            continue

        # 썸네일 생성
        image = generate_thumbnail(client, task["scene_prompt"], member_images)

        safe_title = title.replace(" ", "_").replace("/", "_")
        filename = f"{gname}_{content_id:02d}_{safe_title}.png"

        if image is not None:
            filepath = OUTPUT_DIR / filename
            resized = resize_to_target(image)
            resized.save(str(filepath))
            print(f"    Saved: {filepath} ({resized.size[0]}x{resized.size[1]})")

            log["results"].append({
                "group": gname,
                "content_id": content_id,
                "title": title,
                "filename": filename,
                "size": f"{resized.size[0]}x{resized.size[1]}",
                "status": "success",
                "timestamp": datetime.now().isoformat(),
            })
            success_count += 1
        else:
            print(f"    [FAILED] {gname} > {title}")
            log["results"].append({
                "group": gname,
                "content_id": content_id,
                "title": title,
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
