import type { Meta, StoryObj } from "@storybook/react";

import { EmptyState } from "@/components/casting-board/EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/CastingBoard/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    onBrowse: () => alert("연습생 둘러보기 클릭!"),
  },
  render: (args) => (
    <div className="bg-base-100 flex h-screen flex-col">
      <EmptyState {...args} />
    </div>
  ),
};
