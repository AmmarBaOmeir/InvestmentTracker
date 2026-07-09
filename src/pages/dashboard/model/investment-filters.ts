import type {
  Investment,
  InvestmentStatuses,
} from "@/entities/asset/model/types";

const INVESTMENT_STATUSES: InvestmentStatuses[] = [
  "in_progress",
  "match_capital",
  "profitable",
  "inactive",
];

export interface InvestmentFilters {
  status: InvestmentStatuses | "";
  capitalMin: number | null;
  capitalMax: number | null;
  returnedMin: number | null;
  returnedMax: number | null;
  sharesMin: number | null;
  sharesMax: number | null;
  dateFrom: string;
  dateTo: string;
}

export const EMPTY_INVESTMENT_FILTERS: InvestmentFilters = {
  status: "",
  capitalMin: null,
  capitalMax: null,
  returnedMin: null,
  returnedMax: null,
  sharesMin: null,
  sharesMax: null,
  dateFrom: "",
  dateTo: "",
};

function parseOptionalNumber(value: FormDataEntryValue | null): number | null {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return null;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseStatus(
  value: FormDataEntryValue | null,
): InvestmentStatuses | "" {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return "";
  }

  return INVESTMENT_STATUSES.includes(raw as InvestmentStatuses)
    ? (raw as InvestmentStatuses)
    : "";
}

export function parseInvestmentFilters(formData: FormData): InvestmentFilters {
  return {
    status: parseStatus(formData.get("status")),
    capitalMin: parseOptionalNumber(formData.get("capital_min")),
    capitalMax: parseOptionalNumber(formData.get("capital_max")),
    returnedMin: parseOptionalNumber(formData.get("returned_min")),
    returnedMax: parseOptionalNumber(formData.get("returned_max")),
    sharesMin: parseOptionalNumber(formData.get("shares_min")),
    sharesMax: parseOptionalNumber(formData.get("shares_max")),
    dateFrom: String(formData.get("date_from") ?? "").trim(),
    dateTo: String(formData.get("date_to") ?? "").trim(),
  };
}

export function hasActiveInvestmentFilters(
  filters: InvestmentFilters,
): boolean {
  return (
    filters.status !== "" ||
    filters.capitalMin !== null ||
    filters.capitalMax !== null ||
    filters.returnedMin !== null ||
    filters.returnedMax !== null ||
    filters.sharesMin !== null ||
    filters.sharesMax !== null ||
    filters.dateFrom !== "" ||
    filters.dateTo !== ""
  );
}

export function filterInvestments(
  investments: Investment[],
  searchQuery: string,
  filters: InvestmentFilters,
): Investment[] {
  const query = searchQuery.trim().toLowerCase();

  return investments.filter((investment) => {
    if (query) {
      const searchable = [
        investment.name_en,
        investment.name_ar,
        investment.description_en,
        investment.description_ar,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(query)) {
        return false;
      }
    }

    if (filters.status && investment.status !== filters.status) {
      return false;
    }

    if (
      filters.capitalMin !== null &&
      investment.total_capital_sa < filters.capitalMin
    ) {
      return false;
    }

    if (
      filters.capitalMax !== null &&
      investment.total_capital_sa > filters.capitalMax
    ) {
      return false;
    }

    if (
      filters.returnedMin !== null &&
      investment.total_gained_sa < filters.returnedMin
    ) {
      return false;
    }

    if (
      filters.returnedMax !== null &&
      investment.total_gained_sa > filters.returnedMax
    ) {
      return false;
    }

    const shares = investment.total_shares ?? 0;

    if (filters.sharesMin !== null && shares < filters.sharesMin) {
      return false;
    }

    if (filters.sharesMax !== null && shares > filters.sharesMax) {
      return false;
    }

    const investedDate = investment.invested_date.slice(0, 10);

    if (filters.dateFrom && investedDate < filters.dateFrom) {
      return false;
    }

    if (filters.dateTo && investedDate > filters.dateTo) {
      return false;
    }

    return true;
  });
}
