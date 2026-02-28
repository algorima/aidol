"""남자 프로필 사진 20장 추가 생성 (male_21 ~ male_40)
자연스러운 K-pop 남자 아이돌 스타일
"""
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from generate_profile_photos import (
    MALE_REFS, MALE_DIR, OUTPUT_DIR, LOG_FILE, MODEL, ASPECT_RATIO,
    load_ref_images, generate_image
)
from google import genai
from google.genai import types
import json, time
from datetime import datetime
from pathlib import Path

api_key = os.environ.get("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)

MALE_DIR.mkdir(parents=True, exist_ok=True)

log = {"generated_at": datetime.now().isoformat(), "model": MODEL, "results": []}
if LOG_FILE.exists():
    with open(LOG_FILE) as f:
        log = json.load(f)

# 20명의 남자 아이돌 프로필 - 자연스러운 K-pop 아이돌 스타일
EXTRA_MALE_PROFILES = [
    # M21 - 부드러운 센터 비주얼
    ("""Korean male idol trainee, age 20,
soft oval face with gentle V-line jaw, clear bright skin,
medium-large double-lidded eyes with warm gentle gaze, naturally arched eyebrows,
straight refined nose with balanced proportions, medium lips with soft natural pink,
dark brown hair with natural comma bangs softly parted, medium length with volume,
warm gentle expression, soft natural smile, friendly center-visual charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # M22 - 시크한 도시 비주얼
    ("""Korean male idol trainee, age 22,
balanced oval face with clean defined jawline, smooth fair skin,
medium almond eyes with subtle double lid and cool calm gaze, straight neat eyebrows,
tall straight nose with refined bridge, medium-thin lips with natural tone,
jet black straight hair, side-parted and neatly styled, medium length on top,
composed confident expression, slight cool smile, sophisticated urban charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "charcoal_blazer"),

    # M23 - 밝은 햇살 비주얼
    ("""Korean male idol trainee, age 19,
soft round-oval face with gentle features, warm healthy complexion,
bright medium eyes with double lid crinkled in smile, soft natural rounded brows,
small nose with rounded tip, medium lips with warm natural color in wide smile,
dark brown hair with soft textured layers, side-swept bangs with natural volume,
bright sunny expression, warm wide smile showing teeth, cheerful positive energy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # M24 - 차분한 감성 비주얼
    ("""Korean male idol trainee, age 21,
soft oval face with delicate jawline, fair clear skin,
medium eyes with natural double lid and thoughtful quiet gaze, gentle arched brows,
straight nose with delicate bridge, medium lips with soft pink tone,
black hair with natural center part, medium length falling softly around face,
calm thoughtful expression, gentle closed-mouth smile, quiet intellectual charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_cardigan"),

    # M25 - 건강한 스마일 비주얼
    ("""Korean male idol trainee, age 20,
medium oval face with soft healthy jawline, warm glowing complexion,
medium bright double-lidded eyes with friendly sparkle, natural straight brows,
average nose with clean proportions, medium lips with warm natural tone,
dark brown hair with clean textured styling, short-medium length, neat side part,
healthy bright expression, confident natural smile, reliable warm energy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "shirt_tie"),

    # M26 - 귀여운 동생 비주얼
    ("""Korean male idol trainee, age 18,
small round face with soft jawline, youthful baby-like proportions,
large bright round eyes with full double eyelid and aegyo-sal, soft rounded brows,
small nose with cute rounded tip, small lips with natural cherry pink,
dark brown fluffy hair with soft bangs covering forehead, voluminous natural texture,
cute youthful expression, innocent bright smile, adorable puppy-like charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "check_vest"),

    # M27 - 성숙한 멋진 형 비주얼
    ("""Korean male idol trainee, age 23,
balanced face with clean mature jawline, clear healthy skin,
medium almond eyes with double lid and steady confident gaze, neat natural brows,
straight nose with defined bridge, medium lips with natural composed expression,
black hair neatly styled with volume, parted to one side, clean professional look,
mature composed expression, confident slight smile, dependable leader presence,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # M28 - 청순한 꽃미남 비주얼
    ("""Korean male idol trainee, age 19,
delicate oval face with narrow soft jaw, pale fair luminous skin,
large eyes with clear double lid and gentle expression, thin naturally arched brows,
small straight nose with delicate proportions, medium lips with soft pink,
dark brown hair with long curtain bangs framing face, silky straight texture,
pure delicate expression, gentle shy smile, ethereal flower-boy beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_vest"),

    # M29 - 당당한 무대 비주얼
    ("""Korean male idol trainee, age 21,
balanced face with soft defined jaw, bright clear complexion,
medium double-lidded eyes with strong direct gaze, defined natural straight brows,
straight nose with clean lines, medium lips with natural confident expression,
jet black hair swept up with texture showing forehead, styled with natural volume,
confident stage-ready expression, composed cool slight smile, standout visual charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),

    # M30 - 따뜻한 인상 비주얼
    ("""Korean male idol trainee, age 20,
soft oval face with gentle rounded jaw, warm peachy skin tone,
medium warm eyes with double lid and kind expression, soft curved natural brows,
average nose with soft proportions, medium-full lips with warm natural color,
dark brown hair with soft natural wave, medium length with gentle movement,
warm kind expression, sweet genuine smile, comfortable approachable warmth,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),

    # M31 - 세련된 왕자 비주얼
    ("""Korean male idol trainee, age 21,
elegantly proportioned oval face with balanced jaw, luminous clear skin,
well-spaced almond eyes with clean double lid, gently arched refined brows,
straight refined nose with elegant bridge, small well-defined lips with natural pink,
black silky straight hair, center-parted curtain bangs, medium length with sleek texture,
graceful princely expression, subtle warm smile, elegant classic beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "charcoal_blazer"),

    # M32 - 장난기 있는 밝은 비주얼
    ("""Korean male idol trainee, age 18,
compact round face with soft features, bright healthy complexion, visible dimples,
medium bright eyes with natural double lid and playful sparkle, soft natural brows,
small nose with slightly rounded tip, medium lips with natural upward curve,
warm brown hair with layered texture and slight wave, side-swept with volume,
playful bright expression, mischievous grin with dimples showing, fun energetic vibe,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # M33 - 깔끔한 모범생 비주얼
    ("""Korean male idol trainee, age 20,
balanced oval face with clean jawline, neat clear skin,
medium eyes with neat double lid and focused direct gaze, straight well-groomed brows,
straight nose with clean bridge, medium lips with natural neat appearance,
black hair in neat short-medium cut, cleanly parted to side, tidy and polished,
neat composed expression, polite slight smile, clean-cut reliable image,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # M34 - 몽환적 감성 비주얼
    ("""Korean male idol trainee, age 20,
soft heart-shaped face with round forehead and small chin, pale fair skin,
large eyes with rounded double lid and slightly dreamy distant gaze, thin arched brows,
small delicate nose with soft tip, medium lips with dewy soft pink,
rose-brown tinted hair with natural soft waves, medium-long face-framing layers,
dreamy wistful expression, lips gently parted, ethereal romantic atmosphere,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_cardigan"),

    # M35 - 쿨한 카리스마 비주얼
    ("""Korean male idol trainee, age 22,
slightly angular face with defined jaw, smooth clear skin,
medium eyes with double lid and cool sharp gaze, straight defined brows,
tall straight nose with refined tip, medium lips with neutral composed tone,
black hair pushed back with texture, medium length styled with natural hold,
cool charismatic expression, no smile, confident direct stare, magnetic presence,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # M36 - 상큼한 비타민 비주얼
    ("""Korean male idol trainee, age 19,
round soft face with gentle features, fresh dewy skin with natural flush,
bright medium-large eyes with double lid crinkled happily, soft natural brows,
small rounded nose, medium lips with bright natural coral in wide smile,
dark brown hair with fluffy natural body, side-swept bangs, soft layered texture,
fresh vibrant expression, big bright eye-smile, overflowing positive energy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "check_vest"),

    # M37 - 단아한 클래식 비주얼
    ("""Korean male idol trainee, age 21,
balanced oval face with harmonious proportions, clear smooth skin,
medium almond eyes with clean double lid and composed gaze, naturally neat brows,
straight nose with balanced bridge, medium lips with subtle natural pink,
black straight hair with classic side part, neatly groomed medium length,
refined dignified expression, subtle confident smile, classic handsome charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "shirt_tie"),

    # M38 - 소년미 넘치는 비주얼
    ("""Korean male idol trainee, age 17,
small compact face with soft rounded jaw, youthful bright complexion,
large bright eyes with full double eyelid, wide curious expression, soft rounded brows,
small nose with cute proportions, small lips with natural pink,
dark brown hair with soft fluffy bangs, short-medium cut with natural volume,
innocent boyish expression, wide-eyed curious look, pure youthful energy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_vest"),

    # M39 - 여유있는 형 비주얼
    ("""Korean male idol trainee, age 23,
medium face with soft mature jaw, warm healthy complexion,
medium eyes with natural double lid and relaxed warm gaze, natural unfurrowed brows,
average nose with gentle proportions, medium lips with easy natural expression,
dark brown hair in relaxed medium style, slightly messy with natural texture,
relaxed easygoing expression, comfortable warm smile, laid-back cool hyung vibe,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),

    # M40 - 화려한 센터 비주얼
    ("""Korean male idol trainee, age 20,
balanced face with soft V-line jaw, bright luminous clear skin,
medium-large double-lidded eyes with confident bright gaze, gently arched defined brows,
straight refined nose with clean lines, medium well-shaped lips with natural rose pink,
jet black hair styled with volume, slightly swept to side showing forehead,
confident star-quality expression, composed bright smile, center-worthy visual impact,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),
]

tasks = [(i, prompt, outfit) for i, (prompt, outfit) in enumerate(EXTRA_MALE_PROFILES)]
total = len(tasks)
print(f"Total: {total} male profiles (M21 ~ M40)")
print()

success = 0
fail = 0

for task_idx, (idx, prompt, outfit) in enumerate(tasks):
    file_num = idx + 21  # male_21 ~ male_40
    fname = f"male_{file_num:02d}.png"
    print(f"[{task_idx+1}/{total}] 남자 #{file_num} ({outfit})...")

    refs = load_ref_images(MALE_REFS, outfit, count=3)
    image = generate_image(client, prompt, refs)

    if image:
        image.save(str(MALE_DIR / fname))
        print(f"    Saved: {fname}")
        log["results"].append({
            "gender": "male", "index": file_num, "filename": fname,
            "outfit_style": outfit, "status": "success",
            "timestamp": datetime.now().isoformat()
        })
        success += 1
    else:
        print(f"    [FAILED] {fname}")
        log["results"].append({
            "gender": "male", "index": file_num, "filename": fname,
            "outfit_style": outfit, "status": "failed",
            "timestamp": datetime.now().isoformat()
        })
        fail += 1

    with open(LOG_FILE, "w") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    if task_idx < total - 1:
        time.sleep(5)

print(f"\n완료! 성공: {success}, 실패: {fail}")
