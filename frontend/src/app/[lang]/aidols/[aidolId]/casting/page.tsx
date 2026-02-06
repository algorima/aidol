"use client";

import type { GetListParams } from "@aioia/core";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import type { GenderTab } from "@/components/casting";
import {
  CastingCardGrid,
  CastingInfoBanner,
  GenderFilterTabs,
} from "@/components/casting";
import { ProfileContent } from "@/components/companion/ProfileContent";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { CompanionRepository } from "@/repositories";
import type { Companion, Gender } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

const TAB_TO_GENDER: Record<GenderTab, Gender | undefined> = {
  boy: "male",
  girl: "female",
  mixed: undefined,
};

const buildFilters = (gender: Gender | undefined): GetListParams["filters"] => {
  const filters: GetListParams["filters"] = [
    { field: "status", operator: "eq", value: "published" },
  ];

  if (gender) {
    filters.push({ field: "gender", operator: "eq", value: gender });
  }

  return filters;
};

interface CastingPageProps {
  params: {
    lang: string;
    aidolId: string;
  };
}

export default function CastingPage({ params }: CastingPageProps) {
  const { lang, aidolId } = params;
  const { t } = useTranslation();
  const { showToast } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<GenderTab>("boy");
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null,
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  const gender = TAB_TO_GENDER[activeTab];

  const fetchCompanions = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await companionRepository.getList({
        filters: buildFilters(gender),
        pagination: { current: 1, pageSize: 100 },
      });
      setCompanions(response.data);
    } catch {
      setCompanions([]);
      showToast(t("aidol:companionCreate.error.load"), "error");
    } finally {
      setIsLoading(false);
    }
  }, [companionRepository, gender, showToast, t]);

  useEffect(() => {
    void fetchCompanions();
  }, [fetchCompanions]);

  const handleCompanionClick = useCallback((companion: Companion) => {
    setSelectedCompanion(companion);
    setIsProfileOpen(true);
  }, []);

  const handleCast = useCallback(async () => {
    if (!selectedCompanion) return;

    try {
      await companionRepository.update({
        id: selectedCompanion.id,
        variables: { aidolId },
      });
      setIsProfileOpen(false);
      router.push(`/${lang}/aidols/${aidolId}/casting-complete`);
    } catch {
      showToast(t("aidol:casting.error.cast"), "error");
    }
  }, [
    selectedCompanion,
    companionRepository,
    aidolId,
    lang,
    router,
    showToast,
    t,
  ]);

  const handleNewMember = useCallback(() => {
    router.push(`/${lang}/aidols/${aidolId}/companions/create`);
  }, [lang, aidolId, router]);

  return (
    <div className="max-w-mobile mx-auto flex min-h-screen flex-col">
      <Header title={t("aidol:casting.title")}>
        <button
          type="button"
          className="btn btn-primary gap-2.5"
          onClick={handleNewMember}
        >
          {t("aidol:casting.addMember")}
          <PlusIcon className="size-4" />
        </button>
      </Header>

      <div className="flex flex-col gap-6 px-6 py-4">
        <CastingInfoBanner />
        <GenderFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <CastingCardGrid
            companions={companions}
            onCompanionClick={handleCompanionClick}
            onNewMember={handleNewMember}
          />
        )}
      </div>

      {selectedCompanion && (
        <Modal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          action={{
            label: t("aidol:casting.castButton"),
            onClick: () => void handleCast(),
            variant: "primary",
          }}
        >
          <ProfileContent companion={selectedCompanion} />
        </Modal>
      )}
    </div>
  );
}
