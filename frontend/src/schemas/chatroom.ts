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
  companionId: z.string(),
  name: z.string(),
  language: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export interface Chatroom extends BaseRecord {
  id: string;
  companionId: string;
  name: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatroomCreate {
  companionId: string;
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

export enum MessageStatus {
  SENDING = "SENDING",
  SENT = "SENT",
  ERROR = "ERROR",
}

export const messageSchema = z.object({
  id: z.string(),
  senderType: z.nativeEnum(SenderType),
  content: z.string(),
  createdAt: z.string(),
  companionId: z.string().optional(),
  anonymousId: z.string().optional(),
});

export interface Message extends BaseRecord {
  id: string;
  senderType: SenderType;
  content: string;
  createdAt: string;
  companionId?: string;
  anonymousId?: string;
  status?: MessageStatus;
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
