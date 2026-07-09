import { useTranslation } from "react-i18next";
import styles from "./page-fallback.module.css";

export function PageFallback() {
  const { t } = useTranslation();

  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} />
      <span>{t("common.loading")}</span>
    </div>
  );
}
