import type { Meta, StoryObj } from "@storybook/react";

import { InboxBlock } from "@/components/inbox/InboxBlock";

const meta: Meta<typeof InboxBlock> = {
  title: "Inbox/InboxBlock",
  component: InboxBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof InboxBlock>;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

export const Active: Story = {
  args: {
    name: "데프레임",
    imageUrl: sampleImage,
    active: true,
    activity: "PRACTICING",
    lastMessage: "안녕하세요! 오늘 컨디션은 어때요?",
    lastMessageAt: "오후 2:30",
  },
};

export const Inactive: Story = {
  args: {
    name: "스타라이트",
    imageUrl: sampleImage,
    active: false,
    lastMessage: "다음에 또 이야기해요!",
    lastMessageAt: "어제",
  },
};

export const LongName: Story = {
  args: {
    name: "아주아주긴이름의아이돌그룹",
    imageUrl: sampleImage,
    active: true,
    activity: "RESTING",
    lastMessage: "이 메시지는 매우 길어서 잘릴 수 있는 메시지입니다",
    lastMessageAt: "오전 11:00",
  },
};

export const NoImage: Story = {
  args: {
    name: "드리머즈",
    imageUrl: null,
    active: false,
    lastMessage: null,
    lastMessageAt: null,
  },
};
