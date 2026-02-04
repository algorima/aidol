import { BaseApiService } from "@aioia/core";

/**
 * API Service for AIdol standalone app
 * No authentication required for public API access
 *
 * ClaimToken is managed via httpOnly cookies (set by middleware).
 * Cookies are sent automatically with requests (credentials: 'include' in BaseApiService).
 */
export class ApiService extends BaseApiService {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL, "");
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
