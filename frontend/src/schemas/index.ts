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

// Chatroom schemas
export {
  chatroomSchema,
  isCompanion,
  isUser,
  messageSchema,
  SenderType,
} from "./chatroom";
export type { Chatroom, ChatroomCreate, Message } from "./chatroom";

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

// Companion Relationship schemas
export { companionRelationshipSchema } from "./companion-relationship";
export type {
  CompanionRelationship,
  CompanionRelationshipCreate,
} from "./companion-relationship";

// Highlight schemas
export { aidolHighlightSchema, highlightMessageSchema } from "./highlight";
export type { AIdolHighlight, HighlightMessage } from "./highlight";

// Lead schemas
export { leadResponseSchema } from "./lead";
export type { LeadRequest, LeadResponse } from "./lead";
