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
        pathname: "/ko/aidols/test-aidol-id/casting",
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
    aidolId: "test-aidol-id",
    lang: "ko",
  },
};

export const HomeActive: Story = {
  args: {
    aidolId: "test-aidol-id",
    lang: "ko",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/ko/aidols/test-aidol-id/home",
      },
    },
  },
};

export const ExploreActive: Story = {
  args: {
    aidolId: "test-aidol-id",
    lang: "ko",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/ko/aidols/test-aidol-id/casting",
      },
    },
  },
};

export const MyGroupActive: Story = {
  args: {
    aidolId: "test-aidol-id",
    lang: "ko",
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/ko/aidols/test-aidol-id/my-group",
      },
    },
  },
};
