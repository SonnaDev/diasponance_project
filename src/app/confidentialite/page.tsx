import Link from 'next/link'

export default function ConfidentialitePage() {
  const sections = [
    {
      titre: '1. Données collectées',
      contenu: `Nous collectons uniquement les données nécessaires au fonctionnement de DiasporaFinance:
      • Informations de compte: nom, adresse email, mot de passe chiffré
      • Données financières: transactions, transferts, objectifs d'épargne que vous saisissez
      • Données de session: cookies de connexion sécurisés
      
      Nous ne collectons jamais vos coordonnées bancaires, numéros de carte ou accès à vos comptes.`
    },
    {
      titre: '2. Utilisation des données',
      contenu: `Vos données sont utilisées exclusivement pour:
      • Afficher votre tableau de bord et vos statistiques financières
      • Sauvegarder vos transactions, transferts et objectifs
      • Vous connecter de manière sécurisée
      
      Nous ne vendons jamais vos données à des tiers.`
    },
    {
      titre: '3. Sécurité',
      contenu: `Vos données sont protégées par:
      • Chiffrement des mots de passe avec bcrypt
      • Sessions JWT sécurisées
      • Base de données hébergée sur Neon (infrastructure sécurisée)
      • Connexions HTTPS uniquement`
    },
    {
      titre: '4. Vos droits',
      contenu: `Conformément au RGPD, vous avez le droit de:
      • Accéder à vos données personnelles
      • Modifier vos informations dans les Paramètres
      • Supprimer votre compte et toutes vos données
      • Vous opposer au traitement de vos données
      
      Pour exercer ces droits, contactez-nous à contact@diasporafinance.com`
    },
    {
      titre: '5. Cookies',
      contenu: `Nous utilisons uniquement des cookies essentiels pour:
      • Maintenir votre session de connexion
      • Sécuriser votre compte
      
      Nous n'utilisons pas de cookies publicitaires ou de tracking.`
    },
    {
      titre: '6. Contact',
      contenu: `Pour toute question concernant vos données personnelles:
      Email: contact@diasporafinance.com
      
      Dernière mise à jour: mai 2026`
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f3ff' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '24px' }}>💰</span>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f1235' }}>DiasporaFinance</span>
        </Link>
      </nav>

      <section style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)', padding: '3rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: 'white', margin: '0 0 12px' }}>
          Politique de confidentialité 🔒
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', margin: 0 }}>
          Vos données vous appartiennent. Voici comment nous les protégeons.
        </p>
      </section>

      <section style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: '#f5f3ff', borderRadius: '14px', border: '1px solid #ede9fe', padding: '1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '14px', color: '#7c3aed', margin: 0, lineHeight: '1.6' }}>
            🛡️ <strong>Résumé:</strong> Nous collectons le minimum de données nécessaires, nous ne les vendons jamais, et vous pouvez les supprimer à tout moment.
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < sections.length - 1 ? '1px solid #f5f3ff' : 'none' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f1235', marginBottom: '12px' }}>{s.titre}</h2>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{s.contenu}</p>
          </div>
        ))}
      </section>

      <footer style={{ padding: '2rem', background: '#1f1235', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>
          © 2026 DiasporaFinance · Fait avec ❤️ pour la diaspora africaine
        </p>
      </footer>
    </div>
  )
}