import Link from 'next/link'

export default function AProposPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Nav */}
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f3ff' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '24px' }}>💰</span>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f1235' }}>DiasporaFinance</span>
        </Link>
        <Link href="/inscription" style={{ padding: '8px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', color: 'white', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
          Commencer gratuitement
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '800', color: 'white', margin: '0 0 16px' }}>
          Notre histoire 🌍
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
          DiasporaFinance est né d'un besoin réel — gérer ses finances entre deux continents
        </p>
      </section>

      {/* Histoire */}
      <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f1235', marginBottom: '16px' }}>
            Pourquoi DiasporaFinance? 💡
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8', marginBottom: '16px' }}>
            Nous sommes des Africains vivant en Europe. Chaque mois, nous jonglons entre payer notre loyer en euros, envoyer de l'argent à nos familles en Afrique, et essayer d'épargner pour nos rêves.
          </p>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8', marginBottom: '16px' }}>
            Les applications financières existantes ne comprennent pas notre réalité. Elles ne parlent pas de transferts familiaux, elles ne supportent pas le Franc CFA, et elles ne sont pas en français.
          </p>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8' }}>
            <strong style={{ color: '#7c3aed' }}>DiasporaFinance a été créé pour changer ça.</strong> Une app pensée par et pour la diaspora africaine.
          </p>
        </div>

        {/* Valeurs */}
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f1235', marginBottom: '24px' }}>
          Nos valeurs 💜
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '3rem' }}>
          {[
            { emoji: '🤝', titre: 'Solidarité', desc: 'Nous comprenons le poids de soutenir sa famille depuis l\'étranger' },
            { emoji: '🔒', titre: 'Sécurité', desc: 'Vos données financières sont chiffrées et protégées' },
            { emoji: '🌍', titre: 'Inclusivité', desc: 'Conçu pour toutes les diasporas africaines en Europe et aux USA' },
            { emoji: '💡', titre: 'Simplicité', desc: 'Une interface claire, en français, accessible à tous' },
          ].map((v, i) => (
            <div key={i} style={{ background: '#f5f3ff', borderRadius: '16px', border: '1px solid #ede9fe', padding: '1.5rem' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{v.emoji}</div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f1235', marginBottom: '8px' }}>{v.titre}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)', borderRadius: '20px', padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'white', marginBottom: '2rem' }}>
            DiasporaFinance en chiffres
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { chiffre: '3', label: 'Devises supportées', emoji: '💱' },
              { chiffre: '100%', label: 'Gratuit', emoji: '🎁' },
              { chiffre: '🇫🇷', label: 'En français', emoji: '' },
            ].map((s, i) => (
              <div key={i}>
                <p style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: '0 0 4px' }}>{s.chiffre}</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem', background: '#1f1235', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '12px' }}>
          {[['/', 'Accueil'], ['/contact', 'Contact'], ['/confidentialite', 'Confidentialité']].map(([href, label]) => (
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