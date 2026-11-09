import { translate as t } from '../../i18n/translate'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DIARIO } from '../../data'
import { useIsMobile } from '../../hooks/useIsMobile'

export function Diario() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [expanded, setExpanded] = useState(false)

  const visible = isMobile ? (expanded ? DIARIO.slice(0, 3) : DIARIO.slice(0, 1)) : DIARIO.slice(0, 3)

  return (
    <section id="diario" style={{ padding: isMobile ? '64px 0' : '100px 0' }}>
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="kicker">{t("04 — DIÁRIO")}</span>
            <h2>{t("Pequenas ")}<em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>{t("histórias")}</em><br />{t("da nossa casa.")}</h2>
          </div>
          <button
            onClick={() => navigate('/diario')}
            className="btn-ghost"
            style={{ paddingBottom: 14, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >{t("Todos os textos →")}</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: isMobile ? 28 : 36 }}>
          {t(visible.map((d) => (
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
                  {t(d.cat)}
                </span>
                <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
                <span style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
                  {t(d.date)}
                </span>
              </div>
              <h3 className="serif" style={{
                margin: 0, lineHeight: 1.2, letterSpacing: '-0.005em', fontWeight: 400, fontSize: 26,
              }}>
                {t(d.ttl)}
              </h3>
              <div style={{
                marginTop: 16, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--ink-soft)', display: 'inline-flex', gap: 8, alignItems: 'center',
              }}>{t("Ler texto ")}<span style={{ color: 'var(--terracotta)' }}>{t("→")}</span>
              </div>
            </article>
          )))}
        </div>

        {t(isMobile && (
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              marginTop: 24, display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: '1px solid var(--rule)', borderRadius: 999,
              padding: '10px 20px', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ink-soft)',
            }}
          >
            {t(expanded ? 'Ver menos ↑' : 'Ver mais textos →')}
          </button>
        ))}
      </div>
    </section>
  )
}
