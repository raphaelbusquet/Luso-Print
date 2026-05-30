import { useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { UNIVERSOS } from '../data'
import { ALL_SHOP_PRODUCTS, VISUAL_COLORS } from '../data/shop'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'
import { Announce } from '../components/layout/Announce'
import { Nav } from '../components/layout/Nav'
import { AuthModal } from '../components/ui/AuthModal'
import { CartDrawer } from '../components/ui/CartDrawer'
import { FavoritesDrawer } from '../components/ui/FavoritesDrawer'
import { ProductModal } from '../components/ui/ProductModal'
import { useIsMobile } from '../hooks/useIsMobile'
import type { ShopProduct } from '../data/shop'

const TAG_COLOR: Record<string, string> = {
  'NOVO':            'var(--terracotta)',
  'PERSONALIZÁVEL':  'var(--ink)',
  'EDIÇÃO LIMITADA': 'var(--olive)',
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.6"
    >
      <path d="M12 21s-7-4.5-9-9.5C1.5 7 5 4 8 4c2 0 3 1 4 2 1-1 2-2 4-2 3 0 6.5 3 5 7.5-2 5-9 9.5-9 9.5z" />
    </svg>
  )
}

function ShopCard({ product: p, onOpen }: { product: ShopProduct; onOpen: () => void }) {
  const { isFav, toggle } = useFavorites()
  const { addItem, items } = useCart()
  const [hover, setHover] = useState(false)
  const fav = isFav(p.id)
  const inCart = items.some(i => i.productId === p.id)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <div
        onClick={onOpen}
        style={{
          aspectRatio: '4/5', position: 'relative',
          background: 'var(--linen)', overflow: 'hidden', borderRadius: 3,
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: `url(${p.img}) center/cover no-repeat`,
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)',
          filter: 'saturate(0.93)',
        }} />

        {p.tag && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: TAG_COLOR[p.tag] ?? 'rgba(43,39,34,0.55)',
            color: '#fff',
            fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
            padding: '5px 10px', borderRadius: 999,
          }}>
            {p.tag}
          </div>
        )}

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
          position: 'absolute', left: 12, right: 12, bottom: 12,
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 220ms ease',
        }}>
          <button
            onClick={e => {
              e.stopPropagation()
              if (inCart) return
              addItem({ name: p.name, price: p.price, img: p.img, productId: p.id })
            }}
            style={{
              width: '100%', padding: '11px 14px',
              background: inCart ? 'var(--terracotta)' : 'var(--ink)',
              color: '#fff', border: 'none',
              cursor: inCart ? 'default' : 'pointer',
              borderRadius: 999,
              fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: 'inherit',
              transition: 'background 200ms ease',
            }}
          >
            {inCart ? 'No cesto ✓' : `Adicionar — €${p.price}`}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <div className="serif" style={{ fontSize: 17, lineHeight: 1.2 }}>{p.name}</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 17, flexShrink: 0 }}>€{p.price}</div>
      </div>
    </div>
  )
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: 24, marginBottom: 24 }}>
      <div style={{
        fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
        color: 'var(--ink-mute)', fontWeight: 500, marginBottom: 14,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

const TAG_LABELS: Record<string, string> = {
  'NOVO':            'Novidades',
  'EDIÇÃO LIMITADA': 'Edição Limitada',
}

export function ShopPage() {
  const { universoId } = useParams<{ universoId?: string }>()
  const [searchParams] = useSearchParams()
  const { count: cartCount } = useCart()
  const isMobile = useIsMobile()
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null)

  const [selUniversos, setSelUniversos] = useState<string[]>(
    universoId ? [universoId] : []
  )
  const [selColors, setSelColors] = useState<string[]>([])
  const [selTag, setSelTag] = useState<string>(searchParams.get('tag') ?? '')

  const toggleU = (id: string) =>
    setSelUniversos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleC = (name: string) =>
    setSelColors(prev => prev.includes(name) ? [] : [name])
  const toggleTag = (tag: string) =>
    setSelTag(prev => prev === tag ? '' : tag)

  const filtered = ALL_SHOP_PRODUCTS.filter(p => {
    const uOk = selUniversos.length === 0 || selUniversos.includes(p.universoId)
    const cOk = selColors.length === 0 || p.dominantColors.some(c => selColors.includes(c))
    const tOk = selTag === '' || p.tag === selTag
    return uOk && cOk && tOk
  })

  const activeFilters = selUniversos.length + selColors.length + (selTag ? 1 : 0)
  const pageTitle = 'Loja'

  return (
    <div>
      <Announce />
      <Nav
        onOpenAuth={() => setAuthOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavsOpen(true)}
        cartCount={cartCount}
      />

      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '16px 0' : '28px 0' }}>
        <div className="shell-wide" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link
            to="/#universos"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ink-soft)', transition: 'color 160ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-soft)')}
          >
            ← Universos
          </Link>

          <div style={{ textAlign: 'center' }}>
            <div className="kicker" style={{ marginBottom: 4 }}>Lusoprint</div>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1 }}>{pageTitle}</div>
          </div>

          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
            {filtered.length} peças
          </div>
        </div>
      </div>

      {/* Mobile filter toggle */}
      {isMobile && (
        <div className="shell-wide" style={{ padding: '16px 0 0' }}>
          <button
            onClick={() => setFiltersOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: '1px solid var(--rule)', borderRadius: 999,
              padding: '9px 18px', cursor: 'pointer',
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ink-soft)', fontFamily: 'inherit',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Filtros {activeFilters > 0 ? `(${activeFilters})` : ''}
          </button>
        </div>
      )}

      {/* Body */}
      <div className="shell-wide" style={{ padding: isMobile ? '20px 0 80px' : '48px 0 120px', display: 'flex', gap: 52, alignItems: 'flex-start' }}>

        {/* Sidebar */}
        {(!isMobile || filtersOpen) && (
        <aside style={{
          width: isMobile ? '100%' : 210, flexShrink: 0,
          position: isMobile ? 'static' : 'sticky', top: 120,
          marginBottom: isMobile ? 24 : 0,
        }}>
          {isMobile && (
            <button
              onClick={() => setFiltersOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', marginBottom: 20,
                background: 'none', border: 'none', padding: '10px 0',
                borderBottom: '1px solid var(--rule)',
                cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--ink-soft)',
              }}
            >
              <span>Filtros</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          {activeFilters > 0 && (
            <button
              onClick={() => { setSelUniversos([]); setSelColors([]); setSelTag('') }}
              style={{
                width: '100%', marginBottom: 24,
                background: 'none', border: '1px solid var(--rule)',
                borderRadius: 999, padding: '8px 14px',
                fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'border-color 180ms, color 180ms',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.borderColor = 'var(--terracotta)'
                b.style.color = 'var(--terracotta)'
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.borderColor = 'var(--rule)'
                b.style.color = 'var(--ink-soft)'
              }}
            >
              × Limpar {activeFilters} {activeFilters === 1 ? 'filtro' : 'filtros'}
            </button>
          )}

          <FilterBlock title="Novidades">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.entries(TAG_LABELS).map(([tag, label]) => {
                const active = selTag === tag
                const cnt = ALL_SHOP_PRODUCTS.filter(p => p.tag === tag).length
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none', padding: '7px 0',
                      cursor: 'pointer', fontFamily: 'inherit',
                      color: active ? 'var(--ink)' : 'var(--ink-soft)',
                      transition: 'color 160ms', textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 3,
                        border: active ? '2px solid var(--ink)' : '1px solid var(--rule)',
                        background: active ? 'var(--ink)' : 'transparent',
                        flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 160ms',
                      }}>
                        {active && (
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.8">
                            <path d="M2 5l2.5 2.5L8 3" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: 13 }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{cnt}</span>
                  </button>
                )
              })}
            </div>
          </FilterBlock>

          <FilterBlock title="Universo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {UNIVERSOS.map(u => {
                const active = selUniversos.includes(u.id)
                const cnt = ALL_SHOP_PRODUCTS.filter(p => p.universoId === u.id).length
                return (
                  <button
                    key={u.id}
                    onClick={() => toggleU(u.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none', padding: '7px 0',
                      cursor: 'pointer', fontFamily: 'inherit',
                      color: active ? 'var(--ink)' : 'var(--ink-soft)',
                      transition: 'color 160ms', textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 3,
                        border: active ? '2px solid var(--ink)' : '1px solid var(--rule)',
                        background: active ? 'var(--ink)' : 'transparent',
                        flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 160ms',
                      }}>
                        {active && (
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.8">
                            <path d="M2 5l2.5 2.5L8 3" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: 13 }}>{u.nome}</span>
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{cnt}</span>
                  </button>
                )
              })}
            </div>
          </FilterBlock>

          <FilterBlock title="Cor">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {VISUAL_COLORS.map(c => {
                const active = selColors.includes(c.name)
                return (
                  <button
                    key={c.name}
                    onClick={() => toggleC(c.name)}
                    title={c.name}
                    style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: c.hex,
                      outline: active ? '2px solid var(--ink)' : '2px solid transparent',
                      outlineOffset: 2,
                      transition: 'outline 160ms',
                      boxShadow: c.name === 'branco' ? 'inset 0 0 0 1px rgba(43,39,34,0.18)' : '0 1px 3px rgba(43,39,34,0.10)',
                      border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
                    }}
                    aria-label={c.name}
                    aria-pressed={active}
                  />
                )
              })}
            </div>
            <div style={{ marginTop: 10, height: 14 }}>
              {selColors.length > 0 && (
                <span style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--ink-soft)', textTransform: 'capitalize' }}>
                  {selColors[0]}
                </span>
              )}
            </div>
          </FilterBlock>

          {isMobile && (
            <button
              onClick={() => setFiltersOpen(false)}
              style={{
                marginTop: 28, width: '100%',
                padding: '14px', borderRadius: 999,
                background: 'var(--ink)', color: 'var(--paper)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
              }}
            >
              Ver tudo {filtered.length > 0 ? `(${filtered.length})` : ''} →
            </button>
          )}
        </aside>
        )}

        {/* Products */}
        {(!isMobile || !filtersOpen) && (
        <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
          {filtered.length === 0 ? (
            <div style={{ paddingTop: 80, textAlign: 'center' }}>
              <p className="serif" style={{ fontSize: 24, fontStyle: 'italic', color: 'var(--ink-soft)' }}>
                Nenhuma peça encontrada.
              </p>
              <button
                onClick={() => { setSelUniversos([]); setSelColors([]); setSelTag('') }}
                style={{
                  marginTop: 16, background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'var(--terracotta)', fontFamily: 'inherit',
                }}
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))',
              gap: isMobile ? '24px 14px' : '36px 24px',
            }}>
              {filtered.map(p => <ShopCard key={p.id} product={p} onOpen={() => setSelectedProduct(p)} />)}
            </div>
          )}
        </main>
        )}
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}
