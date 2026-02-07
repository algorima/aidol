import clsx from "clsx";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import bubbleProfile from "@/assets/newsletter/bubble-profile.png";
import preview from "@/assets/newsletter/preview.png";
import { Header } from "@/components/Header";

interface FollowFormProps {
  groupName: string;
  companionProfileUrl?: string;
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  isLoading: boolean;
  isValidEmail: boolean;
}

export function FollowForm({
  groupName,
  companionProfileUrl,
  email,
  onEmailChange,
  onSubmit,
  onClose,
  isLoading,
  isValidEmail,
}: FollowFormProps) {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-base-100 flex min-h-screen flex-col gap-6">
      {/* 헤더 */}
      <Header onCloseClick={onClose} title={t("aidol:group.follow.header")} />

      {/* 카드 */}
      <div className="flex flex-1 flex-col items-center px-6 pb-6">
        <form
          onSubmit={handleSubmit}
          className="bg-base-200 flex w-full max-w-86.25 flex-col gap-6 rounded-lg p-6"
        >
          {/* 타이틀 */}
          <p className="text-title-s text-base-content whitespace-pre-line">
            {t("aidol:group.follow.title", { name: groupName })}
          </p>

          {/* 프리뷰 영역 */}
          <div className="flex flex-col gap-2">
            {/* 채팅 버블 */}
            <div className="bg-base-300 flex items-center gap-2.5 overflow-hidden rounded-lg p-2">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={companionProfileUrl ?? bubbleProfile}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <p className="text-body-s text-base-content flex-1">
                {t("aidol:group.follow.previewMessage")}
              </p>
            </div>

            {/* 프리뷰 이미지 */}
            <div className="relative h-70 w-full overflow-hidden rounded-lg">
              <Image
                src={preview}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* 이메일 입력 */}
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder={t("aidol:group.follow.emailPlaceholder")}
            className="border-base-400 text-body-m placeholder:text-base-400 bg-base-200 w-full rounded-lg border px-4 py-3 text-black focus:outline-none"
            disabled={isLoading}
          />

          {/* 그라데이션 제출 버튼 */}
          <button
            type="submit"
            disabled={!isValidEmail || isLoading}
            className={clsx(
              "from-primary to-secondary text-label-l flex h-[52px] w-full cursor-pointer items-center justify-center rounded-lg bg-linear-to-r text-white",
              !isValidEmail && !isLoading && "opacity-20",
            )}
          >
            {isLoading
              ? t("aidol:group.follow.submitting")
              : t("aidol:group.follow.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
