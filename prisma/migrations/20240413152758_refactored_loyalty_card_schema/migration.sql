-- CreateTable
CREATE TABLE "DimAssortmentSegment" (
    "AssortmentSegmentID" INTEGER NOT NULL,
    "AssortmentSegmentType" VARCHAR(50) NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Points" INTEGER NOT NULL,

    CONSTRAINT "DimAssortmentSegment_pkey" PRIMARY KEY ("AssortmentSegmentID")
);

-- CreateTable
CREATE TABLE "DimLoyaltyCard" (
    "CardTypeID" INTEGER NOT NULL,
    "CardType" VARCHAR(50) NOT NULL,
    "DiscountPercentage" DECIMAL(5,2) NOT NULL,
    "CardNumber" VARCHAR(20) NOT NULL,
    "CardBalance" INTEGER NOT NULL,

    CONSTRAINT "DimLoyaltyCard_pkey" PRIMARY KEY ("CardTypeID")
);

-- CreateTable
CREATE TABLE "DimDate" (
    "DateID" INTEGER NOT NULL,
    "FullDate" TIMESTAMP(6) NOT NULL,
    "DayOfWeek" VARCHAR(50) NOT NULL,
    "WeekNumber" VARCHAR(50) NOT NULL,
    "CalendarMonth" VARCHAR(50) NOT NULL,
    "CalendarQuarter" VARCHAR(50) NOT NULL,
    "CalendarYear" VARCHAR(50) NOT NULL,

    CONSTRAINT "DimDate_pkey" PRIMARY KEY ("DateID")
);

-- CreateTable
CREATE TABLE "DimEmployee" (
    "EmployeeID" INTEGER NOT NULL,
    "FirstName" VARCHAR(50) NOT NULL,
    "LastName" VARCHAR(50) NOT NULL,
    "Position" VARCHAR(100) NOT NULL,

    CONSTRAINT "DimEmployee_pkey" PRIMARY KEY ("EmployeeID")
);

-- CreateTable
CREATE TABLE "DimLocation" (
    "LocationID" INTEGER NOT NULL,
    "PartnerName" INTEGER NOT NULL,
    "LocationName" VARCHAR(100) NOT NULL,
    "Address" VARCHAR(255) NOT NULL,
    "City" VARCHAR(100) NOT NULL,
    "State" VARCHAR(100),
    "ZipCode" VARCHAR(20),
    "Country" VARCHAR(100) NOT NULL,

    CONSTRAINT "DimLocation_pkey" PRIMARY KEY ("LocationID")
);

-- CreateTable
CREATE TABLE "DimLoyaltyUser" (
    "LoyaltyUserID" INTEGER NOT NULL,
    "FirstName" VARCHAR(50) NOT NULL,
    "LastName" VARCHAR(50) NOT NULL,
    "Age" INTEGER NOT NULL,

    CONSTRAINT "DimLoyaltyUser_pkey" PRIMARY KEY ("LoyaltyUserID")
);

-- CreateTable
CREATE TABLE "DimPromoCampaign" (
    "PromoCampaignID" INTEGER NOT NULL,
    "PromoCampaignName" VARCHAR(100) NOT NULL,
    "Description" TEXT NOT NULL,
    "StartDate" TIMESTAMP(6) NOT NULL,
    "EndDate" TIMESTAMP(6),

    CONSTRAINT "DimPromoCampaign_pkey" PRIMARY KEY ("PromoCampaignID")
);

-- CreateTable
CREATE TABLE "DimTime" (
    "TimeID" INTEGER NOT NULL,
    "FullTime" TIMESTAMP(6) NOT NULL,
    "HourOfDay" VARCHAR(50) NOT NULL,
    "MinuteOfHour" VARCHAR(50) NOT NULL,
    "AMorPM" VARCHAR(50),

    CONSTRAINT "DimTime_pkey" PRIMARY KEY ("TimeID")
);

-- CreateTable
CREATE TABLE "FactTransactionCheck" (
    "TransactionCheckID" SERIAL NOT NULL,
    "DateID" INTEGER NOT NULL,
    "TimeID" INTEGER NOT NULL,
    "CardTypeID" INTEGER NOT NULL,
    "EmployeeID" INTEGER NOT NULL,
    "LoyaltyUserID" INTEGER NOT NULL,
    "LocationID" INTEGER NOT NULL,
    "PromoCampaignID" INTEGER,
    "TimeFromLastCardUsage" INTEGER,
    "PointsAccumulated" INTEGER,
    "PointsWithdraw" INTEGER,
    "TotalPrice" DECIMAL(10,2) NOT NULL,
    "CreateDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(6),

    CONSTRAINT "FactTransactionCheck_pkey" PRIMARY KEY ("TransactionCheckID")
);

-- CreateTable
CREATE TABLE "FactTransactionItem" (
    "TransactionItemID" SERIAL NOT NULL,
    "DateID" INTEGER NOT NULL,
    "TimeID" INTEGER NOT NULL,
    "AssortmentSegmentID" INTEGER NOT NULL,
    "SellerID" INTEGER NOT NULL,
    "LoyaltyUserID" INTEGER NOT NULL,
    "LocationID" INTEGER NOT NULL,
    "QuantitySold" INTEGER,
    "Price" INTEGER,
    "TotalPoints" INTEGER,
    "CreateDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(6),

    CONSTRAINT "FactTransactionItem_pkey" PRIMARY KEY ("TransactionItemID")
);

-- CreateIndex
CREATE UNIQUE INDEX "FactTransactionCheck_TransactionCheckID_key" ON "FactTransactionCheck"("TransactionCheckID");

-- CreateIndex
CREATE UNIQUE INDEX "FactTransactionItem_TransactionItemID_key" ON "FactTransactionItem"("TransactionItemID");

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_CardTypeID_fkey" FOREIGN KEY ("CardTypeID") REFERENCES "DimLoyaltyCard"("CardTypeID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_DateID_fkey" FOREIGN KEY ("DateID") REFERENCES "DimDate"("DateID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_EmployeeID_fkey" FOREIGN KEY ("EmployeeID") REFERENCES "DimEmployee"("EmployeeID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_LocationID_fkey" FOREIGN KEY ("LocationID") REFERENCES "DimLocation"("LocationID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_LoyaltyUserID_fkey" FOREIGN KEY ("LoyaltyUserID") REFERENCES "DimLoyaltyUser"("LoyaltyUserID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_PromoCampaignID_fkey" FOREIGN KEY ("PromoCampaignID") REFERENCES "DimPromoCampaign"("PromoCampaignID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionCheck" ADD CONSTRAINT "FactTransactionCheck_TimeID_fkey" FOREIGN KEY ("TimeID") REFERENCES "DimTime"("TimeID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionItem" ADD CONSTRAINT "FactTransactionItem_AssortmentSegmentID_fkey" FOREIGN KEY ("AssortmentSegmentID") REFERENCES "DimAssortmentSegment"("AssortmentSegmentID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionItem" ADD CONSTRAINT "FactTransactionItem_DateID_fkey" FOREIGN KEY ("DateID") REFERENCES "DimDate"("DateID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionItem" ADD CONSTRAINT "FactTransactionItem_SellerID_fkey" FOREIGN KEY ("SellerID") REFERENCES "DimEmployee"("EmployeeID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionItem" ADD CONSTRAINT "FactTransactionItem_LocationID_fkey" FOREIGN KEY ("LocationID") REFERENCES "DimLocation"("LocationID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionItem" ADD CONSTRAINT "FactTransactionItem_LoyaltyUserID_fkey" FOREIGN KEY ("LoyaltyUserID") REFERENCES "DimLoyaltyUser"("LoyaltyUserID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FactTransactionItem" ADD CONSTRAINT "FactTransactionItem_TimeID_fkey" FOREIGN KEY ("TimeID") REFERENCES "DimTime"("TimeID") ON DELETE NO ACTION ON UPDATE NO ACTION;
