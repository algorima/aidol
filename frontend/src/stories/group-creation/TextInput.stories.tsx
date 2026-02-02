import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "@/components/group-creation";

const meta: Meta = {
  title: "Components/GroupCreation/TextInput",
  component: TextInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/** 기본 상태 */
export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "텍스트를 입력하세요",
  },
};

/** 값이 있는 상태 */
export const WithValue: Story = {
  args: {
    value: "드리머즈",
    onChange: () => {},
    placeholder: "텍스트를 입력하세요",
  },
};

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    value: "드리머즈",
    onChange: () => {},
    placeholder: "텍스트를 입력하세요",
    disabled: true,
  },
};

/** maxLength 적용 */
export const WithMaxLength: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "최대 20자",
    maxLength: 20,
  },
};
