// @ts-nocheck

'use client'

import { useState } from 'react'

export default function RapportPDF() {
  const [chargement, setChargement] = useState(false)

  async function genererPDF() {
    setChargement(true)

    try {
      const [statsRes, transactionsRes, transfertsRes, objectifsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/transactions'),
        fetch('/api/transferts'),
        fetch('/api/objectifs'),
      ])

      const stats = await statsRes.json()
      const transactions = await transactionsRes.json()
      const transferts = await transfertsRes.json()
      const objectifs = await objectifsRes.json()

      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()

      const violet = [124, 58, 237]
      const gris = [107, 114, 128]
      const noir = [31, 18, 53]

      // Header
      doc.setFillColor(76, 29, 149)
      doc.rect(0, 0, 210, 40, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.text('DiasporaFinance', 14, 18)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.text('Rapport financier mensuel', 14, 28)
      doc.text(new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }), 14, 36)

      let y = 55

      // Résumé
      doc.setTextColor(...noir)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('Résumé financier', 14, y)
      y += 10

      const cartes = [
        { label: 'Solde actuel', valeur: `${stats.solde?.toFixed(2)} EUR`, color: violet },
        { label: 'Total revenus', valeur: `+${stats.totalRevenus?.toFixed(2)} EUR`, color: [22, 163, 74] },
        { label: 'Total dépenses', valeur: `-${stats.totalDepenses?.toFixed(2)} EUR`, color: [220, 38, 38] },
        { label: 'Transferts famille', valeur: `${stats.totalTransferts?.toFixed(2)} EUR`, color: violet },
      ]

      cartes.forEach((c, i) => {
        const x = 14 + (i % 2) * 95
        if (i % 2 === 0 && i > 0) y += 25
        doc.setFillColor(245, 243, 255)
        doc.roundedRect(x, y, 88, 20, 3, 3, 'F')
        doc.setTextColor(...gris)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text(c.label, x + 4, y + 7)
        doc.setTextColor(...c.color)
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text(c.valeur, x + 4, y + 16)
      })

      y += 35

      // Transactions
      if (transactions.length > 0) {
        doc.setTextColor(...noir)
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Transactions récentes', 14, y)
        y += 8

        doc.setFillColor(...violet)
        doc.rect(14, y, 182, 8, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.text('Date', 16, y + 5.5)
        doc.text('Catégorie', 50, y + 5.5)
        doc.text('Note', 100, y + 5.5)
        doc.text('Montant', 160, y + 5.5)
        y += 8

        transactions.slice(0, 10).forEach((t: any, i: number) => {
          if (y > 260) { doc.addPage(); y = 20 }
          doc.setFillColor(i % 2 === 0 ? 249 : 255, i % 2 === 0 ? 247 : 255, i % 2 === 0 ? 255 : 255)
          doc.rect(14, y, 182, 7, 'F')
          doc.setTextColor(...gris)
          doc.setFontSize(8)
          doc.setFont('helvetica', 'normal')
          doc.text(new Date(t.date).toLocaleDateString('fr-FR'), 16, y + 5)
          doc.text(t.categorie, 50, y + 5)
          doc.text((t.note ?? '—').substring(0, 25), 100, y + 5)
          doc.setTextColor(t.type === 'REVENU' ? 22 : 220, t.type === 'REVENU' ? 163 : 38, t.type === 'REVENU' ? 74 : 38)
          doc.text(`${t.type === 'REVENU' ? '+' : '-'}${t.montant.toFixed(2)} ${t.devise}`, 160, y + 5)
          y += 7
        })
        y += 10
      }

      // Transferts
      if (transferts.length > 0) {
        if (y > 230) { doc.addPage(); y = 20 }
        doc.setTextColor(...noir)
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Transferts familiaux', 14, y)
        y += 8

        doc.setFillColor(...violet)
        doc.rect(14, y, 182, 8, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(9)
        doc.text('Date', 16, y + 5.5)
        doc.text('Bénéficiaire', 50, y + 5.5)
        doc.text('Service', 100, y + 5.5)
        doc.text('Montant', 160, y + 5.5)
        y += 8

        transferts.forEach((t: any, i: number) => {
          if (y > 260) { doc.addPage(); y = 20 }
          doc.setFillColor(i % 2 === 0 ? 249 : 255, i % 2 === 0 ? 247 : 255, i % 2 === 0 ? 255 : 255)
          doc.rect(14, y, 182, 7, 'F')
          doc.setTextColor(...gris)
          doc.setFontSize(8)
          doc.setFont('helvetica', 'normal')
          doc.text(new Date(t.date).toLocaleDateString('fr-FR'), 16, y + 5)
          doc.text(t.beneficiaire ?? '—', 50, y + 5)
          doc.text(t.service, 100, y + 5)
          doc.setTextColor(...violet)
          doc.text(`${t.montant.toFixed(2)} ${t.deviseEnvoi}`, 160, y + 5)
          y += 7
        })
        y += 10
      }

      // Objectifs
      if (objectifs.length > 0) {
        if (y > 230) { doc.addPage(); y = 20 }
        doc.setTextColor(...noir)
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Objectifs d\'épargne', 14, y)
        y += 10

        objectifs.forEach((o: any) => {
          if (y > 260) { doc.addPage(); y = 20 }
          const pct = Math.min(Math.round((o.montantActuel / o.montantCible) * 100), 100)
          doc.setTextColor(...noir)
          doc.setFontSize(10)
          doc.setFont('helvetica', 'bold')
          doc.text(o.nom, 14, y)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(...gris)
          doc.setFontSize(9)
          doc.text(`${o.montantActuel.toFixed(2)} / ${o.montantCible.toFixed(2)} ${o.devise} (${pct}%)`, 14, y + 6)
          doc.setFillColor(237, 233, 254)
          doc.rect(14, y + 9, 150, 4, 'F')
          doc.setFillColor(...violet)
          doc.rect(14, y + 9, 150 * pct / 100, 4, 'F')
          if (o.atteint) {
            doc.setTextColor(22, 163, 74)
            doc.text('✓ Atteint!', 170, y + 12)
          }
          y += 20
        })
      }

      // Footer
      doc.setFillColor(31, 18, 53)
      doc.rect(0, 285, 210, 12, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(8)
      doc.text('DiasporaFinance · Rapport généré le ' + new Date().toLocaleDateString('fr-FR'), 14, 292)

      doc.save(`rapport-diasporafinance-${new Date().toISOString().split('T')[0]}.pdf`)

    } catch (e) {
      console.error('Erreur PDF:', e)
    } finally {
      setChargement(false)
    }
  }

  return (
    <button
      onClick={genererPDF}
      disabled={chargement}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: chargement ? '#f5f3ff' : 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
        color: chargement ? '#9ca3af' : 'white',
        border: chargement ? '1.5px solid #ddd6fe' : 'none',
        borderRadius: '10px',
        padding: '10px 18px',
        fontSize: '13px',
        fontWeight: '500',
        cursor: chargement ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {chargement ? '⏳ Génération...' : '📄 Télécharger rapport PDF'}
    </button>
  )
}