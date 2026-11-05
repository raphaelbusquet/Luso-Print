import { ProjetoExclusivo } from '../components/sections/ProjetoExclusivo'
import { NailKitGallery } from '../components/ui/NailKitGallery'
import { NailKitOptions, type NailKitVersion } from '../components/ui/NailKitOptions'
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
import { BUSINESS_SOLUTIONS, businessContact } from '../data/empresas'

export function EmpresasPage() {
  const mobile = useIsMobile()
  const [nailKit, setNailKit] = useState<NailKitVersion>('master')
  const [selectedPhotos, setSelectedPhotos] = useState<Record<string, string>>({})
  const { count } = useCart()
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)
  return (
    <>
      <Announce />
      <Nav onOpenAuth={() => setAuthOpen(true)} onOpenCart={() => setCartOpen(true)} onOpenFavorites={() => setFavsOpen(true)} cartCount={count} />
      <main className="shell" style={{ paddingTop: mobile ? 40 : 72, paddingBottom: 90 }}>
        <Link to="/#empresas" className="kicker">← Voltar ao início</Link>
        <header style={{ padding: '40px 0 48px', maxWidth: 900 }}>
          <span className="kicker">IDENTIDADE · UTILIDADE · LIGAÇÃO</span>
          <h1 className="serif" style={{ fontSize: mobile ? 50 : 'clamp(56px, 6vw, 92px)', lineHeight: 1, fontWeight: 400, margin: '24px 0' }}>Da Luso <em style={{ color: 'var(--terracotta)' }}>para sua empresa.</em></h1>
          <p style={{ maxWidth: 650, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.7 }}>Da primeira ideia à peça que entrega aos seus clientes. Explore as possibilidades e conte-nos o que imagina para a sua marca.</p>
          <p style={{ fontSize: 12, color: 'var(--ink-mute)' }}>Imagens ilustrativas. Cada projeto é desenvolvido à medida, com orçamento sob consulta.</p>
          <a href="#projeto-exclusivo" className="btn-ghost" style={{ display: 'inline-block', marginTop: 12 }}>Quero algo exclusivo →</a>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: mobile ? 40 : 56 }}>
          {BUSINESS_SOLUTIONS.map((solution, i) => (
            <article key={solution.id} id={solution.id}>
              {solution.id === 'kit-nail-instrutor' ? (
                <NailKitGallery />
              ) : (
                <img src={selectedPhotos[solution.id] ?? solution.image} alt={solution.title} style={{ width: '100%', display: 'block', borderRadius: 4 }} />
              )}
              {'images' in solution && solution.images && (
                <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                  {solution.images.map((src, index) => (
                    <button key={src} onClick={() => setSelectedPhotos(current => ({ ...current, [solution.id]: src }))} aria-label={`Ver fotografia ${index + 1} de ${solution.title}`} aria-pressed={(selectedPhotos[solution.id] ?? solution.image) === src} style={{ width: 80, padding: 3, background: 'transparent', cursor: 'pointer', border: `1px solid ${(selectedPhotos[solution.id] ?? solution.image) === src ? 'var(--terracotta)' : 'var(--rule)'}`, borderRadius: 4 }}>
                      <img src={src} alt="" style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
              <p className="kicker" style={{ color: 'var(--ink-mute)', marginTop: 20 }}>0{i + 1} · {solution.id === 'kit-nail-instrutor' ? 'FORMAÇÃO & DEMONSTRAÇÃO' : 'À MEDIDA DA SUA MARCA'}</p>
              <h2 className="serif" style={{ fontWeight: 400, fontSize: 34, margin: '12px 0' }}>{solution.title}</h2>
              {'price' in solution && solution.price !== undefined && (
                <p style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 12px' }}>€{solution.price} <span style={{ fontFamily: 'var(--sans)', fontSize: 13 }}>/ unidade</span></p>
              )}
              <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{solution.description}</p>
              {solution.id === 'kit-nail-instrutor' && (
                <p style={{ color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.7, borderLeft: '2px solid var(--terracotta)', paddingLeft: 14 }}>
                  <em>Material didático demonstrativo. As brocas e lixas do kit não substituem ferramentas de uso profissional.</em>
                </p>
              )}
              {solution.id === 'kit-nail-instrutor' ? <NailKitOptions kit={nailKit} onKitChange={setNailKit} /> : (
                <a href={businessContact(solution.title)} target="_blank" rel="noopener noreferrer" className="btn-ghost">Pedir informações →</a>
              )}
            </article>
          ))}
        </div>
        <ProjetoExclusivo />
      </main>
      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </>
  )
}
