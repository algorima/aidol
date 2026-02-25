import { BaseCrudRepository } from "@aioia/core";

import { MAX_MEMBERS } from "../constants/companion";
import type {
  Companion,
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "../schemas";
import { companionSchema, imageGenerationResponseSchema } from "../schemas";

/** CRUD operations use BaseCrudRepository (wrapped { data: T } responses) */
export class CompanionRepository extends BaseCrudRepository<Companion> {
  readonly resource = "companions";

  protected getDataSchema() {
    return companionSchema;
  }

  async getByAidolId(aidolId: string) {
    return this.getList({
      pagination: { pageSize: MAX_MEMBERS },
      filters: [{ field: "aidol_id", operator: "eq", value: aidolId }],
    });
  }

  async generateImage(
    request: ImageGenerationRequest,
    fetchOptions?: RequestInit,
  ): Promise<ImageGenerationResponse> {
    const url = this.apiService.buildUrl(`${this.resource}/images`);
    const rawResponse = await this.apiService.request(url, {
      ...fetchOptions,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    return this.validateResponse(rawResponse, imageGenerationResponseSchema);
  }
}
