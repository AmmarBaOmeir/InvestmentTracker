import { Hono } from 'hono';
import type { AppVariables } from '../types/context.js';
import { AppError, handlePrismaError, notFound } from '../lib/errors.js';
import { ApiMessageKey } from '../lib/message-keys.js';
import { validationError } from '../lib/validation-error.js';
import { createCapitalDataSchema, updateCapitalDataSchema } from '../lib/validation.js';

const capitals = new Hono<{ Variables: AppVariables }>();

capitals.get('/', async (c) => {
  const investmentId = c.req.query('investmentId');
  try {
    const prisma = c.get('prisma');
    const list = await prisma.capitalData.findMany({
      where: investmentId ? { investmentId } : undefined,
      orderBy: { date: 'desc' },
    });
    return c.json({ success: true, data: list });
  } catch (error) {
    throw handlePrismaError(error);
  }
});

capitals.get('/:id', async (c) => {
  try {
    const prisma = c.get('prisma');
    const capital = await prisma.capitalData.findUnique({
      where: { id: c.req.param('id') },
      include: { investment: true },
    });
    if (!capital) {
      throw notFound(ApiMessageKey.errors.capital_not_found, 'CAPITAL_NOT_FOUND');
    }
    return c.json({ success: true, data: capital });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

capitals.post('/', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = createCapitalDataSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed.error);

  try {
    const prisma = c.get('prisma');
    const investment = await prisma.investment.findUnique({
      where: { id: parsed.data.investmentId },
    });
    if (!investment) {
      throw notFound(ApiMessageKey.errors.investment_not_found, 'INVESTMENT_NOT_FOUND');
    }

    const capital = await prisma.capitalData.create({ data: parsed.data });
    return c.json({ success: true, data: capital }, 201);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

capitals.patch('/:id', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = updateCapitalDataSchema.safeParse(body);
  if (!parsed.success) throw validationError(parsed.error);

  try {
    const prisma = c.get('prisma');
    const id = c.req.param('id');
    const existing = await prisma.capitalData.findUnique({ where: { id } });
    if (!existing) {
      throw notFound(ApiMessageKey.errors.capital_not_found, 'CAPITAL_NOT_FOUND');
    }

    const capital = await prisma.capitalData.update({
      where: { id },
      data: parsed.data,
    });
    return c.json({ success: true, data: capital });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

capitals.delete('/:id', async (c) => {
  try {
    const prisma = c.get('prisma');
    const id = c.req.param('id');
    const existing = await prisma.capitalData.findUnique({ where: { id } });
    if (!existing) {
      throw notFound(ApiMessageKey.errors.capital_not_found, 'CAPITAL_NOT_FOUND');
    }
    await prisma.capitalData.delete({ where: { id } });
    return c.json({ success: true, data: null });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error);
  }
});

export default capitals;
