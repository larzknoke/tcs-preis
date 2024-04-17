-- CreateTable
CREATE TABLE "Invite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "teilnahme" BOOLEAN,
    "spende" BOOLEAN,
    "spendeBetrag" TEXT,
    "titel" TEXT,
    "name" TEXT,
    "vorname" TEXT,
    "unternehmen" TEXT,
    "email" TEXT,
    "telefon" TEXT,
    "begleitung" TEXT,
    "datenschutz" BOOLEAN,
    "datenschutzMedia" BOOLEAN,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);
