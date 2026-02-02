import { BaseCrudRepository } from "@aioia/core";

import { assertResourceId } from "../lib/assertResourceId";
import type {
  Companion,
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "../schemas";
import { companionSchema, imageGenerationResponseSchema } from "../schemas";

/**
 * Repository for Companion (member) entities
 *
 * Backend currently returns unwrapped responses (no { data } wrapper).
 * Override CRUD methods to parse raw responses and wrap for callers.
 * TODO: Remove overrides when backend applies { data } wrapper (Sprint 2)
 */
export class CompanionRepository extends BaseCrudRepository<Companion> {
  readonly resource = "companions";

  protected getDataSchema() {
    return companionSchema;
  }

  /**
   * POST /companions — backend returns CompanionPublic directly
   */
  async create<TVariables = Record<string, unknown>>(params: {
    variables: TVariables;
  }): Promise<{ data: Companion }> {
    const url = this.apiService.buildUrl(this.resource);
    const raw = await this.apiService.request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.variables),
    });
    return { data: companionSchema.parse(raw) };
  }

  /**
   * GET /companions/{id} — backend returns CompanionPublic directly
   */
  async getOne(
    params: { id: string | number },
    fetchOptions?: RequestInit,
  ): Promise<{ data: Companion }> {
    assertResourceId(params.id);
    const url = `${this.apiService.buildUrl(this.resource)}/${params.id}`;
    const raw = await this.apiService.request(url, fetchOptions);
    return { data: companionSchema.parse(raw) };
  }

  /**
   * PATCH /companions/{id} — backend returns CompanionPublic directly
   */
  async update<TVariables = Record<string, unknown>>(params: {
    id: string | number;
    variables: TVariables;
  }): Promise<{ data: Companion }> {
    assertResourceId(params.id);
    const url = `${this.apiService.buildUrl(this.resource)}/${params.id}`;
    const raw = await this.apiService.request(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.variables),
    });
    return { data: companionSchema.parse(raw) };
  }

  /**
   * DELETE /companions/{id} — backend returns CompanionPublic directly
   */
  async deleteOne(params: {
    id: string | number;
  }): Promise<{ data: Companion }> {
    assertResourceId(params.id);
    const url = `${this.apiService.buildUrl(this.resource)}/${params.id}`;
    const raw = await this.apiService.request(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return { data: companionSchema.parse(raw) };
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
