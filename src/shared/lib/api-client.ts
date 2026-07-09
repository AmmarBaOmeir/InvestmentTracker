import type { ApiErrorPayload } from "@/shared/lib/api-error";
import i18n from "@/shared/i18n/config";
import {
  translateApiError,
  translateApiErrorDetails,
} from "@/shared/lib/api-error";

function resolveApiBase(): string {
  const configured = import.meta.env.VITE_API_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://localhost:3001";
  }

  return "";
}

const API_BASE = resolveApiBase();

const SERVER_UNAVAILABLE_STATUSES = new Set([502, 503, 504]);

export class ApiRequestError extends Error {
  payload: ApiErrorPayload;
  status: number;

  constructor(payload: ApiErrorPayload, status: number) {
    super(payload.messageKey);
    this.name = "ApiRequestError";
    this.payload = payload;
    this.status = status;
  }
}

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

interface ApiFailureResponse {
  success: false;
  error: ApiErrorPayload;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

function serverUnavailablePayload(
  body: ApiResponse<unknown> | null,
): ApiErrorPayload {
  if (body?.success === false) {
    return body.error;
  }

  return {
    code: "SERVER_UNAVAILABLE",
    messageKey: "errors.server_unavailable",
  };
}

function parseResponseBody<T>(text: string): ApiResponse<T> | null {
  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text) as ApiResponse<T>;
  } catch {
    return null;
  }
}

export function resolveRequestError(error: unknown): string {
  if (error instanceof ApiRequestError) {
    if (
      Array.isArray(error.payload.details) &&
      error.payload.details.length > 0
    ) {
      return translateApiErrorDetails(error.payload.details)
        .map((detail) => `${detail.path}: ${detail.message}`)
        .join("\n");
    }

    return translateApiError(error.payload);
  }

  return i18n.t("common.request_failed");
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
      ...init,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new ApiRequestError(
      { code: "NETWORK_ERROR", messageKey: "errors.network_error" },
      0,
    );
  }

  const text = await response.text();
  const body = parseResponseBody<T>(text);

  if (SERVER_UNAVAILABLE_STATUSES.has(response.status)) {
    throw new ApiRequestError(serverUnavailablePayload(body), response.status);
  }

  if (!body) {
    throw new ApiRequestError(
      {
        code: "INVALID_RESPONSE",
        messageKey: "errors.invalid_response",
      },
      response.status,
    );
  }

  if (!body.success) {
    throw new ApiRequestError(body.error, response.status);
  }

  return body.data;
}
