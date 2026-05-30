import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UNIVERSOS } from '../../data'

const layouts = [
  { col: 'span 4', row: 'span 2' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 4', row: 'span 2' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 4', row: 'span 1' },
  { col: 'span 6', row: 'span 1' },
  { col: 'span 6', row: 'span 1' },
]

export function Universos() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="universos" style={{ padding: '100px 0 90px' }}>
      <div className="shell">
        <div className="section-head">
          <div style={{ maxWidth: 560 }}>
            <span className="kicker">01 — Por universos</span>
            <h2>
              Casas que se<br />compõem como{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>poemas</em>.
            </h2>
          </div>
          <div style={{ maxWidth: 380, paddingBottom: 14 }}>
            <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 16, lineHeight: 1.7 }}>
              Organizadas por momento e por gesto — da papelaria ao quarto da bebé, do canto do café à mesa onde se recebe.
            </p>
            <Link to="/loja" className="btn-ghost" style={{ marginTop: 18, display: 'inline-block' }}>
              Ver todas →
            </Link>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gridAutoRows: 'minmax(160px, auto)',
          gap: 14,
        }}>
          {UNIVERSOS.map((u, i) => {
            const lay = layouts[i] ?? { col: 'span 4', row: 'span 1' }
            const isH = hovered === u.id
            const isTall = lay.row.includes('2')

            return (
              <Link
                key={u.id}
                to={`/loja/${u.id}`}
                onMouseEnter={() => setHovered(u.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn: lay.col, gridRow: lay.row,
                  position: 'relative',
                  background: '#2B2722',
                  overflow: 'hidden',
                  borderRadius: 3,
                  minHeight: 200,
                  cursor: 'pointer',
                  display: 'block',
                }}
              >
                {/* product photo */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `url(${u.img}) center/cover no-repeat`,
                  opacity: isH ? 0.92 : 0.82,
                  filter: 'saturate(1.05)',
                  transform: isH ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 900ms cubic-bezier(.2,.7,.2,1), opacity 600ms ease',
                }} />
                {/* brand-palette translucent veil */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: u.overlay,
                  pointerEvents: 'none',
                }} />
                {/* bottom gradient for text legibility */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(43,39,34,0) 35%, rgba(43,39,34,0.55) 100%)',
                  pointerEvents: 'none',
                }} />

                <div style={{
                  position: 'absolute', left: 22, right: 22, bottom: 22,
                  color: '#fff', display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 16,
                }}>
                  <div>
                    <div className="kicker" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>
                      Universo · {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="serif" style={{
                      fontSize: isTall ? 44 : 32,
                      lineHeight: 1,
                      letterSpacing: '-0.005em',
                    }}>
                      {u.nome}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.92)', color: 'var(--ink)',
                    padding: '8px 12px', borderRadius: 999,
                  }}>
                    {u.cnt} peças
                  </div>
                </div>

                <div style={{
                  position: 'absolute', top: 18, left: 22, color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14,
                }}>
                  —— 0{i + 1}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
