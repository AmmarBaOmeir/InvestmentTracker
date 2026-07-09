import type { ParseKeys } from "i18next";
import type {
  CapitalData,
  Investment,
  ReturnData,
} from "@/entities/asset/model/types";
import dateIcon from "@/assets/icons/date.svg";
import fundIcon from "@/assets/icons/fund.svg";
import type { StatCardProps } from "@/shared/ui/stat-card/stat-card";
import { formatDisplayDate } from "@/shared/lib";

export interface InvestmentOverviewStatItem {
  label: ParseKeys<"translation">;
  value: string | number;
  icon?: string;
  tone?: StatCardProps["tone"];
  currency?: "SAR" | "YER";
}

function latestByDate<T extends { date: string }>(items: T[]): T | undefined {
  if (items.length === 0) {
    return undefined;
  }
  return [...items].sort((left, right) =>
    right.date.localeCompare(left.date),
  )[0];
}

export function buildOverviewStats(
  investment: Investment,
  capitals: CapitalData[],
  returns: ReturnData[],
  locale: string,
): InvestmentOverviewStatItem[] {
  const lastCapital = latestByDate(capitals);
  const lastReturn = latestByDate(returns);
  const expectedReturnSar =
    (investment.total_shares ?? 0) *
    investment.expected_return_amount_per_share_sar;
  const lastReturnAmountSar = lastReturn
    ? lastReturn.total_shares * lastReturn.amount_sar_per_share
    : 0;
  return [
    {
      label: "investment.overview_stats.start_date",
      value: formatDisplayDate(investment.invested_date, locale),
      icon: dateIcon,
    },
    {
      label: "investment.total_shares",
      value: String(investment.total_shares ?? 0),
      icon: fundIcon,
    },
    {
      label: "investment.overview_stats.last_injection_date",
      value: formatDisplayDate(
        lastCapital?.date ?? investment.invested_date,
        locale,
      ),
      icon: dateIcon,
    },
    {
      label: "investment.overview_stats.expected_return",
      value: expectedReturnSar,
      currency: "SAR",
      icon: fundIcon,
    },
    {
      label: "investment.overview_stats.last_return_date",
      value: lastReturn ? formatDisplayDate(lastReturn.date, locale) : "-",
      icon: dateIcon,
    },
    {
      label: "investment.overview_stats.last_return_amount",
      value: lastReturnAmountSar,
      currency: "SAR",
      icon: fundIcon,
    },
  ];
}
