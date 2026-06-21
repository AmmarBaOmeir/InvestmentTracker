import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import arrowIcon from "@/assets/icons/arrow.svg";
import { ThemeToggle } from "@/features/theme-toggle";
import { LanguageToggle } from "@/features/language-toggle";
import { UserNavigationSnap } from "@/features/user-navigation-snap";
import investmentIcon from "@/assets/icons/investment.svg";
import { SVG } from "@/shared/ui";
import { cn } from "@/shared/lib";
import styles from "./app-header.module.css";

export function AppHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const href = location.pathname;

  return (
    <header className={styles.header}>
      <div
        className={cn(styles.actions, styles.pointerCursor)}
        onClick={() => navigate("/dashboard")}
      >
        <SVG src={investmentIcon} size={32} />
        <div>
          <span className={styles.title}>{t("common.app_name")}</span>
          {href !== "/dashboard" && (
            <div className={styles.flexItems}>
              <SVG
                src={arrowIcon}
                fill="var(--text-muted)"
                className={styles.flip}
              />
              <span className={styles.back}>{t("common.back")}</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <ThemeToggle />
        <LanguageToggle />
        <UserNavigationSnap />
      </div>
    </header>
  );
}
