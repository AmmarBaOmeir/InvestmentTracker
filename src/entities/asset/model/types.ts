export type InvestmentStatuses =
  | "in_progress"
  | "match_capital"
  | "profitable"
  | "inactive";

export interface Investment {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  status: InvestmentStatuses;
  total_capital_sa: number;
  total_gained_sa: number;
  total_capital_ye: number;
  total_gained_ye: number;
  invested_date: string;
  total_shares?: number;
  capital_amount_per_share_sar: number;
  capital_amount_per_share_yer: number;
  expected_return_amount_per_share_sar: number;
  expected_return_amount_per_share_yer: number;
}

export interface CapitalData {
  title: string;
  date: string;
  total_shares: number;
  amount_sar_per_share: number;
  amount_yer_per_share: number;
  note: string;
}

export interface ReturnData {
  title: string;
  date: string;
  total_shares: number;
  amount_sar_per_share: number;
  amount_yer_per_share: number;
  note: string;
}
