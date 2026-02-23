"use client";

import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Message, MessageStatus, SenderType } from "../../schemas";
import { Loading } from "../Loading";

const MAX_BUBBLES = 3;

/**
 * Split companion messages by \n\n into separate bubbles (max 3).
 * User messages are kept as-is.
 */
const expandMessages = (messages: Message[]): Message[] =>
  messages.flatMap((message) => {
    if (message.senderType !== SenderType.COMPANION) return [message];
    if (
      message.status === MessageStatus.ERROR ||
      message.status === MessageStatus.SENDING
    )
      return [message];
    const paragraphs = message.content.split("\n\n");
    if (paragraphs.length <= 1) return [message];

    const bubbles =
      paragraphs.length <= MAX_BUBBLES
        ? paragraphs
        : [...paragraphs.slice(0, 2), paragraphs.slice(2).join(" ")];

    return bubbles.reverse().map((content, i) => ({
      ...message,
      id: `${message.id}_${i}`,
      content,
    }));
  });

interface MessageListProps {
  messages: Message[] | undefined;
  companionName: string;
  companionImageUrl?: string | null;
  isTyping?: boolean;
  onResend?: (message: Message) => void;
  onRetryGenerate?: (message: Message) => void;
}

/**
 * A component that renders a list of messages.
 */
export function MessageList({
  messages,
  companionName,
  companionImageUrl,
  isTyping = false,
  onResend,
  onRetryGenerate,
}: MessageListProps) {
  const expanded = useMemo(
    () => (messages ? expandMessages(messages) : undefined),
    [messages],
  );

  if (!expanded) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loading />;
      </div>
    );
  }

  return (
    <div className="bg-base-100 flex min-h-0 w-full flex-1 flex-col-reverse overflow-y-auto p-6">
      <div className="mt-auto" />
      {isTyping &&
        (() => {
          const newestMessage = expanded[0];
          const showAvatar =
            !newestMessage || newestMessage.senderType !== SenderType.COMPANION;
          return (
            <div
              className={clsx(
                "flex items-end gap-2",
                showAvatar ? "mt-4" : "mt-2",
              )}
            >
              <div className="w-10 shrink-0 self-start">
                {showAvatar && (
                  <Image
                    src={companionImageUrl ?? ""}
                    alt={companionName}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                {showAvatar && (
                  <span className="text-body-s text-base-content">
                    {companionName}
                  </span>
                )}
                <div className="text-body-s bg-base-400 text-base-content w-fit rounded-lg p-2">
                  작성중...
                </div>
              </div>
            </div>
          );
        })()}
      {expanded.map((message) => {
        const isUser = message.senderType === SenderType.USER;
        const origIndex = expanded.indexOf(message);
        const prev = expanded[origIndex - 1];
        const next = expanded[origIndex + 1];
        const sameSender = (a: Message, b: Message) =>
          a.senderType === b.senderType;
        const sameMinute = (a: Message, b: Message) =>
          sameSender(a, b) &&
          new Date(a.createdAt).getMinutes() ===
            new Date(b.createdAt).getMinutes();
        const isFirstBySender = !prev || !sameSender(prev, message);
        const isLastBySender = !next || !sameSender(message, next);
        const isFirstByMinute = !prev || !sameMinute(prev, message);

        const isCompanionError =
          !isUser && message.status === MessageStatus.ERROR;
        const isCompanionRetrying =
          !isUser && message.status === MessageStatus.SENDING;

        return (
          <div
            className={clsx("flex items-end gap-2", {
              "self-end": isUser,
              "mb-4": isFirstBySender && !!prev,
              "mb-2": !isFirstBySender,
            })}
            key={message.id}
          >
            {!isUser && (
              <div className="w-10 shrink-0 self-start">
                {isLastBySender && (
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
              {!isUser && isLastBySender && (
                <span className="text-body-s text-base-content">
                  {companionName}
                </span>
              )}
              {isCompanionError || isCompanionRetrying ? (
                <div className="border-base-400 bg-base-200 flex max-w-[200px] flex-col gap-2 rounded-lg border p-2">
                  <span className="text-body-s text-base-content">
                    {isCompanionRetrying
                      ? "작성중..."
                      : "생각이 조금 길어졌어요🥺"}
                  </span>
                  <button
                    className="bg-base-300 text-label-l text-base-content flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-1.5 shadow-sm"
                    onClick={() => onRetryGenerate?.(message)}
                    disabled={isCompanionRetrying}
                  >
                    {isCompanionRetrying ? (
                      <span className="loading loading-spinner loading-sm text-primary" />
                    ) : (
                      "다시 불러오기"
                    )}
                  </button>
                </div>
              ) : (
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
                      className={clsx("prose prose-sm max-w-none", {
                        "text-base-content": isUser,
                        "text-secondary-content": !isUser,
                      })}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  {message.status === MessageStatus.ERROR ? (
                    <button
                      className="bg-error text-error-content flex cursor-pointer items-center gap-1 rounded-lg p-2"
                      onClick={() => onResend?.(message)}
                    >
                      <ArrowPathIcon className="size-4" />
                      <span className="text-label-s">재전송</span>
                    </button>
                  ) : message.status === MessageStatus.SENDING ? (
                    <PaperAirplaneIcon className="text-base-400 size-4 rotate-180" />
                  ) : (
                    isFirstByMinute && (
                      <span className="text-label-s text-base-content/50">
                        {new Date(message.createdAt).toLocaleTimeString("ko", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
