import { BaseCrudRepository } from "@aioia/core";

import type { CompanionRelationship } from "../schemas";
import { companionRelationshipSchema } from "../schemas";

export class CompanionRelationshipRepository extends BaseCrudRepository<CompanionRelationship> {
  readonly resource = "companion-relationships";

  protected getDataSchema() {
    return companionRelationshipSchema;
  }

  async getByFromCompanionId(fromCompanionId: string) {
    return this.getList({
      filters: [
        { field: "fromCompanionId", operator: "eq", value: fromCompanionId },
      ],
    });
  }

  async deleteOne(params: {
    id: string | number;
  }): Promise<{ data: CompanionRelationship }> {
    const url = `${this.apiService.buildUrl(this.resource)}/${params.id}`;
    await this.apiService.request(url, { method: "DELETE" });
    return { data: {} as CompanionRelationship };
  }
}
