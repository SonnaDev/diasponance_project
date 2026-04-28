'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const navigation = [
  { label: 'Vue d\'ensemble', href: '/tableau-de-bord', icone: '▦' },
  { label: 'Transactions', href: '/tableau-de-bord/transactions', icone: '↕' },
  { label: 'Transferts', href: '/tableau-de-bord/transferts', icone: '✈' },
  { label: 'Objectifs', href: '/tableau-de-bord/objectifs', icone: '◎' },
  { label: 'Paramètres', href: '/tableau-de-bord/parametres', icone: '⚙' },
]

export default function TableauDeBordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r flex flex-col fixed h-full">
        <div className="px-5 py-5 border-b">
          <h1 className="font-medium text-base">DiasporaFinance</h1>
          <p className="text-xs text-gray-400 mt-0.5">Gérez vos finances</p>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navigation.map(item => {
            const actif = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  actif
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{item.icone}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-4 py-4 border-t">
          <p className="text-sm font-medium text-gray-700 truncate">
            {session?.user?.name ?? 'Utilisateur'}
          </p>
          <p className="text-xs text-gray-400 truncate mb-3">
            {session?.user?.email}
          </p>
          <button
            onClick={() => signOut({ callbackUrl: '/connexion' })}
            className="w-full text-sm text-gray-500 border rounded-lg px-3 py-1.5 hover:bg-gray-50 text-left"
          >
            Se déconnecter
          </button>
        </div>
      </aside>
      <div className="ml-56 flex-1">{children}</div>
    </div>
  )
}