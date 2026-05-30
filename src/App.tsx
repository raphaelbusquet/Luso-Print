import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { CartProvider, useCart } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { Announce } from './components/layout/Announce'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Universos } from './components/sections/Universos'
import { Edito } from './components/sections/Edito'
import { Mundial } from './components/sections/Mundial'
import { Personalizacao } from './components/sections/Personalizacao'
import { Diario } from './components/sections/Diario'
import { Newsletter } from './components/sections/Newsletter'
import { Contacto } from './components/sections/Contacto'
import { AuthModal } from './components/ui/AuthModal'
import { CartDrawer } from './components/ui/CartDrawer'
import { FavoritesDrawer } from './components/ui/FavoritesDrawer'
import { ShopPage } from './pages/ShopPage'
import { ProfilePage } from './pages/ProfilePage'
import { DiarioPage } from './pages/DiarioPage'
import { DiarioPostPage } from './pages/DiarioPostPage'
import { TermosPage } from './pages/TermosPage'
import { MundialPage } from './pages/MundialPage'
import { CookieBanner } from './components/ui/CookieBanner'

function HomePage() {
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)
  const { count } = useCart()

  return (
    <div id="top">
      <Announce />
      <Nav
        onOpenAuth={() => setAuthOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavsOpen(true)}
        cartCount={count}
      />
      <Hero />
      <Universos />
      <Edito />
      <Personalizacao />
      <Mundial />
      <Diario />
      <Newsletter />
      <Contacto />
      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </div>
  )
}

function AppInner() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/loja" element={<ShopPage />} />
      <Route path="/loja/:universoId" element={<ShopPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/diario" element={<DiarioPage />} />
      <Route path="/diario/:id" element={<DiarioPostPage />} />
      <Route path="/termos" element={<TermosPage />} />
      <Route path="/mundial" element={<MundialPage />} />
    </Routes>
    <CookieBanner />
</>
  )
}

export function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <AppInner />
      </FavoritesProvider>
    </CartProvider>
  )
}
