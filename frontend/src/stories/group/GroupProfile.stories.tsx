import type { Meta, StoryObj } from "@storybook/react";

import { GroupProfile } from "@/components/group/GroupProfile";

const meta: Meta<typeof GroupProfile> = {
  title: "Components/Group/GroupProfile",
  component: GroupProfile,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof GroupProfile>;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

export const Default: Story = {
  args: {
    name: "시즌1 데뷔조",
    profileImageUrl: sampleImage,
    createdAt: "2026-01-29T00:00:00Z",
    onChemistryClick: () => alert("멤버 간 케미"),
  },
};

export const WithoutImage: Story = {
  args: {
    name: "시즌1 데뷔조",
    profileImageUrl: null,
    createdAt: "2026-01-20T00:00:00Z",
    onChemistryClick: () => alert("멤버 간 케미"),
  },
};

export const RecentlyCreated: Story = {
  args: {
    name: "시즌1 데뷔조",
    profileImageUrl: sampleImage,
    createdAt: new Date().toISOString(),
    onChemistryClick: () => alert("멤버 간 케미"),
  },
};

export const WithFollowButton: Story = {
  args: {
    name: "시즌1 데뷔조",
    profileImageUrl: sampleImage,
    createdAt: "2026-01-29T00:00:00Z",
    onChemistryClick: () => alert("멤버 간 케미"),
    onFollowClick: () => alert("팔로우"),
  },
};
