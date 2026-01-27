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

const DEFAULT_HERO_IMAGE = "/images/hero.png";

interface HeroSectionProps {
  onGetStarted: () => void;
  heroImageUrl?: string;
}

/**
 * Hero section for AIdol landing page.
 */
export function HeroSection({ onGetStarted, heroImageUrl }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-screen w-full flex-col items-center bg-base-100 px-6 pb-8 pt-12">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex w-full max-w-mobile flex-col items-center text-center"
      >
        {/* Logo */}
        <motion.div variants={fadeInUp} className="mb-6">
          <Image
            src="/images/logo.svg"
            alt="alola"
            width={92}
            height={28}
            priority
          />
        </motion.div>

        {/* Main Title */}
        <motion.h1 variants={fadeInUp} className="mb-3 text-display-s">
          {t("aidol:landing.hero.title.line1")}
          <br />
          {t("aidol:landing.hero.title.line2")}
        </motion.h1>

        {/* Description Lines */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex flex-col text-headline-s text-base-content"
        >
          <p className="font-normal">{t("aidol:landing.hero.line1")}</p>
          <p className="font-normal">{t("aidol:landing.hero.line2")}</p>
          <p>{t("aidol:landing.hero.line3")}</p>
          <p>{t("aidol:landing.hero.line4")}</p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          variants={fadeInUp}
          className="relative mb-6 aspect-[345/368] w-full overflow-hidden rounded-lg"
        >
          <Image
            src={heroImageUrl ?? DEFAULT_HERO_IMAGE}
            alt="AI Idol"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={fadeInUp} className="w-full">
          <button
            onClick={onGetStarted}
            className="btn btn-primary h-[52px] w-full rounded-lg text-title-s"
          >
            {t("aidol:landing.hero.cta")}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
