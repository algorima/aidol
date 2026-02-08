import type { Meta, StoryObj } from "@storybook/react";

import { HighlightCard } from "@/components/group/HighlightCard";

const meta: Meta<typeof HighlightCard> = {
  title: "Components/Group/HighlightCard",
  component: HighlightCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof HighlightCard>;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

export const Default: Story = {
  args: {
    imageUrl: sampleImage,
    title: "스타라이트",
  },
};

export const Clickable: Story = {
  args: {
    imageUrl: sampleImage,
    title: "클릭 가능한 카드",
    onClick: () => alert("카드 클릭"),
  },
};

export const LongTitle: Story = {
  args: {
    imageUrl: sampleImage,
    title: "아주 긴 그룹 이름이 들어가면 두 줄까지 표시되고 나머지는 잘립니다",
  },
};
