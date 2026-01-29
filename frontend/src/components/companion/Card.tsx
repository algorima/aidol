import type { Companion } from "../../schemas";

import { ImagePreview } from "./ImagePreview";

interface CardProps {
  companion: Companion;
  onClick?: () => void;
}

/**
 * Companion card component displaying profile picture and name.
 */
export function Card({ companion, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="card bg-base-200 cursor-pointer p-4 transition-shadow hover:shadow-lg"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="flex items-center gap-4">
        <ImagePreview
          url={companion.profilePictureUrl}
          alt={companion.name}
          size="md"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-title-m text-base-content truncate font-semibold">
            {companion.name}
          </h3>
          {companion.biography && (
            <p className="text-body-s text-base-content/70 mt-1 line-clamp-2">
              {companion.biography}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
