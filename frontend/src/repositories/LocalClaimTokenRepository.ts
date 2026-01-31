import { z } from "zod";

const STORAGE_KEY = "aidol_claim_token";
const schema = z.string();

/**
 * Repository for managing the shared claim token in localStorage.
 * All AIdols created in this browser share the same claim token.
 */
export const LocalClaimTokenRepository = {
  getClaimToken(): string | null {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const result = schema.safeParse(stored);
    if (result.success) {
      return result.data;
    }
    console.warn(`[LocalClaimTokenRepository] Invalid data, resetting`);
    return null;
  },

  setClaimToken(claimToken: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, claimToken);
  },

  removeClaimToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
