import type { Companion } from "@/schemas/companion";

import { ImagePreview } from "./ImagePreview";

interface ProfileContentProps {
  companion: Companion;
}

export function ProfileContent({ companion }: ProfileContentProps) {
  const { name, profilePictureUrl, grade, mbti, biography } = companion;

  return (
    <div className="flex flex-col items-center gap-6">
      <ImagePreview url={profilePictureUrl ?? null} alt={name} />
      <div className="flex flex-col gap-2 self-start">
        <h2 className="text-title-s text-base-content font-semibold">{name}</h2>
        {(grade || mbti) && (
          <div className="flex gap-2">
            {grade && (
              <span className="text-label-l rounded-lg bg-black px-2 py-1 text-white">
                {grade} 등급
              </span>
            )}
            {mbti && (
              <span className="bg-neutral text-label-l rounded-lg px-2 py-1 text-white">
                {mbti}
              </span>
            )}
          </div>
        )}
      </div>
      {biography && (
        <p className="text-body-s text-base-content">{biography}</p>
      )}
    </div>
  );
}
