import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";

export const defaultNS = "translation";
export const supportedLngs = ["en", "ar"] as const;
export type AppLanguage = (typeof supportedLngs)[number];

const RTL_LANGUAGES = new Set<string>(["ar"]);

export function getDirection(lng: string): "rtl" | "ltr" {
  return RTL_LANGUAGES.has(lng.split("-")[0]) ? "rtl" : "ltr";
}

export const resources = {
  en: { translation: en },
  ar: { translation: ar },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: "en",
    supportedLngs: [...supportedLngs],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "it.lang",
    },
  });

i18n.init({
  // ...existing options
  saveMissing: true,
  missingKeyHandler: (lngs, ns, key) => {
    if (import.meta.env.DEV)
      console.warn(`[i18n] missing key: ${ns}:${key} (${lngs.join(",")})`);
  },
});

export default i18n;
