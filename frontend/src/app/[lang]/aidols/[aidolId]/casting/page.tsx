"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  CastingCardGrid,
  CastingInfoBanner,
  GenderFilterTabs,
} from "@/components/casting";
import type { GenderTab } from "@/components/casting";
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

export default function CastingPage() {
  const { t } = useTranslation();
  const { aidolId: _aidolId } = useParams<{ aidolId: string }>();
  const [activeTab, setActiveTab] = useState<GenderTab>("boy");
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gender = TAB_TO_GENDER[activeTab];
  const companions = getMockCompanions({ gender });

  const handleCompanionClick = (companion: Companion) => {
    setSelectedCompanion(companion);
    setIsModalOpen(true);
  };

  const handleNewMember = () => {
    // TODO: POST /companions → /aidols/{aidolId}/companions/{companionId}/gender
  };

  return (
    <div className="max-w-mobile mx-auto flex min-h-screen flex-col">
      <Header
        title={t("aidol:casting.title")}
        rightContent={
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleNewMember}
          >
            {t("aidol:casting.addMember")}
          </button>
        }
      />

      <div className="flex flex-col gap-6 px-6 py-4">
        <CastingInfoBanner />
        <GenderFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CastingCardGrid
          companions={companions}
          onCompanionClick={handleCompanionClick}
          onNewMember={handleNewMember}
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
