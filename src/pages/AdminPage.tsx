import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useMaterials } from '../context/MaterialsContext'
import { MATERIALS } from '../data/materials'
import { VISUAL_COLORS } from '../data/shop'

const ADMIN_EMAIL = 'raphaelbusquet@outlook.com'

type User = { id: string; email?: string }

export function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const { rows, setAvailable, loading } = useMaterials()
  const [pending, setPending] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ id: data.user.id, email: data.user.email ?? undefined })
      setAuthChecked(true)
    })
  }, [])

  const isAdmin = user?.email === ADMIN_EMAIL

  const pendingKey = (material: string, color: string) => `${material}:${color}`

  const getAvailable = (material: string, color: string) => {
    const key = pendingKey(material, color)
    if (key in pending) return pending[key]
    const row = rows.find(r => r.material === material && r.color === color)
    return row ? row.available : true
  }

  const toggle = (material: string, color: string) => {
    const key = pendingKey(material, color)
    const current = getAvailable(material, color)
    setPending(prev => ({ ...prev, [key]: !current }))
  }

  const pendingCount = Object.keys(pending).length

  const handleSave = async () => {
    setSaving(true)
    for (const [key, value] of Object.entries(pending)) {
      const [material, color] = key.split(':')
      await setAvailable(material, color, value)
    }
    setPending({})
    setSaving(false)
  }

  const unavailableCount = (() => {
    const base = rows.filter(r => !r.available).length
    let delta = 0
    for (const [key, value] of Object.entries(pending)) {
      const [material, color] = key.split(':')
      const original = rows.find(r => r.material === material && r.color === color)?.available ?? true
      if (original && !value) delta++
      if (!original && value) delta--
    }
    return base + delta
  })()

  if (!authChecked) return null

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div className="serif" style={{ fontSize: 26, fontWeight: 400, marginBottom: 12 }}>Acesso restrito</div>
          <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 32 }}>
            Esta página é exclusiva para administradores.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            {!user && (
              <button
                onClick={() => supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: { redirectTo: window.location.origin + '/admin' },
                })}
                style={{
                  padding: '12px 28px', background: 'var(--ink)', color: '#fff',
                  border: 'none', borderRadius: 999, cursor: 'pointer',
                  fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontFamily: 'inherit',
                }}
              >
                Entrar com Google
              </button>
            )}
            <Link to="/" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-mute)', textTransform: 'uppercase' }}>
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--linen)' }}>

      {/* Top bar */}
      <div style={{
        background: 'var(--paper)', borderBottom: '1px solid var(--rule)',
        padding: '0 32px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span className="serif" style={{ fontSize: 17, fontWeight: 400, letterSpacing: '0.02em' }}>
            Lusoprint
          </span>
          <span style={{ color: 'var(--rule)', fontSize: 16 }}>·</span>
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
            Admin
          </span>
        </div>
        <Link
          to="/"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--ink-soft)', transition: 'color 150ms',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink-soft)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Voltar ao site
        </Link>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '40px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="serif" style={{ fontSize: 30, fontWeight: 400, marginBottom: 6 }}>
              Gestão de materiais
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>
              {user.email}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
              padding: '12px 20px', background: 'var(--paper)', borderRadius: 8,
              border: '1px solid var(--rule)', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontFamily: 'var(--serif)', color: 'rgb(50,140,70)' }}>
                {MATERIALS.length * VISUAL_COLORS.length - unavailableCount}
              </div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 2 }}>
                Em stock
              </div>
            </div>
            {unavailableCount > 0 && (
              <div style={{
                padding: '12px 20px', background: 'rgba(201,130,110,0.06)', borderRadius: 8,
                border: '1px solid rgba(201,130,110,0.3)', textAlign: 'center',
              }}>
                <div style={{ fontSize: 22, fontFamily: 'var(--serif)', color: 'var(--terracotta)' }}>
                  {unavailableCount}
                </div>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--terracotta)', marginTop: 2, opacity: 0.8 }}>
                  Fora de stock
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 20, fontSize: 11, color: 'var(--ink-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: 'rgba(60,160,80,0.10)', border: '1.5px solid rgba(60,160,80,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, color: 'rgb(50,140,70)' }}>✓</span>
            </div>
            Em stock
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: 'rgba(201,130,110,0.12)', border: '1.5px solid rgba(201,130,110,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, color: 'var(--terracotta)' }}>✕</span>
            </div>
            Fora de stock
          </div>
        </div>

        {loading ? (
          <div style={{ color: 'var(--ink-mute)', fontSize: 13, padding: '40px 0' }}>A carregar…</div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: 10, boxShadow: '0 2px 12px rgba(43,39,34,0.07)' }}>
            <table style={{ borderCollapse: 'collapse', background: 'var(--paper)', width: '100%' }}>
              <thead>
                <tr style={{ background: 'rgba(43,39,34,0.03)' }}>
                  <th style={{
                    padding: '14px 20px', textAlign: 'left',
                    fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
                    color: 'var(--ink-mute)', borderBottom: '1px solid var(--rule)',
                    whiteSpace: 'nowrap', minWidth: 140,
                  }}>
                    Material
                  </th>
                  {VISUAL_COLORS.map(c => (
                    <th key={c.name} style={{
                      padding: '10px 6px', textAlign: 'center',
                      borderBottom: '1px solid var(--rule)', whiteSpace: 'nowrap',
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: '50%', background: c.hex,
                          border: c.name === 'branco' ? '1px solid rgba(43,39,34,0.15)' : 'none',
                          boxShadow: '0 1px 4px rgba(43,39,34,0.14)',
                        }} />
                        <span style={{ fontSize: 9, letterSpacing: '0.08em', color: 'var(--ink-mute)', textTransform: 'capitalize' }}>
                          {c.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((mat, idx) => (
                  <tr key={mat} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(43,39,34,0.018)' }}>
                    <td style={{
                      padding: '11px 20px', fontSize: 12, color: 'var(--ink)',
                      borderBottom: '1px solid var(--rule)', fontWeight: 500,
                      whiteSpace: 'nowrap', letterSpacing: '0.02em',
                    }}>
                      {mat}
                    </td>
                    {VISUAL_COLORS.map(c => {
                      const avail = getAvailable(mat, c.name)
                      const isDirty = pendingKey(mat, c.name) in pending
                      return (
                        <td key={c.name} style={{ padding: '7px 6px', textAlign: 'center', borderBottom: '1px solid var(--rule)' }}>
                          <button
                            onClick={() => toggle(mat, c.name)}
                            title={avail ? 'Em stock — clique para marcar fora de stock' : 'Fora de stock — clique para repor'}
                            style={{
                              width: 34, height: 34, borderRadius: 6,
                              background: avail ? 'rgba(60,160,80,0.10)' : 'rgba(201,130,110,0.12)',
                              border: isDirty
                                ? '2px dashed var(--terracotta)'
                                : avail ? '1.5px solid rgba(60,160,80,0.45)' : '1.5px solid rgba(201,130,110,0.5)',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 160ms',
                            }}
                            aria-label={`${mat} ${c.name}: ${avail ? 'disponível' : 'indisponível'}`}
                          >
                            {avail
                              ? <span style={{ fontSize: 14, color: 'rgb(50,140,70)', lineHeight: 1 }}>✓</span>
                              : <span style={{ fontSize: 14, color: 'var(--terracotta)', lineHeight: 1 }}>✕</span>
                            }
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Save button */}
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            disabled={pendingCount === 0 || saving}
            style={{
              padding: '13px 32px', borderRadius: 999, border: 'none',
              background: pendingCount > 0 ? 'var(--ink)' : 'var(--rule)',
              color: pendingCount > 0 ? '#fff' : 'var(--ink-mute)',
              cursor: pendingCount > 0 ? 'pointer' : 'default',
              fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: 'inherit', transition: 'all 200ms',
            }}
          >
            {saving ? 'A guardar…' : pendingCount > 0 ? `Guardar alterações (${pendingCount})` : 'Guardar alterações'}
          </button>
        </div>
      </div>
    </div>
  )
}
