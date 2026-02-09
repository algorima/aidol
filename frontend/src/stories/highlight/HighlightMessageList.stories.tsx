import type { Meta, StoryObj } from "@storybook/react";

import bubbleProfile from "@/assets/newsletter/bubble-profile.png";
import { HighlightMessageList } from "@/components/highlight";
import type { HighlightMessage } from "@/schemas";

const meta: Meta<typeof HighlightMessageList> = {
  title: "Components/Highlight/HighlightMessageList",
  component: HighlightMessageList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof HighlightMessageList>;

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

/** 인터뷰어와 컴패니언 메시지가 포함된 기본 대화 */
export const Default: Story = {
  args: {
    messages: MOCK_MESSAGES,
    companions: MOCK_COMPANIONS,
  },
  decorators: [
    (Story) => (
      <div className="w-[345px]">
        <Story />
      </div>
    ),
  ],
};

/** 인터뷰어 메시지만 있는 경우 */
export const InterviewerOnly: Story = {
  args: {
    messages: MOCK_MESSAGES.filter((m) => m.companionId === null),
    companions: {},
  },
  decorators: [
    (Story) => (
      <div className="w-[345px]">
        <Story />
      </div>
    ),
  ],
};

/** 컴패니언 메시지만 있는 경우 */
export const CompanionOnly: Story = {
  args: {
    messages: MOCK_MESSAGES.filter((m) => m.companionId !== null),
    companions: MOCK_COMPANIONS,
  },
  decorators: [
    (Story) => (
      <div className="w-[345px]">
        <Story />
      </div>
    ),
  ],
};

/** 여러 컴패니언이 참여하는 대화 */
export const MultipleCompanions: Story = {
  args: {
    messages: [
      ...MOCK_MESSAGES,
      {
        id: "msg-5",
        highlightId: "highlight-1",
        companionId: "companion-2",
        sequence: 5,
        content: "저는 노래 연습을 더 열심히 해야 할 것 같아요.",
        createdAt: "2025-01-01T00:00:04Z",
        updatedAt: "2025-01-01T00:00:04Z",
      },
      {
        id: "msg-6",
        highlightId: "highlight-1",
        companionId: null,
        sequence: 6,
        content: "팀워크가 좋아 보이네요!",
        createdAt: "2025-01-01T00:00:05Z",
        updatedAt: "2025-01-01T00:00:05Z",
      },
    ],
    companions: {
      ...MOCK_COMPANIONS,
      "companion-2": {
        name: "테오",
        imageUrl: bubbleProfile.src,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[345px]">
        <Story />
      </div>
    ),
  ],
};
