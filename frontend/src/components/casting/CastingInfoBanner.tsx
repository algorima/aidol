import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

export function CastingInfoBanner() {
  const { t } = useTranslation();

  return (
    <div className="bg-base-200 flex items-center gap-3 rounded-lg p-4">
      <CheckCircleIcon className="text-primary size-6 shrink-0" />
      <p className="text-body-s text-base-content">
        {t("aidol:casting.infoBanner")}
      </p>
    </div>
  );
}
