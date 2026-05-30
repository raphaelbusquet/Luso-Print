import { useState, useEffect, useRef } from 'react'
import { useFavorites } from '../../context/FavoritesContext'
import { useCart } from '../../context/CartContext'
import { UNIVERSOS } from '../../data'
import { useIsMobile } from '../../hooks/useIsMobile'
import { VISUAL_COLORS } from '../../data/shop'
import type { ShopProduct } from '../../data/shop'
import { useMaterials } from '../../context/MaterialsContext'
import { supabase } from '../../lib/supabase'

const COLOR_HEX: Record<string, string> = Object.fromEntries(VISUAL_COLORS.map(c => [c.name, c.hex]))

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
  const { isColorAvailable } = useMaterials()
  const isMobile = useIsMobile()
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [qtyModified, setQtyModified] = useState(false)
  const [familyConfig, setFamilyConfig] = useState({ pai: false, mae: false, criancas: [] as string[] })
  const [childName, setChildName] = useState('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [notifyState, setNotifyState] = useState<'idle' | 'open' | 'sending' | 'done'>('idle')
  const [notifyEmail, setNotifyEmail] = useState('')
  const swipeStartX = useRef<number | null>(null)

  const isFamilyProduct = p?.id === 'familia-estatua-familia' || p?.id === 'familia-estatua-fams2'
  const isNameProduct = p ? NOME_IDS.has(p.id) : false
  const familyNotConfigured = isFamilyProduct && !familyConfig.pai && !familyConfig.mae && familyConfig.criancas.length === 0
  const nameNotProvided = isNameProduct && childName.trim() === ''
  const selectedColorOption = p?.colorOptions?.find(c => c.color === selectedColor)
  const colorUnavailable = selectedColorOption ? !isColorAvailable(selectedColor, selectedColorOption.materials) : false

  useEffect(() => {
    setActiveImg(0)
    setQty(1)
    setQtyModified(false)
    setFamilyConfig({ pai: true, mae: true, criancas: [] })
    setChildName('')
    setSelectedColor(p?.colorOptions?.[0]?.color ?? '')
    setNotifyState('idle')
    setNotifyEmail('')
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
  const addBlocked = colorUnavailable || (needsValidation && (familyNotConfigured || nameNotProvided))
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
    if (selectedColor && p.colorOptions && p.colorOptions.length > 1) {
      note = note ? `${note} · Cor: ${selectedColor}` : `Cor: ${selectedColor}`
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

          {/* Color picker */}
          {p.colorOptions && p.colorOptions.length > 1 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 10 }}>
                Cor — <span style={{ textTransform: 'capitalize', letterSpacing: '0.04em', color: 'var(--ink-soft)' }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.colorOptions.map(c => {
                  const hex = COLOR_HEX[c.color] ?? '#C8B89A'
                  const isActive = selectedColor === c.color
                  const avail = isColorAvailable(c.color, c.materials)
                  return (
                    <button
                      key={c.color}
                      onClick={() => { setSelectedColor(c.color); setQtyModified(true); setNotifyState('idle'); setNotifyEmail('') }}
                      title={avail ? c.color : `${c.color} — indisponível`}
                      style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: hex,
                        outline: isActive ? '2px solid var(--ink)' : '2px solid transparent',
                        outlineOffset: 2,
                        border: c.color === 'branco' ? '1px solid rgba(43,39,34,0.18)' : 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'outline 160ms, opacity 160ms',
                        boxShadow: '0 1px 3px rgba(43,39,34,0.10)',
                        opacity: avail ? 1 : 0.35,
                        position: 'relative',
                      }}
                      aria-label={c.color}
                      aria-pressed={isActive}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Details list */}
          <div style={{ borderTop: '1px solid var(--rule)', marginBottom: 20 }}>
            {[
              ['Material', 'PLA Matte'],
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
              <div style={{ flex: 1 }}>
                {colorUnavailable ? (
                  notifyState === 'done' ? (
                    <div style={{
                      flex: 1, padding: '15px 20px', borderRadius: 999,
                      background: 'rgba(60,160,80,0.08)', border: '1px solid rgba(60,160,80,0.3)',
                      fontSize: 11, letterSpacing: '0.16em', color: 'rgb(50,140,70)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      Notificação registada ✓
                    </div>
                  ) : notifyState === 'open' || notifyState === 'sending' ? (
                    <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                      <input
                        type="email"
                        value={notifyEmail}
                        onChange={e => setNotifyEmail(e.target.value)}
                        onKeyDown={async e => {
                          if (e.key === 'Escape') { setNotifyState('idle'); return }
                          if (e.key === 'Enter' && notifyEmail.trim() && selectedColorOption) {
                            setNotifyState('sending')
                            for (const mat of selectedColorOption.materials) {
                              await supabase.from('stock_notifications').insert({ email: notifyEmail.trim(), material: mat, color: selectedColor, product_id: p.id, product_name: p.name })
                            }
                            setNotifyState('done')
                          }
                        }}
                        placeholder="O seu email"
                        autoFocus
                        style={{
                          flex: 1, padding: '0 16px', height: 52,
                          border: '1px solid var(--rule)', borderRadius: 999,
                          fontSize: 13, color: 'var(--ink)', background: 'var(--paper)',
                          fontFamily: 'inherit', outline: 'none',
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'var(--terracotta)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule)')}
                      />
                      <button
                        onClick={async () => {
                          if (!notifyEmail.trim() || !selectedColorOption) return
                          setNotifyState('sending')
                          for (const mat of selectedColorOption.materials) {
                            await supabase.from('stock_notifications').insert({ email: notifyEmail.trim(), material: mat, color: selectedColor, product_id: p.id, product_name: p.name })
                          }
                          setNotifyState('done')
                        }}
                        disabled={notifyState === 'sending' || !notifyEmail.trim()}
                        style={{
                          padding: '0 20px', height: 52, flexShrink: 0,
                          background: 'var(--ink)', color: '#fff',
                          border: 'none', borderRadius: 999, cursor: 'pointer',
                          fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                          fontFamily: 'inherit',
                        }}
                      >
                        {notifyState === 'sending' ? '…' : 'OK'}
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                      <button
                        disabled
                        style={{
                          flex: 1, padding: '15px 20px', whiteSpace: 'nowrap',
                          background: 'var(--rule)', color: 'var(--ink-mute)', border: 'none',
                          cursor: 'not-allowed', borderRadius: 999,
                          fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                          fontFamily: 'inherit',
                        }}
                      >
                        Cor sem stock
                      </button>
                      <button
                        onClick={() => setNotifyState('open')}
                        style={{
                          padding: '0 16px', height: 52, flexShrink: 0,
                          background: 'transparent', border: '1px solid var(--rule)',
                          borderRadius: 999, cursor: 'pointer',
                          fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                          color: 'var(--ink-soft)', fontFamily: 'inherit', whiteSpace: 'nowrap',
                          transition: 'border-color 160ms, color 160ms',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--ink-soft)' }}
                      >
                        Notificar
                      </button>
                    </div>
                  )
                ) : (
                  <button
                    onClick={handleAdd}
                    disabled={addBlocked}
                    style={{
                      width: '100%', padding: '15px 20px',
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
                )}
              </div>
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
