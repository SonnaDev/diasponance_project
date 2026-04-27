'use client'

import { useEffect, useState } from 'react'

type Transfert = {
  id: string
  montant: number
  deviseEnvoi: string
  montantRecu: number | null
  deviseRecu: string
  tauxChange: number | null
  service: string
  beneficiaire: string | null
  note: string | null
  date: string
}

const SERVICES = ['Wave', 'Orange Money', 'Western Union', 'MoneyGram', 'Wizall', 'Autre']

export default function TransfertsPage() {
  const [transferts, setTransferts] = useState<Transfert[]>([])
  const [chargement, setChargement] = useState(true)
  const [afficherFormulaire, setAfficherFormulaire] = useState(false)

  const [montant, setMontant] = useState('')
  const [deviseEnvoi, setDeviseEnvoi] = useState('EUR')
  const [deviseRecu, setDeviseRecu] = useState('XOF')
  const [tauxChange, setTauxChange] = useState('656')
  const [service, setService] = useState('')
  const [beneficiaire, setBeneficiaire] = useState('')
  const [note, setNote] = useState('')
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')

  useEffect(() => {
    chargerTransferts()
  }, [])

  async function chargerTransferts() {
    const res = await fetch('/api/transferts')
    const data = await res.json()
    setTransferts(data)
    setChargement(false)
  }

  const montantRecu = montant && tauxChange
    ? (parseFloat(montant) * parseFloat(tauxChange)).toFixed(0)
    : ''

  async function envoyerTransfert(e: React.FormEvent) {
    e.preventDefault()
    setErreur('')

    const res = await fetch('/api/transferts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        montant,
        deviseEnvoi,
        montantRecu,
        deviseRecu,
        tauxChange,
        service,
        beneficiaire,
        note,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setErreur(data.erreur)
      return
    }

    setSucces('Transfert enregistré!')
    setMontant('')
    setBeneficiaire('')
    setNote('')
    setService('')
    setAfficherFormulaire(false)
    chargerTransferts()
    setTimeout(() => setSucces(''), 3000)
  }

  async function supprimer(id: string) {
    if (!confirm('Supprimer ce transfert?')) return
    await fetch(`/api/transferts?id=${id}`, { method: 'DELETE' })
    chargerTransferts()
  }

  const totalEnvoye = transferts.reduce((acc, t) => acc + t.montant, 0)
  const totalRecu = transferts.reduce((acc, t) => acc + (t.montantRecu ?? 0), 0)

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium">Transferts familiaux</h2>
          <p className="text-sm text-gray-400">Envois d'argent vers la famille</p>
        </div>
        <button
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          + Nouveau transfert
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
          <h3 className="text-sm font-medium mb-4">Enregistrer un transfert</h3>
          <form onSubmit={envoyerTransfert} className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1">Montant envoyé</label>
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
              <label className="text-sm text-gray-500 block mb-1">Devise d'envoi</label>
              <select
                value={deviseEnvoi}
                onChange={e => setDeviseEnvoi(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="EUR">EUR — Euro</option>
                <option value="USD">USD — Dollar</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-1">Devise reçue</label>
              <select
                value={deviseRecu}
                onChange={e => setDeviseRecu(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="XOF">XOF — Franc CFA</option>
                <option value="GNF">GNF — Franc guinéen</option>
                <option value="MAD">MAD — Dirham marocain</option>
                <option value="XAF">XAF — Franc CFA Afrique centrale</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-1">Taux de change</label>
              <input
                type="number"
                value={tauxChange}
                onChange={e => setTauxChange(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="656"
              />
            </div>

            {/* Aperçu montant reçu */}
            {montantRecu && (
              <div className="col-span-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                <p className="text-sm text-blue-700">
                  La famille recevra environ{' '}
                  <span className="font-medium">
                    {parseInt(montantRecu).toLocaleString('fr-FR')} {deviseRecu}
                  </span>
                </p>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-500 block mb-1">Service utilisé</label>
              <select
                value={service}
                onChange={e => setService(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                required
              >
                <option value="">Choisir...</option>
                {SERVICES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-1">Bénéficiaire</label>
              <input
                type="text"
                value={beneficiaire}
                onChange={e => setBeneficiaire(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Maman, Papa..."
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-500 block mb-1">Note (optionnel)</label>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Raison du transfert..."
              />
            </div>

            {erreur && <p className="col-span-2 text-red-500 text-sm">{erreur}</p>}

            <div className="col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Enregistrer le transfert
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
          <p className="text-xs text-gray-400 mb-1">Total envoyé</p>
          <p className="text-lg font-medium text-blue-600">
            {totalEnvoye.toFixed(2)} EUR
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Total reçu famille</p>
          <p className="text-lg font-medium text-gray-900">
            {totalRecu.toLocaleString('fr-FR')} XOF
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Nombre de transferts</p>
          <p className="text-lg font-medium text-gray-900">{transferts.length}</p>
        </div>
      </div>

      {/* Liste transferts */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Bénéficiaire</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Envoyé</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Reçu</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {chargement ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">
                  Chargement...
                </td>
              </tr>
            ) : transferts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">
                  Aucun transfert enregistré
                </td>
              </tr>
            ) : (
              transferts.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(t.date).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {t.beneficiaire ?? '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {t.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    {t.montant.toFixed(2)} {t.deviseEnvoi}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {t.montantRecu
                      ? `${t.montantRecu.toLocaleString('fr-FR')} ${t.deviseRecu}`
                      : '—'}
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