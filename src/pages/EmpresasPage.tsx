import { translate as t } from '../i18n/translate'
import { ProjetoExclusivo } from '../components/sections/ProjetoExclusivo'
import { BusinessProductModal } from '../components/ui/BusinessProductModal'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Announce } from '../components/layout/Announce'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'
import { AuthModal } from '../components/ui/AuthModal'
import { CartDrawer } from '../components/ui/CartDrawer'
import { FavoritesDrawer } from '../components/ui/FavoritesDrawer'
import { useCart } from '../context/CartContext'
import { useIsMobile } from '../hooks/useIsMobile'
import { BUSINESS_SOLUTIONS } from '../data/empresas'

const BEAUTY_IDS = new Set(['kit-nail-instrutor', 'kit-pedi-instrutor', 'organizador-atendimento-f1'])
const COLLECTIONS = [
  { id: 'beauty', title: 'Beauty & Formação', description: 'Peças para profissionais de unhas, pedicures e podólogas. Apoio visual nas formações e organização no atendimento.', products: BUSINESS_SOLUTIONS.filter(product => BEAUTY_IDS.has(product.id)) },
  { id: 'marca', title: 'A sua marca em destaque', description: 'Brindes, acessórios personalizados e soluções NFC para dar visibilidade à sua empresa.', products: BUSINESS_SOLUTIONS.filter(product => !BEAUTY_IDS.has(product.id)) },
]

export function EmpresasPage() {
  const mobile = useIsMobile()
  const [selectedSolution, setSelectedSolution] = useState<(typeof BUSINESS_SOLUTIONS)[number] | null>(null)
  const { hash } = useLocation()
  useEffect(() => {
    const solution = BUSINESS_SOLUTIONS.find(item => `#${item.id}` === hash)
    if (solution) setSelectedSolution(solution)
  }, [hash])
  const { count } = useCart()
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)
  return (
    <>
      <Announce />
      <Nav onOpenAuth={() => setAuthOpen(true)} onOpenCart={() => setCartOpen(true)} onOpenFavorites={() => setFavsOpen(true)} cartCount={count} />
      <main className="shell" style={{ paddingTop: mobile ? 40 : 72, paddingBottom: 90 }}>
        <Link to="/#empresas" className="kicker">{t("← Voltar ao início")}</Link>
        <header style={{ padding: '40px 0 48px', maxWidth: 900 }}>
          <span className="kicker">{t("IDENTIDADE · UTILIDADE · LIGAÇÃO")}</span>
          <h1 className="serif" style={{ fontSize: mobile ? 50 : 'clamp(56px, 6vw, 92px)', lineHeight: 1, fontWeight: 400, margin: '24px 0' }}>{t("Da Luso ")}<em style={{ color: 'var(--terracotta)' }}>{t("para sua empresa.")}</em></h1>
          <p style={{ maxWidth: 650, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.7 }}>{t("Da primeira ideia à peça que entrega aos seus clientes. Explore as possibilidades e conte-nos o que imagina para a sua marca.")}</p>
          <p style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{t("Imagens ilustrativas. Cada projeto é desenvolvido à medida, com orçamento sob consulta.")}</p>
          <a href="#projeto-exclusivo" className="btn-ghost" style={{ display: 'inline-block', marginTop: 12 }}>{t("Quero algo exclusivo →")}</a>
        </header>
        <nav aria-label={t("Áreas para empresas")} style={{ display: 'flex', flexWrap: 'wrap', gap: 24, paddingBottom: 32 }}>
          <a href="#beauty" className="btn-ghost">{t("Beauty & Formação →")}</a>
          <a href="#marca" className="btn-ghost">{t("A sua marca em destaque →")}</a>
        </nav>
        {t(COLLECTIONS.map(collection => (
          <section key={collection.id} id={collection.id} aria-labelledby={`${collection.id}-title`} style={{ paddingTop: mobile ? 32 : 48, marginBottom: mobile ? 48 : 80, borderTop: '1px solid var(--rule)', scrollMarginTop: 120 }}>
            <h2 id={`${collection.id}-title`} className="serif" style={{ fontSize: mobile ? 36 : 48, fontWeight: 400, margin: '0 0 14px' }}>{t(collection.title)}</h2>
            <p style={{ maxWidth: 650, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 32px' }}>{t(collection.description)}</p>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: mobile ? 20 : 28 }}>
          {t(collection.products.map(solution => (
            <article className="catalog-card" key={solution.id} id={solution.id}>
              <button type="button" onClick={() => setSelectedSolution(solution)} aria-haspopup="dialog" style={{ display: 'block', width: '100%', padding: 0, border: 0, background: 'transparent', color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                <span style={{ display: 'block', position: 'relative' }}>
                <img src={solution.image} alt={t(solution.title)} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'contain', display: 'block', borderRadius: 4, background: 'var(--linen)' }} />
                  <span className="catalog-details">{t("Ver detalhes")}</span>
                </span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, marginTop: 12 }}>
                  <span className="serif" role="heading" aria-level={3} style={{ fontSize: 17, lineHeight: 1.2 }}>{t(solution.title)}</span>
                  <span className="serif" style={{ fontSize: 17, flexShrink: 0 }}>{t(solution.id === 'kit-nail-instrutor' ? 'Desde €59' : 'price' in solution && solution.price !== undefined ? `€${solution.price}` : 'Sob consulta')}</span>
                </span>
              </button>
            </article>
          )))}
        </div>
          </section>
        )))}
        <ProjetoExclusivo />
      </main>
      <Footer />
      {t(selectedSolution && <BusinessProductModal key={selectedSolution.id} solution={selectedSolution} onClose={() => setSelectedSolution(null)} />)}
      {t(authOpen && <AuthModal onClose={() => setAuthOpen(false)} />)}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </>
  )
}
