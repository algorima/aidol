"use client";

import { motion, Variants } from "framer-motion";
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
      staggerChildren: 0.2,
    },
  },
};

interface HeroSectionProps {
  onGetStarted: () => void;
}

/**
 * Hero section for AIdol landing page.
 */
export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="hero from-base-200 to-primary min-h-screen bg-gradient-to-b pt-20">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="hero-content text-base-content flex-col gap-12 text-center"
      >
        <div className="max-w-3xl">
          <motion.h1
            variants={fadeInUp}
            className="text-display-m md:text-display-l mb-4"
          >
            {t("aidol:landing.hero.title")}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-body-l text-neutral-content mx-auto mt-6 max-w-xl"
          >
            {t("aidol:landing.hero.description")}
          </motion.p>
        </div>
        <motion.div variants={fadeInUp}>
          <button
            onClick={onGetStarted}
            className="btn btn-primary font-semibold"
          >
            {t("aidol:landing.hero.cta")}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
