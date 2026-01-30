import { z } from "zod";

import type { ApiService } from "@/services/ApiService";

export interface LeadRequest {
  aidolId: string;
  email: string;
}

export const leadResponseSchema = z.object({
  email: z.string(),
});

export type LeadResponse = z.infer<typeof leadResponseSchema>;

/**
 * Repository for Leads (newsletter subscription)
 */
export class LeadsRepository {
  private readonly resource = "leads";

  constructor(private readonly apiService: ApiService) {}

  async create(request: LeadRequest): Promise<LeadResponse> {
    const url = this.apiService.buildUrl(this.resource);
    const response = await this.apiService.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    return leadResponseSchema.parse(response);
  }
}
