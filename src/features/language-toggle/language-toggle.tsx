import { SVG } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";
import globalIcon from "@/assets/icons/global.svg";

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;
  const next = current === "ar" ? "en" : "ar";

  return (
    <Button
      variant="ghost"
      onClick={() => i18n.changeLanguage(next)}
      aria-label={`Switch language to ${next}`}
      title={
        current === "ar" ? t("common.language_en") : t("common.language_ar")
      }
    >
      <SVG src={globalIcon} alt={t("common.language")} />
    </Button>
  );
}
