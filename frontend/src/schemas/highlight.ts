/**
 * Highlight message schemas
 * Matches backend highlight message API definitions
 */

import { z } from "zod";

/**
 * Highlight message schema
 * companionId === null → 인터뷰어 메시지
 * companionId !== null → 컴패니언 메시지
 */
export const highlightMessageSchema = z.object({
  id: z.string(),
  highlightId: z.string(),
  companionId: z.string().nullable(),
  sequence: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type HighlightMessage = z.infer<typeof highlightMessageSchema>;
