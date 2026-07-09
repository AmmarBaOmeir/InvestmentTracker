-- CreateEnum
CREATE TYPE "InvestmentStatus" AS ENUM ('in_progress', 'match_capital', 'profitable', 'inactive');

-- CreateTable
CREATE TABLE "Investment" (
    "id" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ar" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_ar" TEXT NOT NULL,
    "status" "InvestmentStatus" NOT NULL,
    "total_capital_sa" DOUBLE PRECISION NOT NULL,
    "total_gained_sa" DOUBLE PRECISION NOT NULL,
    "total_capital_ye" DOUBLE PRECISION NOT NULL,
    "total_gained_ye" DOUBLE PRECISION NOT NULL,
    "total_shares" DOUBLE PRECISION,
    "capital_amount_per_share_sar" DOUBLE PRECISION NOT NULL,
    "capital_amount_per_share_yer" DOUBLE PRECISION NOT NULL,
    "expected_return_amount_per_share_sar" DOUBLE PRECISION NOT NULL,
    "expected_return_amount_per_share_yer" DOUBLE PRECISION NOT NULL,
    "invested_date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapitalData" (
    "id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total_shares" DOUBLE PRECISION NOT NULL,
    "amount_sar_per_share" DOUBLE PRECISION NOT NULL,
    "amount_yer_per_share" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "investmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CapitalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnData" (
    "id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total_shares" DOUBLE PRECISION NOT NULL,
    "amount_sar_per_share" DOUBLE PRECISION NOT NULL,
    "amount_yer_per_share" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "investmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReturnData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CapitalData" ADD CONSTRAINT "CapitalData_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnData" ADD CONSTRAINT "ReturnData_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
