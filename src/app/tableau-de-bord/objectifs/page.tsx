'use client'

import { useEffect, useState } from 'react'

type Objectif = {
  id: string
  nom: string
  montantCible: number
  montantActuel: number
  devise: string
  dateLimit: string | null
  atteint: boolean
}

export default function ObjectifsPage() {
  const [objectifs, setObjectifs] = useState<Objectif[]>([])
  const [chargement, setChargement] = useState(true)
  const [afficherFormulaire, setAfficherFormulaire] = useState(false)
  const [contribution, setContribution] = useState<{ id: string; montant: string } | null>(null)

  const [nom, setNom] = useState('')
  const [montantCible, setMontantCible] = useState('')
  const [devise, setDevise] = useState('EUR')
  const [dateLimit, setDateLimit] = useState('')
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')

  useEffect(() => {
    chargerObjectifs()
  }, [])

  async function chargerObjectifs() {
    const res = await fetch('/api/objectifs')
    const data = await res.json()
    setObjectifs(data)
    setChargement(false)
  }

  async function creerObjectif(e: React.FormEvent) {
    e.preventDefault()
    setErreur('')

    const res = await fetch('/api/objectifs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, montantCible, devise, dateLimit }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErreur(data.erreur)
      return
    }

    setSucces('Objectif créé avec succès!')
    setNom('')
    setMontantCible('')
    setDateLimit('')
    setAfficherFormulaire(false)
    chargerObjectifs()
    setTimeout(() => setSucces(''), 3000)
  }

  async function contribuer(id: string, montant: string) {
    const res = await fetch(`/api/objectifs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ montant: parseFloat(montant) }),
    })

    if (res.ok) {
      setContribution(null)
      chargerObjectifs()
    }
  }

  async function supprimer(id: string) {
    if (!confirm('Supprimer cet objectif?')) return
    await fetch(`/api/objectifs/${id}`, { method: 'DELETE' })
    chargerObjectifs()
  }

  const progression = (actuel: number, cible: number) =>
    Math.min(Math.round((actuel / cible) * 100), 100)

  const joursRestants = (dateLimit: string | null) => {
    if (!dateLimit) return null
    const diff = new Date(dateLimit).getTime() - new Date().getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium">Objectifs d'épargne</h2>
          <p className="text-sm text-gray-400">Suivez vos projets financiers</p>
        </div>
        <button
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          + Nouvel objectif
        </button>
      </div>

      {succes && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
          {succes}
        </div>
      )}

      {/* Formulaire création */}
      {afficherFormulaire && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="text-sm font-medium mb-4">Créer un nouvel objectif</h3>
          <form onSubmit={creerObjectif} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-1">Nom de l'objectif</label>
              <input
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Ex: Billet retour Dakar, Urgence famille..."
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Montant cible</label>
              <input
                type="number"
                value={montantCible}
                onChange={e => setMontantCible(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="500"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">Devise</label>
              <select
                value={devise}
                onChange={e => setDevise(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="EUR">EUR — Euro</option>
                <option value="XOF">XOF — Franc CFA</option>
                <option value="USD">USD — Dollar</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-1">Date limite (optionnel)</label>
              <input
                type="date"
                value={dateLimit}
                onChange={e => setDateLimit(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            {erreur && <p className="col-span-2 text-red-500 text-sm">{erreur}</p>}
            <div className="col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Créer l'objectif
              </button>
              <button
                type="button"
                onClick={() => setAfficherFormulaire(false)}
                className="text-sm text-gray-500 border px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des objectifs */}
      {chargement ? (
        <p className="text-gray-400 text-sm">Chargement...</p>
      ) : objectifs.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center">
          <p className="text-gray-400 text-sm mb-2">Aucun objectif pour l'instant</p>
          <p className="text-gray-300 text-xs">Créez votre premier objectif d'épargne</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {objectifs.map(objectif => {
            const pct = progression(objectif.montantActuel, objectif.montantCible)
            const jours = joursRestants(objectif.dateLimit)
            return (
              <div
                key={objectif.id}
                className={`bg-white border rounded-xl p-6 ${objectif.atteint ? 'border-green-200 bg-green-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{objectif.nom}</h3>
                      {objectif.atteint && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          ✓ Atteint!
                        </span>
                      )}
                    </div>
                    {jours !== null && (
                      <p className={`text-xs mt-0.5 ${jours < 0 ? 'text-red-400' : jours < 30 ? 'text-orange-400' : 'text-gray-400'}`}>
                        {jours < 0 ? `Expiré il y a ${Math.abs(jours)} jours` : `${jours} jours restants`}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => supprimer(objectif.id)}
                    className="text-gray-300 hover:text-red-400 text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Barre de progression */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">
                      {objectif.montantActuel.toFixed(2)} {objectif.devise}
                    </span>
                    <span className="text-gray-400">
                      {objectif.montantCible.toFixed(2)} {objectif.devise}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${objectif.atteint ? 'bg-green-500' : 'bg-gray-900'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{pct}% atteint</p>
                </div>

                {/* Contribuer */}
                {!objectif.atteint && (
                  <div>
                    {contribution?.id === objectif.id ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={contribution.montant}
                          onChange={e => setContribution({ id: objectif.id, montant: e.target.value })}
                          className="border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-gray-200 w-32"
                          placeholder="Montant"
                        />
                        <button
                          onClick={() => contribuer(objectif.id, contribution.montant)}
                          className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-700"
                        >
                          Confirmer
                        </button>
                        <button
                          onClick={() => setContribution(null)}
                          className="text-sm text-gray-400 border px-3 py-1.5 rounded-lg"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setContribution({ id: objectif.id, montant: '' })}
                        className="text-sm text-gray-600 border px-3 py-1.5 rounded-lg hover:bg-gray-50"
                      >
                        + Ajouter une contribution
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}