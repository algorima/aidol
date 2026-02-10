import type { Meta, StoryObj } from "@storybook/react";

import { ChatTooltipButton } from "@/components/group/ChatTooltipButton";

const meta: Meta<typeof ChatTooltipButton> = {
  title: "Components/Group/ChatTooltipButton",
  component: ChatTooltipButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex h-32 w-64 items-start justify-end p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatTooltipButton>;

export const Default: Story = {};
