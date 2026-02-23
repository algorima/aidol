import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { LockedCompanionSheet } from "@/components/companion/LockedCompanionSheet";

const meta: Meta<typeof LockedCompanionSheet> = {
  title: "Components/Companion/LockedCompanionSheet",
  component: LockedCompanionSheet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LockedCompanionSheet>;

function SheetWrapper({
  companionName = "루나",
  companionImageUrl,
  defaultOpen = false,
}: {
  companionName?: string;
  companionImageUrl?: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-base-100 flex h-screen items-center justify-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn btn-primary"
      >
        잠긴 컴패니언 클릭
      </button>

      <LockedCompanionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        companionName={companionName}
        companionImageUrl={companionImageUrl}
      />
    </div>
  );
}

/** 프로필 이미지가 있는 기본 상태 */
export const Default: Story = {
  render: () => <SheetWrapper companionImageUrl="https://placehold.co/96x96" />,
};

/** 프로필 이미지 없이 UserIcon 폴백 */
export const WithoutImage: Story = {
  render: () => <SheetWrapper />,
};

/** 열린 상태로 시작 */
export const Open: Story = {
  render: () => (
    <SheetWrapper defaultOpen companionImageUrl="https://placehold.co/96x96" />
  ),
};

/** 받침 있는 이름 — "과" 조사 확인 */
export const WithFinalConsonant: Story = {
  render: () => (
    <SheetWrapper
      defaultOpen
      companionName="서윤"
      companionImageUrl="https://placehold.co/96x96"
    />
  ),
};
