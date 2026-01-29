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
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    onGetStarted: action("onGetStarted"),
  },
};
