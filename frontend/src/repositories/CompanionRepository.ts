import { BaseCrudRepository } from "@aioia/core";

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
      filters: [{ field: "aidol_id", operator: "eq", value: aidolId }],
    });
  }

  async generateImage(
    request: ImageGenerationRequest,
    fetchOptions?: RequestInit,
  ): Promise<ImageGenerationResponse> {
    const trimmed = request.prompt.trim();
    if (!trimmed) {
      throw new Error("Prompt is required");
    }
    if (trimmed.length > 200) {
      throw new Error("Prompt must be 200 characters or less");
    }

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
