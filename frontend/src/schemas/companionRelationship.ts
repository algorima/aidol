import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

export const companionRelationshipSchema = z.object({
  id: z.string(),
  fromCompanionId: z.string(),
  toCompanionId: z.string(),
  intimacy: z.number().min(0).max(100),
  nickname: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface CompanionRelationship extends BaseRecord {
  id: string;
  fromCompanionId: string;
  toCompanionId: string;
  intimacy: number;
  nickname?: string | null;
  createdAt: string;
  updatedAt: string;
}
