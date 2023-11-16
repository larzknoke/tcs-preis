-- CreateTable
CREATE TABLE "Botcontact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "anrede" TEXT,
    "telefon" TEXT,
    "funktion" TEXT,
    "email" TEXT,
    "notiz" TEXT,
    "botschafterId" INTEGER,

    CONSTRAINT "Botcontact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Botcontact" ADD CONSTRAINT "Botcontact_botschafterId_fkey" FOREIGN KEY ("botschafterId") REFERENCES "Botschafter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
