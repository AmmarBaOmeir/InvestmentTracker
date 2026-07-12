import type { ParseKeys } from "i18next";
import type {
  CapitalData,
  Investment,
  ReturnData,
} from "@/entities/asset/model/types";
import dateIcon from "@/assets/icons/date.svg";
import fundIcon from "@/assets/icons/fund.svg";
import saudiRialIcon from "@/assets/icons/saudi-rial.svg";
import type { StatCardProps } from "@/shared/ui/stat-card/stat-card";

export const mockInvestments: Investment[] = [
  {
    id: "1",
    name_en: "Rental Yard",
    name_ar: "ساحة إيجار",
    description_en: "Commercial rental yard for vehicle and equipment storage.",
    description_ar: "ساحة إيجار تجارية لتخزين المركبات والمعدات.",
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
    description_en: "Neighborhood coffee shop with steady foot traffic.",
    description_ar: "مقهى حي يتمتع بإقبال ثابت من الزبائن.",
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
    description_en: "Passenger bus operating on intercity routes.",
    description_ar: "حافلة ركاب تعمل على خطوط بين المدن.",
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
    name_en: "Taxi",
    name_ar: "تاكسي",
    description_en: "Taxi service fleet serving urban commuters.",
    description_ar: "أسطول خدمة تاكسي يخدم ركاب المدينة.",
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
    label: "investment.overview_stats.expected_return_per_share_sar",
    value: 10000,
    currency: "SAR",
    icon: saudiRialIcon,
  },
  {
    label: "investment.overview_stats.last_return_date",
    value: "05 Dec 2023",
    icon: dateIcon,
  },
  {
    label: "investment.overview_stats.last_return_amount_sar",
    value: 1200,
    currency: "SAR",
    icon: saudiRialIcon,
  },
] as const;

export const mockCapitals: CapitalData[] = [
  {
    id: "c1",
    title_en: "Initial Investment",
    title_ar: "Initial Investment AR",
    date: "2025-01-15",
    total_shares: 15,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    note: "First capital injection for the project",
  },
];

export const mockReturns: ReturnData[] = [
  {
    id: "r1",
    title_en: "Q1 Dividend",
    title_ar: "Q1 Dividend AR",
    date: "2025-03-31",
    total_shares: 15,
    amount_yer_per_share: 75000,
    amount_sar_per_share: 200,
    note: "First quarter profit distribution",
  },
];
