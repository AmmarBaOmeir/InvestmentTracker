import { useTranslation } from "react-i18next";
import { Spinner } from "@/shared/ui/spinner/spinner";
import styles from "./page-fallback.module.css";

export function PageFallback() {
  const { t } = useTranslation();

  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <Spinner />
      <span>{t("common.loading")}</span>
    </div>
  );
}
