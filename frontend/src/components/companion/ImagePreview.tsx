"use client";

import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface ImagePreviewProps {
  url?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "size-16",
  md: "size-24",
  lg: "size-32",
};

/**
 * Image preview component for companion profile pictures.
 * Shows a placeholder when no image URL is provided.
 */
export function ImagePreview({ url, alt, size = "md" }: ImagePreviewProps) {
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-base-200 ${sizeClass}`}
    >
      {url ? (
        <Image src={url} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
          <UserIcon className="size-1/2 text-base-content/50" />
        </div>
      )}
    </div>
  );
}
