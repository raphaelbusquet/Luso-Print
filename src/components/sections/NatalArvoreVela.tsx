import { translate as t } from '../../i18n/translate'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'

const PHOTOS = [1, 2, 3].map(i => `/assets/products/natal/arvore-natal-vela-${i}.png`)


export function NatalArvoreVela() {
  const mobile = useIsMobile()
  const { addItem } = useCart()
  const [photo, setPhoto] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addTree = () => {
    addItem({ name: 'Árvore de Natal para Vela — 15 cm', price: 6.49, productId: 'natal-arvore-vela-15', img: PHOTOS[0], note: 'Altura: 15 cm · Vela incluída · Venda à unidade' }, qty)
    setAdded(true)
  }
  return (
    <article style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 28 : 56, alignItems: 'center', marginTop: 64, paddingTop: 64, borderTop: '1px solid var(--rule)' }}>
      <div>
        <img src={PHOTOS[photo]} alt={t(`Árvore de Natal iluminada para vela — fotografia ${photo + 1}`)} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {t(PHOTOS.map((src, i) => (
            <button key={src} onClick={() => setPhoto(i)} aria-label={t(`Ver fotografia ${i + 1} da árvore para vela`)} aria-pressed={photo === i} style={{ padding: 3, width: 80, background: 'transparent', border: `1px solid ${photo === i ? 'var(--terracotta)' : 'var(--rule)'}`, cursor: 'pointer', borderRadius: 4 }}>
              <img src={src} alt={t("")} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
            </button>
          )))}
        </div>
      </div>
      <div>
        <span className="kicker">{t("NATAL · PEQUENOS DETALHES")}</span>
        <h3 className="serif" style={{ fontSize: mobile ? 38 : 48, lineHeight: 1.1, fontWeight: 400, margin: '18px 0' }}>{t("Árvore de Natal para Vela")}</h3>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 30, margin: '0 0 8px' }}>{t("€6,49 ")}<span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>{t(" / unidade · 15 cm")}</span></p>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>{t("Uma luz acolhedora para celebrar o Natal. Esta árvore decorativa de 15 cm recebe uma pequena vela no interior, deixando a luz passar pelos recortes em forma de estrela. Ideal para dar um toque natalício à sala, à mesa de apoio ou a um cantinho do quarto. Acompanha vela.")}</p>
        <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', padding: '16px 0', margin: '24px 0', fontSize: 14, lineHeight: 1.8 }}>
          <div>{t("Altura: 15 cm")}</div>
          <div>{t("Inclui: uma árvore e uma vela")}</div>
          <div>{t("Preço: €6,49 por unidade")}</div>
        </div>
        <label style={{ display: 'block', fontSize: 13, margin: '24px 0 16px' }}>{t("Quantidade de árvores")}<input type="number" min={1} step={1} value={qty} onChange={e => { setQty(Math.max(1, Math.floor(Number(e.target.value) || 1))); setAdded(false) }} style={{ display: 'block', width: 90, marginTop: 8, padding: 10, border: '1px solid var(--rule)', borderRadius: 4, fontFamily: 'inherit', background: 'var(--paper)', color: 'var(--ink)' }} />
        </label>
        <p style={{ fontSize: 14 }}>{t("Total: €")}{t((6.49 * qty).toFixed(2).replace('.', ','))}</p>
        <button type="button" onClick={addTree} disabled={added} className="btn btn-solid" style={{ cursor: added ? 'default' : 'pointer' }}>{t(added ? 'Adicionado ao cesto ✓' : `Adicionar ao cesto — €${(6.49 * qty).toFixed(2).replace('.', ',')}`)}</button>
      </div>
    </article>
  )
}
