import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "aidol_claim_token";

export const getClaimToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
};

export const getOrCreateClaimToken = (): string => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const token = uuidv4();
  localStorage.setItem(STORAGE_KEY, token);
  return token;
};
