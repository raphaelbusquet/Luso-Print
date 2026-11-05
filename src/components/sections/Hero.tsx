import { useState, useEffect, CSSProperties } from 'react'
import { HeroShapes } from './HeroShapes'
import { useIsMobile } from '../../hooks/useIsMobile'

type Slide = {
  id: string
  eyebrow: string
  badge: string
  titleLines: string[]
  italic: string
  lede: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  image: string
  caption: { eyebrow: string; title: string; sub: string }
  theme: { bg: string; fg: string; muted: string; rule: string; accent: string }
  shapes: string
}

const SLIDES: Slide[] = [
  {
    id: 'natal',
    eyebrow: 'NATAL · PEQUENOS GESTOS, GRANDES AFETOS',
    badge: 'Um Natal com a sua marca',
    titleLines: ['Neste Natal,'],
    italic: 'ofereça com alma.',
    lede: 'Dê um toque especial à sua casa e aos seus presentes. Conte-nos a sua ideia e vamos dar forma a um Natal mais seu.',
    ctaPrimary: { label: 'Descobrir o Natal', href: '/natal' },
    ctaSecondary: { label: 'Ver produtos de Natal', href: '/natal#produtos-natal' },
    image: '/assets/products/natal/placa-feliz-natal-2.png',
    caption: { eyebrow: 'Coleção de Natal', title: 'Placa Feliz Natal', sub: 'Para decorar e oferecer · €8,49' },
    theme: { bg: 'var(--linen)', fg: '#304737', muted: 'var(--ink-soft)', rule: 'var(--rule)', accent: 'var(--terracotta)' },
    shapes: 'estacoes',
  },
  {
    id: 'estacoes',
    eyebrow: 'EDIÇÃO N.º 1 · VERÃO 2026',
    badge: 'Novo · Coleção Estações',
    titleLines: ['Dá forma'],
    italic: 'à tua imaginação.',
    lede: 'Decoração feita com calma e intenção, para casas que valorizam beleza nos pequenos detalhes.',
    ctaPrimary: { label: 'Explorar universos', href: '#universos' },
    ctaSecondary: { label: 'Conheça o atelier', href: '#atelier' },
    image: '/assets/products/deco/candeeiro-fluxo-hero.png',
    caption: { eyebrow: 'Em destaque', title: 'Candeeiro Fluxo', sub: 'Coleção Decoração · €35' },
    theme: { bg: 'var(--linen)', fg: 'var(--ink)', muted: 'var(--ink-soft)', rule: 'var(--rule)', accent: 'var(--terracotta)' },
    shapes: 'estacoes',
  },
  {
    id: 'empresas',
    eyebrow: 'PARA EMPRESAS · FEITO À MEDIDA',
    badge: 'A sua marca ganha forma',
    titleLines: ['Da Luso'],
    italic: 'para sua empresa.',
    lede: 'Brindes personalizados, chaveiros multifuncionais e peças com NFC para aproximar a sua marca dos seus clientes.',
    ctaPrimary: { label: 'Descobrir as soluções', href: '/empresas' },
    ctaSecondary: { label: 'Saber mais', href: '#empresas' },
    image: '/assets/empresas/placa-luso-nfc-atual-1.png',
    caption: { eyebrow: 'Para a sua marca', title: 'Projetos à medida', sub: 'Orçamento sob consulta' },
    theme: { bg: 'var(--linen)', fg: 'var(--ink)', muted: 'var(--ink-soft)', rule: 'var(--rule)', accent: 'var(--terracotta)' },
    shapes: 'personal',
  },
]

const arrowBtn = (t: Slide['theme']): CSSProperties => ({
  width: 44, height: 44, borderRadius: '50%',
  border: `1px solid ${t.rule}`,
  background: 'transparent', color: t.fg,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', transition: 'all 240ms ease',
})

export function Hero() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const isMobile = useIsMobile()
  const total = SLIDES.length
  const slide = SLIDES[idx]
  const t = slide.theme

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setIdx(i => (i + 1) % total), 8000)
    return () => clearTimeout(id)
  }, [idx, paused, total])

  const go = (next: number) => setIdx(((next % total) + total) % total)

  return (
    <section
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        isolation: 'isolate',
        background: t.bg,
        color: t.fg,
        transition: 'background 600ms ease, color 600ms ease',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      <HeroShapes variant={slide.shapes} idx={idx} />

      <div className="shell-wide" style={{
        position: 'relative', zIndex: 10,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
        gap: isMobile ? 32 : 80,
        alignItems: 'center',
        minHeight: isMobile ? 'auto' : '74vh',
        padding: isMobile ? '40px 0 32px' : '60px 0 50px',
      }}>
        <div key={'L' + idx} style={{ paddingBottom: 10, position: 'relative', animation: 'lp-fadein 700ms cubic-bezier(.2,.7,.2,1)' }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 30, flexWrap: 'wrap' }}>
            <span className="kicker" style={{ color: t.muted, fontSize: 13 }}>{slide.eyebrow}</span>
            <span style={{ width: 40, height: 1, background: t.rule }} />
            <span className="kicker" style={{ color: t.accent, fontSize: 13 }}>{slide.badge}</span>
          </div>

          <h1 className="serif" style={{
            margin: 0,
            fontSize: isMobile ? 'clamp(48px, 13vw, 72px)' : 'clamp(60px, 8.6vw, 136px)',
            lineHeight: 0.94,
            letterSpacing: '-0.018em',
            fontWeight: 400,
            color: t.fg,
          }}>
            {slide.titleLines.map((line, i) => <span key={i}>{line}<br /></span>)}
            <em style={{ fontWeight: 400, fontStyle: 'italic', color: t.accent }}>{slide.italic}</em>
          </h1>

          <p className="lede" style={{ maxWidth: 520, marginTop: 20, color: t.muted, fontSize: isMobile ? 18 : 28, lineHeight: 1.45 }}>
            {slide.lede}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 38 }}>
            <a
              href={slide.ctaPrimary.href}
              className="btn"
              style={{ background: t.fg, color: t.bg, borderColor: t.fg }}
              onMouseEnter={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = t.fg; e.currentTarget.style.borderColor = t.fg; e.currentTarget.style.color = t.bg }}
            >
              {slide.ctaPrimary.label} <span className="arr">→</span>
            </a>
            <a href={slide.ctaSecondary.href} style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16,
              color: t.muted, borderBottom: `1px solid ${t.muted}`, paddingBottom: 4,
            }}>
              {slide.ctaSecondary.label}
            </a>
          </div>


        </div>

        <div key={'R' + idx} style={{
          position: 'relative',
          width: '100%',
          maxWidth: isMobile ? '100%' : 460,
          justifySelf: isMobile ? 'stretch' : 'end',
          aspectRatio: isMobile ? '4/3' : '0.86 / 1',
          animation: 'lp-fadein 800ms cubic-bezier(.2,.7,.2,1)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `#E6E0D3 url(${slide.image}) center/cover no-repeat`,
            borderRadius: 12,
            boxShadow: '0 30px 80px -40px rgba(43,39,34,0.35)',
            overflow: 'hidden',
          }} />

          <div style={{
            position: 'absolute', left: 18, bottom: 18,
            background: t.bg, color: t.fg,
            padding: '14px 18px',
            borderLeft: `2px solid ${t.accent}`,
            maxWidth: 240,
          }}>
            <div className="kicker" style={{ color: t.accent, marginBottom: 4 }}>{slide.caption.eyebrow}</div>
            <div className="serif" style={{ fontSize: 20, lineHeight: 1.15, color: t.fg }}>{slide.caption.title}</div>
            <div style={{ color: t.muted, marginTop: 2, fontSize: 12 }}>{slide.caption.sub}</div>
          </div>
        </div>
      </div>

      <div className="shell-wide" style={{
        position: 'relative', zIndex: 10,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr auto' : 'minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr)',
        alignItems: 'center', gap: 16,
        padding: '16px 0 20px',
        borderTop: `1px solid ${t.rule}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span className="serif" style={{ fontStyle: 'italic', fontSize: isMobile ? 28 : 40, color: t.fg, lineHeight: 1 }}>
            0{idx + 1}
          </span>
          {!isMobile && (
            <span style={{ letterSpacing: '0.26em', textTransform: 'uppercase', color: t.muted, fontSize: 13 }}>
              / 0{total} · {slide.id === 'natal' ? 'Natal' : slide.id === 'estacoes' ? 'Estações' : 'Para empresas'}
            </span>
          )}
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                aria-label={`Ir para slide ${i + 1}`}
                style={{
                  width: i === idx ? 42 : 10, height: 10, padding: 0,
                  background: i === idx ? t.accent : t.rule,
                  border: 'none', borderRadius: 999,
                  cursor: 'pointer',
                  transition: 'all 360ms cubic-bezier(.2,.7,.2,1)',
                }}
              />
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: isMobile ? 10 : 18 }}>
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => go(i)}
                  aria-label={`Ir para slide ${i + 1}`}
                  style={{
                    width: i === idx ? 28 : 8, height: 8, padding: 0,
                    background: i === idx ? t.accent : t.rule,
                    border: 'none', borderRadius: 999,
                    cursor: 'pointer',
                    transition: 'all 360ms cubic-bezier(.2,.7,.2,1)',
                  }}
                />
              ))}
            </div>
          )}
          {!isMobile && (
            <span style={{ letterSpacing: '0.28em', textTransform: 'uppercase', color: t.muted, fontSize: 10 }}>
              {paused ? 'Pausado' : 'Auto'}
            </span>
          )}
          <button onClick={() => go(idx - 1)} aria-label="Anterior" style={arrowBtn(t)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button onClick={() => go(idx + 1)} aria-label="Próximo" style={arrowBtn(t)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
