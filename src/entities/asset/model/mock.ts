import type {
  Asset,
  CapitalData,
  Investment,
  ReturnData,
} from "@/entities/asset/model/types";
import dateIcon from "@/assets/icons/date.svg";
import fundIcon from "@/assets/icons/fund.svg";
import type { StatCardProps } from "@/shared/ui/stat-card/stat-card";

export const mockAssets: Asset[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    yeCapital: 2999500,
    yeGain: 300000,
    saCapital: 168.4,
    saGain: 6500,
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft",
    yeCapital: 2999500,
    yeGain: 3000000,
    saCapital: 330.1,
    saGain: 6500,
  },
  {
    id: "3",
    symbol: "NVDA",
    name: "NVIDIA",
    yeCapital: 2999500,
    yeGain: 3000000,
    saCapital: 95.2,
    saGain: 6500,
  },
  {
    id: "4",
    symbol: "BTC",
    name: "Bitcoin",
    yeCapital: 29995006,
    yeGain: 3000000,
    saCapital: 5200,
    saGain: 6500,
  },
  {
    id: "5",
    symbol: "ETH",
    name: "Ethereum",
    yeCapital: 29995002,
    yeGain: 3000000,
    saCapital: 2780,
    saGain: 6500,
  },
];

export const mockAInvestments: Investment[] = [
  {
    id: "1",
    name_en: "Rental Yard",
    name_ar: "ساحة إيجار",
    invested_date: "1/12/2025",
    status: "in_progress",
    total_capital_sa: 7000,
    total_gained_sa: 5000,
    total_capital_ye: 3200000,
    total_gained_ye: 2300000,
  },
  {
    id: "2",
    name_en: "Coffee Shop",
    name_ar: "مقهى",
    invested_date: "1/6/2024",
    status: "match_capital",
    total_capital_sa: 12000,
    total_gained_sa: 12000,
    total_capital_ye: 5200000,
    total_gained_ye: 5200000,
  },
  {
    id: "3",
    name_en: "Bus",
    name_ar: "باص",
    invested_date: "1/1/2024",
    status: "inactive",
    total_capital_sa: 54000,
    total_gained_sa: 55000,
    total_capital_ye: 23000000,
    total_gained_ye: 23500000,
  },
  {
    id: "4",
    name_en: "taxi",
    name_ar: "تاكسي",
    invested_date: "1/1/2023",
    status: "profitable",
    total_capital_sa: 20000,
    total_gained_sa: 40000,
    total_capital_ye: 8000000,
    total_gained_ye: 16000000,
  },
];

import type { ParseKeys } from "i18next";

export const mockOverviewStats: (Omit<StatCardProps, "label"> & {
  label: ParseKeys<"translation">;
  currency?: "SAR" | "YER";
})[] = [
  {
    label: "investment.overview_stats.start_date",
    value: "01 May 2023",
    icon: dateIcon,
  },
  {
    label: "investment.overview_stats.last_injection_date",
    value: "01 Aug 2023",
    icon: dateIcon,
  },
  {
    label: "investment.overview_stats.expected_return",
    value: 10000,
    currency: "SAR",
    icon: fundIcon,
  },
  {
    label: "investment.overview_stats.last_return_date",
    value: "05 Dec 2023",
    icon: dateIcon,
  },
  {
    label: "investment.overview_stats.last_return_amount",
    value: 1200,
    currency: "SAR",
    icon: fundIcon,
  },
] as const;

export const mockCapitals: CapitalData[] = [
  {
    title: "Initial Investment",
    date: "2025-01-15",
    amount_ye: 5000000,
    amount_sa: 25000,
    status: "inbound",
    note: "First capital injection for the project",
  },
  {
    title: "Equipment Expansion",
    date: "2025-04-22",
    amount_ye: 2500000,
    amount_sa: 12500,
    status: "pending",
    note: "Funds allocated for purchasing new servers",
  },
  {
    title: "Marketing Budget",
    date: "2025-06-10",
    amount_ye: 1000000,
    amount_sa: 5000,
    status: "blocked",
    note: "Held by the bank pending documentation",
  },
  {
    title: "Operational Costs",
    date: "2025-08-05",
    amount_ye: 3000000,
    amount_sa: 15000,
    status: "inbound",
    note: "Q3 operational expenses and salaries",
  },
  {
    title: "Emergency Fund",
    date: "2025-11-20",
    amount_ye: 1500000,
    amount_sa: 7500,
    status: "pending",
    note: "Reserve capital for unforeseen expenses",
  },
];

export const mockReturns: ReturnData[] = [
  {
    title: "Q1 Dividend",
    date: "2025-03-31",
    amount_ye: 1500000,
    amount_sa: 7500,
    note: "First quarter profit distribution",
  },
  {
    title: "Q2 Dividend",
    date: "2025-06-30",
    amount_ye: 1800000,
    amount_sa: 9000,
    note: "Second quarter profit distribution",
  },
  {
    title: "Asset Sale",
    date: "2025-08-15",
    amount_ye: 4000000,
    amount_sa: 20000,
    note: "Partial sale of obsolete equipment",
  },
  {
    title: "Q3 Dividend",
    date: "2025-09-30",
    amount_ye: 1200000,
    amount_sa: 6000,
    note: "Third quarter profit distribution",
  },
  {
    title: "Annual Bonus",
    date: "2025-12-20",
    amount_ye: 3000000,
    amount_sa: 15000,
    note: "End of year performance bonus",
  },
];
