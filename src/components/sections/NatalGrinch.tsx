import { translate as t } from '../../i18n/translate'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'

export function NatalGrinch() {
  const mobile = useIsMobile()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addGrinch = () => {
    addItem({ name: 'Suporte de Parede Grinch', price: 26, productId: 'natal-suporte-parede-grinch', img: '/assets/products/natal/suporte-parede-grinch.png' }, qty)
    setAdded(true)
  }

  return (
    <article style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 28 : 56, alignItems: 'center', marginTop: 64, paddingTop: 64, borderTop: '1px solid var(--rule)' }}>
      <img src="/assets/products/natal/suporte-parede-grinch.png" alt={t("Suporte de parede com a mão verde do Grinch a segurar uma bola de Natal")} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'contain', display: 'block', borderRadius: 4 }} />
      <div>
        <span className="kicker">{t("NATAL · UM TOQUE DE DIVERSÃO")}</span>
        <h3 className="serif" style={{ fontSize: mobile ? 38 : 48, lineHeight: 1.1, fontWeight: 400, margin: '18px 0' }}>{t("Suporte de Parede Grinch")}</h3>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 30, margin: '0 0 8px' }}>{t("€26 ")}<span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>{t(" / unidade")}</span></p>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>{t("Para quem gosta de um Natal com uma pitada de humor. Com a inconfundível mão verde do Grinch, este suporte de parede dá um toque mais animado à decoração e transforma um cantinho da casa num detalhe cheio de personalidade. Uma forma divertida de surpreender a família e trazer ainda mais sorrisos a esta época.")}</p>
        <label style={{ display: 'block', fontSize: 13, margin: '24px 0 16px' }}>{t("Quantidade de suportes")}<input type="number" min={1} step={1} value={qty} onChange={e => { setQty(Math.max(1, Math.floor(Number(e.target.value) || 1))); setAdded(false) }} style={{ display: 'block', width: 90, marginTop: 8, padding: 10, border: '1px solid var(--rule)', borderRadius: 4, fontFamily: 'inherit', background: 'var(--paper)', color: 'var(--ink)' }} />
        </label>
        <p style={{ fontSize: 14 }}>{t("Total: €")}{t(26 * qty)}</p>
        <button type="button" onClick={addGrinch} disabled={added} className="btn btn-solid" style={{ cursor: added ? 'default' : 'pointer' }}>{t(added ? 'Adicionado ao cesto ✓' : `Adicionar ao cesto — €${26 * qty}`)}</button>
      </div>
    </article>
  )
}
