import { useNavigate } from 'react-router-dom'
import { DIARIO } from '../../data'

export function Diario() {
  const navigate = useNavigate()

  return (
    <section id="diario" style={{ padding: '100px 0' }}>
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="kicker">05 — DIÁRIO</span>
            <h2>
              Pequenas <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>histórias</em><br />
              da nossa casa.
            </h2>
          </div>
          <button
            onClick={() => navigate('/diario')}
            className="btn-ghost"
            style={{ paddingBottom: 14, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Todos os textos →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 36 }}>
          {DIARIO.slice(0, 3).map((d) => (
            <article
              key={d.id}
              onClick={() => navigate(`/diario/${d.id}`)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector<HTMLElement>('.lp-art-img')
                if (img) img.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector<HTMLElement>('.lp-art-img')
                if (img) img.style.transform = 'scale(1)'
              }}
            >
              <div style={{
                aspectRatio: '5/6', borderRadius: 2, overflow: 'hidden',
                background: 'var(--linen)', position: 'relative', marginBottom: 22,
              }}>
                <div
                  className="lp-art-img"
                  style={{
                    position: 'absolute', inset: 0,
                    background: `url(${d.img}) center/cover no-repeat`,
                    transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)',
                    filter: 'saturate(0.92)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14 }}>
                <span style={{
                  display: 'inline-block', background: 'transparent', color: 'var(--terracotta)',
                  fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500,
                }}>
                  {d.cat}
                </span>
                <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
                <span style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
                  {d.date}
                </span>
              </div>
              <h3 className="serif" style={{
                margin: 0, lineHeight: 1.2, letterSpacing: '-0.005em', fontWeight: 400, fontSize: 26,
              }}>
                {d.ttl}
              </h3>
              <div style={{
                marginTop: 16, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--ink-soft)', display: 'inline-flex', gap: 8, alignItems: 'center',
              }}>
                Ler texto <span style={{ color: 'var(--terracotta)' }}>→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
