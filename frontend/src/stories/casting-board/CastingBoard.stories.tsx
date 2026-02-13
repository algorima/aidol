import type { Meta, StoryObj } from "@storybook/react";
import { useTranslation } from "react-i18next";

import { CastingBoard } from "@/components/casting-board/CastingBoard";
import { Header } from "@/components/Header";
import type { Grade } from "@/schemas";
import type { Companion } from "@/schemas/companion";

const meta: Meta<typeof CastingBoard> = {
  title: "Components/CastingBoard/CastingBoard",
  component: CastingBoard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CastingBoard>;

const sampleImage =
  "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?fm=jpg&q=60&w=3000&auto=format&fit=crop";

const createCompanion = (
  id: string,
  name: string,
  grade: Grade,
): Companion => ({
  id,
  name,
  profilePictureUrl: sampleImage,
  biography: "밝고 긍정적인 성격의 멤버",
  grade,
  position: null,
  mbti: "ENFP",
  aidolId: "aidol-1",
  status: "PUBLISHED",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const oneCompanion = [createCompanion("1", "홍길동", "A")];

const twoCompanions = [
  createCompanion("1", "홍길동", "A"),
  createCompanion("2", "이수진", "A"),
];

const sixCompanions = [
  createCompanion("1", "홍길동", "A"),
  createCompanion("2", "이수진", "A"),
  createCompanion("3", "박지민", "B"),
  createCompanion("4", "김태형", "A"),
  createCompanion("5", "정호석", "A"),
  createCompanion("6", "전정국", "A"),
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
        <Header title={t("aidol:castingBoard.header")} />
        <CastingBoard
          companions={companions}
          isLoading={isLoading}
          onBrowse={() => alert("연습생 둘러보기!")}
          onCardClick={(c) => alert(`${c.name} 클릭!`)}
          onConfirm={() => alert("데뷔조 확정!")}
        />
      </div>
    </div>
  );
}

/** 빈 상태 */
export const Empty: Story = {
  render: () => <PageWrapper companions={[]} />,
};

/** 로딩 상태 */
export const Loading: Story = {
  render: () => <PageWrapper companions={[]} isLoading />,
};

/** 1명 (2명 미만 - 버튼 비활성화) */
export const OneMember: Story = {
  render: () => <PageWrapper companions={oneCompanion} />,
};

/** 2명 (최소 인원 충족 - 버튼 활성화) */
export const TwoMembers: Story = {
  render: () => <PageWrapper companions={twoCompanions} />,
};

/** 6명 */
export const SixMembers: Story = {
  render: () => <PageWrapper companions={sixCompanions} />,
};
