import { BaseCrudRepository } from "@aioia/core";

import type { CompanionRelationship } from "../schemas";
import { companionRelationshipSchema } from "../schemas";

export class CompanionRelationshipRepository extends BaseCrudRepository<CompanionRelationship> {
  readonly resource = "companion-relationships";

  protected getDataSchema() {
    return companionRelationshipSchema;
  }
}
