/**
 * Companion Relationship schemas
 * Matches backend aidol/schemas/companion_relationship.py definitions
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

export const companionRelationshipSchema = z.object({
  id: z.string(),
  fromCompanionId: z.string().nullable(),
  toCompanionId: z.string().nullable(),
  intimacy: z.number().nullable(),
  nickname: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface CompanionRelationship extends BaseRecord {
  id: string;
  fromCompanionId: string | null;
  toCompanionId: string | null;
  intimacy: number | null;
  nickname: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CompanionRelationshipCreate {
  fromCompanionId: string;
  toCompanionId: string;
  intimacy?: number;
  nickname?: string;
}
