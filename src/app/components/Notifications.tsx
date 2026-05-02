'use client'

import { useEffect, useState } from 'react'

type Notification = {
  id: string
  type: 'success' | 'warning' | 'info' | 'danger'
  titre: string
  message: string
  lu: boolean
}

type Stats = {
  totalRevenus: number
  totalDepenses: number
  solde: number
}

type Objectif = {
  id: string
  nom: string
  montantCible: number
  montantActuel: number
  atteint: boolean
  dateLimit: string | null
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [ouvert, setOuvert] = useState(false)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    genererNotifications()
  }, [])

  async function genererNotifications() {
    const notifs: Notification[] = []

    try {
      const [statsRes, objectifsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/objectifs'),
      ])

      const stats: Stats = await statsRes.json()
      const objectifs: Objectif[] = await objectifsRes.json()

      // Solde faible
      if (stats.solde < 200 && stats.solde >= 0) {
        notifs.push({
          id: 'solde-faible',
          type: 'warning',
          titre: '⚠️ Solde faible',
          message: `Votre solde est de ${stats.solde.toFixed(2)} €. Pensez à réduire vos dépenses.`,
          lu: false,
        })
      }

      // Solde négatif
      if (stats.solde < 0) {
        notifs.push({
          id: 'solde-negatif',
          type: 'danger',
          titre: '🚨 Solde négatif',
          message: `Votre solde est de ${stats.solde.toFixed(2)} €. Attention!`,
          lu: false,
        })
      }

      // Dépenses élevées
      if (stats.totalDepenses > stats.totalRevenus * 0.8) {
        notifs.push({
          id: 'depenses-elevees',
          type: 'warning',
          titre: '📊 Dépenses élevées',
          message: `Vos dépenses représentent ${Math.round((stats.totalDepenses / stats.totalRevenus) * 100)}% de vos revenus.`,
          lu: false,
        })
      }

      // Transferts élevés
      if (stats.totalTransferts > stats.totalRevenus * 0.3) {
        notifs.push({
          id: 'transferts-eleves',
          type: 'info',
          titre: '✈️ Transferts importants',
          message: `Vous avez envoyé ${stats.totalTransferts.toFixed(2)} € à la famille ce mois.`,
          lu: false,
        })
      }

      // Objectifs
      objectifs.forEach(o => {
        if (o.atteint) {
          notifs.push({
            id: `objectif-atteint-${o.id}`,
            type: 'success',
            titre: '🎉 Objectif atteint!',
            message: `Félicitations! Vous avez atteint votre objectif "${o.nom}".`,
            lu: false,
          })
        }

        if (o.dateLimit) {
          const jours = Math.ceil((new Date(o.dateLimit).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          if (jours > 0 && jours <= 30 && !o.atteint) {
            const pct = Math.round((o.montantActuel / o.montantCible) * 100)
            notifs.push({
              id: `objectif-delai-${o.id}`,
              type: 'warning',
              titre: `⏰ Objectif "${o.nom}"`,
              message: `Il vous reste ${jours} jours pour atteindre cet objectif (${pct}% complété).`,
              lu: false,
            })
          }
        }
      })

      // Message de bienvenue si pas de notifs
      if (notifs.length === 0) {
        notifs.push({
          id: 'bienvenue',
          type: 'success',
          titre: '✅ Tout va bien!',
          message: 'Vos finances sont en bonne santé. Continuez comme ça!',
          lu: false,
        })
      }

    } catch (e) {
      console.error(e)
    }

    setNotifications(notifs)
    setChargement(false)
  }

  const nonLues = notifications.filter(n => !n.lu).length

  const COULEURS = {
    success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a' },
    warning: { bg: '#fffbeb', border: '#fde68a', color: '#d97706' },
    danger: { bg: '#fef2f2', border: '#fecaca', color: '#dc2626' },
    info: { bg: '#f5f3ff', border: '#ddd6fe', color: '#7c3aed' },
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Bouton cloche */}
      <button
        onClick={() => setOuvert(!ouvert)}
        style={{
          background: ouvert ? '#f5f3ff' : 'white',
          border: '1.5px solid #ddd6fe',
          borderRadius: '10px',
          padding: '8px 12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          color: '#7c3aed',
          position: 'relative',
        }}
      >
        🔔
        {nonLues > 0 && (
          <span style={{
            position: 'absolute',
            top: '-6px', right: '-6px',
            background: '#dc2626',
            color: 'white',
            borderRadius: '99px',
            fontSize: '10px',
            fontWeight: '700',
            padding: '1px 5px',
            minWidth: '18px',
            textAlign: 'center',
          }}>{nonLues}</span>
        )}
      </button>

      {/* Panel notifications */}
      {ouvert && (
        <div style={{
          position: 'absolute',
          top: '48px', right: 0,
          width: '340px',
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #ede9fe',
          boxShadow: '0 8px 32px rgba(124,58,237,0.15)',
          zIndex: 100,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid #f5f3ff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1f1235', margin: 0 }}>
              Notifications
            </h4>
            <button
              onClick={() => {
                setNotifications(n => n.map(x => ({ ...x, lu: true })))
              }}
              style={{
                background: 'none', border: 'none',
                fontSize: '12px', color: '#7c3aed',
                cursor: 'pointer', fontWeight: '500'
              }}
            >
              Tout marquer comme lu
            </button>
          </div>

          <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
            {chargement ? (
              <p style={{ padding: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
                Chargement...
              </p>
            ) : notifications.map(n => {
              const c = COULEURS[n.type]
              return (
                <div
                  key={n.id}
                  onClick={() => setNotifications(notifs => notifs.map(x => x.id === n.id ? { ...x, lu: true } : x))}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f9f8ff',
                    cursor: 'pointer',
                    background: n.lu ? 'white' : '#faf9ff',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: c.color, margin: '0 0 3px' }}>
                      {n.titre}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: '1.4' }}>
                      {n.message}
                    </p>
                  </div>
                  {!n.lu && (
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: '#7c3aed', float: 'right', marginTop: '-24px',
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}