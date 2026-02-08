import { BaseCrudRepository } from "@aioia/core";

import type { AIdolHighlight } from "../schemas";
import { aidolHighlightSchema } from "../schemas";

export class HighlightRepository extends BaseCrudRepository<AIdolHighlight> {
  readonly resource = "aidol-highlights";

  protected getDataSchema() {
    return aidolHighlightSchema;
  }
}
