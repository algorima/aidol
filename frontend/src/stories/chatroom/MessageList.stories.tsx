import type { Meta, StoryObj } from "@storybook/react";

import { MessageList } from "@/components/chatroom/MessageList";
import { Message, MessageStatus, SenderType } from "@/schemas";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    senderType: SenderType.COMPANION,
    content: "안녕! 나 테오야",
    createdAt: "2026-02-17T10:00:00Z",
  },
  {
    id: "2",
    senderType: SenderType.COMPANION,
    content: "처음 여기서 이야기하게 됐네. 반가워",
    createdAt: "2026-02-17T10:00:00Z",
  },
  {
    id: "3",
    senderType: SenderType.COMPANION,
    content: "편하게 이야기 해줘",
    createdAt: "2026-02-17T10:00:00Z",
  },
  {
    id: "4",
    senderType: SenderType.USER,
    content: "어 안녕",
    createdAt: "2026-02-17T10:01:00Z",
  },
];

const meta: Meta<typeof MessageList> = {
  title: "Components/Chatroom/MessageList",
  component: MessageList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="max-w-mobile h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MessageList>;

/** 메시지가 있는 기본 상태 */
export const Default: Story = {
  args: {
    messages: MOCK_MESSAGES,
    companionName: "테오",
    companionImageUrl: SAMPLE_IMAGE,
  },
};

/** 유저 메시지 전송 중 */
export const Sending: Story = {
  args: {
    messages: [
      ...MOCK_MESSAGES.slice(0, 3),
      {
        id: "4",
        senderType: SenderType.USER,
        content: "어 안녕",
        createdAt: "2026-02-17T10:01:00Z",
        status: MessageStatus.SENDING,
      },
    ],
    companionName: "테오",
    companionImageUrl: SAMPLE_IMAGE,
  },
};

/** 유저 메시지 전송 실패 */
export const Error: Story = {
  args: {
    messages: [
      ...MOCK_MESSAGES.slice(0, 3),
      {
        id: "4",
        senderType: SenderType.USER,
        content: "어 안녕",
        createdAt: "2026-02-17T10:01:00Z",
        status: MessageStatus.ERROR,
      },
    ],
    companionName: "테오",
    companionImageUrl: SAMPLE_IMAGE,
  },
};

/** 작성중 표시 — AI가 연속으로 답하는 중 */
export const Typing: Story = {
  args: {
    messages: [
      ...MOCK_MESSAGES,
      {
        id: "5",
        senderType: SenderType.COMPANION,
        content: "오늘 연습 많이 했어",
        createdAt: "2026-02-17T10:01:00Z",
      },
    ],
    companionName: "테오",
    companionImageUrl: SAMPLE_IMAGE,
    isTyping: true,
  },
};
