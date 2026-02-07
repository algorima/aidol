import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Card } from "@/components";
import type { Companion } from "@/schemas/companion";
import type { CompanionRelationship } from "@/schemas/companionRelationship";

interface SelectMemberStepProps {
  companions: Companion[];
  relationships: CompanionRelationship[];
  fromCompanionId: string;
  selectedCompanionId: string | null;
  onSelect: (companionId: string) => void;
}

export function SelectMemberStep({
  companions,
  relationships,
  fromCompanionId,
  selectedCompanionId,
  onSelect,
}: SelectMemberStepProps) {
  const { t } = useTranslation();

  const getRelationshipFrom = (toId: string) => {
    return relationships.find(
      (rel) =>
        rel.fromCompanionId === fromCompanionId && rel.toCompanionId === toId,
    );
  };

  return (
    <>
      <p className="text-title-s mb-4">
        {t("aidol:chemistry.add.selectMember")}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {companions.map((member) => {
          const relationship = getRelationshipFrom(member.id);
          const hasRelationship = relationship && relationship.intimacy > 0;
          const isSelected = member.id === selectedCompanionId;

          return (
            <Card
              key={member.id}
              companion={member}
              variant="position"
              className={clsx(
                "h-50 w-full",
                isSelected && "border-primary ring-primary ring-2",
              )}
              disabled={hasRelationship}
              overlayText={
                hasRelationship ? relationship.nickname ?? undefined : undefined
              }
              onClick={
                !hasRelationship ? () => onSelect(member.id) : undefined
              }
            />
          );
        })}
      </div>
    </>
  );
}
