/**
 * Companion (member) schemas
 * Matches backend aidol/schemas/companion.py definitions (Public only for MVP)
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

export const POSITIONS = [
  "mainVocal",
  "subVocal",
  "mainDancer",
  "subDancer",
  "mainRapper",
  "subRapper",
] as const;

export type Position = (typeof POSITIONS)[number];

export type Gender = "male" | "female";

export type Grade = "A" | "B" | "C" | "F";

export type Status = "draft" | "published";

export interface CompanionStats {
  vocal: number;
  dance: number;
  rap: number;
  visual: number;
  stamina: number;
  charm: number;
}

const companionStatsSchema = z.object({
  vocal: z.number(),
  dance: z.number(),
  rap: z.number(),
  visual: z.number(),
  stamina: z.number(),
  charm: z.number(),
});

/**
 * Companion schema (public fields only, excludes system_prompt)
 */
export const companionSchema = z.object({
  id: z.string(),
  aidolId: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  biography: z.string().nullable().optional(),
  profilePictureUrl: z.string().nullable().optional(),
  grade: z.enum(["A", "B", "C", "F"]).nullable().optional(),
  position: z
    .enum([
      "mainVocal",
      "subVocal",
      "mainDancer",
      "subDancer",
      "mainRapper",
      "subRapper",
    ])
    .nullable()
    .optional(),
  mbti: z.string().nullable().optional(),
  gender: z.enum(["male", "female"]).nullable().optional(),
  status: z.enum(["draft", "published"]).nullable().optional(),
  stats: companionStatsSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface Companion extends BaseRecord {
  id: string;
  aidolId?: string | null;
  name?: string | null;
  biography?: string | null;
  profilePictureUrl?: string | null;
  grade?: Grade | null;
  position?: Position | null;
  mbti?: string | null;
  gender?: Gender | null;
  status?: Status | null;
  stats?: CompanionStats;
  createdAt: string;
  updatedAt: string;
}

/**
 * Schema for creating a Companion
 * Includes systemPrompt for creation (excluded from response)
 */
export interface CompanionCreate {
  aidolId?: string | null;
  name: string;
  biography?: string | null;
  profilePictureUrl?: string | null;
  systemPrompt?: string | null;
}

/**
 * Schema for updating a Companion
 */
export interface CompanionUpdate {
  aidolId?: string | null;
  name?: string;
  biography?: string | null;
  profilePictureUrl?: string | null;
  systemPrompt?: string | null;
  position?: Position | null;
  gender?: Gender | null;
  status?: Status;
  mbtiEnergy?: number;
  mbtiPerception?: number;
  mbtiJudgment?: number;
  mbtiLifestyle?: number;
}
