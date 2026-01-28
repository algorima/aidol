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
    <fieldset className="fieldset w-full">
      <label className="label">{t("aidol:creation.memberName")}</label>
      <input
        ref={ref}
        type="text"
        placeholder={t("aidol:creation.memberNamePlaceholder")}
        className={clsx(
          "input bg-base-100 text-base-content placeholder:text-base-content/50 w-full",
          error && "input-error",
        )}
        {...props}
      />
      {error && <span className="text-label-m text-error">{error}</span>}
    </fieldset>
  );
});

MemberNameInput.displayName = "MemberNameInput";
