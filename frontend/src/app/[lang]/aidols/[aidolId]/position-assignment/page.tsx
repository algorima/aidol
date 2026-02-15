"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { ProfileContent } from "@/components/companion/ProfileContent";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { PositionBoard, PositionSelector } from "@/components/position";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { Companion, Position } from "@/schemas";
import { getApiService } from "@/services/ApiService";

interface PositionPageProps {
  params: { lang: string; aidolId: string };
}

export default function PositionPage({ params }: PositionPageProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showToast } = useToast();
  const { lang, aidolId } = params;

  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(
    null,
  );
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
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
        showToast(t("aidol:position.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCompanions();
  }, [aidolId, companionRepository, showToast, t]);

  const handleCardClick = (companion: Companion) => {
    setSelectedCompanion(companion);
    setSelectedPosition(companion.position ?? null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompanion(null);
    setSelectedPosition(null);
  };

  const handlePositionChange = (position: Position | null) => {
    setSelectedPosition(position);
  };

  const handleAssign = async () => {
    if (!selectedCompanion) return;

    try {
      await companionRepository.update({
        id: selectedCompanion.id,
        variables: { position: selectedPosition },
      });

      setCompanions((prev) =>
        prev.map((c) => {
          if (c.id === selectedCompanion.id) {
            return { ...c, position: selectedPosition };
          }
          return c;
        }),
      );

      handleCloseModal();
    } catch (error) {
      console.error("Failed to update position:", error);
      showToast(t("aidol:position.error.update"), "error");
    }
  };

  const handleConfirm = () => {
    router.push(`/${lang}/aidols/${aidolId}/group`);
  };

  return (
    <div className="bg-base-100 flex h-screen flex-col">
      <Header title={t("aidol:position.header")} />
      <PositionBoard
        companions={companions}
        isLoading={isLoading}
        onCardClick={handleCardClick}
        onConfirm={handleConfirm}
      />
      {selectedCompanion && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          action={{
            label: t("aidol:position.assign"),
            onClick: () => void handleAssign(),
            variant: "primary",
          }}
        >
          <div className="flex flex-col gap-6">
            <ProfileContent
              companion={selectedCompanion}
              showBiography={false}
              showStats={false}
            />
            <PositionSelector
              selectedPosition={selectedPosition}
              companions={companions}
              currentCompanionId={selectedCompanion.id}
              onPositionChange={handlePositionChange}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
