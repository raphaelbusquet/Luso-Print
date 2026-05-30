import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import { Announce } from '../components/layout/Announce'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'
import { AuthModal } from '../components/ui/AuthModal'
import { CartDrawer } from '../components/ui/CartDrawer'
import { FavoritesDrawer } from '../components/ui/FavoritesDrawer'
import type { User } from '@supabase/supabase-js'

type GeneratedImage = {
  id: string
  image_url: string
  name: string
  letra_color: string
  nome_color: string
  size: number
  mono: boolean
  created_at: string
}

export function ProfilePage() {
  const { count: cartCount } = useCart()
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [favsOpen, setFavsOpen] = useState(false)

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [genImages, setGenImages] = useState<GeneratedImage[]>([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const isGoogle = user?.app_metadata?.provider === 'google' ||
    user?.identities?.some(i => i.provider === 'google')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { navigate('/'); return }
      setUser(data.user)
      setName(data.user.user_metadata?.full_name ?? '')
      setEmail(data.user.email ?? '')
      setLoading(false)

      const { data: imgs } = await supabase
        .from('generated_images')
        .select('*')
        .eq('user_id', data.user.id)
        .order('created_at', { ascending: false })
      setGenImages(imgs ?? [])
      setLoadingImages(false)
    })
  }, [navigate])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password && password !== confirmPassword) {
      setError('As palavras-passe não coincidem.')
      return
    }

    setSaving(true)
    try {
      const updates: { data?: { full_name: string }; email?: string; password?: string } = {
        data: { full_name: name },
      }
      if (!isGoogle && email !== user?.email) updates.email = email
      if (!isGoogle && password) updates.password = password

      const { error: err } = await supabase.auth.updateUser(updates)
      if (err) throw err

      setSuccess(
        updates.email
          ? 'Perfil atualizado. Verifique o novo email para confirmar a alteração.'
          : 'Perfil atualizado com sucesso.'
      )
      setPassword('')
      setConfirmPassword('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao guardar alterações.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteImage = async (img: GeneratedImage) => {
    setDeletingId(img.id)
    try {
      await supabase.from('generated_images').delete().eq('id', img.id)
      // extract storage path from URL: .../generated-images/{user_id}/{file}
      const url = new URL(img.image_url)
      const parts = url.pathname.split('/generated-images/')
      if (parts[1]) {
        await supabase.storage.from('generated-images').remove([parts[1]])
      }
      setGenImages(prev => prev.filter(i => i.id !== img.id))
    } catch (e) {
      console.error('Erro ao eliminar imagem:', e)
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return null

  return (
    <div>
      <Announce />
      <Nav
        onOpenAuth={() => setAuthOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavsOpen(true)}
        cartCount={cartCount}
      />

      <div className="shell" style={{ padding: '64px 0 120px', maxWidth: 640 }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <Link
            to="/"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)', transition: 'color 160ms' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-soft)')}
          >
            ← Início
          </Link>
          <h1 className="serif" style={{ margin: '20px 0 6px', fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 400, lineHeight: 1 }}>
            O meu perfil
          </h1>
          <p style={{ margin: 0, color: 'var(--ink-mute)', fontSize: 14 }}>
            {user?.email}
          </p>
        </div>

        {/* Google notice */}
        {isGoogle && (
          <div style={{
            background: 'var(--paper-2)', border: '1px solid var(--rule)',
            borderRadius: 4, padding: '14px 18px', marginBottom: 36,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              A sua conta está ligada ao <strong>Google</strong>. Para alterar o email ou palavra-passe, faça-o diretamente nas definições da sua conta Google.
            </p>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Section: dados pessoais */}
          <div style={{ marginBottom: 40 }}>
            <div className="kicker" style={{ marginBottom: 20 }}>Dados pessoais</div>

            <Field label="Nome completo">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="O seu nome"
                style={inputStyle}
              />
            </Field>

            <Field label="Email" disabled={isGoogle}>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                disabled={isGoogle}
                placeholder="o@email.com"
                style={{ ...inputStyle, opacity: isGoogle ? 0.45 : 1, cursor: isGoogle ? 'not-allowed' : 'text' }}
              />
              {isGoogle && (
                <span style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 6, display: 'block' }}>
                  Gerido pelo Google
                </span>
              )}
            </Field>
          </div>

          {/* Section: palavra-passe */}
          <div style={{ marginBottom: 40 }}>
            <div className="kicker" style={{ marginBottom: 20 }}>
              Palavra-passe
              {isGoogle && <span style={{ marginLeft: 10, color: 'var(--ink-mute)', letterSpacing: '0.04em', textTransform: 'none', fontSize: 11 }}>— não disponível para contas Google</span>}
            </div>

            <Field label="Nova palavra-passe" disabled={isGoogle}>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                disabled={isGoogle}
                placeholder={isGoogle ? '——' : 'Deixe em branco para não alterar'}
                style={{ ...inputStyle, opacity: isGoogle ? 0.45 : 1, cursor: isGoogle ? 'not-allowed' : 'text' }}
              />
            </Field>

            <Field label="Confirmar palavra-passe" disabled={isGoogle}>
              <input
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type="password"
                disabled={isGoogle}
                placeholder={isGoogle ? '——' : 'Repita a nova palavra-passe'}
                style={{ ...inputStyle, opacity: isGoogle ? 0.45 : 1, cursor: isGoogle ? 'not-allowed' : 'text' }}
              />
            </Field>
          </div>

          {/* Feedback */}
          {error && (
            <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--terracotta)', padding: '12px 16px', background: 'rgba(201,130,110,0.08)', borderRadius: 4 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--olive)', padding: '12px 16px', background: 'rgba(141,146,116,0.1)', borderRadius: 4 }}>
              {success}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-solid"
              style={{ borderRadius: 999, padding: '13px 28px', opacity: saving ? 0.6 : 1 }}
            >
              {saving ? 'A guardar…' : 'Guardar alterações'}
            </button>
          </div>
        </form>
      </div>

      {/* Generated images */}
      <div id="imagens-geradas" style={{ borderTop: '1px solid var(--rule)', padding: '64px 0 120px' }}>
        <div className="shell" style={{ maxWidth: 900 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Imagens Geradas</div>
          <p style={{ margin: '0 0 36px', fontSize: 14, color: 'var(--ink-mute)', lineHeight: 1.6 }}>
            Pré-visualizações criadas com IA na secção de personalização.
          </p>

          {loadingImages ? (
            <div style={{ color: 'var(--ink-mute)', fontSize: 14 }}>A carregar…</div>
          ) : genImages.length === 0 ? (
            <div style={{
              padding: '48px 0', textAlign: 'center',
              border: '1px dashed var(--rule)', borderRadius: 4,
            }}>
              <p className="serif" style={{ fontSize: 20, fontStyle: 'italic', color: 'var(--ink-soft)', margin: '0 0 8px' }}>
                Ainda sem imagens geradas.
              </p>
              <Link
                to="/#personal"
                style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terracotta)' }}
              >
                Personalizar agora →
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 20,
            }}>
              {genImages.map(img => (
                <ImageCard
                  key={img.id}
                  img={img}
                  deleting={deletingId === img.id}
                  onDelete={() => handleDeleteImage(img)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
    </div>
  )
}

function Field({ label, children, disabled = false }: { label: string; children: React.ReactNode; disabled?: boolean }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: 'block' }}>
        <div style={{
          fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: disabled ? 'var(--ink-mute)' : 'var(--ink-soft)',
          fontWeight: 500, marginBottom: 8,
        }}>
          {label}
        </div>
        {children}
      </label>
    </div>
  )
}

function ImageCard({ img, deleting, onDelete }: { img: GeneratedImage; deleting: boolean; onDelete: () => void }) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const price = img.size === 23 ? 35 : 29

  function handleAddToCart() {
    addItem({
      name: `Letreiro ${img.name}`,
      price,
      productId: 'letreiro-custom',
      img: img.image_url,
      previewUrl: img.image_url,
      letraColorName: img.letra_color,
      nomeColorName: img.nome_color,
      size: img.size as 15 | 23,
      mono: img.mono,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', aspectRatio: '1', borderRadius: 4, overflow: 'hidden', background: 'var(--linen)', border: '1px solid var(--rule)' }}
      >
        <img src={img.image_url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {(hovered || deleting) && (
          <button
            onClick={onDelete}
            disabled={deleting}
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 30, height: 30, borderRadius: '50%',
              background: deleting ? 'rgba(0,0,0,0.4)' : 'rgba(201,130,110,0.92)',
              border: 'none', cursor: deleting ? 'wait' : 'pointer',
              color: '#fff', fontSize: 18, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 150ms',
            }}
            aria-label="Eliminar imagem"
          >
            {deleting ? '…' : '×'}
          </button>
        )}
      </div>
      <div>
        <div className="serif" style={{ fontSize: 15, fontStyle: 'italic', lineHeight: 1.2 }}>{img.name}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 3, letterSpacing: '0.04em' }}>
          {img.size} cm · {img.mono ? 'mono' : `${img.letra_color} / ${img.nome_color}`}
        </div>
        <div style={{ fontSize: 10, color: 'var(--ink-mute)', marginTop: 2 }}>
          {new Date(img.created_at).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            marginTop: 10, width: '100%',
            padding: '8px 12px',
            background: added ? 'var(--terracotta)' : 'var(--ink)',
            color: 'var(--linen)',
            border: 'none', borderRadius: 4,
            fontFamily: 'var(--sans)', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 250ms',
          }}
        >
          {added ? '✓ Adicionado' : `Adicionar · €${price}`}
        </button>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 0',
  fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18,
  border: 'none', borderBottom: '1px solid var(--rule)',
  background: 'transparent', color: 'var(--ink)', outline: 'none',
  boxSizing: 'border-box',
}
