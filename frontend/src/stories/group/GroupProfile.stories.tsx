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
    profileImageUrl: sampleImage,
    name: "스타라이트",
    season: "시즌 1",
    date: "2025.01.15",
    onChemistryClick: () => alert("멤버 간 케미"),
    shareUrl: "https://example.com/group/1",
  },
};

export const WithoutImage: Story = {
  args: {
    profileImageUrl: null,
    name: "드리머즈",
    season: "시즌 2",
    date: "2025.03.20",
    onChemistryClick: () => alert("멤버 간 케미"),
    shareUrl: "https://example.com/group/2",
  },
};

export const SeasonOnly: Story = {
  args: {
    profileImageUrl: sampleImage,
    name: "루미너스",
    season: "시즌 1",
    onChemistryClick: () => alert("멤버 간 케미"),
    shareUrl: "https://example.com/group/3",
  },
};

export const NoMetadata: Story = {
  args: {
    profileImageUrl: sampleImage,
    name: "노바",
    onChemistryClick: () => alert("멤버 간 케미"),
    shareUrl: "https://example.com/group/4",
  },
};
