import type { ZodError } from 'zod';

import { badRequest } from './errors.js';
import { ApiMessageKey, toApiMessageKey } from './message-keys.js';

export interface ValidationDetail {
  path: string;
  messageKey: string;
}

export function formatZodError(error: ZodError): ValidationDetail[] {
  return error.issues.map((issue) => ({
    path: issue.path.length > 0 ? issue.path.join('.') : 'body',
    messageKey: toApiMessageKey(issue.message),
  }));
}

export function validationError(error: ZodError) {
  return badRequest(
    ApiMessageKey.validation.validation_failed,
    'VALIDATION_ERROR',
    formatZodError(error),
  );
}
