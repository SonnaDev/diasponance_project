// @ts-nocheck
import Link from 'next/link'
import { getArticle, articles } from '../data'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const paragraphes = article.contenu.split('\n\n').filter(p => p.trim())

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f3ff', position: 'sticky', top: 0, background: 'white', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '24px' }}>💰</span>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f1235' }}>DiasporaFinance</span>
        </Link>
        <Link href="/blog" style={{ fontSize: '14px', color: '#7c3aed', textDecoration: 'none', fontWeight: '500' }}>
          ← Retour au blog
        </Link>
      </nav>

      <section style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            background: article.color, color: article.textColor,
            padding: '4px 12px', borderRadius: '99px',
            fontSize: '12px', fontWeight: '600',
            display: 'inline-block', marginBottom: '16px',
          }}>
            {article.categorie}
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', lineHeight: '1.3', marginBottom: '16px' }}>
            {article.titre}
          </h1>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{article.date}</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>⏱ {article.lecture} de lecture</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        {paragraphes.map((para, i) => {
          const trimmed = para.trim()

          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={i} style={{ fontSize: '22px', fontWeight: '700', color: '#1f1235', margin: '2rem 0 1rem' }}>
                {trimmed.replace('## ', '')}
              </h2>
            )
          }

          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={i} style={{ fontSize: '18px', fontWeight: '600', color: '#1f1235', margin: '1.5rem 0 0.75rem' }}>
                {trimmed.replace('### ', '')}
              </h3>
            )
          }

          if (trimmed.startsWith('- ')) {
            const items = trimmed.split('\n').filter(l => l.startsWith('- '))
            return (
              <ul key={i} style={{ paddingLeft: '1.5rem', margin: '0.75rem 0' }}>
                {items.map((item, j) => (
                  <li key={j} style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.7', marginBottom: '6px' }}>
                    {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                  </li>
                ))}
              </ul>
            )
          }

          if (trimmed.startsWith('|')) {
            const rows = trimmed.split('\n').filter(r => r.includes('|') && !r.match(/^[\|\s\-]+$/))
            return (
              <div key={i} style={{ overflowX: 'auto', margin: '1rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  {rows.map((row, j) => {
                    const cells = row.split('|').filter(c => c.trim())
                    return (
                      <tr key={j} style={{ background: j === 0 ? '#f5f3ff' : j % 2 === 0 ? '#faf9ff' : 'white', borderBottom: '1px solid #ede9fe' }}>
                        {cells.map((cell, k) => (
                          j === 0
                            ? <th key={k} style={{ padding: '10px 16px', fontSize: '13px', fontWeight: '600', color: '#7c3aed', textAlign: 'left' }}>{cell.trim()}</th>
                            : <td key={k} style={{ padding: '10px 16px', fontSize: '14px', color: '#4b5563' }}>{cell.trim()}</td>
                        ))}
                      </tr>
                    )
                  })}
                </table>
              </div>
            )
          }

          return (
            <p key={i} style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8', marginBottom: '1rem' }}>
              {trimmed.replace(/\*\*(.*?)\*\*/g, '$1')}
            </p>
          )
        })}

        {/* CTA */}
        <div style={{
          marginTop: '3rem', background: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
          borderRadius: '20px', padding: '2rem', textAlign: 'center',
        }}>
          <p style={{ fontSize: '20px', marginBottom: '8px' }}>💰</p>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
            Gérez vos finances avec DiasporaFinance
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '20px' }}>
            Mettez en pratique les conseils de cet article avec notre app gratuite
          </p>
          <Link href="/inscription" style={{
            background: 'white', color: '#7c3aed',
            padding: '12px 28px', borderRadius: '10px',
            fontSize: '14px', fontWeight: '700', textDecoration: 'none',
            display: 'inline-block',
          }}>
            Créer un compte gratuit →
          </Link>
        </div>

        {/* Articles similaires */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
            Lire aussi 📚
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {articles.filter(a => a.slug !== article.slug).slice(0, 2).map((a, i) => (
              <Link key={i} href={`/blog/${a.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#faf9ff', borderRadius: '12px',
                  border: '1px solid #ede9fe', padding: '1rem',
                }}>
                  <span style={{ fontSize: '24px' }}>{a.emoji}</span>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#1f1235', margin: '8px 0 4px', lineHeight: '1.4' }}>
                    {a.titre}
                  </p>
                  <span style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '500' }}>
                    Lire l'article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: '2rem', background: '#1f1235', textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>
          © 2026 DiasporaFinance · Fait avec ❤️ pour la diaspora africaine
        </p>
      </footer>
    </div>
  )
}