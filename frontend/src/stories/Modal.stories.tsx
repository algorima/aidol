import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { ProfileContent } from "@/components/companion/ProfileContent";
import { Modal } from "@/components/Modal";
import { PositionSelector } from "@/components/position/PositionSelector";
import type { Companion, CompanionStats, Position } from "@/schemas/companion";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const SAMPLE_STATS: CompanionStats = {
  vocal: 85,
  dance: 78,
  rap: 65,
  visual: 90,
  stamina: 72,
  charm: 88,
};

const SAMPLE_COMPANION: Companion = {
  id: "1",
  aidolId: "1",
  name: "홍길동",
  profilePictureUrl:
    "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop",
  grade: "A",
  position: "MAIN_VOCAL",
  mbti: "ENFP",
  biography:
    "국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 위원은 정당에 가입하거나 정치에 관여할 수 없다. 탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 위원은 정당에 가입하거나 정치에 관여할 수 없다. 탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 위원은 정당에 가입하거나 정치에 관여할 수 없다. 탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다.",
  status: "PUBLISHED",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

function ModalWrapper({
  action,
  companion = SAMPLE_COMPANION,
  defaultOpen = false,
}: {
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "neutral";
  };
  companion?: Companion;
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
        팝업 열기
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} action={action}>
        <ProfileContent companion={companion} />
      </Modal>
    </div>
  );
}

/** 닫기 버튼만 있는 기본 팝업 */
export const Default: Story = {
  render: () => <ModalWrapper />,
};

/** primary 버튼이 있는 팝업 */
export const WithPrimaryAction: Story = {
  render: () => (
    <ModalWrapper
      action={{
        label: "캐스팅후보로 추가",
        onClick: () => alert("캐스팅후보로 추가됨!"),
        variant: "primary",
      }}
    />
  ),
};

/** neutral 버튼이 있는 팝업 */
export const WithNeutralAction: Story = {
  render: () => (
    <ModalWrapper
      action={{
        label: "삭제",
        onClick: () => alert("삭제됨!"),
        variant: "neutral",
      }}
    />
  ),
};

/** 능력치 차트가 포함된 팝업 */
export const WithStats: Story = {
  render: () => (
    <ModalWrapper
      companion={{ ...SAMPLE_COMPANION, stats: SAMPLE_STATS }}
      action={{
        label: "캐스팅후보로 추가",
        onClick: () => alert("캐스팅후보로 추가됨!"),
        variant: "primary",
      }}
    />
  ),
};

const POSITION_COMPANIONS: Companion[] = [
  { ...SAMPLE_COMPANION, id: "1", name: "김민지", position: "MAIN_VOCAL" },
  { ...SAMPLE_COMPANION, id: "2", name: "이수진", position: "MAIN_DANCER" },
  { ...SAMPLE_COMPANION, id: "3", name: "박서연", position: null },
];

function PositionModalWrapper() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null,
  );
  const companion = POSITION_COMPANIONS[2];

  return (
    <div className="bg-base-100 flex h-screen items-center justify-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn btn-primary"
      >
        포지션 선택 팝업 열기
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        action={{
          label: "배정하기",
          onClick: () => alert(`${selectedPosition} 배정!`),
          variant: "primary",
        }}
      >
        <div className="flex flex-col gap-6">
          <ProfileContent
            companion={companion}
            showBiography={false}
            showStats={false}
          />
          <PositionSelector
            selectedPosition={selectedPosition}
            companions={POSITION_COMPANIONS}
            currentCompanionId={companion.id}
            onPositionChange={setSelectedPosition}
          />
        </div>
      </Modal>
    </div>
  );
}

/** 포지션 선택 모달 */
export const WithPositionSelector: Story = {
  render: () => <PositionModalWrapper />,
};
