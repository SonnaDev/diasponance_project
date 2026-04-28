import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: session.user.email },
    select: {
      nom: true,
      email: true,
      deviseLocale: true,
      deviseFamille: true,
      paysResidence: true,
      paysOrigine: true,
    },
  })

  return NextResponse.json(utilisateur)
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const { nom, motDePasseActuel, nouveauMotDePasse, deviseLocale, deviseFamille } = await req.json()

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: session.user.email },
  })

  if (!utilisateur) {
    return NextResponse.json({ erreur: 'Utilisateur non trouvé' }, { status: 404 })
  }

  const donnees: any = {}
  if (nom) donnees.nom = nom
  if (deviseLocale) donnees.deviseLocale = deviseLocale
  if (deviseFamille) donnees.deviseFamille = deviseFamille

  if (motDePasseActuel && nouveauMotDePasse) {
    const valide = await bcrypt.compare(motDePasseActuel, utilisateur.motDePasse)
    if (!valide) {
      return NextResponse.json({ erreur: 'Mot de passe actuel incorrect' }, { status: 400 })
    }
    if (nouveauMotDePasse.length < 6) {
      return NextResponse.json(
        { erreur: 'Le nouveau mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }
    donnees.motDePasse = await bcrypt.hash(nouveauMotDePasse, 10)
  }

  await prisma.utilisateur.update({
    where: { email: session.user.email },
    data: donnees,
  })

  return NextResponse.json({ message: 'Profil mis à jour avec succès' })
}