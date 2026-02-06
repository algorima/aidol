import { z } from "zod";

export const highlightSchema = z.object({
  id: z.string(),
  aidolId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  thumbnailUrl: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Highlight = z.infer<typeof highlightSchema>;

// 내그룹의 하이라이트 섹션 표현이 달라서 따로 정의
export interface MyGroupHighlightSection {
  title: string;
  subtitle: string;
  items: Highlight[];
}
