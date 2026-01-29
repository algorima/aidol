import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { useState } from "react";

import { StepCard } from "@/components/creation/StepCard";

const meta: Meta<typeof StepCard> = {
  title: "Components/StepCard",
  component: StepCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StepCard>;

/** 라디오 버튼 */
function RadioButtonInteractive() {
  const [selected, setSelected] = useState<"female" | "male">("male");

  return (
    <StepCard step={1} title="성별을 정해주세요">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setSelected("female")}
          className={clsx(
            "text-label-l flex-1 rounded-lg border px-2 py-4",
            selected === "female"
              ? "border-primary bg-primary/20 text-primary"
              : "border-base-300 bg-base-200 text-base-content",
          )}
        >
          여성
        </button>
        <button
          type="button"
          onClick={() => setSelected("male")}
          className={clsx(
            "text-label-l flex-1 rounded-lg border px-2 py-4",
            selected === "male"
              ? "border-primary bg-primary/20 text-primary"
              : "border-base-300 bg-base-200 text-base-content",
          )}
        >
          남성
        </button>
      </div>
    </StepCard>
  );
}

export const WithRadioButton: Story = {
  render: () => <RadioButtonInteractive />,
};

/** 텍스트 입력 */
export const TextInput: Story = {
  args: {
    step: 1,
    title: "그룹 이름을 입력해주세요",
    children: (
      <input
        type="text"
        placeholder="예) 드리머즈, 스타라이트"
        className="input border-base-300 placeholder:text-base-300 border bg-white"
      />
    ),
  },
};

/** 텍스트 입력 + 버튼 + 이미지 미리보기 */
export const ImageGeneration: Story = {
  args: {
    step: 2,
    title: "프로필 사진을 만들어볼까요?",
    children: (
      <>
        <input
          type="text"
          placeholder="예)"
          className="input border-base-300 placeholder:text-base-300 border bg-white"
        />
        <button type="button" className="btn btn-primary text-label-l w-full">
          이미지 생성
        </button>
        <div className="size-profile border-base-300 bg-base-100 mx-auto flex items-center justify-center rounded-lg border">
          <div className="text-neutral flex flex-col items-center gap-4">
            <div className="text-body-m text-center">
              <p>생성된 프로필</p>
              <p>이미지가</p>
              <p>표시돼요</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
};

/** 성격 슬라이더 */
export const PersonalitySliders: Story = {
  args: {
    step: 2,
    title: "성격을 알려주세요",
    children: (
      <div className="flex flex-col gap-2">
        {[
          { label: "에너지 방향", left: "외향 (E)", right: "내향 (I)" },
          { label: "정보 인식 방식", left: "감각 (S)", right: "직관 (N)" },
          { label: "판단 기준", left: "사고 (T)", right: "감정 (F)" },
          { label: "생활 방식", left: "계획 (J)", right: "유연 (P)" },
        ].map((item) => (
          <div key={item.label} className="text-label-s w-full max-w-xs">
            <span className="text-neutral mb-1">{item.label}</span>
            <div className="px-6 py-4">
              <input
                type="range"
                min={0}
                max="10"
                value="5"
                className="range range-primary"
                step="1"
              />
              <div className="text-primary mb-1 flex justify-between px-2.5 text-xs">
                <span>|</span>
                <span>|</span>
              </div>
              <div className="text-primary flex justify-between text-xs">
                <span>{item.left}</span>
                <span>{item.right}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

/** 여러 스텝 */
export const MultipleSteps: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <StepCard step={4} title="이름은 무엇인가요?">
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          className="input border-base-300 text-base-300 placeholder:text-base-300 border bg-white"
        />
      </StepCard>
      <StepCard step={5} title="이 아이돌의 서사를 알려주세요">
        <input
          type="text"
          placeholder="어떤 시간을 보냈나요?"
          className="input border-base-300 text-base-300 placeholder:text-base-300 border bg-white"
        />
      </StepCard>
    </div>
  ),
};
