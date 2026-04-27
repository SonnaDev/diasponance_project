import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const mois = searchParams.get('mois')
  const categorie = searchParams.get('categorie')

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: session.user.email },
  })

  if (!utilisateur) {
    return NextResponse.json({ erreur: 'Utilisateur non trouvé' }, { status: 404 })
  }

  const filtres: any = { utilisateurId: utilisateur.id }

  if (mois) {
    const debut = new Date(`${mois}-01`)
    const fin = new Date(debut.getFullYear(), debut.getMonth() + 1, 0)
    filtres.date = { gte: debut, lte: fin }
  }

  if (categorie && categorie !== 'toutes') {
    filtres.categorie = categorie
  }

  const transactions = await prisma.transaction.findMany({
    where: filtres,
    orderBy: { date: 'desc' },
  })

  return NextResponse.json(transactions)
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ erreur: 'Non autorisé' }, { status: 401 })
  }

  const { montant, devise, type, categorie, note, date } = await req.json()

  if (!montant || !type || !categorie) {
    return NextResponse.json(
      { erreur: 'Montant, type et catégorie sont obligatoires' },
      { status: 400 }
    )
  }

  const utilisateur = await prisma.utilisateur.findUnique({
    where: { email: session.user.email },
  })

  if (!utilisateur) {
    return NextResponse.json({ erreur: 'Utilisateur non trouvé' }, { status: 404 })
  }

  const transaction = await prisma.transaction.create({
    data: {
      montant: parseFloat(montant),
      devise: devise ?? 'EUR',
      type,
      categorie,
      note,
      date: date ? new Date(date) : new Date(),
      utilisateurId: utilisateur.id,
    },
  })

  return NextResponse.json(transaction, { status: 201 })
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

  await prisma.transaction.delete({ where: { id } })

  return NextResponse.json({ message: 'Transaction supprimée' })
}