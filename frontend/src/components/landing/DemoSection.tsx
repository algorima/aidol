"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
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

/**
 * Demo/feature section for AIdol landing page.
 */
export function DemoSection() {
  const { t } = useTranslation();

  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="container mx-auto px-6 py-20 text-center md:py-28"
    >
      <motion.div variants={fadeInUp}>
        <SparklesIcon className="mx-auto size-24 text-secondary drop-shadow-[0_0_16px_theme(colors.secondary)]" />
      </motion.div>
      <motion.h2
        variants={fadeInUp}
        className="mt-4 text-display-s md:text-display-m"
      >
        {t("aidol:landing.demo.title")}
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="mx-auto mt-4 max-w-lg text-body-l text-neutral-content"
      >
        {t("aidol:landing.demo.description")}
      </motion.p>
    </motion.section>
  );
}
