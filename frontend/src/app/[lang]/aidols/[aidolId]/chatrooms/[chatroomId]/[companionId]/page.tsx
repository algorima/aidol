"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { MessageInput } from "@/client";
import { ChatHeader, MessageList } from "@/components/chatroom";
import { getCurrentActivity } from "@/lib/activity";
import { getParticle } from "@/lib/koreanParticle";
import { ChatroomRepository, CompanionRepository } from "@/repositories";
import { Message, MessageStatus, SenderType } from "@/schemas";
import type { Companion } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

const PAGE_SIZE = 100;

export default function Chatpage() {
  const params = useParams<{
    lang: string;
    aidolId: string;
    chatroomId: string;
    companionId: string;
  }>();
  const { chatroomId, companionId, lang, aidolId } = params;
  const router = useRouter();
  const [companion, setCompanion] = useState<Companion | null>(null);
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [isTyping, setIsTyping] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { t } = useTranslation("aidol");
  const { showToast } = useToast();

  const chatroomRepo = useMemo(
    () => new ChatroomRepository(getApiService()),
    [],
  );
  const companionRepo = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  useEffect(() => {
    void (async () => {
      const [, companionResult] = await Promise.allSettled([
        (async () => {
          try {
            const fetched = await chatroomRepo.getMessages(chatroomId, {
              limit: PAGE_SIZE,
            });
            setMessages(fetched);
            if (fetched.length < PAGE_SIZE) setHasMore(false);
          } catch (error) {
            console.error("Failed to load messages:", error);
            showToast(t("common.error.load"), "error");
            setMessages([]);
            setHasMore(false);
          }
        })(),
        companionRepo.getOne({ id: companionId }),
      ]);

      if (companionResult.status === "fulfilled") {
        setCompanion(companionResult.value.data);
      } else {
        console.error("Failed to load companion:", companionResult.reason);
        showToast(t("common.error.load"), "error");
      }
    })();
  }, [chatroomId, chatroomRepo, companionId, companionRepo, showToast, t]);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const offset = messages?.length ?? 0;
      const fetched = await chatroomRepo.getMessages(chatroomId, {
        limit: PAGE_SIZE,
        offset,
      });
      setMessages((prev) => [...(prev ?? []), ...fetched]);
      if (fetched.length < PAGE_SIZE) setHasMore(false);
    } catch (error) {
      console.error("Failed to load more messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, messages?.length, chatroomRepo, chatroomId]);

  const delay = useCallback(
    (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
    [],
  );

  const displayBubbles = useCallback(
    async (generated: { messageId: string; content: string }) => {
      const createdAt = new Date().toISOString();
      const paragraphs = generated.content.split("\n\n");
      const bubbles =
        paragraphs.length <= 3
          ? paragraphs
          : [...paragraphs.slice(0, 2), paragraphs.slice(2).join(" ")];

      for (let i = 0; i < bubbles.length; i++) {
        if (i !== 0) {
          setIsTyping(true);
          await delay(3000);
        }

        const aiMessage: Message = {
          id: `${generated.messageId}_${i}`,
          senderType: SenderType.COMPANION,
          content: bubbles[i],
          createdAt,
        };
        setMessages((prev) => [aiMessage, ...(prev ?? [])]);
        setIsTyping(false);
      }
    },
    [delay],
  );

  const generateWithTyping = useCallback(async () => {
    try {
      const response = chatroomRepo.generateResponse(chatroomId, companionId);
      setIsTyping(true);
      const [generated] = await Promise.all([response, delay(3000)]);
      await displayBubbles(generated);
    } catch (error) {
      console.error("Failed to generate AI response:", error);
      setIsTyping(false);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        senderType: SenderType.COMPANION,
        content: "",
        createdAt: new Date().toISOString(),
        status: MessageStatus.ERROR,
      };
      setMessages((prev) => [errorMessage, ...(prev ?? [])]);
    }
  }, [chatroomId, companionId, chatroomRepo, delay, displayBubbles]);

  const sendAndGenerate = useCallback(
    async (content: string, tempId: string) => {
      try {
        const userMessage = await chatroomRepo.sendMessage(chatroomId, content);
        setMessages((prev) =>
          prev?.map((m) =>
            m.id === tempId
              ? { ...userMessage, status: MessageStatus.SENT }
              : m,
          ),
        );
      } catch (error) {
        console.error("Failed to send message:", error);
        setMessages((prev) =>
          prev?.map((m) =>
            m.id === tempId ? { ...m, status: MessageStatus.ERROR } : m,
          ),
        );
        return;
      }

      await generateWithTyping();
    },
    [chatroomId, chatroomRepo, generateWithTyping],
  );

  const handleRetryGenerate = useCallback(
    (errorMsg: Message) => {
      setMessages((prev) =>
        prev?.map((m) =>
          m.id === errorMsg.id ? { ...m, status: MessageStatus.SENDING } : m,
        ),
      );

      const retry = async () => {
        try {
          const response = chatroomRepo.generateResponse(
            chatroomId,
            companionId,
          );
          const [generated] = await Promise.all([response, delay(3000)]);
          setMessages((prev) => prev?.filter((m) => m.id !== errorMsg.id));
          await displayBubbles(generated);
        } catch (error) {
          console.error("Failed to generate AI response:", error);
          setMessages((prev) =>
            prev?.map((m) =>
              m.id === errorMsg.id ? { ...m, status: MessageStatus.ERROR } : m,
            ),
          );
        }
      };

      void retry();
    },
    [chatroomId, companionId, chatroomRepo, delay, displayBubbles],
  );

  const handleResend = useCallback(
    (message: Message) => {
      setMessages((prev) =>
        prev?.map((m) =>
          m.id === message.id ? { ...m, status: MessageStatus.SENDING } : m,
        ),
      );
      void sendAndGenerate(message.content, message.id);
    },
    [sendAndGenerate],
  );

  const handleSubmit = useCallback(
    async (content: string) => {
      const tempId = `temp_${Date.now()}`;
      const optimisticMessage: Message = {
        id: tempId,
        senderType: SenderType.USER,
        content,
        createdAt: new Date().toISOString(),
        status: MessageStatus.SENDING,
      };
      setMessages((prev) => [optimisticMessage, ...(prev ?? [])]);
      await sendAndGenerate(content, tempId);
    },
    [sendAndGenerate],
  );

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader
        companionName={companion?.name ?? undefined}
        companionImageUrl={companion?.profilePictureUrl}
        activity={getCurrentActivity()}
        onBack={() =>
          router.push(`/${lang}/aidols/${aidolId}/chatrooms`)
        }
      />

      <div className="bg-neutral text-neutral-content flex h-11.5 items-center justify-center">
        {companion?.name
          ? t("chat.greeting", {
              name: companion.name,
              particle: getParticle(companion.name, "과", "와"),
            })
          : ""}
      </div>

      <MessageList
        messages={messages}
        companionName={companion?.name ?? ""}
        companionImageUrl={companion?.profilePictureUrl ?? undefined}
        isTyping={isTyping}
        onResend={handleResend}
        onRetryGenerate={handleRetryGenerate}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
      />

      <MessageInput onSubmit={handleSubmit} />
    </div>
  );
}
