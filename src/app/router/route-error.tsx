import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { paths } from "@/shared/config";

export function RouteError() {
  const error = useRouteError();
  const { t } = useTranslation();

  let title = t("errors.title");
  let message = t("errors.unexpected");

  if (isRouteErrorResponse(error)) {
    title = t("errors.http_error", {
      status: error.status,
      statusText: error.statusText,
    });
    if (typeof error.data === "string") message = error.data;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="route-error">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to={paths.dashboard}>{t("errors.back_to_dashboard")}</Link>
    </div>
  );
}
