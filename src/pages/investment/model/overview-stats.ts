import type { ParseKeys } from "i18next";
import type {
  CapitalData,
  Investment,
  ReturnData,
} from "@/entities/asset/model/types";
import dateIcon from "@/assets/icons/date.svg";
import fundIcon from "@/assets/icons/fund.svg";
import increaseIcon from "@/assets/icons/increase.svg";
import investmentIcon from "@/assets/icons/investment.svg";
import walletIcon from "@/assets/icons/wallet.svg";
import saudiRialIcon from "@/assets/icons/saudi-rial.svg";
import yemeniRialIcon from "@/assets/icons/yemeni-rial.svg";
import type { StatCardProps } from "@/shared/ui/stat-card/stat-card";
import { formatDisplayDate } from "@/shared/lib";

export interface InvestmentOverviewStatItem {
  id: string;
  label: ParseKeys<"translation">;
  value: string | number;
  icon?: string;
  tone?: StatCardProps["tone"];
  currency?: "SAR" | "YER";
}

export interface InvestmentOverviewStatGroup {
  id: string;
  title: ParseKeys<"translation">;
  icon: string;
  items: InvestmentOverviewStatItem[];
}
function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => right.date.localeCompare(left.date));
}

function latestByDate<T extends { date: string }>(items: T[]): T | undefined {
  return sortByDateDesc(items)[0];
}

function earliestByDate<T extends { date: string }>(items: T[]): T | undefined {
  const sorted = sortByDateDesc(items);
  return sorted[sorted.length - 1];
}

function capitalAmountSar(capital: CapitalData): number {
  return capital.total_shares * capital.amount_sar_per_share;
}

function capitalAmountYer(capital: CapitalData): number {
  return capital.total_shares * capital.amount_yer_per_share;
}

function amountStatPair(
  id: string,
  sarLabel: ParseKeys<"translation">,
  yerLabel: ParseKeys<"translation">,
  sarValue: number,
  yerValue: number,
): InvestmentOverviewStatItem[] {
  return [
    {
      id: `${id}.yer`,
      label: yerLabel,
      value: yerValue,
      currency: "YER",
      icon: yemeniRialIcon,
    },
    {
      id: `${id}.sar`,
      label: sarLabel,
      value: sarValue,
      currency: "SAR",
      icon: saudiRialIcon,
    },
  ];
}

export function buildOverviewStats(
  investment: Investment,
  capitals: CapitalData[],
  returns: ReturnData[],
  locale: string,
): InvestmentOverviewStatGroup[] {
  const firstCapital = earliestByDate(capitals);
  const lastCapital = latestByDate(capitals);
  const lastReturn = latestByDate(returns);
  const totalShares = capitals.reduce(
    (sum, capital) => sum + capital.total_shares,
    0,
  );
  const expectedReturnPerShareSar =
    investment.expected_return_amount_per_share_sar;
  const expectedReturnPerShareYer =
    investment.expected_return_amount_per_share_yer;
  const totalExpectedReturnSar = totalShares * expectedReturnPerShareSar;
  const totalExpectedReturnYer = totalShares * expectedReturnPerShareYer;
  const lastInjectedAmountSar = lastCapital ? capitalAmountSar(lastCapital) : 0;
  const lastInjectedAmountYer = lastCapital ? capitalAmountYer(lastCapital) : 0;
  const lastReturnAmountSar = lastReturn
    ? lastReturn.total_shares * lastReturn.amount_sar_per_share
    : 0;
  const lastReturnAmountYer = lastReturn
    ? lastReturn.total_shares * lastReturn.amount_yer_per_share
    : 0;

  return [
    {
      id: "general",
      title: "investment.overview_stats.groups.general",
      icon: investmentIcon,
      items: [
        {
          id: "start_date",
          label: "investment.overview_stats.start_date",
          value: formatDisplayDate(
            firstCapital?.date ?? investment.invested_date,
            locale,
          ),
          icon: dateIcon,
        },
        {
          id: "total_shares",
          label: "investment.total_shares",
          value: String(totalShares),
          icon: fundIcon,
        },
      ],
    },
    {
      id: "injections",
      title: "investment.overview_stats.groups.injections",
      icon: walletIcon,
      items: [
        {
          id: "last_injection_date",
          label: "investment.overview_stats.last_injection_date",
          value: lastCapital
            ? formatDisplayDate(lastCapital.date, locale)
            : "-",
          icon: dateIcon,
        },
        ...amountStatPair(
          "last_injected_amount",
          "investment.overview_stats.last_injected_amount_sar",
          "investment.overview_stats.last_injected_amount_yer",
          lastInjectedAmountSar,
          lastInjectedAmountYer,
        ),
      ],
    },
    {
      id: "returns",
      title: "investment.overview_stats.groups.returns",
      icon: increaseIcon,
      items: [
        ...amountStatPair(
          "expected_return_per_share",
          "investment.overview_stats.expected_return_per_share_sar",
          "investment.overview_stats.expected_return_per_share_yer",
          expectedReturnPerShareSar,
          expectedReturnPerShareYer,
        ),
        ...amountStatPair(
          "total_expected_return",
          "investment.overview_stats.total_expected_return_sar",
          "investment.overview_stats.total_expected_return_yer",
          totalExpectedReturnSar,
          totalExpectedReturnYer,
        ),
        {
          id: "last_return_date",
          label: "investment.overview_stats.last_return_date",
          value: lastReturn ? formatDisplayDate(lastReturn.date, locale) : "-",
          icon: dateIcon,
        },
        ...amountStatPair(
          "last_return_amount",
          "investment.overview_stats.last_return_amount_sar",
          "investment.overview_stats.last_return_amount_yer",
          lastReturnAmountSar,
          lastReturnAmountYer,
        ),
      ],
    },
  ];
}
