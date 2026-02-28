"""아이돌 변신 시퀀스 이미지 생성 스크립트
===========================================
레퍼런스 이미지 3장의 얼굴을 유지하면서,
반팔 -> 교복 -> 공주님 아이돌 -> 에스파 파워풀 -> 무대 위 피날레
총 5장의 이미지를 순차 생성합니다. (모두 1:1, 검정 배경, 고정 포즈)

사용법:
    export GOOGLE_API_KEY="AIzaSy..."
    pip install google-genai Pillow
    python generate_idol_transformation.py --dry-run
    python generate_idol_transformation.py
    python generate_idol_transformation.py --scene 3
"""

import os
import sys
import io
import time
import json
import argparse
from pathlib import Path
from datetime import datetime

from google import genai
from google.genai import types
from PIL import Image

# === 설정 ===
REF_DIR = Path("/Users/leesoyeon/Downloads/dcamp 성낙환 팀장님 오피스아워_260223")
REF_IMAGES = [
    "female_50 2.png",
    "female_50 2.png",
    "female_50 2.png",
]
OUTPUT_DIR = Path(__file__).parent / "output" / "idol_transformation"
LOG_FILE = OUTPUT_DIR / "generation_log.json"

MODEL = "gemini-3-pro-image-preview"

# === 공통 프롬프트 ===
FACE_LOCK = """CRITICAL — FACE IDENTITY LOCK:
You are given a reference photo of a person. You MUST preserve this person's EXACT face in the generated image.
Copy every facial feature EXACTLY: face shape, eyes, nose, lips, eyebrows, skin tone.
The generated image must look like the SAME real person, just in a different outfit.
Do NOT create a new face. Do NOT change any facial proportions."""

FRAMING = """Front-facing, looking directly at camera, centered in frame.
1:1 square. Framing: head top has small margin to edge, bottom crop at chest level.
The person must fill the SAME proportion of the frame in every image — head size and position identical.
Natural photography look, NO artificial glow, NO shiny skin, NO airbrushed look, matte natural skin texture.
Shot on Canon EOS R5, 85mm f/1.4 lens. No text, no watermarks."""

# === 5개 씬 ===
SCENES = [
    {
        "name": "scene_01_casual_tshirt",
        "title": "Scene 1: 반팔",
        "prompt": f"""{FACE_LOCK}
Photo of this EXACT same person from the reference photo. {FRAMING}
White crew-neck short-sleeve t-shirt. Same long black wavy hair down past shoulders as reference.
Same natural makeup as reference. Gentle warm smile.
Solid black background. Soft natural studio lighting, matte skin.""",
    },
    {
        "name": "scene_02_school_uniform",
        "title": "Scene 2: 교복",
        "prompt": f"""{FACE_LOCK}
Photo of this EXACT same person from the reference photo. {FRAMING}
White dress shirt, navy V-neck knit vest with white trim, black necktie.
Same long black wavy hair down past shoulders as reference.
Same natural makeup as reference. Gentle smile.
Solid black background. Soft natural studio lighting, matte skin.""",
    },
    {
        "name": "scene_03_princess_idol",
        "title": "Scene 3: 공주님",
        "prompt": f"""{FACE_LOCK}
Photo of this EXACT same person from the reference photo. {FRAMING}
IVE style cute mini dress made of soft blue and cream tulle layers, thin strap, short flared skirt. No sparkle, no glitter, no sequins, no beads — clean matte fabric only.
Same long black wavy hair down past shoulders as reference.
Same natural makeup as reference. Calm gentle expression, soft closed-mouth smile, not too much.
Solid pure black background, no bokeh, no lights, no particles behind her. Completely clean black.
Soft natural lighting, matte skin.
Head top has small margin to edge, bottom crop at chest level — same framing as other scenes.""",
    },
    {
        "name": "scene_04_powerful_aespa",
        "title": "Scene 4: 에스파",
        "prompt": f"""{FACE_LOCK}
Photo of this EXACT same person from the reference photo. {FRAMING}
aespa Whiplash music video style outfit: black long-sleeve top with cutout details on shoulders and collarbone area, sleek black fabric with subtle mesh/sheer panel accents, thin silver chain necklace, small silver earrings.
Same long black wavy hair down past shoulders as reference. Do NOT change hairstyle.
Same natural makeup as reference, just slightly more defined eyes. Confident calm expression, slight smile.
Solid black background with very subtle cool blue-toned rim light on hair edges.
Soft natural lighting, matte skin.""",
    },
    {
        "name": "scene_05_stage_finale",
        "title": "Scene 5: 무대 (#E70051)",
        "prompt": """You are given 6 reference photos of 6 DIFFERENT K-pop idol group members, plus 1 concert stage reference photo (the last image).

Generate a GROUP PHOTO of these K-pop idol members on a massive concert stage.
The FIRST reference face is the CENTER member — she stands front and center, closest to camera, slightly larger than others.
She wears the same black cutout top with silver chain necklace from her previous scene (에스파 style).
The other 5 members also wear coordinated ALL BLACK outfits — each a different silhouette but all black.

1:1 square. Full body shot on stage.
Natural photography look, matte natural skin texture. No text, no watermarks.

COMPOSITION:
- Center member (first ref face): front and center, slightly forward, biggest in frame, wearing BLACK outfit
- 2 members flanking her closely on each side, slightly behind
- 1 member on each far end, further back
- V-formation or triangle grouping with center member as the point
- All smiling, playful celebratory poses — linking arms, hearts, leaning in
- The vibe: center member just had her solo moment, group joins her for the finale

OUTFIT: All BLACK coordinated but EACH member wears a DIFFERENT silhouette:
- Center member: black cutout top with silver chain necklace (same as scene 4)
- Member 2: black strapless mini dress, A-line
- Member 3: black one-shoulder asymmetric dress, fitted
- Member 4: black halter-neck jumpsuit, sleek
- Member 5: off-shoulder black fitted dress with slit
- Member 6: black blazer dress, structured shoulders, mini length
All coordinated black but clearly different designs like IVE award show styling.

STAGE: Use the LAST reference image for the concert atmosphere.
Real concert photography feel — NOT AI-looking. Like an actual press photo.
Dramatic white spotlights from above creating god-rays through haze.
Tens of thousands of tiny #E70051 pink-red lightsticks filling the entire audience like stars.
Stage fog/haze around their feet. Silver confetti. Epic arena scale.
Real concert photo, natural matte skin.""",
    },
]


CONCERT_REF = OUTPUT_DIR / "ref_iu_concert.jpg"

# 단체 사진용 멤버 레퍼런스
PROFILE_DIR = Path("/Users/leesoyeon/aidol/scripts/output/profiles/female/final")
GROUP_MEMBERS = [
    "female_50 2.png",   # CENTER member (에스파 의상, Scene 4와 동일 인물)
    "female_02 2.png",
    "female_43.png",
    "female_45.png",
    "female_56 2.png",
    "female_66 2.png",
]

def load_reference_images() -> list[Image.Image]:
    images = []
    for filename in REF_IMAGES:
        path = REF_DIR / filename
        if path.exists():
            images.append(Image.open(path))
            print(f"  Loaded ref: {filename}")
        else:
            print(f"  [WARNING] Not found: {path}")
    return images

def load_group_refs() -> list[Image.Image]:
    """단체 사진용 6명 멤버 레퍼런스를 로드합니다."""
    images = []
    for filename in GROUP_MEMBERS:
        # female_50은 REF_DIR에, 나머지는 PROFILE_DIR에
        path = PROFILE_DIR / filename
        if not path.exists():
            path = REF_DIR / filename
        if path.exists():
            images.append(Image.open(path))
            print(f"  Loaded member: {filename}")
        else:
            print(f"  [WARNING] Not found: {filename}")
    return images

def load_concert_ref() -> list[Image.Image]:
    """IU 콘서트 레퍼런스 이미지를 추가 로드합니다."""
    if CONCERT_REF.exists():
        print(f"  Loaded concert ref: {CONCERT_REF.name}")
        return [Image.open(CONCERT_REF)]
    return []


def generate_image(client, prompt, ref_images, retry_count=3):
    contents = [prompt] + ref_images
    for attempt in range(retry_count):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=contents,
                config=types.GenerateContentConfig(
                    response_modalities=["TEXT", "IMAGE"],
                    image_config=types.ImageConfig(aspect_ratio="1:1"),
                ),
            )
            for part in response.parts:
                if part.inline_data is not None:
                    return part.as_image()
                elif part.text is not None:
                    print(f"    model: {part.text[:100]}...")
            print(f"    [Warning] No image (attempt {attempt + 1}/{retry_count})")
        except Exception as e:
            print(f"    [Error] Attempt {attempt + 1}/{retry_count}: {e}")
            if attempt < retry_count - 1:
                wait_time = (attempt + 1) * 15
                print(f"    Waiting {wait_time}s...")
                time.sleep(wait_time)
    return None


def save_image(img, filepath):
    if not isinstance(img, Image.Image):
        pil_img = Image.open(io.BytesIO(img.image_bytes))
    else:
        pil_img = img
    pil_img.save(str(filepath))
    return pil_img


def main():
    parser = argparse.ArgumentParser(description="아이돌 변신 시퀀스 이미지 생성")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--scene", type=int, default=0, help="1-5, 0=전체")
    parser.add_argument("--delay", type=float, default=10.0)
    args = parser.parse_args()

    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key and not args.dry_run:
        print("[Error] GOOGLE_API_KEY 필요")
        sys.exit(1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Model: {MODEL} | Scenes: {len(SCENES)} | Output: {OUTPUT_DIR}")

    if not args.dry_run:
        ref_images = load_reference_images()
        if len(ref_images) < 2:
            print("[Error] 최소 2장의 레퍼런스 필요")
            sys.exit(1)
        client = genai.Client(api_key=api_key)
    else:
        ref_images = []
        client = None

    scenes = [SCENES[args.scene - 1]] if args.scene > 0 else SCENES
    log = {"generated_at": datetime.now().isoformat(), "model": MODEL, "results": []}
    success, fail = 0, 0

    for i, scene in enumerate(scenes):
        scene_num = SCENES.index(scene) + 1
        print(f"\n[{i+1}/{len(scenes)}] {scene['title']}")

        if args.dry_run:
            print(f"  -> {scene['name']}.png ({len(scene['prompt'])} chars)")
            continue

        # Scene 5는 단체 사진: 6명 멤버 + IU 콘서트 레퍼런스
        if scene_num == 5:
            group_refs = load_group_refs()
            concert_refs = load_concert_ref()
            all_refs = group_refs + concert_refs
        else:
            all_refs = ref_images
        image = generate_image(client, scene["prompt"], all_refs)
        if image:
            filepath = OUTPUT_DIR / f"{scene['name']}.png"
            save_image(image, filepath)
            print(f"    Saved: {filepath}")
            log["results"].append({"scene": scene_num, "name": scene["name"], "status": "success"})
            success += 1
        else:
            print(f"    [FAILED]")
            log["results"].append({"scene": scene_num, "name": scene["name"], "status": "failed"})
            fail += 1

        with open(LOG_FILE, "w") as f:
            json.dump(log, f, indent=2, ensure_ascii=False)

        if i < len(scenes) - 1:
            time.sleep(args.delay)

    print(f"\n완료! 성공: {success}, 실패: {fail}")


if __name__ == "__main__":
    main()
