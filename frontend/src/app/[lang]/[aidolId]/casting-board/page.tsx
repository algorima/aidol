"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { CastingBoard } from "@/components/casting-board";
import { ProfileContent } from "@/components/companion/ProfileContent";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { Companion } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface CastingBoardProps {
  params: { lang: string; aidolId: string };
}

export default function CastingBoardPage({ params }: CastingBoardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchCompanions = async () => {
      setIsLoading(true);
      try {
        const response = await companionRepository.getList({
          filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
        });
        setCompanions(response.data);
      } catch (error) {
        console.error("Failed to fetch companions:", error);
        showToast(t("aidol:castingBoard.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCompanions();
  }, [aidolId, companionRepository, showToast, t]);

  const handleBrowse = useCallback(() => {
    router.push(`/${lang}/companions`);
  }, [lang, router]);

  const handleCardClick = useCallback((companion: Companion) => {
    setSelectedCompanion(companion);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCompanion(null);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!selectedCompanion) return;

    try {
      await companionRepository.deleteOne({ id: selectedCompanion.id });
      setCompanions((prev) =>
        prev.filter((c) => c.id !== selectedCompanion.id),
      );
      handleCloseModal();
      showToast(t("aidol:castingBoard.deleted"), "accent");
    } catch (error) {
      console.error("Failed to delete companion:", error);
      showToast(t("aidol:castingBoard.error.delete"), "error");
    }
  }, [selectedCompanion, companionRepository, handleCloseModal, showToast, t]);

  const handleConfirm = useCallback(() => {
    router.push(`/${lang}/${aidolId}/position-assignment`);
  }, [lang, aidolId, router]);

  return (
    <div className="bg-base-100 flex h-screen flex-col">
      <Header title={t("aidol:castingBoard.header")} />
      <CastingBoard
        companions={companions}
        isLoading={isLoading}
        onBrowse={handleBrowse}
        onCardClick={handleCardClick}
        onConfirm={handleConfirm}
      />
      {selectedCompanion && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          action={{
            label: t("aidol:castingBoard.delete"),
            onClick: () => void handleDelete(),
            variant: "neutral",
          }}
        >
          <ProfileContent companion={selectedCompanion} />
        </Modal>
      )}
    </div>
  );
}
