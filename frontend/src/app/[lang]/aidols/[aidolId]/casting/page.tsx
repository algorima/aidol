"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { GenderTab } from "@/components/casting";
import {
  CastingCardGrid,
  CastingInfoBanner,
  GenderFilterTabs,
} from "@/components/casting";
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
  const router = useRouter();
  const { aidolId } = useParams<{ aidolId: string }>();
  const [activeTab, setActiveTab] = useState<GenderTab>("boy");
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null,
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCastCompleteOpen, setIsCastCompleteOpen] = useState(false);

  const gender = TAB_TO_GENDER[activeTab];
  const companions = getMockCompanions({ gender });

  const handleCompanionClick = (companion: Companion) => {
    setSelectedCompanion(companion);
    setIsProfileOpen(true);
  };

  const handleCast = () => {
    setIsProfileOpen(false);
    setIsCastCompleteOpen(true);
  };

  const handleCastComplete = () => {
    setIsCastCompleteOpen(false);
    router.push(`/aidols/${aidolId}/casting-board`);
  };

  const handleNewMember = () => {
    // 추후 수정 필요
  };

  return (
    <div className="max-w-mobile mx-auto flex min-h-screen flex-col">
      <Header
        title={t("aidol:casting.title")}
        rightContent={
          <button
            type="button"
            className="btn btn-primary gap-2.5"
            onClick={handleNewMember}
          >
            {t("aidol:casting.addMember")}
            <PlusIcon className="size-6" />
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
        <Modal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          action={{
            label: t("aidol:casting.castButton"),
            onClick: handleCast,
            variant: "primary",
          }}
        >
          <ProfileContent companion={selectedCompanion} />
        </Modal>
      )}

      <Modal
        isOpen={isCastCompleteOpen}
        onClose={() => setIsCastCompleteOpen(false)}
        action={{
          label: t("aidol:casting.castComplete.viewBoard"),
          onClick: handleCastComplete,
          variant: "primary",
        }}
      >
        <div className="flex flex-col items-center gap-4 py-8">
          <CheckCircleIcon className="text-success size-16" />
          <h2 className="text-headline-s text-base-content">
            {t("aidol:casting.castComplete.title")}
          </h2>
          <p className="text-body-s text-base-content/60">
            {t("aidol:casting.castComplete.description")}
          </p>
        </div>
      </Modal>
    </div>
  );
}
