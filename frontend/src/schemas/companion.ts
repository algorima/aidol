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
  position?: string | null;
}
