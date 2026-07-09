import { Hono } from 'hono';
import type { AppVariables } from '../types/context.js';
import { handlePrismaError } from '../lib/errors.js';

const statistics = new Hono<{ Variables: AppVariables }>();

statistics.get('/', async (c) => {
  try {
    const prisma = c.get('prisma');
    const totals = await prisma.investment.aggregate({
      _sum: {
        total_capital_sa: true,
        total_gained_sa: true,
        total_capital_ye: true,
        total_gained_ye: true,
      },
    });

    return c.json({
      success: true,
      data: {
        total_capital_sa: totals._sum.total_capital_sa ?? 0,
        total_gained_sa: totals._sum.total_gained_sa ?? 0,
        total_capital_ye: totals._sum.total_capital_ye ?? 0,
        total_gained_ye: totals._sum.total_gained_ye ?? 0,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
});

export default statistics;
