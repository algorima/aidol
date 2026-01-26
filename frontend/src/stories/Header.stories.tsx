import { PlusIcon } from "@heroicons/react/24/solid";
import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "@/components/Header";

const meta: Meta = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    title: "신규 멤버 추가",
  },
};

export const WithRightButton: Story = {
  args: {
    title: "연습생 캐스팅",
    rightContent: (
      <button className="btn btn-primary">
        신규 멤버 <PlusIcon className="size-4" />
      </button>
    ),
  },
};
