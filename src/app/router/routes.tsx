import { Navigate, type RouteObject } from "react-router-dom";
import { RootLayout } from "@/widgets/root-layout";
import { RouteError } from "@/app/router/route-error";
import { paths } from "@/shared/config";
import {
  AuthGuard,
  loginLoader,
  requireAuthLoader,
} from "@/features/auth-guard";
import { dashboardLoader } from "@/pages/dashboard";
import { investmentLoader } from "@/pages/investment";
import {
  DashboardPage,
  InvestmentPage,
  LoginPage,
  NotFoundPage,
} from "@/app/router/lazy-pages";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={paths.dashboard} replace />,
  },
  {
    path: paths.login,
    element: <LoginPage />,
    loader: loginLoader,
  },
  {
    path: paths.dashboard,
    element: <AuthGuard />,
    loader: requireAuthLoader,
    errorElement: <RouteError />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
            loader: dashboardLoader,
          },
          {
            path: ":id",
            element: <InvestmentPage />,
            loader: investmentLoader,
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
];
