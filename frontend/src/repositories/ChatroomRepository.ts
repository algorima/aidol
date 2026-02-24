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
const myChatroomItemSchema = z.object({
  id: z.string(),
  companionId: z.string(),
  lastMessage: z.string().nullable(),
});

export interface MyChatroomItem {
  id: string;
  companionId: string;
  lastMessage: string | null;
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
   * Get the current user's chatroom list
   * TODO: GET /me/chatrooms — replace stub when feat/my-chatrooms merges
   */
  getMyChatrooms(): Promise<MyChatroomItem[]> {
    // TODO: Uncomment when API is available
    // const url = this.apiService.buildUrl("me/chatrooms");
    // const rawResponse = await this.apiService.request(url);
    // return this.validateResponse(rawResponse, z.array(myChatroomItemSchema));
    void myChatroomItemSchema; // keep schema referenced until API integration
    return Promise.resolve([]);
  }
}
