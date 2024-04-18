/*
  Warnings:

  - A unique constraint covering the columns `[verifyId]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "verified" BOOLEAN DEFAULT false,
ADD COLUMN     "verifyId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invite_verifyId_key" ON "Invite"("verifyId");
