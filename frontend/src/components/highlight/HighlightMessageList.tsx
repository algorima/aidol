import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import type { HighlightMessage } from "@/schemas";

interface CompanionInfo {
  name: string;
  imageUrl?: string;
}

interface HighlightMessageListProps {
  messages: HighlightMessage[];
  companions: Record<string, CompanionInfo>;
}

function InterviewerMessage({ content }: { content: string }) {
  const { t } = useTranslation("aidol");

  return (
    <div className="flex flex-col items-end gap-2">
      <span className="text-body-s text-base-content">
        {t("highlight.interviewer")}
      </span>
      <div className="w-fit max-w-[250px] overflow-hidden rounded-xl bg-black p-2">
        <p className="text-body-s text-neutral-content">{content}</p>
      </div>
    </div>
  );
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
        <div className="bg-secondary w-fit max-w-[250px] overflow-hidden rounded-xl p-2">
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
      {messages.map((message) => {
        if (message.companionId === null) {
          return (
            <InterviewerMessage key={message.id} content={message.content} />
          );
        }

        return (
          <CompanionMessage
            key={message.id}
            content={message.content}
            companion={companions[message.companionId]}
          />
        );
      })}
    </div>
  );
}
