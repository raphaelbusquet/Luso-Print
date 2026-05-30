import { useState, useEffect, useRef, CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../data'
import { supabase } from '../../lib/supabase'
import { useFavorites } from '../../context/FavoritesContext'
import { useIsMobile } from '../../hooks/useIsMobile'
import type { User } from '@supabase/supabase-js'

type NavProps = {
  onOpenAuth: () => void
  onOpenCart: () => void
  onOpenFavorites: () => void
  cartCount?: number
}

function ProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

export function Nav({ onOpenAuth, onOpenCart, onOpenFavorites, cartCount = 0 }: NavProps) {
  const { count: favCount } = useFavorites()
  const isMobile = useIsMobile()
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = async () => {
    setDropdownOpen(false)
    await supabase.auth.signOut()
  }

  const linkStyle: CSSProperties = {
    position: 'relative',
    whiteSpace: 'nowrap',
    color: 'var(--ink)',
    transition: 'color 200ms ease',
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(244,239,230,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'all 300ms ease',
    }}>
      <div className="shell-wide" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 0', gap: 28,
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src="/assets/brand/lusoprint-thin.png"
            alt="Lusoprint"
            style={{ height: 90, width: 'auto', maxWidth: 'none', flexShrink: 0, display: 'block', filter: 'invert(1) opacity(0.75)' }}
          />
        </Link>

        {!isMobile && (
          <nav style={{
            display: 'flex', justifyContent: 'center', gap: 30, flexShrink: 1,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', fontSize: 12,
          }}>
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--terracotta)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          gap: isMobile ? 14 : 18, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--ink-soft)', flexShrink: 0,
        }}>
          {!isMobile && (
            <button
              onClick={onOpenFavorites}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--ink-soft)', fontFamily: 'inherit',
              }}
            >
              Favoritos
              {favCount > 0 && (
                <span style={{
                  background: 'var(--terracotta)', color: '#fff', width: 20, height: 20,
                  borderRadius: '50%', display: 'inline-flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 10, letterSpacing: 0,
                }}>
                  {favCount}
                </span>
              )}
            </button>
          )}
          <button
            onClick={onOpenCart}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--ink)', background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            {isMobile ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            ) : 'Cesto'}
            {cartCount > 0 && (
              <span style={{
                background: 'var(--terracotta)', color: '#fff', width: 20, height: 20,
                borderRadius: '50%', display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 10, letterSpacing: 0,
              }}>
                {cartCount}
              </span>
            )}
          </button>
          {!isMobile && (user ? (
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'var(--ink)', color: 'var(--paper)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 200ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--terracotta)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
                aria-label="Perfil"
              >
                <ProfileIcon />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: 'var(--paper)', border: '1px solid var(--rule)',
                  borderRadius: 4, minWidth: 180,
                  boxShadow: '0 12px 40px -8px rgba(43,39,34,0.18)',
                  animation: 'lp-fadein 160ms ease',
                  zIndex: 60,
                }}>
                  <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--rule)' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--ink)' }}>
                      {user.user_metadata?.full_name?.split(' ')[0] ?? user.email?.split('@')[0]}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2, letterSpacing: '0.02em' }}>
                      {user.email}
                    </div>
                  </div>
                  <Link
                    to="/perfil"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'block', width: '100%', padding: '12px 16px',
                      fontSize: 11, letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: 'var(--ink-soft)',
                      transition: 'color 150ms', borderBottom: '1px solid var(--rule)',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-soft)')}
                  >
                    Editar perfil
                  </Link>
                  <Link
                    to="/perfil#imagens-geradas"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: 'block', width: '100%', padding: '12px 16px',
                      fontSize: 11, letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: 'var(--ink-soft)',
                      transition: 'color 150ms', borderBottom: '1px solid var(--rule)',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-soft)')}
                  >
                    Imagens Geradas
                  </Link>
                  <button
                    onClick={handleSignOut}
                    style={{
                      display: 'block', width: '100%', padding: '12px 16px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', fontSize: 11, letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: 'var(--ink-soft)',
                      fontFamily: 'inherit', transition: 'color 150ms',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--terracotta)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontFamily: 'inherit' }}
            >
              Entrar
            </button>
          ))}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: 'none', border: 'none', padding: '4px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Menu"
            >
              <span style={{
                display: 'block', width: 22, height: 1.5, background: 'var(--ink)',
                transition: 'all 240ms ease',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', width: 22, height: 1.5, background: 'var(--ink)',
                transition: 'all 240ms ease',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block', width: 22, height: 1.5, background: 'var(--ink)',
                transition: 'all 240ms ease',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }} />
            </button>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <div style={{
          background: 'rgba(244,239,230,0.97)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--rule)',
          padding: '20px 0 28px',
          animation: 'lp-fadein 200ms ease',
        }}>
          <div className="shell-wide" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', padding: '14px 0',
                  borderBottom: '1px solid var(--rule)',
                  fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--ink)',
                }}
              >
                {label}
              </a>
            ))}
            <div style={{ marginTop: 20, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => { onOpenFavorites(); setMenuOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--ink-soft)', fontFamily: 'inherit',
                }}
              >
                Favoritos
                {favCount > 0 && (
                  <span style={{
                    background: 'var(--terracotta)', color: '#fff', width: 20, height: 20,
                    borderRadius: '50%', display: 'inline-flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 10, letterSpacing: 0,
                  }}>{favCount}</span>
                )}
              </button>
              {user ? (
                <>
                  <Link to="/perfil" onClick={() => setMenuOpen(false)} style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                    Perfil
                  </Link>
                  <button onClick={() => { handleSignOut(); setMenuOpen(false) }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontFamily: 'inherit' }}>
                    Sair
                  </button>
                </>
              ) : (
                <button onClick={() => { onOpenAuth(); setMenuOpen(false) }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)', fontFamily: 'inherit' }}>
                  Entrar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
