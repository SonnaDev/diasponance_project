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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>💰</span>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#1f1235' }}>DiasporaFinance</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
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
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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
            fontSize: '48px', fontWeight: '800',
            color: 'white', lineHeight: '1.2',
            margin: '0 0 20px',
          }}>
            Gérez vos finances<br />
            <span style={{ color: '#c4b5fd' }}>depuis n'importe où</span>
          </h1>
          <p style={{
            fontSize: '18px', color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.6', marginBottom: '32px',
          }}>
            Suivez vos dépenses, envoyez de l'argent à la famille,
            et atteignez vos objectifs d'épargne. Tout en français, tout simplement.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/inscription" style={{
              padding: '14px 32px', borderRadius: '12px',
              background: 'white', color: '#7c3aed',
              fontSize: '15px', fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            }}>
              Créer un compte gratuit →
            </Link>
            <Link href="/connexion" style={{
              padding: '14px 32px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white', fontSize: '15px', fontWeight: '500',
              textDecoration: 'none', backdropFilter: 'blur(10px)',
            }}>
              Voir la démo
            </Link>
          </div>
        </div>
      </section>

      {/* Problème */}
      <section style={{ padding: '4rem 2rem', background: '#faf9ff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f1235', marginBottom: '16px' }}>
            La réalité des Africains à l'étranger 🌍
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' }}>
            Vous vivez à l'étranger, vous gagnez de l'argent et vous avez du mal à traquer vos dépenses, ceci est un problème majeur que rencontrent beaucoup d'expatriés. Entre loyers et aides aux familles il faut essayer
            d'épargner pour le futur. <strong style={{ color: '#7c3aed' }}>DiasporaFinance comprend votre réalité.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { emoji: '💸', titre: 'Deux économies', desc: 'Gérez vos finances en EUR et suivez vos envois en XOF dans la même app' },
              { emoji: '👨‍👩‍👧‍👦', titre: 'Famille d\'abord', desc: 'Historique complet de tous vos transferts familiaux avec Wave, Orange Money...' },
              { emoji: '🎯', titre: 'Vos rêves', desc: 'Épargnez pour le billet retour, les urgences famille, ou votre projet' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '16px',
                border: '1px solid #ede9fe', padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{item.emoji}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f1235', marginBottom: '8px' }}>{item.titre}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f1235', textAlign: 'center', marginBottom: '2.5rem' }}>
            Tout ce dont vous avez besoin ✨
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { emoji: '📊', titre: 'Tableau de bord', desc: 'Vue complète de vos finances avec graphiques interactifs' },
              { emoji: '💱', titre: 'Taux en direct', desc: 'Conversion EUR/XOF/USD en temps réel' },
              { emoji: '✈️', titre: 'Transferts familiaux', desc: 'Historique Wave, Orange Money, Western Union...' },
              { emoji: '🎯', titre: 'Objectifs d\'épargne', desc: 'Billet retour, urgence famille, projets personnels' },
              { emoji: '🔔', titre: 'Alertes intelligentes', desc: 'Notifications quand votre budget est dépassé' },
              { emoji: '🔒', titre: 'Sécurisé', desc: 'Vos données sont chiffrées et protégées' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                background: '#faf9ff', borderRadius: '14px',
                border: '1px solid #ede9fe', padding: '1.25rem',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', flexShrink: 0,
                }}>{f.emoji}</div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f1235', margin: '0 0 4px' }}>{f.titre}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Devises supportées */}
      <section style={{ padding: '3rem 2rem', background: '#f5f3ff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f1235', marginBottom: '1.5rem' }}>
          Devises supportées 💱
        </h2>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { code: 'EUR', pays: '🇪🇺 Euro' },
            { code: 'XOF', pays: '🇸🇳 Franc CFA' },
            { code: 'USD', pays: '🇺🇸 Dollar' },
            { code: 'GBP', pays: '🇬🇧 Livre' },
            { code: 'GNF', pays: '🇬🇳 Franc guinéen' },
            { code: 'MAD', pays: '🇲🇦 Dirham' },
          ].map((d, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '10px',
              border: '1px solid #ddd6fe', padding: '10px 20px',
              fontSize: '14px', color: '#1f1235', fontWeight: '500',
            }}>
              {d.pays}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>
          Prêt à prendre le contrôle de vos finances?
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          Rejoignez des milliers d'Africains qui suivent chaque mouvement de leurs finances avec DiasporaFinance
        </p>
        <Link href="/inscription" style={{
          padding: '16px 40px', borderRadius: '14px',
          background: 'white', color: '#7c3aed',
          fontSize: '16px', fontWeight: '700',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'inline-block',
        }}>
          Créer un compte gratuit →
        </Link>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '16px' }}>
          Gratuit · Pas de carte bancaire requise · En français
        </p>
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