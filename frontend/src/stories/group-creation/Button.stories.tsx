import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/group-creation";

const meta: Meta = {
  title: "Components/GroupCreation/Button",
  component: Button,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: "select",
      options: ["neutral", "primary"],
    },
  },
};

export default meta;
type Story = StoryObj;

/** 기본 상태 (neutral) */
export const Default: Story = {
  args: {
    onClick: () => {},
    children: "다음",
  },
};

/** Primary */
export const Primary: Story = {
  args: {
    onClick: () => {},
    variant: "primary",
    children: "다음",
  },
};

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    onClick: () => {},
    disabled: true,
    children: "다음",
  },
};

/** 로딩 상태 */
export const Loading: Story = {
  args: {
    onClick: () => {},
    isLoading: true,
    children: "다음",
  },
};

/** 모든 Variant */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button onClick={() => {}} variant="neutral">
        Neutral
      </Button>
      <Button onClick={() => {}} variant="primary">
        Primary
      </Button>
    </div>
  ),
};
