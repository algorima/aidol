import type { Meta, StoryObj } from "@storybook/react";

import { GroupCard } from "@/components/group/GroupCard";

const meta: Meta<typeof GroupCard> = {
  title: "Components/Group/GroupCard",
  component: GroupCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof GroupCard>;

const sampleAvatar =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop";
const sampleHighlight =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=345&h=230&fit=crop";

export const Default: Story = {
  args: {
    avatarUrl: sampleAvatar,
    groupName: "르누아르",
    memberCount: 4,
    highlightImageUrl: sampleHighlight,
    highlightTitle: "숙소생활 이야기 1",
  },
};

export const Clickable: Story = {
  args: {
    avatarUrl: sampleAvatar,
    groupName: "스타라이트",
    memberCount: 5,
    highlightImageUrl: sampleHighlight,
    highlightTitle: "첫 무대 비하인드",
    onClick: () => alert("그룹 카드 클릭"),
  },
};

export const LongGroupName: Story = {
  args: {
    avatarUrl: sampleAvatar,
    groupName: "아주 긴 그룹 이름이 들어가는 경우",
    memberCount: 7,
    highlightImageUrl: sampleHighlight,
    highlightTitle: "아주 긴 하이라이트 제목이 들어가면 두 줄까지 표시됩니다",
  },
};
