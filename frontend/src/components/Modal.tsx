import clsx from "clsx";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "neutral";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  action?: ModalAction;
}

export function Modal({ isOpen, onClose, children, action }: ModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 z-40 h-screen w-screen bg-black/80"
        onClick={onClose}
      />
      <div
        className="max-w-mobile fixed inset-0 z-50 mx-auto flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div
          className="bg-base-200 relative flex max-h-170 min-h-90 w-full flex-col gap-6 overflow-hidden rounded-lg p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="scrollbar-hide flex-1 overflow-y-auto pb-20">
            {children}
          </div>

          <div className="absolute inset-x-6 bottom-6 flex shrink-0 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-lg bg-base-300 text-label-l text-base-content rounded-lg p-4"
            >
              {t("aidol:common.close")}
            </button>
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className={clsx(
                  "btn btn-lg text-label-l flex-1",
                  action.variant === "neutral" ? "btn-neutral" : "btn-primary",
                )}
              >
                {action.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
