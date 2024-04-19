-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "kampagneId" INTEGER;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_kampagneId_fkey" FOREIGN KEY ("kampagneId") REFERENCES "Kampagne"("id") ON DELETE SET NULL ON UPDATE CASCADE;
