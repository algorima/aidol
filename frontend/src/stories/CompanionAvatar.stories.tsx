import type { Meta, StoryObj } from "@storybook/react";

import { CompanionAvatar } from "@/components/common/CompanionAvatar";

const meta: Meta<typeof CompanionAvatar> = {
  title: "Components/CompanionAvatar",
  component: CompanionAvatar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof CompanionAvatar>;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

export const Active: Story = {
  args: {
    imageUrl: sampleImage,
    name: "홍길동",
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    imageUrl: sampleImage,
    name: "홍길동",
    active: false,
  },
};

export const NoImage: Story = {
  args: {
    imageUrl: null,
    name: "홍길동",
    active: true,
  },
};

export const Small: Story = {
  args: {
    imageUrl: sampleImage,
    name: "홍길동",
    active: true,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    imageUrl: sampleImage,
    name: "홍길동",
    active: true,
    size: "lg",
  },
};
