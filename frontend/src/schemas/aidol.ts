/**
 * AIdol (group) schemas
 * Matches backend aidol/schemas/aidol.py definitions (Public only for MVP)
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

import { resolveImageUrl } from "../lib/imageUrl";

import type { Companion } from "./companion";

/**
 * AIdol schema (public fields only, excludes anonymous_id)
 * Matches backend AIdolPublic (aidol/schemas/aidol.py)
 */
export const aidolStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);
export type AIdolStatus = z.infer<typeof aidolStatusSchema>;

export const aidolSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable().optional(),
  greeting: z.string().nullable().optional(),
  concept: z.string().nullable().optional(),
  profileImageUrl: z
    .string()
    .nullable()
    .transform((value) => (value ? resolveImageUrl(value) : value)),
  status: aidolStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface AIdol extends BaseRecord {
  id: string;
  name: string | null;
  email?: string | null;
  greeting?: string | null;
  concept?: string | null;
  profileImageUrl: string | null;
  status: AIdolStatus;
  createdAt: string;
  updatedAt: string;
  companions?: Companion[];
}

/**
 * Schema for AIdol creation response (backend returns only id)
 */
export const aidolCreateResponseSchema = z.object({
  id: z.string(),
});

export type AIdolCreateResponse = z.infer<typeof aidolCreateResponseSchema>;

/**
 * Schema for creating an AIdol group
 */
export interface AIdolCreate {
  name: string;
  concept?: string | null;
  profileImageUrl: string;
}

/**
 * Schema for updating an AIdol group
 */
export interface AIdolUpdate {
  name?: string;
  concept?: string | null;
  profileImageUrl?: string | null;
  status?: AIdolStatus;
}

// ---------------------------------------------------------------------------
// Image Generation
// ---------------------------------------------------------------------------

/**
 * Request schema for image generation
 */
export const imageGenerationRequestSchema = z.object({
  prompt: z.string().max(200),
});

export type ImageGenerationRequest = z.infer<
  typeof imageGenerationRequestSchema
>;

/**
 * Image generation result data
 */
export const imageGenerationDataSchema = z.object({
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
});

export type ImageGenerationData = z.infer<typeof imageGenerationDataSchema>;

/**
 * Response schema for image generation
 */
export const imageGenerationResponseSchema = z.object({
  data: imageGenerationDataSchema,
});

export type ImageGenerationResponse = z.infer<
  typeof imageGenerationResponseSchema
>;
