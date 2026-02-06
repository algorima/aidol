"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const fadeInUp: Variants = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

interface HeroSectionProps {
  onGetStarted: () => void;
  isLoading?: boolean;
  logoUrl?: string;
  videoUrl?: string;
}

/**
 * Hero section for AIdol landing page.
 */
export function HeroSection({
  onGetStarted,
  isLoading,
  logoUrl = "/images/logo.svg",
  videoUrl,
}: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-base-100 flex min-h-screen w-full flex-col items-center px-6 pt-12 pb-8">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex w-full flex-col items-center text-center"
      >
        <motion.div variants={fadeInUp} className="mb-6">
          <Image src={logoUrl} alt="AIdol" width={92} height={28} priority />
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-display-s mb-3">
          {t("aidol:landing.hero.title.line1")}
          <br />
          {t("aidol:landing.hero.title.line2")}
        </motion.h1>

        <motion.div
          variants={fadeInUp}
          className="text-headline-s text-base-content mb-8 flex flex-col"
        >
          <p className="text-neutral">{t("aidol:landing.hero.line1")}</p>
          <p className="text-neutral">{t("aidol:landing.hero.line2")}</p>
          <p>{t("aidol:landing.hero.line3")}</p>
          <p>{t("aidol:landing.hero.line4")}</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="bg-base-200 relative mb-6 aspect-[345/368] w-full overflow-hidden rounded-lg"
        >
          {videoUrl && (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
            />
          )}
        </motion.div>

        <motion.div variants={fadeInUp} className="w-full">
          <button
            onClick={onGetStarted}
            disabled={isLoading}
            className="btn btn-primary btn-lg text-label-l w-full rounded-lg"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              t("aidol:landing.hero.cta")
            )}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
