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

  useEffect(() => { chargerObjectifs() }, [])

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
    if (!res.ok) { setErreur(data.erreur); return }
    setSucces('Objectif créé!')
    setNom(''); setMontantCible(''); setDateLimit('')
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
    if (res.ok) { setContribution(null); chargerObjectifs() }
  }

  async function supprimer(id: string) {
    if (!confirm('Supprimer cet objectif?')) return
    await fetch(`/api/objectifs/${id}`, { method: 'DELETE' })
    chargerObjectifs()
  }

  const pct = (actuel: number, cible: number) => Math.min(Math.round((actuel / cible) * 100), 100)
  const joursRestants = (dl: string | null) => {
    if (!dl) return null
    return Math.ceil((new Date(dl).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  }

  const atteints = objectifs.filter(o => o.atteint).length
  const enCours = objectifs.filter(o => !o.atteint).length

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f1235', margin: 0 }}>
            Objectifs d'épargne 🎯
          </h2>
          <p style={{ color: '#7c3aed', fontSize: '14px', marginTop: '4px' }}>
            {atteints} atteint{atteints > 1 ? 's' : ''} · {enCours} en cours
          </p>
        </div>
        <button onClick={() => setAfficherFormulaire(!afficherFormulaire)} className="btn-primary">
          + Nouvel objectif
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
            Créer un nouvel objectif
          </h3>
          <form onSubmit={creerObjectif}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Nom de l'objectif</label>
                <input type="text" value={nom} onChange={e => setNom(e.target.value)}
                  className="input" placeholder="Ex: Billet retour Dakar, Urgence famille..." required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Montant cible</label>
                <input type="number" value={montantCible} onChange={e => setMontantCible(e.target.value)}
                  className="input" placeholder="500" required />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Devise</label>
                <select value={devise} onChange={e => setDevise(e.target.value)} className="input">
                  <option value="EUR">EUR — Euro</option>
                  <option value="XOF">XOF — Franc CFA</option>
                  <option value="USD">USD — Dollar</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Date limite (optionnel)</label>
                <input type="date" value={dateLimit} onChange={e => setDateLimit(e.target.value)} className="input" />
              </div>
            </div>
            {erreur && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{erreur}</p>}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-primary">Créer l'objectif</button>
              <button type="button" className="btn-secondary" onClick={() => setAfficherFormulaire(false)}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      {/* Liste */}
      {chargement ? (
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>Chargement...</p>
      ) : objectifs.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: '16px', border: '1px solid #ede9fe',
          padding: '4rem', textAlign: 'center'
        }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>🎯</p>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Aucun objectif pour l'instant</p>
          <p style={{ color: '#c4b5fd', fontSize: '13px' }}>Créez votre premier objectif d'épargne</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {objectifs.map(o => {
            const p = pct(o.montantActuel, o.montantCible)
            const jours = joursRestants(o.dateLimit)
            return (
              <div key={o.id} style={{
                background: 'white', borderRadius: '16px',
                border: o.atteint ? '1px solid #bbf7d0' : '1px solid #ede9fe',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                // background: o.atteint ? '#f0fdf4' : 'white',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f1235', margin: 0 }}>{o.nom}</h3>
                      {o.atteint && (
                        <span className="badge-success">✓ Atteint!</span>
                      )}
                    </div>
                    {jours !== null && (
                      <p style={{
                        fontSize: '12px', marginTop: '4px',
                        color: jours < 0 ? '#dc2626' : jours < 30 ? '#ea580c' : '#9ca3af'
                      }}>
                        {jours < 0 ? `⚠️ Expiré il y a ${Math.abs(jours)} jours` : `⏰ ${jours} jours restants`}
                      </p>
                    )}
                  </div>
                  <button onClick={() => supprimer(o.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', fontSize: '18px' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#dc2626')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#d1d5db')}
                  >✕</button>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: o.atteint ? '#16a34a' : '#7c3aed' }}>
                      {o.montantActuel.toFixed(2)} {o.devise}
                    </span>
                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                      sur {o.montantCible.toFixed(2)} {o.devise}
                    </span>
                  </div>
                  <div style={{ background: '#f3f0ff', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                      height: '8px', borderRadius: '99px',
                      width: `${p}%`,
                      background: o.atteint
                        ? 'linear-gradient(90deg, #16a34a, #22c55e)'
                        : 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>{p}% atteint</p>
                </div>

                {/* Contribution */}
                {!o.atteint && (
                  contribution?.id === o.id ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="number"
                        value={contribution.montant}
                        onChange={e => setContribution({ id: o.id, montant: e.target.value })}
                        className="input" placeholder="Montant"
                        style={{ maxWidth: '140px' }}
                      />
                      <button onClick={() => contribuer(o.id, contribution.montant)} className="btn-primary">
                        Confirmer
                      </button>
                      <button onClick={() => setContribution(null)} className="btn-secondary">
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setContribution({ id: o.id, montant: '' })}
                      className="btn-secondary"
                    >
                      + Ajouter une contribution
                    </button>
                  )
                )}
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}