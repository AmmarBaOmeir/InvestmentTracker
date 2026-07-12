import type {
  CapitalData,
  Investment,
  ReturnData,
} from "@/entities/asset/model/types";
import { resolveRequestError } from "@/shared/lib";
import type { LoaderFunctionArgs } from "react-router-dom";
import {
  buildOverviewStats,
  type InvestmentOverviewStatGroup,
} from "@/pages/investment/model/overview-stats";

export type InvestmentLoaderData = {
  investment: Investment | null;
  capitals: CapitalData[];
  returns: ReturnData[];
  overviewStats: InvestmentOverviewStatGroup[];
  error: string | null;
};

function emptyLoaderData(): InvestmentLoaderData {
  return {
    investment: null,
    capitals: [],
    returns: [],
    overviewStats: [],
    error: null,
  };
}

export async function investmentLoader({
  params,
  request,
}: LoaderFunctionArgs): Promise<InvestmentLoaderData> {
  if (!params.id) {
    return emptyLoaderData();
  }

  try {
    return await (await import("@/entities/asset/api/investments"))
      .fetchInvestmentDetail(params.id, request.signal)
      .then((detail) => ({
        investment: detail.investment,
        capitals: detail.capitals,
        returns: detail.returns,
        overviewStats: buildOverviewStats(
          detail.investment,
          detail.capitals,
          detail.returns,
          (request.headers.get("Accept-Language") ?? "").startsWith("ar")
            ? "ar-SA"
            : "en-US",
        ),
        error: null,
      }));
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    return Object.assign(emptyLoaderData(), {
      error: resolveRequestError(error),
    });
  }
}
