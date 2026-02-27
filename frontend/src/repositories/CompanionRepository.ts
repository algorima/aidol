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

  /** PUBLISHED 상태의 멤버만 최대 MAX_MEMBERS명까지 조회 */
  async getByAidolId(aidolId: string) {
    return this.getList({
      pagination: { pageSize: MAX_MEMBERS },
      filters: [
        { field: "aidolId", operator: "eq", value: aidolId },
        { field: "status", operator: "eq", value: "PUBLISHED" },
      ],
    });
  }

  async generateImage(
    request: ImageGenerationRequest,
    fetchOptions?: RequestInit,
  ): Promise<ImageGenerationResponse> {
    const trimmed = request.prompt.trim();
    if (!trimmed) {
      throw new Error("promptEmpty");
    }
    if (trimmed.length > 200) {
      throw new Error("promptTooLong");
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
