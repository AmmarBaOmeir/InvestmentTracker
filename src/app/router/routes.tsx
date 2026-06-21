import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom"; // <-- Add Navigate
import { RootLayout } from "@/widgets/root-layout";
import { RouteError } from "@/app/router/route-error";
import { paths } from "@/shared/config";

const DashboardPage = lazy(() =>
  import("@/pages/dashboard").then((m) => ({ default: m.DashboardPage })),
);

const InvestmentPage = lazy(() =>
  import("@/pages/investment").then((m) => ({ default: m.InvestmentPage })),
);

const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage })),
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={paths.dashboard} replace />,
  },
  {
    path: paths.dashboard,
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: ":id", element: <InvestmentPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
