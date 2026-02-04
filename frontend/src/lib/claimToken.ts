/**
 * ClaimToken utility functions.
 *
 * ClaimToken is now stored in httpOnly cookies (managed by middleware/backend).
 * These functions handle migration from localStorage for existing users.
 *
 * Migration flow:
 * 1. Old users have token in localStorage
 * 2. On API calls, the token is sent in headers
 * 3. Backend middleware migrates it to cookie
 * 4. After first successful API call, localStorage can be cleared
 */

const STORAGE_KEY = "aidol_claim_token";

/**
 * Get ClaimToken from localStorage (for migration/header sending).
 *
 * Note: httpOnly cookies cannot be read by client-side JavaScript.
 * This function only returns the localStorage value for migration purposes.
 * The actual cookie is sent automatically by the browser.
 *
 * @returns The localStorage token value, or null if not present
 */
export const getClaimToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
};

/**
 * Clear localStorage token after successful migration.
 *
 * Call this after a successful API request to complete migration.
 * The cookie is now the source of truth.
 */
export const clearLocalStorageToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * @deprecated Use cookie-based authentication instead.
 * This function is kept for backward compatibility during migration.
 * New users don't need to call this - the cookie is set by middleware.
 */
export const getOrCreateClaimToken = (): string => {
  if (typeof window === "undefined") {
    throw new Error(
      "getOrCreateClaimToken can only be called on the client side.",
    );
  }

  // For migration: return existing localStorage token
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  // New users: token is managed by cookie (middleware sets it)
  // Return empty string to indicate no localStorage token
  // The actual token is in httpOnly cookie, inaccessible to JS
  return "";
};
