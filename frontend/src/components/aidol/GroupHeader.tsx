"use client";

import { UserGroupIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import type { AIdol } from "../../schemas";

interface GroupHeaderProps {
  aidol: AIdol;
}

/**
 * Header component for AIdol group profile page.
 * Displays group image, name, and concept.
 */
export function GroupHeader({ aidol }: GroupHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="bg-base-200 relative size-32 overflow-hidden rounded-full">
        {aidol.profileImageUrl ? (
          <Image
            src={aidol.profileImageUrl}
            alt={aidol.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="from-primary/20 to-secondary/20 flex size-full items-center justify-center bg-gradient-to-br">
            <UserGroupIcon className="text-base-content/50 size-16" />
          </div>
        )}
      </div>
      <div>
        <h1 className="text-display-s text-base-content font-bold">
          {aidol.name}
        </h1>
        {aidol.concept && (
          <p className="text-body-l text-base-content/70 mt-2">
            {aidol.concept}
          </p>
        )}
      </div>
    </div>
  );
}
