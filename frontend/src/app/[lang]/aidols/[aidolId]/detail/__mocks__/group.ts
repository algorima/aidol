// TODO: HighlightRepository 구현 후 삭제

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

export const MOCK_HIGHLIGHTS: MockHighlightSection[] = [
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
];
