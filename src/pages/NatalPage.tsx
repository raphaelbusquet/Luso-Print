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

export function NatalPage() {
  const mobile = useIsMobile()
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
            <Link to="/" className="kicker">← Voltar ao início</Link>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', alignItems: 'center', gap: mobile ? 32 : 56, marginTop: 32 }}>
              <div>
                <span className="kicker">COLEÇÃO DE NATAL · ATÉ 31 DE DEZEMBRO</span>
                <h1 className="serif" style={{ fontSize: mobile ? 52 : 'clamp(56px, 6vw, 94px)', lineHeight: 1, fontWeight: 400, margin: '24px 0', color: '#304737' }}>Neste Natal,<br /><em style={{ color: 'var(--terracotta)' }}>ofereça com alma.</em></h1>
                <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 550 }}>Um lugar só para a magia desta época. Descubra aqui as peças de Natal da Luso, pensadas para decorar a casa e tornar cada presente especial.</p>
                <a href="#produtos-natal" className="btn btn-solid" style={{ marginTop: 16 }}>Ver produtos de Natal →</a>
              </div>
              <img src="/assets/products/natal/placa-feliz-natal-2.png" alt="Placa decorativa Feliz Natal" style={{ width: '100%', height: mobile ? 'auto' : 'clamp(480px, 42vw, 640px)', aspectRatio: mobile ? '1 / 1' : undefined, objectFit: 'cover', objectPosition: '50% 52%', display: 'block', borderRadius: 8 }} />
            </div>
          </div>
        </section>
        <section id="produtos-natal" className="shell" style={{ paddingTop: 64, paddingBottom: 80 }}>
          <span className="kicker">PARA DECORAR E OFERECER</span>
          <h2 className="serif" style={{ fontSize: 42, fontWeight: 400, margin: '16px 0' }}>Pequenos detalhes, <em style={{ color: 'var(--terracotta)' }}>um Natal especial.</em></h2>
          <NatalProducts />
          <NatalOrnamentos />
          <NatalMiniArvore />
          <NatalPortaRetrato />
          <NatalArvoreVela />
          <NatalPlaca />
          <NatalPresepio />
          <NatalGrinch />
        </section>
      </main>
      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </>
  )
}
