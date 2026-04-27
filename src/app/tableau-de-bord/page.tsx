'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

type Stats = {
  totalRevenus: number
  totalDepenses: number
  totalTransferts: number
  solde: number
  depensesParCategorie: { categorie: string; total: number }[]
  evolutionMensuelle: { mois: string; revenus: number; depenses: number }[]
}

const COULEURS = ['#111827', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB']

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

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-lg font-medium">
          Bonjour, {session?.user?.name?.split(' ')[0] ?? 'là'} 👋
        </h2>
        <p className="text-sm text-gray-400">Voici un résumé de vos finances</p>
      </div>

      {/* Cartes résumé */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-400 mb-1">Solde actuel</p>
          <p className="text-xl font-medium">
            {chargement ? '...' : `${stats?.solde.toFixed(2)} €`}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-400 mb-1">Revenus</p>
          <p className="text-xl font-medium text-green-600">
            {chargement ? '...' : `+${stats?.totalRevenus.toFixed(2)} €`}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-400 mb-1">Dépenses</p>
          <p className="text-xl font-medium text-red-500">
            {chargement ? '...' : `-${stats?.totalDepenses.toFixed(2)} €`}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-400 mb-1">Transferts famille</p>
          <p className="text-xl font-medium text-blue-600">
            {chargement ? '...' : `${stats?.totalTransferts.toFixed(2)} €`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Graphique évolution */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Revenus vs Dépenses
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stats?.evolutionMensuelle}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mois" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="revenus" stroke="#16a34a" strokeWidth={2} dot={false} name="Revenus" />
              <Line type="monotone" dataKey="depenses" stroke="#ef4444" strokeWidth={2} dot={false} name="Dépenses" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique dépenses par catégorie */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Dépenses par catégorie
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={stats?.depensesParCategorie}
                dataKey="total"
                nameKey="categorie"
                cx="50%"
                cy="50%"
                outerRadius={70}
              >
                {stats?.depensesParCategorie.map((_, index) => (
                  <Cell key={index} fill={COULEURS[index % COULEURS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toFixed(2)} €`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  )
}