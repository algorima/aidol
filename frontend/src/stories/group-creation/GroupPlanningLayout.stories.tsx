import type { Meta, StoryObj } from "@storybook/react";

import { StepCard } from "@/components/creation/StepCard";
import {
  Button,
  EmblemStep,
  GroupPlanningLayout,
} from "@/components/group-creation";

const meta: Meta = {
  title: "Components/GroupCreation/GroupPlanningLayout",
  component: GroupPlanningLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/** Step 1: 이름 입력 */
export const NameStep: Story = {
  args: {
    step: 1,
    totalSteps: 2,
    bottomButton: (
      <Button onClick={() => {}} className="w-full">
        다음
      </Button>
    ),
    children: (
      <StepCard step={1} title="그룹 이름을 알려주세요">
        <input
          type="text"
          placeholder="예) 드리머즈, 스타라이트"
          className="border-base-300 text-body-m placeholder:text-base-300 w-full rounded-lg border bg-white px-4 py-3 text-black focus:outline-none"
          maxLength={20}
        />
      </StepCard>
    ),
  },
};

/** Step 1: 버튼 비활성화 */
export const NameStepDisabled: Story = {
  args: {
    step: 1,
    totalSteps: 2,
    bottomButton: (
      <Button onClick={() => {}} disabled className="w-full">
        다음
      </Button>
    ),
    children: (
      <StepCard step={1} title="그룹 이름을 알려주세요">
        <input
          type="text"
          placeholder="예) 드리머즈, 스타라이트"
          className="border-base-300 text-body-m placeholder:text-base-300 w-full rounded-lg border bg-white px-4 py-3 text-black focus:outline-none"
          maxLength={20}
        />
      </StepCard>
    ),
  },
};

/** Step 2: 엠블럼 생성 */
export const EmblemStepExample: Story = {
  args: {
    step: 2,
    totalSteps: 2,
    bottomButton: (
      <Button onClick={() => {}} disabled className="w-full">
        완료
      </Button>
    ),
    children: (
      <EmblemStep
        prompt=""
        emblemUrl=""
        isGeneratingImage={false}
        onPromptChange={() => {}}
        onGenerate={() => {}}
      />
    ),
  },
};

/** Step 2: 로딩 상태 */
export const EmblemStepLoading: Story = {
  args: {
    step: 2,
    totalSteps: 2,
    bottomButton: (
      <Button onClick={() => {}} isLoading className="w-full">
        완료
      </Button>
    ),
    children: (
      <EmblemStep
        prompt="귀여운 고양이 캐릭터"
        emblemUrl="https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop"
        isGeneratingImage={false}
        onPromptChange={() => {}}
        onGenerate={() => {}}
      />
    ),
  },
};
