import type { ImageGenerationResponse } from "@/schemas/aidol";
import type { Companion, CompanionUpdate } from "@/schemas/companion";

type PartialCompanion = Partial<Companion>;

const IMAGE_GENERATION_DELAY_MS = 1500;

class MockCompanionRepository {
  private storage = new Map<string, PartialCompanion>();

  createCompanion(aidolId: string): { id: string; aidolId: string } {
    const id = crypto.randomUUID();
    this.storage.set(id, { id, aidolId });
    return { id, aidolId };
  }

  updateCompanion(id: string, data: CompanionUpdate): PartialCompanion {
    const existing = this.storage.get(id) ?? { id };
    const updated = { ...existing, ...data };
    this.storage.set(id, updated);
    return updated;
  }

  async generateImage(_prompt: string): Promise<ImageGenerationResponse> {
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

  getCompanion(id: string): PartialCompanion | undefined {
    return this.storage.get(id);
  }
}

let instance: MockCompanionRepository | null = null;

export const getMockCompanionRepository = (): MockCompanionRepository => {
  if (!instance) {
    instance = new MockCompanionRepository();
  }
  return instance;
};
