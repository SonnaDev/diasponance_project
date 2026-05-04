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
      if (!res.ok) { setErreur(data.erreur); return }
      router.push('/connexion?inscrit=true')
    } catch {
      setErreur('Une erreur est survenue. Réessayez.')
    } finally {
      setChargement(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}>
      {/* Côté gauche — illustration */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem', position: 'relative', overflow: 'hidden',
      }}>
        {/* Emojis flottants */}
        <div className="float" style={{ position: 'absolute', top: '10%', left: '10%', fontSize: '48px', opacity: 0.3 }}>💶</div>
        <div className="float2" style={{ position: 'absolute', top: '20%', right: '10%', fontSize: '40px', opacity: 0.3 }}>🏠</div>
        <div className="float3" style={{ position: 'absolute', bottom: '20%', left: '10%', fontSize: '44px', opacity: 0.3 }}>✈️</div>
        <div className="float" style={{ position: 'absolute', bottom: '10%', right: '10%', fontSize: '42px', opacity: 0.3 }}>🎯</div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>💰</div>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>
            DiasporaFinance
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.6', marginBottom: '2rem' }}>
            L'application financière pensée pour les Africains à l'étranger
          </p>

          {/* Features list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            {[
              { emoji: '💱', text: 'Conversion EUR/XOF en temps réel' },
              { emoji: '✈️', text: 'Suivi des transferts familiaux' },
              { emoji: '🎯', text: 'Objectifs d\'épargne personnalisés' },
              { emoji: '📊', text: 'Tableau de bord complet' },
              { emoji: '🔔', text: 'Alertes budget intelligentes' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px', padding: '10px 14px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <span style={{ fontSize: '20px' }}>{f.emoji}</span>
                <span style={{ color: 'white', fontSize: '14px' }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Côté droit — formulaire */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '3rem', background: '#faf9ff',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: '#7c3aed', fontSize: '13px', textDecoration: 'none',
            marginBottom: '2rem', fontWeight: '500',
          }}>
            ← Retour à l'accueil
          </Link>

          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1f1235', marginBottom: '6px' }}>
            Créer un compte
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '2rem' }}>
            Gratuit · Pas de carte requise · En français
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                Nom complet
              </label>
              <input
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                className="input"
                placeholder="Mamadou Diallo"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
                placeholder="vous@exemple.com"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={motDePasse}
                onChange={e => setMotDePasse(e.target.value)}
                className="input"
                placeholder="min. 6 caractères"
                required
              />
            </div>

            {erreur && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: '8px', padding: '10px 12px',
                fontSize: '13px', color: '#dc2626',
              }}>
                {erreur}
              </div>
            )}

            <button
              type="submit"
              disabled={chargement}
              className="btn-primary"
              style={{ width: '100%', padding: '0.875rem', fontSize: '15px' }}
            >
              {chargement ? 'Création...' : 'Créer mon compte gratuit →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', marginTop: '1.5rem' }}>
            Déjà un compte?{' '}
            <Link href="/connexion" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'none' }}>
              Se connecter
            </Link>
          </p>

          <div style={{
            marginTop: '2rem', padding: '14px',
            background: '#f5f3ff', borderRadius: '12px',
            border: '1px solid #ddd6fe', textAlign: 'center',
          }}>
            <p style={{ fontSize: '12px', color: '#7c3aed', margin: 0, lineHeight: '1.5' }}>
              🔒 Vos données sont sécurisées et chiffrées.<br />
              Nous ne partageons jamais vos informations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}