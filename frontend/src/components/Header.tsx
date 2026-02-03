import {
  ArrowLeftIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import type { ReactNode } from "react";

interface HeaderProps {
  // 왼쪽 (하나만 선택)
  title?: string;
  logo?: boolean;
  onDropdownClick?: () => void;
  onBackClick?: () => void;
  onCloseClick?: () => void;

  // 오른쪽
  children?: ReactNode;
}

export function Header({
  title,
  logo,
  onDropdownClick,
  onBackClick,
  onCloseClick,
  children,
}: HeaderProps) {
  const renderLeft = () => {
    if (logo) {
      return (
        <Image src="/images/logo.svg" alt="alola" width={91} height={27} />
      );
    }

    if (onDropdownClick) {
      return (
        <button
          type="button"
          onClick={onDropdownClick}
          className="text-headline-s text-base-content flex items-center gap-2"
        >
          <span>{title}</span>
          <ChevronUpDownIcon className="size-6" />
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2">
        {onBackClick && (
          <button
            type="button"
            onClick={onBackClick}
            className="text-base-content flex items-center justify-center"
            aria-label="뒤로 가기"
          >
            <ArrowLeftIcon className="size-6" />
          </button>
        )}
        {onCloseClick && (
          <button
            type="button"
            onClick={onCloseClick}
            className="text-base-content flex items-center justify-center"
            aria-label="닫기"
          >
            <XMarkIcon className="size-6" />
          </button>
        )}
        <h1 className="text-headline-s text-base-content">{title}</h1>
      </div>
    );
  };

  return (
    <header className="h-header bg-base-100 flex shrink-0 items-center justify-between px-6 py-7">
      {renderLeft()}
      {children && (
        <div className="flex shrink-0 items-center gap-2">{children}</div>
      )}
    </header>
  );
}
