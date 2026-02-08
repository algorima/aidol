import { BaseCrudRepository } from "@aioia/core";
import { z } from "zod";

import type { AIdolHighlight, HighlightMessage } from "../schemas";
import { aidolHighlightSchema, highlightMessageSchema } from "../schemas";

export class HighlightRepository extends BaseCrudRepository<AIdolHighlight> {
  readonly resource = "aidol-highlights";

  protected getDataSchema() {
    return aidolHighlightSchema;
  }

  async getMessages(
    highlightId: string,
    fetchOptions?: RequestInit,
  ): Promise<HighlightMessage[]> {
    const url = `${this.apiService.buildUrl(this.resource)}/${highlightId}/messages`;
    const raw = await this.apiService.request(url, fetchOptions);
    return z.array(highlightMessageSchema).parse(raw);
  }
}
