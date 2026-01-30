import type { Companion } from "@/schemas/companion";

import { Card } from "../companion/Card";

import { NewMemberSection } from "./NewMemberSection";

interface CastingCardGridProps {
  companions: Companion[];
  onCompanionClick: (companion: Companion) => void;
  onNewMember: () => void;
}

export function CastingCardGrid({
  companions,
  onCompanionClick,
  onNewMember,
}: CastingCardGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {companions.map((companion) => (
        <Card
          key={companion.id}
          companion={companion}
          onClick={() => onCompanionClick(companion)}
        />
      ))}

      <NewMemberSection onNewMember={onNewMember} />
    </div>
  );
}
