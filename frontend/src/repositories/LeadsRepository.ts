import type { LeadRequest, LeadResponse } from "@/schemas";
import { leadResponseSchema } from "@/schemas";
import type { ApiService } from "@/services/ApiService";

export class LeadsRepository {
  private readonly resource = "leads";

  constructor(private readonly apiService: ApiService) {}

  async create(request: LeadRequest): Promise<LeadResponse> {
    const url = this.apiService.buildUrl(this.resource);
    const response = await this.apiService.request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    return leadResponseSchema.parse(response);
  }
}
