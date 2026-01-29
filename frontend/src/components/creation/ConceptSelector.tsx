import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface ConceptOption {
  value: string;
  label: string;
}

interface ConceptSelectorProps {
  options: ConceptOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Dropdown selector for AIdol group concept.
 * Supports react-hook-form via forwardRef.
 */
export const ConceptSelector = forwardRef<
  HTMLSelectElement,
  ConceptSelectorProps
>(({ options, ...props }, ref) => {
  const { t } = useTranslation();

  return (
    <fieldset className="fieldset w-full">
      <label className="label">{t("aidol:creation.concept")}</label>
      <select
        ref={ref}
        className="select bg-base-100 text-base-content w-full"
        {...props}
      >
        <option value="">{t("aidol:creation.selectConcept")}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
});

ConceptSelector.displayName = "ConceptSelector";
