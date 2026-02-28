"""여자 프로필 사진 20장 추가 생성 (female_17 ~ female_36)
자연스러운 K-pop 여자 아이돌 스타일 - 과도하게 다르지 않게, 자연스럽게 다양하게
"""
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from generate_profile_photos import (
    FEMALE_REFS, FEMALE_DIR, OUTPUT_DIR, LOG_FILE, MODEL, ASPECT_RATIO,
    load_ref_images, generate_image
)
from google import genai
from google.genai import types
import json, time
from datetime import datetime
from pathlib import Path

api_key = os.environ.get("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)

FEMALE_DIR.mkdir(parents=True, exist_ok=True)

log = {"generated_at": datetime.now().isoformat(), "model": MODEL, "results": []}
if LOG_FILE.exists():
    with open(LOG_FILE) as f:
        log = json.load(f)

# 20명의 여자 아이돌 프로필 - 자연스러운 K-pop 아이돌 스타일
# 실제 여자 아이돌들처럼 자연스럽게 예쁜 얼굴, 과도한 차별화 없이
EXTRA_FEMALE_PROFILES = [
    # F17 - 자연스러운 청순 비주얼, 긴 흑발
    ("""Korean female idol trainee, age 20,
soft oval face with gentle V-line jaw, clear bright skin with natural glow,
medium-large almond eyes with clean double eyelid, naturally groomed arched eyebrows,
straight delicate nose with small tip, medium lips with soft pink natural color,
long straight black hair with center part, silky smooth falling past shoulders,
gentle warm expression, soft natural smile, kind eyes looking at camera,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # F18 - 밝은 분위기, 웨이브 갈색머리
    ("""Korean female idol trainee, age 19,
round soft face with gentle jawline, warm healthy complexion, slight flush on cheeks,
bright double-lidded eyes with cheerful sparkle, soft rounded natural eyebrows,
small nose with slightly rounded tip, medium lips with natural coral tone,
dark brown hair with soft loose waves, side-parted flowing past shoulders,
bright cheerful expression, warm genuine smile, friendly approachable energy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # F19 - 세련된 시크 비주얼, 어깨 기장 단발
    ("""Korean female idol trainee, age 22,
balanced oval face with clean jawline, fair porcelain skin,
medium almond eyes with natural double lid and calm gaze, straight defined eyebrows,
straight nose with refined bridge, medium-thin lips with muted rose tone,
dark brown shoulder-length straight bob with slight inward curl at ends, side-parted,
composed elegant expression, slight confident smile, sophisticated calm demeanor,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),

    # F20 - 큰 눈 귀여운 비주얼
    ("""Korean female idol trainee, age 18,
small compact face with soft round jawline, youthful baby-like proportions,
large round eyes with full double eyelid and visible aegyo-sal, soft arched eyebrows,
small delicate nose with low bridge, small plump lips with cherry pink color,
black hair with see-through bangs and long straight length, soft natural texture,
cute innocent expression, slightly wide eyes, gentle closed-mouth smile,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "check_vest"),

    # F21 - 성숙한 언니 비주얼, 웨이브 롱헤어
    ("""Korean female idol trainee, age 23,
elegant oval face with softly defined jaw, mature graceful proportions,
medium eyes with clean double lid and composed warm gaze, gently arched brows,
tall straight nose with refined tip, medium-full lips with natural warm pink,
dark brown long hair with elegant loose waves, parted slightly off-center,
mature graceful expression, warm confident smile, serene elegance,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # F22 - 상큼한 과즙상 비주얼
    ("""Korean female idol trainee, age 19,
soft round face with gentle contours, fresh dewy skin with natural flush,
bright medium-large eyes with double lid crinkled in smile, soft natural brows,
small rounded nose with soft tip, medium lips with bright natural pink,
dark brown hair with gentle body wave, long length with side-swept bangs,
fresh vibrant expression, bright eye-smile showing slight teeth, juicy youthful charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_cardigan"),

    # F23 - 고급스러운 비주얼, 직모 갈색
    ("""Korean female idol trainee, age 21,
balanced face with soft V-line jaw, luminous clear skin,
medium almond eyes with refined double lid, naturally elegant arched brows,
straight nose with delicate bridge, medium lips with nude pink tone,
chestnut brown long straight hair, center-parted with healthy shine,
elegant poised expression, subtle graceful smile, refined beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "shirt_tie"),

    # F24 - 발랄한 에너지, 묶은 머리
    ("""Korean female idol trainee, age 18,
compact oval face with youthful soft features, bright complexion,
medium bright eyes with natural double lid, slightly upturned corners, light natural brows,
small nose with cute rounded tip, medium lips with natural rosy color,
dark brown hair in neat low ponytail with face-framing pieces, natural texture,
lively energetic expression, big natural smile showing teeth, cheerful bright energy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),

    # F25 - 차분한 감성 비주얼
    ("""Korean female idol trainee, age 20,
soft oval face with delicate jawline, fair skin with gentle tone,
medium eyes with natural double lid and thoughtful gentle gaze, soft straight brows,
small straight nose with delicate proportions, medium lips with soft pink,
black long hair with natural slight wave, tucked behind one ear, flowing freely,
calm thoughtful expression, gentle closed-mouth smile, serene quiet beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # F26 - 화사한 꽃 비주얼
    ("""Korean female idol trainee, age 20,
balanced heart-shaped face with soft chin, bright radiant complexion,
large bright eyes with clear double eyelid, softly arched natural brows,
small delicate nose with slightly upturned tip, medium plump lips with rosy pink,
dark brown hair with warm tone, long gentle waves, side-parted with natural volume,
radiant blooming expression, warm beautiful smile, glowing healthy beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # F27 - 시크한 언니 비주얼, 단정한 스타일
    ("""Korean female idol trainee, age 22,
slightly angular face with clean defined jaw, smooth fair skin,
medium narrow eyes with subtle double lid and cool confident gaze, straight neat brows,
straight defined nose with medium bridge, medium-thin lips with natural mauve tone,
jet black hair in sleek straight style, shoulder-blade length, neat side part,
cool confident expression, composed no-smile neutral face, chic elegance,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # F28 - 부드러운 분위기, 앞머리 있는 스타일
    ("""Korean female idol trainee, age 19,
soft round-oval face with gentle features, warm peachy skin tone,
medium-large eyes with rounded double lid and warm expression, soft curved brows,
small nose with soft contours, medium full lips with warm pink natural color,
dark brown hair with curtain bangs softly framing face, long with gentle body,
soft warm expression, sweet gentle smile, lovely approachable charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "check_vest"),

    # F29 - 청량한 여신 비주얼
    ("""Korean female idol trainee, age 21,
balanced oval face with smooth elegant jaw, bright luminous skin,
medium-large eyes with clean double eyelid and clear bright gaze, naturally arched brows,
delicate straight nose with refined tip, medium lips with fresh pink tone,
light brown hair with subtle highlights, long flowing waves, center-parted,
fresh clean expression, bright serene smile, refreshing pure beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),

    # F30 - 사랑스러운 애교 비주얼
    ("""Korean female idol trainee, age 18,
small cute face with round soft jawline, bright youthful skin,
large round eyes with prominent double lid and aegyo-sal, rounded soft brows,
small button nose with cute low bridge, small plump lips with pink cherry color,
dark brown hair with soft natural wave, long with wispy see-through bangs,
adorable lovable expression, cute smile with eyes crinkled, sweet youthful charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_cardigan"),

    # F31 - 단아한 클래식 비주얼
    ("""Korean female idol trainee, age 21,
elegant oval face with balanced proportions, smooth clear skin,
medium almond eyes with neat double lid, naturally groomed straight brows,
straight nose with refined proportions, medium lips with subtle nude pink,
black long straight hair with classic center part, neat and polished appearance,
refined dignified expression, subtle warm smile, classic timeless beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "shirt_tie"),

    # F32 - 건강한 밝은 미소
    ("""Korean female idol trainee, age 20,
medium oval face with soft healthy features, warm glowing complexion,
medium bright eyes with natural double lid crinkled happily, natural arched brows,
average nose with gentle proportions, medium lips with warm natural coral,
dark brown hair with natural body and volume, long with gentle movement, off-center part,
healthy bright expression, warm open smile showing teeth, radiant positive energy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),

    # F33 - 깔끔한 센터 비주얼
    ("""Korean female idol trainee, age 20,
balanced face with soft V-line jaw, bright clear porcelain skin,
medium-large eyes with clean double eyelid and focused gaze, gently arched brows,
small straight nose with delicate tip, medium lips with natural rose pink,
dark brown straight hair with subtle layering, long and sleek, slight side part,
confident center-visual expression, composed gentle smile, standout beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # F34 - 따뜻한 누나 비주얼
    ("""Korean female idol trainee, age 23,
soft oval face with gentle mature features, warm healthy skin tone,
medium eyes with natural double lid and warm caring gaze, soft natural brows,
straight nose with medium bridge, medium-full lips with warm natural pink,
dark brown hair with soft loose curls, long length flowing past shoulders, natural part,
warm caring expression, gentle motherly smile, comfortable approachable warmth,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # F35 - 몽환적인 감성 비주얼
    ("""Korean female idol trainee, age 20,
delicate oval face with narrow soft jaw, pale fair luminous skin,
medium-large dreamy eyes with soft double lid and slightly distant gaze, thin arched brows,
small delicate nose with refined tip, medium lips with soft pink dewy finish,
dark brown hair with natural air-dried waves, long and flowing, center-parted loosely,
dreamy ethereal expression, soft distant look, lips slightly parted, delicate beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # F36 - 당당한 리더 비주얼
    ("""Korean female idol trainee, age 22,
balanced face with clean jaw, clear confident complexion,
medium almond eyes with neat double lid and strong direct gaze, defined natural brows,
straight nose with clean lines, medium lips with natural tone and composed expression,
jet black long straight hair, neat side part with one side tucked behind ear,
confident strong expression, composed slight smile, leader-like reliable charisma,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),
]

tasks = [(i, prompt, outfit) for i, (prompt, outfit) in enumerate(EXTRA_FEMALE_PROFILES)]
total = len(tasks)
print(f"Total: {total} female profiles (F17 ~ F36)")
print()

success = 0
fail = 0

for task_idx, (idx, prompt, outfit) in enumerate(tasks):
    file_num = idx + 17  # female_17 ~ female_36
    fname = f"female_{file_num:02d}.png"
    print(f"[{task_idx+1}/{total}] 여자 #{file_num} ({outfit})...")

    refs = load_ref_images(FEMALE_REFS, outfit, count=3)
    image = generate_image(client, prompt, refs)

    if image:
        image.save(str(FEMALE_DIR / fname))
        print(f"    Saved: {fname}")
        log["results"].append({
            "gender": "female", "index": file_num, "filename": fname,
            "outfit_style": outfit, "status": "success",
            "timestamp": datetime.now().isoformat()
        })
        success += 1
    else:
        print(f"    [FAILED] {fname}")
        log["results"].append({
            "gender": "female", "index": file_num, "filename": fname,
            "outfit_style": outfit, "status": "failed",
            "timestamp": datetime.now().isoformat()
        })
        fail += 1

    with open(LOG_FILE, "w") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    if task_idx < total - 1:
        time.sleep(5)

print(f"\n완료! 성공: {success}, 실패: {fail}")
