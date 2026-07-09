-- Align legacy table names with Prisma schema
ALTER TABLE IF EXISTS "Capitals" RENAME TO "CapitalData";
ALTER TABLE IF EXISTS "Returns" RENAME TO "ReturnData";
