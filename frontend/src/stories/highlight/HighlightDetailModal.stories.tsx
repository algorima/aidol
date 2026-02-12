import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { HighlightDetailModal } from "@/components/highlight";
import type { Companion } from "@/schemas/companion";
import type { HighlightMessage } from "@/schemas/highlight";

const mockCompanions: Companion[] = [
  {
    id: "g-01",
    aidolId: "aidol-group-001",
    name: "하늘",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    status: "published",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "g-02",
    aidolId: "aidol-group-001",
    name: "지우",
    profilePictureUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    status: "published",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
];

const mockMessages: HighlightMessage[] = [
  {
    id: "msg-001",
    highlightId: "highlight-001",
    companionId: null,
    sequence: 1,
    content: "하늘은 숙소생활 어때요?",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "msg-002",
    highlightId: "highlight-001",
    companionId: "g-01",
    sequence: 2,
    content:
      "처음엔 낯설었는데 이제 많이 적응했어요. 멤버들이랑 밤새 얘기하면서 더 친해진 것 같아요!",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "msg-003",
    highlightId: "highlight-001",
    companionId: null,
    sequence: 3,
    content: "지우는 어때요?",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "msg-004",
    highlightId: "highlight-001",
    companionId: "g-02",
    sequence: 4,
    content:
      "다들 춤을 너무 잘춰서 기가 죽었어요. 저도 열심히 해서 월말평가에서 꼭 좋은 점수를 받으려고요",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
];

const meta: Meta<typeof HighlightDetailModal> = {
  title: "Components/Highlight/HighlightDetailModal",
  component: HighlightDetailModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof HighlightDetailModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    messages: mockMessages,
    companions: mockCompanions,
  },
};
