import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";

interface ProfileProps {
  url?: string | null;
  alt: string;
  variant?: "default" | "profile";
}

const SIZE_CLASSES = {
  default: "size-image-lg",
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
        "relative overflow-hidden rounded-lg border border-base-300",
        SIZE_CLASSES[variant],
      )}
    >
      {url ? (
        <Image src={url} alt={alt} fill className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center">
          <UserIcon className="size-1/2 text-base-content/50" />
        </div>
      )}
    </div>
  );
}
