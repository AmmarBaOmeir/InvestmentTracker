import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import userSnap from "@/assets/icons/user.svg";
import { paths } from "@/shared/config";
import { logout } from "@/shared/lib/auth-api";
import { getAuthUser } from "@/shared/lib/auth-storage";
import { Button, SVG } from "@/shared/ui";
import styles from "./user-navigation-snap.module.css";

export function UserNavigationSnap() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = getAuthUser();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    logout();
    setIsOpen(false);
    navigate(paths.login, { replace: true });
  }

  return (
    <div className={styles.root}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t("login.current_user", { name: user.name })}
        title={user.name}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <SVG src={userSnap} alt={t("common.user_snap")} />
        <span className={styles.name}>{user.name}</span>
      </Button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          <p className={styles.menuName}>{user.name}</p>
          <p className={styles.menuEmail}>{user.email}</p>
          <Button
            variant="outline"
            size="sm"
            className={styles.logout}
            onClick={handleLogout}
          >
            {t("login.logout")}
          </Button>
        </div>
      )}
    </div>
  );
}
