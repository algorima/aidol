import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { MbtiSlider } from "@/components/creation/MbtiSlider";

const AXES = [
  { label: "에너지 방향", leftLabel: "외향 (E)", rightLabel: "내향 (I)" },
  { label: "정보 인식 방식", leftLabel: "직관 (S)", rightLabel: "감각 (N)" },
  { label: "판단 기준", leftLabel: "사고 (T)", rightLabel: "감정 (F)" },
  { label: "생활 방식", leftLabel: "인식형 (J)", rightLabel: "판단형 (P)" },
];

const meta: Meta<typeof MbtiSlider> = {
  title: "Components/Creation/MbtiSlider",
  component: MbtiSlider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="max-w-mobile px-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MbtiSlider>;

/** 4개 축 모두 표시 */
export const AllAxes: Story = {
  render: () => {
    const [values, setValues] = useState([5, 5, 5, 5]);
    return (
      <div className="flex flex-col gap-6">
        {AXES.map((axis, i) => (
          <MbtiSlider
            key={axis.label}
            {...axis}
            value={values[i]}
            onChange={(v) =>
              setValues((prev) => prev.map((val, j) => (j === i ? v : val)))
            }
          />
        ))}
      </div>
    );
  },
};
