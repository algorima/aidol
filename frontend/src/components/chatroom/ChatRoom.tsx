"use client";

import { Message } from "../../schemas";

import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

interface ChatRoomProps {
  messages: Message[] | undefined;
  companionName: string;
  companionImageUrl?: string | null;
  onSendMessage: (message: string) => Promise<void>;
}

/**
 * ChatRoom component combining MessageList and MessageInput.
 * Presentational component - data fetching handled by Container (page.tsx).
 */
export function ChatRoom({
  messages,
  companionName,
  companionImageUrl,
  onSendMessage,
}: ChatRoomProps) {
  return (
    <div className="bg-base-100 text-base-content flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <MessageList
          messages={messages}
          companionName={companionName}
          companionImageUrl={companionImageUrl}
        />
      </div>
      <MessageInput onSubmit={onSendMessage} />
    </div>
  );
}
