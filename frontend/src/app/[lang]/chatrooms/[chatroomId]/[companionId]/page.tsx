"use client";

import * as Sentry from "@sentry/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ChatRoom } from "@/components/chatroom";
import { AIDOL_NS } from "@/i18n";
import { getOrCreateClaimToken } from "@/lib/claimToken";
import { ChatroomRepository, CompanionRepository } from "@/repositories";
import { SenderType, type Message } from "@/schemas/chatroom";
import type { Companion } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

interface ChatPageProps {
  params: {
    lang: string;
    chatroomId: string;
    companionId: string;
  };
}

/**
 * 채팅 페이지 (Container)
 * - 메시지 목록 조회 및 전송
 * - AI 응답 생성
 * - UI는 ChatRoom 컴포넌트에 위임
 */
export default function ChatPage({ params }: ChatPageProps): JSX.Element {
  const { lang, chatroomId, companionId } = params;
  const router = useRouter();
  const { t } = useTranslation();

  const [companion, setCompanion] = useState<Companion | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingCompanion, setIsLoadingCompanion] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [companionError, setCompanionError] = useState<Error | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const chatroomRepository = useMemo(
    () => new ChatroomRepository(getApiService()),
    [],
  );

  // Fetch companion on mount
  useEffect(() => {
    void (async () => {
      try {
        setIsLoadingCompanion(true);
        const response = await companionRepository.getOne({ id: companionId });
        setCompanion(response.data);
      } catch (err) {
        setCompanionError(err as Error);
      } finally {
        setIsLoadingCompanion(false);
      }
    })();
  }, [companionId, companionRepository]);

  // Load messages on mount
  useEffect(() => {
    void (async () => {
      try {
        setIsLoadingMessages(true);
        const fetchedMessages = await chatroomRepository.getMessages(
          chatroomId,
          { limit: 100 },
        );
        setMessages(fetchedMessages);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoadingMessages(false);
      }
    })();
  }, [chatroomId, chatroomRepository]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isSending) return;

      // Get claimToken for user identification (auto-generate if missing)
      const claimToken = getOrCreateClaimToken();

      setIsSending(true);
      setError(null);

      // Generate temporary message ID for optimistic update
      const tempMessageId = `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`;

      // Optimistic UI update - add temporary user message
      const tempMessage: Message = {
        id: tempMessageId,
        senderType: SenderType.USER,
        content,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [tempMessage, ...prev]);

      let createdMessage: Message;

      try {
        // Core task: Send user message
        createdMessage = await chatroomRepository.sendMessage(
          chatroomId,
          content,
          claimToken,
        );

        // Replace temporary message with actual message
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempMessageId ? createdMessage : msg)),
        );
      } catch (coreTaskError) {
        // Core task failure: rollback and propagate
        console.error("Failed to send message:", coreTaskError);
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessageId));
        setIsSending(false);
        throw coreTaskError;
      }

      // Secondary task: Generate AI response
      // Failure here doesn't affect user message (already sent)
      try {
        const response = await chatroomRepository.generateResponse(
          chatroomId,
          companionId,
        );

        const aiMessage: Message = {
          id: response.messageId,
          senderType: SenderType.COMPANION,
          content: response.content,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [aiMessage, ...prev]);
      } catch (secondaryTaskError) {
        console.error(
          "AI response failed (message sending was successful):",
          secondaryTaskError,
        );
        Sentry.captureException(secondaryTaskError);
        throw secondaryTaskError;
      } finally {
        setIsSending(false);
      }
    },
    [chatroomId, chatroomRepository, companionId, isSending],
  );

  const handleBack = useCallback(() => {
    router.push(`/${lang}/my/companions/${companionId}`);
  }, [companionId, lang, router]);

  const isLoading = isLoadingMessages || isLoadingCompanion;

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (companionError || !companion) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>
            {companionError?.message ||
              t("companion.notFound", { ns: AIDOL_NS })}
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-base-100 flex h-dvh flex-col">
      {/* Header */}
      <header className="bg-base-200 flex items-center gap-4 px-4 py-3">
        <button
          type="button"
          onClick={handleBack}
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="bg-base-300 w-10 rounded-full">
              {companion.profilePictureUrl ? (
                <Image
                  src={companion.profilePictureUrl}
                  alt={companion.name ?? companion.id}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-lg">
                  {(companion.name ?? companion.id).charAt(0)}
                </div>
              )}
            </div>
          </div>
          <h1 className="font-semibold">{companion.name ?? companion.id}</h1>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-2">
          <div className="alert alert-error">
            <span>{error.message}</span>
          </div>
        </div>
      )}

      {/* Chat Room */}
      <div className="flex-1 overflow-hidden">
        <ChatRoom messages={messages} onSendMessage={handleSendMessage} />
      </div>

      {/* Sending indicator */}
      {isSending && (
        <div className="bg-base-200 px-4 py-2 text-center text-sm opacity-70">
          <span className="loading loading-dots loading-sm" />
        </div>
      )}
    </main>
  );
}
