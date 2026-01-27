import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { HeroSection } from "@/components/landing/HeroSection";

const meta: Meta<typeof HeroSection> = {
  title: "Components/Landing/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onGetStarted: { action: "Get Started clicked" },
    heroImageUrl: {
      control: "text",
      description: "Custom hero image URL (optional)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    onGetStarted: action("onGetStarted"),
  },
};

export const CustomImage: Story = {
  args: {
    onGetStarted: action("onGetStarted"),
    heroImageUrl:
      "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=2187&auto=format&fit=crop",
  },
};
