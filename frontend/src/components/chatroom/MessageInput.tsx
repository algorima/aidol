"use client";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

import { TextInput } from "../group-creation/TextInput";

interface MessageInputProps {
  onSubmit: (message: string) => Promise<void>;
}

/**
 * A reusable message input component for sending messages.
 */
export function MessageInput({ onSubmit }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (message.trim()) {
      setMessage("");
      await onSubmit(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 border-base-400 flex items-end gap-2 border-t px-4 pt-2 pb-6"
    >
      <div className="flex-1">
        <TextInput
          value={message}
          onChange={setMessage}
          placeholder="Enter your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void handleSubmit();
            }
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-square btn-primary mb-1 rounded-lg"
      >
        <ArrowUpIcon className="size-3" stroke-width="2.5" />
      </button>
    </form>
  );
}
