import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { Prisma } from '@prisma/client';
import { ApiMessageKey } from './message-keys.js';

export class AppError extends Error {
  constructor(
    public messageKey: string,
    public statusCode: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(messageKey);
    this.name = 'AppError';
  }
}

export function notFound(
  messageKey: string = ApiMessageKey.errors.resource_not_found,
  code = 'NOT_FOUND',
): AppError {
  return new AppError(messageKey, 404, code);
}

export function badRequest(
  messageKey: string = ApiMessageKey.errors.bad_request,
  code = 'BAD_REQUEST',
  details?: unknown,
): AppError {
  return new AppError(messageKey, 400, code, details);
}

export function conflict(
  messageKey: string = ApiMessageKey.errors.conflict,
  code = 'CONFLICT',
): AppError {
  return new AppError(messageKey, 409, code);
}

export function handlePrismaError(error: unknown): AppError {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new AppError(ApiMessageKey.errors.database_error, 503, 'DATABASE_UNAVAILABLE');
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return conflict(ApiMessageKey.errors.duplicate_record, 'DUPLICATE_RECORD');
      case 'P2025':
        return notFound(ApiMessageKey.errors.record_not_found, 'RECORD_NOT_FOUND');
      case 'P2003':
        return badRequest(ApiMessageKey.errors.invalid_reference, 'INVALID_REFERENCE');
      default:
        return new AppError(ApiMessageKey.errors.database_error, 500, error.code);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return badRequest(ApiMessageKey.errors.invalid_data, 'INVALID_DATA');
  }

  return new AppError(ApiMessageKey.errors.internal_error, 500, 'INTERNAL_ERROR');
}

export function errorHandler(err: Error, c: Context) {
  if (err instanceof AppError) {
    const errorBody: { code?: string; messageKey: string; details?: unknown } = {
      messageKey: err.messageKey,
    };
    if (err.code !== undefined) errorBody.code = err.code;
    if (err.details !== undefined) errorBody.details = err.details;
    return c.json({ success: false, error: errorBody }, err.statusCode as ContentfulStatusCode);
  }

  console.error(err);

  return c.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        messageKey: ApiMessageKey.errors.internal_error,
      },
    },
    500,
  );
}
