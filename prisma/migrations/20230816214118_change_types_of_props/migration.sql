/*
  Warnings:

  - You are about to drop the column `plzOrtProjekt` on the `Letter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "plzOrtProjekt",
ADD COLUMN     "ortProjekt" TEXT,
ADD COLUMN     "plzProjekt" INTEGER,
ALTER COLUMN "bisherigeFoerderung" SET DATA TYPE TEXT,
ALTER COLUMN "zuwendungAndere" SET DATA TYPE TEXT;
