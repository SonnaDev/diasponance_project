import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { nom, email, motDePasse } = await req.json()

    if (!nom || !email || !motDePasse) {
      return NextResponse.json(
        { erreur: 'Tous les champs sont obligatoires' },
        { status: 400 }
      )
    }

    if (motDePasse.length < 6) {
      return NextResponse.json(
        { erreur: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }

    const existant = await prisma.utilisateur.findUnique({
      where: { email },
    })

    if (existant) {
      return NextResponse.json(
        { erreur: 'Un compte avec cet email existe déjà' },
        { status: 400 }
      )
    }

    const motDePasseHache = await bcrypt.hash(motDePasse, 10)

    await prisma.utilisateur.create({
      data: {
        nom,
        email,
        motDePasse: motDePasseHache,
      },
    })

    return NextResponse.json(
      { message: 'Compte créé avec succès' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { erreur: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}