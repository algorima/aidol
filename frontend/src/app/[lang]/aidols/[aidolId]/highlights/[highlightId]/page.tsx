"use client";

import { useRouter } from "next/navigation";

import bubbleProfile from "@/assets/newsletter/bubble-profile.png";
import { HighlightMessageList } from "@/components/highlight";
import { Modal } from "@/components/Modal";
import type { HighlightMessage } from "@/schemas";

// TODO: HighlightRepository.getMessages(highlightId)로 교체
const MOCK_MESSAGES: HighlightMessage[] = [
  {
    id: "msg-1",
    highlightId: "highlight-1",
    companionId: null,
    sequence: 1,
    content: "테오는 숙소생활 어때요?",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "msg-2",
    highlightId: "highlight-1",
    companionId: "companion-1",
    sequence: 2,
    content:
      "춤을 너무 잘춰서 기가 죽었어요... 근데 같이 연습하다 보니까 저도 실력이 느는 것 같아서 좋아요!",
    createdAt: "2025-01-01T00:00:01Z",
    updatedAt: "2025-01-01T00:00:01Z",
  },
  {
    id: "msg-3",
    highlightId: "highlight-1",
    companionId: null,
    sequence: 3,
    content: "다른 멤버들과의 관계는 어때요?",
    createdAt: "2025-01-01T00:00:02Z",
    updatedAt: "2025-01-01T00:00:02Z",
  },
  {
    id: "msg-4",
    highlightId: "highlight-1",
    companionId: "companion-1",
    sequence: 4,
    content: "형한테 그런식으로 말하면 안되지 않을까?",
    createdAt: "2025-01-01T00:00:03Z",
    updatedAt: "2025-01-01T00:00:03Z",
  },
];

const MOCK_COMPANIONS: Record<string, { name: string; imageUrl: string }> = {
  "companion-1": {
    name: "이안",
    imageUrl: bubbleProfile.src,
  },
};

export default function HighlightMessagePage() {
  const router = useRouter();

  const messages = MOCK_MESSAGES;
  const companions = MOCK_COMPANIONS;

  return (
    <Modal isOpen onClose={() => router.back()}>
      <HighlightMessageList messages={messages} companions={companions} />
    </Modal>
  );
}
