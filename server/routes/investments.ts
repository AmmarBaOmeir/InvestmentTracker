import { Hono } from 'hono';
import type { AppVariables } from '../types/context.js';
import { AppError, handlePrismaError, notFound } from '../lib/errors.js';
import { ApiMessageKey } from '../lib/message-keys.js';
import { validationError } from '../lib/validation-error.js';
import { createInvestmentSchema, updateInvestmentSchema } from '../lib/validation.js';

const investments = new Hono<{ Variables: AppVariables }>();

investments.get('/', async (c) => {
  try {
    const prisma = c.get('prisma');
    const list = await prisma.investment.findMany({ orderBy: { createdAt: 'desc' } });
    return c.json({ success: true, data: list });
  } catch (error) {
    throw handlePrismaError(error);
  }
});

investments.get('/:id', async (c) => {
  try {
    const prisma = c.get('prisma');
    const investment = await prisma.investment.findUnique({
      where: { id: c.req.param('id') },
      include: { capitals: true, returns: true },
    });
    if (!investment) {
      throw notFound(ApiMessageKey.errors.investment_not_found, 'INVESTMENT_NOT_FOUND');
    }
    return c.json({ success: true, data: investment });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

investments.post('/', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = createInvestmentSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed.error);

  try {
    const prisma = c.get('prisma');
    const { create_initial_capital, ...investmentData } = parsed.data;

    const investment = await prisma.$transaction(async (tx) => {
      const created = await tx.investment.create({ data: investmentData });

      const totalShares = investmentData.total_shares;
      if (
        create_initial_capital &&
        totalShares != null &&
        totalShares > 0
      ) {
        await tx.capitalData.create({
          data: {
            title_en: 'Initial investment',
            title_ar: 'استثمار أولي',
            date: investmentData.invested_date,
            total_shares: totalShares,
            amount_sar_per_share: investmentData.capital_amount_per_share_sar,
            amount_yer_per_share: investmentData.capital_amount_per_share_yer,
            note: 'Initial capital at investment creation',
            investmentId: created.id,
          },
        });
      }

      return created;
    });

    return c.json({ success: true, data: investment }, 201);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

investments.patch('/:id', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = updateInvestmentSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed.error);

  try {
    const prisma = c.get('prisma');
    const id = c.req.param('id');
    const existing = await prisma.investment.findUnique({ where: { id } });
    if (!existing) {
      throw notFound(ApiMessageKey.errors.investment_not_found, 'INVESTMENT_NOT_FOUND');
    }

    const investment = await prisma.investment.update({
      where: { id },
      data: parsed.data,
    });
    return c.json({ success: true, data: investment });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

investments.delete('/:id', async (c) => {
  try {
    const prisma = c.get('prisma');
    const id = c.req.param('id');
    const existing = await prisma.investment.findUnique({ where: { id } });
    if (!existing) {
      throw notFound(ApiMessageKey.errors.investment_not_found, 'INVESTMENT_NOT_FOUND');
    }
    await prisma.investment.delete({ where: { id } });
    return c.json({ success: true, data: null });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

export default investments;
