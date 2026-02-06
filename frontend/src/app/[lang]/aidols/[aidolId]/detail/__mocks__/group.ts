// TODO: API 구현 후 삭제. AIdolRepository.getOne()로 교체

export interface MockHighlightContent {
  id: string;
  title: string;
  imageUrl: string;
}

export interface MockHighlightSection {
  id: string;
  title: string;
  subtitle: string;
  contents: MockHighlightContent[];
}

export interface MockGroupDetail {
  id: string;
  name: string;
  groupTitle: string;
  profileImageUrl: string | null;
  createdAt: string;
  highlights: MockHighlightSection[];
}

export const MOCK_GROUP_DETAIL: MockGroupDetail = {
  id: "mock-group-1",
  name: "르누아르",
  groupTitle: "시즌1 데뷔조",
  profileImageUrl: "https://placehold.co/80x80",
  createdAt: "2026-01-15T00:00:00Z",
  highlights: [
    {
      id: "section-1",
      title: "숙소 생활 후기",
      subtitle: "7일 후 물어본 멤버들의 속마음",
      contents: [
        {
          id: "content-1-1",
          title: "숙소생활 이야기 1",
          imageUrl: "https://placehold.co/345x230",
        },
        {
          id: "content-1-2",
          title: "숙소생활 이야기 2",
          imageUrl: "https://placehold.co/345x230",
        },
      ],
    },
  ],
};
