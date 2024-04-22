/*
  Warnings:

  - Changed the type of `FullDate` on the `DimDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `FullTime` on the `DimTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DimDate" DROP COLUMN "FullDate",
ADD COLUMN     "FullDate" VARCHAR(16) NOT NULL;

-- AlterTable
ALTER TABLE "DimTime" DROP COLUMN "FullTime",
ADD COLUMN     "FullTime" VARCHAR(16) NOT NULL;
