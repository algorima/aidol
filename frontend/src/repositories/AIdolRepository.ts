import { BaseCrudRepository } from "@aioia/core";

import { assertResourceId } from "../lib/assertResourceId";
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

/**
 * Repository for AIdol (group) entities
 *
 * Backend currently returns unwrapped responses (no { data } wrapper).
 * Override CRUD methods to parse raw responses and wrap for callers.
 * TODO: Remove overrides when backend applies { data } wrapper (Sprint 2)
 */
export class AIdolRepository extends BaseCrudRepository<AIdol> {
  readonly resource = "aidols";

  protected getDataSchema() {
    return aidolSchema;
  }

  /**
   * POST /aidols — backend returns { id } only
   */
  async createAIdol(variables: AIdolCreate): Promise<AIdolCreateResponse> {
    const url = this.apiService.buildUrl(this.resource);
    const raw = await this.apiService.request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    return aidolCreateResponseSchema.parse(raw);
  }

  /**
   * GET /aidols/{id} — backend returns AIdolPublic directly
   */
  async getOne(
    params: { id: string | number },
    fetchOptions?: RequestInit,
  ): Promise<{ data: AIdol }> {
    assertResourceId(params.id);
    const url = `${this.apiService.buildUrl(this.resource)}/${params.id}`;
    const raw = await this.apiService.request(url, fetchOptions);
    return { data: aidolSchema.parse(raw) };
  }

  /**
   * PATCH /aidols/{id} — backend returns AIdolPublic directly
   */
  async update<TVariables = Record<string, unknown>>(params: {
    id: string | number;
    variables: TVariables;
  }): Promise<{ data: AIdol }> {
    assertResourceId(params.id);
    const url = `${this.apiService.buildUrl(this.resource)}/${params.id}`;
    const raw = await this.apiService.request(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.variables),
    });
    return { data: aidolSchema.parse(raw) };
  }

  /**
   * Generate image for AIdol emblem
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
