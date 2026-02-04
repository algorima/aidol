import { BaseApiService } from "@aioia/core";

import { clearLocalStorageToken, getClaimToken } from "@/lib/claimToken";

/**
 * API Service for AIdol standalone app
 * No authentication required for public API access
 *
 * ClaimToken is now managed via httpOnly cookies.
 * This service ensures:
 * 1. Cookies are sent with requests (credentials: 'include')
 * 2. Migration: localStorage token is sent in header for backend migration
 * 3. localStorage is cleared after successful migration
 */
export class ApiService extends BaseApiService {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL, "");
  }

  protected getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    // Migration: send localStorage token in header for backend migration
    // Backend will set cookie and this header becomes unnecessary
    const claimToken = getClaimToken();
    if (claimToken) {
      headers["ClaimToken"] = claimToken;
    }
    return headers;
  }

  /**
   * Override request to include credentials for cookie-based authentication.
   */
  async request<T>(url: string, options?: RequestInit): Promise<T> {
    const mergedOptions: RequestInit = {
      ...options,
      credentials: "include", // Send cookies with cross-origin requests
    };

    const response = (await super.request(url, mergedOptions)) as T;

    // Migration complete: clear localStorage after successful API call
    // The token is now stored in httpOnly cookie
    const localStorageToken = getClaimToken();
    if (localStorageToken) {
      clearLocalStorageToken();
    }

    return response;
  }

  /**
   * Handle API errors
   */
  protected async handleError(response: Response): Promise<never> {
    const errorData = (await response.json()) as { detail?: string };
    throw new Error(errorData.detail || `API Error: ${response.status}`);
  }
}

// Singleton instance
let apiServiceInstance: ApiService | null = null;

export const getApiService = (): ApiService => {
  if (!apiServiceInstance) {
    apiServiceInstance = new ApiService();
  }
  return apiServiceInstance;
};
