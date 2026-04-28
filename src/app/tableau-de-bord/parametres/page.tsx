'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type Profil = {
  nom: string
  email: string
  deviseLocale: string
  deviseFamille: string
  paysResidence: string
  paysOrigine: string
}

export default function ParametresPage() {
  const { data: session, update } = useSession()
  const [profil, setProfil] = useState<Profil | null>(null)

  const [nom, setNom] = useState('')
  const [deviseLocale, setDeviseLocale] = useState('EUR')
  const [deviseFamille, setDeviseFamille] = useState('XOF')

  const [motDePasseActuel, setMotDePasseActuel] = useState('')
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('')
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('')

  const [succesProfl, setSuccesProfil] = useState('')
  const [erreurProfil, setErreurProfil] = useState('')
  const [succesPass, setSuccesPass] = useState('')
  const [erreurPass, setErreurPass] = useState('')
  const [chargement, setChargement] = useState(false)

  useEffect(() => {
    fetch('/api/utilisateur')
      .then(res => res.json())
      .then(data => {
        setProfil(data)
        setNom(data.nom ?? '')
        setDeviseLocale(data.deviseLocale ?? 'EUR')
        setDeviseFamille(data.deviseFamille ?? 'XOF')
      })
  }, [])

  async function mettreAJourProfil(e: React.FormEvent) {
    e.preventDefault()
    setChargement(true)
    setErreurProfil('')
    setSuccesProfil('')

    const res = await fetch('/api/utilisateur', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, deviseLocale, deviseFamille }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErreurProfil(data.erreur)
    } else {
      setSuccesProfil('Profil mis à jour!')
      await update({ name: nom })
      setTimeout(() => setSuccesProfil(''), 3000)
    }
    setChargement(false)
  }

  async function changerMotDePasse(e: React.FormEvent) {
    e.preventDefault()
    setErreurPass('')
    setSuccesPass('')

    if (nouveauMotDePasse !== confirmerMotDePasse) {
      setErreurPass('Les mots de passe ne correspondent pas')
      return
    }

    const res = await fetch('/api/utilisateur', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ motDePasseActuel, nouveauMotDePasse }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErreurPass(data.erreur)
    } else {
      setSuccesPass('Mot de passe changé!')
      setMotDePasseActuel('')
      setNouveauMotDePasse('')
      setConfirmerMotDePasse('')
      setTimeout(() => setSuccesPass(''), 3000)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="mb-6">
        <h2 className="text-lg font-medium">Paramètres</h2>
        <p className="text-sm text-gray-400">Gérez votre profil et préférences</p>
      </div>

      {/* Profil */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Informations personnelles</h3>
        <form onSubmit={mettreAJourProfil} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Email</label>
            <input
              type="email"
              value={profil?.email ?? ''}
              disabled
              className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Nom complet</label>
            <input
              type="text"
              value={nom}
              onChange={e => setNom(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1">Devise locale</label>
              <select
                value={deviseLocale}
                onChange={e => setDeviseLocale(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="EUR">EUR — Euro</option>
                <option value="USD">USD — Dollar</option>
                <option value="GBP">GBP — Livre sterling</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Devise familiale</label>
              <select
                value={deviseFamille}
                onChange={e => setDeviseFamille(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="XOF">XOF — Franc CFA</option>
                <option value="GNF">GNF — Franc guinéen</option>
                <option value="MAD">MAD — Dirham marocain</option>
                <option value="XAF">XAF — Franc CFA central</option>
                <option value="NGN">NGN — Naira nigérian</option>
              </select>
            </div>
          </div>
          {erreurProfil && <p className="text-red-500 text-sm">{erreurProfil}</p>}
          {succesProfl && <p className="text-green-500 text-sm">{succesProfl}</p>}
          <button
            type="submit"
            disabled={chargement}
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 w-fit"
          >
            {chargement ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </form>
      </div>

      {/* Mot de passe */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Changer le mot de passe</h3>
        <form onSubmit={changerMotDePasse} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Mot de passe actuel</label>
            <input
              type="password"
              value={motDePasseActuel}
              onChange={e => setMotDePasseActuel(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              value={nouveauMotDePasse}
              onChange={e => setNouveauMotDePasse(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="min. 6 caractères"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={confirmerMotDePasse}
              onChange={e => setConfirmerMotDePasse(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="••••••••"
              required
            />
          </div>
          {erreurPass && <p className="text-red-500 text-sm">{erreurPass}</p>}
          {succesPass && <p className="text-green-500 text-sm">{succesPass}</p>}
          <button
            type="submit"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 w-fit"
          >
            Changer le mot de passe
          </button>
        </form>
      </div>
    </main>
  )
}