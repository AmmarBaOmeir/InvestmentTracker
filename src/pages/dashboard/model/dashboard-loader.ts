import { fetchInvestments } from "@/entities/asset/api/investments";
import {
  EMPTY_INVESTMENT_STATISTICS,
  fetchStatistics,
  type InvestmentStatistics,
} from "@/entities/asset/api/statistics";
import type { Investment } from "@/entities/asset/model/types";
import { resolveRequestError } from "@/shared/lib";
import type { LoaderFunctionArgs } from "react-router-dom";

export interface DashboardLoaderData {
  investments: Investment[];
  statistics: InvestmentStatistics;
  error: string | null;
}

export async function dashboardLoader({
  request,
}: LoaderFunctionArgs): Promise<DashboardLoaderData> {
  try {
    const [investments, statistics] = await Promise.all([
      fetchInvestments(request.signal),
      fetchStatistics(request.signal),
    ]);
    return { investments, statistics, error: null };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    return {
      investments: [],
      statistics: EMPTY_INVESTMENT_STATISTICS,
      error: resolveRequestError(error),
    };
  }
}
