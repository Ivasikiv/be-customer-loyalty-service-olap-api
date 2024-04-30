/*
  Warnings:

  - Added the required column `Latitude` to the `DimLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Longitude` to the `DimLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DimLocation" ADD COLUMN     "Latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Longitude" DOUBLE PRECISION NOT NULL;
