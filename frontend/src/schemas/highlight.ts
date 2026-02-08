/**
 * AIdol Highlight schemas
 * Matches backend aidol/schemas/highlight.py definitions
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

/**
 * AIdolHighlight schema
 * Matches backend AIdolHighlight (aidol/schemas/highlight.py)
 */
export const aidolHighlightSchema = z.object({
  id: z.string(),
  aidolId: z.string().nullable().optional(),
  title: z.string(),
  thumbnailUrl: z.string(),
  subtitle: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface AIdolHighlight extends BaseRecord {
  id: string;
  aidolId?: string | null;
  title: string;
  thumbnailUrl: string;
  subtitle: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * HighlightMessage schema
 * Matches backend HighlightMessage (aidol/schemas/highlight.py)
 */
export const highlightMessageSchema = z.object({
  id: z.string(),
  highlightId: z.string().nullable().optional(),
  companionId: z.string().nullable().optional(),
  sequence: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface HighlightMessage extends BaseRecord {
  id: string;
  highlightId?: string | null;
  companionId?: string | null;
  sequence: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
