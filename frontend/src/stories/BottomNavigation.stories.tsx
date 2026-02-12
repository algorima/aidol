import type { Meta, StoryObj } from "@storybook/react";

import { BottomNavigation } from "@/components/BottomNavigation";

const meta: Meta<typeof BottomNavigation> = {
  title: "Components/BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/ko/aidols/explore",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen flex-col justify-end">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: {
    lang: "ko",
  },
};

export const HomeActive: Story = {
  args: {
    lang: "ko",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/ko/aidols/home",
      },
    },
  },
};

export const ExploreActive: Story = {
  args: {
    lang: "ko",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/ko/aidols/explore",
      },
    },
  },
};

export const MyGroupActive: Story = {
  args: {
    lang: "ko",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/ko/aidols/my-group/test-aidol-id",
      },
    },
  },
};
