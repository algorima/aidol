import type {
  CreateParams,
  CreateResponse,
  GetOneParams,
  GetOneResponse,
  UpdateParams,
  UpdateResponse,
} from "@aioia/core";

import type {
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "@/schemas/aidol";
import type {
  Companion,
  CompanionCreate,
  CompanionUpdate,
} from "@/schemas/companion";

const IMAGE_GENERATION_DELAY_MS = 1500;

class MockCompanionRepository {
  private storage = new Map<string, Companion>();

  create(
    params: CreateParams<CompanionCreate>,
  ): Promise<CreateResponse<Companion>> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const companion: Companion = {
      id,
      name: params.variables.name,
      aidolId: params.variables.aidolId,
      biography: params.variables.biography ?? null,
      profilePictureUrl: params.variables.profilePictureUrl ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.storage.set(id, companion);
    return Promise.resolve({ data: companion });
  }

  update(
    params: UpdateParams<CompanionUpdate>,
  ): Promise<UpdateResponse<Companion>> {
    const id = String(params.id);
    const now = new Date().toISOString();
    const existing = this.storage.get(id) ?? {
      id,
      name: "",
      createdAt: now,
      updatedAt: now,
    };
    const updated: Companion = {
      ...existing,
      ...params.variables,
      updatedAt: now,
    };
    this.storage.set(id, updated);
    return Promise.resolve({ data: updated });
  }

  getOne(params: GetOneParams): Promise<GetOneResponse<Companion>> {
    const id = String(params.id);
    const companion = this.storage.get(id);
    if (!companion) {
      throw new Error(`Companion not found: ${id}`);
    }
    return Promise.resolve({ data: companion });
  }

  async generateImage(
    _request: ImageGenerationRequest,
  ): Promise<ImageGenerationResponse> {
    await new Promise((resolve) =>
      setTimeout(resolve, IMAGE_GENERATION_DELAY_MS),
    );
    return {
      data: {
        imageUrl: "https://placehold.co/400x400/2a2a2a/white?text=AI+Generated",
        width: 1024,
        height: 1024,
        format: "png",
      },
    };
  }
}

let instance: MockCompanionRepository | null = null;

export const getMockCompanionRepository = (): MockCompanionRepository => {
  if (!instance) {
    instance = new MockCompanionRepository();
  }
  return instance;
};
