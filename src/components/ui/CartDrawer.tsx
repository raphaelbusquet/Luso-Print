import { translate as t, translateOrderNote } from '../../i18n/translate'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { ALL_SHOP_PRODUCTS } from '../../data/shop'
import { ProductModal } from './ProductModal'
import type { ShopProduct } from '../../data/shop'

type Props = { open: boolean; onClose: () => void }

export function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQty, clearCart, total, couponCode, discount, finalTotal, applyCoupon, removeCoupon, markCouponUsed } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponState, setCouponState] = useState<'idle' | 'loading' | 'valid' | 'invalid' | 'used' | 'error'>('idle')
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null)

  useEffect(() => {
    if (couponCode) setCouponState('valid')
  }, [couponCode])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !selectedProduct) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, selectedProduct])

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return
    setCouponState('loading')
    const result = await applyCoupon(couponInput)
    setCouponState(result)
    if (result === 'valid') setCouponInput('')
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponState('idle')
    setCouponInput('')
  }

  const handleOrder = async () => {
    const savings = discount > 0 ? `\n${t("Desconto (10%)")}: -€${(total - finalTotal).toFixed(2)}` : ''
    const lines = items.map((item, i) => {
      if (item.size) {
        const previewLine = item.previewUrl?.startsWith('http') ? `\n   Preview: ${item.previewUrl}` : ''
        return `${i + 1}. "${t(item.name)}" — ${item.size}cm — ${item.mono ? item.nomeColorName : `Inicial: ${item.letraColorName} / Nome: ${item.nomeColorName}`} — €${item.price}${item.qty > 1 ? ` x${item.qty}` : ''}${previewLine}`
      }
      const noteLine = item.note ? `\n   ${translateOrderNote(item.note)}` : ''
      return `${i + 1}. "${t(item.name)}" — €${item.price}${item.qty > 1 ? ` x${item.qty}` : ''}${noteLine}`
    })
    const petReminder = items.some(item => item.productId?.startsWith('pets-quadro-busto-'))
      ? t('\n\nPersonalização dos quadros Pets: vou enviar nesta conversa uma fotografia nítida e o nome de cada pet.')
      : ''
    const couponLine = couponCode ? `\n${t("Cupão")}: ${couponCode}` : ''
    const text = encodeURIComponent(
      `${t("Olá! Gostaria de encomendar:")}\n\n${lines.join('\n')}${savings}${couponLine}\n\n${t("Total:")} €${finalTotal}${petReminder}`
    )
    await markCouponUsed()
    window.open(`https://wa.me/351939158345?text=${text}`, '_blank')
  }

  const openProduct = (productId?: string) => {
    if (!productId) return
    const p = ALL_SHOP_PRODUCTS.find(x => x.id === productId)
    if (p) setSelectedProduct(p)
  }

  const couponMsg: Record<string, string> = {
    invalid: 'Cupão inválido.',
    used: 'Este cupão já foi utilizado.',
    error: 'Erro ao verificar. Tente novamente.',
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 150,
          background: 'rgba(43,39,34,0.45)', backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 300ms ease',
        }}
      />

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 151,
        width: '100%', maxWidth: 420,
        background: 'var(--paper)',
        boxShadow: '-40px 0 80px -20px rgba(43,39,34,0.25)',
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
            <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 4 }}>{t("Lusoprint")}</div>
            <h2 className="serif" style={{ margin: 0, fontSize: 28, fontWeight: 400, lineHeight: 1 }}>{t("O seu cesto")}</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--ink-mute)', fontSize: 22, lineHeight: 1 }}
            aria-label={t("Fechar")}
          >{t("×")}</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
          {t(items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{t("🛒")}</div>
              <p className="serif" style={{ fontSize: 22, fontStyle: 'italic', color: 'var(--ink-soft)', margin: 0 }}>{t("O cesto está vazio.")}</p>
              <p style={{ fontSize: 14, color: 'var(--ink-mute)', marginTop: 10, lineHeight: 1.6 }}>{t("Personalize uma peça e adicione aqui.")}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {t(items.map(item => (
                <div key={item.id} style={{
                  background: 'var(--paper-2)',
                  border: '1px solid var(--rule)',
                  borderRadius: 4, padding: '16px 18px',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                }}>
                  {/* Thumbnail */}
                  <div style={{ flexShrink: 0, paddingTop: 2 }}>
                    {t(item.img ? (
                      <div
                        onClick={() => openProduct(item.productId)}
                        style={{
                          width: 52, height: 62, borderRadius: 2,
                          background: `url(${item.img}) center/cover no-repeat, var(--linen)`,
                          border: '1px solid var(--rule)',
                          cursor: item.productId ? 'pointer' : 'default',
                          transition: 'opacity 150ms',
                        }}
                        onMouseEnter={e => { if (item.productId) (e.currentTarget as HTMLDivElement).style.opacity = '0.8' }}
                        onMouseLeave={e => { if (item.productId) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
                      />
                    ) : item.productId ? (
                      <div
                        onClick={() => openProduct(item.productId)}
                        style={{
                          width: 52, height: 62, borderRadius: 2,
                          background: 'var(--linen)', border: '1px solid var(--rule)',
                          cursor: 'pointer', transition: 'opacity 150ms',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                      >
                        <span style={{ fontSize: 18, color: 'var(--ink-mute)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
                          {t(item.name.charAt(0))}
                        </span>
                      </div>
                    ) : item.previewUrl ? (
                      <div style={{
                        width: 52, height: 62, borderRadius: 2,
                        background: `url(${item.previewUrl}) center/cover no-repeat, var(--linen)`,
                        border: '1px solid var(--rule)',
                      }} />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.letraHex, border: '1px solid var(--rule)' }} title={t(item.letraColorName)} />
                        {t(!item.mono && (
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.nomeHex, border: '1px solid var(--rule)' }} title={t(item.nomeColorName)} />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="serif" style={{ fontSize: 18, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 6 }}>
                      {t(item.name)}
                    </div>
                    {t(item.size && (
                      <div style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.06em', lineHeight: 1.7, marginBottom: 8 }}>
                        {t(item.size)}{t(" cm")}{t(item.mono
                          ? ` · ${item.nomeColorName}`
                          : ` · Inicial: ${item.letraColorName} / Nome: ${item.nomeColorName}`)}
                      </div>
                    ))}
                    {t(item.note && (
                      <div style={{
                        fontSize: 11, lineHeight: 1.6, marginBottom: 8,
                        padding: '6px 10px',
                        background: 'rgba(141,146,116,0.10)',
                        borderLeft: '2px solid var(--olive)',
                        borderRadius: '0 3px 3px 0',
                      }}>
                        <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--olive)', marginBottom: 2 }}>{t("Configuração")}</div>
                        <div style={{ color: 'var(--ink-soft)' }}>{t(item.note.split(' · ').join('\n').split('\n').map((line, i) => (
                          <div key={i}>{translateOrderNote(line)}</div>
                        )))}</div>
                      </div>
                    ))}

                    {/* Qty controls */}
                    {t(!item.note ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 6 }}>
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          style={{
                            width: 28, height: 28, border: '1px solid var(--rule)',
                            borderRadius: '3px 0 0 3px', background: 'transparent',
                            cursor: 'pointer', color: 'var(--ink)', fontSize: 16, lineHeight: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >{t("−")}</button>
                        <div style={{
                          width: 36, height: 28, border: '1px solid var(--rule)',
                          borderLeft: 'none', borderRight: 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, color: 'var(--ink)',
                        }}>
                          {t(item.qty)}
                        </div>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          style={{
                            width: 28, height: 28, border: '1px solid var(--rule)',
                            borderRadius: '0 3px 3px 0', background: 'transparent',
                            cursor: 'pointer', color: 'var(--ink)', fontSize: 16, lineHeight: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >{t("+")}</button>
                      </div>
                    ) : (
                      <div style={{ marginTop: 6, fontSize: 11, color: 'var(--ink-mute)', fontStyle: 'italic' }}>{t("1 unidade")}</div>
                    ))}
                  </div>

                  {/* Price + remove */}
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <div className="serif" style={{ fontSize: 20 }}>{t("€")}{t((item.price * item.qty).toFixed(2).replace('.00', ''))}</div>
                    {t(item.qty > 1 && (
                      <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>{t("€")}{t(item.price)}{t(" / un.")}</div>
                    ))}
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        marginTop: 8, background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.06em',
                        textDecoration: 'underline', padding: 0, fontFamily: 'inherit',
                      }}
                    >{t("Remover")}</button>
                  </div>
                </div>
              )))}
            </div>
          ))}
        </div>

        {/* Footer */}
        {t(items.length > 0 && (
          <div style={{ padding: '20px 28px 28px', borderTop: '1px solid var(--rule)', flexShrink: 0 }}>

            {/* Coupon */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 10 }}>{t("Cupão")}</div>
              {t(couponCode ? (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(107,128,90,0.1)', border: '1px solid var(--sage)',
                  borderRadius: 4, padding: '10px 14px',
                }}>
                  <div>
                    <span style={{ fontSize: 12, letterSpacing: '0.1em', fontFamily: 'monospace', color: 'var(--ink)', fontWeight: 600 }}>
                      {t(couponCode)}
                    </span>
                    <span style={{ marginLeft: 10, fontSize: 11, color: 'var(--olive)' }}>{t("10% OFF aplicado")}</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'inherit' }}
                  >{t("Remover")}</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    value={couponInput}
                    onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponState('idle') }}
                    onKeyDown={e => { if (e.key === 'Enter') handleApplyCoupon() }}
                    placeholder={t("LUSO-XXXXXX")}
                    style={{
                      flex: 1, padding: '10px 12px',
                      border: `1px solid ${couponState === 'invalid' || couponState === 'used' ? 'var(--terracotta)' : 'var(--rule)'}`,
                      borderRadius: 4, background: 'transparent',
                      fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.06em',
                      color: 'var(--ink)', outline: 'none',
                    }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponState === 'loading' || !couponInput.trim()}
                    style={{
                      padding: '10px 16px', background: 'var(--ink)', color: '#fff',
                      border: 'none', borderRadius: 4, cursor: 'pointer',
                      fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                      fontFamily: 'inherit', opacity: !couponInput.trim() ? 0.4 : 1,
                      transition: 'opacity 150ms',
                    }}
                  >
                    {t(couponState === 'loading' ? '…' : 'Aplicar')}
                  </button>
                </div>
              ))}
              {t(couponMsg[couponState] && (
                <div style={{ marginTop: 6, fontSize: 12, color: 'var(--terracotta)' }}>
                  {t(couponMsg[couponState])}
                </div>
              ))}
            </div>

            {/* Totals */}
            {t(discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: 'var(--ink-mute)', fontSize: 13 }}>
                <span>{t("Subtotal")}</span><span>{t("€")}{t(total.toFixed(2).replace('.00', ''))}</span>
              </div>
            ))}
            {t(discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, color: 'var(--olive)', fontSize: 13 }}>
                <span>{t("Desconto (10%)")}</span><span>{t("−€")}{t((total - finalTotal).toFixed(2))}</span>
              </div>
            ))}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 16,
              borderTop: discount > 0 ? '1px solid var(--rule)' : 'none',
              paddingTop: discount > 0 ? 10 : 0,
            }}>
              <span style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>{t("Total")}</span>
              <span className="serif" style={{ fontSize: 30 }}>{t("€")}{t(finalTotal)}</span>
            </div>

            <button
              onClick={handleOrder}
              className="btn btn-solid"
              style={{ width: '100%', justifyContent: 'center', borderRadius: 999, padding: '14px 20px' }}
            >{t("Encomendar via WhatsApp ")}<span className="arr">{t("→")}</span>
            </button>
            <button
              onClick={clearCart}
              style={{
                marginTop: 12, width: '100%', background: 'none', border: 'none',
                cursor: 'pointer', fontSize: 11, color: 'var(--ink-mute)',
                letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'inherit',
                textDecoration: 'underline',
              }}
            >{t("Limpar cesto")}</button>
          </div>
        ))}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
