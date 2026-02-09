import type { Meta, StoryObj } from "@storybook/react";

import { GroupInfoBanner } from "@/components/group/GroupInfoBanner";

const meta: Meta<typeof GroupInfoBanner> = {
  title: "Components/Group/GroupInfoBanner",
  component: GroupInfoBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof GroupInfoBanner>;

export const Default: Story = {
  render: () => (
    <div className="max-w-mobile">
      <GroupInfoBanner />
    </div>
  ),
};
