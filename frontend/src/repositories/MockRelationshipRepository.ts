import type {
  GetListParams,
  GetListResponse,
  GetOneParams,
  GetOneResponse,
} from "@aioia/core";

import type { CompanionRelationship } from "@/schemas/companionRelationship";

const now = new Date().toISOString();

const initialRelationships: CompanionRelationship[] = [
  {
    id: "rel-01",
    fromCompanionId: "g-01",
    toCompanionId: "g-02",
    intimacy: 100,
    nickname: "소울메이트",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-02",
    fromCompanionId: "g-01",
    toCompanionId: "g-03",
    intimacy: 90,
    nickname: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-03",
    fromCompanionId: "g-02",
    toCompanionId: "g-04",
    intimacy: 80,
    nickname: "믿음직한 형",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-04",
    fromCompanionId: "g-03",
    toCompanionId: "g-05",
    intimacy: 70,
    nickname: "찐막내즈",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-05",
    fromCompanionId: "g-04",
    toCompanionId: "g-05",
    intimacy: 60,
    nickname: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-06",
    fromCompanionId: "g-01",
    toCompanionId: "g-04",
    intimacy: 45,
    nickname: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-07",
    fromCompanionId: "g-01",
    toCompanionId: "g-05",
    intimacy: 30,
    nickname: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-08",
    fromCompanionId: "g-02",
    toCompanionId: "g-03",
    intimacy: 15,
    nickname: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-09",
    fromCompanionId: "g-02",
    toCompanionId: "g-05",
    intimacy: 45,
    nickname: "댄스듀오",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "rel-10",
    fromCompanionId: "g-03",
    toCompanionId: "g-04",
    intimacy: 60,
    nickname: null,
    createdAt: now,
    updatedAt: now,
  },
];

class MockRelationshipRepository {
  private storage = new Map<string, CompanionRelationship>();

  constructor() {
    // 초기 데이터 로드
    for (const rel of initialRelationships) {
      this.storage.set(rel.id, rel);
    }
  }

  getList(
    params?: GetListParams,
  ): Promise<GetListResponse<CompanionRelationship>> {
    let data = Array.from(this.storage.values());

    // aidolId 필터 (companion들의 관계를 가져올 때)
    if (params?.filters) {
      for (const filter of params.filters) {
        if (filter.field === "companionId" && filter.operator === "eq") {
          const companionId = filter.value as string;
          data = data.filter(
            (r) =>
              r.fromCompanionId === companionId ||
              r.toCompanionId === companionId,
          );
        }
      }
    }

    return Promise.resolve({
      data,
      total: data.length,
    });
  }

  getOne(params: GetOneParams): Promise<GetOneResponse<CompanionRelationship>> {
    const id = String(params.id);
    const relationship = this.storage.get(id);
    if (!relationship) {
      throw new Error(`Relationship not found: ${id}`);
    }
    return Promise.resolve({ data: relationship });
  }

  // 두 멤버 간 관계 조회
  getByCompanions(
    companionId1: string,
    companionId2: string,
  ): Promise<CompanionRelationship | null> {
    const data = Array.from(this.storage.values());
    const relationship = data.find(
      (r) =>
        (r.fromCompanionId === companionId1 &&
          r.toCompanionId === companionId2) ||
        (r.fromCompanionId === companionId2 &&
          r.toCompanionId === companionId1),
    );
    return Promise.resolve(relationship ?? null);
  }

  // 관계 생성
  create(params: {
    fromCompanionId: string;
    toCompanionId: string;
    intimacy: number;
    nickname?: string | null;
  }): Promise<CompanionRelationship> {
    const now = new Date().toISOString();
    const id = `rel-${Date.now()}`;
    const relationship: CompanionRelationship = {
      id,
      fromCompanionId: params.fromCompanionId,
      toCompanionId: params.toCompanionId,
      intimacy: params.intimacy,
      nickname: params.nickname ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.storage.set(id, relationship);
    return Promise.resolve(relationship);
  }

  // 관계 삭제
  delete(id: string): Promise<void> {
    this.storage.delete(id);
    return Promise.resolve();
  }
}

let instance: MockRelationshipRepository | null = null;

export const getMockRelationshipRepository = (): MockRelationshipRepository => {
  if (!instance) {
    instance = new MockRelationshipRepository();
  }
  return instance;
};
