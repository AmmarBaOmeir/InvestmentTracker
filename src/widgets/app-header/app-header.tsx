import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import arrowIcon from "@/assets/icons/arrow.svg";
import { ThemeToggle } from "@/features/theme-toggle";
import { LanguageToggle } from "@/features/language-toggle";
import { UserNavigationSnap } from "@/features/user-navigation-snap";
import investmentIcon from "@/assets/icons/investment.svg";
import { SVG, Spinner } from "@/shared/ui";
import { cn, useRouteNavigation } from "@/shared/lib";
import { paths } from "@/shared/config";
import styles from "./app-header.module.css";

export function AppHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isNavigating, isNavigatingTo } = useRouteNavigation();
  const href = location.pathname;
  const isGoingHome = isNavigatingTo(paths.dashboard);

  const onHomeClick = () => {
    if (isNavigating || href === paths.dashboard) return;
    navigate(paths.dashboard);
  };

  return (
    <header className={styles.header}>
      <div
        className={cn(
          styles.actions,
          styles.pointerCursor,
          (isNavigating || isGoingHome) && styles.homeActionDisabled,
        )}
        onClick={onHomeClick}
      >
        <SVG src={investmentIcon} size={32} />
        <div>
          <span className={styles.title}>{t("common.app_name")}</span>
          {href !== paths.dashboard && (
            <div
              className={cn(
                styles.flexItems,
                isGoingHome && styles.homeActionLoading,
              )}
            >
              <SVG
                src={arrowIcon}
                fill="var(--text-muted)"
                className={styles.flip}
              />
              <span className={styles.back}>{t("common.back")}</span>
              {isGoingHome && <Spinner />}
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
