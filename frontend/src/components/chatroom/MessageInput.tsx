"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

interface MessageInputProps {
  onSubmit: (message: string) => Promise<void>;
}

/**
 * A reusable message input component for sending messages.
 */
export function MessageInput({ onSubmit }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      await onSubmit(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
          className="input bg-neutral/30 text-base-content placeholder:text-base-content focus:border-primary w-full pr-12"
        />
        <button
          type="submit"
          className="btn btn-circle btn-ghost text-primary hover:bg-primary hover:text-primary-content absolute top-1/2 right-2 -translate-y-1/2"
        >
          <PaperAirplaneIcon className="size-6" />
        </button>
      </div>
    </form>
  );
}
