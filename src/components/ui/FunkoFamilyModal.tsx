import { useState } from 'react'
import { translate as t } from '../../i18n/translate'
import { FUNKO_OPTIONS } from '../../data/funko'
import type { ShopProduct } from '../../data/shop'
import { useCart } from '../../context/CartContext'
import { useIsMobile } from '../../hooks/useIsMobile'
import { ProductOverlay } from './ProductOverlay'

export function FunkoFamilyModal({ product, onClose }: { product: ShopProduct; onClose: () => void }) {
  const mobile = useIsMobile()
  const { addItem } = useCart()
  const [people, setPeople] = useState<number>(1)
  const [photo, setPhoto] = useState(0)
  const [added, setAdded] = useState(false)
  const selected = FUNKO_OPTIONS.find(option => option.people === people)!
  const photos = product.imgs ?? [product.img]
  const add = () => {
    addItem({ productId: product.id, name: product.name, img: product.img, price: selected.price, note: `${people} ${people === 1 ? 'pessoa' : 'pessoas'}` })
    setAdded(true)
  }
  return (
    <ProductOverlay title={t(product.name)} onClose={onClose}>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.1fr 1fr', gap: mobile ? 24 : 40, alignItems: 'start' }}>
        <div>
          <img src={photos[photo]} alt={t(product.name)} style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'contain', borderRadius: 4 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {photos.map((src, index) => (
              <button type="button" key={src} onClick={() => setPhoto(index)} aria-label={t(`Ver fotografia ${index + 1}`)} aria-pressed={index === photo} style={{ width: 64, padding: 3, border: `1px solid ${index === photo ? 'var(--terracotta)' : 'var(--rule)'}`, borderRadius: 4, background: 'transparent', cursor: 'pointer' }}>
                <img src={src} alt="" style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'contain' }} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="kicker">{t('FAMÍLIA')} · {t('PERSONALIZÁVEL')}</span>
          <h2 className="serif" style={{ fontSize: 36, lineHeight: 1.1, fontWeight: 400 }}>{t(product.name)}</h2>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>{t(product.description)}</p>
          <fieldset style={{ padding: 0, border: 0, margin: '28px 0' }}>
            <legend className="kicker" style={{ marginBottom: 14 }}>{t('Quantidade de pessoas')}</legend>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
              {FUNKO_OPTIONS.map(option => (
                <label key={option.people} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative', aspectRatio: '1/1', border: `2px solid ${people === option.people ? 'var(--terracotta)' : 'var(--rule)'}`, borderRadius: 4, background: people === option.people ? 'var(--linen)' : 'transparent', cursor: 'pointer' }}>
                  <input type="radio" name="funko-people" value={option.people} checked={people === option.people} onChange={() => { setPeople(option.people); setAdded(false) }} style={{ accentColor: 'var(--terracotta)' }} />
                  <span>{option.people} {t(option.people === 1 ? 'pessoa' : 'pessoas')}</span>
                  <strong className="serif" style={{ fontSize: 28, fontWeight: 400 }}>€{option.price}</strong>
                </label>
              ))}
            </div>
          </fieldset>
          <div aria-disabled="true" style={{ padding: 16, border: '1px dashed var(--rule)', borderRadius: 4, color: 'var(--ink-mute)', marginBottom: 24 }}>
            <strong>{t('Funko Pet — em breve')}</strong>
            <p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.6 }}>{t('Ainda sem data de lançamento. Esta opção não está disponível para encomenda.')}</p>
          </div>
          <p aria-live="polite" className="serif" style={{ fontSize: 28 }}>{t('Total:')} €{selected.price}</p>
          <button type="button" className="btn btn-solid" onClick={add} disabled={added} style={{ width: '100%', justifyContent: 'center' }}>{t(added ? 'Adicionado ao cesto ✓' : `Adicionar ao cesto — €${selected.price}`)}</button>
        </div>
      </div>
    </ProductOverlay>
  )
}
