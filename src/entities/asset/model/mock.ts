import type { ParseKeys } from "i18next";
import type {
  CapitalData,
  Investment,
  ReturnData,
} from "@/entities/asset/model/types";
import dateIcon from "@/assets/icons/date.svg";
import fundIcon from "@/assets/icons/fund.svg";
import type { StatCardProps } from "@/shared/ui/stat-card/stat-card";

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
    total_shares: 10,
    capital_amount_per_share_sar: 70,
    capital_amount_per_share_yer: 32000,
    expected_return_amount_per_share_sar: 50,
    expected_return_amount_per_share_yer: 23000,
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
    total_shares: 15,
    capital_amount_per_share_sar: 70,
    capital_amount_per_share_yer: 32000,
    expected_return_amount_per_share_sar: 50,
    expected_return_amount_per_share_yer: 23000,
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
    total_shares: 20,
    capital_amount_per_share_sar: 70,
    capital_amount_per_share_yer: 32000,
    expected_return_amount_per_share_sar: 50,
    expected_return_amount_per_share_yer: 23000,
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
    total_shares: 30,
    capital_amount_per_share_sar: 70,
    capital_amount_per_share_yer: 32000,
    expected_return_amount_per_share_sar: 50,
    expected_return_amount_per_share_yer: 23000,
  },
];

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
    label: "investment.total_shares",
    value: "75",
    icon: fundIcon,
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
    total_shares: 15,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    status: "inbound",
    note: "First capital injection for the project",
  },
  {
    title: "Equipment Expansion",
    date: "2025-04-22",
    total_shares: 20,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    status: "pending",
    note: "Funds allocated for purchasing new servers",
  },
  {
    title: "Marketing Budget",
    date: "2025-06-10",
    total_shares: 10,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    status: "blocked",
    note: "Held by the bank pending documentation",
  },
  {
    title: "Operational Costs",
    date: "2025-08-05",
    total_shares: 6,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    status: "inbound",
    note: "Q3 operational expenses and salaries",
  },
  {
    title: "Emergency Fund",
    date: "2025-11-20",
    total_shares: 5,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    status: "pending",
    note: "Reserve capital for unforeseen expenses",
  },
];

export const mockReturns: ReturnData[] = [
  {
    title: "Q1 Dividend",
    date: "2025-03-31",
    total_shares: 15,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    note: "First quarter profit distribution",
  },
  {
    title: "Q2 Dividend",
    date: "2025-06-30",
    total_shares: 15,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    note: "Second quarter profit distribution",
  },
  {
    title: "Asset Sale",
    date: "2025-08-15",
    total_shares: 25,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    note: "Partial sale of obsolete equipment",
  },
  {
    title: "Q3 Dividend",
    date: "2025-09-30",
    total_shares: 35,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    note: "Third quarter profit distribution",
  },
  {
    title: "Annual Bonus",
    date: "2025-12-20",
    total_shares: 41,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    note: "End of year performance bonus",
  },
];
