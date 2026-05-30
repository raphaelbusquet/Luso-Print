import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductModal } from '../ui/ProductModal'
import { useIsMobile } from '../../hooks/useIsMobile'
import type { ShopProduct } from '../../data/shop'

type Forma = 'lata' | 'cromos' | 'chaveiro' | 'petisqueira'

const mp = '/assets/products/mundial/portugal'
const items: { id: string; nome: string; preco: number; cor: string; forma: Forma; desc: string; img: string; imgs: string[] }[] = [
  { id: 'porta-lata',   nome: 'Porta Lata Seleção',   preco: 14, cor: 'var(--mundial-red)',   forma: 'lata',        desc: 'Mantém a lata fresca durante o jogo. Impressão 3D em PLA.',      img: `${mp}/porta-lata-1.png`,   imgs: [`${mp}/porta-lata-1.png`,   `${mp}/porta-lata-2.png`,   `${mp}/porta-lata-3.png`,   `${mp}/porta-lata-4.png`]   },
  { id: 'porta-cromos', nome: 'Porta Cromos Seleção', preco: 18, cor: 'var(--mundial-green)', forma: 'cromos',      desc: 'Álbum organizador para a coleção completa. 4 bolsos por página.', img: `${mp}/porta-cromos-1.png`, imgs: [`${mp}/porta-cromos-1.png`, `${mp}/porta-cromos-2.png`, `${mp}/porta-cromos-3.png`, `${mp}/porta-cromos-3.png`] },
  { id: 'chaveiro',     nome: 'Chaveiro Bandeira',    preco: 9,  cor: '#111',                 forma: 'chaveiro',    desc: 'Miniatura da bandeira portuguesa em impressão 3D bicolor.',      img: `${mp}/chaveiro-1.png`,     imgs: [`${mp}/chaveiro-1.png`,     `${mp}/chaveiro-2.png`,     `${mp}/chaveiro-1.png`,     `${mp}/chaveiro-2.png`]     },
  { id: 'petisqueira',  nome: 'Petisqueira Seleção',  preco: 38, cor: 'var(--mundial-green)', forma: 'petisqueira', desc: 'Bandeja divisória para petiscos em dia de jogo. 4 compartimentos.',img: `${mp}/petisqueira-1.png`,  imgs: [`${mp}/petisqueira-1.png`,  `${mp}/petisqueira-2.png`,  `${mp}/petisqueira-3.png`,  `${mp}/petisqueira-4.png`]  },
]

function ShieldWatermark() {
  return (
    <svg
      viewBox="0 0 300 360" fill="none"
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '72%', opacity: 0.06, pointerEvents: 'none' }}
    >
      <path d="M150 20 L270 60 L270 180 C270 270 150 340 150 340 C150 340 30 270 30 180 L30 60 Z" stroke="white" strokeWidth="6" />
      <path d="M150 50 L245 82 L245 180 C245 255 150 315 150 315 C150 315 55 255 55 180 L55 82 Z" stroke="white" strokeWidth="3" opacity="0.6" />
      <circle cx="150" cy="180" r="50" stroke="white" strokeWidth="3" opacity="0.5" />
      <path d="M110 180 h80 M150 140 v80" stroke="white" strokeWidth="2" opacity="0.5" />
    </svg>
  )
}

function ProductShape({ forma }: { forma: Forma }) {
  const stroke = 'rgba(255,255,255,0.9)'
  const sw = 1.8

  if (forma === 'lata') return (
    <svg width="42%" viewBox="0 0 200 240" fill="none" stroke={stroke} strokeWidth={sw}>
      <ellipse cx="100" cy="58" rx="50" ry="13" />
      <line x1="50" y1="58" x2="50" y2="190" />
      <line x1="150" y1="58" x2="150" y2="190" />
      <ellipse cx="100" cy="190" rx="50" ry="13" />
      <ellipse cx="100" cy="58" rx="50" ry="13" fill="rgba(255,255,255,0.12)" />
      <line x1="62" y1="100" x2="138" y2="100" opacity="0.45" />
      <line x1="62" y1="115" x2="138" y2="115" opacity="0.3" />
      <line x1="62" y1="130" x2="138" y2="130" opacity="0.3" />
      <path d="M100 150 l-13-6 v-15 l13-5 13 5 v15 Z" opacity="0.7" />
    </svg>
  )
  if (forma === 'cromos') return (
    <svg width="60%" viewBox="0 0 240 200" fill="none" stroke={stroke} strokeWidth={sw}>
      <rect x="28" y="22" width="184" height="156" rx="8" />
      <line x1="60" y1="22" x2="60" y2="178" />
      <line x1="64" y1="26" x2="64" y2="174" opacity="0.25" />
      <rect x="78"  y="48"  width="38" height="48" rx="3" opacity="0.75" />
      <rect x="124" y="48"  width="38" height="48" rx="3" opacity="0.75" />
      <rect x="78"  y="106" width="38" height="48" rx="3" opacity="0.5"  />
      <rect x="124" y="106" width="38" height="48" rx="3" opacity="0.5"  />
    </svg>
  )
  if (forma === 'chaveiro') return (
    <svg width="36%" viewBox="0 0 160 280" fill="none" stroke={stroke} strokeWidth={sw}>
      <line x1="80" y1="18" x2="80" y2="210" />
      <path d="M80 32 L140 56 L80 80 Z" fill="rgba(255,255,255,0.15)" />
      <rect x="80" y="32" width="24" height="48" fill="rgba(4,106,56,0.5)" stroke="none" />
      <circle cx="80" cy="224" r="18" />
      <circle cx="80" cy="224" r="10" opacity="0.55" />
    </svg>
  )
  return (
    <svg width="72%" viewBox="0 0 260 220" fill="none" stroke={stroke} strokeWidth={sw}>
      <ellipse cx="130" cy="110" rx="112" ry="75" />
      <ellipse cx="130" cy="110" rx="82"  ry="55" opacity="0.65" />
      <line x1="130" y1="35"  x2="130" y2="185" opacity="0.4" />
      <line x1="46"  y1="110" x2="214" y2="110" opacity="0.4" />
      <path d="M130 128 l-12-6 v-14 l12-5 12 5 v14 Z" opacity="0.7" />
    </svg>
  )
}

function MundialCard({ item, index, onOpen }: { item: typeof items[0]; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* image area */}
      <div
        onClick={onOpen}
        style={{
          aspectRatio: '4/5',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          cursor: 'pointer',
        }}>

        {/* Front — coloured card */}
        <div style={{
          position: 'absolute', inset: 0,
          background: item.cor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 420ms cubic-bezier(.4,0,.2,1)',
        }}>
          <ShieldWatermark />
          <ProductShape forma={item.forma} />
          <div className="serif-it" style={{
            position: 'absolute', top: 18, left: 22,
            fontSize: 28, color: 'rgba(255,255,255,0.55)',
          }}>
            0{index + 1}
          </div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 2, background: 'var(--mundial-gold)', opacity: 0.7,
          }} />
          <div style={{
            position: 'absolute', bottom: 14, right: 14,
            fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
          }}>
            Edição limitada
          </div>
        </div>

        {/* Back — reveal panel */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#0E0E0E',
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(218,41,28,0.12) 0%, transparent 55%), radial-gradient(circle at 70% 70%, rgba(4,106,56,0.12) 0%, transparent 55%)',
          transform: hovered ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 420ms cubic-bezier(.4,0,.2,1)',
          display: 'flex', flexDirection: 'column',
          padding: '28px 24px',
          justifyContent: 'space-between',
        }}>
          {/* product photo */}
          <div style={{
            flex: 1, borderRadius: 2, overflow: 'hidden',
            marginBottom: 20, position: 'relative',
          }}>
            <img
              src={item.img}
              alt={item.nome}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* info */}
          <div>
            <div style={{
              fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--mundial-gold)', marginBottom: 8, opacity: 0.9,
            }}>
              Coleção Mundial · Edição limitada
            </div>
            <div className="serif" style={{ fontSize: 22, color: '#F4EFE6', lineHeight: 1.15, marginBottom: 10 }}>
              {item.nome}
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '0 0 18px', lineHeight: 1.6 }}>
              {item.desc}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="serif" style={{ fontSize: 22, color: 'var(--mundial-gold)' }}>€{item.preco}</span>
              <button style={{
                padding: '9px 18px', borderRadius: 999,
                background: 'transparent',
                border: '1px solid rgba(212,168,48,0.5)',
                color: 'var(--mundial-gold)',
                fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
                fontFamily: 'inherit', cursor: 'pointer',
                transition: 'background 200ms, border-color 200ms',
              }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.background = 'var(--mundial-gold)'; b.style.color = '#111'; b.style.borderColor = 'var(--mundial-gold)' }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.background = 'transparent'; b.style.color = 'var(--mundial-gold)'; b.style.borderColor = 'rgba(212,168,48,0.5)' }}
              >
                Adicionar ao cesto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* caption below */}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div className="serif" style={{ fontSize: 20, color: '#F4EFE6', lineHeight: 1.2 }}>{item.nome}</div>
        <div className="serif" style={{ fontSize: 18, color: 'var(--mundial-gold)' }}>€{item.preco}</div>
      </div>
    </div>
  )
}

export function Mundial() {
  const [modalProduct, setModalProduct] = useState<ShopProduct | null>(null)
  const isMobile = useIsMobile()

  const toShopProduct = (item: typeof items[0]): ShopProduct => ({
    id: item.id, name: item.nome, price: item.preco,
    img: item.img, imgs: item.imgs,
    tag: 'EDIÇÃO LIMITADA', universoId: 'mundial', color: item.cor,
  })

  return (
    <section id="mundial" style={{
      padding: '120px 0 140px',
      position: 'relative',
      overflow: 'hidden',
      color: '#F4EFE6',
      background: 'linear-gradient(118deg, #011F10 0%, #012918 48%, #1C0605 48%, #250806 100%)',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(118deg, transparent 47.4%, rgba(218,41,28,0.18) 47.4%, rgba(218,41,28,0.18) 48.6%, transparent 48.6%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, transparent, var(--mundial-gold), transparent)',
        opacity: 0.55,
      }} />
      <div className="serif-it" style={{
        position: 'absolute', top: 10, right: -10,
        fontSize: 'clamp(200px, 28vw, 460px)',
        lineHeight: 0.85, color: 'var(--mundial-gold)',
        opacity: 0.05, fontWeight: 400,
        pointerEvents: 'none', userSelect: 'none',
      }}>
        '26
      </div>

      <div className="shell" style={{ position: 'relative' }}>
        <div className="section-head" style={{ borderColor: 'rgba(212,168,48,0.25)' }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--mundial-gold)', fontWeight: 500 }}>
                04 — Edição limitada
              </span>
              <span style={{ width: 60, height: 1, background: 'var(--mundial-gold)', opacity: 0.5 }} />
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
                disponível enquanto a bola rola
              </span>
            </div>
            <h2 className="serif" style={{
              fontSize: 'clamp(56px, 8vw, 128px)',
              lineHeight: 0.9, letterSpacing: '-0.015em',
              color: '#F4EFE6', margin: 0, fontWeight: 400,
            }}>
              Coleção <em style={{ fontStyle: 'italic', color: 'var(--mundial-gold)' }}>Mundial</em><br />
              <span style={{ color: 'var(--mundial-red)' }}>·</span>
              <span style={{ color: 'var(--mundial-gold)', margin: '0 18px' }}>·</span>
              <span style={{ color: 'var(--mundial-green)' }}>·</span>
            </h2>
          </div>
          <div style={{ maxWidth: 360, paddingBottom: 14, color: 'rgba(255,255,255,0.68)' }}>
            <p style={{ margin: 0 }}>
              Pequenos rituais para acompanhar o jogo — pensados em vermelho e verde, com a serenidade Lusoprint.
            </p>
            <Link to="/mundial" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              marginTop: 22, paddingBottom: 6,
              fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase',
              color: 'var(--mundial-gold)', borderBottom: '1px solid rgba(212,168,48,0.5)',
            }}>
              Ver coleção completa →
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))', gap: isMobile ? 14 : 22 }}>
          {items.map((it, i) => <MundialCard key={i} item={it} index={i} onOpen={() => setModalProduct(toShopProduct(it))} />)}
        </div>

        <div style={{
          marginTop: isMobile ? 40 : 80, paddingTop: 40,
          borderTop: '1px solid rgba(212,168,48,0.2)',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between', gap: isMobile ? 20 : 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 20, height: 20, background: 'var(--mundial-red)',   borderRadius: '50%', boxShadow: '0 0 12px rgba(218,41,28,0.6)' }} />
            <span style={{ width: 20, height: 20, background: 'var(--mundial-gold)',  borderRadius: '50%', boxShadow: '0 0 12px rgba(212,168,48,0.5)' }} />
            <span style={{ width: 20, height: 20, background: 'var(--mundial-green)', borderRadius: '50%', boxShadow: '0 0 12px rgba(4,106,56,0.6)' }} />
            <span style={{ marginLeft: 14, fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
              Lançamento · Junho de 2026
            </span>
          </div>
          <p className="serif-it" style={{
            fontStyle: 'italic', fontSize: 22, color: 'rgba(255,255,255,0.55)',
            margin: 0, maxWidth: 460, textAlign: 'right',
          }}>
            "A casa, em dia de jogo, é o melhor lugar do mundo."
          </p>
        </div>
      </div>

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </section>
  )
}
