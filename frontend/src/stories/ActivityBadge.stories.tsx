import type { Meta, StoryObj } from "@storybook/react";

import { ActivityBadge } from "@/components/common/ActivityBadge";

const meta: Meta<typeof ActivityBadge> = {
  title: "Components/ActivityBadge",
  component: ActivityBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ActivityBadge>;

export const Resting: Story = {
  args: {
    activity: "RESTING",
  },
};

export const Practicing: Story = {
  args: {
    activity: "PRACTICING",
  },
};

export const ShortBreak: Story = {
  args: {
    activity: "SHORT_BREAK",
  },
};

export const RestingAtHome: Story = {
  args: {
    activity: "RESTING_AT_HOME",
  },
};
