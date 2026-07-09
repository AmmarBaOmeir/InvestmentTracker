import { lazy } from "react";

export const DashboardPage = lazy(() =>
  import("@/pages/dashboard").then((m) => ({ default: m.DashboardPage })),
);
export const InvestmentPage = lazy(() =>
  import("@/pages/investment").then((m) => ({ default: m.InvestmentPage })),
);
export const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage })),
);
