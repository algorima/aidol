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

export const Full: Story = {
  args: {
    imageUrl: sampleImage,
    title: "스타라이트",
    size: "full",
  },
};

export const Compact: Story = {
  args: {
    imageUrl: sampleImage,
    title: "드리머즈",
    size: "compact",
  },
};

export const Clickable: Story = {
  args: {
    imageUrl: sampleImage,
    title: "클릭 가능한 카드",
    size: "full",
    onClick: () => alert("카드 클릭"),
  },
};

export const LongTitle: Story = {
  args: {
    imageUrl: sampleImage,
    title: "아주 긴 그룹 이름이 들어가면 두 줄까지 표시되고 나머지는 잘립니다",
    size: "full",
  },
};

export const Gallery: Story = {
  render: () => (
    <div className="flex gap-4 overflow-x-auto">
      <HighlightCard imageUrl={sampleImage} title="그룹 A" size="compact" />
      <HighlightCard imageUrl={sampleImage} title="그룹 B" size="compact" />
      <HighlightCard imageUrl={sampleImage} title="그룹 C" size="compact" />
    </div>
  ),
};
