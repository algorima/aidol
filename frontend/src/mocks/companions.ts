import type {
  Companion,
  CompanionAbilities,
  Gender,
} from "@/schemas/companion";

const now = new Date().toISOString();

interface MockCompanion extends Companion {
  abilities: CompanionAbilities;
}

export const mockCompanions: MockCompanion[] = [
  // ── Male companions (15) ──
  {
    id: "m-01",
    name: "민준",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop",
    grade: "S",
    mbti: "ENFJ",
    gender: "male",
    biography:
      "타고난 리더십으로 팀을 이끄는 센터. 무대 위에서 빛나는 카리스마의 소유자.",
    abilities: { vocal: 90, dance: 85, visual: 95, acting: 70, rap: 60 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-02",
    name: "서준",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "ISTP",
    gender: "male",
    biography: "과묵하지만 무대에서 폭발적인 에너지를 보여주는 댄서.",
    abilities: { vocal: 60, dance: 95, visual: 80, acting: 55, rap: 50 },
    aidolId: "aidol-001",
    position: "메인댄서",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-03",
    name: "도윤",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=600&fit=crop",
    grade: "S",
    mbti: "INFP",
    gender: "male",
    biography: "감성적인 보이스로 팬들의 마음을 사로잡는 메인보컬.",
    abilities: { vocal: 98, dance: 65, visual: 85, acting: 80, rap: 40 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-04",
    name: "예준",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop",
    grade: "B",
    mbti: "ENTP",
    gender: "male",
    biography: "다재다능한 올라운더. 작사와 작곡까지 소화하는 프로듀싱 돌.",
    abilities: { vocal: 75, dance: 70, visual: 72, acting: 65, rap: 80 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-05",
    name: "시우",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "ESFP",
    gender: "male",
    biography: "무대 위의 분위기 메이커. 어디서든 빛나는 비주얼 담당.",
    abilities: { vocal: 70, dance: 80, visual: 97, acting: 75, rap: 45 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-06",
    name: "하준",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop",
    grade: "C",
    mbti: "INTJ",
    gender: "male",
    biography: "전략적 사고와 완벽주의로 무장한 연습생.",
    abilities: { vocal: 55, dance: 50, visual: 60, acting: 45, rap: 65 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-07",
    name: "주원",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "ENFP",
    gender: "male",
    biography: "넘치는 에너지와 밝은 성격으로 사랑받는 분위기 메이커.",
    abilities: { vocal: 82, dance: 78, visual: 85, acting: 88, rap: 55 },
    aidolId: "aidol-002",
    position: "리드보컬",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-08",
    name: "지호",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=600&fit=crop",
    grade: "B",
    mbti: "ISTJ",
    gender: "male",
    biography: "묵묵히 노력하는 실력파. 안정적인 보컬이 강점.",
    abilities: { vocal: 78, dance: 60, visual: 68, acting: 55, rap: 50 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-09",
    name: "건우",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=600&fit=crop",
    grade: "S",
    mbti: "ESTP",
    gender: "male",
    biography: "파워풀한 퍼포먼스와 래핑으로 무대를 장악하는 래퍼.",
    abilities: { vocal: 55, dance: 88, visual: 82, acting: 60, rap: 96 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-10",
    name: "우진",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=600&fit=crop",
    grade: "B",
    mbti: "INFJ",
    gender: "male",
    biography: "깊은 감성과 독특한 세계관을 가진 아티스트형 연습생.",
    abilities: { vocal: 72, dance: 58, visual: 75, acting: 82, rap: 60 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-11",
    name: "현서",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "ENTJ",
    gender: "male",
    biography: "카리스마 넘치는 리더형. 강렬한 눈빛이 트레이드마크.",
    abilities: { vocal: 80, dance: 82, visual: 90, acting: 72, rap: 68 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-12",
    name: "준서",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=600&fit=crop",
    grade: "C",
    mbti: "ISFP",
    gender: "male",
    biography: "예술적 감각이 뛰어난 막내. 춤과 노래 모두 성장 중.",
    abilities: { vocal: 50, dance: 55, visual: 70, acting: 60, rap: 42 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-13",
    name: "승현",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=600&fit=crop",
    grade: "B",
    mbti: "ESFJ",
    gender: "male",
    biography: "따뜻한 성격으로 팀의 화합을 이끄는 서브보컬.",
    abilities: { vocal: 74, dance: 65, visual: 72, acting: 78, rap: 48 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-14",
    name: "태민",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "INTP",
    gender: "male",
    biography: "천재적인 음악적 감각. 독보적인 스타일을 추구하는 뮤지션.",
    abilities: { vocal: 88, dance: 72, visual: 78, acting: 65, rap: 75 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "m-15",
    name: "윤호",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=600&fit=crop",
    grade: "S",
    mbti: "ESTJ",
    gender: "male",
    biography:
      "체계적이고 성실한 연습벌레. 매일 첫 번째로 연습실에 오는 연습생.",
    abilities: { vocal: 85, dance: 90, visual: 80, acting: 68, rap: 70 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },

  // ── Female companions (15) ──
  {
    id: "f-01",
    name: "서연",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
    grade: "S",
    mbti: "ENFP",
    gender: "female",
    biography: "밝은 에너지와 청량한 보이스의 소유자. 무대 위의 요정.",
    abilities: { vocal: 92, dance: 80, visual: 95, acting: 78, rap: 50 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-02",
    name: "지우",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "INTJ",
    gender: "female",
    biography: "걸크러시 매력의 소유자. 강렬한 퍼포먼스가 특기.",
    abilities: { vocal: 68, dance: 94, visual: 88, acting: 60, rap: 72 },
    aidolId: "aidol-003",
    position: "메인댄서",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-03",
    name: "하윤",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    grade: "S",
    mbti: "ISFJ",
    gender: "female",
    biography: "따뜻한 목소리와 다정한 성격으로 팬들의 사랑을 받는 보컬.",
    abilities: { vocal: 96, dance: 62, visual: 88, acting: 85, rap: 35 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-04",
    name: "소율",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
    grade: "B",
    mbti: "ESTP",
    gender: "female",
    biography: "활발하고 대담한 성격. 무대에서 자신감이 넘치는 퍼포머.",
    abilities: { vocal: 65, dance: 78, visual: 75, acting: 70, rap: 68 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-05",
    name: "윤아",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "INFP",
    gender: "female",
    biography: "몽환적인 분위기와 독보적인 음색을 가진 아티스트.",
    abilities: { vocal: 88, dance: 70, visual: 92, acting: 82, rap: 40 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-06",
    name: "다인",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop",
    grade: "C",
    mbti: "ESFJ",
    gender: "female",
    biography: "밝은 미소와 친근한 매력의 막내 연습생.",
    abilities: { vocal: 52, dance: 48, visual: 68, acting: 58, rap: 35 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-07",
    name: "채원",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "ENTJ",
    gender: "female",
    biography: "리더십과 실력을 겸비한 올라운더. 팀의 중심.",
    abilities: { vocal: 82, dance: 80, visual: 85, acting: 75, rap: 70 },
    aidolId: "aidol-004",
    position: "리더",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-08",
    name: "수빈",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop",
    grade: "B",
    mbti: "ISTP",
    gender: "female",
    biography: "쿨한 매력과 뛰어난 댄스 실력을 가진 연습생.",
    abilities: { vocal: 58, dance: 88, visual: 78, acting: 52, rap: 62 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-09",
    name: "예나",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
    grade: "S",
    mbti: "ENFJ",
    gender: "female",
    biography: "타고난 센터감. 어떤 무대든 중심에서 빛나는 존재.",
    abilities: { vocal: 88, dance: 90, visual: 95, acting: 80, rap: 55 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-10",
    name: "민서",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
    grade: "B",
    mbti: "INTP",
    gender: "female",
    biography: "조용하지만 무대 위에서 강렬한 반전 매력을 보여주는 연습생.",
    abilities: { vocal: 70, dance: 65, visual: 72, acting: 68, rap: 58 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-11",
    name: "은비",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "ESFP",
    gender: "female",
    biography: "끼와 매력이 넘치는 엔터테이너. 예능감이 뛰어난 연습생.",
    abilities: { vocal: 75, dance: 82, visual: 88, acting: 92, rap: 48 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-12",
    name: "나연",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=600&fit=crop",
    grade: "C",
    mbti: "ISTJ",
    gender: "female",
    biography: "꾸준한 노력으로 성장하는 연습생. 기본기가 탄탄.",
    abilities: { vocal: 55, dance: 52, visual: 62, acting: 48, rap: 40 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-13",
    name: "지민",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1557555187-23d685b51199?w=400&h=600&fit=crop",
    grade: "B",
    mbti: "ENTP",
    gender: "female",
    biography: "창의적이고 독특한 스타일. 작사에 재능을 보이는 뮤지션.",
    abilities: { vocal: 72, dance: 60, visual: 70, acting: 65, rap: 82 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-14",
    name: "유진",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?w=400&h=600&fit=crop",
    grade: "A",
    mbti: "INFJ",
    gender: "female",
    biography: "깊은 감성과 풍부한 표현력의 메인보컬 후보.",
    abilities: { vocal: 90, dance: 68, visual: 82, acting: 85, rap: 42 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "f-15",
    name: "시아",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=400&h=600&fit=crop",
    grade: "S",
    mbti: "ESTJ",
    gender: "female",
    biography: "체계적이고 완벽한 안무 소화력. 연습실의 에이스.",
    abilities: { vocal: 78, dance: 95, visual: 85, acting: 62, rap: 58 },
    aidolId: null,
    position: null,
    createdAt: now,
    updatedAt: now,
  },
];

interface GetMockCompanionsOptions {
  gender?: Gender;
  presetOnly?: boolean;
}

export const getMockCompanions = (
  options: GetMockCompanionsOptions = {},
): MockCompanion[] => {
  const { gender, presetOnly = true } = options;
  let result = mockCompanions;

  if (presetOnly) {
    result = result.filter((c) => c.aidolId === null);
  }

  if (gender) {
    result = result.filter((c) => c.gender === gender);
  }

  return result;
};

export const getMockCompanionAbilities = (
  companionId: string,
): CompanionAbilities | null => {
  const companion = mockCompanions.find((c) => c.id === companionId);
  return companion?.abilities ?? null;
};
