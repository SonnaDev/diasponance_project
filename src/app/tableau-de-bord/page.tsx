'use client'

import RapportPDF from '@/app/components/RapportPDF'
import ConvertisseurDevises from '@/app/components/ConvertisseurDevises'
import Notifications from '@/app/components/Notifications'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts'

type Stats = {
  totalRevenus: number
  totalDepenses: number
  totalTransferts: number
  solde: number
  depensesParCategorie: { categorie: string; total: number }[]
  evolutionMensuelle: { mois: string; revenus: number; depenses: number }[]
}

const COULEURS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#6d28d9', '#4c1d95']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white',
        border: '1px solid #ede9fe',
        borderRadius: '10px',
        padding: '10px 14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: '13px', color: p.color, fontWeight: '500', margin: 0 }}>
            {p.name}: {p.value.toFixed(2)} €
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function TableauDeBord() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Stats | null>(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setChargement(false)
      })
  }, [])

  const prenom = session?.user?.name?.split(' ')[0] ?? 'là'

  const cartes = [
    {
      label: 'Solde actuel',
      valeur: stats ? `${stats.solde.toFixed(2)} €` : '...',
      icon: '💳',
      bg: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
      color: 'white',
      subColor: 'rgba(255,255,255,0.7)',
    },
    {
      label: 'Revenus',
      valeur: stats ? `+${stats.totalRevenus.toFixed(2)} €` : '...',
      icon: '📈',
      bg: 'white',
      color: '#16a34a',
      subColor: '#6b7280',
      border: '1px solid #ede9fe',
    },
    {
      label: 'Dépenses',
      valeur: stats ? `-${stats.totalDepenses.toFixed(2)} €` : '...',
      icon: '📉',
      bg: 'white',
      color: '#dc2626',
      subColor: '#6b7280',
      border: '1px solid #ede9fe',
    },
    {
      label: 'Transferts famille',
      valeur: stats ? `${stats.totalTransferts.toFixed(2)} €` : '...',
      icon: '✈️',
      bg: 'white',
      color: '#7c3aed',
      subColor: '#6b7280',
      border: '1px solid #ede9fe',
    },
  ]

  return (
    <main style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f1235', margin: 0 }}>
            Bonjour, {prenom} 👋
          </h2>
          <p style={{ color: '#7c3aed', fontSize: '14px', marginTop: '4px' }}>
            Voici un résumé de vos finances
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <RapportPDF />
          <Notifications />
        </div>
      </div>

      {/* Cartes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {cartes.map((c, i) => (
          <div key={i} style={{
            background: c.bg,
            border: c.border,
            borderRadius: '16px',
            padding: '1.25rem',
            boxShadow: i === 0 ? '0 8px 24px rgba(124, 58, 237, 0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '12px', color: i === 0 ? 'rgba(255,255,255,0.7)' : '#9ca3af', margin: '0 0 8px' }}>
                  {c.label}
                </p>
                <p style={{ fontSize: '20px', fontWeight: '700', color: c.color, margin: 0 }}>
                  {chargement ? '...' : c.valeur}
                </p>
              </div>
              <span style={{ fontSize: '24px' }}>{c.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {/* Area chart */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #ede9fe',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
            Revenus vs Dépenses
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats?.evolutionMensuelle}>
              <defs>
                <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDepenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f0ff" />
              <XAxis dataKey="mois" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenus" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorRevenus)" name="Revenus" />
              <Area type="monotone" dataKey="depenses" stroke="#dc2626" strokeWidth={2} fill="url(#colorDepenses)" name="Dépenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #ede9fe',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
            Dépenses par catégorie
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={stats?.depensesParCategorie}
                dataKey="total"
                nameKey="categorie"
                cx="50%"
                cy="50%"
                outerRadius={75}
                innerRadius={40}
              >
                {stats?.depensesParCategorie.map((_, index) => (
                  <Cell key={index} fill={COULEURS[index % COULEURS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toFixed(2)} €`} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Convertisseur */}
      <div style={{ marginTop: '16px' }}>
        <ConvertisseurDevises />
      </div>
    </main>
  )
}