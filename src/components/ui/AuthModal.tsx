import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'

type Props = { onClose: () => void }
type View = 'signin' | 'signup' | 'verify'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 0',
  fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18,
  border: 'none', borderBottom: '1px solid var(--rule)',
  background: 'transparent', color: 'var(--ink)', outline: 'none',
}

export function AuthModal({ onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<View>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const reset = () => { setError(null); setSuccess(null) }

  const handleGoogle = async () => {
    reset()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }

  const fmtError = (msg: string) => {
    if (msg.includes('fetch') || msg.includes('network')) return 'Sem ligação ao servidor. Verifique a sua ligação à internet.'
    if (msg.includes('Invalid login') || msg.includes('invalid_credentials')) return 'E-mail ou palavra-passe incorretos.'
    if (msg.includes('Email not confirmed')) return 'Confirme o seu e-mail antes de entrar.'
    if (msg.includes('already registered') || msg.includes('already been registered')) return 'Este e-mail já tem conta. Tente entrar.'
    if (msg.includes('Password should')) return 'A palavra-passe deve ter pelo menos 6 caracteres.'
    return msg
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    reset()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setError(fmtError(error.message)); return }
    onClose()
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    reset()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } },
    })
    setLoading(false)
    if (error) { setError(fmtError(error.message)); return }
    setView('verify')
  }

  const switchView = (v: View) => { setView(v); reset(); setEmail(''); setPassword(''); setName('') }

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(43,39,34,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{
        background: 'var(--paper)',
        width: '100%', maxWidth: 420,
        padding: '44px 40px 36px',
        borderRadius: 4,
        boxShadow: '0 40px 100px -20px rgba(43,39,34,0.45)',
        animation: 'modal-in 380ms cubic-bezier(.2,.7,.2,1)',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--ink-mute)', fontSize: 18, lineHeight: 1 }}
          aria-label="Fechar"
        >×</button>

        {/* Verify email screen */}
        {view === 'verify' && (
          <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>✉️</div>
            <h2 className="serif" style={{ margin: '0 0 16px', fontSize: 32, fontWeight: 400, lineHeight: 1.1 }}>
              Verifique<br />
              <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>o seu e-mail.</em>
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.7, margin: '0 0 32px' }}>
              Enviámos um link de confirmação para <strong style={{ color: 'var(--ink)' }}>{email}</strong>.<br />
              Clique no link para ativar a sua conta.
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink-mute)', lineHeight: 1.6, margin: '-16px 0 32px', padding: '10px 14px', background: 'var(--linen)', borderRadius: 3 }}>
              Não vê o e-mail? Verifique também a pasta de <strong>spam</strong> ou promoções.
            </p>
            <button
              onClick={onClose}
              className="btn btn-solid"
              style={{ borderRadius: 999, padding: '13px 32px' }}
            >
              Fechar
            </button>
            <p style={{ marginTop: 16, fontSize: 12, color: 'var(--ink-mute)' }}>
              Não recebeu?{' '}
              <button
                onClick={() => { setView('signup'); reset() }}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ink-soft)', fontSize: 12, textDecoration: 'underline', fontFamily: 'inherit' }}
              >
                Tentar novamente
              </button>
            </p>
          </div>
        )}

        {/* Normal content — hidden when verifying */}
        {view !== 'verify' && <>

        {/* Logo */}
        <img src="/assets/brand/lusoprint-header.png" alt="Lusoprint" style={{ height: 36, marginBottom: 20, mixBlendMode: 'multiply' }} />

        {/* Heading */}
        <h2 className="serif" style={{ margin: '0 0 8px', fontSize: 32, fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
          {view === 'signin' ? <>Bem-vinda<br /><em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>de volta.</em></> : <>Criar<br /><em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>conta.</em></>}
        </h2>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 0, marginTop: 20, marginBottom: 24, borderBottom: '1px solid var(--rule)' }}>
          {(['signin', 'signup'] as View[]).map(v => (
            <button
              key={v}
              onClick={() => switchView(v)}
              style={{
                flex: 1, padding: '10px 0', background: 'none',
                border: 'none', borderBottom: view === v ? '2px solid var(--ink)' : '2px solid transparent',
                cursor: 'pointer', fontFamily: 'var(--sans)',
                fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: view === v ? 'var(--ink)' : 'var(--ink-mute)',
                transition: 'all 180ms ease', marginBottom: -1,
              }}
            >
              {v === 'signin' ? 'Entrar' : 'Registar'}
            </button>
          ))}
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '12px 20px', background: 'var(--ink)', color: 'var(--paper)',
            border: 'none', borderRadius: 999,
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            fontWeight: 500, cursor: 'pointer', transition: 'background 220ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continuar com Google
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>ou</span>
          <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
        </div>

        {/* Email form */}
        <form onSubmit={view === 'signin' ? handleEmailSignIn : handleEmailSignUp}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {view === 'signup' && (
            <label style={{ display: 'block' }}>
              <div className="kicker" style={{ marginBottom: 6 }}>Nome</div>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="O seu nome…" required style={inputStyle} />
            </label>
          )}

          <label style={{ display: 'block' }}>
            <div className="kicker" style={{ marginBottom: 6 }}>E-mail</div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nome@email.com" required style={inputStyle} />
          </label>

          <label style={{ display: 'block' }}>
            <div className="kicker" style={{ marginBottom: 6 }}>Palavra-passe</div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} style={inputStyle} />
          </label>

          {error && (
            <div style={{ fontSize: 12, color: 'var(--terracotta)', lineHeight: 1.5, padding: '8px 12px', background: 'rgba(201,130,110,0.1)', borderRadius: 3 }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ fontSize: 12, color: '#5a7a5a', lineHeight: 1.5, padding: '8px 12px', background: 'rgba(90,122,90,0.1)', borderRadius: 3 }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-solid"
            style={{ borderRadius: 999, justifyContent: 'center', padding: '13px 20px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'A processar…' : view === 'signin' ? 'Entrar' : 'Criar conta'}
            {!loading && <span className="arr">→</span>}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 11, color: 'var(--ink-mute)', lineHeight: 1.6 }}>
          Ao continuar, aceita os nossos{' '}
          <a href="#" style={{ color: 'var(--ink-soft)', borderBottom: '1px solid var(--rule)' }}>Termos</a>
          {' '}e{' '}
          <a href="#" style={{ color: 'var(--ink-soft)', borderBottom: '1px solid var(--rule)' }}>Privacidade</a>.
        </p>
        </>}
      </div>
    </div>
  )
}
