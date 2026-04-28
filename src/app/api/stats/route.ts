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
    include: { transactions: true, transferts: true },
  })

  if (!utilisateur) {
    return NextResponse.json({ erreur: 'Utilisateur non trouvé' }, { status: 404 })
  }

  const revenus = utilisateur.transactions.filter(t => t.type === 'REVENU')
  const depenses = utilisateur.transactions.filter(t => t.type === 'DEPENSE')

  const totalRevenus = revenus.reduce((acc, t) => acc + t.montant, 0)
  const totalDepenses = depenses.reduce((acc, t) => acc + t.montant, 0)
  const totalTransferts = utilisateur.transferts.reduce((acc, t) => acc + t.montant, 0)
  const solde = totalRevenus - totalDepenses

  const depensesParCategorie = Object.entries(
    depenses.reduce((acc, t) => {
      acc[t.categorie] = (acc[t.categorie] ?? 0) + t.montant
      return acc
    }, {} as Record<string, number>)
  ).map(([categorie, total]) => ({ categorie, total }))

  const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
  const evolutionMensuelle = mois.map((moisLabel, index) => {
    const transactionsMois = utilisateur.transactions.filter(t => {
      return new Date(t.date).getMonth() === index
    })
    return {
      mois: moisLabel,
      revenus: transactionsMois.filter(t => t.type === 'REVENU').reduce((acc, t) => acc + t.montant, 0),
      depenses: transactionsMois.filter(t => t.type === 'DEPENSE').reduce((acc, t) => acc + t.montant, 0),
    }
  })

  return NextResponse.json({ totalRevenus, totalDepenses, totalTransferts, solde, depensesParCategorie, evolutionMensuelle })
}