import { useState } from 'react'
import type { Product } from '../../data'
import { useFavorites } from '../../context/FavoritesContext'

type Props = {
  product: Product
  big?: boolean
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.6"
    >
      <path d="M12 21s-7-4.5-9-9.5C1.5 7 5 4 8 4c2 0 3 1 4 2 1-1 2-2 4-2 3 0 6.5 3 5 7.5-2 5-9 9.5-9 9.5z" />
    </svg>
  )
}

export function ProductCard({ product: p, big = false }: Props) {
  const [hover, setHover] = useState(false)
  const { isFav, toggle } = useFavorites()
  const fav = isFav(p.id)

  const tagColor = p.tag === 'NOVO'
    ? 'var(--terracotta)'
    : p.tag === 'PERSONALIZÁVEL'
      ? 'var(--ink)'
      : 'var(--olive)'

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <div className="surface" style={{ aspectRatio: big ? '4/5' : '3.4/4', position: 'relative', background: 'var(--linen)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `url(${p.img}) center/cover no-repeat`,
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)',
          filter: 'saturate(0.95)',
        }} />

        {p.tag && (
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: tagColor, color: '#fff',
            fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
            padding: '6px 10px', borderRadius: 999,
          }}>
            {p.tag}
          </div>
        )}

        {/* Heart — always visible */}
        <button
          onClick={e => { e.stopPropagation(); toggle(p.id) }}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 34, height: 34, borderRadius: '50%',
            background: fav ? 'var(--ink)' : 'rgba(255,255,255,0.92)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: fav ? '#fff' : 'var(--ink)',
            transition: 'all 180ms ease',
            boxShadow: '0 2px 8px rgba(43,39,34,0.10)',
          }}
          aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <HeartIcon filled={fav} />
        </button>

        <div style={{
          position: 'absolute', left: 14, right: 14, bottom: 14,
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 240ms ease',
        }}>
          <button
            className="btn btn-solid"
            style={{ width: '100%', padding: '12px 14px', fontSize: 10, justifyContent: 'center' }}
          >
            Adicionar — €{p.price}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14, gap: 12 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 4, fontSize: 9 }}>{p.collection}</div>
          <div className="serif" style={{ fontSize: big ? 22 : 18, lineHeight: 1.15 }}>{p.name}</div>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: big ? 22 : 18, color: 'var(--ink)' }}>€{p.price}</div>
      </div>
    </div>
  )
}
