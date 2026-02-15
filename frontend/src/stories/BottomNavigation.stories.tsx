import type { Meta, StoryObj } from "@storybook/react";

import { BottomNavigation, TAB_ICONS } from "@/components/BottomNavigation";

const defaultTabs = [
  {
    key: "home" as const,
    href: "/ko/aidols/home",
    labelKey: "navigation.home",
    ...TAB_ICONS.home,
  },
  {
    key: "explore" as const,
    href: "/ko/aidols/explore",
    labelKey: "navigation.explore",
    ...TAB_ICONS.explore,
  },
  {
    key: "myGroup" as const,
    href: "/ko/aidols/my-group",
    labelKey: "navigation.myGroup",
    ...TAB_ICONS.myGroup,
  },
];

const meta: Meta<typeof BottomNavigation> = {
  title: "Components/BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen flex-col justify-end">
        <Story />
      </div>
    ),
  ],
  args: {
    tabs: defaultTabs,
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: {
    activeTab: "explore",
  },
};

export const HomeActive: Story = {
  args: {
    activeTab: "home",
  },
};

export const ExploreActive: Story = {
  args: {
    activeTab: "explore",
  },
};

export const MyGroupActive: Story = {
  args: {
    activeTab: "myGroup",
  },
};
