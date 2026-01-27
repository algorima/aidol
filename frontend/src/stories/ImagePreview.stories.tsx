import type { Meta, StoryObj } from "@storybook/react";

import { ImagePreview } from "@/components/companion/ImagePreview";

const meta: Meta = {
  title: "Components/ImagePreview",
  component: ImagePreview,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

export const Default: Story = {
  args: {
    url: sampleImage,
    alt: "프로필 이미지",
  },
};
