import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'

const PHOTOS = [2, 1].map(i => `/assets/products/natal/placa-feliz-natal-${i}.png`)


export function NatalPlaca() {
  const mobile = useIsMobile()
  const { addItem } = useCart()
  const [photo, setPhoto] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addPlaque = () => {
    addItem({ name: 'Placa Feliz Natal', price: 8.49, productId: 'natal-placa-feliz-natal', img: PHOTOS[0], note: 'Placa decorativa · Venda à unidade' }, qty)
    setAdded(true)
  }
  return (
    <article style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 28 : 56, alignItems: 'center', marginTop: 64, paddingTop: 64, borderTop: '1px solid var(--rule)' }}>
      <div>
        <img src={PHOTOS[photo]} alt={`Placa decorativa Feliz Natal — fotografia ${photo + 1}`} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 4 }} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {PHOTOS.map((src, i) => (
            <button key={src} onClick={() => setPhoto(i)} aria-label={`Ver fotografia ${i + 1} da placa Feliz Natal`} aria-pressed={photo === i} style={{ padding: 3, width: 80, background: 'transparent', border: `1px solid ${photo === i ? 'var(--terracotta)' : 'var(--rule)'}`, cursor: 'pointer', borderRadius: 4 }}>
              <img src={src} alt="" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <span className="kicker">NATAL · PEQUENOS DETALHES</span>
        <h3 className="serif" style={{ fontSize: mobile ? 38 : 48, lineHeight: 1.1, fontWeight: 400, margin: '18px 0' }}>Placa Feliz Natal</h3>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 30, margin: '0 0 8px' }}>€8,49 <span style={{ fontFamily: 'var(--sans)', fontSize: 14 }}> / unidade</span></p>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>Uma mensagem simples que enche a casa de espírito natalício. A placa Feliz Natal combina letras em relevo com um floco de neve decorativo, criando um detalhe especial para a sala, a entrada ou uma prateleira. Uma peça para dar as boas-vindas à época mais acolhedora do ano.</p>
        <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', padding: '16px 0', margin: '24px 0', fontSize: 14, lineHeight: 1.8 }}>
          <div>Placa decorativa Feliz Natal</div>
          <div>Preço: €8,49 por unidade</div>
        </div>
        <label style={{ display: 'block', fontSize: 13, margin: '24px 0 16px' }}>
          Quantidade de placas
          <input type="number" min={1} step={1} value={qty} onChange={e => { setQty(Math.max(1, Math.floor(Number(e.target.value) || 1))); setAdded(false) }} style={{ display: 'block', width: 90, marginTop: 8, padding: 10, border: '1px solid var(--rule)', borderRadius: 4, fontFamily: 'inherit', background: 'var(--paper)', color: 'var(--ink)' }} />
        </label>
        <p style={{ fontSize: 14 }}>Total: €{(8.49 * qty).toFixed(2).replace('.', ',')}</p>
        <button type="button" onClick={addPlaque} disabled={added} className="btn btn-solid" style={{ cursor: added ? 'default' : 'pointer' }}>{added ? 'Adicionado ao cesto ✓' : `Adicionar ao cesto — €${(8.49 * qty).toFixed(2).replace('.', ',')}`}</button>
      </div>
    </article>
  )
}
