'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function ConnexionPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setChargement(true)
    setErreur('')

    try {
      const result = await signIn('credentials', {
        email,
        motDePasse,
        redirect: false,
        callbackUrl: '/tableau-de-bord',
      })

      if (result?.error) {
        setErreur('Email ou mot de passe incorrect')
      } else if (result?.url) {
        router.push('/tableau-de-bord')
      }
    } catch {
      setErreur('Une erreur est survenue. Réessayez.')
    } finally {
      setChargement(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', margin: '0 auto 12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>💰</div>
          <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', margin: 0 }}>
            DiasporaFinance
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>
            Gérez vos finances depuis l'étranger
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f1235', marginBottom: '4px' }}>
            Connexion
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '1.5rem' }}>
            Bienvenue! Entrez vos identifiants.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                placeholder="••••••••"
                required
              />
            </div>

            {erreur && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '13px',
                color: '#dc2626',
              }}>
                {erreur}
              </div>
            )}

            <button
              type="submit"
              disabled={chargement}
              className="btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              {chargement ? 'Connexion...' : 'Se connecter →'}
            </button>
          </form>

          {/* Compte démo */}
          <div style={{
            marginTop: '16px',
            background: '#f5f3ff',
            borderRadius: '10px',
            padding: '10px 14px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '12px', color: '#7c3aed', margin: 0 }}>
              Compte démo: <strong>demo@diasporafinance.com</strong> / <strong>demo123</strong>
            </p>
          </div>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', marginTop: '16px' }}>
            Pas encore de compte?{' '}
            <Link href="/inscription" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'none' }}>
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}