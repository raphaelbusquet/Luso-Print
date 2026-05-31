import { useState } from 'react'
import type React from 'react'
import { supabase } from '../../lib/supabase'
import { useIsMobile } from '../../hooks/useIsMobile'

type Step = 'email' | 'code' | 'done' | 'already'

export function Newsletter() {
  const isMobile = useIsMobile()
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(true)
  const [step, setStep] = useState<Step>('email')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [codeInput, setCodeInput] = useState('')
  const [coupon, setCoupon] = useState('')

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed || !email) return
    setLoading(true)
    setErrorMsg('')
    try {
      const { data, error } = await supabase.functions.invoke('verify-newsletter', {
        body: { action: 'send', email },
      })
      if (error) throw error
      if (data.status === 'already_subscribed') {
        setStep('already')
      } else {
        setStep('code')
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!codeInput) return
    setLoading(true)
    setErrorMsg('')
    try {
      const { data, error } = await supabase.functions.invoke('verify-newsletter', {
        body: { action: 'verify', email, code: codeInput },
      })
      if (error) throw error
      if (data.status === 'invalid_code') {
        setErrorMsg('Código inválido ou expirado. Verifique o email.')
      } else {
        setCoupon(data.coupon)
        setStep('done')
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    borderBottom: isMobile ? '1px solid rgba(255,255,255,0.5)' : 'none',
    paddingBottom: isMobile ? 8 : 0,
    color: '#FBEDE2', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: isMobile ? 18 : 22,
  }

  const btnStyle = {
    background: '#FBEDE2', color: 'var(--terracotta)', border: 'none',
    padding: '12px 18px', borderRadius: 999,
    fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase' as const, fontWeight: 600,
    cursor: loading ? 'default' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'opacity 200ms', marginTop: isMobile ? 14 : 0,
    opacity: loading ? 0.75 : 1,
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 10,
    alignItems: 'stretch',
    borderBottom: isMobile ? 'none' : '1px solid rgba(255,255,255,0.5)',
    paddingBottom: isMobile ? 0 : 8,
  }

  const formStyle = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.25)',
    backdropFilter: 'blur(8px)',
    padding: 28, borderRadius: 2,
  }

  const spinner = (
    <span style={{
      width: 12, height: 12, borderRadius: '50%',
      border: '2px solid var(--terracotta)', borderTopColor: 'transparent',
      display: 'inline-block', animation: 'lp-spin-slow 600ms linear infinite',
    }} />
  )

  return (
    <section style={{
      padding: isMobile ? '64px 0' : '100px 0',
      background: 'var(--terracotta)', color: '#FBEDE2',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="serif-it" style={{
        position: 'absolute', bottom: -60, left: -40,
        fontSize: 'clamp(180px, 30vw, 500px)', lineHeight: 0.8,
        color: 'rgba(255,255,255,0.10)', pointerEvents: 'none', userSelect: 'none',
      }}>
        devagar
      </div>

      <div className="shell" style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: isMobile ? 36 : 60, alignItems: 'center',
      }}>
        <div>
          <span style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
            06 — NEWSLETTER LUSOPRINT
          </span>
          <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.01em', margin: '18px 0 22px', color: '#FBEDE2', fontWeight: 400 }}>
            Registe-se na nossa<br />
            <em style={{ fontStyle: 'italic' }}>newsletter</em> e ganhe<br />
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7em' }}>10% OFF</span> na primeira compra.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 440, margin: 0, fontSize: 16, lineHeight: 1.7 }}>
            Novidades do atelier, pré-vendas em primeira mão, edições limitadas e ensaios sobre casa, beleza e tempo.
          </p>
        </div>

        <div>
          {/* ── Step: email input ── */}
          {step === 'email' && (
            <form onSubmit={handleSendCode} style={formStyle}>
              <label className="kicker" style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 10 }}>
                O seu correio
              </label>
              <div style={rowStyle}>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="exemplo@correio.pt" required style={inputStyle}
                />
                <button type="submit" disabled={loading} style={btnStyle}>
                  {loading ? <>{spinner} A enviar</> : 'Subscrever →'}
                </button>
              </div>
              {errorMsg && <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{errorMsg}</div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: '#FBEDE2' }} />
                Aceito receber correio editorial e respeito da privacidade.
              </div>
            </form>
          )}

          {/* ── Step: code verification ── */}
          {step === 'code' && (
            <form onSubmit={handleVerifyCode} style={formStyle}>
              <p className="kicker" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                Código enviado para {email}
              </p>
              <div style={rowStyle}>
                <input
                  type="text" value={codeInput}
                  onChange={e => setCodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000" required maxLength={6}
                  style={{ ...inputStyle, letterSpacing: '0.3em', fontStyle: 'normal' }}
                />
                <button type="submit" disabled={loading || codeInput.length < 6} style={{ ...btnStyle, opacity: (loading || codeInput.length < 6) ? 0.6 : 1 }}>
                  {loading ? <>{spinner} A verificar</> : 'Confirmar →'}
                </button>
              </div>
              {errorMsg && <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{errorMsg}</div>}
              <div style={{ marginTop: 14, fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                Não recebeu? Verifique a pasta de spam.
              </div>
              <button
                type="button" onClick={() => { setStep('email'); setCodeInput(''); setErrorMsg('') }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', padding: 0, fontFamily: 'inherit' }}
              >
                ← Mudar email
              </button>
            </form>
          )}

          {/* ── Step: already subscribed ── */}
          {step === 'already' && (
            <div style={formStyle}>
              <p className="serif" style={{ fontStyle: 'italic', fontSize: 22, color: '#FBEDE2', margin: '0 0 12px' }}>
                Este email já está registado.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>
                Já faz parte da nossa comunidade. Se não recebeu o cupão, entre em contacto connosco.
              </p>
              <button
                onClick={() => { setStep('email'); setEmail(''); setErrorMsg('') }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', padding: 0, fontFamily: 'inherit' }}
              >
                ← Tentar com outro email
              </button>
            </div>
          )}

          {/* ── Step: done — show coupon ── */}
          {step === 'done' && (
            <div>
              <p className="serif" style={{ fontStyle: 'italic', fontSize: 26, color: '#FBEDE2', opacity: 0.9, margin: '0 0 16px' }}>
                Bem-vindo(a) — já está connosco.
              </p>
              <div style={{
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2, padding: '20px 24px', marginBottom: 16, textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                  O seu cupão de 10% OFF
                </div>
                <div className="serif" style={{ fontSize: 32, letterSpacing: '0.18em', color: '#FBEDE2' }}>
                  {coupon}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 8, letterSpacing: '0.1em' }}>
                  Enviado também para o seu email · Aplique no carrinho
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '10px 20px' : 28, marginTop: 22, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
            <span>↳ 200+ leitoras</span>
            <span>↳ Próxima edição: 12 Junho</span>
            <span>↳ Sem spam, sempre.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
