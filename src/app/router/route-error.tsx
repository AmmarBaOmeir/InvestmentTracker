import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { paths } from "@/shared/config";

export function RouteError() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    if (typeof error.data === "string") message = error.data;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="route-error">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to={paths.dashboard}>← Back to dashboard</Link>
    </div>
  );
}
