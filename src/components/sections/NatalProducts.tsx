import { translate as t } from '../../i18n/translate'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'

const COLORS = [
  { name: 'Vermelho', hex: '#B93D32' },
  { name: 'Dourado', hex: '#BE9B59' },
  { name: 'Verde', hex: '#44634B' },
  { name: 'Prateado', hex: '#BCC0C4' },
]
const PHOTOS = [1, 2, 3].map(i => `/assets/products/natal/bola-natal-vazada-${i}.png`)

export function NatalProducts() {
  const mobile = useIsMobile()
  const [photo, setPhoto] = useState(0)
  const [color, setColor] = useState(COLORS[0].name)
  const [packs, setPacks] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const addPack = () => {
    addItem({ name: 'Bola de Natal Vazada — pack de 10 unidades', price: 10, productId: 'natal-bola-vazada-pack-10', img: PHOTOS[0], note: `Cor: ${color} · Cada pack contém 10 bolas` }, packs)
    setAdded(true)
  }
  const contact = `https://wa.me/351928419522?text=${encodeURIComponent(`Olá! Gostaria de encomendar a Bola de Natal Vazada na cor ${color}, ${packs} pack(s) de 10 unidades, a €10 por pack. Podem dar-me mais informações?`)}`
  return (
    <article style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 28 : 56, marginTop: 36, alignItems: 'center' }}>
      <div>
        <img src={PHOTOS[photo]} alt={t(`Bola de Natal vazada com laço — fotografia ${photo + 1}`)} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {t(PHOTOS.map((src, i) => (
            <button key={src} onClick={() => setPhoto(i)} aria-label={t(`Ver fotografia ${i + 1}`)} aria-pressed={photo === i} style={{ padding: 3, width: 80, background: 'transparent', border: `1px solid ${photo === i ? 'var(--terracotta)' : 'var(--rule)'}`, cursor: 'pointer', borderRadius: 4 }}>
              <img src={src} alt={t("")} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
            </button>
          )))}
        </div>
      </div>
      <div>
        <span className="kicker">{t("NATAL · À SUA COR")}</span>
        <h3 className="serif" style={{ fontSize: mobile ? 38 : 48, lineHeight: 1.1, fontWeight: 400, margin: '18px 0' }}>{t("Bola de Natal Vazada")}</h3>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 30, margin: '0 0 8px' }}>{t("€10 ")}<span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}>{t(" / pack de 10 unidades")}</span></p>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>{t("Um detalhe leve e delicado para dar encanto à sua árvore. Com desenho vazado e um laço que remata a peça, esta bola de Natal adapta-se à decoração que imaginou. Escolha vermelho, dourado, verde ou prateado e crie uma árvore com a sua identidade.")}</p>
        <fieldset style={{ border: 0, padding: 0, margin: '28px 0' }}>
          <legend className="kicker" style={{ marginBottom: 16 }}>{t("Cor — ")}{t(color)}</legend>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {t(COLORS.map(option => (
              <label key={option.name} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${color === option.name ? 'var(--ink)' : 'var(--rule)'}`, borderRadius: 30, padding: '9px 13px', fontSize: 13 }}>
                <input type="radio" name="cor-bola-natal" value={option.name} checked={color === option.name} onChange={() => { setColor(option.name); setAdded(false) }} style={{ accentColor: 'var(--terracotta)' }} />
                <span aria-hidden="true" style={{ width: 16, height: 16, borderRadius: '50%', background: option.hex }} />
                {t(option.name)}
              </label>
            )))}
          </div>
        </fieldset>
        <p style={{ fontSize: 12, color: 'var(--ink-mute)', lineHeight: 1.6 }}>{t("As fotografias ilustram o modelo. A peça será produzida na cor escolhida.")}</p>
        <label style={{ display: 'block', fontSize: 13, margin: '24px 0 16px' }}>{t("Quantidade de packs (10 bolas por pack)")}<input type="number" min={1} step={1} value={packs} onChange={e => { setPacks(Math.max(1, Math.floor(Number(e.target.value) || 1))); setAdded(false) }} style={{ display: 'block', width: 90, marginTop: 8, padding: 10, border: '1px solid var(--rule)', borderRadius: 4, fontFamily: 'inherit', background: 'var(--paper)', color: 'var(--ink)' }} />
        </label>
        <p style={{ fontSize: 14 }}>{t(packs * 10)}{t(" bolas · Total: €")}{t(packs * 10)}</p>
        <button type="button" onClick={addPack} disabled={added} className="btn btn-solid" style={{ cursor: added ? 'default' : 'pointer' }}>{t(added ? 'Adicionado ao cesto ✓' : `Adicionar ao cesto — €${packs * 10}`)}</button>
        <a style={{ display: 'block', marginTop: 20, fontSize: 13, color: 'var(--ink-soft)' }} href={contact} target="_blank" rel="noopener noreferrer" className="btn btn-solid">{t("Pedir informações →")}</a>
      </div>
    </article>
  )
}
