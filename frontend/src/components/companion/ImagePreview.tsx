import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";

interface ProfileProps {
  url?: string | null;
  alt: string;
  variant?: "default" | "profile";
}

const SIZE_CLASSES = {
  default: "size-profile",
  profile: "size-full",
};

/**
 * Profile image component for companion.
 * Shows a placeholder when no image URL is provided.
 */
export function ImagePreview({ url, alt, variant = "default" }: ProfileProps) {
  return (
    <div
      className={clsx(
        "border-base-300 relative overflow-hidden rounded-lg border",
        SIZE_CLASSES[variant],
      )}
    >
      {url ? (
        <Image src={url} alt={alt} fill className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center">
          <UserIcon className="text-base-content/50 size-1/2" />
        </div>
      )}
    </div>
  );
}
