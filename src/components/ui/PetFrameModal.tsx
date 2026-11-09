import { translate as t } from '../../i18n/translate'
import { ProductOverlay } from './ProductOverlay'
import { useCart } from '../../context/CartContext'
import { useState } from 'react'
import type { ShopProduct } from '../../data/shop'
import { useIsMobile } from '../../hooks/useIsMobile'

export function PetFrameModal({ product, onClose }: { product: ShopProduct; onClose: () => void }) {
  const mobile = useIsMobile()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addFrame = () => {
    addItem({ name: product.name, price: product.price, productId: product.id, img: product.img, note: `Quadro com ${product.petCount} ${product.petCount === 1 ? 'pet' : 'pets'} · Enviar no WhatsApp uma fotografia e o nome de cada pet para personalização` }, qty)
    setAdded(true)
  }
  const count = product.petCount ?? 1
  const [photo, setPhoto] = useState(0)
  const photos = product.imgs ?? [product.img]
  const label = `${count} ${count === 1 ? 'pet' : 'pets'}`
  const contact = `https://wa.me/351939158345?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o Quadro com Busto do Seu Pet, com ${label}. Enviarei por aqui uma fotografia e o nome de cada pet para personalização.`)}`
  return (
    <ProductOverlay title={t(product.name)} onClose={onClose}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 32, alignItems: 'start' }}>
          <div>
            <img src={photos[photo]} alt={t(`Quadro personalizado com ${label} — fotografia ${photo + 1}`)} style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'contain', borderRadius: 4 }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {t(photos.map((src, i) => (
                <button key={src} type="button" onClick={() => setPhoto(i)} aria-label={t(`Ver fotografia ${i + 1} do quadro com ${label}`)} aria-pressed={photo === i} style={{ width: 64, padding: 3, cursor: 'pointer', background: 'transparent', border: `1px solid ${photo === i ? 'var(--terracotta)' : 'var(--rule)'}`, borderRadius: 4 }}>
                  <img src={src} alt={t("")} style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                </button>
              )))}
            </div>
          </div>
          <div>
            <span className="kicker">{t("PETS · PERSONALIZÁVEL")}</span>
            <h2 className="serif" style={{ fontWeight: 400, fontSize: 36, lineHeight: 1.1 }}>{t(product.name)}</h2>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>{t(product.description)}</p>
            <div style={{ background: 'var(--linen)', borderLeft: '2px solid var(--terracotta)', padding: '14px 16px', margin: '20px 0', fontSize: 14, lineHeight: 1.7 }}>
              <strong>{t("Fotografias e nomes pelo WhatsApp")}</strong>
              <p style={{ margin: '6px 0 0' }}>{t("Ao finalizar a encomenda no WhatsApp, envie uma fotografia nítida e o nome de cada pet que deseja incluir no quadro. Vamos usar essas informações para personalizar a sua peça.")}</p>
            </div>
            <p aria-live="polite" style={{ fontSize: 14 }}>{t("Quadro com ")}{t(label)}{t(" · €")}{t(product.price)}{t(" por unidade")}</p>
            <label style={{ display: 'block', fontSize: 13, margin: '20px 0' }}>{t("Quantidade de quadros")}<input type="number" min={1} step={1} value={qty} onChange={e => { setQty(Math.max(1, Math.floor(Number(e.target.value) || 1))); setAdded(false) }} style={{ display: 'block', width: 80, padding: 10, marginTop: 8, border: '1px solid var(--rule)', borderRadius: 4, background: 'var(--paper)', color: 'var(--ink)', fontFamily: 'inherit' }} />
            </label>
            <button type="button" disabled={added} onClick={addFrame} className="btn btn-solid">{t(added ? 'Adicionado ao cesto ✓' : `Adicionar ao cesto — €${product.price * qty}`)}</button>
            <br /><br />
            <a href={contact} target="_blank" rel="noopener noreferrer" className="btn btn-solid">{t("Pedir informações →")}</a>
          </div>
        </div>
    </ProductOverlay>
  )
}
