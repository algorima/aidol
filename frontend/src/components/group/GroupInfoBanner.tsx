import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

export function GroupInfoBanner() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col items-start gap-1">
        <CheckCircleIcon className="text-primary size-6 shrink-0" />
        <h3 className="text-title-s text-base-content">
          {t("aidol:groupList.infoBanner.title")}
        </h3>
      </div>
      <p className="text-body-s text-neutral">
        {t("aidol:groupList.infoBanner.description")}
      </p>
    </div>
  );
}
