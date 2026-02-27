import { BaseCrudRepository } from "@aioia/core";
import { z } from "zod";

import {
  chatroomSchema,
  messageSchema,
  type Chatroom,
  type Message,
} from "../schemas";

/**
 * Schema for "my chatrooms" list item (GET /me/chatrooms response)
 */
const lastMessageSchema = z.object({
  content: z.string(),
  createdAt: z.string(),
});

const _myChatroomItemSchema = z.object({
  id: z.string(),
  companionId: z.string(),
  lastMessage: lastMessageSchema.nullable(),
});

export interface MyChatroomLastMessage {
  content: string;
  createdAt: string;
}

export interface MyChatroomItem {
  id: string;
  companionId: string;
  lastMessage: MyChatroomLastMessage | null;
}

/**
 * Response schema for generate AI response endpoint
 */
const generateResponseSchema = z.object({
  messageId: z.string(),
  content: z.string(),
});

export interface GenerateResponse {
  messageId: string;
  content: string;
}

/**
 * Repository for Chatroom entities
 * Handles chatroom CRUD and message operations
 */
export class ChatroomRepository extends BaseCrudRepository<Chatroom> {
  readonly resource = "chatrooms";

  protected getDataSchema() {
    return chatroomSchema;
  }

  /**
   * Get messages from a chatroom
   * GET /chatrooms/{id}/messages
   */
  async getMessages(
    chatroomId: string,
    options?: { limit?: number; offset?: number },
    fetchOptions?: RequestInit,
  ): Promise<Message[]> {
    const params = new URLSearchParams();
    if (options?.limit !== undefined) {
      params.set("limit", options.limit.toString());
    }
    if (options?.offset !== undefined) {
      params.set("offset", options.offset.toString());
    }

    const queryString = params.toString();
    const url = this.apiService.buildUrl(
      `${this.resource}/${chatroomId}/messages${queryString ? `?${queryString}` : ""}`,
    );

    const rawResponse = await this.apiService.request(url, fetchOptions);
    return this.validateResponse(rawResponse, z.array(messageSchema));
  }

  /**
   * Send a message to a chatroom
   * POST /chatrooms/{id}/messages
   *
   * Anonymous ID is automatically sent via httpOnly cookie.
   *
   * @param chatroomId - The chatroom ID
   * @param content - The message content
   * @param fetchOptions - Optional fetch options
   */
  async sendMessage(
    chatroomId: string,
    content: string,
    fetchOptions?: RequestInit,
  ): Promise<Message> {
    const url = this.apiService.buildUrl(
      `${this.resource}/${chatroomId}/messages`,
    );

    const rawResponse = await this.apiService.request(url, {
      ...fetchOptions,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, senderType: "USER" }),
    });

    return this.validateResponse(rawResponse, messageSchema);
  }

  /**
   * Generate AI response for a chatroom with a specific companion
   * POST /chatrooms/{id}/companions/{companionId}/response
   */
  async generateResponse(
    chatroomId: string,
    companionId: string,
    fetchOptions?: RequestInit,
  ): Promise<GenerateResponse> {
    const url = this.apiService.buildUrl(
      `${this.resource}/${chatroomId}/companions/${companionId}/response`,
    );

    const rawResponse = await this.apiService.request(url, {
      ...fetchOptions,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    return this.validateResponse(rawResponse, generateResponseSchema);
  }

  /**
   * Generate initial AI response for an empty chatroom
   * POST /chatrooms/{id}/companions/{companionId}/initial-response
   *
   * Only works for chatrooms with no messages.
   * Returns 409 Conflict if the chatroom already has messages.
   */
  async generateInitialResponse(
    chatroomId: string,
    companionId: string,
    fetchOptions?: RequestInit,
  ): Promise<GenerateResponse> {
    const url = this.apiService.buildUrl(
      `${this.resource}/${chatroomId}/companions/${companionId}/initial-response`,
    );

    const rawResponse = await this.apiService.request(url, {
      ...fetchOptions,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    return this.validateResponse(rawResponse, generateResponseSchema);
  }

  /**
   * Get the current user's chatroom list
   * TODO: GET /me/chatrooms — replace mock when API is available
   */
  async getMyChatrooms(): Promise<MyChatroomItem[]> {
    // TODO: Replace mock with API call when available
    // const url = this.apiService.buildUrl("me/chatrooms");
    // const rawResponse = await this.apiService.request(url);
    // return this.validateResponse(rawResponse, z.array(_myChatroomItemSchema));
    return MOCK_MY_CHATROOMS;
  }
}

// TODO: Remove when API is available
const MOCK_MY_CHATROOMS: MyChatroomItem[] = [
  {
    id: "mock-chatroom-1",
    companionId: "mock-companion-1",
    lastMessage: {
      content: "안녕하세요! 오늘 컨디션은 어때요?",
      createdAt: new Date(Date.now() - 30 * 1000).toISOString(),
    },
  },
  {
    id: "mock-chatroom-2",
    companionId: "mock-companion-2",
    lastMessage: {
      content: "다음에 또 이야기해요!",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: "mock-chatroom-3",
    companionId: "mock-companion-3",
    lastMessage: {
      content: "내일 연습 때 봐요!",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: "mock-chatroom-4",
    companionId: "mock-companion-4",
    lastMessage: null,
  },
];
