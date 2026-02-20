"use client";

import clsx from "clsx";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Message, SenderType } from "../../schemas";
import { Loading } from "../Loading";

interface MessageListProps {
  messages: Message[] | undefined;
  companionName: string;
  companionImageUrl?: string | null;
}

/**
 * A component that renders a list of messages.
 */
export function MessageList({
  messages,
  companionName,
  companionImageUrl,
}: MessageListProps) {
  if (!messages) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loading />;
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex min-h-0 w-full flex-1 flex-col-reverse overflow-y-auto p-6">
      <div className="mt-auto" />
      {[...messages].reverse().map((message) => {
        const isUser = message.senderType === SenderType.USER;
        const origIndex = messages.indexOf(message);
        const prev = messages[origIndex - 1];
        const next = messages[origIndex + 1];
        const sameSender = (a: Message, b: Message) =>
          a.senderType === b.senderType;
        const sameMinute = (a: Message, b: Message) =>
          sameSender(a, b) &&
          new Date(a.createdAt).getMinutes() ===
            new Date(b.createdAt).getMinutes();
        const isFirstBySender = !prev || !sameSender(prev, message);
        const isLastByMinute = !next || !sameMinute(message, next);

        return (
          <div
            className={clsx("flex items-end gap-2", {
              "self-end": isUser,
              "mt-4": isFirstBySender && !!prev,
              "mt-2": !isFirstBySender,
            })}
            key={message.id}
          >
            {!isUser && (
              <div className="w-10 shrink-0 self-start">
                {isFirstBySender && (
                  <Image
                    src={companionImageUrl ?? ""}
                    alt={companionName}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                )}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {!isUser && isFirstBySender && (
                <span className="text-body-s text-base-content">
                  {companionName}
                </span>
              )}
              <div
                className={clsx("flex items-end gap-1", {
                  "flex-row-reverse": isUser,
                })}
              >
                <div
                  className={clsx(
                    "text-body-s w-fit max-w-[200px] rounded-lg p-2",
                    {
                      "bg-base-300": isUser,
                      "bg-secondary": !isUser,
                    },
                  )}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    className={clsx("prose max-w-none", {
                      "text-base-content": isUser,
                      "text-secondary-content": !isUser,
                    })}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
                {isLastByMinute && (
                  <span className="text-label-s text-base-content/50">
                    {new Date(message.createdAt).toLocaleTimeString("ko", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
