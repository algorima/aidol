// AIdol schemas (includes image generation)
export { aidolSchema, imageGenerationResponseSchema } from "./aidol";
export type {
  AIdol,
  AIdolCreate,
  AIdolUpdate,
  ImageGenerationData,
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "./aidol";

// Companion schemas
export { companionSchema, POSITIONS } from "./companion";
export type {
  Companion,
  CompanionCreate,
  CompanionStats,
  CompanionUpdate,
  Gender,
  Grade,
  Position,
} from "./companion";
