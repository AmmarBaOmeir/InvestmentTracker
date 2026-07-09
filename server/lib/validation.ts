import { z } from 'zod';
import { ApiMessageKey } from './message-keys.js';

const requiredString = z.string().min(1, { message: ApiMessageKey.validation.field_required });
const numberField = z.coerce.number({
  invalid_type_error: ApiMessageKey.validation.invalid_number,
});
const dateField = z.coerce.date({
  invalid_type_error: ApiMessageKey.validation.invalid_date,
});

export const investmentStatusSchema = z.enum(
  ['in_progress', 'match_capital', 'profitable', 'inactive'],
  { message: ApiMessageKey.validation.invalid_status },
);

export const createUserSchema = z.object({
  email: z.string().email({ message: ApiMessageKey.validation.invalid_email }),
  name: z.string().min(1, { message: ApiMessageKey.validation.name_required }),
  password: z.string().min(8, { message: ApiMessageKey.validation.password_min_length }),
});

export const updateUserSchema = z
  .object({
    email: z.string().email({ message: ApiMessageKey.validation.invalid_email }).optional(),
    name: z.string().min(1, { message: ApiMessageKey.validation.name_required }).optional(),
    password: z
      .string()
      .min(8, { message: ApiMessageKey.validation.password_min_length })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: ApiMessageKey.validation.at_least_one_field,
  });

export const createInvestmentSchema = z
  .object({
    name_en: requiredString,
    name_ar: requiredString,
    description_en: requiredString,
    description_ar: requiredString,
    status: investmentStatusSchema,
    total_capital_sa: numberField,
    total_gained_sa: numberField,
    total_capital_ye: numberField,
    total_gained_ye: numberField,
    total_shares: numberField.optional().nullable(),
    capital_amount_per_share_sar: numberField,
    capital_amount_per_share_yer: numberField,
    expected_return_amount_per_share_sar: numberField,
    expected_return_amount_per_share_yer: numberField,
    invested_date: dateField,
    create_initial_capital: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (!data.create_initial_capital) {
      return;
    }

    if (data.total_shares == null || data.total_shares <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['total_shares'],
        message: ApiMessageKey.validation.field_required,
      });
    }
  });

export const updateInvestmentSchema = createInvestmentSchema
  .innerType()
  .omit({ create_initial_capital: true })
  .partial()
  .refine(
  (data) => Object.keys(data).length > 0,
  { message: ApiMessageKey.validation.at_least_one_field },
);

export const createCapitalDataSchema = z.object({
  title_en: requiredString,
  title_ar: requiredString,
  date: dateField,
  total_shares: numberField,
  amount_sar_per_share: numberField,
  amount_yer_per_share: numberField,
  note: z.string().optional().nullable(),
  investmentId: z.string().uuid({ message: ApiMessageKey.validation.invalid_uuid }),
});

export const updateCapitalDataSchema = createCapitalDataSchema
  .omit({ investmentId: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: ApiMessageKey.validation.at_least_one_field,
  });

export const createReturnDataSchema = z.object({
  title_en: requiredString,
  title_ar: requiredString,
  date: dateField,
  total_shares: numberField,
  amount_sar_per_share: numberField,
  amount_yer_per_share: numberField,
  note: z.string().optional().nullable(),
  investmentId: z.string().uuid({ message: ApiMessageKey.validation.invalid_uuid }),
});

export const updateReturnDataSchema = createReturnDataSchema
  .omit({ investmentId: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: ApiMessageKey.validation.at_least_one_field,
  });
