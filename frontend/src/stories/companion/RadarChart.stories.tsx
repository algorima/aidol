import type { Meta, StoryObj } from "@storybook/react";

import { RadarChart } from "@/components/companion/RadarChart";
import type { CompanionStats } from "@/schemas/companion";

const meta: Meta<typeof RadarChart> = {
  title: "Companion/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

const balancedStats: CompanionStats = {
  vocal: 75,
  dance: 80,
  rap: 60,
  visual: 85,
  stamina: 70,
  charm: 90,
};

const vocalFocusedStats: CompanionStats = {
  vocal: 95,
  dance: 50,
  rap: 40,
  visual: 70,
  stamina: 60,
  charm: 75,
};

const danceFocusedStats: CompanionStats = {
  vocal: 55,
  dance: 98,
  rap: 45,
  visual: 80,
  stamina: 90,
  charm: 70,
};

const lowStats: CompanionStats = {
  vocal: 30,
  dance: 25,
  rap: 20,
  visual: 35,
  stamina: 40,
  charm: 30,
};

const maxStats: CompanionStats = {
  vocal: 100,
  dance: 100,
  rap: 100,
  visual: 100,
  stamina: 100,
  charm: 100,
};

export const Balanced: Story = {
  args: {
    stats: balancedStats,
  },
};

export const VocalFocused: Story = {
  args: {
    stats: vocalFocusedStats,
  },
};

export const DanceFocused: Story = {
  args: {
    stats: danceFocusedStats,
  },
};

export const LowStats: Story = {
  args: {
    stats: lowStats,
  },
};

export const MaxStats: Story = {
  args: {
    stats: maxStats,
  },
};
