import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Header";

interface NewsletterFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
  bubbleProfileUrl?: string;
  previewImageUrl?: string;
}

export function NewsletterForm({
  onSubmit,
  isLoading,
  bubbleProfileUrl,
  previewImageUrl,
}: NewsletterFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await onSubmit(email);
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="bg-base-100 flex min-h-screen flex-col">
      {/* 헤더 */}
      <Header title={t("aidol:newsletter.header")} />

      {/* 카드 */}
      <div className="flex flex-1 flex-col items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-base-200 flex w-full max-w-86.25 flex-col gap-6 rounded-lg p-6"
        >
          {/* 타이틀 */}
          <p className="text-title-s text-base-content whitespace-pre-line">
            {t("aidol:newsletter.previewTitle")}
          </p>

          {/* 프리뷰 영역 */}
          <div className="flex flex-col gap-2">
            {/* 채팅 버블 */}
            <div className="bg-base-300 flex items-center gap-2.5 overflow-hidden rounded-lg px-4 py-2">
              {bubbleProfileUrl ? (
                <div className="relative size-7 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={bubbleProfileUrl}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="bg-base-100 size-7 shrink-0 rounded-full" />
              )}
              <p className="text-body-s text-base-content flex-1">
                {t("aidol:newsletter.previewMessage")}
              </p>
            </div>

            {/* 프리뷰 이미지 */}
            {previewImageUrl ? (
              <div className="relative h-70 w-full overflow-hidden rounded-lg">
                <Image
                  src={previewImageUrl}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-base-300 h-70 w-full rounded-lg" />
            )}
          </div>

          {/* 이메일 입력 */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("aidol:newsletter.emailPlaceholder")}
            className="border-base-300 text-body-m placeholder:text-base-300 w-full rounded-lg border bg-white px-4 py-3 text-black focus:outline-none"
            disabled={isLoading}
          />

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!isValidEmail || isLoading}
            className={clsx(
              "bg-neutral text-neutral-content text-label-l w-full cursor-pointer rounded-lg p-4",
              !isValidEmail && !isLoading && "opacity-20",
            )}
          >
            {isLoading
              ? t("aidol:newsletter.submitting")
              : t("aidol:newsletter.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
