/**
 * Highlight message schemas
 * Matches backend highlight message API definitions
 */

import type { BaseRecord } from "@aioia/core";

/**
 * companionId === null → 인터뷰어 메시지
 * companionId !== null → 컴패니언 메시지
 */
export interface HighlightMessage extends BaseRecord {
  id: string;
  highlightId: string;
  companionId: string | null;
  sequence: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
