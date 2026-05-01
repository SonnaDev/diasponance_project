'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type Profil = {
  nom: string
  email: string
  deviseLocale: string
  deviseFamille: string
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
  const [succesProfil, setSuccesProfil] = useState('')
  const [erreurProfil, setErreurProfil] = useState('')
  const [succesPass, setSuccesPass] = useState('')
  const [erreurPass, setErreurPass] = useState('')

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
    setErreurProfil(''); setSuccesProfil('')
    const res = await fetch('/api/utilisateur', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, deviseLocale, deviseFamille }),
    })
    const data = await res.json()
    if (!res.ok) { setErreurProfil(data.erreur) }
    else { setSuccesProfil('Profil mis à jour!'); await update({ name: nom }); setTimeout(() => setSuccesProfil(''), 3000) }
  }

  async function changerMotDePasse(e: React.FormEvent) {
    e.preventDefault()
    setErreurPass(''); setSuccesPass('')
    if (nouveauMotDePasse !== confirmerMotDePasse) { setErreurPass('Les mots de passe ne correspondent pas'); return }
    const res = await fetch('/api/utilisateur', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ motDePasseActuel, nouveauMotDePasse }),
    })
    const data = await res.json()
    if (!res.ok) { setErreurPass(data.erreur) }
    else {
      setSuccesPass('Mot de passe changé!')
      setMotDePasseActuel(''); setNouveauMotDePasse(''); setConfirmerMotDePasse('')
      setTimeout(() => setSuccesPass(''), 3000)
    }
  }

  const cardStyle = {
    background: 'white', borderRadius: '16px',
    border: '1px solid #ede9fe', padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '20px'
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f1235', margin: 0 }}>
          Paramètres ⚙️
        </h2>
        <p style={{ color: '#7c3aed', fontSize: '14px', marginTop: '4px' }}>
          Gérez votre profil et préférences
        </p>
      </div>

      {/* Profil */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
          👤 Informations personnelles
        </h3>
        <form onSubmit={mettreAJourProfil} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Email</label>
            <input type="email" value={profil?.email ?? ''} disabled
              style={{ width: '100%', border: '1.5px solid #f3f0ff', borderRadius: '10px', padding: '0.625rem 0.875rem', fontSize: '14px', background: '#f9fafb', color: '#9ca3af', cursor: 'not-allowed' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Nom complet</label>
            <input type="text" value={nom} onChange={e => setNom(e.target.value)} className="input" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Devise locale</label>
              <select value={deviseLocale} onChange={e => setDeviseLocale(e.target.value)} className="input">
                <option value="EUR">EUR — Euro</option>
                <option value="USD">USD — Dollar</option>
                <option value="GBP">GBP — Livre</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Devise familiale</label>
              <select value={deviseFamille} onChange={e => setDeviseFamille(e.target.value)} className="input">
                <option value="XOF">XOF — Franc CFA</option>
                <option value="GNF">GNF — Franc guinéen</option>
                <option value="MAD">MAD — Dirham</option>
                <option value="XAF">XAF — Franc CFA central</option>
                <option value="NGN">NGN — Naira</option>
              </select>
            </div>
          </div>
          {erreurProfil && <p style={{ color: '#dc2626', fontSize: '13px' }}>{erreurProfil}</p>}
          {succesProfil && <p style={{ color: '#16a34a', fontSize: '13px' }}>✓ {succesProfil}</p>}
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            Enregistrer les modifications
          </button>
        </form>
      </div>

      {/* Mot de passe */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
          🔐 Changer le mot de passe
        </h3>
        <form onSubmit={changerMotDePasse} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            { label: 'Mot de passe actuel', value: motDePasseActuel, setter: setMotDePasseActuel, placeholder: '••••••••' },
            { label: 'Nouveau mot de passe', value: nouveauMotDePasse, setter: setNouveauMotDePasse, placeholder: 'min. 6 caractères' },
            { label: 'Confirmer le nouveau mot de passe', value: confirmerMotDePasse, setter: setConfirmerMotDePasse, placeholder: '••••••••' },
          ].map((f, i) => (
            <div key={i}>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>{f.label}</label>
              <input type="password" value={f.value} onChange={e => f.setter(e.target.value)}
                className="input" placeholder={f.placeholder} required />
            </div>
          ))}
          {erreurPass && <p style={{ color: '#dc2626', fontSize: '13px' }}>{erreurPass}</p>}
          {succesPass && <p style={{ color: '#16a34a', fontSize: '13px' }}>✓ {succesPass}</p>}
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            Changer le mot de passe
          </button>
        </form>
      </div>
    </main>
  )
}