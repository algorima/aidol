import { BaseCrudRepository } from "@aioia/core";
import { z } from "zod";

import type { AIdolHighlight, HighlightMessage } from "../schemas";
import { aidolHighlightSchema, highlightMessageSchema } from "../schemas";

export class HighlightRepository extends BaseCrudRepository<AIdolHighlight> {
  readonly resource = "aidol-highlights";

  protected getDataSchema() {
    return aidolHighlightSchema;
  }

  /**
   * Get messages from a highlight
   * GET /aidol-highlights/{id}/messages
   */
  async getMessages(highlightId: string): Promise<HighlightMessage[]> {
    const url = this.apiService.buildUrl(
      `${this.resource}/${highlightId}/messages`,
    );
    const rawResponse = await this.apiService.request(url);
    return this.validateResponse(rawResponse, z.array(highlightMessageSchema));
  }
}
