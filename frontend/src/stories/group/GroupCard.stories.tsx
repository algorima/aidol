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

const sampleAvatar = "https://placehold.co/96x96/EEE/31343C?text=RN";
const sampleHighlight =
  "https://placehold.co/345x230/EEE/31343C?text=Highlight";

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
