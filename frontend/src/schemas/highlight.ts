/**
 * AIdol Highlight schemas
 * Matches backend aidol/schemas/highlight.py definitions
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

// ---------------------------------------------------------------------------
// HighlightMessage
// ---------------------------------------------------------------------------

export interface HighlightMessage {
  id: string;
  highlightId: string;
  companionId: string | null;
  sequence: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const highlightMessageSchema = z.object({
  id: z.string(),
  highlightId: z.string(),
  companionId: z.string().nullable(),
  sequence: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}) satisfies z.ZodType<HighlightMessage>;

// ---------------------------------------------------------------------------
// AIdolHighlight
// ---------------------------------------------------------------------------

export const aidolHighlightSchema = z.object({
  id: z.string(),
  aidolId: z.string().nullable().optional(),
  title: z.string(),
  thumbnailUrl: z.string(),
  subtitle: z.string(),
  isPremium: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface AIdolHighlight extends BaseRecord {
  id: string;
  aidolId?: string | null;
  title: string;
  thumbnailUrl: string;
  subtitle: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

// 내그룹의 하이라이트 섹션 표현이 달라서 따로 정의
export interface MyGroupHighlightSection {
  title: string;
  subtitle: string;
  items: AIdolHighlight[];
}
