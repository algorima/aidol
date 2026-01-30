/**
 * Companion (member) schemas
 * Matches backend aidol/schemas/companion.py definitions (Public only for MVP)
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

export type Gender = "male" | "female";

export interface CompanionStats {
  vocal: number | null;
  dance: number | null;
  rap: number | null;
  visual: number | null;
  stamina: number | null;
  charm: number | null;
}

/**
 * Companion schema (public fields only, excludes system_prompt)
 */
const companionStatsSchema = z.object({
  vocal: z.number().nullable(),
  dance: z.number().nullable(),
  rap: z.number().nullable(),
  visual: z.number().nullable(),
  stamina: z.number().nullable(),
  charm: z.number().nullable(),
});

/**
 * Companion schema (public fields only, excludes system_prompt)
 */
export const companionSchema = z.object({
  id: z.string(),
  aidolId: z.string().nullable().optional(),
  name: z.string(),
  biography: z.string().nullable().optional(),
  profilePictureUrl: z.string().nullable().optional(),
  grade: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  mbti: z.string().nullable().optional(),
  gender: z.enum(["male", "female"]).nullable().optional(),
  stats: companionStatsSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface Companion extends BaseRecord {
  id: string;
  aidolId?: string | null;
  name: string;
  biography?: string | null;
  profilePictureUrl?: string | null;
  grade?: string | null;
  position?: string | null;
  mbti?: string | null;
  gender?: Gender | null;
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
}
