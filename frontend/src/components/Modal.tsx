import clsx from "clsx";
import { type ReactNode, useEffect, useRef } from "react";
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
  position?: "center" | "bottom";
}

export function Modal({
  isOpen,
  onClose,
  children,
  action,
  position = "center",
}: ModalProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={clsx("modal", position === "bottom" && "modal-bottom")}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div
        className={clsx(
          "modal-box bg-base-200 max-w-mobile w-full",
          position === "bottom"
            ? "rounded-t-2xl rounded-b-none"
            : "relative flex max-h-170 min-h-90 flex-col gap-6 overflow-hidden rounded-lg p-6",
        )}
      >
        {position === "bottom" ? (
          children
        ) : (
          <>
            {/* 모달 내용 */}
            <div className="scrollbar-hide flex-1 overflow-y-auto pb-20">
              {children}
            </div>

            {/* 모달 하단 버튼 */}
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
                    "btn btn-lg text-label-l flex-1 rounded-lg",
                    action.variant === "neutral"
                      ? "btn-neutral"
                      : "btn-primary",
                  )}
                >
                  {action.label}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
