import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "aidol_claim_token";
const LEGACY_KEY = "aidol_claim_tokens";

/**
 * SSR-safe read-only accessor for the claim token.
 * Returns null when running on the server or when no token exists.
 */
export const getClaimToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
};

/**
 * Returns the existing browser-wide claim token or creates one.
 *
 * Legacy migration: if the per-group format (`aidol_claim_tokens`) exists,
 * the first stored value is promoted to the new single-token key and the
 * legacy entry is removed.
 *
 * Must only be called on the client.
 */
export const getOrCreateClaimToken = (): string => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  // Migrate from legacy per-group format
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy) {
    try {
      const parsed = JSON.parse(legacy) as Record<string, string>;
      const firstValue = Object.values(parsed)[0];
      if (firstValue) {
        localStorage.setItem(STORAGE_KEY, firstValue);
        localStorage.removeItem(LEGACY_KEY);
        return firstValue;
      }
    } catch {
      // Corrupted legacy data – ignore and create fresh token
    }
  }

  const token = uuidv4();
  localStorage.setItem(STORAGE_KEY, token);
  return token;
};
