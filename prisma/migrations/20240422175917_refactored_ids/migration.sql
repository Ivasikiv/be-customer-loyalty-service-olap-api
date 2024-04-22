-- AlterTable
ALTER TABLE "DimDate" ALTER COLUMN "DateID" DROP DEFAULT;
DROP SEQUENCE "dimdate_dateid_seq";

-- AlterTable
ALTER TABLE "DimTime" ALTER COLUMN "TimeID" DROP DEFAULT;
DROP SEQUENCE "dimtime_timeid_seq";

-- AlterTable
ALTER TABLE "FactTransactionCheck" ALTER COLUMN "TransactionCheckID" DROP DEFAULT;
DROP SEQUENCE "FactTransactionCheck_TransactionCheckID_seq";

-- AlterTable
ALTER TABLE "FactTransactionItem" ALTER COLUMN "TransactionItemID" DROP DEFAULT;
DROP SEQUENCE "FactTransactionItem_TransactionItemID_seq";
