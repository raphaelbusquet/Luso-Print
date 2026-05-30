import { useEffect, useState } from 'react'
import { useFavorites } from '../../context/FavoritesContext'
import { ALL_SHOP_PRODUCTS } from '../../data/shop'
import { MUNDIAL_PRODUCTS } from '../../data/mundial'
import { ProductModal } from './ProductModal'
import type { ShopProduct } from '../../data/shop'

type Props = { open: boolean; onClose: () => void }

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

export function FavoritesDrawer({ open, onClose }: Props) {
  const { favIds, toggle } = useFavorites()
  const [removed, setRemoved] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null)

  const items = [...ALL_SHOP_PRODUCTS, ...MUNDIAL_PRODUCTS].filter(p => favIds.includes(p.id))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !selectedProduct) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, selectedProduct])

  const handleRemove = (id: string) => {
    setRemoved(id)
    setTimeout(() => {
      toggle(id)
      setRemoved(null)
    }, 260)
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 150,
          background: 'rgba(43,39,34,0.4)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 300ms ease',
        }}
      />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 151,
        width: '100%', maxWidth: 440,
        background: 'var(--paper)',
        boxShadow: '-40px 0 80px -20px rgba(43,39,34,0.22)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 340ms cubic-bezier(.2,.7,.2,1)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px 20px',
          borderBottom: '1px solid var(--rule)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 4 }}>
              Lusoprint
            </div>
            <h2 className="serif" style={{ margin: 0, fontSize: 28, fontWeight: 400, lineHeight: 1 }}>
              Favoritos
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--ink-mute)', fontSize: 22, lineHeight: 1 }}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>♡</div>
              <p className="serif" style={{ fontSize: 22, fontStyle: 'italic', color: 'var(--ink-soft)', margin: 0 }}>
                Nenhum favorito ainda.
              </p>
              <p style={{ fontSize: 14, color: 'var(--ink-mute)', marginTop: 10, lineHeight: 1.6 }}>
                Explore os universos e guarde as peças que mais gosta.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--paper-2)',
                    border: '1px solid var(--rule)',
                    borderRadius: 4, padding: '14px 16px',
                    display: 'flex', gap: 14, alignItems: 'center',
                    opacity: removed === item.id ? 0 : 1,
                    transform: removed === item.id ? 'translateX(12px)' : 'none',
                    transition: 'opacity 260ms ease, transform 260ms ease',
                  }}
                >
                  {/* Thumb */}
                  <div
                    onClick={() => setSelectedProduct(item)}
                    style={{
                      flexShrink: 0, width: 62, height: 72, borderRadius: 2,
                      background: item.img
                        ? `url(${item.img}) center/cover no-repeat, var(--linen)`
                        : 'var(--linen)',
                      border: '1px solid var(--rule)',
                      cursor: 'pointer', transition: 'opacity 150ms',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {!item.img && (
                      <span style={{ fontSize: 22, color: 'var(--ink-mute)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
                        {item.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="serif" style={{ fontSize: 18, fontStyle: 'italic', lineHeight: 1.15, marginBottom: 4 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.06em' }}>
                      €{item.price}
                    </div>
                  </div>

                  {/* Heart remove */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
                      background: 'var(--ink)', color: '#fff',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 180ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
                    aria-label="Remover dos favoritos"
                  >
                    <HeartIcon filled />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '16px 28px 28px',
            borderTop: '1px solid var(--rule)',
            flexShrink: 0,
            fontSize: 12, color: 'var(--ink-mute)', letterSpacing: '0.06em',
          }}>
            {items.length} {items.length === 1 ? 'peça guardada' : 'peças guardadas'}
          </div>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
