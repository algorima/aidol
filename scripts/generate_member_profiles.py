#!/usr/bin/env python3
"""
259명 아이돌 연습생 프로필 데이터 생성기
==========================================
MBTI, 능력치 스탯, 바이오그래피를 생성합니다.

원칙:
- 포지션은 사용자가 캐스팅 시 지정 → 여기서 생성 안 함
- 스탯은 "재능 아키타입" 기반으로 자연스럽게 차별화
- MBTI ↔ 성격/바이오 일관성
- 그룹 내 다양성 (MBTI 겹치지 않게)
- 259명 모두 고유한 서사

대상:
- 132명: 20개 그룹 소속 멤버
- 127명: 프리셋 연습생 (아직 그룹 미배정)

사용법:
    python scripts/generate_member_profiles.py
    python scripts/generate_member_profiles.py --dry-run  # 미리보기
"""

from __future__ import annotations

import json
import random
from pathlib import Path

DATA_PATH = Path(__file__).parent / "output" / "group_highlights.json"
OUTPUT_PATH = Path(__file__).parent / "output" / "member_profiles.json"

random.seed(42)  # 재현성


# ================================================================
# 프리셋 연습생 이름 생성
# ================================================================

MALE_SURNAMES = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임",
                 "한", "오", "서", "신", "권", "황", "안", "송", "류", "홍"]
FEMALE_SURNAMES = MALE_SURNAMES  # 성씨는 공유

MALE_GIVEN_NAMES = [
    "준호", "민혁", "태양", "서준", "도영", "찬영", "하준", "지우", "예찬", "연우",
    "시원", "율", "주원", "강민", "태호", "현빈", "우진", "석진", "동현", "정호",
    "민기", "건호", "유겸", "승호", "진우", "태민", "윤호", "성현", "재이", "한울",
    "하랑", "나루", "새온", "바론", "이안", "레오", "카이", "단", "별찬", "우빈",
]

FEMALE_GIVEN_NAMES = [
    "지유", "서현", "은채", "수아", "민지", "하윤", "채원", "유나", "소미", "지민",
    "은비", "서영", "하연", "수진", "미래", "시현", "윤서", "지아", "혜원", "다솜",
    "라온", "보영", "여진", "초아", "유리", "나연", "은서", "하담", "설아", "시율",
    "가은", "연지", "지예", "유진", "소라", "미나", "하진", "다윤", "새롬", "나을",
    "가인", "무궁", "하람", "새미", "빛나", "아라", "라희", "세나", "이슬", "온유",
    "나현", "도희", "예지", "민아", "지연", "하이", "유라", "서은", "은하", "아윤",
    "담비", "소은", "예나", "채린", "주연", "미연", "시아", "유빈", "리나", "보름",
    "새봄", "하영", "주아", "연아", "은율", "재인", "다은", "소윤", "해나", "미르",
    "루나", "수연", "가람", "서하", "예림", "민채", "다혜", "나봄", "시온", "조이",
    "하루", "고은", "별하", "윤아", "혜진",
]


def generate_preset_names(n_male: int, n_female: int) -> tuple[list[str], list[str]]:
    """프리셋 연습생 이름을 중복 없이 생성합니다."""
    male_names = []
    used = set()
    i = 0
    while len(male_names) < n_male:
        surname = MALE_SURNAMES[i % len(MALE_SURNAMES)]
        given = MALE_GIVEN_NAMES[i % len(MALE_GIVEN_NAMES)]
        name = surname + given
        if name not in used:
            male_names.append(name)
            used.add(name)
        i += 1

    female_names = []
    j = 0
    while len(female_names) < n_female:
        surname = FEMALE_SURNAMES[(j + 3) % len(FEMALE_SURNAMES)]
        given = FEMALE_GIVEN_NAMES[j % len(FEMALE_GIVEN_NAMES)]
        name = surname + given
        if name not in used:
            female_names.append(name)
            used.add(name)
        j += 1

    return male_names, female_names


# ================================================================
# MBTI 풀 (실제 K-POP 아이돌 분포 반영)
# ================================================================
# E=1-5, I=6-10 / S=1-5, N=6-10 / T=1-5, F=6-10 / J=1-5, P=6-10
MBTI_POOL = [
    # ENFP (~15%)
    {"type": "ENFP", "e": 3, "s": 7, "t": 8, "j": 7},
    {"type": "ENFP", "e": 2, "s": 8, "t": 7, "j": 8},
    {"type": "ENFP", "e": 4, "s": 6, "t": 9, "j": 6},
    # INFP (~12%)
    {"type": "INFP", "e": 7, "s": 8, "t": 7, "j": 7},
    {"type": "INFP", "e": 8, "s": 7, "t": 8, "j": 8},
    {"type": "INFP", "e": 6, "s": 9, "t": 6, "j": 9},
    # ISFP (~10%)
    {"type": "ISFP", "e": 7, "s": 3, "t": 8, "j": 7},
    {"type": "ISFP", "e": 8, "s": 4, "t": 7, "j": 8},
    # ESFP (~8%)
    {"type": "ESFP", "e": 2, "s": 3, "t": 8, "j": 7},
    {"type": "ESFP", "e": 3, "s": 4, "t": 7, "j": 8},
    # ENTP (~7%)
    {"type": "ENTP", "e": 3, "s": 7, "t": 3, "j": 8},
    {"type": "ENTP", "e": 2, "s": 8, "t": 4, "j": 7},
    # INTP (~6%)
    {"type": "INTP", "e": 8, "s": 7, "t": 3, "j": 8},
    {"type": "INTP", "e": 7, "s": 8, "t": 4, "j": 7},
    # ENFJ (~6%)
    {"type": "ENFJ", "e": 3, "s": 7, "t": 8, "j": 3},
    {"type": "ENFJ", "e": 2, "s": 8, "t": 7, "j": 4},
    # ENTJ (~5%)
    {"type": "ENTJ", "e": 3, "s": 7, "t": 3, "j": 3},
    # INFJ (~5%)
    {"type": "INFJ", "e": 7, "s": 8, "t": 7, "j": 3},
    {"type": "INFJ", "e": 8, "s": 7, "t": 8, "j": 4},
    # ISTP (~5%)
    {"type": "ISTP", "e": 7, "s": 3, "t": 3, "j": 8},
    # ESTP (~4%)
    {"type": "ESTP", "e": 2, "s": 3, "t": 3, "j": 8},
    # ISFJ (~4%)
    {"type": "ISFJ", "e": 7, "s": 3, "t": 8, "j": 3},
    # ESFJ (~4%)
    {"type": "ESFJ", "e": 3, "s": 3, "t": 8, "j": 3},
    # ISTJ (~3%)
    {"type": "ISTJ", "e": 8, "s": 3, "t": 3, "j": 3},
    # INTJ (~3%)
    {"type": "INTJ", "e": 8, "s": 7, "t": 3, "j": 3},
    # ESTJ (~3%)
    {"type": "ESTJ", "e": 3, "s": 3, "t": 3, "j": 3},
]


def pick_mbti() -> dict:
    """MBTI를 가중치 기반으로 선택합니다."""
    return random.choice(MBTI_POOL).copy()


def assign_mbti_diverse(n: int) -> list[dict]:
    """그룹 내 MBTI 다양성을 보장하며 배정."""
    pool = list(MBTI_POOL)
    random.shuffle(pool)
    result = []
    seen_types: set[str] = set()

    # 먼저 겹치지 않는 타입으로 채우기
    for m in pool:
        if m["type"] not in seen_types:
            result.append(m.copy())
            seen_types.add(m["type"])
            if len(result) == n:
                break

    # 부족하면 아무거나 채우기
    while len(result) < n:
        result.append(random.choice(MBTI_POOL).copy())

    random.shuffle(result)
    return result


# ================================================================
# 재능 아키타입 기반 스탯 생성 (포지션 무관)
# ================================================================
# 연습생의 "타고난 재능 성향"에 따라 스탯 분포가 결정됨
# 사용자가 캐스팅할 때 이 스탯을 보고 적합한 포지션을 정함

TALENT_ARCHETYPES = [
    # === S급: 넘사벽 천재 (희귀, 캐스팅 시 "이건 무조건 뽑아야 해") ===
    {
        "name": "타고난 천재",
        "weight": 3,
        "stats": {
            "vocal": (82, 98), "dance": (78, 95), "rap": (60, 80),
            "visual": (80, 97), "stamina": (75, 92), "charm": (82, 97),
        },
    },
    # === A급: 확실한 주력 재능 ===
    {
        "name": "보컬 천재",
        "weight": 10,
        "stats": {
            "vocal": (82, 97), "dance": (35, 58), "rap": (20, 45),
            "visual": (50, 82), "stamina": (48, 72), "charm": (62, 88),
        },
    },
    {
        "name": "댄스 머신",
        "weight": 10,
        "stats": {
            "vocal": (32, 55), "dance": (82, 97), "rap": (20, 45),
            "visual": (52, 82), "stamina": (68, 92), "charm": (55, 82),
        },
    },
    {
        "name": "래핑 신동",
        "weight": 7,
        "stats": {
            "vocal": (25, 48), "dance": (35, 60), "rap": (80, 97),
            "visual": (45, 75), "stamina": (50, 75), "charm": (55, 80),
        },
    },
    {
        "name": "비주얼 센터",
        "weight": 7,
        "stats": {
            "vocal": (38, 62), "dance": (38, 62), "rap": (20, 45),
            "visual": (88, 99), "stamina": (40, 65), "charm": (80, 95),
        },
    },
    # === B급: 탄탄한 실력파 ===
    {
        "name": "올라운더",
        "weight": 12,
        "stats": {
            "vocal": (58, 78), "dance": (58, 78), "rap": (48, 68),
            "visual": (55, 78), "stamina": (58, 78), "charm": (58, 78),
        },
    },
    {
        "name": "보컬댄서",
        "weight": 6,
        "stats": {
            "vocal": (68, 85), "dance": (68, 85), "rap": (25, 45),
            "visual": (50, 75), "stamina": (60, 80), "charm": (55, 78),
        },
    },
    {
        "name": "래퍼댄서",
        "weight": 5,
        "stats": {
            "vocal": (30, 50), "dance": (65, 82), "rap": (68, 85),
            "visual": (45, 72), "stamina": (62, 82), "charm": (50, 75),
        },
    },
    {
        "name": "퍼포먼스 괴물",
        "weight": 6,
        "stats": {
            "vocal": (35, 58), "dance": (70, 88), "rap": (30, 55),
            "visual": (50, 75), "stamina": (82, 97), "charm": (62, 82),
        },
    },
    {
        "name": "감성파",
        "weight": 6,
        "stats": {
            "vocal": (65, 85), "dance": (32, 52), "rap": (22, 42),
            "visual": (58, 82), "stamina": (38, 58), "charm": (78, 95),
        },
    },
    # === C급: 성장 가능성 ===
    {
        "name": "노력형",
        "weight": 8,
        "stats": {
            "vocal": (42, 62), "dance": (42, 62), "rap": (32, 52),
            "visual": (38, 62), "stamina": (72, 92), "charm": (42, 62),
        },
    },
    {
        "name": "원석",
        "weight": 6,
        "stats": {
            "vocal": (25, 50), "dance": (25, 50), "rap": (20, 45),
            "visual": (55, 85), "stamina": (35, 55), "charm": (60, 85),
        },
    },
    # === F급: 갓 들어온 신입 (키우는 재미) ===
    {
        "name": "신입생",
        "weight": 8,
        "stats": {
            "vocal": (15, 38), "dance": (15, 38), "rap": (10, 32),
            "visual": (40, 75), "stamina": (25, 48), "charm": (35, 65),
        },
    },
    {
        "name": "늦깎이",
        "weight": 4,
        "stats": {
            "vocal": (20, 42), "dance": (12, 35), "rap": (8, 28),
            "visual": (45, 80), "stamina": (20, 42), "charm": (40, 70),
        },
    },
    {
        "name": "숨은 보석",
        "weight": 2,
        # 하나만 미친듯이 높고 나머지는 바닥 → "이걸 키우면..."
        "stats": {
            "vocal": (10, 95), "dance": (10, 95), "rap": (8, 90),
            "visual": (30, 85), "stamina": (15, 60), "charm": (25, 75),
        },
        "spike": True,  # 특수 처리: 랜덤 1개 스탯을 85-99로 올림
    },
]

# 가중치 기반 선택 리스트
_ARCHETYPE_WEIGHTED: list[dict] = []
for _a in TALENT_ARCHETYPES:
    _ARCHETYPE_WEIGHTED.extend([_a] * _a["weight"])


def generate_stats() -> tuple[str, dict[str, int]]:
    """재능 아키타입 기반으로 스탯을 생성합니다."""
    archetype = random.choice(_ARCHETYPE_WEIGHTED)
    stats = {}
    for stat_name, (lo, hi) in archetype["stats"].items():
        stats[stat_name] = random.randint(lo, hi)

    # "숨은 보석": 스탯 하나만 미친듯이 높고 나머지는 바닥
    if archetype.get("spike"):
        # 나머지를 낮게 깔고
        for k in stats:
            stats[k] = random.randint(10, 40)
        # 랜덤 1개를 85-99로 올림
        spike_stat = random.choice(list(stats.keys()))
        stats[spike_stat] = random.randint(85, 99)

    return archetype["name"], stats


def calc_grade(stats: dict[str, int]) -> str:
    """스탯 평균 기반 등급."""
    avg = sum(stats.values()) / len(stats)
    if avg >= 80:
        return "A"
    if avg >= 60:
        return "B"
    if avg >= 40:
        return "C"
    return "F"


# ================================================================
# 바이오그래피 생성
# ================================================================

HOMETOWNS = [
    "서울", "서울", "서울", "서울",
    "부산", "부산", "대구", "인천",
    "광주", "대전", "울산", "수원",
    "제주", "전주", "춘천", "창원",
    "경주", "여수", "강릉", "목포",
    "세종", "안양", "고양", "청주",
    "성남", "용인", "화성", "파주",
    # 해외 출신
    "오사카", "도쿄", "LA", "시드니", "밴쿠버", "방콕",
    "뉴욕", "런던", "호치민", "자카르타",
]

TRAINING_PERIODS = [
    "6개월", "8개월", "1년", "1년 반", "2년", "2년 반", "3년", "3년 반",
    "4년", "5년", "6년", "7년", "8년",
]

PERSONALITY_BY_MBTI = {
    "ENFP": [
        "에너지 넘치고 창의적인 자유영혼",
        "호기심이 끝없는 아이디어 뱅크",
        "어디서든 분위기를 밝히는 무드메이커",
        "감성과 열정이 폭발하는 이상주의자",
    ],
    "INFP": [
        "깊은 내면의 세계를 가진 몽상가",
        "조용하지만 강한 신념을 가진 예술가 기질",
        "감수성이 풍부하고 공감 능력이 뛰어난",
        "혼자만의 시간을 통해 영감을 얻는 창작자",
    ],
    "ISFP": [
        "말보다 행동으로 보여주는 묵묵한 노력파",
        "감각적이고 섬세한 감성의 소유자",
        "자유롭고 유연한 성격, 하지만 자기 세계가 뚜렷한",
        "현재에 충실하며 순간의 아름다움을 포착하는",
    ],
    "ESFP": [
        "무대 위에서 빛나는 타고난 엔터테이너",
        "사람들과 함께할 때 에너지가 차오르는 사교형",
        "즉흥적이고 재미를 추구하는 분위기 메이커",
        "낙천적이고 긍정적인 에너지의 소유자",
    ],
    "ENTP": [
        "끝없이 새로운 것을 시도하는 도전자",
        "논리적이면서도 창의적인 사고의 소유자",
        "토론과 논쟁을 즐기는 지적 호기심 덩어리",
        "규칙을 깨고 새로운 길을 만드는 혁신가 기질",
    ],
    "INTP": [
        "끊임없이 분석하고 탐구하는 조용한 천재형",
        "독립적이고 논리적인 사고를 중시하는",
        "겉은 차분하지만 머릿속은 항상 바쁜 전략가",
        "자신만의 방식으로 문제를 해결하는 독창적인",
    ],
    "ENFJ": [
        "팀원들의 잠재력을 끌어내는 천생 리더",
        "따뜻한 카리스마로 모두를 이끄는 맏이 기질",
        "공감 능력이 뛰어나고 책임감 강한 조율자",
        "다른 사람의 성장을 자기 일처럼 기뻐하는",
    ],
    "ENTJ": [
        "목표를 정하면 반드시 달성하는 추진력의 소유자",
        "전략적 사고와 결단력을 갖춘 타고난 지휘관",
        "효율과 결과를 중시하는 완벽주의 리더",
    ],
    "INFJ": [
        "통찰력 있고 조용히 팀을 이끄는 현자 타입",
        "깊은 생각과 따뜻한 마음을 동시에 가진",
        "직관적으로 사람의 마음을 읽는 공감의 달인",
    ],
    "ISTP": [
        "과묵하지만 실력으로 증명하는 장인 기질",
        "위기 상황에서 냉철하게 빛나는 해결사",
        "분석적이고 실용적인, 행동으로 말하는 타입",
    ],
    "ESTP": [
        "도전을 두려워하지 않는 대담한 행동파",
        "순간 판단력이 뛰어난 현장형 리더",
        "에너지 넘치고 스릴을 즐기는 모험가",
    ],
    "ISFJ": [
        "묵묵히 팀을 챙기는 숨은 공신",
        "성실하고 헌신적인, 팀의 안정을 책임지는",
        "세심하고 배려 깊은, 모두의 든든한 버팀목",
    ],
    "ESFJ": [
        "따뜻한 관심으로 팀 분위기를 살리는 사교형",
        "조화와 화합을 중시하는 다정한 리더",
        "모두와 잘 어울리는 사교적인 분위기 메이커",
    ],
    "ISTJ": [
        "원칙을 지키며 묵묵히 맡은 바를 해내는 신뢰형",
        "꾸준함과 성실함으로 팀의 기둥이 되는",
        "계획적이고 책임감 강한 모범생 기질",
    ],
    "INTJ": [
        "전략적 사고로 그룹의 방향을 설계하는 건축가형",
        "독립적이고 목표 지향적인 완벽주의자",
        "조용히 큰 그림을 그리는 전략가",
    ],
    "ESTJ": [
        "체계적이고 추진력 있는 실행가",
        "규율과 질서를 중시하는 든든한 관리자형",
        "책임감과 리더십으로 팀을 이끄는 조직가",
    ],
}

# 재능 아키타입별 특기 (스탯 성향과 일치하는 서사)
SKILLS_BY_ARCHETYPE = {
    "보컬 천재": [
        "어릴 때부터 성가대에서 노래한 경험이 있다",
        "뮤지컬 배우 출신으로 발성이 탄탄하다",
        "고음부터 저음까지 3옥타브를 넘나드는 음역대를 자랑한다",
        "재즈 보컬을 배워 독특한 음색이 특징이다",
        "OST 참여가 꿈일 만큼 감성적인 목소리의 소유자다",
        "피아노를 10년째 치고 있다",
        "기타를 독학으로 배워 버스킹 경험이 있다",
    ],
    "댄스 머신": [
        "현대무용을 전공하여 기본기가 탄탄하다",
        "팝핀, 락킹 등 스트릿 댄스 실력이 출중하다",
        "발레를 7년간 배워 유연성과 표현력이 뛰어나다",
        "대회 수상 경력이 있는 실력파 댄서 출신이다",
        "비보잉을 할 수 있어 파워풀한 퍼포먼스가 강점이다",
        "안무 크리에이터로 활동한 경력이 있다",
        "체조를 배워 아크로바틱 동작도 가능하다",
    ],
    "래핑 신동": [
        "고등학교 때부터 힙합 동아리에서 활동한 실력파 래퍼다",
        "자작 가사를 쓰며 사회 메시지를 담는 것을 좋아한다",
        "빠른 플로우와 정확한 딕션이 강점이다",
        "프로듀싱까지 가능해 자체 비트 제작도 한다",
        "지하 래핑 배틀 경험이 있는 실전파다",
        "영어 래핑에 능숙해 해외 팬들에게 인기가 많다",
        "시를 쓰는 습관이 있어 가사에 문학적 감성이 담긴다",
    ],
    "올라운더": [
        "노래, 춤, 랩 어느 하나 빠지지 않는 만능형이다",
        "다방면에서 고른 실력을 갖춰 어떤 무대든 소화한다",
        "모든 분야에서 70점 이상을 내는 안정적인 실력자다",
        "다양한 장르의 음악을 섭렵해 폭넓은 표현력이 강점이다",
        "연기와 예능에서도 두각을 나타내는 다재다능한 재능꾼이다",
    ],
    "비주얼 센터": [
        "길거리에서 수없이 캐스팅 제안을 받은 비주얼이다",
        "화보 촬영에서 특히 빛나는 포토제닉한 얼굴의 소유자다",
        "모델 활동 경험이 있어 카메라 앞에서 자연스럽다",
        "패션 감각이 뛰어나 스타일 아이콘으로 주목받고 있다",
        "비주얼로 첫인상을 사로잡고 실력으로 팬심을 굳히는 타입이다",
    ],
    "퍼포먼스 괴물": [
        "무대 위 에너지가 남다른 체력의 소유자다",
        "2시간 공연을 해도 지치지 않는 강철 체력이다",
        "역동적인 퍼포먼스로 관객을 압도하는 무대형이다",
        "운동선수 출신으로 신체 능력이 월등하다",
        "무대 장악력이 뛰어나 라이브에서 더 빛난다",
    ],
    "감성파": [
        "감성적인 표현력으로 청중의 마음을 움직인다",
        "작곡과 편곡에도 관심이 많아 자작곡을 만든다",
        "슬픈 발라드를 부르면 눈물을 흘리게 만드는 목소리다",
        "음악적 감성이 깊어 한 곡 한 곡에 영혼을 담는다",
        "청중과 교감하는 능력이 탁월한 무대 위의 이야기꾼이다",
    ],
    "노력형": [
        "타고난 재능보다 노력으로 여기까지 온 근성의 소유자다",
        "매일 가장 먼저 연습실에 오고 가장 늦게 나간다",
        "처음엔 부족했지만 끈기로 인정받게 된 대기만성형이다",
        "체력 훈련을 게을리하지 않아 항상 최상의 컨디션을 유지한다",
        "꾸준한 연습으로 매일 조금씩 성장하는 것을 즐긴다",
    ],
    "보컬댄서": [
        "노래와 춤 모두 수준급인 투탑 재능의 소유자다",
        "보컬과 댄스를 동시에 소화하는 드문 올라운더다",
        "춤을 추면서도 라이브가 흔들리지 않는 안정적인 실력이다",
        "보컬 트레이닝과 안무 연습을 병행하며 양쪽 모두 갈고닦았다",
    ],
    "래퍼댄서": [
        "랩과 퍼포먼스를 동시에 보여주는 무대형 래퍼다",
        "힙합 댄스와 래핑을 결합한 독자적인 스타일이 특징이다",
        "자유로운 프리스타일 래핑과 춤을 즐긴다",
        "에너지 넘치는 랩 퍼포먼스로 무대를 지배한다",
    ],
    "타고난 천재": [
        "노래, 춤, 랩 모두 입사 동기 중 압도적 1위였다",
        "트레이너들이 '10년에 한 번 나올 재능'이라 평가한다",
        "모든 분야에서 천부적 감각을 보여주는 엘리트 연습생이다",
        "데뷔 전부터 업계에서 소문이 자자한 괴물 신인이다",
    ],
    "원석": [
        "아직 갈고닦아야 하지만 숨겨진 잠재력이 보이는 타입이다",
        "비주얼과 분위기는 이미 아이돌감이지만 실력은 아직 발전 중이다",
        "외모와 매력은 검증됐으니 실력만 쌓으면 대박 날 연습생이다",
        "트레이너들이 '가능성은 충분하다'고 평가하는 발전형이다",
    ],
    "신입생": [
        "입사한 지 얼마 안 된 새내기 연습생이다",
        "아직 기본기를 다지는 중이지만 열정만큼은 누구에게도 지지 않는다",
        "모든 것이 처음이라 매일매일이 도전의 연속이다",
        "부족한 점이 많지만 빠른 성장 속도로 주목받고 있다",
        "오디션에서 가능성을 보여 합격한 신인이다",
    ],
    "늦깎이": [
        "남들보다 늦게 시작했지만 그래서 더 간절한 연습생이다",
        "다른 분야에서 활동하다 아이돌의 꿈을 늦게 품었다",
        "나이 제한 마지막 기회에 도전한 절실한 연습생이다",
        "늦게 시작한 만큼 배의 노력을 하겠다는 각오를 가지고 있다",
    ],
    "숨은 보석": [
        "한 가지 분야에서 압도적인 재능을 보이지만 나머지는 아직 미숙하다",
        "특정 분야에서 폭발적인 잠재력을 가진 불균형형 천재다",
        "약점이 뚜렷하지만 강점은 누구도 넘볼 수 없는 극단적 재능의 소유자다",
        "한 우물만 깊게 판 덕에 그 분야에서만큼은 탑급이다",
    ],
}

SKILLS_GENERAL = [
    "수영 선수 출신으로 체력이 뛰어나다",
    "요리를 잘해서 동료들의 식사를 책임진다",
    "그림에 재능이 있어 일러스트를 직접 그린다",
    "태권도 유단자로 무대 위 파워풀한 동작이 일품이다",
    "사진 찍는 것을 좋아해 동료들의 비하인드 사진을 찍어준다",
    "외국어에 능통해 해외 팬과 직접 소통한다",
    "독서를 즐기며 깊이 있는 대화를 좋아한다",
    "농구를 좋아해 연습 후에도 코트에서 시간을 보낸다",
    "영화감독이 꿈이라 촬영과 편집을 독학 중이다",
    "만화와 애니메이션에 조예가 깊은 오타쿠 기질이 있다",
    "명상과 요가를 즐기며 마음의 평정을 중시한다",
    "패션 감각이 뛰어나 동료들의 스타일링을 도와준다",
    "유튜브 편집이 취미로 컨텐츠 제작에 기여한다",
    "어릴 때부터 연극반에서 활동한 연기파다",
    "프로그래밍에 관심이 있어 팬 사이트를 만들기도 했다",
    "게임을 좋아해 팬들과 게임 방송을 하기도 한다",
    "서예를 배워 독특한 감성의 글씨가 인기다",
    "악기를 다룰 줄 알아 밴드 형태의 무대도 가능하다",
    "어린 시절 해외에서 살아 다문화적 감성을 가지고 있다",
    "등산이 취미로 자연 속에서 영감을 얻는다",
]

DREAMS = [
    "세계 무대에서 공연하는 것이 가장 큰 꿈이다",
    "자신의 음악으로 누군가에게 위로가 되고 싶다",
    "솔로 아티스트로서도 인정받는 올라운더가 목표다",
    "음악뿐 아니라 연기와 예능에서도 다재다능함을 보여주고 싶다",
    "후배들에게 존경받는 아티스트가 되는 것이 목표다",
    "자신만의 음악 레이블을 만드는 것이 최종 꿈이다",
    "팬들과 오래오래 함께 무대에 서고 싶다",
    "K-POP을 넘어 글로벌 아티스트로 성장하고 싶다",
    "자작곡으로 가득 찬 앨범을 내는 것이 소원이다",
    "그래미 시상식에 서는 것이 인생 목표다",
    "음악으로 세상을 바꿀 수 있다고 믿는다",
    "사람들이 힘들 때 자신의 무대를 보고 힘을 얻었으면 한다",
    "아시아를 대표하는 아티스트가 되는 것이 꿈이다",
    "음악 프로듀서로서의 역량도 키워나가고 싶다",
    "무대 위의 1초를 위해 10000시간을 투자하는 사람이 되겠다",
    "멤버들과 함께 전설이 되고 싶다",
    "세계 투어를 돌며 모든 대륙의 팬을 만나고 싶다",
    "음악과 패션을 결합한 새로운 문화를 만들고 싶다",
    "자신만의 작품 세계를 구축해 예술가로 인정받고 싶다",
    "무대 위에서 은퇴하는 그 날까지 최선을 다하겠다",
]

BACKSTORY_HOOKS = [
    "어릴 때 TV에서 본 공연에 충격을 받고 연습생의 길에 들어섰다",
    "길거리 캐스팅으로 연습생이 되었다",
    "오디션 프로그램을 통해 발탁되었다",
    "가족 모두가 음악을 하는 음악 가정에서 자랐다",
    "원래 운동선수를 꿈꿨으나 부상 후 음악의 길로 전향했다",
    "학교 축제 무대에서 두각을 나타내 스카우트되었다",
    "SNS에 올린 커버 영상이 화제가 되어 합류했다",
    "친구의 권유로 반신반의하며 오디션에 갔다가 합격했다",
    "연기를 공부하다가 아이돌의 매력에 빠져 전향했다",
    "부모님의 반대를 설득하고 꿈을 쫓아 연습생이 되었다",
    "댄스 학원에서 두각을 나타내며 자연스럽게 연습생이 되었다",
    "노래 대회에서 대상을 수상하며 주목받았다",
    "외국에서 돌아온 후 한국 연예계에 도전했다",
    "어릴 때부터 동네에서 소문난 끼쟁이였다",
    "형/누나/언니/오빠의 영향으로 자연스럽게 무대를 동경하게 되었다",
    "작곡가를 꿈꾸다가 직접 무대에 서보고 싶어졌다",
    "유학 중 K-POP에 매료되어 한국으로 건너왔다",
    "동영상 플랫폼에서 커버 콘텐츠로 인기를 얻어 입사했다",
    "음악 캠프에서 재능을 발견하고 본격적으로 꿈을 키웠다",
    "학교 합창단에서 솔리스트로 활동하다 아이돌의 꿈을 품었다",
]

# 그룹 소속 멤버의 역할 (맏이/중간/막내)
GROUP_ROLES_ELDEST = [
    "그룹의 맏이로서 멤버들을 든든히 챙긴다",
    "팀의 정신적 지주이자 상담사 역할을 맡고 있다",
    "경험과 노련함으로 무대 위에서 안정감을 준다",
]

GROUP_ROLES_YOUNGEST = [
    "그룹의 막내로 귀여운 매력을 담당한다",
    "막내지만 실력은 형/언니들 못지않은 반전 매력의 소유자다",
    "막내 특유의 애교와 당돌함으로 팀에 활력을 불어넣는다",
]

GROUP_ROLES_MIDDLE = [
    "팀의 분위기 메이커 역할을 맡고 있다",
    "멤버들 사이의 다리 역할로 팀 화합에 기여한다",
    "조용히 자기 몫을 해내는 팀의 숨은 보석이다",
    "팀 내에서 가장 열심히 연습하는 노력파로 알려져 있다",
    "유머 감각이 뛰어나 예능감을 인정받고 있다",
    "완벽주의 성향으로 디테일에 강한 멤버다",
    "팀의 비주얼을 담당하며 화보에서 특히 빛난다",
    "멤버 중 가장 다재다능해 올라운더로 불린다",
]

# 프리셋 연습생 전용 (그룹 소속 아님)
PRESET_TRAITS = [
    "아직 그룹에 배정되지 않은 예비 연습생이다",
    "입사한 지 얼마 되지 않아 가능성을 탐색 중이다",
    "여러 그룹의 합류 후보로 거론되고 있다",
    "데뷔를 향해 매일 연습에 매진하고 있다",
    "자신만의 색깔을 찾아가는 중인 성장형 연습생이다",
    "트레이너들 사이에서 잠재력을 인정받고 있다",
    "다음 데뷔조에 합류할 것으로 기대를 모으고 있다",
    "연습생 평가에서 꾸준히 성장세를 보여주고 있다",
    "동기들 사이에서 성실함으로 유명하다",
    "숨겨진 재능이 아직 다 드러나지 않은 원석이다",
]


def build_biography(
    member_name: str,
    archetype_name: str,
    mbti_type: str,
    idx: int,
    group_size: int | None,
    member_idx_in_group: int | None,
    is_preset: bool,
) -> str:
    """일관성 있는 바이오그래피를 생성합니다."""

    hometown = HOMETOWNS[idx % len(HOMETOWNS)]
    training = TRAINING_PERIODS[idx % len(TRAINING_PERIODS)]

    personality_pool = PERSONALITY_BY_MBTI.get(mbti_type, ["독특한 개성의 소유자"])
    personality = personality_pool[idx % len(personality_pool)]

    # 재능 아키타입에 맞는 특기
    skill_pool = SKILLS_BY_ARCHETYPE.get(archetype_name, SKILLS_GENERAL)
    skill = skill_pool[idx % len(skill_pool)]

    # 일반 특기 하나 더
    general_skill = SKILLS_GENERAL[(idx * 3 + 1) % len(SKILLS_GENERAL)]

    dream = DREAMS[idx % len(DREAMS)]
    backstory = BACKSTORY_HOOKS[idx % len(BACKSTORY_HOOKS)]

    # 그룹 역할 vs 프리셋 특성
    if is_preset:
        role = PRESET_TRAITS[idx % len(PRESET_TRAITS)]
    elif member_idx_in_group is not None and group_size is not None:
        if member_idx_in_group == 0:
            role = GROUP_ROLES_ELDEST[idx % len(GROUP_ROLES_ELDEST)]
        elif member_idx_in_group == group_size - 1:
            role = GROUP_ROLES_YOUNGEST[idx % len(GROUP_ROLES_YOUNGEST)]
        else:
            role = GROUP_ROLES_MIDDLE[member_idx_in_group % len(GROUP_ROLES_MIDDLE)]
    else:
        role = PRESET_TRAITS[idx % len(PRESET_TRAITS)]

    bio = (
        f"{hometown} 출신. {backstory}. "
        f"{training}의 연습생 기간을 거쳤다. "
        f"{personality}. {skill}. {general_skill}. "
        f"{role}. {dream}."
    )
    return bio


# ================================================================
# 메인 생성 로직
# ================================================================

def main():
    import argparse
    parser = argparse.ArgumentParser(description="259명 연습생 프로필 데이터 생성")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    with open(DATA_PATH, encoding="utf-8") as f:
        groups = json.load(f)

    all_profiles: list[dict] = []
    global_idx = 0

    # ---- 1) 그룹 소속 멤버 132명 ----
    print("=" * 70)
    print("그룹 소속 멤버 (132명)")
    print("=" * 70)

    for group in groups:
        gname = group["group_name"]
        members = group["members"]
        member_genders = group.get("member_genders", {})
        group_type = group["type"]
        n = len(members)

        mbti_list = assign_mbti_diverse(n)

        print(f"\n  {gname} ({group_type}, {n}명)")
        print(f"  {'-'*60}")

        for i, member_name in enumerate(members):
            if group_type == "boy_group":
                gender = "male"
            elif group_type == "girl_group":
                gender = "female"
            else:
                gender = member_genders.get(member_name, "male").lower()

            mbti = mbti_list[i]
            archetype_name, stats = generate_stats()
            grade = calc_grade(stats)
            bio = build_biography(
                member_name, archetype_name, mbti["type"],
                global_idx, n, i, is_preset=False,
            )

            profile = {
                "group": gname,
                "name": member_name,
                "gender": gender,
                "is_preset": False,
                "talent_archetype": archetype_name,
                "mbti_type": mbti["type"],
                "mbti_energy": mbti["e"],
                "mbti_perception": mbti["s"],
                "mbti_judgment": mbti["t"],
                "mbti_lifestyle": mbti["j"],
                "stats": stats,
                "grade": grade,
                "biography": bio,
            }
            all_profiles.append(profile)

            stat_str = " / ".join(f"{k}:{v}" for k, v in stats.items())
            print(f"    {member_name:4s} | {archetype_name:8s} | {mbti['type']} | {grade} | {stat_str}")

            global_idx += 1

    # ---- 2) 프리셋 연습생 127명 ----
    # renamed/ 폴더에서 프리셋 수량 파악
    renamed_dir = Path(__file__).parent / "output" / "profiles" / "renamed"
    preset_males = sorted(renamed_dir.glob("preset_*_male.png"))
    preset_females = sorted(renamed_dir.glob("preset_*_female.png"))
    n_preset_male = len(preset_males)
    n_preset_female = len(preset_females)
    n_preset_total = n_preset_male + n_preset_female

    print(f"\n{'=' * 70}")
    print(f"프리셋 연습생 ({n_preset_total}명: 남 {n_preset_male} + 여 {n_preset_female})")
    print(f"{'=' * 70}")

    male_names, female_names = generate_preset_names(n_preset_male, n_preset_female)

    # 남자 프리셋
    for i, preset_file in enumerate(preset_males):
        name = male_names[i]
        mbti = pick_mbti()
        archetype_name, stats = generate_stats()
        grade = calc_grade(stats)
        bio = build_biography(
            name, archetype_name, mbti["type"],
            global_idx, None, None, is_preset=True,
        )

        profile = {
            "group": None,
            "name": name,
            "gender": "male",
            "is_preset": True,
            "preset_image": preset_file.name,
            "talent_archetype": archetype_name,
            "mbti_type": mbti["type"],
            "mbti_energy": mbti["e"],
            "mbti_perception": mbti["s"],
            "mbti_judgment": mbti["t"],
            "mbti_lifestyle": mbti["j"],
            "stats": stats,
            "grade": grade,
            "biography": bio,
        }
        all_profiles.append(profile)

        stat_str = " / ".join(f"{k}:{v}" for k, v in stats.items())
        print(f"  {name:6s} | {archetype_name:8s} | {mbti['type']} | {grade} | {stat_str}")
        global_idx += 1

    # 여자 프리셋
    for i, preset_file in enumerate(preset_females):
        name = female_names[i]
        mbti = pick_mbti()
        archetype_name, stats = generate_stats()
        grade = calc_grade(stats)
        bio = build_biography(
            name, archetype_name, mbti["type"],
            global_idx, None, None, is_preset=True,
        )

        profile = {
            "group": None,
            "name": name,
            "gender": "female",
            "is_preset": True,
            "preset_image": preset_file.name,
            "talent_archetype": archetype_name,
            "mbti_type": mbti["type"],
            "mbti_energy": mbti["e"],
            "mbti_perception": mbti["s"],
            "mbti_judgment": mbti["t"],
            "mbti_lifestyle": mbti["j"],
            "stats": stats,
            "grade": grade,
            "biography": bio,
        }
        all_profiles.append(profile)

        stat_str = " / ".join(f"{k}:{v}" for k, v in stats.items())
        print(f"  {name:6s} | {archetype_name:8s} | {mbti['type']} | {grade} | {stat_str}")
        global_idx += 1

    # ---- 통계 ----
    print(f"\n{'=' * 70}")
    print(f"총 {len(all_profiles)}명 프로필 생성 (그룹 {len(all_profiles) - n_preset_total} + 프리셋 {n_preset_total})")
    print(f"{'=' * 70}")

    from collections import Counter
    mbti_counts = Counter(p["mbti_type"] for p in all_profiles)
    print(f"\nMBTI 분포:")
    for t, c in mbti_counts.most_common():
        print(f"  {t}: {c}명 ({c / len(all_profiles) * 100:.1f}%)")

    archetype_counts = Counter(p["talent_archetype"] for p in all_profiles)
    print(f"\n재능 아키타입 분포:")
    for t, c in archetype_counts.most_common():
        print(f"  {t}: {c}명 ({c / len(all_profiles) * 100:.1f}%)")

    grade_counts = Counter(p["grade"] for p in all_profiles)
    print(f"\n등급 분포:")
    for t, c in sorted(grade_counts.items()):
        print(f"  {t}: {c}명 ({c / len(all_profiles) * 100:.1f}%)")

    if not args.dry_run:
        with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(all_profiles, f, indent=2, ensure_ascii=False)
        print(f"\n저장: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
