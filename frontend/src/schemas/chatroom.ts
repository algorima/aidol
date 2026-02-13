/**
 * Chatroom schemas
 * Matches backend aidol/schemas/chatroom.py definitions
 */

import type { BaseRecord } from "@aioia/core";
import { z } from "zod";

// =============================================================================
// Chatroom Schemas
// =============================================================================

export const chatroomSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface Chatroom extends BaseRecord {
  id: string;
  name: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatroomCreate {
  name: string;
  language?: string;
}

// =============================================================================
// Message Schemas
// =============================================================================

export enum SenderType {
  USER = "USER",
  COMPANION = "COMPANION",
}

export const messageSchema = z.object({
  id: z.string(),
  senderType: z.nativeEnum(SenderType),
  content: z.string(),
  createdAt: z.string(),
});

export interface Message extends BaseRecord {
  id: string;
  senderType: SenderType;
  content: string;
  createdAt: string;
}

/**
 * Type guard to check if message is from user
 */
export const isUser = (message: Message): boolean => {
  return message.senderType === SenderType.USER;
};

/**
 * Type guard to check if message is from companion
 */
export const isCompanion = (message: Message): boolean => {
  return message.senderType === SenderType.COMPANION;
};
