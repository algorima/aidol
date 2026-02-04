import { getClaimToken } from "@/lib/claimToken";
import type { LeadRequest, LeadResponse } from "@/schemas";
import { leadResponseSchema } from "@/schemas";
import type { ApiService } from "@/services/ApiService";

export class LeadsRepository {
  private readonly resource = "leads";

  constructor(private readonly apiService: ApiService) {}

  async create(request: LeadRequest): Promise<LeadResponse> {
    const url = this.apiService.buildUrl(this.resource);
    // Migration: send localStorage token in header for backward compatibility
    // ClaimToken is now primarily managed via httpOnly cookies
    const claimToken = getClaimToken();
    const headers = {
      "Content-Type": "application/json",
      ...(claimToken && { ClaimToken: claimToken }),
    };
    // Note: credentials: 'include' is handled by ApiService.request()
    const response = await this.apiService.request(url, {
      method: "POST",
      headers,
      body: JSON.stringify(request),
    });

    return leadResponseSchema.parse(response);
  }
}
