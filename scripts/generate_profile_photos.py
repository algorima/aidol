"""
AIdol 프로필 사진 생성 스크립트 v2
====================================
기존 final_output 이미지를 레퍼런스로 활용하여
동일한 K-pop 오디션 프로그램 스타일의 새로운 프로필 사진을 생성합니다.

생성 대상:
- 남자 프로필 사진: 20장 (모두 다른 얼굴)
- 여자 프로필 사진: 16장 (모두 다른 얼굴)

사용법:
    export GOOGLE_API_KEY="AIzaSy..."
    pip install google-genai Pillow
    python generate_profile_photos.py --count 2   # 테스트
    python generate_profile_photos.py              # 전체 생성
"""

import os
import sys
import time
import json
import random
import argparse
from pathlib import Path
from datetime import datetime

from google import genai
from google.genai import types
from PIL import Image


# 1. 설정
REF_DIR = Path("/Users/leesoyeon/Downloads/final_output")
OUTPUT_DIR = Path(__file__).parent / "output" / "profiles"
MALE_DIR = OUTPUT_DIR / "male"
FEMALE_DIR = OUTPUT_DIR / "female"
LOG_FILE = OUTPUT_DIR / "generation_log.json"

MODEL = "gemini-3-pro-image-preview"
ASPECT_RATIO = "1:1"  # 기존 이미지와 동일한 정사각형

# 2. 레퍼런스 이미지 풀 (스타일/의상별 분류)
# 각 생성 시 2-3장을 레퍼런스로 전달하여 동일한 촬영 스타일 유지

MALE_REFS = {
    "white_shirt": [
        "승호_01_summer_white_shirt.png",
        "세이_01_summer_white_shirt.png",
        "원우_01_summer_white_shirt.png",
        "카이_01_summer_white_shirt.png",
    ],
    "shirt_tie": [
        "시우_02_summer_shirt_black_tie.png",
        "비오_02_summer_shirt_black_tie.png",
        "영민_02_summer_shirt_black_tie.png",
        "민호_02_summer_shirt_black_tie.png",
    ],
    "black_vest": [
        "보겸_03_summer_black_vest.png",
        "서준_03_summer_black_vest.png",
        "용준_03_summer_black_vest.png",
        "태준_03_summer_black_vest.png",
    ],
    "gray_vest": [
        "시로_04_summer_gray_vest.png",
        "찬영_04_summer_gray_vest.png",
        "한솔_04_summer_gray_vest.png",
        "종현_04_summer_gray_vest.png",
    ],
    "charcoal_blazer": [
        "나루_05_spring_charcoal_blazer.png",
        "민준_05_spring_charcoal_blazer.png",
        "예성_05_spring_charcoal_blazer.png",
        "윤호_05_spring_charcoal_blazer.png",
    ],
    "gray_blazer": [
        "경호_06_spring_gray_blazer.png",
        "준혁_06_spring_gray_blazer.png",
        "현민_06_spring_gray_blazer.png",
        "원호_06_spring_gray_blazer.png",
    ],
    "black_blazer": [
        "도윤_07_spring_black_blazer.png",
        "태웅_07_spring_black_blazer.png",
        "하준_07_spring_black_blazer.png",
        "재훈_07_spring_black_blazer.png",
    ],
    "gray_cardigan": [
        "승관_08_spring_gray_cardigan.png",
        "세훈_08_spring_gray_cardigan.png",
        "우빈_08_spring_gray_cardigan.png",
        "연우_08_spring_gray_cardigan.png",
    ],
    "check_vest": [
        "건우_09_spring_check_vest.png",
        "건호_09_spring_check_vest.png",
        "승민_09_spring_check_vest.png",
        "성훈_09_spring_check_vest.png",
    ],
    "blazer_vest": [
        "한이_10_spring_blazer_vest_layered.png",
        "명호_10_spring_blazer_vest_layered.png",
        "우진_10_spring_blazer_vest_layered.png",
        "영훈_10_spring_blazer_vest_layered.png",
    ],
}

FEMALE_REFS = {
    "white_shirt": [
        "유리_01_summer_white_shirt.png",
        "벨라_01_summer_white_shirt.png",
        "아영_01_summer_white_shirt.png",
        "아이_01_summer_white_shirt.png",
    ],
    "shirt_tie": [
        "미연_02_summer_shirt_black_tie.png",
        "밀라_02_summer_shirt_black_tie.png",
        "민아_02_summer_shirt_black_tie.png",
    ],
    "black_vest": [
        "여름_03_summer_black_vest.png",
        "다현_03_summer_black_vest.png",
        "초아_03_summer_black_vest.png",
        "로이_03_summer_black_vest.png",
    ],
    "gray_blazer": [
        "소미_06_spring_gray_blazer.png",
        "혜인_06_spring_gray_blazer.png",
        "윤지_06_spring_gray_blazer.png",
        "수영_06_spring_gray_blazer.png",
    ],
    "black_blazer": [
        "혜리_07_spring_black_blazer.png",
        "윤아_07_spring_black_blazer.png",
        "시은_07_spring_black_blazer.png",
        "나은_07_spring_black_blazer.png",
    ],
    "gray_cardigan": [
        "휘인_08_spring_gray_cardigan.png",
        "하니_08_spring_gray_cardigan.png",
        "은별_08_spring_gray_cardigan.png",
        "연정_08_spring_gray_cardigan.png",
    ],
    "check_vest": [
        "진아_09_spring_check_vest.png",
        "이서_09_spring_check_vest.png",
        "보영_09_spring_check_vest.png",
        "나연_09_spring_check_vest.png",
    ],
    "blazer_vest": [
        "예지_10_spring_blazer_vest_layered.png",
        "니나_10_spring_blazer_vest_layered.png",
        "리아_10_spring_blazer_vest_layered.png",
        "소희_10_spring_blazer_vest_layered.png",
    ],
}


# 3. 상세 프로필 정의 (기존 이미지 얼굴 분석 기반)
# 각 프로필: (prompt, outfit_style)

MALE_PROFILES = [
    # M01 - 승호 스타일 참고: 부드러운 이목구비, 큰 눈
    ("""Korean male idol trainee, age 19,
soft oval face with narrow chin, small delicate bone structure, naturally arched thin eyebrows,
large double-lidded eyes with gentle downward tilt and visible aegyo-sal, straight low nose bridge with small rounded tip,
medium lips with soft pink tone, smooth fair skin,
dark brown hair with natural wave and volume, center-parted comma bangs softly framing forehead,
calm gentle expression with soft closed-mouth smile, looking straight at camera,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # M02 - 세이 스타일 참고: 각진 턱, 날카로운 눈매
    ("""Korean male idol trainee, age 21,
elongated face with defined angular jawline, prominent chin, straight thick eyebrows set low,
narrow monolid eyes with sharp inner corners and slight upward tilt, high straight nose bridge with pointed tip,
thin natural lips with defined cupid's bow, clean matte skin,
jet black straight hair, center-parted with volume at crown, neatly tucked behind ears,
serious composed expression, no smile, neutral gaze directly at camera,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # M03 - 도윤 스타일 참고: 강렬한 이목구비, 풍성한 입술
    ("""Korean male idol trainee, age 22,
sharp diamond face shape, very defined jawline with angular edges, high prominent cheekbones,
slightly hooded double-lidded eyes with intense direct gaze, thick well-groomed eyebrows,
tall straight nose with refined bridge, full plush lips with pronounced lower lip,
jet black hair swept back with slight texture, forehead fully exposed,
intense charismatic expression, lips slightly parted, strong eye contact,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),

    # M04 - 경호 스타일 참고: 둥근 베이비페이스, 밝은 미소
    ("""Korean male idol trainee, age 18,
round compact face with soft jawline, full cheeks, short chin,
large bright double-lidded eyes with cheerful crescent shape when smiling, rounded natural eyebrows,
small nose with soft rounded tip and low bridge, medium lips with natural rosy color,
dark brown fluffy textured hair with volume, side-swept bangs partially covering forehead,
bright happy expression with wide open smile showing teeth, eye corners crinkled,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # M05 - 한이 스타일 참고: 긴 얼굴, 중성적 차가운 비주얼
    ("""Korean male idol trainee, age 23,
long rectangular face, clean strong jawline tapering to moderate chin, high forehead,
deep-set eyes with subtle double lid and intense distant gaze, straight defined eyebrows,
prominent straight nose with refined tip, medium lips with neutral tone pressed together,
black hair center-parted and falling to frame face, silky straight texture,
cold mysterious expression, no smile, aloof neutral stare,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # M06 - 마루 스타일 참고: 정통 비주얼, 깔끔한 사이드 파트
    ("""Korean male idol trainee, age 22,
balanced oval face with clean jawline, harmonious proportions,
well-defined double-lidded eyes with clear crease and balanced spacing, naturally arched brows,
straight medium nose with refined bridge, medium lips with defined shape,
black hair with sleek side-part swept to one side, healthy sheen,
confident composed expression, slight dignified smile, direct eye contact,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "charcoal_blazer"),

    # M07 - 보겸 스타일 참고: 중간 얼굴, 부드러운 분위기
    ("""Korean male idol trainee, age 20,
medium oval face with softly rounded jaw, balanced mid-face proportions,
medium almond-shaped eyes with natural double lid, gentle expression, relaxed brows,
average nose with slightly rounded bridge and soft tip, full natural lips,
black wavy hair with soft texture, bangs falling loosely over forehead,
soft neutral expression, closed mouth with slight gentle upturn, calm demeanor,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),

    # M08 - 시로 스타일 참고: 슬림한 얼굴, 큰 둥근 눈, 곱슬머리
    ("""Korean male idol trainee, age 19,
narrow slim face with small delicate jawline, long vertical proportions, thin neck,
large round eyes with wide double lids creating innocent look, thin arched eyebrows set high,
small narrow nose with delicate bridge, thin lips with soft pink color,
black curly hair with tight natural waves covering forehead, voluminous and fluffy texture,
pure innocent expression, slightly wide-eyed, lips gently parted, youthful vulnerability,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_vest"),

    # M09 - 비오 스타일 참고: 부드러운 둥근 얼굴, 도톰한 입술
    ("""Korean male idol trainee, age 20,
soft round face with gentle curves, broad forehead, minimal jaw definition,
medium round eyes with warm expression and subtle double lid, relaxed natural brows,
average nose with slightly wide base, distinctly full plush lips both upper and lower,
dark brown very curly fluffy hair, messy natural volume covering most of forehead,
gentle warm expression, soft calm gaze, lips naturally full and slightly parted,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "shirt_tie"),

    # M10 - 성숙한 시크 비주얼 (태웅 참고하되 부드럽게)
    ("""Korean male idol trainee, age 22,
slightly angular face with clean defined jawline, balanced cheekbones,
double-lidded eyes with calm confident gaze, well-groomed natural eyebrows with gentle arch,
tall straight nose with refined bridge, medium-full lips with natural color,
jet black hair with volume styled upward with soft texture, natural parting showing forehead,
mature confident expression, slight knowing smile, composed and cool,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),

    # M11 - 새로운 타입: 여리여리한 꽃미남
    ("""Korean male idol trainee, age 18,
very small heart-shaped face, narrow pointed chin, wide forehead,
large upturned cat-like eyes with pronounced double lids, thin high-arched eyebrows,
small straight nose with delicate nostrils, thin small lips with defined edges,
dark brown straight hair with long curtain bangs nearly covering eyes, silky texture,
shy ethereal expression, looking slightly down, dreamy unfocused gaze,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_cardigan"),

    # M12 - 든든한 맏형 리더 비주얼
    ("""Korean male idol trainee, age 23,
balanced broad face with gentle jaw, mature but soft proportions,
calm double-lidded eyes with steady warm gaze, neat natural eyebrows,
straight nose with medium bridge, medium lips with composed neutral expression,
black hair neatly parted to one side with clean styling, medium length on top,
reliable warm leader expression, gentle closed-mouth smile, reassuring eye contact,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # M13 - 새로운 타입: 밝은 장난기
    ("""Korean male idol trainee, age 17,
compact round face with soft features, visible dimples on both cheeks,
medium bright eyes with natural crease, slightly upturned outer corners,
small button nose with low bridge, medium lips with natural curve upward,
warm brown hair with soft layered perm and light highlights, side-swept with volume,
playful mischievous expression, asymmetric grin with visible dimples, sparkly eyes,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "check_vest"),

    # M14 - 새로운 타입: 날카로운 여우상
    ("""Korean male idol trainee, age 21,
narrow elongated face with very sharp V-line jaw, high hairline,
fox-like eyes with extreme upward tilt at outer corners, subtle single lid, thin sharp eyebrows,
very high narrow nose bridge with pointed tip, thin compressed lips,
silver-tinted dark hair in wolf-cut layers, long face-framing pieces, tousled effortless texture,
mysterious smirk, one corner of mouth raised, languid gaze,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "charcoal_blazer"),

    # M15 - 건강한 스포티 비주얼
    ("""Korean male idol trainee, age 21,
slightly broad face with soft rounded jaw, healthy warm complexion,
medium double-lidded eyes with friendly direct gaze, natural straight eyebrows,
straight nose with medium bridge, medium lips with natural warm tone,
dark brown short-medium hair with clean textured crop, neat forehead showing,
bright healthy expression, confident natural smile, sporty cheerful energy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "shirt_tie"),

    # M16 - 새로운 타입: 클래식 왕자님
    ("""Korean male idol trainee, age 20,
perfectly proportioned oval face with elegant jawline, balanced thirds,
well-spaced almond eyes with clean double lid, gently curved natural eyebrows,
straight refined nose with medium bridge, small well-defined lips with natural pink,
black hair with elegant curtain bangs softly parted at center, medium length silky straight,
princely graceful expression, subtle warm smile, gentle eye contact,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # M17 - 새로운 타입: 몽환적 감성형
    ("""Korean male idol trainee, age 20,
soft heart-shaped face with round forehead curving to small chin,
large round puppy-like eyes with prominent double lids and noticeable aegyo-sal,
low small nose with soft round tip, medium plush lips with dewy appearance,
rose-brown tinted hair, medium length with soft natural waves, face-framing layers,
dreamy wistful expression, lips gently parted, dewy skin, looking slightly upward,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_cardigan"),

    # M18 - 새로운 타입: 무심한 쿨가이
    ("""Korean male idol trainee, age 22,
oblong face with moderate features, clean straight jawline, flat cheekbones,
slightly downturned eyes with relaxed double lid, straight unfurrowed brows,
medium nose with flat bridge, thin natural lips with neutral expression,
black hair, messy textured medium length pushed to one side, effortless bedhead,
nonchalant unbothered expression, half-closed lazy eyes, lips flat,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),

    # M19 - 새로운 타입: 이국적 혼혈 느낌
    ("""Korean male idol trainee, age 21,
inverted triangle face with wide high cheekbones and narrow chin,
deep-set double-lidded eyes with visible crease depth, defined brow bone casting shadow,
tall prominent nose with defined bridge, medium lips with pronounced shape,
dark brown hair with natural texture and slight wave, longer on top with tapered sides,
confident charismatic expression, slight knowing smile, strong eye contact,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "check_vest"),

    # M20 - 새로운 타입: 애교 만점 막내
    ("""Korean male idol trainee, age 17,
very small baby face, extremely round proportions, puffy soft cheeks,
very large sparkly round eyes with wide double lids and prominent aegyo-sal,
tiny button nose, small heart-shaped lips with natural cherry tone,
light brown fluffy hair with rounded soft bangs covering forehead completely,
adorable innocent expression, wide curious eyes, small surprised slightly open mouth,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_vest"),
]

FEMALE_PROFILES = [
    # F01 - 여름 스타일 참고: 시크한 직모 흑발 청순미
    ("""Korean female idol trainee, age 20,
elegant oval face with softly defined V-line jaw, porcelain fair skin,
large round eyes with natural double lid, straight thin eyebrows, gentle downward gaze,
delicate straight nose with small refined tip, medium lips with muted pink tone,
long straight jet black hair center-parted, falling past shoulders, silky smooth sheen,
cool serene expression, no smile, calm composed direct stare, subtle melancholy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),

    # F02 - 예지 스타일 참고: 금발 글래머러스 비주얼
    ("""Korean female idol trainee, age 22,
small compact face with sharp V-line chin, high prominent cheekbones,
large round doll-like eyes with full double lid, long lashes, slightly upturned outer corners,
tall defined nose bridge with refined tip, full lips with natural rose color,
platinum blonde long hair pulled into low side ponytail, sleek and shiny,
confident powerful expression, neutral mouth, intense direct stare, model-like poise,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # F03 - 니나 스타일 참고: 갈색머리, 각진 광대, 시크
    ("""Korean female idol trainee, age 23,
angular face with pronounced high cheekbones, defined jaw tapering to chin,
narrow almond eyes with subtle lid crease and slightly upturned corners, arched brows,
straight defined nose with medium bridge height, medium lips with natural tone,
warm brown hair in half-up style with face-framing layers, ribbon hair accessory,
sophisticated chic expression, neutral composed face, editorial fashion gaze,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "blazer_vest"),

    # F04 - 유리 스타일 참고: 밝은 미소, 친근한 분위기
    ("""Korean female idol trainee, age 19,
soft round face with gentle jawline, warm complexion, natural flush on cheeks,
medium warm eyes with double lid crinkled in smile, soft natural brows,
average nose with slightly rounded tip, medium lips with bright natural smile,
dark brown long hair with soft loose waves, side-parted with volume, healthy texture,
bright friendly expression, big genuine smile showing teeth, approachable cheerful vibe,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # F05 - 소미 스타일 참고: 긴 갈색머리, 따뜻한 미소
    ("""Korean female idol trainee, age 21,
balanced oval face with soft jawline, harmonious proportions, warm skin tone,
medium almond eyes with clear double lid, naturally groomed arched brows,
straight nose with medium bridge, small defined lips with warm pink tone, subtle smile,
long brown hair with warm caramel undertone, gentle S-waves, flowing past shoulders,
elegant warm expression, closed-mouth graceful smile, kind confident eye contact,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # F06 - 벨라 스타일 참고: 청순 흑발, 좁은 긴 얼굴
    ("""Korean female idol trainee, age 20,
narrow elongated face with delicate jawline, high forehead, long proportions,
medium eyes with subtle double lid, quiet reserved gaze, thin natural brows,
small straight nose with refined narrow nostrils, thin lips with pale pink tone,
very long straight jet black hair, center-parted with no bangs, glass-like sheen,
ethereal cool beauty expression, lips barely parted, distant contemplative look,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "white_shirt"),

    # F07 - 새로운 타입: 큰 눈 인형상
    ("""Korean female idol trainee, age 18,
very small round face, baby-like proportions, puffy soft cheeks, short chin,
extremely large round eyes with wide double lids and prominent aegyo-sal, long curled lashes,
tiny upturned button nose with very low bridge, small plump lips with cherry pink color,
dark brown hair in loose low twin tails with face-framing wispy strands,
cute innocent expression, eyes wide with wonder, slightly pursed lips,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "check_vest"),

    # F08 - 새로운 타입: 강한 걸크러시
    ("""Korean female idol trainee, age 22,
sharp structured face with strong V-line jaw, defined angular cheekbones,
narrow fierce eyes with subtle crease and upturned outer corners, straight bold brows,
straight prominent nose with defined bridge, medium lips with strong defined outline,
jet black hair in sleek low ponytail pulled tight, exposed forehead and clean hairline,
powerful commanding expression, no smile, intense focused stare, charismatic authority,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),

    # F09 - 새로운 타입: 밝은 에너지 비타민
    ("""Korean female idol trainee, age 17,
compact oval face with soft features, visible dimples, healthy glowing skin,
bright medium eyes with cheerful double lid, slightly upturned outer corners,
small nose with rounded soft tip, medium lips with natural coral tone,
dark brown hair with copper reddish highlights, in high messy ponytail, baby hairs at temples,
energetic radiant expression, big toothy grin, crinkled nose, eyes squinting with joy,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_cardigan"),

    # F10 - 새로운 타입: 차가운 아이스 비주얼
    ("""Korean female idol trainee, age 21,
very small petite face with narrow pointed chin, minimal jaw width,
narrow upturned eyes with clean double lid and cold gaze, thin high-arched brows,
small straight nose with slightly upturned tip, small thin lips with muted rose tone,
ash brown long straight hair, precise center part, falling smoothly past collarbone,
cold detached expression, no smile, slightly narrowed eyes, icy aloof demeanor, pale skin,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),

    # F11 - 새로운 타입: 자연스러운 소녀미
    ("""Korean female idol trainee, age 19,
medium square-ish face with soft rounded jaw corners, natural healthy complexion,
medium eyes with relaxed natural crease, straight unpretentious brows,
average nose with gently rounded bridge, medium natural lips,
dark brown hair with natural slight wave, shoulder length, off-center messy part,
natural girl-next-door expression, easy relaxed smile, effortlessly casual charm,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_blazer"),

    # F12 - 새로운 타입: 고혹적 성숙미
    ("""Korean female idol trainee, age 24,
diamond face shape with prominent cheekbones, narrow forehead and chin,
fox-like elongated eyes with single lid and sharp outer corners, thin arched brows,
high straight nose bridge with narrow tip, thin lips with defined vermilion border,
dark wine-tinted brown hair in shoulder-length wavy lob, side-parted with volume,
mysterious alluring expression, half-lidded eyes, subtle one-sided smile,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "shirt_tie"),

    # F13 - 새로운 타입: 인형같은 블랙핑크 비주얼
    ("""Korean female idol trainee, age 20,
classic oval face with porcelain smooth contour, softly tapering chin,
medium-large doll-like eyes with wide double lid, straight defined brows,
small button nose with rounded tip, full lips with deep rose natural color,
black hair with sharp blunt-cut bangs at brow level, very long and straight past chest,
doll-like expression, slightly wide innocent eyes, subtle pout, dreamy vintage beauty,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "gray_cardigan"),

    # F14 - 새로운 타입: 건강미 넘치는 운동 소녀
    ("""Korean female idol trainee, age 20,
broad features with moderate oval face, healthy tanned-warm complexion,
medium bright eyes with natural double lid, thick natural brows,
average nose with slightly wide base, wide natural lips with warm coral,
dark brown hair pulled back in neat high ponytail, clean slicked-back front,
athletic confident expression, strong determined smile, radiant healthy glow,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_blazer"),

    # F15 - 새로운 타입: 청량한 여신 비주얼
    ("""Korean female idol trainee, age 21,
balanced heart-shaped face with wide temples narrowing to small chin, clear bright skin,
large wide-set eyes with visible full double lid, gently arched natural brows,
small delicate nose with slightly upturned tip, medium plump lips with dewy gloss,
light ash brown hair with soft highlights, long gentle waves, side-parted and flowing,
fresh clean expression, serene slight smile, luminous dewy skin, goddess-like elegance,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "check_vest"),

    # F16 - 새로운 타입: 보이시한 숏컷 매력
    ("""Korean female idol trainee, age 23,
small compact face with angular bone structure, sharp defined jaw,
narrow intense eyes with subtle crease and direct gaze, straight bold brows,
straight nose with refined pointed tip, thin defined lips pressed together,
jet black very short pixie cut with textured top, one side shorter, ears fully exposed,
bold androgynous expression, strong direct eye contact, no smile, confident challenging stare,
use the reference images for photographic style, lighting, background, outfit, and composition only,
do not copy any face from reference images, generate a completely new unique face""", "black_vest"),
]


# 4. 이미지 로딩 및 생성 함수

def load_ref_images(ref_pool: dict, outfit_style: str, count: int = 3) -> list:
    """레퍼런스 이미지를 로드합니다."""
    filenames = ref_pool.get(outfit_style, [])
    if not filenames:
        # fallback: 아무 스타일에서 가져오기
        all_files = [f for files in ref_pool.values() for f in files]
        filenames = random.sample(all_files, min(count, len(all_files)))
    else:
        filenames = random.sample(filenames, min(count, len(filenames)))

    images = []
    for fname in filenames:
        path = REF_DIR / fname
        if path.exists():
            img = Image.open(path)
            images.append(img)
            print(f"    ref: {fname}")
        else:
            print(f"    [skip] ref not found: {fname}")
    return images


def generate_image(client: genai.Client, prompt: str, ref_images: list, retry_count: int = 3):
    """레퍼런스 이미지와 함께 Gemini 3 Pro Image API를 호출합니다."""
    # contents = [prompt text] + [reference images]
    contents = [prompt] + ref_images

    for attempt in range(retry_count):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=contents,
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
                wait_time = (attempt + 1) * 5
                print(f"    Waiting {wait_time}s before retry...")
                time.sleep(wait_time)

    return None


# 5. 메인 실행

def main():
    parser = argparse.ArgumentParser(description="AIdol 프로필 사진 생성 v2 (레퍼런스 기반)")
    parser.add_argument("--dry-run", action="store_true", help="프롬프트만 출력하고 API 호출하지 않음")
    parser.add_argument("--gender", choices=["male", "female"], help="특정 성별만 생성")
    parser.add_argument("--start", type=int, default=0, help="시작 인덱스")
    parser.add_argument("--count", type=int, default=0, help="성별당 생성 개수 제한 (0=전체)")
    parser.add_argument("--delay", type=float, default=5.0, help="각 생성 사이 대기 시간(초)")
    parser.add_argument("--refs", type=int, default=3, help="생성당 레퍼런스 이미지 수 (1-4)")
    args = parser.parse_args()

    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key and not args.dry_run:
        print("[Error] GOOGLE_API_KEY 환경변수를 설정해주세요.")
        sys.exit(1)

    if api_key and not api_key.startswith("AIza") and not args.dry_run:
        print(f"[Warning] API 키 형식이 올바르지 않을 수 있습니다 (AIza... 형식 권장)")

    MALE_DIR.mkdir(parents=True, exist_ok=True)
    FEMALE_DIR.mkdir(parents=True, exist_ok=True)

    log = {"generated_at": datetime.now().isoformat(), "model": MODEL, "version": "v2_with_refs", "results": []}
    if LOG_FILE.exists():
        with open(LOG_FILE) as f:
            log = json.load(f)

    client = None
    if not args.dry_run:
        client = genai.Client(api_key=api_key)

    # 생성 대상 결정
    tasks = []
    if args.gender != "female":
        subset = MALE_PROFILES[args.start:]
        if args.count > 0:
            subset = subset[:args.count]
        for i, (prompt, outfit) in enumerate(subset, start=args.start):
            tasks.append(("male", i, prompt, outfit, MALE_REFS))
    if args.gender != "male":
        subset = FEMALE_PROFILES[args.start:]
        if args.count > 0:
            subset = subset[:args.count]
        for i, (prompt, outfit) in enumerate(subset, start=args.start):
            tasks.append(("female", i, prompt, outfit, FEMALE_REFS))

    total = len(tasks)
    print("=" * 60)
    print("AIdol Profile Photo Generator v2 (Reference-Based)")
    print(f"Model: {MODEL}")
    print(f"Reference images: {REF_DIR}")
    print(f"Refs per generation: {args.refs}")
    print(f"Total images to generate: {total}")
    print(f"Output: {OUTPUT_DIR}")
    if args.dry_run:
        print("MODE: DRY RUN")
    print("=" * 60)
    print()

    success_count = 0
    fail_count = 0

    for idx, (gender, i, prompt, outfit, ref_pool) in enumerate(tasks):
        gender_kr = "남자" if gender == "male" else "여자"
        print(f"[{idx + 1}/{total}] {gender_kr} #{i + 1} ({outfit}) 생성 중...")

        if args.dry_run:
            print(f"  Prompt: {prompt[:120]}...")
            print(f"  Outfit: {outfit}")
            print(f"  Refs available: {ref_pool.get(outfit, ['(none)'])}")
            print()
            continue

        ref_images = load_ref_images(ref_pool, outfit, count=args.refs)
        image = generate_image(client, prompt, ref_images)

        if image is not None:
            save_dir = MALE_DIR if gender == "male" else FEMALE_DIR
            filename = f"{gender}_{i + 1:02d}.png"
            filepath = save_dir / filename
            image.save(str(filepath))
            print(f"    Saved: {filepath}")

            log["results"].append({
                "gender": gender,
                "index": i + 1,
                "filename": filename,
                "outfit_style": outfit,
                "prompt_preview": prompt[:100],
                "status": "success",
                "timestamp": datetime.now().isoformat(),
            })
            success_count += 1
        else:
            print(f"    [FAILED] {gender} #{i + 1}")
            log["results"].append({
                "gender": gender,
                "index": i + 1,
                "outfit_style": outfit,
                "status": "failed",
                "timestamp": datetime.now().isoformat(),
            })
            fail_count += 1

        with open(LOG_FILE, "w") as f:
            json.dump(log, f, indent=2, ensure_ascii=False)

        if idx < total - 1:
            time.sleep(args.delay)

    print()
    print("=" * 60)
    print("완료!")
    print(f"  성공: {success_count}장")
    print(f"  실패: {fail_count}장")
    print(f"  로그: {LOG_FILE}")
    print("=" * 60)


if __name__ == "__main__":
    main()
