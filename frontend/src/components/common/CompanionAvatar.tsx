import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";

interface CompanionAvatarProps {
  imageUrl?: string | null;
  name: string;
  active?: boolean;
  className?: string;
}

export function CompanionAvatar({
  imageUrl,
  name,
  active = true,
  className,
}: CompanionAvatarProps) {
  return (
    <div className={clsx("relative shrink-0", className)}>
      <div className="border-base-300 bg-base-200 relative size-12 overflow-hidden rounded-lg border">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center">
            <UserIcon className="text-base-content/50 size-6" />
          </div>
        )}
        {!active && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <LockClosedIcon className="size-6 text-white" />
          </div>
        )}
      </div>
      {active && (
        <span className="bg-primary border-base-100 absolute -right-1 -bottom-1 size-[18px] rounded-full border-4" />
      )}
    </div>
  );
}
