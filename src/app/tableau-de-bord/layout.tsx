'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const navigation = [
  { label: 'Vue d\'ensemble', href: '/tableau-de-bord', icone: '📊' },
  { label: 'Transactions', href: '/tableau-de-bord/transactions', icone: '💸' },
  { label: 'Transferts', href: '/tableau-de-bord/transferts', icone: '✈️' },
  { label: 'Objectifs', href: '/tableau-de-bord/objectifs', icone: '🎯' },
  { label: 'Paramètres', href: '/tableau-de-bord/parametres', icone: '⚙️' },
]

export default function TableauDeBordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const initiales = session?.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f3ff' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: 'linear-gradient(180deg, #4c1d95 0%, #6d28d9 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        boxShadow: '4px 0 24px rgba(109, 40, 217, 0.15)',
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px'
            }}>💰</div>
            <div>
              <p style={{ color: 'white', fontWeight: '600', fontSize: '15px', margin: 0 }}>DiasporaFinance</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: 0 }}>Gérez vos finances</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navigation.map(item => {
            const actif = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: actif ? '500' : '400',
                  textDecoration: 'none',
                  background: actif ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: actif ? 'white' : 'rgba(255,255,255,0.7)',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icone}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '13px', fontWeight: '600', flexShrink: 0
            }}>
              {initiales}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ color: 'white', fontSize: '13px', fontWeight: '500', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {session?.user?.name ?? 'Utilisateur'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/connexion' })}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '0.5rem',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ marginLeft: '240px', flex: 1, minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  )
}