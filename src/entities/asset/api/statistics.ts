import { apiRequest } from "@/shared/lib/api-client";

export interface InvestmentStatistics {
  total_capital_sa: number;
  total_gained_sa: number;
  total_capital_ye: number;
  total_gained_ye: number;
}

export const EMPTY_INVESTMENT_STATISTICS: InvestmentStatistics = {
  total_capital_sa: 0,
  total_gained_sa: 0,
  total_capital_ye: 0,
  total_gained_ye: 0,
};

let statisticsInFlight: Promise<InvestmentStatistics> | null = null;

export function invalidateStatisticsCache(): void {
  statisticsInFlight = null;
}

async function requestStatistics(
  signal?: AbortSignal,
): Promise<InvestmentStatistics> {
  return apiRequest<InvestmentStatistics>("/api/statistics", { signal });
}

export async function fetchStatistics(
  signal?: AbortSignal,
): Promise<InvestmentStatistics> {
  if (signal) {
    return requestStatistics(signal);
  }

  if (!statisticsInFlight) {
    statisticsInFlight = requestStatistics().finally(() => {
      statisticsInFlight = null;
    });
  }

  return statisticsInFlight;
}
