'use client'

import { useEffect, useState } from 'react'

type Transaction = {
  id: string
  montant: number
  devise: string
  type: 'REVENU' | 'DEPENSE'
  categorie: string
  note: string | null
  date: string
}

const CATEGORIES_DEPENSES = [
  'Loyer', 'Nourriture', 'Transport', 'Transfert familial',
  'Santé', 'Loisirs', 'Vêtements', 'Éducation', 'Autre'
]

const CATEGORIES_REVENUS = [
  'Salaire', 'Freelance', 'Allocation', 'Remboursement', 'Autre revenu'
]

const MOIS = [
  { valeur: '', label: 'Tous les mois' },
  { valeur: '2026-01', label: 'Janvier 2026' },
  { valeur: '2026-02', label: 'Février 2026' },
  { valeur: '2026-03', label: 'Mars 2026' },
  { valeur: '2026-04', label: 'Avril 2026' },
  { valeur: '2026-05', label: 'Mai 2026' },
  { valeur: '2026-06', label: 'Juin 2026' },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [chargement, setChargement] = useState(true)
  const [afficherFormulaire, setAfficherFormulaire] = useState(false)
  const [filtreMois, setFiltreMois] = useState('')
  const [filtreCategorie, setFiltreCategorie] = useState('toutes')

  const [montant, setMontant] = useState('')
  const [devise, setDevise] = useState('EUR')
  const [type, setType] = useState<'REVENU' | 'DEPENSE'>('DEPENSE')
  const [categorie, setCategorie] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')

  useEffect(() => {
    chargerTransactions()
  }, [filtreMois, filtreCategorie])

  async function chargerTransactions() {
    setChargement(true)
    const params = new URLSearchParams()
    if (filtreMois) params.append('mois', filtreMois)
    if (filtreCategorie !== 'toutes') params.append('categorie', filtreCategorie)

    const res = await fetch(`/api/transactions?${params.toString()}`)
    const data = await res.json()
    setTransactions(data)
    setChargement(false)
  }

  async function ajouterTransaction(e: React.FormEvent) {
    e.preventDefault()
    setErreur('')

    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ montant, devise, type, categorie, note, date }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErreur(data.erreur)
      return
    }

    setSucces('Transaction ajoutée!')
    setMontant('')
    setNote('')
    setCategorie('')
    setAfficherFormulaire(false)
    chargerTransactions()
    setTimeout(() => setSucces(''), 3000)
  }

  async function supprimer(id: string) {
    if (!confirm('Supprimer cette transaction?')) return
    await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' })
    chargerTransactions()
  }

  const totalRevenus = transactions
    .filter(t => t.type === 'REVENU')
    .reduce((acc, t) => acc + t.montant, 0)

  const totalDepenses = transactions
    .filter(t => t.type === 'DEPENSE')
    .reduce((acc, t) => acc + t.montant, 0)

  const categories = type === 'DEPENSE' ? CATEGORIES_DEPENSES : CATEGORIES_REVENUS
  const toutesCategories = [...new Set([...CATEGORIES_DEPENSES, ...CATEGORIES_REVENUS])]

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium">Transactions</h2>
          <p className="text-sm text-gray-400">Gérez vos revenus et dépenses</p>
        </div>
        <button
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          + Nouvelle transaction
        </button>
      </div>

      {succes && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
          {succes}
        </div>
      )}

      {/* Formulaire */}
      {afficherFormulaire && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="text-sm font-medium mb-4">Ajouter une transaction</h3>
          <form onSubmit={ajouterTransaction} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-2">Type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setType('DEPENSE'); setCategorie('') }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    type === 'DEPENSE'
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'border-gray-200 text-gray-500'
                  }`}
                >
                  Dépense
                </button>
                <button
                  type="button"
                  onClick={() => { setType('REVENU'); setCategorie('') }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    type === 'REVENU'
                      ? 'bg-green-50 border-green-200 text-green-600'
                      : 'border-gray-200 text-gray-500'
                  }`}
                >
                  Revenu
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-1">Montant</label>
              <input
                type="number"
                value={montant}
                onChange={e => setMontant(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="0.00"
                step="0.01"
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

            <div>
              <label className="text-sm text-gray-500 block mb-1">Catégorie</label>
              <select
                value={categorie}
                onChange={e => setCategorie(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                required
              >
                <option value="">Choisir...</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-1">Note (optionnel)</label>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Description..."
              />
            </div>

            {erreur && <p className="col-span-2 text-red-500 text-sm">{erreur}</p>}

            <div className="col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Ajouter
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

      {/* Résumé */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Revenus</p>
          <p className="text-lg font-medium text-green-600">+{totalRevenus.toFixed(2)} €</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Dépenses</p>
          <p className="text-lg font-medium text-red-500">-{totalDepenses.toFixed(2)} €</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Solde période</p>
          <p className={`text-lg font-medium ${totalRevenus - totalDepenses >= 0 ? 'text-gray-900' : 'text-red-500'}`}>
            {(totalRevenus - totalDepenses).toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 mb-4">
        <select
          value={filtreMois}
          onChange={e => setFiltreMois(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
        >
          {MOIS.map(m => (
            <option key={m.valeur} value={m.valeur}>{m.label}</option>
          ))}
        </select>
        <select
          value={filtreCategorie}
          onChange={e => setFiltreCategorie(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="toutes">Toutes les catégories</option>
          {toutesCategories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Liste transactions */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Catégorie</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Note</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {chargement ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  Chargement...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  Aucune transaction trouvée
                </td>
              </tr>
            ) : (
              transactions.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(t.date).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      t.type === 'REVENU'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {t.categorie}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {t.note ?? '—'}
                  </td>
                  <td className={`px-6 py-4 text-sm font-medium text-right ${
                    t.type === 'REVENU' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {t.type === 'REVENU' ? '+' : '-'}{t.montant.toFixed(2)} {t.devise}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => supprimer(t.id)}
                      className="text-gray-300 hover:text-red-400 text-sm"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}