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
        const response = await chatroomRepo.generateResponse(
          chatroomId,
          companionId,
        );
        const aiMessage: Message = {
          id: response.messageId,
          senderType: SenderType.COMPANION,
          content: response.content,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...(prev ?? []), aiMessage]);
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
      />

      <MessageInput onSubmit={handleSubmit} />
    </div>
  );
}
