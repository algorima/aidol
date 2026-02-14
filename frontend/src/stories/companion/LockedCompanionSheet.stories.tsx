import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { LockedCompanionSheet } from "@/components/companion/LockedCompanionSheet";

const meta: Meta<typeof LockedCompanionSheet> = {
  title: "Companion/LockedCompanionSheet",
  component: LockedCompanionSheet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LockedCompanionSheet>;

function SheetWrapper({
  companionImageUrl,
  defaultOpen = false,
}: {
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
        companionName="루나"
        companionImageUrl={companionImageUrl}
      />
    </div>
  );
}

/** 프로필 이미지가 있는 기본 상태 */
export const Default: Story = {
  render: () => (
    <SheetWrapper companionImageUrl="https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop" />
  ),
};

/** 프로필 이미지 없이 UserIcon 폴백 */
export const WithoutImage: Story = {
  render: () => <SheetWrapper />,
};

/** 열린 상태로 시작 */
export const Open: Story = {
  render: () => (
    <SheetWrapper
      defaultOpen
      companionImageUrl="https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    />
  ),
};
