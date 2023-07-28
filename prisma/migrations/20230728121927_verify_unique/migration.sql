/*
  Warnings:

  - A unique constraint covering the columns `[verifyId]` on the table `Letter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Letter_verifyId_key" ON "Letter"("verifyId");
