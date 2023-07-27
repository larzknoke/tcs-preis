-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "verified" BOOLEAN DEFAULT false,
ADD COLUMN     "verifyId" TEXT;
