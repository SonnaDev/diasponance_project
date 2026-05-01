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

const SERVICE_COLORS: Record<string, string> = {
  'Wave': '#2563eb',
  'Orange Money': '#ea580c',
  'Western Union': '#ca8a04',
  'MoneyGram': '#7c3aed',
  'Wizall': '#16a34a',
  'Autre': '#6b7280',
}

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

  useEffect(() => { chargerTransferts() }, [])

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
      body: JSON.stringify({ montant, deviseEnvoi, montantRecu, deviseRecu, tauxChange, service, beneficiaire, note }),
    })
    const data = await res.json()
    if (!res.ok) { setErreur(data.erreur); return }
    setSucces('Transfert enregistré!')
    setMontant(''); setBeneficiaire(''); setNote(''); setService('')
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
    <main style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f1235', margin: 0 }}>
            Transferts familiaux ✈️
          </h2>
          <p style={{ color: '#7c3aed', fontSize: '14px', marginTop: '4px' }}>
            Envois d'argent vers la famille
          </p>
        </div>
        <button onClick={() => setAfficherFormulaire(!afficherFormulaire)} className="btn-primary">
          + Nouveau transfert
        </button>
      </div>

      {succes && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0',
          borderRadius: '10px', padding: '12px 16px',
          fontSize: '13px', color: '#16a34a', marginBottom: '16px'
        }}>✓ {succes}</div>
      )}

      {/* Formulaire */}
      {afficherFormulaire && (
        <div style={{
          background: 'white', borderRadius: '16px',
          border: '1px solid #ede9fe', padding: '1.5rem',
          marginBottom: '24px', boxShadow: '0 4px 16px rgba(124,58,237,0.08)'
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
            Enregistrer un transfert
          </h3>
          <form onSubmit={envoyerTransfert}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Montant envoyé</label>
                <input type="number" value={montant} onChange={e => setMontant(e.target.value)}
                  className="input" placeholder="0.00" step="0.01" required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Devise d'envoi</label>
                <select value={deviseEnvoi} onChange={e => setDeviseEnvoi(e.target.value)} className="input">
                  <option value="EUR">EUR — Euro</option>
                  <option value="USD">USD — Dollar</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Devise reçue</label>
                <select value={deviseRecu} onChange={e => setDeviseRecu(e.target.value)} className="input">
                  <option value="XOF">XOF — Franc CFA</option>
                  <option value="GNF">GNF — Franc guinéen</option>
                  <option value="MAD">MAD — Dirham marocain</option>
                  <option value="XAF">XAF — Franc CFA central</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Taux de change</label>
                <input type="number" value={tauxChange} onChange={e => setTauxChange(e.target.value)} className="input" placeholder="656" />
              </div>
            </div>

            {montantRecu && (
              <div style={{
                background: '#f5f3ff', border: '1px solid #ddd6fe',
                borderRadius: '10px', padding: '12px 16px', marginBottom: '12px'
              }}>
                <p style={{ fontSize: '13px', color: '#7c3aed', margin: 0 }}>
                  💰 La famille recevra environ{' '}
                  <strong>{parseInt(montantRecu).toLocaleString('fr-FR')} {deviseRecu}</strong>
                </p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Service utilisé</label>
                <select value={service} onChange={e => setService(e.target.value)} className="input" required>
                  <option value="">Choisir...</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Bénéficiaire</label>
                <input type="text" value={beneficiaire} onChange={e => setBeneficiaire(e.target.value)}
                  className="input" placeholder="Maman, Papa..." />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Note (optionnel)</label>
                <input type="text" value={note} onChange={e => setNote(e.target.value)}
                  className="input" placeholder="Raison du transfert..." />
              </div>
            </div>

            {erreur && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{erreur}</p>}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary">Enregistrer</button>
              <button type="button" className="btn-secondary" onClick={() => setAfficherFormulaire(false)}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      {/* Résumé */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total envoyé', valeur: `${totalEnvoye.toFixed(2)} EUR`, icon: '💸', color: '#7c3aed' },
          { label: 'Total reçu famille', valeur: `${totalRecu.toLocaleString('fr-FR')} XOF`, icon: '🏠', color: '#16a34a' },
          { label: 'Nombre de transferts', valeur: `${transferts.length}`, icon: '📊', color: '#1f1235' },
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
              <span style={{ fontSize: '28px' }}>{c.icon}</span>
            </div>
          </div>
        ))}
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
              {['Date', 'Bénéficiaire', 'Service', 'Envoyé', 'Reçu', ''].map((h, i) => (
                <th key={i} style={{
                  padding: '12px 20px', textAlign: 'left',
                  fontSize: '11px', fontWeight: '600', color: '#7c3aed',
                  textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chargement ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>Chargement...</td></tr>
            ) : transferts.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>Aucun transfert enregistré</td></tr>
            ) : transferts.map((t, i) => (
              <tr key={t.id}
                style={{ borderBottom: i < transferts.length - 1 ? '1px solid #f5f3ff' : 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#faf9ff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'white')}
              >
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b7280' }}>
                  {new Date(t.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: '600', color: '#1f1235' }}>
                  {t.beneficiaire ?? '—'}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    background: `${SERVICE_COLORS[t.service] ?? '#6b7280'}15`,
                    color: SERVICE_COLORS[t.service] ?? '#6b7280',
                    padding: '3px 10px', borderRadius: '99px',
                    fontSize: '12px', fontWeight: '500'
                  }}>{t.service}</span>
                </td>
                <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: '600', color: '#7c3aed' }}>
                  {t.montant.toFixed(2)} {t.deviseEnvoi}
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: '#16a34a', fontWeight: '500' }}>
                  {t.montantRecu ? `${t.montantRecu.toLocaleString('fr-FR')} ${t.deviseRecu}` : '—'}
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button onClick={() => supprimer(t.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', fontSize: '16px' }}
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