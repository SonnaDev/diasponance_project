'use client'

import Link from 'next/link'

const articles = [
  {
    slug: 'envoyer-argent-afrique',
    emoji: '✈️',
    categorie: 'Transferts',
    titre: "Comment envoyer de l'argent en Afrique sans perdre sur le taux de change",
    resume: 'Comparatif des meilleures solutions: Wave, Orange Money, Western Union, Wise. On analyse les frais, les taux et les délais pour vous aider à choisir.',
    date: '15 avril 2026',
    lecture: '5 min',
    color: '#ede9fe',
    textColor: '#7c3aed',
  },
  {
    slug: 'budget-diaspora',
    emoji: '💰',
    categorie: 'Budget',
    titre: 'La règle 50/30/20 adaptée à la diaspora africaine',
    resume: 'Comment gérer son budget quand on a des obligations familiales en Afrique? Nous adaptons la célèbre règle budgétaire à notre réalité.',
    date: '8 avril 2026',
    lecture: '7 min',
    color: '#dcfce7',
    textColor: '#16a34a',
  },
  {
    slug: 'taux-eur-xof',
    emoji: '💱',
    categorie: 'Devises',
    titre: 'EUR/XOF: tout comprendre sur le Franc CFA',
    resume: "Histoire, stabilité, avantages et inconvénients du Franc CFA pour la diaspora. Ce que vous devez savoir avant d'envoyer de l'argent.",
    date: '1 avril 2026',
    lecture: '6 min',
    color: '#fef9c3',
    textColor: '#ca8a04',
  },
  {
    slug: 'epargne-diaspora',
    emoji: '🎯',
    categorie: 'Épargne',
    titre: "Épargner depuis l'étranger: stratégies pour la diaspora africaine",
    resume: "Comment mettre de l'argent de côté tout en soutenant sa famille? Nos conseils pratiques pour trouver l'équilibre et construire son avenir.",
    date: '25 mars 2026',
    lecture: '8 min',
    color: '#fee2e2',
    textColor: '#dc2626',
  },
  {
    slug: 'wave-vs-orange-money',
    emoji: '📱',
    categorie: 'Comparatif',
    titre: 'Wave vs Orange Money vs Western Union: lequel choisir en 2026?',
    resume: "Analyse complète des trois principales solutions de transfert d'argent vers l'Afrique. Frais, rapidité, disponibilité — on compare tout.",
    date: '18 mars 2026',
    lecture: '10 min',
    color: '#e0f2fe',
    textColor: '#0369a1',
  },
  {
    slug: 'impots-expatrie',
    emoji: '📋',
    categorie: 'Fiscalité',
    titre: 'Impôts en France: ce que la diaspora africaine doit savoir',
    resume: 'Résidence fiscale, déclaration des revenus étrangers, déductions possibles. Un guide pratique pour les Africains vivant en France.',
    date: '10 mars 2026',
    lecture: '9 min',
    color: '#f3e8ff',
    textColor: '#7c3aed',
  },
]

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: 'sans-serif' }}>
      {/* Navigation */}
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f3ff' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '24px' }}>💰</span>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f1235' }}>DiasporaFinance</span>
        </Link>
        <Link href="/inscription" style={{ padding: '8px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', color: 'white', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
          Commencer gratuitement
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '800', color: 'white', margin: '0 0 16px' }}>
          Blog DiasporaFinance 📝
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
          Conseils financiers, guides pratiques et actualités pour les Africains à l'étranger
        </p>
      </section>

      <section style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Article vedette */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
            Article à la une ⭐
          </h2>
          <Link href={`/blog/${articles[0].slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
              borderRadius: '20px', padding: '2rem',
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: '2rem', alignItems: 'center',
              cursor: 'pointer'
            }}>
              <div>
                <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: '500' }}>
                  {articles[0].categorie}
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'white', margin: '12px 0 10px', lineHeight: '1.3' }}>
                  {articles[0].titre}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                  {articles[0].resume}
                </p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{articles[0].date}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>⏱ {articles[0].lecture}</span>
                </div>
              </div>
              <div style={{ fontSize: '80px' }}>{articles[0].emoji}</div>
            </div>
          </Link>
        </div>

        {/* Grille articles */}
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f1235', marginBottom: '16px' }}>
          Tous les articles
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {articles.slice(1).map((article, i) => (
            <Link key={i} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div 
                style={{
                  background: '#faf9ff', borderRadius: '16px',
                  border: '1px solid #ede9fe', padding: '1.25rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                  height: '100%'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.12)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{article.emoji}</div>
                <span style={{
                  background: article.color, color: article.textColor,
                  padding: '2px 8px', borderRadius: '99px',
                  fontSize: '11px', fontWeight: '500',
                }}>
                  {article.categorie}
                </span>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1f1235', margin: '10px 0 8px', lineHeight: '1.4' }}>
                  {article.titre}
                </h3>
                <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.5', margin: '0 0 12px' }}>
                  {article.resume.substring(0, 80)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{article.date}</span>
                  <span style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '500' }}>⏱ {article.lecture}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{
          marginTop: '3rem', background: '#f5f3ff',
          borderRadius: '20px', border: '1px solid #ede9fe',
          padding: '2rem', textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f1235', marginBottom: '8px' }}>
            📬 Restez informé
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
            Recevez nos conseils financiers directement dans votre boîte mail
          </p>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
            <input 
              type="email" 
              placeholder="votre@email.com" 
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} 
            />
            <button style={{ 
              padding: '10px 20px', 
              borderRadius: '8px', 
              background: '#7c3aed', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              S'abonner
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem', background: '#1f1235', textAlign: 'center', marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '12px' }}>
          {[['/', 'Accueil'], ['/a-propos', 'À propos'], ['/contact', 'Contact'], ['/confidentialite', 'Confidentialité']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>
          © 2026 DiasporaFinance · Fait avec ❤️ pour la diaspora africaine
        </p>
      </footer>
    </div>
  )
}