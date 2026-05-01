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

  useEffect(() => { chargerTransactions() }, [filtreMois, filtreCategorie])

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
    if (!res.ok) { setErreur(data.erreur); return }
    setSucces('Transaction ajoutée!')
    setMontant(''); setNote(''); setCategorie('')
    setAfficherFormulaire(false)
    chargerTransactions()
    setTimeout(() => setSucces(''), 3000)
  }

  async function supprimer(id: string) {
    if (!confirm('Supprimer cette transaction?')) return
    await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' })
    chargerTransactions()
  }

  const totalRevenus = transactions.filter(t => t.type === 'REVENU').reduce((acc, t) => acc + t.montant, 0)
  const totalDepenses = transactions.filter(t => t.type === 'DEPENSE').reduce((acc, t) => acc + t.montant, 0)
  const categories = type === 'DEPENSE' ? CATEGORIES_DEPENSES : CATEGORIES_REVENUS
  const toutesCategories = [...new Set([...CATEGORIES_DEPENSES, ...CATEGORIES_REVENUS])]

  const selectStyle = {
    border: '1.5px solid #ddd6fe',
    borderRadius: '10px',
    padding: '0.5rem 0.875rem',
    fontSize: '13px',
    outline: 'none',
    background: 'white',
    color: '#374151',
    cursor: 'pointer',
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f1235', margin: 0 }}>
            Transactions 💸
          </h2>
          <p style={{ color: '#7c3aed', fontSize: '14px', marginTop: '4px' }}>
            Gérez vos revenus et dépenses
          </p>
        </div>
        <button
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
          className="btn-primary"
        >
          + Nouvelle transaction
        </button>
      </div>

      {succes && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: '10px', padding: '12px 16px',
          fontSize: '13px', color: '#16a34a', marginBottom: '16px'
        }}>
          ✓ {succes}
        </div>
      )}

      {/* Formulaire */}
      {afficherFormulaire && (
        <div style={{
          background: 'white', borderRadius: '16px',
          border: '1px solid #ede9fe', padding: '1.5rem',
          marginBottom: '24px', boxShadow: '0 4px 16px rgba(124,58,237,0.08)'
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
            Ajouter une transaction
          </h3>
          <form onSubmit={ajouterTransaction}>
            {/* Type */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button type="button" onClick={() => { setType('DEPENSE'); setCategorie('') }}
                style={{
                  flex: 1, padding: '10px', borderRadius: '10px', fontSize: '13px',
                  fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s',
                  background: type === 'DEPENSE' ? '#fef2f2' : 'white',
                  border: type === 'DEPENSE' ? '2px solid #fca5a5' : '1.5px solid #e5e7eb',
                  color: type === 'DEPENSE' ? '#dc2626' : '#6b7280',
                }}>
                📉 Dépense
              </button>
              <button type="button" onClick={() => { setType('REVENU'); setCategorie('') }}
                style={{
                  flex: 1, padding: '10px', borderRadius: '10px', fontSize: '13px',
                  fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s',
                  background: type === 'REVENU' ? '#f0fdf4' : 'white',
                  border: type === 'REVENU' ? '2px solid #86efac' : '1.5px solid #e5e7eb',
                  color: type === 'REVENU' ? '#16a34a' : '#6b7280',
                }}>
                📈 Revenu
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Montant</label>
                <input type="number" value={montant} onChange={e => setMontant(e.target.value)}
                  className="input" placeholder="0.00" step="0.01" required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Devise</label>
                <select value={devise} onChange={e => setDevise(e.target.value)} className="input">
                  <option value="EUR">EUR — Euro</option>
                  <option value="XOF">XOF — Franc CFA</option>
                  <option value="USD">USD — Dollar</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Catégorie</label>
                <select value={categorie} onChange={e => setCategorie(e.target.value)} className="input" required>
                  <option value="">Choisir...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Note (optionnel)</label>
                <input type="text" value={note} onChange={e => setNote(e.target.value)}
                  className="input" placeholder="Description..." />
              </div>
            </div>

            {erreur && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{erreur}</p>}

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary">Ajouter</button>
              <button type="button" className="btn-secondary" onClick={() => setAfficherFormulaire(false)}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      {/* Résumé */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Revenus', valeur: `+${totalRevenus.toFixed(2)} €`, color: '#16a34a', icon: '📈' },
          { label: 'Dépenses', valeur: `-${totalDepenses.toFixed(2)} €`, color: '#dc2626', icon: '📉' },
          { label: 'Solde période', valeur: `${(totalRevenus - totalDepenses).toFixed(2)} €`, color: totalRevenus - totalDepenses >= 0 ? '#7c3aed' : '#dc2626', icon: '💳' },
        ].map((c, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '14px',
            border: '1px solid #ede9fe', padding: '1.25rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>{c.label}</p>
                <p style={{ fontSize: '18px', fontWeight: '700', color: c.color, margin: 0 }}>{c.valeur}</p>
              </div>
              <span style={{ fontSize: '24px' }}>{c.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <select value={filtreMois} onChange={e => setFiltreMois(e.target.value)} style={selectStyle}>
          {MOIS.map(m => <option key={m.valeur} value={m.valeur}>{m.label}</option>)}
        </select>
        <select value={filtreCategorie} onChange={e => setFiltreCategorie(e.target.value)} style={selectStyle}>
          <option value="toutes">Toutes les catégories</option>
          {toutesCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{
        background: 'white', borderRadius: '16px',
        border: '1px solid #ede9fe', overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f3ff', borderBottom: '1px solid #ede9fe' }}>
              {['Date', 'Catégorie', 'Note', 'Montant', ''].map((h, i) => (
                <th key={i} style={{
                  padding: '12px 20px', textAlign: i === 3 ? 'right' : 'left',
                  fontSize: '11px', fontWeight: '600', color: '#7c3aed',
                  textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chargement ? (
              <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>Chargement...</td></tr>
            ) : transactions.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>Aucune transaction trouvée</td></tr>
            ) : transactions.map((t, i) => (
              <tr key={t.id} style={{
                borderBottom: i < transactions.length - 1 ? '1px solid #f5f3ff' : 'none',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#faf9ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'white')}
              >
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b7280' }}>
                  {new Date(t.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span className={t.type === 'REVENU' ? 'badge-success' : 'badge-violet'}>
                    {t.categorie}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#9ca3af' }}>{t.note ?? '—'}</td>
                <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: '600', textAlign: 'right', color: t.type === 'REVENU' ? '#16a34a' : '#dc2626' }}>
                  {t.type === 'REVENU' ? '+' : '-'}{t.montant.toFixed(2)} {t.devise}
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button onClick={() => supprimer(t.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', fontSize: '16px', padding: '4px' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#dc2626')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#d1d5db')}
                  >✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}