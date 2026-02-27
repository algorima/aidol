import type { Meta, StoryObj } from "@storybook/react";

import { ChatHeader } from "@/components/chatroom/ChatHeader";

const SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const meta: Meta<typeof ChatHeader> = {
  title: "Components/Chatroom/ChatHeader",
  component: ChatHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="max-w-mobile">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

/** 기본 상태 — 휴식 중 */
export const Default: Story = {
  args: {
    companionName: "테오",
    companionImageUrl: SAMPLE_IMAGE,
    activity: "RESTING",
  },
};

/** 연습 중 */
export const Practicing: Story = {
  args: {
    companionName: "테오",
    companionImageUrl: SAMPLE_IMAGE,
    activity: "PRACTICING",
  },
};

/** 이름이 긴 경우 — 말줄임표 확인 */
export const LongName: Story = {
  args: {
    companionName: "아주아주긴이름의아이돌멤버이름테스트",
    companionImageUrl: SAMPLE_IMAGE,
    activity: "SHORT_BREAK",
  },
};

/** 로딩 중 — companion 정보 없음 */
export const Loading: Story = {
  args: {
    activity: "RESTING",
  },
};
