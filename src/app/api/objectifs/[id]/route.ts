import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const { montant } = await req.json()

  const objectif = await prisma.objectif.findUnique({
    where: { id: params.id },
  })

  if (!objectif) {
    return NextResponse.json({ erreur: 'Objectif non trouvé' }, { status: 404 })
  }

  const nouveauMontant = objectif.montantActuel + parseFloat(montant)
  const atteint = nouveauMontant >= objectif.montantCible

  const objectifMisAJour = await prisma.objectif.update({
    where: { id: params.id },
    data: {
      montantActuel: Math.min(nouveauMontant, objectif.montantCible),
      atteint,
    },
  })

  return NextResponse.json(objectifMisAJour)
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  await prisma.objectif.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ message: 'Objectif supprimé' })
}