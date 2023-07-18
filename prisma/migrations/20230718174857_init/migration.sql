-- CreateTable
CREATE TABLE "Letter" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "nameTraeger" TEXT,
    "vorstandTraeger" TEXT,
    "strasseTraeger" TEXT,
    "plzTraeger" INTEGER,
    "ortTraeger" TEXT,
    "bundeslandTraeger" TEXT,
    "vereinTraeger" BOOLEAN,
    "organisationProjekt" TEXT,
    "ansprechpartnerProjekt" TEXT,
    "telefonnummerProjekt" TEXT,
    "mobilProjekt" TEXT,
    "emailProjekt" TEXT,
    "wwwProjekt" TEXT,
    "ibanProjekt" TEXT,
    "kontoNameProjekt" TEXT,
    "eigenmittel" DOUBLE PRECISION,
    "oeffentlicheZuwendungen" DOUBLE PRECISION,
    "privateSpenden" DOUBLE PRECISION,
    "bisherigeFoerderung" DOUBLE PRECISION,
    "checkBeitrag" BOOLEAN,
    "checkVeroeffentlich" BOOLEAN,
    "checkScheck" BOOLEAN,
    "checkDatenschutzBilder" BOOLEAN,
    "checkPersonenbezogen" BOOLEAN,
    "checkDatenschutzerklaerung" BOOLEAN,
    "checkTeilnahmebedingungen" BOOLEAN,
    "checkWahrheit" BOOLEAN,
    "botschafterId" INTEGER,
    "kampagneId" INTEGER,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Botschafter" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "strasse" TEXT,
    "plz" INTEGER,
    "ort" TEXT,
    "bundesland" TEXT,

    CONSTRAINT "Botschafter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kampagne" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "abgeschlossen" BOOLEAN DEFAULT false,

    CONSTRAINT "Kampagne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Letter" ADD CONSTRAINT "Letter_botschafterId_fkey" FOREIGN KEY ("botschafterId") REFERENCES "Botschafter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Letter" ADD CONSTRAINT "Letter_kampagneId_fkey" FOREIGN KEY ("kampagneId") REFERENCES "Kampagne"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
