import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const motDePasse = await bcrypt.hash('demo123', 10)

  const utilisateur = await prisma.utilisateur.create({
    data: {
      email: 'demo@diasporafinance.com',
      nom: 'Mamadou Diallo',
      motDePasse,
      paysResidence: 'FR',
      paysOrigine: 'SN',
      deviseLocale: 'EUR',
      deviseFamille: 'XOF',
    },
  })

  await prisma.transaction.createMany({
    data: [
      { montant: 1800, devise: 'EUR', type: 'REVENU', categorie: 'Salaire', note: 'Salaire janvier', utilisateurId: utilisateur.id },
      { montant: 650, devise: 'EUR', type: 'DEPENSE', categorie: 'Loyer', note: 'Loyer février', utilisateurId: utilisateur.id },
      { montant: 120, devise: 'EUR', type: 'DEPENSE', categorie: 'Nourriture', note: 'Courses semaine', utilisateurId: utilisateur.id },
      { montant: 45, devise: 'EUR', type: 'DEPENSE', categorie: 'Transport', note: 'Navigo mensuel', utilisateurId: utilisateur.id },
      { montant: 200, devise: 'EUR', type: 'DEPENSE', categorie: 'Transfert familial', note: 'Envoi famille', utilisateurId: utilisateur.id },
      { montant: 1800, devise: 'EUR', type: 'REVENU', categorie: 'Salaire', note: 'Salaire février', utilisateurId: utilisateur.id },
      { montant: 650, devise: 'EUR', type: 'DEPENSE', categorie: 'Loyer', note: 'Loyer mars', utilisateurId: utilisateur.id },
      { montant: 95, devise: 'EUR', type: 'DEPENSE', categorie: 'Nourriture', note: 'Courses semaine', utilisateurId: utilisateur.id },
      { montant: 300, devise: 'EUR', type: 'DEPENSE', categorie: 'Transfert familial', note: 'Urgence famille', utilisateurId: utilisateur.id },
      { montant: 60, devise: 'EUR', type: 'DEPENSE', categorie: 'Loisirs', note: 'Sortie weekend', utilisateurId: utilisateur.id },
    ],
  })

  await prisma.transfert.createMany({
    data: [
      { montant: 200, deviseEnvoi: 'EUR', montantRecu: 131200, deviseRecu: 'XOF', tauxChange: 656, service: 'Wave', beneficiaire: 'Maman', utilisateurId: utilisateur.id },
      { montant: 300, deviseEnvoi: 'EUR', montantRecu: 196800, deviseRecu: 'XOF', tauxChange: 656, service: 'Orange Money', beneficiaire: 'Papa', utilisateurId: utilisateur.id },
      { montant: 150, deviseEnvoi: 'EUR', montantRecu: 98400, deviseRecu: 'XOF', tauxChange: 656, service: 'Wave', beneficiaire: 'Maman', utilisateurId: utilisateur.id },
    ],
  })

  await prisma.objectif.createMany({
    data: [
      { nom: 'Billet retour Dakar', montantCible: 450, montantActuel: 180, devise: 'EUR', utilisateurId: utilisateur.id },
      { nom: "Fonds d'urgence famille", montantCible: 1000, montantActuel: 350, devise: 'EUR', utilisateurId: utilisateur.id },
      { nom: 'Nouveau téléphone', montantCible: 300, montantActuel: 300, devise: 'EUR', atteint: true, utilisateurId: utilisateur.id },
    ],
  })

  console.log('✓ Données de démonstration créées!')
  console.log('  Email: demo@diasporafinance.com')
  console.log('  Mot de passe: demo123')
}

main().catch(console.error).finally(() => prisma.$disconnect())