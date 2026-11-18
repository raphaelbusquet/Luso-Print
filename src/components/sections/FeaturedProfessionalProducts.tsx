import { useState } from 'react'
import { BUSINESS_SOLUTIONS } from '../../data/empresas'
import { blackFridayBusinessPrice, isBlackFridayActive } from '../../lib/blackFriday'
import { useIsMobile } from '../../hooks/useIsMobile'
import { BusinessProductModal } from '../ui/BusinessProductModal'

const FEATURED_IDS = ['kit-nail-instrutor', 'kit-pedi-instrutor', 'organizador-atendimento-f1']
type Solution = (typeof BUSINESS_SOLUTIONS)[number]

export function FeaturedProfessionalProducts() {
  const [selected, setSelected] = useState<Solution | null>(null)
  const mobile = useIsMobile()
  const products = FEATURED_IDS.map(id => BUSINESS_SOLUTIONS.find(item => item.id === id)!).filter(Boolean)

  const priceLabel = (product: Solution) => {
    const regular = 'price' in product && typeof product.price === 'number' ? product.price : 59
    const sale = blackFridayBusinessPrice(product.id, regular)
    const amount = product.id === 'kit-nail-instrutor' ? `Desde €${sale.toFixed(2).replace('.', ',')}` : `€${sale.toFixed(2).replace('.', ',')}`
    return { amount, sale: sale < regular }
  }

  return (
    <section id="produtos-profissionais" style={{ background: 'var(--linen)', padding: mobile ? '48px 0 56px' : '64px 0 84px' }}>
      <div className="shell-wide">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 24, marginBottom: mobile ? 24 : 36, flexWrap: 'wrap' }}>
          <div>
            <p className="kicker" style={{ color: 'var(--ink-mute)', margin: '0 0 12px' }}>FORMAÇÃO &amp; DEMONSTRAÇÃO</p>
            <h1 className="serif" style={{ fontWeight: 400, fontSize: mobile ? 38 : 54, lineHeight: 1.05, margin: 0 }}>Os essenciais para profissionais</h1>
          </div>
          <a href="/empresas#kit-nail-instrutor" className="btn-ghost" style={{ whiteSpace: 'nowrap' }}>Ver todos os detalhes →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: mobile ? 18 : 24 }}>
          {products.map(product => {
            const { amount, sale } = priceLabel(product)
            return (
              <button key={product.id} type="button" onClick={() => setSelected(product)} aria-label={`Ver ${product.title}`} style={{ padding: 0, textAlign: 'left', color: 'var(--ink)', background: 'transparent', border: '1px solid var(--rule)', borderRadius: 6, cursor: 'pointer', overflow: 'hidden', transition: 'transform 180ms ease, box-shadow 180ms ease' }} onMouseEnter={event => { event.currentTarget.style.transform = 'translateY(-3px)'; event.currentTarget.style.boxShadow = '0 14px 32px rgba(38,34,30,.09)' }} onMouseLeave={event => { event.currentTarget.style.transform = 'none'; event.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ background: '#eee8df', overflow: 'hidden' }}>
                  <img src={product.image} alt={product.title} loading="eager" style={{ display: 'block', width: '100%', aspectRatio: '1.14 / 1', objectFit: product.id === 'kit-pedi-instrutor' ? 'contain' : 'cover' }} />
                </div>
                <div style={{ padding: mobile ? '17px 18px 20px' : '20px 22px 24px' }}>
                  <p className="kicker" style={{ margin: '0 0 8px', color: 'var(--ink-mute)', fontSize: 11 }}>LUSO PRINT · PROFISSIONAL</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                    <h2 className="serif" style={{ fontWeight: 400, fontSize: mobile ? 25 : 27, margin: 0 }}>{product.title}</h2>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 21, whiteSpace: 'nowrap', color: sale ? 'var(--terracotta)' : 'var(--ink)' }}>{amount}</span>
                  </div>
                  {sale && isBlackFridayActive() && <span style={{ display: 'inline-block', marginTop: 10, color: 'var(--terracotta)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase' }}>Black Friday</span>}
                </div>
              </button>
            )
          })}
        </div>
      </div>
      {selected && <BusinessProductModal key={selected.id} solution={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
