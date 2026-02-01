/**
 * Lead schemas
 * Matches backend aidol/schemas/aidol_lead.py definitions
 */

import { z } from "zod";

/**
 * Lead request schema
 */
export interface LeadRequest {
  aidolId: string;
  email: string;
}

/**
 * Lead response schema
 */
export const leadResponseSchema = z.object({
  aidolId: z.string(),
  email: z.string(),
});

export type LeadResponse = z.infer<typeof leadResponseSchema>;
