import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import type { HighlightMessage } from "@/schemas";

export interface CompanionInfo {
  name: string;
  imageUrl?: string;
}

interface HighlightMessageListProps {
  messages: HighlightMessage[];
  companions: Record<string, CompanionInfo>;
}

function CompanionMessage({
  content,
  companion,
}: {
  content: string;
  companion: CompanionInfo;
}) {
  return (
    <div className="flex items-start gap-2">
      {companion.imageUrl ? (
        <Image
          src={companion.imageUrl}
          alt={companion.name}
          width={40}
          height={40}
          className="border-base-300 size-10 shrink-0 rounded-lg border object-cover"
        />
      ) : (
        <div className="border-base-300 bg-base-200 flex size-10 shrink-0 items-center justify-center rounded-lg border">
          <UserIcon className="text-neutral size-5" />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="text-body-s text-base-content">{companion.name}</span>
        <div className="bg-secondary max-w-[263px] overflow-hidden rounded-xl p-2">
          <p className="text-body-s text-secondary-content">{content}</p>
        </div>
      </div>
    </div>
  );
}

export function HighlightMessageList({
  messages,
  companions,
}: HighlightMessageListProps) {
  return (
    <div className="flex flex-col gap-4">
      {messages
        .filter(
          (m): m is HighlightMessage & { companionId: string } =>
            m.companionId !== null,
        )
        .map((message) => (
          <CompanionMessage
            key={message.id}
            content={message.content}
            companion={companions[message.companionId]}
          />
        ))}
    </div>
  );
}
