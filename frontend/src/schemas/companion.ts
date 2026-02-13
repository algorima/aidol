/**
 * Companion (member) schemas
 * Matches backend aidol/schemas/companion.py definitions (Public only for MVP)
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

export const POSITIONS = [
  "MAIN_VOCAL",
  "SUB_VOCAL",
  "MAIN_DANCER",
  "SUB_DANCER",
  "MAIN_RAPPER",
  "SUB_RAPPER",
] as const;

export type Position = (typeof POSITIONS)[number];

export type Gender = "MALE" | "FEMALE";

export type Grade = "A" | "B" | "C" | "F";

export type Status = "DRAFT" | "PUBLISHED";

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
      "MAIN_VOCAL",
      "SUB_VOCAL",
      "MAIN_DANCER",
      "SUB_DANCER",
      "MAIN_RAPPER",
      "SUB_RAPPER",
    ])
    .nullable()
    .optional(),
  mbti: z.string().nullable().optional(),
  gender: z.enum(["MALE", "FEMALE"]).nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
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
  status: Status;
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
