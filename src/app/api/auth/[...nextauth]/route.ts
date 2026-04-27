import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/connexion' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = token.id as string
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        motDePasse: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.motDePasse) return null
        const utilisateur = await prisma.utilisateur.findUnique({
          where: { email: credentials.email },
        })
        if (!utilisateur) return null
        const valide = await bcrypt.compare(credentials.motDePasse, utilisateur.motDePasse)
        if (!valide) return null
        return { id: utilisateur.id, email: utilisateur.email, name: utilisateur.nom }
      },
    }),
  ],
})

export { handler as GET, handler as POST }