"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { MessageInput } from "@/client";
import { ActivityBadge, CompanionAvatar } from "@/components";
import { MessageList } from "@/components/chatroom/MessageList";
import { getParticle } from "@/lib/koreanParticle";
import { ChatroomRepository } from "@/repositories";
import { Message, MessageStatus, SenderType } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface ChatpageProps {
  params: { lang: string; chatroomId: string; companionId: string };
}

export default function Chatpage({ params }: ChatpageProps) {
  const { chatroomId, companionId } = params;
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [isTyping, setIsTyping] = useState(false);
  const { t } = useTranslation("aidol");
  const { showToast } = useToast();

  const chatroomRepo = useMemo(
    () => new ChatroomRepository(getApiService()),
    [],
  );

  useEffect(() => {
    void (async () => {
      try {
        const fetched = await chatroomRepo.getMessages(chatroomId);
        setMessages(fetched);
      } catch (error) {
        console.error("Failed to load messages:", error);
        showToast(t("common.error.load"), "error");
        setMessages([]);
      }
    })();
  }, [chatroomId, chatroomRepo, showToast]);

  const generateWithTyping = useCallback(async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const response = chatroomRepo.generateResponse(chatroomId, companionId);

      setIsTyping(true);
      const [generated] = await Promise.all([response, delay(3000)]);
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
  }, [chatroomId, companionId, chatroomRepo]);

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
        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));

        try {
          const response = chatroomRepo.generateResponse(
            chatroomId,
            companionId,
          );
          const [generated] = await Promise.all([response, delay(3000)]);

          setMessages((prev) => prev?.filter((m) => m.id !== errorMsg.id));

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
    [chatroomId, companionId, chatroomRepo],
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
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="text-base-content size-5" strokeWidth={2} />
          <CompanionAvatar
            imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
            name="테오"
            active
          />
          <span>테오</span>
        </div>
        <ActivityBadge activity="RESTING" />
      </header>

      <div className="bg-neutral text-neutral-content flex h-11.5 items-center justify-center">
        {t("chat.greeting", {
          name: "테오",
          particle: getParticle("테오", "과", "와"),
        })}
      </div>

      <MessageList
        messages={messages}
        companionName="테오"
        companionImageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
        isTyping={isTyping}
        onResend={handleResend}
        onRetryGenerate={handleRetryGenerate}
      />

      <MessageInput onSubmit={handleSubmit} />
    </div>
  );
}
