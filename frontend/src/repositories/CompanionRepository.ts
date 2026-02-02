import { BaseCrudRepository } from "@aioia/core";

import type {
  Companion,
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "../schemas";
import { companionSchema, imageGenerationResponseSchema } from "../schemas";

/**
 * Repository for Companion (member) entities
 */
export class CompanionRepository extends BaseCrudRepository<Companion> {
  readonly resource = "aidol/companions";

  protected getDataSchema() {
    return companionSchema;
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
