import { BaseApiService } from "@aioia/core";

import { getClaimToken } from "@/lib/claimToken";

/**
 * API Service for AIdol standalone app
 * No authentication required for public API access
 */
export class ApiService extends BaseApiService {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL, "");
  }

  protected getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const claimToken = getClaimToken();
    if (claimToken) {
      headers["ClaimToken"] = claimToken;
    }
    return headers;
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
