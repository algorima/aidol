import { BaseCrudRepository } from "@aioia/core";

import type { AIdolHighlight, HighlightMessage } from "../schemas";
import { aidolHighlightSchema, highlightMessageSchema } from "../schemas";

export class HighlightRepository extends BaseCrudRepository<AIdolHighlight> {
  readonly resource = "highlights";

  protected getDataSchema() {
    return aidolHighlightSchema;
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
