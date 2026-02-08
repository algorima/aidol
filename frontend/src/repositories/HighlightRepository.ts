import { BaseCrudRepository } from "@aioia/core";

import type { Highlight, HighlightMessage } from "../schemas/highlight";
import { highlightMessageSchema, highlightSchema } from "../schemas/highlight";

export class HighlightRepository extends BaseCrudRepository<Highlight> {
  readonly resource = "aidol-highlights";

  protected getDataSchema() {
    return highlightSchema;
  }

  async getByAidolId(aidolId: string) {
    return this.getList({
      filters: [{ field: "aidol_id", operator: "eq", value: aidolId }],
    });
  }

  async getMessages(
    highlightId: string,
    fetchOptions?: RequestInit,
  ): Promise<{ data: HighlightMessage[] }> {
    const url = this.apiService.buildUrl(
      `${this.resource}/${highlightId}/messages`,
    );
    const raw = await this.apiService.request(url, fetchOptions);
    return { data: highlightMessageSchema.array().parse(raw) };
  }
}
