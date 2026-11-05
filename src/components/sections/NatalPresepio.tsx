import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'

const PHOTOS = [1, 2, 3].map(i => `/assets/products/natal/presepio-${i}.png`)


export function NatalPresepio() {
  const mobile = useIsMobile()
  const [photo, setPhoto] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const addPresepio = () => {
    addItem({ name: 'Presépio de Natal', price: 16, productId: 'natal-presepio', img: PHOTOS[0] }, qty)
    setAdded(true)
  }
  return (
    <article style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 28 : 56, alignItems: 'center', marginTop: 64, paddingTop: 64, borderTop: '1px solid var(--rule)' }}>
      <div>
        <img src={PHOTOS[photo]} alt={`Presépio de Natal decorativo — fotografia ${photo + 1}`} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {PHOTOS.map((src, i) => (
            <button key={src} onClick={() => setPhoto(i)} aria-label={`Ver fotografia ${i + 1} do presépio`} aria-pressed={photo === i} style={{ padding: 3, width: 80, background: 'transparent', border: `1px solid ${photo === i ? 'var(--terracotta)' : 'var(--rule)'}`, cursor: 'pointer', borderRadius: 4 }}>
              <img src={src} alt="" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <span className="kicker">NATAL · FÉ, AMOR E ESPERANÇA</span>
        <h3 className="serif" style={{ fontSize: mobile ? 38 : 48, lineHeight: 1.1, fontWeight: 400, margin: '18px 0' }}>Presépio de Natal</h3>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 30, margin: '0 0 8px' }}>€16 <span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}> / unidade</span></p>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>No coração do Natal está o nascimento de Jesus. Este presépio celebra a Sagrada Família e recorda a humildade, o amor e a esperança que tornam esta época tão especial. Uma peça para dar um lugar de destaque ao verdadeiro sentido do Natal, reunir a família e cultivar momentos de fé e gratidão em casa.</p>
        <label style={{ display: 'block', fontSize: 13, margin: '24px 0 16px' }}>
          Quantidade de presépios
          <input type="number" min={1} step={1} value={qty} onChange={e => { setQty(Math.max(1, Math.floor(Number(e.target.value) || 1))); setAdded(false) }} style={{ display: 'block', width: 90, marginTop: 8, padding: 10, border: '1px solid var(--rule)', borderRadius: 4, fontFamily: 'inherit', background: 'var(--paper)', color: 'var(--ink)' }} />
        </label>
        <p style={{ fontSize: 14 }}>Total: €{16 * qty}</p>
        <button type="button" onClick={addPresepio} disabled={added} className="btn btn-solid" style={{ cursor: added ? 'default' : 'pointer' }}>{added ? 'Adicionado ao cesto ✓' : `Adicionar ao cesto — €${16 * qty}`}</button>
      </div>
    </article>
  )
}
