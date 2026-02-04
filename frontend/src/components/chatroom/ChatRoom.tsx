"use client";

import { Message } from "../../schemas";

import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

interface ChatRoomProps {
  messages: Message[] | undefined;
  onSendMessage: (message: string) => Promise<void>;
}

/**
 * ChatRoom component combining MessageList and MessageInput.
 * Presentational component - data fetching handled by Container (page.tsx).
 */
export function ChatRoom({ messages, onSendMessage }: ChatRoomProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
      </div>
      <MessageInput onSubmit={onSendMessage} />
    </div>
  );
}
