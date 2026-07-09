import { Hono } from 'hono';
import type { AppVariables } from '../types/context.js';
import { AppError, handlePrismaError, notFound } from '../lib/errors.js';
import { ApiMessageKey } from '../lib/message-keys.js';
import { validationError } from '../lib/validation-error.js';
import { createReturnDataSchema, updateReturnDataSchema } from '../lib/validation.js';

const returns = new Hono<{ Variables: AppVariables }>();

returns.get('/', async (c) => {
  const investmentId = c.req.query('investmentId');
  try {
    const prisma = c.get('prisma');
    const list = await prisma.returnData.findMany({
      where: investmentId ? { investmentId } : undefined,
      orderBy: { date: 'desc' },
    });
    return c.json({ success: true, data: list });
  } catch (error) {
    throw handlePrismaError(error);
  }
});

returns.get('/:id', async (c) => {
  try {
    const prisma = c.get('prisma');
    const record = await prisma.returnData.findUnique({
      where: { id: c.req.param('id') },
      include: { investment: true },
    });
    if (!record) {
      throw notFound(ApiMessageKey.errors.return_not_found, 'RETURN_NOT_FOUND');
    }
    return c.json({ success: true, data: record });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

returns.post('/', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = createReturnDataSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed.error);

  try {
    const prisma = c.get('prisma');
    const investment = await prisma.investment.findUnique({
      where: { id: parsed.data.investmentId },
    });
    if (!investment) {
      throw notFound(ApiMessageKey.errors.investment_not_found, 'INVESTMENT_NOT_FOUND');
    }

    const record = await prisma.returnData.create({ data: parsed.data });
    return c.json({ success: true, data: record }, 201);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

returns.patch('/:id', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = updateReturnDataSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed.error);

  try {
    const prisma = c.get('prisma');
    const id = c.req.param('id');
    const existing = await prisma.returnData.findUnique({ where: { id } });
    if (!existing) {
      throw notFound(ApiMessageKey.errors.return_not_found, 'RETURN_NOT_FOUND');
    }

    const record = await prisma.returnData.update({
      where: { id },
      data: parsed.data,
    });
    return c.json({ success: true, data: record });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

returns.delete('/:id', async (c) => {
  try {
    const prisma = c.get('prisma');
    const id = c.req.param('id');
    const existing = await prisma.returnData.findUnique({ where: { id } });
    if (!existing) {
      throw notFound(ApiMessageKey.errors.return_not_found, 'RETURN_NOT_FOUND');
    }
    await prisma.returnData.delete({ where: { id } });
    return c.json({ success: true, data: null });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

export default returns;
