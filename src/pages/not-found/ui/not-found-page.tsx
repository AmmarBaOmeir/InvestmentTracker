import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "@/shared/ui";
import { useRouteNavigation } from "@/shared/lib";
import { paths } from "@/shared/config";

export function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isNavigating, isNavigatingTo } = useRouteNavigation();
  const isGoingHome = isNavigatingTo(paths.dashboard);

  const onBackToDashboard = () => {
    if (isNavigating) return;
    navigate(paths.dashboard);
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "grid",
        gap: 16,
        marginTop: "10vh",
      }}
    >
      <h1 style={{ fontSize: 64 }}>{t("not_found.title")}</h1>
      <p style={{ color: "var(--text-muted)" }}>{t("not_found.message")}</p>
      <Button onClick={onBackToDashboard} disabled={isNavigating}>
        {isGoingHome && <Spinner />}
        {t("not_found.back_to_dashboard")}
      </Button>
    </div>
  );
}
