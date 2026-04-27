-- CreateEnum
CREATE TYPE "TypeTransaction" AS ENUM ('DEPENSE', 'REVENU');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT,
    "motDePasse" TEXT NOT NULL,
    "paysResidence" TEXT NOT NULL DEFAULT 'FR',
    "paysOrigine" TEXT NOT NULL DEFAULT 'SN',
    "deviseLocale" TEXT NOT NULL DEFAULT 'EUR',
    "deviseFamille" TEXT NOT NULL DEFAULT 'XOF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "devise" TEXT NOT NULL DEFAULT 'EUR',
    "type" "TypeTransaction" NOT NULL,
    "categorie" TEXT NOT NULL,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utilisateurId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objectif" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "montantCible" DOUBLE PRECISION NOT NULL,
    "montantActuel" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "devise" TEXT NOT NULL DEFAULT 'EUR',
    "dateLimit" TIMESTAMP(3),
    "atteint" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utilisateurId" TEXT NOT NULL,

    CONSTRAINT "Objectif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfert" (
    "id" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "deviseEnvoi" TEXT NOT NULL DEFAULT 'EUR',
    "montantRecu" DOUBLE PRECISION,
    "deviseRecu" TEXT NOT NULL DEFAULT 'XOF',
    "tauxChange" DOUBLE PRECISION,
    "service" TEXT NOT NULL,
    "beneficiaire" TEXT,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utilisateurId" TEXT NOT NULL,

    CONSTRAINT "Transfert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objectif" ADD CONSTRAINT "Objectif_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfert" ADD CONSTRAINT "Transfert_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
