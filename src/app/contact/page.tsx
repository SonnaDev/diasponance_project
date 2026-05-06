'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_jgssu2d'
const EMAILJS_TEMPLATE_ID = 'template_ivquu0l'
const EMAILJS_PUBLIC_KEY = 'SK_ZLlPV6hClHem-g'

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [sujet, setSujet] = useState('')
  const [message, setMessage] = useState('')
  const [envoye, setEnvoye] = useState(false)
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setChargement(true)
    setErreur('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { nom, email, sujet, message },
        EMAILJS_PUBLIC_KEY
      )
      setEnvoye(true)
    } catch (err) {
      setErreur('Erreur lors de l\'envoi. Réessayez ou contactez-nous directement.')
    } finally {
      setChargement(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <nav style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f3ff' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontSize: '24px' }}>💰</span>
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#1f1235' }}>DiasporaFinance</span>
        </Link>
        <Link href="/inscription" style={{ padding: '8px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', color: 'white', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
          Commencer gratuitement
        </Link>
      </nav>

      <section style={{ background: 'linear-gradient(135deg, #4c1d95, #7c3aed)', padding: '4rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '800', color: 'white', margin: '0 0 16px' }}>
          Contactez-nous 📬
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto' }}>
          Une question? Une suggestion? Nous sommes là pour vous aider
        </p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
        {/* Infos contact */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f1235', marginBottom: '24px' }}>
            Parlons-nous 💬
          </h2>
          {[
            { emoji: '📧', titre: 'Email', info: 'contact@diasporafinance.com' },
            { emoji: '💬', titre: 'WhatsApp', info: 'Disponible sur demande' },
            { emoji: '🕐', titre: 'Temps de réponse', info: 'Sous 24 heures' },
            { emoji: '🌍', titre: 'Langues', info: 'Français, English' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                {c.emoji}
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 2px' }}>{c.titre}</p>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f1235', margin: 0 }}>{c.info}</p>
              </div>
            </div>
          ))}

          <div style={{ background: '#f5f3ff', borderRadius: '16px', border: '1px solid #ede9fe', padding: '1.25rem', marginTop: '1rem' }}>
            <p style={{ fontSize: '13px', color: '#7c3aed', fontWeight: '600', margin: '0 0 6px' }}>💡 FAQ rapide</p>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
              Pour les questions fréquentes, consultez notre blog.
            </p>
            <Link href="/blog" style={{ fontSize: '13px', color: '#7c3aed', fontWeight: '500', textDecoration: 'none', display: 'inline-block', marginTop: '8px' }}>
              Voir le blog →
            </Link>
          </div>
        </div>

        {/* Formulaire */}
        <div style={{ background: '#faf9ff', borderRadius: '20px', border: '1px solid #ede9fe', padding: '2rem' }}>
          {envoye ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f1235', marginBottom: '8px' }}>Message envoyé!</h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>Nous vous répondrons dans les 24 heures.</p>
              <button
                onClick={() => { setEnvoye(false); setNom(''); setEmail(''); setSujet(''); setMessage('') }}
                style={{ marginTop: '16px', background: 'none', border: '1.5px solid #ddd6fe', borderRadius: '10px', padding: '8px 20px', color: '#7c3aed', cursor: 'pointer', fontSize: '14px' }}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f1235', margin: 0 }}>
                Envoyez-nous un message
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Nom</label>
                  <input type="text" name="nom" value={nom} onChange={e => setNom(e.target.value)}
                    className="input" placeholder="Mamadou" required />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Email</label>
                  <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="input" placeholder="vous@exemple.com" required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Sujet</label>
                <select name="sujet" value={sujet} onChange={e => setSujet(e.target.value)} className="input" required>
                  <option value="">Choisir un sujet...</option>
                  <option value="Question générale">Question générale</option>
                  <option value="Signaler un problème">Signaler un problème</option>
                  <option value="Suggestion">Suggestion d'amélioration</option>
                  <option value="Partenariat">Partenariat</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px', fontWeight: '500' }}>Message</label>
                <textarea name="message" value={message} onChange={e => setMessage(e.target.value)} required
                  style={{ width: '100%', border: '1.5px solid #ddd6fe', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '120px', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  placeholder="Décrivez votre question ou suggestion..."
                />
              </div>
              {erreur && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', color: '#dc2626' }}>
                  {erreur}
                </div>
              )}
              <button type="submit" disabled={chargement} className="btn-primary" style={{ width: '100%', padding: '12px' }}>
                {chargement ? 'Envoi en cours...' : 'Envoyer le message 📬'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{ padding: '2rem', background: '#1f1235', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>
          © 2026 DiasporaFinance · Fait avec ❤️ pour la diaspora africaine
        </p>
      </footer>
    </div>
  )
}