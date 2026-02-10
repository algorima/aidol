import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { GroupDropdown } from "@/components/group/GroupDropdown";
import type { AIdol } from "@/schemas/aidol";

const mockGroups: AIdol[] = [
  {
    id: "group-1",
    name: "데이프레임",
    profileImageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    concept: "청량",
    createdAt: "2026-01-29T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "group-2",
    name: "스타라이트",
    profileImageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
    concept: "파워풀",
    createdAt: "2026-01-30T00:00:00Z",
    updatedAt: "2026-01-30T00:00:00Z",
  },
  {
    id: "group-3",
    name: "문라이즈",
    profileImageUrl: null,
    concept: "몽환",
    createdAt: "2026-01-31T00:00:00Z",
    updatedAt: "2026-01-31T00:00:00Z",
  },
];

const meta: Meta<typeof GroupDropdown> = {
  title: "Components/Group/GroupDropdown",
  component: GroupDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="relative h-64 w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    onSelect: fn(),
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof GroupDropdown>;

export const Default: Story = {
  args: {
    groups: mockGroups,
    selectedGroupId: null,
  },
};

export const WithSelection: Story = {
  args: {
    groups: mockGroups,
    selectedGroupId: "group-1",
  },
};

export const SingleGroup: Story = {
  args: {
    groups: [mockGroups[0]],
    selectedGroupId: "group-1",
  },
};
