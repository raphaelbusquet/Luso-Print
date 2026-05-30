import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DIARIO } from '../data'
import { Announce } from '../components/layout/Announce'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'
import { AuthModal } from '../components/ui/AuthModal'
import { CartDrawer } from '../components/ui/CartDrawer'
import { FavoritesDrawer } from '../components/ui/FavoritesDrawer'
import { useCart } from '../context/CartContext'
import type { DiarioPost } from '../data'

export function DiarioPage() {
  const { count: cartCount } = useCart()
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)

  return (
    <div>
      <Announce />
      <Nav
        onOpenAuth={() => setAuthOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavsOpen(true)}
        cartCount={cartCount}
      />

      <div style={{ borderBottom: '1px solid var(--rule)', padding: '28px 0' }}>
        <div className="shell-wide" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link
            to="/#diario"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ink-soft)', transition: 'color 160ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-soft)')}
          >
            ← Início
          </Link>
          <div style={{ textAlign: 'center' }}>
            <div className="kicker" style={{ marginBottom: 4 }}>Lusoprint</div>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1 }}>Diário</div>
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
            {DIARIO.length} textos
          </div>
        </div>
      </div>

      <div className="shell-wide" style={{ padding: '60px 0 120px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '48px 32px',
        }}>
          {DIARIO.map((post) => (
            <ArticleCard key={post.id} post={post} onOpen={() => navigate(`/diario/${post.id}`)} />
          ))}
        </div>
      </div>

      <Footer />

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </div>
  )
}

function ArticleCard({ post, onOpen }: { post: DiarioPost; onOpen: () => void }) {
  return (
    <article
      onClick={onOpen}
      style={{ cursor: 'pointer' }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector<HTMLElement>('.lp-art-img')
        if (img) img.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector<HTMLElement>('.lp-art-img')
        if (img) img.style.transform = 'scale(1)'
      }}
    >
      <div style={{
        aspectRatio: '5/6', borderRadius: 2, overflow: 'hidden',
        background: 'var(--linen)', position: 'relative', marginBottom: 22,
      }}>
        <div
          className="lp-art-img"
          style={{
            position: 'absolute', inset: 0,
            background: `url(${post.img}) center/cover no-repeat`,
            transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)',
            filter: 'saturate(0.92)',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14 }}>
        <span style={{
          display: 'inline-block', color: 'var(--terracotta)',
          fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500,
        }}>
          {post.cat}
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
        <span style={{ fontSize: 11, color: 'var(--ink-mute)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
          {post.date}
        </span>
      </div>
      <h3 className="serif" style={{
        margin: 0, lineHeight: 1.2, letterSpacing: '-0.005em', fontWeight: 400, fontSize: 22,
      }}>
        {post.ttl}
      </h3>
      <p style={{
        marginTop: 10, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-mute)',
        fontFamily: 'var(--serif)', fontStyle: 'italic',
      }}>
        {post.lead}
      </p>
      <div style={{
        marginTop: 14, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--ink-soft)', display: 'inline-flex', gap: 8, alignItems: 'center',
      }}>
        Ler texto <span style={{ color: 'var(--terracotta)' }}>→</span>
      </div>
    </article>
  )
}
