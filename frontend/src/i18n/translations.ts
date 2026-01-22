/**
 * Server-safe exports for aidol translations.
 *
 * This module exports only JSON resources and constants,
 * avoiding React-specific code that would break SSR.
 */

import en from "./locales/en/aidol.json";
import es from "./locales/es/aidol.json";
import id from "./locales/id/aidol.json";
import ja from "./locales/ja/aidol.json";
import ko from "./locales/ko/aidol.json";
import th from "./locales/th/aidol.json";
import tl from "./locales/tl/aidol.json";
import vi from "./locales/vi/aidol.json";
import zh from "./locales/zh/aidol.json";

/** AIdol namespace */
export const AIDOL_NS = "aidol";

/**
 * Translation resources for the aidol namespace.
 * Use with i18next.addResourceBundle(lang, 'aidol', translations)
 *
 * @example
 * import { aidolTranslations, AIDOL_NS } from 'aidol/locale';
 *
 * // Add to existing i18n instance
 * Object.entries(aidolTranslations).forEach(([lang, resources]) => {
 *   i18n.addResourceBundle(lang, AIDOL_NS, resources);
 * });
 */
export const aidolTranslations = {
  en,
  es,
  id,
  ja,
  ko,
  th,
  tl,
  vi,
  zh,
};
