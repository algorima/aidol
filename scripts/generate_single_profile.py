"""단일 프로필 사진 생성 (레퍼런스 기반)"""

import os
import sys
import io
from pathlib import Path

from google import genai
from google.genai import types
from PIL import Image

MODEL = "gemini-3-pro-image-preview"

def main():
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("[Error] GOOGLE_API_KEY 필요")
        sys.exit(1)

    ref_path = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    output_path = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("scripts/output/single_test.png")

    if not ref_path or not ref_path.exists():
        print(f"[Error] 레퍼런스 이미지 경로 필요: {ref_path}")
        sys.exit(1)

    ref_img = Image.open(ref_path)

    prompt = """Generate a front-facing portrait photo of this EXACT same person.

CRITICAL: The generated image must show the SAME person from the reference photo.
Preserve EVERY facial feature exactly:
- The same face shape, jawline, bone structure
- The same eyes (shape, size, depth, gaze quality)
- The same nose (bridge height, tip shape, width)
- The same lips (shape, fullness, color)
- The same small tear mole below the left eye — this is a KEY identifying feature, do NOT remove it
- The same jet black hair color and soft texture
- The same pale luminous skin tone
- The same melancholic, slightly sad and vulnerable aura

CHANGES FROM REFERENCE (only these):
- POSE: Turn to face the camera DIRECTLY — straight-on front-facing view, symmetrical
- EXPRESSION: Same gentle melancholic expression, sad beautiful eyes looking straight at camera
- HAIR: Same jet black hair, soft down bangs at eyebrow level, but neatly styled for a front-facing ID-style portrait
- OUTFIT: Clean white crew-neck t-shirt (simple, minimal)
- BACKGROUND: Solid light grayish-blue (cool muted pastel blue-gray)
- LIGHTING: Soft even studio lighting, flattering, no harsh shadows
- FRAMING: 1:1 square, upper body (chest up), face centered

QUALITY: Vogue Korea editorial, ultra-realistic, 8K resolution
ABSOLUTELY NO TEXT, no watermarks, no logos.
This must look like the same person's official K-pop idol profile photo, taken from the front."""

    client = genai.Client(api_key=api_key)

    print(f"레퍼런스: {ref_path}")
    print(f"출력: {output_path}")
    print("생성 중...")

    response = client.models.generate_content(
        model=MODEL,
        contents=[prompt, ref_img],
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
            image_config=types.ImageConfig(
                aspect_ratio="1:1",
            ),
        ),
    )

    for part in response.parts:
        if part.inline_data is not None:
            img = part.as_image()
            if not isinstance(img, Image.Image):
                img = Image.open(io.BytesIO(img.image_bytes))
            img.save(str(output_path))
            print(f"저장 완료: {output_path}")
            return
        elif part.text is not None:
            print(f"model: {part.text[:200]}")

    print("[FAILED] 이미지 생성 실패")


if __name__ == "__main__":
    main()
