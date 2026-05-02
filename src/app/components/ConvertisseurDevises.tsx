'use client'

import { useEffect, useState } from 'react'

type Taux = {
  XOF: number
  USD: number
  EUR: number
  GBP: number
  GNF: number
  MAD: number
}

export default function ConvertisseurDevises() {
  const [montant, setMontant] = useState('100')
  const [deviseSrc, setDeviseSrc] = useState('EUR')
  const [deviseDest, setDeviseDest] = useState('XOF')
  const [taux, setTaux] = useState<Taux | null>(null)
  const [date, setDate] = useState('')
  const [source, setSource] = useState('')
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    chargerTaux()
  }, [deviseSrc])

  async function chargerTaux() {
    setChargement(true)
    try {
      const res = await fetch(`/api/devises?base=${deviseSrc}`)
      const data = await res.json()
      setTaux(data.taux)
      setDate(data.date)
      setSource(data.source)
    } catch {
      console.error('Erreur chargement taux')
    } finally {
      setChargement(false)
    }
  }

  const resultat = taux && montant
    ? (parseFloat(montant) * (taux[deviseDest as keyof Taux] ?? 1)).toFixed(2)
    : '...'

  const devises = ['EUR', 'USD', 'XOF', 'GBP', 'GNF', 'MAD']

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: '1px solid #ede9fe',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f1235', margin: 0 }}>
          💱 Convertisseur de devises
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: source === 'live' ? '#16a34a' : '#ea580c',
          }} />
          <span style={{ fontSize: '11px', color: '#9ca3af' }}>
            {source === 'live' ? 'Taux en direct' : 'Taux approximatif'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '10px', alignItems: 'end', marginBottom: '16px' }}>
        {/* Montant source */}
        <div>
          <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            Montant
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              type="number"
              value={montant}
              onChange={e => setMontant(e.target.value)}
              className="input"
              style={{ flex: 1 }}
              placeholder="100"
            />
            <select
              value={deviseSrc}
              onChange={e => setDeviseSrc(e.target.value)}
              className="input"
              style={{ width: '80px' }}
            >
              {devises.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Flèche */}
        <div style={{
          fontSize: '20px', textAlign: 'center', paddingBottom: '8px',
          cursor: 'pointer', color: '#7c3aed'
        }}
          onClick={() => {
            const tmp = deviseSrc
            setDeviseSrc(deviseDest)
            setDeviseDest(tmp)
          }}
        >⇄</div>

        {/* Résultat */}
        <div>
          <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
            Résultat
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{
              flex: 1, border: '1.5px solid #ddd6fe', borderRadius: '10px',
              padding: '0.625rem 0.875rem', fontSize: '14px', fontWeight: '600',
              color: '#7c3aed', background: '#f5f3ff',
            }}>
              {chargement ? '...' : resultat}
            </div>
            <select
              value={deviseDest}
              onChange={e => setDeviseDest(e.target.value)}
              className="input"
              style={{ width: '80px' }}
            >
              {devises.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Taux populaires */}
      {taux && (
        <div style={{
          background: '#f5f3ff', borderRadius: '10px', padding: '12px',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px'
        }}>
          {[
            { devise: 'XOF', label: 'Franc CFA' },
            { devise: 'USD', label: 'Dollar' },
            { devise: 'GBP', label: 'Livre' },
          ].map(({ devise, label }) => (
            <div key={devise} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 2px' }}>{label}</p>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#7c3aed', margin: 0 }}>
                {(taux[devise as keyof Taux] ?? 0).toFixed(devise === 'XOF' ? 0 : 3)}
              </p>
            </div>
          ))}
        </div>
      )}

      {date && (
        <p style={{ fontSize: '11px', color: '#c4b5fd', textAlign: 'right', marginTop: '8px', marginBottom: 0 }}>
          Mis à jour: {date}
        </p>
      )}
    </div>
  )
}