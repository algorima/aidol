import type { Highlight } from "@/schemas/highlight";

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
