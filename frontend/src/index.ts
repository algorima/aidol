/**
 * AIdol module - AI idol group creation and chat
 *
 * Entry points:
 * - "aidol" (this file): Server-safe infrastructure (Repository, types, schemas, i18n)
 * - "aidol/client": Client-only components (GroupCreation, HeroSection, etc.)
 *
 * Design Philosophy:
 * Following aioia-core and React RFC #227 pattern:
 * - Main entry exports server-safe code (no React hooks)
 * - Client entry exports UI components with 'use client' directive
 */

// Repository (server-safe, no React hooks)
export { AIdolRepository } from "./repositories/AIdolRepository";
export { ChatroomRepository } from "./repositories/ChatroomRepository";
export type { GenerateResponse } from "./repositories/ChatroomRepository";
export { CompanionRelationshipRepository } from "./repositories/CompanionRelationshipRepository";
export { CompanionRepository } from "./repositories/CompanionRepository";
export { HighlightRepository } from "./repositories/HighlightRepository";
export { LeadsRepository } from "./repositories/LeadsRepository";
export { LocalChatroomIdsRepository } from "./repositories/LocalChatroomIdsRepository";

// Types & Schemas (server-safe)
export type {
  AIdol,
  AIdolCreate,
  AIdolUpdate,
  ImageGenerationData,
  ImageGenerationRequest,
  ImageGenerationResponse,
} from "./schemas/aidol";
export { aidolSchema, imageGenerationResponseSchema } from "./schemas/aidol";

export type { Chatroom, ChatroomCreate, Message } from "./schemas/chatroom";
export {
  chatroomSchema,
  isCompanion,
  isUser,
  messageSchema,
  SenderType,
} from "./schemas/chatroom";

export type {
  Companion,
  CompanionCreate,
  CompanionStats,
  CompanionUpdate,
  Gender,
  Position,
} from "./schemas/companion";
export { companionSchema } from "./schemas/companion";

export type {
  AIdolHighlight,
  HighlightMessage,
  MyGroupHighlightSection,
} from "./schemas/highlight";
export {
  aidolHighlightSchema,
  highlightMessageSchema,
} from "./schemas/highlight";

// i18n - Server-safe exports (JSON resources and constants)
export { AIDOL_NS, aidolTranslations } from "./i18n/translations";
