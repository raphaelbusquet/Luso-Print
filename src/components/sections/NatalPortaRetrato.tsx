import { translate as t } from '../../i18n/translate'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'

const PHOTOS = [1, 2].map(i => `/assets/products/natal/porta-retrato-arvore-${i}.png`)
const SIZES = [
  { cm: 15, label: 'Maior', price: 8 },
  { cm: 9, label: 'Menor', price: 6 },
]

export function NatalPortaRetrato() {
  const mobile = useIsMobile()
  const { addItem } = useCart()
  const [photo, setPhoto] = useState(0)
  const [size, setSize] = useState(SIZES[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addTree = () => {
    addItem({ name: `Porta-retrato Árvore de Natal — ${size.cm} cm`, price: size.price, productId: `natal-porta-retrato-arvore-${size.cm}`, img: PHOTOS[0], note: `Tamanho: ${size.label} · Altura: ${size.cm} cm · Fotografia incluída · Venda à unidade` }, qty)
    setAdded(true)
  }
  return (
    <article style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 28 : 56, alignItems: 'center', marginTop: 64, paddingTop: 64, borderTop: '1px solid var(--rule)' }}>
      <div>
        <img src={PHOTOS[photo]} alt={t(`Porta-retrato em forma de árvore de Natal — fotografia ${photo + 1}`)} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {t(PHOTOS.map((src, i) => (
            <button key={src} onClick={() => setPhoto(i)} aria-label={t(`Ver fotografia ${i + 1} do porta-retrato`)} aria-pressed={photo === i} style={{ padding: 3, width: 80, background: 'transparent', border: `1px solid ${photo === i ? 'var(--terracotta)' : 'var(--rule)'}`, cursor: 'pointer', borderRadius: 4 }}>
              <img src={src} alt={t("")} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
            </button>
          )))}
        </div>
      </div>
      <div>
        <span className="kicker">{t("NATAL · PEQUENOS DETALHES")}</span>
        <h3 className="serif" style={{ fontSize: mobile ? 38 : 48, lineHeight: 1.1, fontWeight: 400, margin: '18px 0' }}>{t("Porta-retrato Árvore de Natal")}</h3>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 30, margin: '0 0 8px' }}>{t("€")}{t(size.price)} <span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>{t(" / unidade · ")}{t(size.cm)}{t(" cm")}</span></p>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>{t("As memórias de quem mais ama também fazem parte da decoração. Este porta-retrato em forma de árvore de Natal dá um lugar especial à sua fotografia favorita, com detalhes de estrelas e flocos de neve que celebram a época. Disponível em duas versões: 15 cm por €8 e 9 cm por €6. Acompanha a fotografia. Escolha o tamanho ideal para a sua casa ou para oferecer.")}</p>
        <fieldset style={{ border: 0, padding: 0, margin: '28px 0' }}>
          <legend className="kicker" style={{ marginBottom: 16 }}>{t("Escolha o tamanho")}</legend>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {t(SIZES.map(option => (
              <label key={option.cm} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${size.cm === option.cm ? 'var(--ink)' : 'var(--rule)'}`, borderRadius: 30, padding: '10px 14px', fontSize: 13 }}>
                <input type="radio" name="tamanho-porta-retrato-arvore" value={option.cm} checked={size.cm === option.cm} onChange={() => { setSize(option); setAdded(false) }} style={{ accentColor: 'var(--terracotta)' }} />
                {t(option.label)}{t(" · ")}{t(option.cm)}{t(" cm · €")}{t(option.price)}
              </label>
            )))}
          </div>
        </fieldset>
        <p style={{ fontSize: 12, color: 'var(--ink-mute)', lineHeight: 1.6 }}>{t("Venda à unidade, com fotografia incluída. Escolha entre 15 cm por €8 e 9 cm por €6.")}</p>
        <label style={{ display: 'block', fontSize: 13, margin: '24px 0 16px' }}>{t("Quantidade de porta-retratos")}<input type="number" min={1} step={1} value={qty} onChange={e => { setQty(Math.max(1, Math.floor(Number(e.target.value) || 1))); setAdded(false) }} style={{ display: 'block', width: 90, marginTop: 8, padding: 10, border: '1px solid var(--rule)', borderRadius: 4, fontFamily: 'inherit', background: 'var(--paper)', color: 'var(--ink)' }} />
        </label>
        <p style={{ fontSize: 14 }}>{t("Total: €")}{t(size.price * qty)}</p>
        <button type="button" onClick={addTree} disabled={added} className="btn btn-solid" style={{ cursor: added ? 'default' : 'pointer' }}>{t(added ? 'Adicionado ao cesto ✓' : `Adicionar ao cesto — €${size.price * qty}`)}</button>
      </div>
    </article>
  )
}
