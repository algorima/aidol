/**
 * AIdol (group) schemas
 * Matches backend aidol/schemas/aidol.py definitions (Public only for MVP)
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

import type { Companion } from "./companion";

/**
 * AIdol schema (public fields only, excludes claim_token)
 */
export const aidolSchema = z.object({
  id: z.string(),
  name: z.string(),
  concept: z.string().nullable().optional(),
  profileImageUrl: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface AIdol extends BaseRecord {
  id: string;
  name: string;
  concept?: string | null;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  companions?: Companion[];
}

/**
 * Schema for creating an AIdol group
 * claimToken identifies the browser that created this group
 */
export interface AIdolCreate {
  name: string;
  concept?: string | null;
  profileImageUrl: string;
  claimToken: string;
}

/**
 * Schema for updating an AIdol group
 */
export interface AIdolUpdate {
  name?: string;
  concept?: string | null;
  profileImageUrl?: string | null;
}

/**
 * Member draft schema for group creation form
 */
export const memberDraftSchema = z.object({
  name: z.string().min(1, "creation.memberNameRequired"),
  personality: z.string().optional(),
  systemPrompt: z.string().optional(),
});

export type MemberDraft = z.infer<typeof memberDraftSchema>;

/**
 * Group creation form schema (react-hook-form + zod)
 */
export const groupCreationSchema = z.object({
  groupName: z.string().min(1, "creation.groupNameRequired"),
  concept: z.string().optional(),
  profileImageUrl: z.string().min(1, "creation.emblemRequired"),
  members: z
    .array(memberDraftSchema)
    .min(1, "creation.memberRequired")
    .refine((members) => members.some((m) => m.name.trim() !== ""), {
      message: "creation.memberRequired",
    }),
});

export type GroupCreationFormData = z.infer<typeof groupCreationSchema>;

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
