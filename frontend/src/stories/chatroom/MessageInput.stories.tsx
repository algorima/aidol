import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { MessageInput } from "@/components/chatroom/MessageInput";

const meta: Meta<typeof MessageInput> = {
  title: "Components/Chatroom/MessageInput",
  component: MessageInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
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
type Story = StoryObj<typeof MessageInput>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
};
