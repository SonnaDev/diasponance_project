import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: session.user.email },
  })

  if (!utilisateur) {
    return NextResponse.json({ erreur: 'Utilisateur non trouvé' }, { status: 404 })
  }

  const objectifs = await prisma.objectif.findMany({
    where: { utilisateurId: utilisateur.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(objectifs)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const { nom, montantCible, devise, dateLimit } = await req.json()

  if (!nom || !montantCible) {
    return NextResponse.json(
      { erreur: 'Nom et montant cible sont obligatoires' },
      { status: 400 }
    )
  }

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: session.user.email },
  })

  if (!utilisateur) {
    return NextResponse.json({ erreur: 'Utilisateur non trouvé' }, { status: 404 })
  }

  const objectif = await prisma.objectif.create({
    data: {
      nom,
      montantCible: parseFloat(montantCible),
      devise: devise ?? 'EUR',
      dateLimit: dateLimit ? new Date(dateLimit) : null,
      utilisateurId: utilisateur.id,
    },
  })

  return NextResponse.json(objectif, { status: 201 })
}