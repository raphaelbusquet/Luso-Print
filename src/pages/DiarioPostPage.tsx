import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { DIARIO } from '../data'
import { Announce } from '../components/layout/Announce'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'
import { AuthModal } from '../components/ui/AuthModal'
import { CartDrawer } from '../components/ui/CartDrawer'
import { FavoritesDrawer } from '../components/ui/FavoritesDrawer'
import { useCart } from '../context/CartContext'

export function DiarioPostPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { count: cartCount } = useCart()
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)

  const post = DIARIO.find(d => d.id === id)

  if (!post) {
    return (
      <div>
        <Announce />
        <Nav
          onOpenAuth={() => setAuthOpen(true)}
          onOpenCart={() => setCartOpen(true)}
          onOpenFavorites={() => setFavsOpen(true)}
          cartCount={cartCount}
        />
        <div style={{ padding: '120px 0', textAlign: 'center' }}>
          <p className="serif" style={{ fontSize: 24, fontStyle: 'italic', color: 'var(--ink-soft)' }}>
            Texto não encontrado.
          </p>
          <button
            onClick={() => navigate('/diario')}
            style={{ marginTop: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--terracotta)', fontFamily: 'inherit' }}
          >
            ← Todos os textos
          </button>
        </div>
        {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
      </div>
    )
  }

  const currentIndex = DIARIO.findIndex(d => d.id === id)
  const prev = currentIndex > 0 ? DIARIO[currentIndex - 1] : null
  const next = currentIndex < DIARIO.length - 1 ? DIARIO[currentIndex + 1] : null

  return (
    <div>
      <Announce />
      <Nav
        onOpenAuth={() => setAuthOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavsOpen(true)}
        cartCount={cartCount}
      />

      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--rule)', padding: '28px 0' }}>
        <div className="shell-wide" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link
            to="/diario"
            style={{
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ink-soft)', transition: 'color 160ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-soft)')}
          >
            ← Diário
          </Link>
          <div style={{ textAlign: 'center' }}>
            <div className="kicker" style={{ marginBottom: 4 }}>Lusoprint</div>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1 }}>Diário</div>
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
            {post.cat}
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="shell" style={{ padding: '64px 0 100px', maxWidth: 740 }}>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 32 }}>
          <span style={{
            color: 'var(--terracotta)',
            fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500,
          }}>
            {post.cat}
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          <span style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h1 className="serif" style={{
          fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1,
          fontWeight: 400, letterSpacing: '-0.01em',
          margin: '0 0 28px',
        }}>
          {post.ttl}
        </h1>

        {/* Lead */}
        <p style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 20, lineHeight: 1.6, color: 'var(--ink)',
          margin: '0 0 40px',
          borderLeft: '3px solid var(--terracotta)',
          paddingLeft: 24,
        }}>
          {post.lead}
        </p>

        {/* Hero image */}
        <div style={{
          aspectRatio: '16/9', borderRadius: 4, overflow: 'hidden',
          background: 'var(--linen)', marginBottom: 48,
        }}>
          <div style={{
            width: '100%', height: '100%',
            background: `url(${post.img}) center/cover no-repeat`,
            filter: 'saturate(0.9)',
          }} />
        </div>

        {/* Body paragraphs */}
        <div>
          {post.body.trim().split('\n\n').map((para, i) => (
            <p key={i} style={{
              fontSize: 16, lineHeight: 1.85, color: 'var(--ink-soft)',
              margin: '0 0 24px', letterSpacing: '0.01em',
            }}>
              {para.trim()}
            </p>
          ))}
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div style={{
            marginTop: 80, paddingTop: 40,
            borderTop: '1px solid var(--rule)',
            display: 'flex', justifyContent: 'space-between', gap: 24,
          }}>
            {prev ? (
              <Link
                to={`/diario/${prev.id}`}
                style={{
                  flex: 1, textDecoration: 'none',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}
              >
                <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
                  ← Anterior
                </span>
                <span className="serif" style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {prev.ttl}
                </span>
              </Link>
            ) : <div style={{ flex: 1 }} />}
            {next ? (
              <Link
                to={`/diario/${next.id}`}
                style={{
                  flex: 1, textDecoration: 'none', textAlign: 'right',
                  display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end',
                }}
              >
                <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
                  Seguinte →
                </span>
                <span className="serif" style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.3 }}>
                  {next.ttl}
                </span>
              </Link>
            ) : <div style={{ flex: 1 }} />}
          </div>
        )}
      </div>

      <Footer />

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </div>
  )
}
