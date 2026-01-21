import { BaseCrudRepository } from "@aioia/core";

import type { Companion } from "../schemas";
import { companionSchema } from "../schemas";

/**
 * Repository for Companion (member) entities
 */
export class CompanionRepository extends BaseCrudRepository<Companion> {
  readonly resource = "aidol/companions";

  protected getDataSchema() {
    return companionSchema;
  }
}
