import { useState } from 'react'
import { PRODUCTS } from '../../data'
import { ProductCard } from '../ui/ProductCard'
import { useIsMobile } from '../../hooks/useIsMobile'

const TABS = ['Tudo', 'Sala', 'Escritório', 'Cozinha', 'Crianças', 'Decoração']

export function Products() {
  const [tab, setTab] = useState('Tudo')
  const isMobile = useIsMobile()
  const filtered = (tab === 'Tudo' ? PRODUCTS : PRODUCTS.filter(p => p.collection === tab)).slice(0, 8)

  return (
    <section id="colecoes" style={{ padding: '130px 0' }}>
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="kicker">03 — Coleção em destaque</span>
            <h2 style={{ fontSize: 'clamp(36px, 7vw, 88px)' }}>
              <em style={{ fontStyle: 'italic', fontSize: 'clamp(36px, 7vw, 88px)' }}>Estações</em> —<br />
              objetos para se viver.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
            <p style={{ color: 'var(--ink-soft)', maxWidth: 320, margin: 0, textAlign: 'right', fontSize: 20 }}>
              Uma seleção curada do que melhor traduz o nosso pensamento esta temporada.
            </p>
            <a href="#" className="btn-ghost" style={{ fontSize: 19 }}>Loja completa — 287 peças</a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 48, borderBottom: '1px solid var(--rule)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: 'none', border: 'none',
                padding: '14px 18px',
                fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: tab === t ? 'var(--ink)' : 'var(--ink-mute)',
                fontWeight: tab === t ? 500 : 400,
                borderBottom: tab === t ? '1px solid var(--terracotta)' : '1px solid transparent',
                marginBottom: -1,
                transition: 'all 220ms ease',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', alignSelf: 'center', color: 'var(--ink-mute)', fontSize: 12, paddingRight: 4 }}>
            {filtered.length} peças mostradas
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isMobile ? 16 : 28, gridAutoRows: 'auto' }}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              style={{
                gridColumn: (!isMobile && i === 0) ? 'span 2' : 'span 1',
                gridRow: (!isMobile && i === 0) ? 'span 2' : 'span 1',
              }}
            >
              <ProductCard product={p} big={!isMobile && i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
