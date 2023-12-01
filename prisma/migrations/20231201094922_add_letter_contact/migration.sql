-- CreateTable
CREATE TABLE "Lettercontact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "anrede" TEXT,
    "telefon" TEXT,
    "funktion" TEXT,
    "email" TEXT,
    "notiz" TEXT,
    "letterId" INTEGER,

    CONSTRAINT "Lettercontact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lettercontact" ADD CONSTRAINT "Lettercontact_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
