"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/app/providers/Toast";
import { ChemistryContent } from "@/components/group/ChemistryContent";
import { Loading } from "@/components/Loading";
import { CompanionRelationshipRepository } from "@/repositories/CompanionRelationshipRepository";
import { CompanionRepository } from "@/repositories/CompanionRepository";
import type { Companion } from "@/schemas/companion";
import type { CompanionRelationship } from "@/schemas/companion-relationship";
import { getApiService } from "@/services/ApiService";

interface ChemistryPageProps {
  params: { lang: string; aidolId: string };
}

export default function ChemistryPage({ params }: ChemistryPageProps) {
  const { t } = useTranslation("aidol");
  const router = useRouter();
  const { showToast } = useToast();
  const { aidolId } = params;

  const [companions, setCompanions] = useState<Companion[]>([]);
  const [relationships, setRelationships] = useState<CompanionRelationship[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const companionRepository = useMemo(
    () => new CompanionRepository(getApiService()),
    [],
  );
  const relationshipRepository = useMemo(
    () => new CompanionRelationshipRepository(getApiService()),
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const companionsResponse = await companionRepository.getList({
          filters: [{ field: "aidolId", operator: "eq", value: aidolId }],
          pagination: { current: 1, pageSize: 100 },
        });
        const fetchedCompanions = companionsResponse.data;
        setCompanions(fetchedCompanions);

        if (fetchedCompanions.length > 0) {
          setSelectedMemberId(fetchedCompanions[0].id);

          const companionIds = fetchedCompanions.map((c) => c.id);
          const relationshipsResponse = await relationshipRepository.getList({
            filters: [
              {
                field: "fromCompanionId",
                operator: "in",
                value: companionIds,
              },
            ],
            pagination: { current: 1, pageSize: 100 },
          });
          setRelationships(relationshipsResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch chemistry page data:", error);
        showToast(t("chemistry.error.load"), "error");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [aidolId, companionRepository, relationshipRepository, showToast, t]);

  if (isLoading) {
    return (
      <div className="bg-base-100 flex h-dvh flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  const selectedMember = companions.find((c) => c.id === selectedMemberId);

  if (!selectedMember) return null;

  return (
    <ChemistryContent
      companions={companions}
      relationships={relationships}
      selectedMember={selectedMember}
      onSelectMember={setSelectedMemberId}
      onBack={() => router.push(`/${params.lang}/aidols/${aidolId}/detail`)}
    />
  );
}
