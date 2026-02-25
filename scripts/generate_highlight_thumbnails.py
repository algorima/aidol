"""
하이라이트 썸네일 생성 스크립트
================================
각 아이돌 그룹의 멤버 프로필 사진을 레퍼런스로 활용하여
345x230 비율의 하이라이트 썸네일을 생성합니다.

사용법:
    export GOOGLE_API_KEY="AIzaSy..."
    python generate_highlight_thumbnails.py
    python generate_highlight_thumbnails.py --start 5  # highlight-5부터 시작
    python generate_highlight_thumbnails.py --dry-run   # 프롬프트만 확인
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


# 설정
PROFILE_DIR = Path(__file__).parent / "output" / "profiles" / "renamed"
OUTPUT_DIR = Path(__file__).parent / "output" / "highlight_thumbnails"
DATA_FILE = Path(__file__).parent.parent / "backend" / "scripts" / "data.json"
LOG_FILE = OUTPUT_DIR / "generation_log.json"

MODEL = "gemini-3-pro-image-preview"
TARGET_WIDTH = 690
TARGET_HEIGHT = 460

# 멤버 이름 -> 프로필 이미지 매핑
MEMBER_PROFILES = {
    "레온": "레온_01_male.png",
    "주아": "주아_02_male.png",
    "케인": "케인_03_male.png",
    "로엔": "로엔_04_male.png",
    "엘릭": "엘릭_05_male.png",
    "미노": "미노_06_male.png",
    "테온": "테온_07_male.png",
    "지아": "지아_08_male.png",
    "아론": "아론_09_male.png",
    "하엔": "하엔_10_male.png",
    "제하": "제하_11_male.png",
    "잭스": "잭스_12_male.png",
    "우린": "우린_13_male.png",
    "블루": "블루_14_male.png",
    "아레": "아레_01_female.png",
    "셀라": "셀라_02_female.png",
    "유에": "유에_03_female.png",
    "미르": "미르_04_female.png",
    "아이": "아이_05_female.png",
    "제인": "제인_06_female.png",
    "루아": "루아_07_female.png",
    "린린": "린린_08_female.png",
    "록시": "록시_09_female.png",
    "세린": "세린_10_female.png",
    "베인": "베인_11_female.png",
    "슈아": "슈아_12_female.png",
    "아리": "아리_13_female.png",
    "준": "준_15_male.png",
    "레오": "레오_16_male.png",
    "애시": "애시_14_female.png",
    "유": "유_15_female.png",
    "레인": "레인_16_female.png",
    "알렌": "알렌_17_male.png",
    "미하": "미하_18_male.png",
    "소린": "소린_17_female.png",
    "앤": "앤_18_female.png",
    "지노": "지노_19_male.png",
    "민유": "민유_20_male.png",
    "미츠": "미츠_19_female.png",
    "로아": "로아_20_female.png",
}

# 아이돌 그룹 -> 멤버 매핑
AIDOL_MEMBERS = {
    "aidol-1": ["레온", "주아", "케인", "로엔", "엘릭"],
    "aidol-2": ["미노", "테온", "지아", "아론", "하엔"],
    "aidol-3": ["제하", "잭스", "우린", "블루"],
    "aidol-4": ["아레", "셀라", "유에", "미르", "아이"],
    "aidol-5": ["제인", "루아", "린린", "록시"],
    "aidol-6": ["세린", "베인", "슈아", "아리"],
    "aidol-7": ["준", "레오", "애시", "유", "레인"],
    "aidol-8": ["알렌", "미하", "소린", "앤"],
    "aidol-9": ["지노", "민유", "미츠", "로아"],
}

# 공통 환경/스타일 지시
COMMON_SETTING = """modern Korean officetel dorm, clean minimalist interior,
white walls, gray-white flooring, black and white monochrome furniture,
sleek and tidy space like a young men's shared apartment"""

# 18개 하이라이트별 썸네일 프롬프트
HIGHLIGHT_SCENES = {
    "highlight-1": {
        "title": "새벽 귀신 사건",
        "aidolId": "aidol-1",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
all members looking terrified with wide eyes and open mouths, one covering mouth in shock,
dim blue-ish nighttime lighting on faces, pajamas barely visible at bottom edge,
scared funny expressions like they just saw a ghost, faces take up 90% of image""",
    },
    "highlight-2": {
        "title": "샤워 순서 전쟁",
        "aidolId": "aidol-1",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members with competitive playful expressions, some with wet hair, towels on heads,
one member grinning victoriously while others look frustrated and desperate,
bright white bathroom lighting on faces, chaotic fun energy, faces 90% of frame""",
    },
    "highlight-3": {
        "title": "냉장고 털이범",
        "aidolId": "aidol-2",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
one member with guilty caught-red-handed expression with food near mouth,
others with shocked accusatory suspicious faces pointing at the guilty one,
cool bluish refrigerator light illuminating faces from side, faces 90% of frame""",
    },
    "highlight-4": {
        "title": "양말 실종 사건",
        "aidolId": "aidol-2",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members holding up single mismatched socks near their confused bewildered faces,
puzzled questioning expressions like solving a mystery, some holding socks up to camera,
flat neutral lighting, faces 90% of frame""",
    },
    "highlight-5": {
        "title": "슬리퍼 바뀜 사건",
        "aidolId": "aidol-3",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members with accusatory amused expressions pointing fingers at each other,
playful frustration and laughter, some looking down (at feet) with disbelief,
bright flat white lighting, faces 90% of frame""",
    },
    "highlight-6": {
        "title": "누가 내 컵 썼어",
        "aidolId": "aidol-3",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
one member clutching a mug near face looking offended and protective,
another looking guilty avoiding eye contact, others smirking with amusement,
cool white morning light, faces 90% of frame""",
    },
    "highlight-7": {
        "title": "미묘했던 순간",
        "aidolId": "aidol-4",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
soft gentle warm expressions, members with peaceful content smiles,
one member in center looking slightly emotional, others with fond gazes,
dim warm lamp light on faces, intimate cozy mood, faces 90% of frame""",
    },
    "highlight-8": {
        "title": "핸드폰 바뀜",
        "aidolId": "aidol-4",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
two members looking embarrassed and flustered holding phones near faces,
others with teasing knowing smiles and curious expressions,
soft white morning daylight, shy cute energy, faces 90% of frame""",
    },
    "highlight-9": {
        "title": "새벽 라면",
        "aidolId": "aidol-5",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members with tired but genuinely happy warm smiles, slightly red cheeks from hot ramen,
steam visible near faces, chopsticks held up near mouths,
warm single light overhead, cozy late-night bonding feel, faces 90% of frame""",
    },
    "highlight-10": {
        "title": "정전 사건",
        "aidolId": "aidol-5",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
faces lit dramatically from below by phone flashlight, dark everywhere else,
members with excited wide eyes in the darkness, some looking spooky-fun,
strong chiaroscuro light and shadow on faces, atmospheric, faces 90% of frame""",
    },
    "highlight-11": {
        "title": "생일 깜짝 파티",
        "aidolId": "aidol-6",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
one member in center with tears of joy and shocked open mouth,
others cheering with huge excited smiles around the birthday person,
warm candlelight glow on faces from below, pure joy and emotion, faces 90% of frame""",
    },
    "highlight-12": {
        "title": "비 오는 날 발코니",
        "aidolId": "aidol-6",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members with peaceful serene contemplative expressions, slightly damp hair,
cool blue-gray rainy atmosphere reflected on faces, soft melancholic beauty,
matte desaturated blue tones, quiet emotional mood, faces 90% of frame""",
    },
    "highlight-13": {
        "title": "세탁기 귀신",
        "aidolId": "aidol-7",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members huddled together looking scared, some hiding behind others peeking out,
frightened but also trying not to laugh expressions,
harsh white fluorescent light on faces, horror-comedy energy, faces 90% of frame""",
    },
    "highlight-14": {
        "title": "과자 서랍 분쟁",
        "aidolId": "aidol-7",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members with competitive greedy playful expressions, some stuffing snacks in mouths,
one guarding snacks protectively while others reach across,
bright flat white lighting, chaotic fun energy, faces 90% of frame""",
    },
    "highlight-15": {
        "title": "드라이기 순서 전쟁",
        "aidolId": "aidol-8",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
one member with perfectly dried hair looking smug, others with messy wet hair looking annoyed,
frustrated funny impatient faces, towels draped on shoulders near faces,
bright white bathroom light, faces 90% of frame""",
    },
    "highlight-16": {
        "title": "이어폰 실종",
        "aidolId": "aidol-8",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
detective-like suspicious squinting expressions, one member wearing earbuds looking innocent,
others pointing at the suspect with narrowed accusing eyes,
flat neutral daylight on faces, mystery comedy energy, faces 90% of frame""",
    },
    "highlight-17": {
        "title": "새벽 토스트",
        "aidolId": "aidol-9",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members with sleepy half-closed eyes but happy gentle smiles, holding toast near faces,
soft pale cool morning light on faces, cozy drowsy peaceful mood,
muted desaturated tones, faces 90% of frame""",
    },
    "highlight-18": {
        "title": "깜짝 기념일",
        "aidolId": "aidol-9",
        "scene": f"""EXTREME CLOSE-UP group selfie, faces packed tightly filling entire frame,
members in a tight group hug, faces squished together with huge genuine smiles,
some with happy tears, pure joy and togetherness,
bright neutral flat lighting, heartwarming celebration energy, faces 90% of frame""",
    },
}


def load_member_images(aidol_id: str) -> list[tuple[str, Image.Image]]:
    """해당 아이돌 그룹 멤버들의 프로필 이미지를 로드합니다."""
    members = AIDOL_MEMBERS[aidol_id]
    images = []
    for name in members:
        filename = MEMBER_PROFILES.get(name)
        if not filename:
            print(f"    [skip] {name}: 프로필 매핑 없음")
            continue
        path = PROFILE_DIR / filename
        if path.exists():
            img = Image.open(path)
            images.append((name, img))
            print(f"    ref: {name} ({filename})")
        else:
            print(f"    [skip] {name}: 파일 없음 ({path})")
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

    full_prompt = f"""Generate a single group scene image of these {len(member_images)} K-pop idol members together.

CRITICAL REQUIREMENTS:
- Use the provided reference photos as the EXACT faces for each member in the scene
- Each member's face must closely match their reference photo (same facial features, same face shape)
- Faces should be the PRIMARY FOCUS of the image, large and clearly visible
- Image aspect ratio must be 3:2 (landscape, wider than tall)
- ABSOLUTELY NO TEXT, no titles, no captions, no watermarks, no logos, no words of any kind
- No UI elements, no frames, no borders

Members (in order of reference images): {member_names}

SCENE DESCRIPTION:
{scene_prompt}

COMPOSITION — THIS IS THE MOST IMPORTANT RULE:
- EXTREME CLOSE-UP GROUP SELFIE framing — like a YouTube thumbnail
- Faces must fill 80-90% of the entire image, almost no background visible
- Heads and faces should be CROPPED at edges of frame — that's how close the camera is
- Like members are holding a phone at arm's length taking a group selfie
- Minimal to zero background — just faces packed tightly together edge to edge
- Some faces can overlap, be at angles, peek from behind — that's the YouTube thumbnail energy

PHOTOGRAPHY STYLE:
- Matte, flat, slightly desaturated color grading — NOT glossy or hyper-realistic
- Natural candid smartphone selfie feel, like a behind-the-scenes selca
- Cool neutral white balance, no warm brown or orange tones
- Clean modern Korean officetel: white walls, black/white/gray palette (barely visible behind faces)
- Avoid overly polished CGI look — real casual selfie moment
- The faces from the reference images must be preserved as accurately as possible."""

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

            print(
                f"    [Warning] No image in response (attempt {attempt + 1}/{retry_count})"
            )

        except Exception as e:
            print(f"    [Error] Attempt {attempt + 1}/{retry_count}: {e}")
            if attempt < retry_count - 1:
                wait_time = (attempt + 1) * 10
                print(f"    Waiting {wait_time}s before retry...")
                time.sleep(wait_time)

    return None


def resize_to_target(img) -> Image.Image:
    """이미지를 345x230 (또는 2배 690x460)으로 리사이즈합니다."""
    import io

    # Gemini Image -> PIL Image 변환
    if not isinstance(img, Image.Image):
        img_bytes = img.image_bytes
        pil_img = Image.open(io.BytesIO(img_bytes))
    else:
        pil_img = img
    return pil_img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)


def main():
    parser = argparse.ArgumentParser(
        description="하이라이트 썸네일 생성 (멤버 얼굴 레퍼런스 기반)"
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="프롬프트만 출력하고 API 호출하지 않음"
    )
    parser.add_argument(
        "--start", type=int, default=1, help="시작 하이라이트 번호 (1-18)"
    )
    parser.add_argument(
        "--end", type=int, default=18, help="종료 하이라이트 번호 (1-18)"
    )
    parser.add_argument(
        "--delay", type=float, default=8.0, help="각 생성 사이 대기 시간(초)"
    )
    args = parser.parse_args()

    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key and not args.dry_run:
        print("[Error] GOOGLE_API_KEY 환경변수를 설정해주세요.")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # data.json에서 하이라이트 정보 로드
    with open(DATA_FILE) as f:
        data = json.load(f)

    highlights = {h["id"]: h for h in data["aidol_highlights"]}

    # 생성할 하이라이트 목록
    tasks = []
    for i in range(args.start, args.end + 1):
        hid = f"highlight-{i}"
        if hid in HIGHLIGHT_SCENES:
            tasks.append((hid, HIGHLIGHT_SCENES[hid]))

    total = len(tasks)
    print("=" * 60)
    print("Highlight Thumbnail Generator")
    print(f"Model: {MODEL}")
    print(f"Target size: {TARGET_WIDTH}x{TARGET_HEIGHT} (3:2)")
    print(f"Total thumbnails to generate: {total}")
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

    for idx, (hid, scene_info) in enumerate(tasks):
        aidol_id = scene_info["aidolId"]
        title = scene_info["title"]
        members = AIDOL_MEMBERS[aidol_id]
        h_data = highlights.get(hid, {})

        print(f"[{idx + 1}/{total}] {hid}: \"{title}\" ({aidol_id}, {len(members)}명)")

        if args.dry_run:
            print(f"  Members: {', '.join(members)}")
            print(f"  Scene: {scene_info['scene'][:100]}...")
            print()
            continue

        # 멤버 프로필 이미지 로드
        member_images = load_member_images(aidol_id)
        if not member_images:
            print(f"    [FAILED] 멤버 이미지를 로드할 수 없습니다.")
            fail_count += 1
            continue

        # 썸네일 생성
        image = generate_thumbnail(client, scene_info["scene"], member_images)

        if image is not None:
            # 원본 저장 후 리사이즈
            filename = f"{hid}_{title.replace(' ', '_')}.png"
            filepath = OUTPUT_DIR / filename
            resized = resize_to_target(image)
            resized.save(str(filepath))
            print(f"    Saved: {filepath} ({resized.size[0]}x{resized.size[1]})")

            log["results"].append(
                {
                    "highlight_id": hid,
                    "title": title,
                    "aidol_id": aidol_id,
                    "filename": filename,
                    "size": f"{resized.size[0]}x{resized.size[1]}",
                    "status": "success",
                    "timestamp": datetime.now().isoformat(),
                }
            )
            success_count += 1
        else:
            print(f"    [FAILED] {hid}: {title}")
            log["results"].append(
                {
                    "highlight_id": hid,
                    "title": title,
                    "aidol_id": aidol_id,
                    "status": "failed",
                    "timestamp": datetime.now().isoformat(),
                }
            )
            fail_count += 1

        # 로그 저장
        with open(LOG_FILE, "w") as f:
            json.dump(log, f, indent=2, ensure_ascii=False)

        if idx < total - 1:
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
