import type { Companion } from "@/schemas/companion";

import { Card } from "../companion/Card";

import { NewMemberSection } from "./NewMemberSection";

const NEW_MEMBER_INSERT_INDEX = 24;

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
  const before = companions.slice(0, NEW_MEMBER_INSERT_INDEX);
  const after = companions.slice(NEW_MEMBER_INSERT_INDEX);

  return (
    <div className="grid grid-cols-2 gap-6">
      {before.map((companion) => (
        <Card
          key={companion.id}
          companion={companion}
          onClick={() => onCompanionClick(companion)}
        />
      ))}

      <NewMemberSection onNewMember={onNewMember} />

      {after.map((companion) => (
        <Card
          key={companion.id}
          companion={companion}
          onClick={() => onCompanionClick(companion)}
        />
      ))}
    </div>
  );
}
