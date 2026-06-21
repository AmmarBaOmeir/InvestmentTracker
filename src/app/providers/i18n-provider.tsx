import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { getDirection } from "@/shared/i18n";

function applyDocumentLanguage(lng: string) {
  const root = document.documentElement;
  root.lang = lng;
  root.dir = getDirection(lng);

  document.title = i18n.t("common.app_name");
}

export function I18nProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    applyDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
    i18n.on("languageChanged", applyDocumentLanguage);
    return () => {
      i18n.off("languageChanged", applyDocumentLanguage);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
