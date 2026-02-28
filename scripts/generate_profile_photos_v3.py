"""
AIdol 프로필 사진 생성 스크립트 v3
====================================
132명 전체 멤버의 프로필 사진을 아키타입 + 변형 풀 조합으로 자동 생성합니다.
기존 v2 대비 비주얼 품질을 대폭 강화합니다.

생성 대상:
- 남자 프로필 사진: 62장 (보이그룹 40 + 혼성그룹 22)
- 여자 프로필 사진: 70장 (걸그룹 52 + 혼성그룹 18)

사용법:
    export GOOGLE_API_KEY="AIzaSy..."
    pip install google-genai Pillow
    python generate_profile_photos_v3.py --dry-run         # 프롬프트 확인
    python generate_profile_photos_v3.py --start 0 --count 5  # 일부 생성
    python generate_profile_photos_v3.py                    # 전체 생성
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
REF_DIR = Path("/Users/leesoyeon/Downloads/final_output")
FACE_REF_DIR = Path(__file__).parent / "output" / "face_refs"
OUTPUT_DIR = Path(__file__).parent / "output" / "profiles"
MALE_DIR = OUTPUT_DIR / "male"
FEMALE_DIR = OUTPUT_DIR / "female"
LOG_FILE = OUTPUT_DIR / "generation_log_v3.json"

# === 얼굴 퀄리티 레퍼런스 (탑 비주얼 아이돌) ===
# 각 생성 시 1-2장을 돌아가며 전달하여 비주얼 수준 참고
MALE_FACE_REFS = [
    "cha_eunwoo.jpg", "song_kang.jpg", "v_bts.jpg",
    "wonbin_riize.jpg", "hyunjin.jpg", "felix.jpg",
    "jungkook.jpg", "mingyu.jpg", "jin_bts.jpg",
]
FEMALE_FACE_REFS = [
    "wonyoung.jpg", "jisoo.jpg", "jennie.jpg",
    "karina.jpg",
]

MODEL = "gemini-3-pro-image-preview"
ASPECT_RATIO = "1:1"

# === 의상별 레퍼런스 이미지 풀 ===
# 각 생성 시 해당 의상 스타일의 레퍼런스 2-3장을 전달하여 동일한 교복 스타일 유지

MALE_OUTFIT_REFS = {
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

FEMALE_OUTFIT_REFS = {
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

# 의상 스타일 순환 리스트
MALE_OUTFIT_ORDER = list(MALE_OUTFIT_REFS.keys())
FEMALE_OUTFIT_ORDER = list(FEMALE_OUTFIT_REFS.keys())

# === 비주얼 품질 공통 프롬프트 (탑 아이돌 수준 강제) ===
VISUAL_QUALITY_MALE = """CRITICAL: This person MUST look like Cha Eunwoo or Song Kang level — the TOP 0.001% of male beauty on Earth.
This is NOT a regular handsome person. This must be a GODLIKE, BREATHTAKING, UNREAL level of male beauty.
The kind of face that makes everyone in the room stop and stare. A face that belongs on Vogue Korea covers.
The face in the FACE REFERENCE IMAGES shows the EXACT level of beauty required — match or EXCEED it.

ABSOLUTE REQUIREMENTS:
- Skin: FLAWLESS luminous glass skin, absolutely ZERO imperfections, NO moles, NO marks, NO spots, NO blemishes of any kind
- Skin must be perfectly clear, smooth, porcelain-like with dewy glow
- Bone structure: perfectly sculpted jawline, high cheekbones, golden-ratio facial proportions
- Eyes: bright, clear, captivating — the kind of eyes you can't look away from
- Nose: perfectly shaped, refined, elegant
- Lips: well-defined, naturally colored
- Overall impression: "this person looks like a god" — NOT "this person is okay-looking"
- Quality: Vogue Korea editorial, ultra-realistic, 8K resolution, professional studio photo
- ABSOLUTELY NO moles, beauty marks, spots, freckles, or any skin imperfections"""

VISUAL_QUALITY_FEMALE = """CRITICAL: This person MUST look like Jang Wonyoung or Jisoo level — the TOP 0.001% of female beauty on Earth.
This is NOT a regular pretty person. This must be a GODLIKE, BREATHTAKING, UNREAL level of female beauty.
The kind of face that makes everyone in the room stop and stare. A face that belongs on Vogue Korea covers.
The face in the FACE REFERENCE IMAGES shows the EXACT level of beauty required — match or EXCEED it.

ABSOLUTE REQUIREMENTS:
- Skin: FLAWLESS luminous glass skin, absolutely ZERO imperfections, NO moles, NO marks, NO spots, NO blemishes of any kind
- Skin must be perfectly clear, smooth, porcelain-like with dewy glow
- Bone structure: delicate refined jawline, high sculpted cheekbones, small perfectly shaped face
- Eyes: bright, sparkling, captivating — the kind of eyes you can't look away from
- Nose: small, perfectly shaped, refined, elegant
- Lips: perfectly shaped, naturally pink-tinted
- Overall impression: "this person looks like a goddess" — NOT "this person is okay-looking"
- Quality: Vogue Korea editorial, ultra-realistic, 8K resolution, professional studio photo
- ABSOLUTELY NO moles, beauty marks, spots, freckles, or any skin imperfections"""

# === 15개 남성 얼굴 아키타입 (전부 탑 비주얼 수준) ===
# NOTE: 눈꺼풀 타입(무쌍/속쌍/쌍커풀)은 EYE_LID_STYLES에서 별도 배분 → 아키타입에 넣지 않음
MALE_ARCHETYPES = [
    # 0: 시크 비주얼 (차은우 타입)
    "perfectly sculpted sharp jawline, intense magnetic eyes, high defined cheekbones, strong elegant brow bone, strikingly handsome",
    # 1: 꽃미남 비주얼 (뷔 타입)
    "elegant oval face with refined jawline, large captivating doe eyes, perfectly straight nose, impossibly handsome flower-boy beauty",
    # 2: 차가운 비주얼 (원빈 타입)
    "angular high cheekbones, narrow fox-like eyes with magnetic upward tilt, mysterious cold aura, razor-thin sharp jaw, breathtakingly handsome cold beauty",
    # 3: 클린 비주얼 (민현 타입)
    "small refined face with clean jawline, large clear eyes, delicate straight nose, natural lips, clean-cut impossibly handsome visual",
    # 4: 중성적 비주얼 (태용 타입)
    "long sculpted face, deep intense eyes, perfectly straight slim nose, androgynous ethereal godlike beauty",
    # 5: 정통 비주얼 (수호 타입)
    "classic balanced oval face, flawlessly harmonious features, clear piercing eyes, dignified regal visual, classically handsome",
    # 6: 강렬한 비주얼 (재범 타입)
    "strong defined jawline, thick dark eyebrows, deep-set intense eyes that command attention, prominent tall nose bridge, powerfully handsome",
    # 7: 인형 비주얼 (산 타입)
    "small perfectly proportioned face, extremely large doll-like eyes, tiny perfect nose, sculpted full lips, unreal doll-like beauty",
    # 8: 날카로운 비주얼 (현진 타입)
    "diamond face with razor-sharp jawline, narrow intense eyes with piercing gaze, high straight nose, devastatingly sharp handsome features",
    # 9: 성숙 비주얼 (진 타입)
    "broad handsome face with clean strong jaw, calm confident eyes, perfectly groomed eyebrows, mature reliable idol leader visual",
    # 10: 슬림 비주얼 (성찬 타입)
    "narrow elegant face with delicate bone structure, large luminous doe eyes, perfectly straight slim nose, ethereally beautiful slim visual",
    # 11: 세련된 비주얼 (민규 타입)
    "clean-cut sculpted jaw, confident elegant eyes, arched perfect eyebrows, high cheekbones, sophisticatedly handsome model visual",
    # 12: 청량 비주얼 (수빈 타입)
    "refined oval face with clean jawline, clear bright eyes, straight nose, fresh clean impossibly handsome visual, youthful but striking",
    # 13: 야성적 비주얼 (방찬 타입)
    "strong angular face with powerful jaw, slightly hooded intense magnetic eyes, thick dark brows, deeply handsome with raw charisma",
    # 14: 요정 비주얼 (연준 타입)
    "small delicate face with pointed chin, extremely large luminous eyes, tiny delicate nose, impossibly beautiful ethereal fairy-like male beauty",
]

# === 15개 여성 얼굴 아키타입 (전부 탑 비주얼 수준) ===
# NOTE: 눈꺼풀 타입(무쌍/속쌍/쌍커풀)은 EYE_LID_STYLES에서 별도 배분 → 아키타입에 넣지 않음
FEMALE_ARCHETYPES = [
    # 0: 청순 비주얼 (수지 타입)
    "soft elegant oval face, large captivating doe eyes, perfectly straight small nose, breathtakingly beautiful innocent visual",
    # 1: 걸크러시 비주얼 (제니 타입)
    "sharp sculpted jawline, fierce magnetic cat eyes with elegant upturn, strong defined brows, stunningly beautiful with powerful charisma",
    # 2: 인형 비주얼 (장원영 타입)
    "small perfectly proportioned doll-like face, extremely large round sparkling eyes, tiny upturned nose, rosebud lips, impossibly beautiful living doll",
    # 3: 글래머러스 비주얼 (지수 타입)
    "refined sculpted cheekbones, alluring elegant eyes, full defined lips, sharp chin, glamorously stunning idol beauty",
    # 4: 상큼 비주얼 (안유진 타입)
    "bright radiant face with perfect proportions, sparkling crescent eyes with irresistible charm, flawless rosy skin, dazzlingly beautiful sunny visual",
    # 5: 차가운 비주얼 (크리스탈 타입)
    "angular high cheekbones, narrow elegant fox eyes with cool magnetic gaze, straight slim nose, breathtakingly beautiful icy elegant queen visual",
    # 6: 청초 비주얼 (윤아 타입)
    "long delicate elegant face, gentle almond eyes, thin arched brows, stunningly beautiful classical Korean beauty",
    # 7: 러블리 비주얼 (카즈하 타입)
    "perfect heart-shaped face, large luminous puppy eyes, small cute nose, naturally pink lips, impossibly adorable yet stunningly beautiful",
    # 8: 몽환적 비주얼 (아이린 타입)
    "perfectly symmetrical ethereal features, large dreamy captivating eyes, flawless pale luminous skin, otherworldly stunning fairy-like beauty",
    # 9: 성숙 비주얼 (서현 타입)
    "elegant elongated face, sophisticated deep captivating eyes, refined jawline, stunningly beautiful mature model-like proportions, graceful beauty",
    # 10: 동양적 비주얼 (김고은 타입)
    "classic refined East Asian beauty, high sculpted cheekbones, delicate jawline, uniquely stunning natural beauty",
    # 11: 웨스턴 비주얼 (리사 타입)
    "deep-set large sparkling eyes, high nose bridge, defined striking facial contours, breathtakingly beautiful exotic visual",
    # 12: 청량 소녀 비주얼 (미연 타입)
    "small refined face with delicate features, wide clear luminous eyes, straight small nose, stunningly beautiful pure fresh-faced visual",
    # 13: 카리스마 비주얼 (화사 타입)
    "sculpted powerful face, piercing confident magnetic eyes, dramatically arched brows, commanding stunning beauty with fierce presence",
    # 14: 요정 비주얼 (카리나 타입)
    "petite perfectly proportioned face, extremely large luminous doe eyes, pointed delicate chin, impossibly beautiful magical fairy-tale visual",
]

# === 변형 풀 (리서치 기반 다양한 스타일) ===

# === 남자 헤어 조합 시스템 (베이스컷 × 앞머리 × 질감 → 멤버 수만큼 고유) ===
MALE_BASE_CUTS = [
    "short two-block cut with trimmed sides",
    "medium-length layered cut",
    "short neat tapered cut showing ears",
    "medium textured wolfcut with layers",
    "medium side-swept style",
    "short clean-cut with soft top",
    "medium comma-hair style",
    "shoulder-length long layered hair like Felix Stray Kids",
    "medium shadow-perm style with soft body",
    "medium all-back swept style exposing forehead",
    "short dandy cut refined look",
    "chin-length bob with middle part",
    "short textured crop with volume on top",
    "medium mullet style with longer back",
    "long flowing hair past ears with natural movement",
    "short to medium natural fall",
]

MALE_BANGS = [
    "with center-parted curtain bangs framing face",
    "with soft down bangs resting at eyebrow level",
    "with side-swept fringe to the right",
    "with thin see-through wispy bangs",
    "with no bangs, forehead fully exposed",
    "with heavy fringe covering forehead to just above eyes",
    "with comma-shaped C-curl bang on one side",
    "with textured choppy bangs at mid-forehead",
    "with deep 8:2 side-parted fringe",
    "with 7:3 side part bangs swept left",
]

MALE_TEXTURES = [
    "straight and sleek",
    "soft natural slight wave",
    "textured and tousled piece-y",
    "smooth and polished with shine",
    "matte natural finish",
    "fluffy air-dried volume",
    "clean and controlled with product",
    "silky straight with natural flow",
    "soft layered movement",
    "light airy texture with volume",
]

def build_male_hair(idx: int) -> str:
    """인덱스 기반으로 고유한 남자 헤어 조합을 생성합니다."""
    base = MALE_BASE_CUTS[idx % len(MALE_BASE_CUTS)]
    bang = MALE_BANGS[(idx * 3 + 1) % len(MALE_BANGS)]
    texture = MALE_TEXTURES[(idx * 7 + 2) % len(MALE_TEXTURES)]
    return f"{base}, {bang}, {texture}"

# 남자 머리색: 블랙/브라운 위주 + 아이돌답게 가끔 화려한 컬러 (핑크, 금발, 은색 등)
MALE_HAIR_COLORS = [
    "jet black", "dark brown", "natural black",
    "platinum blonde", "jet black", "ash brown",
    "natural black", "pastel pink", "jet black",
    "dark brown", "silver gray", "dark brown",
    "honey blonde", "natural black", "dark brown",
    "jet black", "ash gray", "natural black",
    "warm caramel brown", "jet black", "dark brown",
    "bright orange-red", "natural black", "ice blonde",
    "dark brown", "jet black", "lavender purple",
    "natural black", "dark brown", "cherry red",
    "jet black", "dark brown",
]

# === 여자 헤어 조합 시스템 (베이스컷 × 앞머리 × 질감 → 멤버 수만큼 고유) ===
FEMALE_BASE_CUTS = [
    "very long straight hair reaching mid-back",
    "chin-length precise bob",
    "long layered hair past shoulders",
    "shoulder-length medium cut",
    "collarbone-length layered bob",
    "long straight hair reaching waist",
    "short bob ending above jawline at earlobe level",
    "medium-length hush cut with face-framing layers",
    "long hair in low ponytail at nape",
    "medium-length wolfcut with shaggy layers",
    "long hair in elegant low bun at nape",
    "long hair in half-up half-down style",
]

FEMALE_BANGS = [
    "with no bangs, center-parted showing forehead",
    "with thick blunt straight-across bangs at eyebrow level",
    "with thin see-through wispy bangs",
    "with curtain bangs parted in center framing face",
    "with side-swept bangs to the right",
    "with no bangs, deep side part",
    "with soft airy bangs just above eyebrows",
    "with long face-framing pieces at cheek level",
    "with wispy baby hair tendrils at temples",
    "with 7:3 side-parted fringe",
]

FEMALE_TEXTURES = [
    "sleek straight and glossy",
    "soft natural waves throughout",
    "smooth with inward-curling ends",
    "textured piece-y with movement",
    "polished mirror-like shine",
    "airy and fluffy with volume",
    "loose S-waves from mid-length down",
    "natural straight with blunt-cut ends",
]

def build_female_hair(idx: int) -> str:
    """인덱스 기반으로 고유한 여자 헤어 조합을 생성합니다."""
    base = FEMALE_BASE_CUTS[idx % len(FEMALE_BASE_CUTS)]
    bang = FEMALE_BANGS[(idx * 3 + 1) % len(FEMALE_BANGS)]
    texture = FEMALE_TEXTURES[(idx * 7 + 2) % len(FEMALE_TEXTURES)]
    return f"{base}, {bang}, {texture}"

# 여성 머리색: 블랙/브라운 위주 + 아이돌답게 가끔 화려한 컬러
FEMALE_HAIR_COLORS = [
    "jet black", "dark brown", "natural black",
    "honey blonde", "jet black", "ash brown",
    "natural black", "warm caramel brown", "jet black",
    "dark brown", "platinum blonde", "dark brown",
    "rose pink", "natural black", "dark brown",
    "jet black", "ash gray", "natural black",
    "dark brown", "jet black", "burgundy wine red",
    "natural black", "dark brown", "ice blonde",
    "jet black", "dark brown", "chestnut brown",
    "natural black", "dark brown", "jet black",
]

# 눈꺼풀 타입: 무쌍/속쌍/쌍커풀 다양하게 배분 (한국인 실제 비율 반영)
# 약 40% 무쌍/속쌍, 30% 얇은 쌍커풀, 30% 또렷한 쌍커풀
EYE_LID_STYLES = [
    "monolid eyes (no crease), smooth sleek eyelid, sharp attractive gaze",
    "subtle inner double fold (sok-ssang), very slight crease visible only when eyes open",
    "clear defined double eyelid with visible crease, bright open eyes",
    "monolid eyes (no crease), elongated elegant eye shape, captivating sleek gaze",
    "thin natural double eyelid with delicate crease line",
    "monolid eyes (no crease), slightly upturned eye shape, magnetic and striking",
    "prominent double eyelid with wide visible crease, large expressive eyes",
    "subtle inner double fold (sok-ssang), barely visible crease, natural Korean eye shape",
    "monolid eyes (no crease), narrow intense eye shape, powerful cool gaze",
    "natural double eyelid with moderate crease, balanced harmonious eyes",
    "monolid eyes (no crease), round eye shape with gentle gaze, soft and appealing",
    "thin double eyelid crease, almond-shaped eyes with subtle fold",
]

# 표정: 부드럽고 친근한 위주 (인상 쓰는 표정 제거)
EXPRESSIONS = [
    "warm gentle smile, friendly soft eye contact, approachable",
    "natural relaxed expression with soft eyes, calm and pleasant",
    "bright cheerful smile showing warmth, sparkling kind eyes",
    "gentle closed-mouth smile, soft warm gaze, friendly demeanor",
    "natural expression with very subtle sweet smile, inviting",
    "serene peaceful expression, gentle warm eyes, comforting presence",
    "soft natural smile, relaxed and easygoing, bright eyes",
    "light playful smile, youthful and fresh energy, bright expression",
]

# 외모 다양성: 대부분 한국인, 가끔 혼혈 느낌 (16개 중 3개만 혼혈)
ETHNICITY_LOOKS = [
    "pure Korean features",
    "pure Korean features",
    "pure Korean features",
    "pure Korean features",
    "pure Korean features",
    "Korean-Japanese mixed heritage look, softer refined features with subtle exotic charm",
    "pure Korean features",
    "pure Korean features",
    "pure Korean features",
    "pure Korean features",
    "Korean-Australian mixed, slightly deeper-set eyes with warm skin undertone, subtle Western features",
    "pure Korean features",
    "pure Korean features",
    "pure Korean features",
    "Korean-European mixed heritage, higher nose bridge, slightly deeper facial contours, striking visual",
    "pure Korean features",
]

# 개인 고유 특징: 각 멤버를 차별화하는 디테일 (소수점 조합으로 132명 모두 다르게)
FACE_SHAPES = [
    "oval face shape", "heart-shaped face", "diamond face shape",
    "round face shape", "long face shape", "square jawline face",
    "V-line sharp chin face", "soft rounded jawline face",
]

NOSE_TYPES = [
    "straight high nose bridge", "small button nose", "slightly upturned nose tip",
    "refined narrow nose", "strong prominent nose bridge", "soft rounded nose",
    "delicate petite nose", "elegantly curved nose",
]

DISTINCTIVE_FEATURES = [
    "single dimple on left cheek when smiling",
    "naturally thick expressive eyebrows",
    "deep smile lines when smiling warmly",
    "unusually long elegant eyelashes",
    "slightly asymmetric charming smile",
    "prominent cupid's bow lips",
    "naturally arched thin eyebrows",
    "subtle dimples on both cheeks",
    "slightly fuller lower lip",
    "very defined philtrum",
    "naturally rosy cheeks",
    "sharp defined brow bone",
    "soft rounded chin",
    "slightly wider-set eyes giving gentle look",
    "prominent high forehead",
    "small delicate ears",
    "slightly upturned lip corners giving natural smile",
    "perfectly straight nose bridge",
    "elegant long neck",
    "naturally pink-tinted lips",
    "clean smooth jawline",
    "bright clear eye whites",
    "perfectly shaped eyebrow arch",
    "delicate refined chin",
]

AGES = [19, 20, 21, 22, 23, 20, 19, 21, 22, 20]

# === 132명 멤버 레지스트리 ===
# (이름, 그룹, 성별) 순서
# assign_group_contents.py의 GROUPS와 정확히 동일한 순서

MEMBER_REGISTRY: list[tuple[str, str, str]] = []

# 보이그룹
_BOY_GROUPS = {
    "CREED": ["도현", "서진", "건", "태빈", "은호"],
    "ARDOR": ["시우", "한결", "영준", "정우", "재윤"],
    "KLAV": ["찬", "지호", "세빈", "루안"],
    "NEXO": ["승현", "하온", "민재", "동혁", "이든"],
    "VERVE": ["재혁", "한솔", "윤재", "경민", "호진", "성우"],
    "NOVA": ["시현", "정민", "현우", "태건", "준서", "은찬", "승우", "지훈", "한빈", "도운"],
    "CREST": ["선호", "태윤", "준영", "유찬", "성빈"],
}
for _group, _members in _BOY_GROUPS.items():
    for _m in _members:
        MEMBER_REGISTRY.append((_m, _group, "male"))

# 걸그룹
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
for _group, _members in _GIRL_GROUPS.items():
    for _m in _members:
        MEMBER_REGISTRY.append((_m, _group, "female"))

# 혼성그룹
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
for _group, _members_dict in _MIXED_GROUPS.items():
    for _m, _g in _members_dict.items():
        MEMBER_REGISTRY.append((_m, _group, _g))


def get_outfit_style(gender: str, idx: int) -> str:
    """멤버 인덱스에 따라 의상 스타일을 순환 배정합니다."""
    if gender == "male":
        return MALE_OUTFIT_ORDER[idx % len(MALE_OUTFIT_ORDER)]
    else:
        return FEMALE_OUTFIT_ORDER[idx % len(FEMALE_OUTFIT_ORDER)]


def build_prompt(name: str, gender: str, idx: int) -> str:
    """아키타입 + 조합 풀로 132명 모두 고유한 프롬프트를 생성합니다."""
    if gender == "male":
        archetype = MALE_ARCHETYPES[idx % len(MALE_ARCHETYPES)]
        hair_style = build_male_hair(idx)
        hair_color = MALE_HAIR_COLORS[idx % len(MALE_HAIR_COLORS)]
        quality = VISUAL_QUALITY_MALE
    else:
        archetype = FEMALE_ARCHETYPES[idx % len(FEMALE_ARCHETYPES)]
        hair_style = build_female_hair(idx)
        hair_color = FEMALE_HAIR_COLORS[idx % len(FEMALE_HAIR_COLORS)]
        quality = VISUAL_QUALITY_FEMALE

    expression = EXPRESSIONS[idx % len(EXPRESSIONS)]
    eye_lid = EYE_LID_STYLES[idx % len(EYE_LID_STYLES)]
    ethnicity = ETHNICITY_LOOKS[idx % len(ETHNICITY_LOOKS)]
    face_shape = FACE_SHAPES[idx % len(FACE_SHAPES)]
    nose_type = NOSE_TYPES[(idx * 3) % len(NOSE_TYPES)]
    distinctive = DISTINCTIVE_FEATURES[idx % len(DISTINCTIVE_FEATURES)]
    age = AGES[idx % len(AGES)]

    # 배경색: 남녀 모두 회색에 가까운 하늘색으로 통일
    bg_color = "light grayish-blue (cool muted pastel blue-gray, NOT pink, NOT white)"

    prompt = f"""Generate a portrait photo of a K-pop idol.

{quality}

FACE: {archetype}, {face_shape}, {nose_type}, {ethnicity}
EYES: {eye_lid}
HAIR: {hair_color} hair, {hair_style}
AGE: {age} years old
EXPRESSION: {expression}

The last 2 images are FACE BEAUTY REFERENCES — generate a NEW face at the SAME godlike level of attractiveness.
Do NOT copy the reference faces. Create an entirely new person who is EQUALLY stunning.

OUTFIT: Copy the EXACT outfit from the first 2-3 reference images (K-pop audition uniform).
BACKGROUND: solid {bg_color} — MANDATORY.
Soft flattering studio lighting.
- 1:1 square aspect ratio, upper body framing (chest up)
- Face centered, slightly above middle
- Shallow depth of field, subject in sharp focus

CRITICAL REQUIREMENTS:
- SKIN MUST BE 100% CLEAN AND CLEAR: absolutely NO moles, NO beauty marks, NO spots, NO freckles, NO blemishes, NO dots of any kind on the face or neck
- The skin must be perfectly smooth, flawless, porcelain-like with zero imperfections
- Generate a completely NEW unique face — do NOT copy any face from any reference image
- Use outfit references for clothing ONLY
- Use face references for beauty/attractiveness level ONLY — match or EXCEED their beauty
- The face must look like a TOP K-POP IDOL VISUAL (Cha Eunwoo / Song Kang level)
- Expression must be WARM, SOFT, and APPROACHABLE — never fierce, intense, or intimidating
- Background MUST be {bg_color}
- ABSOLUTELY NO TEXT, no watermarks, no logos
- This must look like an ACTUAL top-tier K-pop idol's official profile photo, NOT AI-generated"""

    return prompt


def load_outfit_refs(gender: str, outfit_style: str) -> list[Image.Image]:
    """특정 의상 스타일의 레퍼런스 이미지를 로드합니다 (2-3장)."""
    if gender == "male":
        refs = MALE_OUTFIT_REFS.get(outfit_style, [])
    else:
        refs = FEMALE_OUTFIT_REFS.get(outfit_style, [])

    images = []
    for filename in refs[:3]:  # 최대 3장
        path = REF_DIR / filename
        if path.exists():
            images.append(Image.open(path))
    return images


def load_face_refs(gender: str, idx: int) -> list[Image.Image]:
    """탑 비주얼 아이돌 얼굴 레퍼런스 1-2장을 로드합니다."""
    if gender == "male":
        ref_list = MALE_FACE_REFS
    else:
        ref_list = FEMALE_FACE_REFS

    images = []
    # 인덱스 기반으로 2장을 돌아가며 선택 (서로 다른 레퍼런스)
    for offset in range(2):
        ref_idx = (idx + offset) % len(ref_list)
        path = FACE_REF_DIR / gender / ref_list[ref_idx]
        if path.exists():
            images.append(Image.open(path))
    return images


def generate_profile(
    client: genai.Client,
    prompt: str,
    ref_images: list[Image.Image],
    retry_count: int = 3,
):
    """Gemini API로 프로필 사진을 생성합니다."""
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
                wait_time = (attempt + 1) * 10
                print(f"    Waiting {wait_time}s before retry...")
                time.sleep(wait_time)

    return None


def save_image(img, filepath: Path):
    """Gemini 이미지를 PIL로 변환하여 저장합니다."""
    import io

    if not isinstance(img, Image.Image):
        img_bytes = img.image_bytes
        pil_img = Image.open(io.BytesIO(img_bytes))
    else:
        pil_img = img
    pil_img.save(str(filepath))
    return pil_img


def main():
    parser = argparse.ArgumentParser(description="AIdol 프로필 사진 생성 v3 (132명, 비주얼 강화)")
    parser.add_argument("--dry-run", action="store_true", help="프롬프트만 출력하고 API 호출하지 않음")
    parser.add_argument("--start", type=int, default=0, help="시작 인덱스 (0-based)")
    parser.add_argument("--count", type=int, default=0, help="생성할 수량 (0=전체)")
    parser.add_argument("--delay", type=float, default=8.0, help="각 생성 사이 대기 시간(초)")
    parser.add_argument("--gender", choices=["male", "female", "all"], default="all", help="생성할 성별")
    args = parser.parse_args()

    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key and not args.dry_run:
        print("[Error] GOOGLE_API_KEY 환경변수를 설정해주세요.")
        sys.exit(1)

    MALE_DIR.mkdir(parents=True, exist_ok=True)
    FEMALE_DIR.mkdir(parents=True, exist_ok=True)

    # 성별별 분리
    male_members = [(name, group, idx) for idx, (name, group, gender) in enumerate(MEMBER_REGISTRY) if gender == "male"]
    female_members = [(name, group, idx) for idx, (name, group, gender) in enumerate(MEMBER_REGISTRY) if gender == "female"]

    if args.gender == "male":
        tasks = [("male", m) for m in male_members]
    elif args.gender == "female":
        tasks = [("female", m) for m in female_members]
    else:
        tasks = [("male", m) for m in male_members] + [("female", m) for m in female_members]

    # 슬라이싱
    start = args.start
    end = start + args.count if args.count > 0 else len(tasks)
    tasks = tasks[start:end]

    total = len(tasks)
    male_count = sum(1 for g, _ in tasks if g == "male")
    female_count = total - male_count

    print("=" * 60)
    print("AIdol Profile Photo Generator v3")
    print(f"Model: {MODEL}")
    print(f"Total members in registry: {len(MEMBER_REGISTRY)}")
    print(f"  Male: {len(male_members)}, Female: {len(female_members)}")
    print(f"Generating: {total} ({male_count} male, {female_count} female)")
    print(f"Range: [{start}, {start + total})")
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
        "total_registry": len(MEMBER_REGISTRY),
        "results": [],
    }

    # 성별별 시퀀스 번호 (파일명용)
    male_seq = 0
    female_seq = 0

    # 전체 멤버에서 이 성별 이전까지 몇 명인지 세기
    # 실제 시퀀스 번호를 위해 전체 목록 기준으로 계산
    male_all = [m[0] for m in male_members]
    female_all = [m[0] for m in female_members]

    success_count = 0
    fail_count = 0

    for task_idx, (gender, (name, group, global_idx)) in enumerate(tasks):
        if gender == "male":
            seq = male_all.index(name) + 1
            out_dir = MALE_DIR
        else:
            seq = female_all.index(name) + 1
            out_dir = FEMALE_DIR

        # 의상 스타일 배정 (성별별 시퀀스 기준으로 순환)
        outfit_style = get_outfit_style(gender, seq - 1)
        prompt = build_prompt(name, gender, global_idx)
        filename = f"{gender}_{seq:02d}.png"

        print(f"[{task_idx + 1}/{total}] {gender}_{seq:02d}: {name} ({group}) [{outfit_style}]")

        if args.dry_run:
            archetype = MALE_ARCHETYPES[global_idx % 15] if gender == "male" else FEMALE_ARCHETYPES[global_idx % 15]
            print(f"  Archetype: {archetype[:80]}...")
            print(f"  Outfit: {outfit_style}")
            print(f"  File: {filename}")
            print()
            continue

        # 해당 의상 스타일의 레퍼런스 이미지 로드
        outfit_refs = load_outfit_refs(gender, outfit_style)
        if not outfit_refs:
            print(f"    [WARNING] No reference images for {outfit_style}, skipping")
            fail_count += 1
            continue

        # 얼굴 퀄리티 레퍼런스 로드 (탑 비주얼 아이돌) — 2장 사용
        face_refs = load_face_refs(gender, seq - 1)[:2]

        # 의상 레퍼런스 먼저, 얼굴 레퍼런스 마지막
        all_refs = outfit_refs + face_refs
        print(f"    refs: {len(outfit_refs)} outfit + {len(face_refs)} face quality")
        image = generate_profile(client, prompt, all_refs)

        if image is not None:
            filepath = out_dir / filename
            save_image(image, filepath)
            print(f"    Saved: {filepath}")
            log["results"].append({
                "name": name,
                "group": group,
                "gender": gender,
                "seq": seq,
                "outfit": outfit_style,
                "filename": filename,
                "status": "success",
                "timestamp": datetime.now().isoformat(),
            })
            success_count += 1
        else:
            print(f"    [FAILED] {name} ({group})")
            log["results"].append({
                "name": name,
                "group": group,
                "gender": gender,
                "seq": seq,
                "outfit": outfit_style,
                "filename": filename,
                "status": "failed",
                "timestamp": datetime.now().isoformat(),
            })
            fail_count += 1

        # 중간 로그 저장
        with open(LOG_FILE, "w") as f:
            json.dump(log, f, indent=2, ensure_ascii=False)

        if task_idx < total - 1 and not args.dry_run:
            print(f"    Waiting {args.delay}s...")
            time.sleep(args.delay)

    print()
    print("=" * 60)
    print("완료!")
    print(f"  성공: {success_count}장")
    print(f"  실패: {fail_count}장")
    print(f"  남자: {MALE_DIR}")
    print(f"  여자: {FEMALE_DIR}")
    print(f"  로그: {LOG_FILE}")
    print("=" * 60)


if __name__ == "__main__":
    main()
