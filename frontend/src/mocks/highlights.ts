import type { Highlight, HighlightMessage } from "@/schemas/highlight";

export const mockHighlightMessages: Record<string, HighlightMessage[]> = {
  "highlight-001": [
    {
      id: "msg-001",
      highlightId: "highlight-001",
      companionId: null,
      sequence: 1,
      content: "하늘은 숙소생활 어때요?",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-002",
      highlightId: "highlight-001",
      companionId: "g-01",
      sequence: 2,
      content:
        "처음엔 낯설었는데 이제 많이 적응했어요. 멤버들이랑 밤새 얘기하면서 더 친해진 것 같아요!",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-003",
      highlightId: "highlight-001",
      companionId: null,
      sequence: 3,
      content: "지우는 어때요?",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-004",
      highlightId: "highlight-001",
      companionId: "g-02",
      sequence: 4,
      content:
        "다들 춤을 너무 잘춰서 기가 죽었어요. 저도 열심히 해서 월말평가에서 꼭 좋은 점수를 받으려고요",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-005",
      highlightId: "highlight-001",
      companionId: null,
      sequence: 5,
      content: "서준은 숙소에서 뭐 하면서 시간 보내요?",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-006",
      highlightId: "highlight-001",
      companionId: "g-03",
      sequence: 6,
      content:
        "주로 작업실에서 비트 만들어요. 요즘 새 곡 준비하고 있는데 멤버들한테 들려주고 싶어요",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-007",
      highlightId: "highlight-001",
      companionId: null,
      sequence: 7,
      content: "도윤은 숙소생활 중 가장 좋은 점이 뭐예요?",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-008",
      highlightId: "highlight-001",
      companionId: "g-04",
      sequence: 8,
      content:
        "형들이랑 같이 밥 먹는 거요! 다들 요리를 못해서 매일 배달음식이긴 한데... 그래도 재밌어요 ㅎㅎ",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-009",
      highlightId: "highlight-001",
      companionId: null,
      sequence: 9,
      content: "시우는 막내로서 어때요?",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
    {
      id: "msg-010",
      highlightId: "highlight-001",
      companionId: "g-05",
      sequence: 10,
      content:
        "형들이 많이 챙겨줘서 좋아요. 근데 코 고는 형이 있어서 가끔 힘들어요...",
      createdAt: "2026-01-29T00:00:00Z",
      updatedAt: "2026-01-29T00:00:00Z",
    },
  ],
};

export const getMockHighlightMessages = (
  highlightId: string,
): HighlightMessage[] => {
  return mockHighlightMessages[highlightId] ?? [];
};

export const mockHighlights: Highlight[] = [
  {
    id: "highlight-001",
    aidolId: "aidol-group-001",
    title: "숙소 생활 후기",
    subtitle: "7일 후 물어본 멤버들의 속마음 😉",
    thumbnailUrl: "/images/highlight-placeholder.png",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "highlight-002",
    aidolId: "aidol-group-001",
    title: "숙소 생활 후기",
    subtitle: "7일 후 물어본 멤버들의 속마음 😉",
    thumbnailUrl: "/images/highlight-placeholder.png",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "highlight-003",
    aidolId: "aidol-group-001",
    title: "숙소 생활 후기",
    subtitle: "7일 후 물어본 멤버들의 속마음 😉",
    thumbnailUrl: "/images/highlight-placeholder.png",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
];

export const getMockHighlightsByAidolId = (aidolId: string): Highlight[] => {
  return mockHighlights.filter((h) => h.aidolId === aidolId);
};
