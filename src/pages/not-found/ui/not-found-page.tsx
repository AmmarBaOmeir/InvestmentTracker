import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";
import { paths } from "@/shared/config";

export function NotFoundPage() {
  const { t } = useTranslation();

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
      <Link to={paths.dashboard}>
        <Button>{t("not_found.back_to_dashboard")}</Button>
      </Link>
    </div>
  );
}
