import { useState } from 'react'
import { supabase } from '../../lib/supabase'

function generateCouponCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'LUSO-'
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(true)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed || !email) return
    setStatus('loading')
    try {
      // Subscribe to newsletter (ignore duplicate email)
      const { error: nlError } = await supabase.from('newsletter').insert({ email })
      if (nlError && nlError.code !== '23505') throw nlError

      // Generate and store coupon
      const code = generateCouponCode()
      const { error: cpError } = await supabase.from('coupons').insert({ code, email })
      if (cpError) throw cpError

      await supabase.functions.invoke('send-coupon-email', { body: { email, code } })

      setStatus('done')
      setEmail('')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err)
      console.error('Newsletter subscribe error:', err)
      setErrorMsg(msg)
      setStatus('error')
    }
  }


  return (
    <section style={{
      padding: '100px 0',
      background: 'var(--terracotta)',
      color: '#FBEDE2',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="serif-it" style={{
        position: 'absolute', bottom: -60, left: -40,
        fontSize: 'clamp(180px, 30vw, 500px)',
        lineHeight: 0.8,
        color: 'rgba(255,255,255,0.10)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        devagar
      </div>

      <div className="shell" style={{
        position: 'relative',
        display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: 60, alignItems: 'center',
      }}>
        <div>
          <span style={{
            fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)', fontWeight: 500,
          }}>
            06 — NEWSLETTER LUSOPRINT
          </span>
          <h2 className="serif" style={{
            fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.01em',
            margin: '18px 0 22px', color: '#FBEDE2', fontWeight: 400,
          }}>
            Registe-se na nossa<br />
            <em style={{ fontStyle: 'italic' }}>newsletter</em> e ganhe<br />
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7em' }}>10% OFF</span> na primeira compra.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 440, margin: 0, fontSize: 16, lineHeight: 1.7 }}>
            Novidades do atelier, pré-vendas em primeira mão, edições limitadas e ensaios sobre casa, beleza e tempo.
          </p>
        </div>

        <div>
          {status === 'done' ? (
            <div>
              <p className="serif" style={{ fontStyle: 'italic', fontSize: 26, color: '#FBEDE2', opacity: 0.9, margin: '0 0 16px' }}>
                Bem-vinda — já está connosco.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                O seu cupão de <strong style={{ color: '#FBEDE2' }}>10% OFF</strong> foi enviado para o seu email.<br />
                Aplique-o no cesto antes de finalizar a encomenda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
              padding: 28, borderRadius: 2,
            }}>
              <label className="kicker" style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 10 }}>
                O seu correio
              </label>
              <div style={{
                display: 'flex', gap: 10, alignItems: 'stretch',
                borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: 8,
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="exemplo@correio.pt"
                  required
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    color: '#FBEDE2', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22,
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: '#FBEDE2', color: 'var(--terracotta)', border: 'none',
                    padding: '10px 18px', borderRadius: 999,
                    fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600,
                    cursor: status === 'loading' ? 'default' : 'pointer',
                    minWidth: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'opacity 200ms',
                    opacity: status === 'loading' ? 0.75 : 1,
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <span style={{
                        width: 12, height: 12, borderRadius: '50%',
                        border: '2px solid var(--terracotta)',
                        borderTopColor: 'transparent',
                        display: 'inline-block',
                        animation: 'lp-spin-slow 600ms linear infinite',
                      }} />
                      A enviar
                    </>
                  ) : 'Subscrever →'}
                </button>
              </div>
              {status === 'error' && (
                <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                  Erro: {errorMsg || 'Tente novamente.'}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  style={{ accentColor: '#FBEDE2' }}
                />
                Aceito receber correio editorial e respeito da privacidade.
              </div>
            </form>
          )}
          <div style={{ display: 'flex', gap: 28, marginTop: 22, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
            <span>↳ 8.420 leitoras</span>
            <span>↳ Próxima edição: 12 Junho</span>
            <span>↳ Sem spam, sempre.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
