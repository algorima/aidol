"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import {
  ChemistryContent,
  type ChemistryRelation,
} from "@/components/group/ChemistryContent";
import { Loading } from "@/components/Loading";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { Companion } from "@/schemas/companion";
import { getApiService } from "@/services/ApiService";

// TODO: API 구현 후 Repository로 교체
const MOCK_RELATIONS: ChemistryRelation[] = [
  { fromId: "c1", toId: "c2", fromLabel: "메인보컬", toLabel: "메인댄서" },
  { fromId: "c1", toId: "c3", fromLabel: "리더", toLabel: "래퍼" },
];

interface ChemistryPageProps {
  params: { lang: string; aidolId: string };
}

export default function ChemistryPage({ params }: ChemistryPageProps) {
  const { t } = useTranslation("aidol");
  const router = useRouter();
  const { showToast } = useToast();
  const { aidolId } = params;

  const [companions, setCompanions] = useState<Companion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await companionRepository.getList({
          filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
        });
        setCompanions(response.data);
        if (response.data.length > 0) {
          setSelectedMemberId(response.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch companions:", error);
        showToast(t("chemistry.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [aidolId, companionRepository, showToast, t]);

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-dvh flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  const selectedMember = companions.find((c) => c.id === selectedMemberId);

  if (!selectedMember) return null;

  const filteredRelations = MOCK_RELATIONS.filter(
    (r) => r.fromId === selectedMemberId,
  );

  return (
    <ChemistryContent
      companions={companions}
      relations={filteredRelations}
      selectedMember={selectedMember}
      onSelectMember={setSelectedMemberId}
      onBack={() => router.back()}
    />
  );
}
