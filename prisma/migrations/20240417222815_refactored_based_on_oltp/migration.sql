/*
  Warnings:

  - You are about to drop the column `Price` on the `DimAssortmentSegment` table. All the data in the column will be lost.
  - You are about to drop the column `PromoCampaignID` on the `FactTransactionCheck` table. All the data in the column will be lost.
  - Added the required column `PaymentMethod` to the `FactTransactionCheck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FactTransactionCheck" DROP CONSTRAINT "FactTransactionCheck_PromoCampaignID_fkey";

-- AlterTable
ALTER TABLE "DimAssortmentSegment" DROP COLUMN "Price";

-- AlterTable
ALTER TABLE "FactTransactionCheck" DROP COLUMN "PromoCampaignID",
ADD COLUMN     "PaymentMethod" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "FactTransactionItem" ADD COLUMN     "ItemName" VARCHAR(50),
ADD COLUMN     "PromoCampaignID" INTEGER;

-- AddForeignKey
ALTER TABLE "FactTransactionItem" ADD CONSTRAINT "FactTransactionItem_PromoCampaignID_fkey" FOREIGN KEY ("PromoCampaignID") REFERENCES "DimPromoCampaign"("PromoCampaignID") ON DELETE NO ACTION ON UPDATE NO ACTION;
