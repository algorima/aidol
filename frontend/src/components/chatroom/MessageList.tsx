"use client";

import { useEffect, useMemo, useRef } from "react";

import { Message, MessageStatus, SenderType } from "../../schemas";
import { Loading } from "../Loading";

import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

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
      {isTyping && (
        <TypingIndicator
          newestMessage={expanded[0]}
          companionName={companionName}
          companionImageUrl={companionImageUrl}
        />
      )}
      {expanded.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          prev={expanded[index - 1]}
          next={expanded[index + 1]}
          companionName={companionName}
          companionImageUrl={companionImageUrl}
          onResend={onResend}
          onRetryGenerate={onRetryGenerate}
        />
      ))}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {isLoadingMore && <Loading />}
        </div>
      )}
    </div>
  );
}
