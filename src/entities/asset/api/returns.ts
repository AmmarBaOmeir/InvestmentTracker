import type { Investment, ReturnData } from "@/entities/asset/model/types";
import {
  invalidateInvestmentDetailCache,
  invalidateInvestmentsCache,
  updateInvestment,
} from "@/entities/asset/api/investments";
import { invalidateStatisticsCache } from "@/entities/asset/api/statistics";
import { apiRequest } from "@/shared/lib/api-client";

export interface CreateReturnPayload {
  title_en: string;
  title_ar: string;
  date: string;
  total_shares: number;
  amount_sar_per_share: number;
  amount_yer_per_share: number;
  note?: string | null;
  investmentId: string;
}

interface ReturnRecord extends Omit<ReturnData, "date" | "note"> {
  date: string;
  note?: string | null;
  investmentId?: string;
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

const returnsInFlight = new Map<string, Promise<ReturnData[]>>();

export function invalidateReturnsCache(investmentId?: string): void {
  if (investmentId) {
    returnsInFlight.delete(investmentId);
    return;
  }
  returnsInFlight.clear();
}

async function requestReturns(
  investmentId: string,
  signal?: AbortSignal,
): Promise<ReturnData[]> {
  const query = "investmentId=" + investmentId;
  const list = await apiRequest<ReturnRecord[]>("/api/returns?" + query, {
    signal,
  });
  return list.map(mapReturn);
}

export async function fetchReturns(
  investmentId: string,
  signal?: AbortSignal,
): Promise<ReturnData[]> {
  if (signal) {
    return requestReturns(investmentId, signal);
  }
  let inFlight = returnsInFlight.get(investmentId);
  if (!inFlight) {
    inFlight = requestReturns(investmentId).finally(() => {
      returnsInFlight.delete(investmentId);
    });
    returnsInFlight.set(investmentId, inFlight);
  }
  return inFlight;
}

export async function createReturn(
  payload: CreateReturnPayload,
): Promise<ReturnData> {
  const record = await apiRequest<ReturnRecord>("/api/returns", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  invalidateReturnsCache(payload.investmentId);
  invalidateInvestmentDetailCache(payload.investmentId);
  invalidateInvestmentsCache();
  invalidateStatisticsCache();
  return mapReturn(record);
}

export function buildCreateReturnPayload(
  formData: FormData,
  investmentId: string,
): CreateReturnPayload {
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

export type AddReturnToInvestmentPayload = Omit<
  CreateReturnPayload,
  "investmentId"
>;

export async function addReturnToInvestment(
  investment: Investment,
  payload: AddReturnToInvestmentPayload,
): Promise<{ record: ReturnData; investment: Investment }> {
  const record = await createReturn({
    ...payload,
    investmentId: investment.id,
  });
  const sarDelta = payload.total_shares * payload.amount_sar_per_share;
  const yerDelta = payload.total_shares * payload.amount_yer_per_share;
  const updatedInvestment = await updateInvestment(investment.id, {
    total_gained_sa: investment.total_gained_sa + sarDelta,
    total_gained_ye: investment.total_gained_ye + yerDelta,
  });
  return { record, investment: updatedInvestment };
}
