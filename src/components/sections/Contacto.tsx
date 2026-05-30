import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

type Channel = 'email' | 'whatsapp' | 'instagram'

const CHANNELS: { id: Channel; label: string; sub: string; icon: React.ReactNode; cta: string }[] = [
  {
    id: 'email',
    label: 'E-mail',
    sub: 'lusoprint3d@gmail.com',
    cta: 'Enviar mensagem',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    sub: '+351 939 158 345',
    cta: 'Abrir conversa',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    sub: '@lusoprint',
    cta: 'Ver perfil',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

const CHANNEL_HREF: Record<Channel, string> = {
  email: 'mailto:lusoprint3d@gmail.com',
  whatsapp: 'https://wa.me/351939158345',
  instagram: 'https://instagram.com/lusoprint',
}

export function Contacto() {
  const isMobile = useIsMobile()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [active, setActive] = useState<Channel>('email')
  const [sent, setSent] = useState(false)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (active === 'email') {
      const subject = encodeURIComponent('Encomenda personalizada — Lusoprint')
      const body = encodeURIComponent(`Olá,\n\nO meu nome é ${name}.\n\n${message}`)
      window.location.href = `mailto:lusoprint3d@gmail.com?subject=${subject}&body=${body}`
    } else if (active === 'whatsapp') {
      const text = encodeURIComponent(`Olá! Sou ${name}.\n\n${message}`)
      window.open(`https://wa.me/351939158345?text=${text}`, '_blank')
    }
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contacto" style={{ padding: isMobile ? '64px 0' : '110px 0', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)' }}>
      <div className="shell" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: isMobile ? 40 : 80, alignItems: 'start' }}>

        {/* Left — copy */}
        <div>
          <span className="kicker">Contacto</span>
          <h2 className="serif" style={{
            fontSize: 'clamp(38px, 5vw, 70px)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            fontWeight: 400,
            margin: '16px 0 28px',
          }}>
            Não encontrou<br />o que procurava?<br />
            <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>Crie algo ao teu gosto.</em>
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.75, maxWidth: 400 }}>
            Cada peça Lusoprint pode ser desenhada especialmente para si — escolha o material, as cores, o nome. Estamos aqui para ouvir.
          </p>

          {/* Channel picker */}
          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CHANNELS.map(ch => (
              <button
                key={ch.id}
                onClick={() => setActive(ch.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 18,
                  padding: '16px 22px',
                  background: active === ch.id ? 'var(--paper)' : 'transparent',
                  border: active === ch.id ? '1px solid var(--ink)' : '1px solid var(--rule)',
                  borderRadius: 4,
                  cursor: 'pointer',
                  transition: 'all 220ms ease',
                  textAlign: 'left',
                  color: 'var(--ink)',
                }}
              >
                <span style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: active === ch.id ? 'var(--ink)' : 'var(--linen)',
                  color: active === ch.id ? 'var(--paper)' : 'var(--ink-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 220ms ease',
                }}>
                  {ch.icon}
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, color: active === ch.id ? 'var(--ink)' : 'var(--ink-soft)' }}>
                    {ch.label}
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--ink-mute)', marginTop: 2 }}>
                    {ch.sub}
                  </span>
                </span>
                {active === ch.id && (
                  <span style={{ fontSize: 18, color: 'var(--terracotta)' }}>→</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right — form or direct link */}
        <div style={{ paddingTop: isMobile ? 0 : 56 }}>
          {active === 'instagram' ? (
            <div style={{
              background: 'var(--paper)', border: '1px solid var(--rule)',
              borderRadius: 4, padding: '48px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', minHeight: 340,
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" stroke="none" />
                </svg>
              </div>
              <h3 className="serif" style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 400, lineHeight: 1.1 }}>
                Inspire-se no<br />
                <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>nosso atelier</em>
              </h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6, margin: '0 0 28px', maxWidth: 300 }}>
                Veja o nosso processo, novidades e peças exclusivas no Instagram.
              </p>
              <a
                href={CHANNEL_HREF.instagram}
                target="_blank"
                rel="noreferrer"
                className="btn btn-solid"
                style={{ borderRadius: 999 }}
              >
                @lusoprint <span className="arr">→</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSend} style={{
              background: 'var(--paper)', border: '1px solid var(--rule)',
              borderRadius: 4, padding: isMobile ? '24px 20px' : '40px',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4,
                fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--ink-mute)',
              }}>
                <span style={{ width: 20, height: 1, background: 'var(--rule)' }} />
                Mensagem por {active === 'email' ? 'e-mail' : 'WhatsApp'}
                <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
              </div>

              <label style={{ display: 'block' }}>
                <div className="kicker" style={{ marginBottom: 8 }}>O seu nome</div>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Como quer ser chamada…"
                  required
                  style={{
                    width: '100%', padding: '10px 0',
                    fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20,
                    border: 'none', borderBottom: '1px solid var(--rule)',
                    background: 'transparent', color: 'var(--ink)', outline: 'none',
                  }}
                />
              </label>

              <label style={{ display: 'block' }}>
                <div className="kicker" style={{ marginBottom: 8 }}>O que imagina</div>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Descreva a peça que sonha ter em casa…"
                  required
                  rows={4}
                  style={{
                    width: '100%', padding: '10px 0',
                    fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18,
                    border: 'none', borderBottom: '1px solid var(--rule)',
                    background: 'transparent', color: 'var(--ink)', outline: 'none',
                    resize: 'none', lineHeight: 1.6,
                  }}
                />
              </label>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 8 }}>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-mute)', lineHeight: 1.5, maxWidth: 220 }}>
                  Respondemos em até 24h com uma proposta personalizada.
                </p>
                <button
                  type="submit"
                  className="btn btn-solid"
                  style={{ flexShrink: 0 }}
                >
                  {sent ? 'Enviado ✓' : active === 'email' ? 'Enviar e-mail' : 'Abrir WhatsApp'}
                  {!sent && <span className="arr">→</span>}
                </button>
              </div>
            </form>
          )}

          <div style={{ marginTop: 20, display: 'flex', gap: 28, fontSize: 12, color: 'var(--ink-mute)', letterSpacing: '0.05em' }}>
            <span>↳ Resposta em 24h</span>
            <span>↳ Orçamento sem compromisso</span>
          </div>
        </div>
      </div>
    </section>
  )
}
