import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { erreur: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id } = context.params
    const { montant } = await req.json()

    const objectif = await prisma.objectif.findUnique({
      where: { id },
    })

    if (!objectif) {
      return NextResponse.json(
        { erreur: 'Objectif non trouvé' },
        { status: 404 }
      )
    }

    const valeurMontant = parseFloat(montant)

    if (isNaN(valeurMontant)) {
      return NextResponse.json(
        { erreur: 'Montant invalide' },
        { status: 400 }
      )
    }

    const nouveauMontant = objectif.montantActuel + valeurMontant
    const atteint = nouveauMontant >= objectif.montantCible

    const objectifMisAJour = await prisma.objectif.update({
      where: { id },
      data: {
        montantActuel: Math.min(
          nouveauMontant,
          objectif.montantCible
        ),
        atteint,
      },
    })

    return NextResponse.json(objectifMisAJour)
  } catch (error) {
    return NextResponse.json(
      { erreur: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { erreur: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id } = context.params

    await prisma.objectif.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Objectif supprimé',
    })
  } catch (error) {
    return NextResponse.json(
      { erreur: 'Erreur serveur' },
      { status: 500 }
    )
  }
}