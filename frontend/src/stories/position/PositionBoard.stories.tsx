import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ProfileContent } from "@/components/companion/ProfileContent";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { PositionBoard } from "@/components/position/PositionBoard";
import { PositionSelector } from "@/components/position/PositionSelector";
import type { Companion } from "@/schemas/companion";

const meta: Meta<typeof PositionBoard> = {
  title: "Components/Position/PositionBoard",
  component: PositionBoard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PositionBoard>;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const createCompanion = (
  id: string,
  name: string,
  grade: string,
  position: string | null = null,
): Companion => ({
  id,
  name,
  profilePictureUrl: sampleImage,
  biography: "밝고 긍정적인 성격의 멤버",
  grade,
  position,
  mbti: "ENFP",
  aidolId: "aidol-1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const allUnassigned = [
  createCompanion("1", "김민지", "S"),
  createCompanion("2", "이수진", "A"),
  createCompanion("3", "박서연", "A"),
  createCompanion("4", "최유나", "B"),
];

const partialAssigned = [
  createCompanion("1", "김민지", "S", "mainVocal"),
  createCompanion("2", "이수진", "A", "mainDancer"),
  createCompanion("3", "박서연", "A"),
  createCompanion("4", "최유나", "B"),
];

const allAssigned = [
  createCompanion("1", "김민지", "S", "mainVocal"),
  createCompanion("2", "이수진", "A", "mainDancer"),
  createCompanion("3", "박서연", "A", "subVocal"),
  createCompanion("4", "최유나", "B", "mainRapper"),
];

function PageWrapper({
  companions,
  isLoading = false,
}: {
  companions: Companion[];
  isLoading?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="max-w-mobile mx-auto">
      <div className="bg-base-100 flex h-screen flex-col">
        <Header title={t("aidol:position.header")} />
        <PositionBoard
          companions={companions}
          isLoading={isLoading}
          onCardClick={(c) => alert(`${c.name} 클릭!`)}
          onConfirm={() => alert("그룹 기획하기!")}
        />
      </div>
    </div>
  );
}

/** 모두 미배정 (버튼 비활성화) */
export const AllUnassigned: Story = {
  render: () => <PageWrapper companions={allUnassigned} />,
};

/** 일부 배정 (버튼 비활성화) */
export const PartialAssigned: Story = {
  render: () => <PageWrapper companions={partialAssigned} />,
};

/** 모두 배정 완료 (버튼 활성화) */
export const AllAssigned: Story = {
  render: () => <PageWrapper companions={allAssigned} />,
};

function PageWrapperWithModal({ companions }: { companions: Companion[] }) {
  const { t } = useTranslation();
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    companions[1],
  );
  const [selectedPosition, setSelectedPosition] = useState<string | null>(
    companions[1]?.position ?? null,
  );
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompanion(null);
  };

  return (
    <div className="max-w-mobile mx-auto">
      <div className="bg-base-100 flex h-screen flex-col">
        <Header title={t("aidol:position.header")} />
        <PositionBoard
          companions={companions}
          isLoading={false}
          onCardClick={(c) => {
            setSelectedCompanion(c);
            setSelectedPosition(c.position ?? null);
            setIsModalOpen(true);
          }}
          onConfirm={() => alert("그룹 기획하기!")}
        />
        {selectedCompanion && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            action={{
              label: t("aidol:position.assign"),
              onClick: () => {
                alert(
                  `${selectedCompanion.name}에게 ${selectedPosition} 배정!`,
                );
                handleCloseModal();
              },
              variant: "neutral",
            }}
          >
            <div className="flex flex-col gap-6">
              <ProfileContent
                companion={selectedCompanion}
                showBiography={false}
              />
              <PositionSelector
                selectedPosition={selectedPosition}
                companions={companions}
                currentCompanionId={selectedCompanion.id}
                onPositionChange={setSelectedPosition}
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

/** 모달 열린 상태 (포지션 선택) */
export const WithModalOpen: Story = {
  render: () => <PageWrapperWithModal companions={partialAssigned} />,
};
