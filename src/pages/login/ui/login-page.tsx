import { useTranslation } from "react-i18next";
import styles from "./login-page.module.css";

export function LoginPage() {
  const { t } = useTranslation();

  return <div className={styles.page}>{t("login.title")}</div>;
}
