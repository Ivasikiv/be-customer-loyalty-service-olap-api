/*
  Warnings:

  - The `AMorPM` column on the `DimTime` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `DayOfWeek` on the `DimDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `WeekNumber` on the `DimDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `CalendarMonth` on the `DimDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `CalendarQuarter` on the `DimDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `CalendarYear` on the `DimDate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `HourOfDay` on the `DimTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `MinuteOfHour` on the `DimTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DimDate" DROP COLUMN "DayOfWeek",
ADD COLUMN     "DayOfWeek" INTEGER NOT NULL,
DROP COLUMN "WeekNumber",
ADD COLUMN     "WeekNumber" INTEGER NOT NULL,
DROP COLUMN "CalendarMonth",
ADD COLUMN     "CalendarMonth" INTEGER NOT NULL,
DROP COLUMN "CalendarQuarter",
ADD COLUMN     "CalendarQuarter" INTEGER NOT NULL,
DROP COLUMN "CalendarYear",
ADD COLUMN     "CalendarYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DimTime" DROP COLUMN "HourOfDay",
ADD COLUMN     "HourOfDay" INTEGER NOT NULL,
DROP COLUMN "MinuteOfHour",
ADD COLUMN     "MinuteOfHour" INTEGER NOT NULL,
DROP COLUMN "AMorPM",
ADD COLUMN     "AMorPM" INTEGER;
