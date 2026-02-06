import Image from "next/image";
import { useTranslation } from "react-i18next";

import bubbleProfile from "@/assets/newsletter/bubble-profile.png";
import preview from "@/assets/newsletter/preview.png";

interface MarketingEmailProps {
  groupName: string;
  onCtaClick: () => void;
}

export function MarketingEmail({ groupName, onCtaClick }: MarketingEmailProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-base-100 flex min-h-screen flex-col">
      {/* 로고 */}
      <div className="flex items-center px-6 py-7">
        <Image src="/images/logo.svg" alt="alola" width={92} height={28} />
      </div>

      {/* 콘텐츠 */}
      <div className="flex flex-1 flex-col items-center px-6 pb-6">
        <div className="flex w-full max-w-86.25 flex-col gap-6">
          {/* 헤드라인 */}
          <div className="flex flex-col gap-px">
            <p className="text-headline-s text-base-content">
              {t("aidol:marketing.headlinePrefix")}
            </p>
            <p className="text-headline-s">
              <span className="text-primary">{groupName}</span>
              <span className="text-base-content">
                {t("aidol:marketing.headlineSuffix")}
              </span>
            </p>
          </div>

          {/* 메시지 카드 */}
          <div className="flex items-start gap-2">
            <div className="border-base-300 relative size-10 shrink-0 overflow-hidden rounded-lg border">
              <Image
                src={bubbleProfile}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {/* 이름·포지션 */}
              <div className="flex items-center gap-1">
                <span className="text-body-s text-base-content">
                  {t("aidol:marketing.memberName")}
                </span>
                <div className="bg-base-content size-0.5 rounded-full" />
                <span className="text-body-s text-base-content">
                  {t("aidol:marketing.memberPosition")}
                </span>
              </div>

              {/* 메시지 버블 */}
              <div className="bg-secondary rounded-xl p-2">
                <p className="text-body-s text-white">
                  {t("aidol:marketing.message")}
                </p>
              </div>
            </div>
          </div>

          {/* 히어로 이미지 */}
          <div className="relative h-[409px] w-full overflow-hidden rounded-lg">
            <Image
              src={preview}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* CTA 버튼 */}
          <button
            type="button"
            onClick={onCtaClick}
            className="bg-primary text-primary-content text-label-l w-full cursor-pointer rounded-lg p-4 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]"
          >
            {t("aidol:marketing.cta")}
          </button>
        </div>
      </div>
    </div>
  );
}
