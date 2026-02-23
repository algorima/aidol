"use client";

import { ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Message, MessageStatus, SenderType } from "../../schemas";
import { Loading } from "../Loading";

import { ErrorBubble } from "./ErrorBubble";

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
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
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
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}: MessageListProps) {
  const { t } = useTranslation("aidol");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const expanded = useMemo(
    () => (messages ? expandMessages(messages) : undefined),
    [messages],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = scrollRef.current;
    if (!sentinel || !root || !onLoadMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore();
        }
      },
      { root, rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoadingMore]);

  if (!expanded) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loading />;
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="bg-base-100 flex min-h-0 w-full flex-1 flex-col-reverse overflow-y-auto p-6"
    >
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
                  {t("chat.typing")}
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
                <ErrorBubble
                  isRetrying={isCompanionRetrying}
                  onRetry={() => onRetryGenerate?.(message)}
                />
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
                      <span className="text-label-s">{t("chat.resend")}</span>
                    </button>
                  ) : message.status === MessageStatus.SENDING ? (
                    <PaperAirplaneIcon className="text-base-400 size-4 rotate-180" />
                  ) : (
                    isFirstByMinute && (
                      <span className="text-label-s text-base-content/50">
                        {(() => {
                          const d = new Date(message.createdAt);
                          const h = d.getHours();
                          const period =
                            h < 12 ? t("chat.time.am") : t("chat.time.pm");
                          return t("chat.time.format", {
                            period,
                            hour: String(h % 12 || 12),
                            minute: String(d.getMinutes()).padStart(2, "0"),
                          });
                        })()}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {isLoadingMore && <Loading />}
        </div>
      )}
    </div>
  );
}
