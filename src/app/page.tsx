'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/tableau-de-bord')
    }
  }, [status, router])

  if (status === 'loading') return null

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Navigation */}
      <nav style={{
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f5f3ff',
        position: 'sticky', top: 0,
        background: 'white', zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/a-propos" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>À propos</Link>
          <Link href="/blog" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Blog</Link>
          <Link href="/contact" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Contact</Link>
          <Link href="/connexion" style={{
            padding: '8px 20px', borderRadius: '10px',
            border: '1.5px solid #ddd6fe', color: '#7c3aed',
            fontSize: '14px', fontWeight: '500', textDecoration: 'none',
          }}>Se connecter</Link>
          <Link href="/inscription" style={{
            padding: '8px 20px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
            color: 'white', fontSize: '14px', fontWeight: '500',
            textDecoration: 'none',
          }}>Commencer gratuitement</Link>
        </div>
      </nav>


      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #8b5cf6 100%)',
        padding: '4rem 2rem',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Emojis flottants décoratifs */}
        <div className="float" style={{ position: 'absolute', top: '15%', left: '5%', fontSize: '40px', opacity: 0.3 }}>💶</div>
        <div className="float2" style={{ position: 'absolute', top: '20%', right: '8%', fontSize: '36px', opacity: 0.3 }}>🏠</div>
        <div className="float3" style={{ position: 'absolute', bottom: '20%', left: '8%', fontSize: '32px', opacity: 0.3 }}>✈️</div>
        <div className="float" style={{ position: 'absolute', bottom: '15%', right: '5%', fontSize: '38px', opacity: 0.3 }}>🎯</div>
        <div className="float2" style={{ position: 'absolute', top: '50%', left: '2%', fontSize: '28px', opacity: 0.2 }}>📊</div>
        <div className="float3" style={{ position: 'absolute', top: '40%', right: '3%', fontSize: '28px', opacity: 0.2 }}>💱</div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          {/* Texte gauche */}
          <div className="slide-in">
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '99px', padding: '6px 16px',
              fontSize: '13px', color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              🌍 Fait pour les Africains à l'étranger
            </div>
            <h1 style={{
              fontSize: '44px', fontWeight: '800',
              color: 'white', lineHeight: '1.2',
              margin: '0 0 20px',
            }}>
              Gérez vos finances<br />
              <span style={{ color: '#c4b5fd' }}>depuis n'importe où</span>
            </h1>
            <p style={{
              fontSize: '16px', color: 'rgba(255,255,255,0.8)',
              lineHeight: '1.6', marginBottom: '32px',
            }}>
              Suivez vos dépenses en EUR, envoyez de l'argent à la famille en XOF,
              et atteignez vos objectifs d'épargne. Tout en français.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/inscription" style={{
                padding: '14px 28px', borderRadius: '12px',
                background: 'white', color: '#7c3aed',
                fontSize: '15px', fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}>
                Créer un compte gratuit →
              </Link>
              <Link href="/connexion" style={{
                padding: '14px 28px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white', fontSize: '15px', fontWeight: '500',
                textDecoration: 'none',
              }}>
                Voir la démo
              </Link>
            </div>
          </div>

          {/* Mockup Dashboard CSS */}
          <div className="float" style={{ position: 'relative' }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1.25rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              {/* Header mockup */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: 0 }}>Bonjour, Mamadou 👋</p>
                  <p style={{ color: 'white', fontSize: '13px', fontWeight: '600', margin: 0 }}>Voici vos finances</p>
                </div>
                <div style={{ fontSize: '20px' }}>🔔</div>
              </div>

              {/* Cartes stats mockup */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '14px' }}>
                {[
                  { label: 'Solde', valeur: '1 480 €', color: '#fff', bg: 'linear-gradient(135deg, #7c3aed, #a78bfa)', emoji: '💳' },
                  { label: 'Revenus', valeur: '+3 600 €', color: '#86efac', bg: 'rgba(255,255,255,0.1)', emoji: '📈' },
                  { label: 'Dépenses', valeur: '-2 120 €', color: '#fca5a5', bg: 'rgba(255,255,255,0.1)', emoji: '📉' },
                  { label: 'Famille', valeur: '650 €', color: '#c4b5fd', bg: 'rgba(255,255,255,0.1)', emoji: '✈️' },
                ].map((c, i) => (
                  <div key={i} style={{
                    background: c.bg,
                    borderRadius: '12px',
                    padding: '10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', margin: '0 0 4px' }}>{c.label}</p>
                        <p style={{ color: c.color, fontSize: '14px', fontWeight: '700', margin: 0 }}>{c.valeur}</p>
                      </div>
                      <span style={{ fontSize: '16px' }}>{c.emoji}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Graphique mockup */}
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginBottom: '10px' }}>📊 Revenus vs Dépenses</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '50px' }}>
                  {[30, 45, 60, 40, 75, 55, 80, 65, 90, 70, 85, 95].map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ width: '100%', height: `${h * 0.6}%`, background: 'rgba(167,139,250,0.8)', borderRadius: '3px 3px 0 0' }} />
                      <div style={{ width: '100%', height: `${h * 0.4}%`, background: 'rgba(252,165,165,0.6)', borderRadius: '3px 3px 0 0' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Transferts mockup */}
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginBottom: '8px' }}>✈️ Derniers transferts</p>
                {[
                  { nom: 'Maman', service: 'Wave', montant: '200 €', recu: '131 200 XOF' },
                  { nom: 'Papa', service: 'Orange Money', montant: '300 €', recu: '196 800 XOF' },
                ].map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '5px 0',
                    borderBottom: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', color: 'white', fontWeight: '600'
                      }}>
                        {t.nom[0]}
                      </div>
                      <div>
                        <p style={{ color: 'white', fontSize: '11px', fontWeight: '500', margin: 0 }}>{t.nom}</p>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', margin: 0 }}>{t.service}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#c4b5fd', fontSize: '11px', fontWeight: '600', margin: 0 }}>{t.montant}</p>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', margin: 0 }}>{t.recu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge flottant */}
            <div className="float2" style={{
              position: 'absolute', top: '-16px', right: '-16px',
              background: 'white', borderRadius: '12px',
              padding: '8px 12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ fontSize: '16px' }}>🎯</span>
              <div>
                <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0 }}>Objectif atteint!</p>
                <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', margin: 0 }}>Nouveau téléphone ✓</p>
              </div>
            </div>

            {/* Badge taux */}
            <div className="float3" style={{
              position: 'absolute', bottom: '-16px', left: '-16px',
              background: 'white', borderRadius: '12px',
              padding: '8px 12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ fontSize: '16px' }}>💱</span>
              <div>
                <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0 }}>1 EUR =</p>
                <p style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700', margin: 0 }}>655.96 XOF</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer style={{
        padding: '2rem', background: '#1f1235',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '20px' }}>💰</span>
          <span style={{ color: 'white', fontWeight: '600' }}>DiasporaFinance</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
          © 2026 DiasporaFinance · Fait avec ❤️ pour la diaspora africaine
        </p>
      </footer>
    </div>
  )
}