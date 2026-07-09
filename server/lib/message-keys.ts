export const ApiMessageKey = {
  errors: {
    resource_not_found: 'errors.resource_not_found',
    user_not_found: 'errors.user_not_found',
    investment_not_found: 'errors.investment_not_found',
    capital_not_found: 'errors.capital_not_found',
    return_not_found: 'errors.return_not_found',
    bad_request: 'errors.bad_request',
    conflict: 'errors.conflict',
    duplicate_record: 'errors.duplicate_record',
    record_not_found: 'errors.record_not_found',
    invalid_reference: 'errors.invalid_reference',
    invalid_data: 'errors.invalid_data',
    database_error: 'errors.database_error',
    internal_error: 'errors.internal_error',
  },
  validation: {
    validation_failed: 'validation.validation_failed',
    at_least_one_field: 'validation.at_least_one_field',
    invalid_email: 'validation.invalid_email',
    name_required: 'validation.name_required',
    password_min_length: 'validation.password_min_length',
    field_required: 'validation.field_required',
    invalid_uuid: 'validation.invalid_uuid',
    invalid_status: 'validation.invalid_status',
    invalid_number: 'validation.invalid_number',
    invalid_date: 'validation.invalid_date',
  },
} as const;

export type ApiMessageKeyValue =
  | (typeof ApiMessageKey.errors)[keyof typeof ApiMessageKey.errors]
  | (typeof ApiMessageKey.validation)[keyof typeof ApiMessageKey.validation];

export const API_MESSAGE_KEY_VALUES = new Set<string>([
  ...Object.values(ApiMessageKey.errors),
  ...Object.values(ApiMessageKey.validation),
]);

export function toApiMessageKey(message: string): ApiMessageKeyValue {
  if (API_MESSAGE_KEY_VALUES.has(message)) {
    return message as ApiMessageKeyValue;
  }
  return ApiMessageKey.validation.field_required;
}
