'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function InscriptionPage() {
  const router = useRouter()
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setChargement(true)
    setErreur('')

    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, motDePasse }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErreur(data.erreur)
        return
      }

      router.push('/connexion?inscrit=true')
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
          <h1 className="text-xl font-medium">Créer un compte</h1>
          <p className="text-sm text-gray-400 mt-1">Commencez à gérer vos finances</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Nom complet</label>
            <input
              type="text"
              value={nom}
              onChange={e => setNom(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Mamadou Diallo"
              required
            />
          </div>
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
              placeholder="min. 6 caractères"
              required
            />
          </div>
          {erreur && <p className="text-red-500 text-sm">{erreur}</p>}
          <button
            type="submit"
            disabled={chargement}
            className="bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {chargement ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-4">
          Déjà un compte?{' '}
          <Link href="/connexion" className="text-gray-900 font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}