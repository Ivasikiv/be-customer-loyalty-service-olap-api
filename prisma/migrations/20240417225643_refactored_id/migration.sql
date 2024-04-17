/*
  Warnings:

  - The primary key for the `DimLoyaltyCard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CardTypeID` on the `DimLoyaltyCard` table. All the data in the column will be lost.
  - You are about to drop the column `CardTypeID` on the `FactTransactionCheck` table. All the data in the column will be lost.
  - You are about to drop the column `EmployeeID` on the `FactTransactionCheck` table. All the data in the column will be lost.
  - You are about to drop the `DimEmployee` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[AssortmentSegmentID]` on the table `DimAssortmentSegment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[DateID]` on the table `DimDate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LocationID]` on the table `DimLocation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LoyaltyCardID]` on the table `DimLoyaltyCard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[LoyaltyUserID]` on the table `DimLoyaltyUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PromoCampaignID]` on the table `DimPromoCampaign` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[TimeID]` on the table `DimTime` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `LoyaltyCardID` to the `DimLoyaltyCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LoyaltyCardID` to the `FactTransactionCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SellerID` to the `FactTransactionCheck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FactTransactionCheck" DROP CONSTRAINT "FactTransactionCheck_CardTypeID_fkey";

-- DropForeignKey
ALTER TABLE "FactTransactionCheck" DROP CONSTRAINT "FactTransactionCheck_EmployeeID_fkey";

-- DropForeignKey
ALTER TABLE "FactTransactionItem" DROP CONSTRAINT "FactTransactionItem_SellerID_fkey";

-- AlterTable
CREATE SEQUENCE dimdate_dateid_seq;
ALTER TABLE "DimDate" ALTER COLUMN "DateID" SET DEFAULT nextval('dimdate_dateid_seq');
ALTER SEQUENCE dimdate_dateid_seq OWNED BY "DimDate"."DateID";

-- AlterTable
ALTER TABLE "DimLoyaltyCard" DROP CONSTRAINT "DimLoyaltyCard_pkey",
DROP COLUMN "CardTypeID",
ADD COLUMN     "LoyaltyCardID" INTEGER NOT NULL,
ADD CONSTRAINT "DimLoyaltyCard_pkey" PRIMARY KEY ("LoyaltyCardID");

-- AlterTable
CREATE SEQUENCE dimtime_timeid_seq;
ALTER TABLE "DimTime" ALTER COLUMN "TimeID" SET DEFAULT nextval('dimtime_timeid_seq');
ALTER SEQUENCE dimtime_timeid_seq OWNED BY "DimTime"."TimeID";

-- AlterTable
ALTER TABLE "FactTransactionCheck" DROP COLUMN "CardTypeID",
DROP COLUMN "EmployeeID",
ADD COLUMN     "LoyaltyCardID" INTEGER NOT NULL,
ADD COLUMN     "SellerID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DimEmployee";

-- CreateTable
CREATE TABLE "DimSeller" (
    "SellerID" INTEGER NOT NULL,
    "FirstName" VARCHAR(50) NOT NULL,
    "LastName" VARCHAR(50) NOT NULL,

    CONSTRAINT "DimSeller_pkey" PRIMARY KEY ("SellerID")
);

-- CreateIndex
CREATE UNIQUE INDEX "DimSeller_SellerID_key" ON "DimSeller"("SellerID");

-- CreateIndex
CREATE UNIQUE INDEX "DimAssortmentSegment_AssortmentSegmentID_key" ON "DimAssortmentSegment"("AssortmentSegmentID");

-- CreateIndex
CREATE UNIQUE INDEX "DimDate_DateID_key" ON "DimDate"("DateID");

-- CreateIndex
CREATE UNIQUE INDEX "DimLocation_LocationID_key" ON "DimLocation"("LocationID");

-- CreateIndex
CREATE UNIQUE INDEX "DimLoyaltyCard_LoyaltyCardID_key" ON "DimLoyaltyCard"("LoyaltyCardID");

-- CreateIndex
CREATE UNIQUE INDEX "DimLoyaltyUser_LoyaltyUserID_key" ON "DimLoyaltyUser"("LoyaltyUserID");

-- CreateIndex
CREATE UNIQUE INDEX "DimPromoCampaign_PromoCampaignID_key" ON "DimPromoCampaign"("PromoCampaignID");

-- CreateIndex
CREATE UNIQUE INDEX "DimTime_TimeID_key" ON "DimTime"("TimeID");

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_LoyaltyCardID_fkey" FOREIGN KEY ("LoyaltyCardID") REFERENCES "DimLoyaltyCard"("LoyaltyCardID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_SellerID_fkey" FOREIGN KEY ("SellerID") REFERENCES "DimSeller"("SellerID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionItem" ADD CONSTRAINT "FactTransactionItem_SellerID_fkey" FOREIGN KEY ("SellerID") REFERENCES "DimSeller"("SellerID") ON DELETE NO ACTION ON UPDATE NO ACTION;
