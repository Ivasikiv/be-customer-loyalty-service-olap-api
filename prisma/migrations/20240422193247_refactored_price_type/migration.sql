/*
  Warnings:

  - You are about to alter the column `TotalPrice` on the `FactTransactionCheck` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - Made the column `Price` on table `FactTransactionItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FactTransactionCheck" ALTER COLUMN "TotalPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "FactTransactionItem" ALTER COLUMN "Price" SET NOT NULL,
ALTER COLUMN "Price" SET DATA TYPE DOUBLE PRECISION;
