import type { Meta, StoryObj } from "@storybook/react";

import { HighlightSectionHeader } from "@/components/group/HighlightSectionHeader";

const meta: Meta<typeof HighlightSectionHeader> = {
  title: "Components/Group/HighlightSectionHeader",
  component: HighlightSectionHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof HighlightSectionHeader>;

export const Default: Story = {
  args: {
    title: "내 그룹",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "다른 그룹",
    subtitle: "다른 사용자가 만든 그룹을 둘러보세요",
  },
};

export const WithAction: Story = {
  args: {
    title: "다른 그룹",
    subtitle: "다른 사용자가 만든 그룹을 둘러보세요",
    children: <button className="btn btn-ghost btn-sm">더보기</button>,
  },
};
