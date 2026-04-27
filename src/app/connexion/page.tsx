'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function ConnexionPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setChargement(true)
    setErreur('')

    try {
      const result = await signIn('credentials', {
        email,
        motDePasse,
        redirect: false,
        callbackUrl: '/tableau-de-bord',
      })

      if (result?.error) {
        setErreur('Email ou mot de passe incorrect')
      } else if (result?.url) {
        router.push('/tableau-de-bord')
      }
    } catch {
      setErreur('Une erreur est survenue. Réessayez.')
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border rounded-xl p-8 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="text-xl font-medium">Connexion</h1>
          <p className="text-sm text-gray-400 mt-1">Bienvenue sur DiasporaFinance</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="vous@exemple.com"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={e => setMotDePasse(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="••••••••"
              required
            />
          </div>
          {erreur && <p className="text-red-500 text-sm">{erreur}</p>}
          <button
            type="submit"
            disabled={chargement}
            className="bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {chargement ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-4">
          Pas encore de compte?{' '}
          <Link href="/inscription" className="text-gray-900 font-medium hover:underline">
            S'inscrire
          </Link>
        </p>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-400 text-center">Compte démo:</p>
          <p className="text-xs text-gray-600 text-center">demo@diasporafinance.com / demo123</p>
        </div>
      </div>
    </div>
  )
}