import clsx from "clsx";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface MemberNameInputProps {
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input field for companion member name.
 * Supports react-hook-form via forwardRef.
 */
export const MemberNameInput = forwardRef<
  HTMLInputElement,
  MemberNameInputProps
>(({ error, ...props }, ref) => {
  const { t } = useTranslation();

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-base-content">
          {t("aidol:creation.memberName")}
        </span>
      </label>
      <input
        ref={ref}
        type="text"
        placeholder={t("aidol:creation.memberNamePlaceholder")}
        className={clsx(
          "input input-bordered w-full bg-base-100 text-base-content placeholder:text-base-content/50",
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
});

MemberNameInput.displayName = "MemberNameInput";
