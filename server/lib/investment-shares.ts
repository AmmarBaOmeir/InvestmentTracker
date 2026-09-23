import type { PrismaClient } from '@prisma/client';

type DbClient = Pick<PrismaClient, 'capitalData' | 'investment'>;

export async function recalculateInvestmentShares(
  prisma: DbClient,
  investmentId: string,
): Promise<number> {
  const aggregate = await prisma.capitalData.aggregate({
    where: { investmentId },
    _sum: { total_shares: true },
  });

  const totalShares = aggregate._sum.total_shares ?? 0;

  await prisma.investment.update({
    where: { id: investmentId },
    data: { total_shares: totalShares },
  });

  return totalShares;
}
