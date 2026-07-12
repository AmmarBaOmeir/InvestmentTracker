import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "@/shared/ui";
import { useRouteNavigation } from "@/shared/lib";
import { paths } from "@/shared/config";

export function RouteError() {
  const error = useRouteError();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isNavigating, isNavigatingTo } = useRouteNavigation();
  const isGoingHome = isNavigatingTo(paths.dashboard);

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

  const onBackToDashboard = () => {
    if (isNavigating) return;
    navigate(paths.dashboard);
  };

  return (
    <div className="route-error">
      <h1>{title}</h1>
      <p>{message}</p>
      <Button onClick={onBackToDashboard} disabled={isNavigating}>
        {isGoingHome && <Spinner />}
        {t("errors.back_to_dashboard")}
      </Button>
    </div>
  );
}
