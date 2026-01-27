import clsx from "clsx";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface GroupNameInputProps {
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input field for AIdol group name.
 * Supports react-hook-form via forwardRef.
 */
export const GroupNameInput = forwardRef<HTMLInputElement, GroupNameInputProps>(
  ({ error, ...props }, ref) => {
    const { t } = useTranslation();

    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-base-content">
            {t("aidol:creation.groupName")}
          </span>
        </label>
        <input
          ref={ref}
          type="text"
          placeholder={t("aidol:creation.groupNamePlaceholder")}
          className={clsx(
            "input-bordered input w-full bg-base-100 text-base-content placeholder:text-base-content/50",
            error && "input-error",
          )}
          {...props}
        />
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        )}
      </div>
    );
  },
);

GroupNameInput.displayName = "GroupNameInput";
