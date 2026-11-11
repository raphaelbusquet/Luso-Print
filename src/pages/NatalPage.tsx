import { ProductOverlay } from '../components/ui/ProductOverlay'
import { translate as t } from '../i18n/translate'
import { NatalOrnamentos } from '../components/sections/NatalOrnamentos'
import { NatalGrinch } from '../components/sections/NatalGrinch'
import { NatalPresepio } from '../components/sections/NatalPresepio'
import { NatalPlaca } from '../components/sections/NatalPlaca'
import { NatalArvoreVela } from '../components/sections/NatalArvoreVela'
import { NatalPortaRetrato } from '../components/sections/NatalPortaRetrato'
import { NatalMiniArvore } from '../components/sections/NatalMiniArvore'
import { NatalProducts } from '../components/sections/NatalProducts'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Announce } from '../components/layout/Announce'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'
import { AuthModal } from '../components/ui/AuthModal'
import { CartDrawer } from '../components/ui/CartDrawer'
import { FavoritesDrawer } from '../components/ui/FavoritesDrawer'
import { useCart } from '../context/CartContext'
import { useIsMobile } from '../hooks/useIsMobile'

const NATAL_ITEMS = [
  { id: 'bolas', title: 'Bola de Natal Vazada', price: '€10', image: '/assets/products/natal/bola-natal-vazada-1.png', Detail: NatalProducts },
  { id: 'ornamentos', title: 'Ornamentos para Árvore de Natal', price: '€10', image: '/assets/products/natal/ornamentos-arvore-2.png', Detail: NatalOrnamentos },
  { id: 'mini-arvore', title: 'Miniárvore de Natal', price: 'Desde €10', image: '/assets/products/natal/mini-arvore-atual-1.png', Detail: NatalMiniArvore },
  { id: 'porta-retrato', title: 'Porta-retrato Árvore de Natal', price: 'Desde €6', image: '/assets/products/natal/porta-retrato-arvore-1.png', Detail: NatalPortaRetrato },
  { id: 'vela', title: 'Árvore de Natal para Vela', price: '€6,49', image: '/assets/products/natal/arvore-natal-vela-1.png', Detail: NatalArvoreVela },
  { id: 'placa', title: 'Placa Feliz Natal', price: '€8,49', image: '/assets/products/natal/placa-feliz-natal-2.png', Detail: NatalPlaca },
  { id: 'presepio', title: 'Presépio de Natal', price: '€16', image: '/assets/products/natal/presepio-1.png', Detail: NatalPresepio },
  { id: 'grinch', title: 'Suporte de Parede Grinch', price: '€26', image: '/assets/products/natal/suporte-parede-grinch.png', Detail: NatalGrinch },
]

export function NatalPage() {
  const mobile = useIsMobile()
  const [selectedItem, setSelectedItem] = useState<(typeof NATAL_ITEMS)[number] | null>(null)
  const Detail = selectedItem?.Detail
  const { count } = useCart()
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)
  return (
    <>
      <Announce />
      <Nav onOpenAuth={() => setAuthOpen(true)} onOpenCart={() => setCartOpen(true)} onOpenFavorites={() => setFavsOpen(true)} cartCount={count} />
      <main>
        <section style={{ background: 'var(--linen)', padding: mobile ? '40px 0 56px' : '64px 0 80px' }}>
          <div className="shell">
            <Link to="/" className="kicker">{t("← Voltar ao início")}</Link>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', alignItems: 'center', gap: mobile ? 32 : 56, marginTop: 32 }}>
              <div>
                <span className="kicker">{t("COLEÇÃO DE NATAL · ATÉ 31 DE DEZEMBRO")}</span>
                <h1 className="serif" style={{ fontSize: mobile ? 52 : 'clamp(56px, 6vw, 94px)', lineHeight: 1, fontWeight: 400, margin: '24px 0', color: '#304737' }}>{t("Neste Natal,")}<br /><em style={{ color: 'var(--terracotta)' }}>{t("ofereça com alma.")}</em></h1>
                <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 550 }}>{t("Um lugar só para a magia desta época. Descubra aqui as peças de Natal da Luso, pensadas para decorar a casa e tornar cada presente especial.")}</p>
                <a href="#produtos-natal" className="btn btn-solid" style={{ marginTop: 16 }}>{t("Ver produtos de Natal →")}</a>
              </div>
              <img src="/assets/products/natal/placa-feliz-natal-2.png" alt={t("Placa decorativa Feliz Natal")} style={{ width: '100%', height: mobile ? 240 : 'clamp(480px, 42vw, 640px)', objectFit: mobile ? 'contain' : 'cover', objectPosition: '50% 52%', display: 'block', borderRadius: 8 }} />
            </div>
          </div>
        </section>
        <section id="produtos-natal" className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
          <span className="kicker">{t("PARA DECORAR E OFERECER")}</span>
          <h2 className="serif" style={{ fontSize: 42, fontWeight: 400, margin: '16px 0' }}>{t("Pequenos detalhes, ")}<em style={{ color: 'var(--terracotta)' }}>{t("um Natal especial.")}</em></h2>
          {mobile ? (
            <div className="natal-mobile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '28px 18px', marginTop: 32 }}>
              {NATAL_ITEMS.map(item => (
                <article className="catalog-card" key={item.id}>
                  <button type="button" aria-haspopup="dialog" onClick={() => setSelectedItem(item)} style={{ display: 'block', width: '100%', padding: 0, border: 0, background: 'transparent', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ display: 'block', position: 'relative' }}>
                      <img src={item.image} alt={t(item.title)} style={{ display: 'block', width: '100%', aspectRatio: '4/5', objectFit: 'contain', background: 'var(--linen)', borderRadius: 4 }} />
                      <span className="catalog-details">{t('Ver detalhes')}</span>
                    </span>
                    <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px 8px', marginTop: 12 }}>
                      <span className="serif" style={{ fontSize: 18, lineHeight: 1.2 }}>{t(item.title)}</span>
                      <span className="serif" style={{ fontSize: 18, whiteSpace: 'nowrap' }}>{t(item.price)}</span>
                    </span>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <>
              <NatalProducts />
              <NatalOrnamentos />
              <NatalMiniArvore />
              <NatalPortaRetrato />
              <NatalArvoreVela />
              <NatalPlaca />
              <NatalPresepio />
              <NatalGrinch />
            </>
          )}
        </section>
      </main>
      <Footer />
      {mobile && selectedItem && Detail && (
        <ProductOverlay title={t(selectedItem.title)} onClose={() => setSelectedItem(null)}>
          <div className="natal-product-detail"><Detail /></div>
        </ProductOverlay>
      )}
      {t(authOpen && <AuthModal onClose={() => setAuthOpen(false)} />)}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </>
  )
}
