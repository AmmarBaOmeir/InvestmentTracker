import type {
  CapitalData,
  Investment,
  InvestmentStatuses,
  ReturnData,
} from "@/entities/asset/model/types";
import { invalidateStatisticsCache } from "@/entities/asset/api/statistics";
import { apiRequest } from "@/shared/lib/api-client";

export interface CreateInvestmentPayload {
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  status: InvestmentStatuses;
  total_capital_sa: number;
  total_gained_sa: number;
  total_capital_ye: number;
  total_gained_ye: number;
  total_shares?: number | null;
  capital_amount_per_share_sar: number;
  capital_amount_per_share_yer: number;
  expected_return_amount_per_share_sar: number;
  expected_return_amount_per_share_yer: number;
  invested_date: string;
  create_initial_capital?: boolean;
}

export type UpdateInvestmentPayload = Partial<CreateInvestmentPayload>;

export type LoadedInvestment = {
  investment: Investment;
  capitals: CapitalData[];
  returns: ReturnData[];
};

interface InvestmentRecord extends Omit<Investment, "invested_date"> {
  invested_date: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CapitalRecord extends Omit<CapitalData, "date" | "note"> {
  date: string;
  note?: string | null;
  investmentId?: string;
}

interface ReturnRecord extends Omit<ReturnData, "date" | "note"> {
  date: string;
  note?: string | null;
  investmentId?: string;
}

interface InvestmentDetailRecord extends InvestmentRecord {
  capitals: CapitalRecord[];
  returns: ReturnRecord[];
}

function mapInvestment(record: InvestmentRecord): Investment {
  return {
    ...record,
    invested_date: record.invested_date.slice(0, 10),
  };
}

function mapCapital(record: CapitalRecord): CapitalData {
  return {
    id: record.id,
    title_en: record.title_en,
    title_ar: record.title_ar,
    date: record.date.slice(0, 10),
    total_shares: record.total_shares,
    amount_sar_per_share: record.amount_sar_per_share,
    amount_yer_per_share: record.amount_yer_per_share,
    ...(record.note ? { note: record.note } : {}),
  };
}

function mapReturn(record: ReturnRecord): ReturnData {
  return {
    id: record.id,
    title_en: record.title_en,
    title_ar: record.title_ar,
    date: record.date.slice(0, 10),
    total_shares: record.total_shares,
    amount_sar_per_share: record.amount_sar_per_share,
    amount_yer_per_share: record.amount_yer_per_share,
    ...(record.note ? { note: record.note } : {}),
  };
}

let investmentsInFlight: Promise<Investment[]> | null = null;
const investmentDetailInFlight = new Map<string, Promise<LoadedInvestment>>();

export function invalidateInvestmentsCache(): void {
  investmentsInFlight = null;
}

export function invalidateInvestmentDetailCache(investmentId?: string): void {
  if (investmentId) {
    investmentDetailInFlight.delete(investmentId);
    return;
  }
  investmentDetailInFlight.clear();
}

async function requestInvestments(signal?: AbortSignal): Promise<Investment[]> {
  const list = await apiRequest<InvestmentRecord[]>("/api/investments", {
    signal,
  });
  return list.map(mapInvestment);
}

export async function fetchInvestments(
  signal?: AbortSignal,
): Promise<Investment[]> {
  if (signal) {
    return requestInvestments(signal);
  }

  if (!investmentsInFlight) {
    investmentsInFlight = requestInvestments().finally(() => {
      investmentsInFlight = null;
    });
  }

  return investmentsInFlight;
}

async function requestInvestmentDetail(
  id: string,
  signal?: AbortSignal,
): Promise<LoadedInvestment> {
  const record = await apiRequest<InvestmentDetailRecord>(
    "/api/investments/" + id,
    { signal },
  );

  return {
    investment: mapInvestment(record),
    capitals: record.capitals.map(mapCapital),
    returns: record.returns.map(mapReturn),
  };
}

export async function fetchInvestmentDetail(
  id: string,
  signal?: AbortSignal,
): Promise<LoadedInvestment> {
  if (signal) {
    return requestInvestmentDetail(id, signal);
  }

  let inFlight = investmentDetailInFlight.get(id);
  if (!inFlight) {
    inFlight = requestInvestmentDetail(id).finally(() => {
      investmentDetailInFlight.delete(id);
    });
    investmentDetailInFlight.set(id, inFlight);
  }

  return inFlight;
}

export async function createInvestment(
  payload: CreateInvestmentPayload,
): Promise<Investment> {
  const record = await apiRequest<InvestmentRecord>("/api/investments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  invalidateInvestmentsCache();
  invalidateStatisticsCache();
  return mapInvestment(record);
}

export async function updateInvestment(
  id: string,
  payload: UpdateInvestmentPayload,
): Promise<Investment> {
  const record = await apiRequest<InvestmentRecord>("/api/investments/" + id, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  invalidateInvestmentsCache();
  invalidateInvestmentDetailCache(id);
  invalidateStatisticsCache();
  return mapInvestment(record);
}

export function buildCreateInvestmentPayload(
  formData: FormData,
  options: {
    amountSar: number;
    amountYer: number;
    includeInitialCapital: boolean;
  },
): CreateInvestmentPayload {
  const expectedReturnSar = Number(
    formData.get("expected_return_amount_per_share_sar"),
  );
  const expectedReturnYer = Number(
    formData.get("expected_return_amount_per_share_yer"),
  );

  const base = {
    name_en: String(formData.get("name_en") ?? "").trim(),
    name_ar: String(formData.get("name_ar") ?? "").trim(),
    description_en: String(formData.get("description_en") ?? "").trim() || "-",
    description_ar: String(formData.get("description_ar") ?? "").trim() || "-",
    status: "in_progress" as const,
    invested_date: String(formData.get("date") ?? ""),
    total_gained_sa: 0,
    total_gained_ye: 0,
    expected_return_amount_per_share_sar: expectedReturnSar,
    expected_return_amount_per_share_yer: expectedReturnYer,
    create_initial_capital: options.includeInitialCapital,
  };

  if (!options.includeInitialCapital) {
    return {
      ...base,
      total_shares: null,
      capital_amount_per_share_sar: 0,
      capital_amount_per_share_yer: 0,
      total_capital_sa: 0,
      total_capital_ye: 0,
    };
  }

  const totalShares = Number(formData.get("total_shares"));
  const amountSarPerShare = Number(formData.get("amount_sar_per_share"));
  const amountYerPerShare = Number(formData.get("amount_yer_per_share"));

  return {
    ...base,
    total_shares: totalShares,
    capital_amount_per_share_sar: amountSarPerShare,
    capital_amount_per_share_yer: amountYerPerShare,
    total_capital_sa: options.amountSar,
    total_capital_ye: options.amountYer,
  };
}
