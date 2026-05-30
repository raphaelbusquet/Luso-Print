import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'lp_cookies'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY)
    if (!stored) setVisible(true)

    const handler = () => setVisible(true)
    window.addEventListener('lp:open-cookie-settings', handler)
    return () => window.removeEventListener('lp:open-cookie-settings', handler)
  }, [])

  const save = (choice: 'accepted' | 'declined') => {
    localStorage.setItem(KEY, choice)
    sessionStorage.setItem(KEY, choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 24, right: 24, zIndex: 9000,
      maxWidth: 560, margin: '0 auto',
      background: 'var(--ink)', color: 'var(--paper)',
      borderRadius: 6, padding: '20px 24px',
      boxShadow: '0 16px 56px -8px rgba(43,39,34,0.45)',
      display: 'flex', flexDirection: 'column', gap: 16,
      animation: 'lp-fadein 260ms ease',
    }}>
      <div>
        <div style={{ fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.55)', marginBottom: 8 }}>
          Cookies
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(244,239,230,0.85)' }}>
          Utilizamos cookies essenciais para o funcionamento do website e cookies analíticos para melhorar a sua experiência.{' '}
          <Link to="/termos" style={{ color: 'rgba(244,239,230,0.55)', textDecoration: 'underline', fontSize: 13 }}>
            Saber mais
          </Link>
        </p>
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button
          onClick={() => save('declined')}
          style={{
            padding: '10px 20px', background: 'transparent',
            border: '1px solid rgba(244,239,230,0.25)', borderRadius: 999,
            color: 'rgba(244,239,230,0.7)', cursor: 'pointer',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: 'inherit', transition: 'border-color 180ms, color 180ms',
          }}
          onMouseEnter={e => { const b = e.currentTarget; b.style.borderColor = 'rgba(244,239,230,0.55)'; b.style.color = 'var(--paper)' }}
          onMouseLeave={e => { const b = e.currentTarget; b.style.borderColor = 'rgba(244,239,230,0.25)'; b.style.color = 'rgba(244,239,230,0.7)' }}
        >
          Recusar
        </button>
        <button
          onClick={() => save('accepted')}
          style={{
            padding: '10px 24px', background: 'var(--paper)',
            border: 'none', borderRadius: 999,
            color: 'var(--ink)', cursor: 'pointer',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: 'inherit', transition: 'background 180ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--linen)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--paper)')}
        >
          Aceitar todos
        </button>
      </div>
    </div>
  )
}
