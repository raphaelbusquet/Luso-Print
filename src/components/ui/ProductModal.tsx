import { useState, useEffect, useRef } from 'react'
import { useFavorites } from '../../context/FavoritesContext'
import { useCart } from '../../context/CartContext'
import { UNIVERSOS } from '../../data'
import { useIsMobile } from '../../hooks/useIsMobile'
import type { ShopProduct } from '../../data/shop'

type Props = {
  product: ShopProduct | null
  onClose: () => void
}

const TAG_COLOR: Record<string, string> = {
  'NOVO':            'var(--terracotta)',
  'PERSONALIZÁVEL':  'var(--ink)',
  'EDIÇÃO LIMITADA': 'var(--olive)',
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="1.5"
    >
      <path d="M12 21s-7-4.5-9-9.5C1.5 7 5 4 8 4c2 0 3 1 4 2 1-1 2-2 4-2 3 0 6.5 3 5 7.5-2 5-9 9.5-9 9.5z" />
    </svg>
  )
}

const NOME_IDS = new Set(['bebes-heitor-dino', 'bebes-cecilia', 'bebes-arco-iris', 'bebes-escrita-sophia', 'bebes-porta-maternidade'])

const IDADES = ['Bebé (0–2)', 'Pequenino (3–6)', 'Criança (7–12)', 'Adolescente (13+)']

function FamilyConfig({ value, onChange }: {
  value: { pai: boolean; mae: boolean; criancas: string[] }
  onChange: (v: { pai: boolean; mae: boolean; criancas: string[] }) => void
}) {
  const toggle = (key: 'pai' | 'mae') => onChange({ ...value, [key]: !value[key] })
  const setCriancas = (n: number) => {
    const arr = value.criancas.slice(0, n)
    while (arr.length < n) arr.push(IDADES[2])
    onChange({ ...value, criancas: arr })
  }
  const setIdade = (i: number, v: string) => {
    const arr = [...value.criancas]; arr[i] = v
    onChange({ ...value, criancas: arr })
  }
  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 14px', borderRadius: 999, fontSize: 11,
    letterSpacing: '0.14em', textTransform: 'uppercase' as const,
    cursor: 'pointer', transition: 'all 160ms',
    background: active ? 'var(--ink)' : 'transparent',
    color: active ? '#fff' : 'var(--ink-soft)',
    border: active ? '1px solid var(--ink)' : '1px solid var(--rule)',
  })
  const nothingConfigured = !value.pai && !value.mae && value.criancas.length === 0

  return (
    <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 14, marginBottom: 14 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 10 }}>
        Configuração da família
      </div>

      {nothingConfigured && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 8,
          background: 'rgba(201,130,110,0.10)', border: '1px solid rgba(201,130,110,0.3)',
          borderRadius: 6, padding: '10px 12px', marginBottom: 12,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: 11, color: 'var(--terracotta)', lineHeight: 1.5 }}>
            Escolha os membros da família antes de adicionar ao cesto.
          </span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <button style={btnStyle(value.pai)} onClick={() => toggle('pai')}>Pai</button>
        <button style={btnStyle(value.mae)} onClick={() => toggle('mae')}>Mãe</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>Crianças</span>
        <button onClick={() => setCriancas(Math.max(0, value.criancas.length - 1))}
          style={{ width: 26, height: 26, border: '1px solid var(--rule)', borderRadius: '3px 0 0 3px', background: 'transparent', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}>−</button>
        <span style={{ width: 28, textAlign: 'center', fontSize: 13 }}>{value.criancas.length}</span>
        <button onClick={() => setCriancas(value.criancas.length + 1)}
          style={{ width: 26, height: 26, border: '1px solid var(--rule)', borderRadius: '0 3px 3px 0', background: 'transparent', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}>+</button>
      </div>
      {value.criancas.map((idade, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--ink-mute)', minWidth: 60 }}>Criança {i + 1}</span>
          <select value={idade} onChange={e => setIdade(i, e.target.value)}
            style={{ flex: 1, padding: '5px 8px', border: '1px solid var(--rule)', borderRadius: 4, fontSize: 11, background: 'var(--paper)', color: 'var(--ink)', outline: 'none' }}>
            {IDADES.map(op => <option key={op} value={op}>{op}</option>)}
          </select>
        </div>
      ))}
    </div>
  )
}

export function ProductModal({ product: p, onClose }: Props) {
  const { isFav, toggle } = useFavorites()
  const { addItem, items } = useCart()
  const isMobile = useIsMobile()
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [qtyModified, setQtyModified] = useState(false)
  const [familyConfig, setFamilyConfig] = useState({ pai: false, mae: false, criancas: [] as string[] })
  const [childName, setChildName] = useState('')
  const swipeStartX = useRef<number | null>(null)

  const isFamilyProduct = p?.id === 'familia-estatua-familia' || p?.id === 'familia-estatua-fams2'
  const isNameProduct = p ? NOME_IDS.has(p.id) : false
  const familyNotConfigured = isFamilyProduct && !familyConfig.pai && !familyConfig.mae && familyConfig.criancas.length === 0
  const nameNotProvided = isNameProduct && childName.trim() === ''

  useEffect(() => {
    setActiveImg(0)
    setQty(1)
    setQtyModified(false)
    setFamilyConfig({ pai: true, mae: true, criancas: [] })
    setChildName('')
  }, [p?.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowRight') setActiveImg(i => (i + 1) % 4)
      if (e.key === 'ArrowLeft')  setActiveImg(i => (i + 3) % 4)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (p) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [p])

  if (!p) return null

  const fav = isFav(p.id)
  const inCart = items.some(i => i.productId === p.id)
  const btnDisabled = inCart && !qtyModified
  const needsValidation = !inCart || qtyModified
  const addBlocked = needsValidation && (familyNotConfigured || nameNotProvided)
  const universo = UNIVERSOS.find(u => u.id === p.universoId)
  const photos = p.imgs ?? [p.img, p.img, p.img, p.img]

  const handleAdd = () => {
    if (addBlocked || btnDisabled) return
    let note: string | undefined
    if (isFamilyProduct) {
      const membros = [
        familyConfig.pai && 'Pai',
        familyConfig.mae && 'Mãe',
        ...familyConfig.criancas.map((id, i) => `Criança ${i + 1}: ${id}`),
      ].filter(Boolean).join(' · ')
      note = membros || undefined
    }
    if (isNameProduct && childName.trim()) {
      note = `Nome: ${childName.trim()}`
    }
    addItem({ name: p.name, price: p.price, img: p.img, productId: p.id, note }, qty)
    setQtyModified(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(43,39,34,0.55)',
          backdropFilter: 'blur(6px)',
          animation: 'lp-fadein 200ms ease',
        }}
      />

      {/* Modal — outer div handles centering, inner handles animation */}
      <div style={{
        position: 'fixed', zIndex: 301,
        top: isMobile ? 0 : '50%',
        left: isMobile ? 0 : '50%',
        right: isMobile ? 0 : undefined,
        bottom: isMobile ? 0 : undefined,
        transform: isMobile ? 'none' : 'translate(-50%, -50%)',
        width: isMobile ? '100%' : 'min(960px, 96vw)',
        height: isMobile ? '100%' : 'min(600px, 92vh)',
      }}>
      <div style={{
        width: '100%', height: '100%',
        background: 'var(--paper)',
        borderRadius: isMobile ? 0 : 6,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        boxShadow: '0 32px 80px -12px rgba(43,39,34,0.35)',
        animation: 'modal-in 260ms cubic-bezier(.2,.7,.2,1)',
      }}>

        {/* Left — photos */}
        <div style={{ width: isMobile ? '100%' : '54%', flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--linen)', ...(isMobile ? { height: '42%', flexShrink: 0 } : {}) }}>
          {/* Main photo */}
          <div
            style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
            onTouchStart={e => { swipeStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
              if (swipeStartX.current === null) return
              const dx = e.changedTouches[0].clientX - swipeStartX.current
              swipeStartX.current = null
              if (Math.abs(dx) < 40) return
              const total = photos.length
              if (dx < 0) setActiveImg(i => (i + 1) % total)
              else setActiveImg(i => (i - 1 + total) % total)
            }}
          >
            {photos.map((img, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute', inset: 0,
                  background: `url(${img}) center/cover no-repeat`,
                  opacity: activeImg === i ? 1 : 0,
                  transition: 'opacity 220ms ease',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Dot indicators — mobile only */}
            {isMobile && photos.length > 1 && (
              <div style={{
                position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 6, zIndex: 2,
              }}>
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      width: activeImg === i ? 20 : 7, height: 7,
                      borderRadius: 999, padding: 0, border: 'none', cursor: 'pointer',
                      background: activeImg === i ? 'var(--ink)' : 'rgba(43,39,34,0.3)',
                      transition: 'all 220ms ease',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails — desktop only */}
          {!isMobile && (
          <div style={{
            display: 'flex', gap: 6, padding: '8px 10px',
            background: 'rgba(43,39,34,0.04)',
            borderTop: '1px solid var(--rule)',
          }}>
            {photos.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: 52, height: 52, flexShrink: 0,
                  background: `url(${img}) center/cover no-repeat, var(--linen)`,
                  border: activeImg === i ? '2px solid var(--ink)' : '2px solid transparent',
                  borderRadius: 3, cursor: 'pointer', padding: 0,
                  transition: 'border-color 160ms',
                  outline: 'none',
                }}
                aria-label={`Foto ${i + 1}`}
              />
            ))}
          </div>
          )}
        </div>

        {/* Right — info */}
        <div style={{
          flex: 1, padding: isMobile ? '16px 20px 24px' : '24px 30px', overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--linen)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink-soft)', fontSize: 20, lineHeight: 1,
              transition: 'background 160ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--rule)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--linen)')}
            aria-label="Fechar"
          >
            ×
          </button>

          {/* Breadcrumb */}
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 12 }}>
            {universo?.nome ?? 'Loja'}
          </div>

          {/* Name */}
          <h2 className="serif" style={{ margin: '0 0 4px', fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 400, lineHeight: 1.05 }}>
            {p.name}
          </h2>

          {/* Price + tag inline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '8px 0 20px' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--ink)' }}>€{p.price}</div>
            {p.tag && (
              <span style={{
                background: TAG_COLOR[p.tag] ?? 'rgba(43,39,34,0.55)',
                color: '#fff', fontSize: 9, letterSpacing: '0.26em',
                textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999,
              }}>
                {p.tag}
              </span>
            )}
          </div>

          {/* Details list */}
          <div style={{ borderTop: '1px solid var(--rule)', marginBottom: 20 }}>
            {[
              ['Material', 'PLA reciclável'],
              ['Acabamento', 'Lixado suave'],
              ['Entrega', '5–10 dias úteis'],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: '1px solid var(--rule)',
                fontSize: 12,
              }}>
                <span style={{ color: 'var(--ink-mute)', letterSpacing: '0.06em' }}>{label}</span>
                <span style={{ color: 'var(--ink)' }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Name field for personalizable products */}
          {isNameProduct && (
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 14, marginBottom: 14 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 10 }}>
                Nome da criança
              </div>
              <input
                type="text"
                value={childName}
                onChange={e => { setChildName(e.target.value); setQtyModified(true) }}
                placeholder="Ex: Heitor, Maria, João…"
                style={{
                  width: '100%', padding: '10px 14px',
                  border: '1px solid var(--rule)', borderRadius: 4,
                  fontSize: 13, color: 'var(--ink)', background: 'var(--paper)',
                  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 160ms',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--terracotta)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
              />
              {nameNotProvided && needsValidation && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  marginTop: 8, fontSize: 11, color: 'var(--terracotta)', lineHeight: 1.4,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Indique o nome antes de adicionar ao cesto.
                </div>
              )}
            </div>
          )}

          {/* Family configurator */}
          {isFamilyProduct && (
            <FamilyConfig value={familyConfig} onChange={v => { setFamilyConfig(v); setQtyModified(true) }} />
          )}

          {/* Actions */}
          <div style={{ marginTop: 'auto' }}>
            {!isFamilyProduct && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
                  Quantidade
                </span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => { setQty(q => Math.max(1, q - 1)); setQtyModified(true) }}
                    style={{
                      width: 30, height: 30, border: '1px solid var(--rule)',
                      borderRadius: '3px 0 0 3px', background: 'transparent',
                      cursor: 'pointer', color: 'var(--ink)', fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >−</button>
                  <div style={{
                    width: 40, height: 30, border: '1px solid var(--rule)',
                    borderLeft: 'none', borderRight: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, color: 'var(--ink)',
                  }}>
                    {qty}
                  </div>
                  <button
                    onClick={() => { setQty(q => q + 1); setQtyModified(true) }}
                    style={{
                      width: 30, height: 30, border: '1px solid var(--rule)',
                      borderRadius: '0 3px 3px 0', background: 'transparent',
                      cursor: 'pointer', color: 'var(--ink)', fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >+</button>
                </div>
                {qty > 1 && (
                  <span style={{ fontSize: 13, color: 'var(--ink-mute)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
                    €{(p.price * qty).toFixed(2).replace('.00', '')} total
                  </span>
                )}
              </div>
            )}
            <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleAdd}
              disabled={addBlocked}
              style={{
                flex: 1, padding: '15px 20px',
                background: addBlocked ? 'var(--rule)' : btnDisabled ? 'var(--terracotta)' : 'var(--ink)',
                color: addBlocked ? 'var(--ink-mute)' : '#fff', border: 'none',
                cursor: addBlocked || btnDisabled ? 'default' : 'pointer',
                borderRadius: 999,
                fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                fontFamily: 'inherit',
                transition: 'background 200ms ease',
              }}
            >
              {btnDisabled ? 'No cesto ✓' : `Adicionar ao cesto — €${p.price * qty}`}
            </button>

            <button
              onClick={() => toggle(p.id)}
              style={{
                width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                background: fav ? 'var(--ink)' : 'transparent',
                border: fav ? 'none' : '1px solid var(--rule)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: fav ? '#fff' : 'var(--ink)',
                transition: 'all 180ms ease',
              }}
              onMouseEnter={e => {
                if (!fav) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ink)'
              }}
              onMouseLeave={e => {
                if (!fav) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--rule)'
              }}
              aria-label={fav ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
            >
              <HeartIcon filled={fav} />
            </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
