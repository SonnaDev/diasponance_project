import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: session.user.email },
  })

  if (!utilisateur) {
    return NextResponse.json({ erreur: 'Utilisateur non trouvé' }, { status: 404 })
  }

  const transferts = await prisma.transfert.findMany({
    where: { utilisateurId: utilisateur.id },
    orderBy: { date: 'desc' },
  })

  return NextResponse.json(transferts)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const {
    montant, deviseEnvoi, montantRecu,
    deviseRecu, tauxChange, service, beneficiaire, note
  } = await req.json()

  if (!montant || !service) {
    return NextResponse.json(
      { erreur: 'Montant et service sont obligatoires' },
      { status: 400 }
    )
  }

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: session.user.email },
  })

  if (!utilisateur) {
    return NextResponse.json({ erreur: 'Utilisateur non trouvé' }, { status: 404 })
  }

  const transfert = await prisma.transfert.create({
    data: {
      montant: parseFloat(montant),
      deviseEnvoi: deviseEnvoi ?? 'EUR',
      montantRecu: montantRecu ? parseFloat(montantRecu) : null,
      deviseRecu: deviseRecu ?? 'XOF',
      tauxChange: tauxChange ? parseFloat(tauxChange) : null,
      service,
      beneficiaire,
      note,
      utilisateurId: utilisateur.id,
    },
  })

  return NextResponse.json(transfert, { status: 201 })
}

export async function DELETE(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ erreur: 'ID manquant' }, { status: 400 })
  }

  await prisma.transfert.delete({ where: { id } })
  return NextResponse.json({ message: 'Transfert supprimé' })
}