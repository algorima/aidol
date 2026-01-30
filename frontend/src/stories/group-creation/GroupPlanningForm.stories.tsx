import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { useTranslation } from "react-i18next";

import { GroupPlanningForm } from "@/components/group-creation/GroupPlanningForm";
import { Header } from "@/components/Header";

const meta: Meta<typeof GroupPlanningForm> = {
  title: "Components/GroupCreation/GroupPlanningForm",
  component: GroupPlanningForm,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof GroupPlanningForm>;

const sampleEmblemUrl =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

function PageWrapper({
  initialStep = 1,
  initialName = "",
  initialEmblemUrl = "",
  isLoading = false,
  isGeneratingImage = false,
}: {
  initialStep?: 1 | 2;
  initialName?: string;
  initialEmblemUrl?: string;
  isLoading?: boolean;
  isGeneratingImage?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="max-w-mobile mx-auto">
      <div className="bg-base-100 flex h-screen flex-col">
        <Header title={t("aidol:groupPlanning.header")} />
        <GroupPlanningForm
          initialStep={initialStep}
          initialName={initialName}
          initialEmblemUrl={initialEmblemUrl}
          onSubmit={action("onSubmit")}
          onGenerateImage={(prompt) => {
            action("onGenerateImage")(prompt);
            return Promise.resolve(sampleEmblemUrl);
          }}
          isLoading={isLoading}
          isGeneratingImage={isGeneratingImage}
        />
      </div>
    </div>
  );
}

/** Step 1: 그룹 이름 입력 (빈 상태) */
export const Step1Empty: Story = {
  render: () => <PageWrapper />,
};

/** Step 1: 그룹 이름 입력 (이름 입력됨) */
export const Step1WithName: Story = {
  render: () => <PageWrapper initialName="드리머즈" />,
};

/** Step 2: 엠블럼 생성 (빈 상태) */
export const Step2Empty: Story = {
  render: () => <PageWrapper initialStep={2} initialName="드리머즈" />,
};

/** Step 2: 이미지 생성 중 */
export const Step2Generating: Story = {
  render: () => (
    <PageWrapper initialStep={2} initialName="드리머즈" isGeneratingImage />
  ),
};

/** Step 2: 이미지 생성 완료 */
export const Step2WithEmblem: Story = {
  render: () => (
    <PageWrapper
      initialStep={2}
      initialName="드리머즈"
      initialEmblemUrl={sampleEmblemUrl}
    />
  ),
};

/** Step 2: 제출 중 */
export const Step2Submitting: Story = {
  render: () => (
    <PageWrapper
      initialStep={2}
      initialName="드리머즈"
      initialEmblemUrl={sampleEmblemUrl}
      isLoading
    />
  ),
};
