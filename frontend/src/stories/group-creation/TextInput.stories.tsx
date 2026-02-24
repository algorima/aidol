import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { TextInput } from "@/components/group-creation";

const meta: Meta<typeof TextInput> = {
  title: "Components/GroupCreation/TextInput",
  component: TextInput,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="max-w-mobile">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <TextInput {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

/** 기본 상태 */
export const Default: Story = {
  args: {
    value: "",
    placeholder: "텍스트를 입력하세요",
  },
};

/** 값이 있는 상태 */
export const WithValue: Story = {
  args: {
    value: "드리머즈",
    placeholder: "텍스트를 입력하세요",
  },
};

/** 비활성화 상태 */
export const Disabled: Story = {
  args: {
    value: "드리머즈",
    placeholder: "텍스트를 입력하세요",
    disabled: true,
  },
};

/** 여러 줄 입력 */
export const Multiline: Story = {
  args: {
    value: "첫 번째 줄\n두 번째 줄\n세 번째 줄",
    placeholder: "텍스트를 입력하세요",
  },
};

/** maxLength 적용 */
export const WithMaxLength: Story = {
  args: {
    value: "",
    placeholder: "최대 20자",
    maxLength: 20,
  },
};
