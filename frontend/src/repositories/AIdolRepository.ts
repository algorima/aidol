import { BaseCrudRepository } from "@aioia/core";

import type {
  AIdol,
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "../schemas";
import { aidolSchema, imageGenerationResponseSchema } from "../schemas";

/**
 * Repository for AIdol (group) entities
 */
export class AIdolRepository extends BaseCrudRepository<AIdol> {
  readonly resource = "aidol/aidols";

  protected getDataSchema() {
    return aidolSchema;
  }

  /**
   * Generate image for AIdol emblem or Companion profile
   */
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
