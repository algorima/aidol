import { PlusIcon } from "@heroicons/react/24/outline";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import type { GenderTab } from "@/components/casting";
import {
  CastingCardGrid,
  CastingInfoBanner,
  GenderFilterTabs,
} from "@/components/casting";
import { NewMemberSection } from "@/components/casting/NewMemberSection";
import { ProfileContent } from "@/components/companion/ProfileContent";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { getMockCompanions } from "@/mocks/companions";
import type { Companion, Gender } from "@/schemas/companion";

const TAB_TO_GENDER: Record<GenderTab, Gender | undefined> = {
  boy: "male",
  girl: "female",
  mixed: undefined,
};

function CastingPageFull() {
  const [activeTab, setActiveTab] = useState<GenderTab>("boy");
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gender = TAB_TO_GENDER[activeTab];
  const companions = getMockCompanions({ gender });

  return (
    <div className="max-w-mobile mx-auto flex min-h-screen flex-col">
      <Header
        title="캐스팅"
        rightContent={
          <button type="button" className="btn btn-primary gap-2.5">
            신규 멤버
            <PlusIcon className="size-4" />
          </button>
        }
      />

      <div className="flex flex-col gap-6 px-6 py-4">
        <CastingInfoBanner />
        <GenderFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CastingCardGrid
          companions={companions}
          onCompanionClick={(companion) => {
            setSelectedCompanion(companion);
            setIsModalOpen(true);
          }}
          onNewMember={() => {}}
        />
      </div>

      {selectedCompanion && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProfileContent companion={selectedCompanion} />
        </Modal>
      )}
    </div>
  );
}

const meta: Meta = {
  title: "Pages/CastingPage",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <CastingPageFull />,
};

export const InfoBanner: Story = {
  render: () => (
    <div className="max-w-mobile p-6">
      <CastingInfoBanner />
    </div>
  ),
};

export const FilterTabs: Story = {
  render: () => {
    const [tab, setTab] = useState<GenderTab>("boy");
    return (
      <div className="max-w-mobile p-6">
        <GenderFilterTabs activeTab={tab} onTabChange={setTab} />
      </div>
    );
  },
};

export const NewMember: Story = {
  render: () => (
    <div className="max-w-mobile p-6">
      <NewMemberSection onNewMember={() => {}} />
    </div>
  ),
};
