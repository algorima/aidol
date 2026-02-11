import type { Meta, StoryObj } from "@storybook/react";

import { SetRelationshipStep } from "@/components/chemistry/SetRelationshipStep";

const meta: Meta<typeof SetRelationshipStep> = {
  title: "Components/Chemistry/SetRelationshipStep",
  component: SetRelationshipStep,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="bg-base-100 max-w-mobile">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SetRelationshipStep>;

export const Default: Story = {
  args: {
    selectedType: "awkward",
    nickname: "",
    onTypeChange: () => {},
    onNicknameChange: () => {},
  },
};

export const Friendly: Story = {
  args: {
    selectedType: "friendly",
    nickname: "",
    onTypeChange: () => {},
    onNicknameChange: () => {},
  },
};

export const WithNickname: Story = {
  args: {
    selectedType: "bestFriend",
    nickname: "동갑즈",
    onTypeChange: () => {},
    onNicknameChange: () => {},
  },
};

export const MaxIntimacy: Story = {
  args: {
    selectedType: "inseparable",
    nickname: "찐친",
    onTypeChange: () => {},
    onNicknameChange: () => {},
  },
};
