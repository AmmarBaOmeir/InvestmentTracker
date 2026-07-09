import type { ParseKeys } from "i18next";
import i18n, { apiNS } from "@/shared/i18n/config";

export interface ApiErrorPayload {
  code?: string;
  messageKey: ParseKeys<"api">;
  details?: ValidationDetail[];
}

export interface ValidationDetail {
  path: string;
  messageKey: ParseKeys<"api">;
}

export function translateApiError(
  error: Pick<ApiErrorPayload, "messageKey">,
): string {
  return i18n.t(error.messageKey, { ns: apiNS });
}

export function translateApiErrorDetails(
  details: ValidationDetail[],
): Array<{ path: string; message: string }> {
  return details.map((detail) => ({
    path: detail.path,
    message: i18n.t(detail.messageKey, { ns: apiNS }),
  }));
}
