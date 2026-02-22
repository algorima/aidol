"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useToast } from "@/app/providers/Toast";
import { MessageInput } from "@/client";
import { ActivityBadge, CompanionAvatar } from "@/components";
import { MessageList } from "@/components/chatroom/MessageList";
import { ChatroomRepository } from "@/repositories";
import { Message, SenderType } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface ChatpageProps {
  params: { lang: string; chatroomId: string; companionId: string };
}

export default function Chatpage({ params }: ChatpageProps) {
  const { chatroomId, companionId } = params;
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [isTyping, setIsTyping] = useState(false);
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
        showToast("메시지를 불러오지 못했습니다", "error");
        setMessages([]);
      }
    })();
  }, [chatroomId, chatroomRepo, showToast]);

  const handleSubmit = useCallback(
    async (content: string) => {
      try {
        const userMessage = await chatroomRepo.sendMessage(chatroomId, content);
        setMessages((prev) => [...(prev ?? []), userMessage]);
      } catch (error) {
        console.error("Failed to send message:", error);
        showToast("메시지 전송에 실패했습니다", "error");
        return;
      }

      try {
        const response = chatroomRepo.generateResponse(chatroomId, companionId);

        const delay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));

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
          setMessages((prev) => [...(prev ?? []), aiMessage]);
          setIsTyping(false);
        }
      } catch (error) {
        console.error("Failed to generate AI response:", error);
        showToast("AI 응답 생성에 실패했습니다", "error");
      }
    },
    [chatroomId, companionId, chatroomRepo, showToast],
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
        태오와 자유롭게 대화 나눠보세요!
      </div>

      <MessageList
        messages={messages}
        companionName="테오"
        companionImageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
        isTyping={isTyping}
      />

      <MessageInput onSubmit={handleSubmit} />
    </div>
  );
}
