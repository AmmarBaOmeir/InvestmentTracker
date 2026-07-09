import type { CapitalData, Investment } from "@/entities/asset/model/types";
import {
  invalidateInvestmentDetailCache,
  invalidateInvestmentsCache,
  updateInvestment,
} from "@/entities/asset/api/investments";
import { invalidateStatisticsCache } from "@/entities/asset/api/statistics";
import { apiRequest } from "@/shared/lib/api-client";

export interface CreateCapitalPayload {
  title_en: string;
  title_ar: string;
  date: string;
  total_shares: number;
  amount_sar_per_share: number;
  amount_yer_per_share: number;
  note?: string | null;
  investmentId: string;
}

interface CapitalRecord extends Omit<CapitalData, "date" | "note"> {
  date: string;
  note?: string | null;
  investmentId?: string;
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

const capitalsInFlight = new Map<string, Promise<CapitalData[]>>();

export function invalidateCapitalsCache(investmentId?: string): void {
  if (investmentId) {
    capitalsInFlight.delete(investmentId);
    return;
  }
  capitalsInFlight.clear();
}

async function requestCapitals(
  investmentId: string,
  signal?: AbortSignal,
): Promise<CapitalData[]> {
  const query = "investmentId=" + investmentId;
  const list = await apiRequest<CapitalRecord[]>("/api/capitals?" + query, {
    signal,
  });
  return list.map(mapCapital);
}

export async function fetchCapitals(
  investmentId: string,
  signal?: AbortSignal,
): Promise<CapitalData[]> {
  if (signal) {
    return requestCapitals(investmentId, signal);
  }
  let inFlight = capitalsInFlight.get(investmentId);
  if (!inFlight) {
    inFlight = requestCapitals(investmentId).finally(() => {
      capitalsInFlight.delete(investmentId);
    });
    capitalsInFlight.set(investmentId, inFlight);
  }
  return inFlight;
}

export async function createCapital(
  payload: CreateCapitalPayload,
): Promise<CapitalData> {
  const record = await apiRequest<CapitalRecord>("/api/capitals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  invalidateCapitalsCache(payload.investmentId);
  invalidateInvestmentDetailCache(payload.investmentId);
  invalidateInvestmentsCache();
  invalidateStatisticsCache();
  return mapCapital(record);
}

export function buildCreateCapitalPayload(
  formData: FormData,
  investmentId: string,
): CreateCapitalPayload {
  const note = String(formData.get("note") ?? "").trim();
  return {
    title_en: String(formData.get("title_en") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    date: String(formData.get("date") ?? ""),
    total_shares: Number(formData.get("total_shares")),
    amount_sar_per_share: Number(formData.get("amount_sar_per_share")),
    amount_yer_per_share: Number(formData.get("amount_yer_per_share")),
    investmentId,
    ...(note ? { note } : {}),
  };
}

export type AddCapitalToInvestmentPayload = Omit<
  CreateCapitalPayload,
  "investmentId"
>;

export async function addCapitalToInvestment(
  investment: Investment,
  payload: AddCapitalToInvestmentPayload,
): Promise<{ capital: CapitalData; investment: Investment }> {
  const capital = await createCapital({
    ...payload,
    investmentId: investment.id,
  });
  const sarDelta = payload.total_shares * payload.amount_sar_per_share;
  const yerDelta = payload.total_shares * payload.amount_yer_per_share;
  const updatedInvestment = await updateInvestment(investment.id, {
    total_capital_sa: investment.total_capital_sa + sarDelta,
    total_capital_ye: investment.total_capital_ye + yerDelta,
  });
  return { capital, investment: updatedInvestment };
}
