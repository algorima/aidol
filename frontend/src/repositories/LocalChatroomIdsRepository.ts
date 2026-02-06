import { z } from "zod";

const STORAGE_KEY = "aidol_chatroom_ids";
const schema = z.record(z.string(), z.string());

const readStorage = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};

  try {
    const parsed = JSON.parse(stored);
    const result = schema.safeParse(parsed);
    if (result.success) {
      return result.data;
    }
    console.warn(`[LocalChatroomIdsRepository] Invalid data, resetting`);
    return {};
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn(`[LocalChatroomIdsRepository] Failed to parse, resetting`);
      return {};
    }
    throw error;
  }
};

const writeStorage = (data: Record<string, string>): void => {
  if (typeof window === "undefined") {
    throw new Error(
      "LocalChatroomIdsRepository write operations can only be called on the client side.",
    );
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Repository for managing chatroom IDs in localStorage.
 * Maps companionId to chatroomId for persistence across sessions.
 */
export const LocalChatroomIdsRepository = {
  getChatroomId(companionId: string): string | null {
    const data = readStorage();
    return data[companionId] ?? null;
  },

  setChatroomId(companionId: string, chatroomId: string): void {
    const data = readStorage();
    data[companionId] = chatroomId;
    writeStorage(data);
  },

  removeChatroomId(companionId: string): void {
    const data = readStorage();
    delete data[companionId];
    writeStorage(data);
  },
};
