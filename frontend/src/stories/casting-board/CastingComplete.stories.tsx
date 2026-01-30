import type { Meta, StoryObj } from "@storybook/react";

import { CastingComplete } from "@/components/casting-board/CastingComplete";

const meta: Meta<typeof CastingComplete> = {
  title: "Components/CastingBoard/CastingComplete",
  component: CastingComplete,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CastingComplete>;

function Wrapper({ remainingSlots }: { remainingSlots: number }) {
  return (
    <div className="max-w-mobile mx-auto">
      <CastingComplete
        remainingSlots={remainingSlots}
        onFindNext={() => alert("다음 연습생 찾기")}
        onViewBoard={() => alert("캐스팅 보드 보기")}
      />
    </div>
  );
}

/** 기본 (남은 슬롯 2) */
export const Default: Story = {
  render: () => <Wrapper remainingSlots={2} />,
};

/** 남은 슬롯 5 */
export const FiveSlots: Story = {
  render: () => <Wrapper remainingSlots={5} />,
};

/** 남은 슬롯 0 */
export const ZeroSlots: Story = {
  render: () => <Wrapper remainingSlots={0} />,
};
