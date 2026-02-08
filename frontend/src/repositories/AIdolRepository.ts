import { BaseCrudRepository } from "@aioia/core";

import type {
  AIdol,
  AIdolCreate,
  AIdolCreateResponse,
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "../schemas";
import {
  aidolCreateResponseSchema,
  aidolSchema,
  imageGenerationResponseSchema,
} from "../schemas";

export class AIdolRepository extends BaseCrudRepository<AIdol> {
  readonly resource = "aidols";

  protected getDataSchema() {
    return aidolSchema;
  }

  async createAIdol(variables: AIdolCreate): Promise<AIdolCreateResponse> {
    const url = this.apiService.buildUrl(this.resource);
    const raw = (await this.apiService.request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    })) as { data: unknown };
    return aidolCreateResponseSchema.parse(raw.data);
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
