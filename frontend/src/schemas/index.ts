// AIdol schemas (includes image generation)
export {
  aidolCreateResponseSchema,
  aidolSchema,
  imageGenerationResponseSchema,
} from "./aidol";
export type {
  AIdol,
  AIdolCreate,
  AIdolCreateResponse,
  AIdolUpdate,
  ImageGenerationData,
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "./aidol";

// Companion schemas
export { companionSchema } from "./companion";
export type {
  Companion,
  CompanionCreate,
  CompanionStats,
  CompanionUpdate,
  Gender,
  Grade,
  Position,
} from "./companion";
