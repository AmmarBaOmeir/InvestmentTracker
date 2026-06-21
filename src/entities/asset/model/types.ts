export interface Asset {
  id: string;
  symbol: string;
  name: string;
  yeCapital: number;
  saCapital: number;
  yeGain: number;
  saGain: number;
}

export type InvestmentStatuses =
  | "in_progress"
  | "match_capital"
  | "profitable"
  | "inactive";

export interface Investment {
  id: string;
  name_en: string;
  name_ar: string;
  status: InvestmentStatuses;
  total_capital_sa: number;
  total_gained_sa: number;
  total_capital_ye: number;
  total_gained_ye: number;
  invested_date: string;
}
export type CapitalStatus = "pending" | "inbound" | "blocked";

export interface CapitalData {
  title: string;
  date: string;
  amount_ye: number;
  amount_sa: number;
  status: CapitalStatus;
  note: string;
}

export interface ReturnData {
  title: string;
  date: string;
  amount_ye: number;
  amount_sa: number;
  note: string;
}
