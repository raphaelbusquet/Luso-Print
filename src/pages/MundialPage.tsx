import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import { Announce } from '../components/layout/Announce'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'
import { AuthModal } from '../components/ui/AuthModal'
import { CartDrawer } from '../components/ui/CartDrawer'
import { FavoritesDrawer } from '../components/ui/FavoritesDrawer'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { ProductModal } from '../components/ui/ProductModal'
import type { ShopProduct } from '../data/shop'

const WA_NUMBER = '351939158345'

type Selecao = {
  id: string
  nome: string
  cores: string[]
  dir: 'row' | 'column'
  cor1: string
}

const SELECOES: Selecao[] = [
  { id: 'portugal',   nome: 'Portugal',   cores: ['#046A38', '#DA291C'],              dir: 'row',    cor1: '#DA291C' },
  { id: 'brasil',     nome: 'Brasil',     cores: ['#009C3B', '#1A4693', '#FEDD00'],   dir: 'row',    cor1: '#009C3B' },
  { id: 'cabo-verde', nome: 'Cabo Verde', cores: ['#003893', '#CF2027', '#FFFFFF'],   dir: 'column', cor1: '#003893' },
  { id: 'espanha',    nome: 'Espanha',    cores: ['#AA151B', '#F1BF00', '#AA151B'],   dir: 'column', cor1: '#AA151B' },
  { id: 'italia',     nome: 'Itália',     cores: ['#009246', '#EEEEEE', '#CE2B37'],   dir: 'row',    cor1: '#009246' },
  { id: 'alemanha',   nome: 'Alemanha',   cores: ['#111111', '#DD0000', '#FFCE00'],   dir: 'column', cor1: '#111111' },
  { id: 'franca',     nome: 'França',     cores: ['#002395', '#EEEEEE', '#ED2939'],   dir: 'row',    cor1: '#002395' },
  { id: 'argentina',  nome: 'Argentina',  cores: ['#74ACDF', '#FFFFFF', '#74ACDF'],   dir: 'column', cor1: '#74ACDF' },
  { id: 'inglaterra', nome: 'Inglaterra', cores: ['#CF081F', '#E8E8E8'],              dir: 'row',    cor1: '#CF081F' },
  { id: 'uruguai',    nome: 'Uruguai',    cores: ['#3D6EB4', '#FFFFFF', '#3D6EB4'],   dir: 'column', cor1: '#3D6EB4' },
  { id: 'holanda',    nome: 'Holanda',    cores: ['#AE1C28', '#FFFFFF', '#21468B'],   dir: 'column', cor1: '#E06B00' },
]

function FlagStrip({ cores, dir }: { cores: string[]; dir: 'row' | 'column' }) {
  return (
    <span style={{
      display: 'flex', flexDirection: dir, flexShrink: 0,
      width: 22, height: 15, borderRadius: 2,
      overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)',
    }}>
      {cores.map((c, i) => <span key={i} style={{ flex: 1, background: c }} />)}
    </span>
  )
}

type Produto = {
  id: string
  nome: string
  preco: number
  desc: string
  corDefault: string
  forma: 'lata' | 'cromos' | 'chaveiro' | 'petisqueira'
  fixedColor?: boolean
}

const mp = '/assets/products/mundial'

type CountryImgs = Record<string, string[]>

const COMUM_IMGS: CountryImgs = {
  'chaveiro-taca':    [`${mp}/comum/chaveiro-1.png`,    `${mp}/comum/chaveiro-2.png`,    `${mp}/comum/chaveiro-3.png`,    `${mp}/comum/chaveiro-4.png`],
  'petisqueira-2026': [`${mp}/comum/petisqueira-1.png`, `${mp}/comum/petisqueira-2.png`, `${mp}/comum/petisqueira-3.png`, `${mp}/comum/petisqueira-4.png`],
}

const SELECAO_IMGS: Record<string, CountryImgs> = {
  portugal: {
    'porta-lata':       [`${mp}/portugal/porta-lata-1.png`,       `${mp}/portugal/porta-lata-2.png`,       `${mp}/portugal/porta-lata-3.png`,       `${mp}/portugal/porta-lata-4.png`],
    'porta-cromos':     [`${mp}/portugal/porta-cromos-1.png`,     `${mp}/portugal/porta-cromos-2.png`,     `${mp}/portugal/porta-cromos-3.png`,     `${mp}/portugal/porta-cromos-4.png`],
    'chaveiro':         [`${mp}/portugal/chaveiro-1.png`,         `${mp}/portugal/chaveiro-2.png`,         `${mp}/portugal/chaveiro-3.png`,         `${mp}/portugal/chaveiro-4.png`],
    'petisqueira':      [`${mp}/portugal/petisqueira-1.png`,      `${mp}/portugal/petisqueira-2.png`,      `${mp}/portugal/petisqueira-3.png`,      `${mp}/portugal/petisqueira-4.png`],
    'petisqueira-2026': [`${mp}/portugal/petisqueira-2026-1.png`, `${mp}/portugal/petisqueira-2026-2.png`, `${mp}/portugal/petisqueira-2026-3.png`, `${mp}/portugal/petisqueira-2026-4.png`],
  },
  'cabo-verde': {
    'porta-lata':   [`${mp}/cabo-verde/porta-lata-1.png`,   `${mp}/cabo-verde/porta-lata-2.png`,   `${mp}/cabo-verde/porta-lata-3.png`,   `${mp}/cabo-verde/porta-lata-4.png`],
    'porta-cromos': [`${mp}/cabo-verde/porta-cromos-1.png`, `${mp}/cabo-verde/porta-cromos-2.png`, `${mp}/cabo-verde/porta-cromos-3.png`, `${mp}/cabo-verde/porta-cromos-4.png`],
    'chaveiro':     [`${mp}/cabo-verde/chaveiro-1.png`,     `${mp}/cabo-verde/chaveiro-2.png`,     `${mp}/cabo-verde/chaveiro-3.png`,     `${mp}/cabo-verde/chaveiro-4.png`],
    'petisqueira':  [`${mp}/cabo-verde/petisqueira-1.png`,  `${mp}/cabo-verde/petisqueira-2.png`,  `${mp}/cabo-verde/petisqueira-3.png`,  `${mp}/cabo-verde/petisqueira-4.png`],
  },
  brasil: {
    'porta-lata':   [`${mp}/brasil/porta-lata-1.png`,   `${mp}/brasil/porta-lata-2.png`,   `${mp}/brasil/porta-lata-3.png`,   `${mp}/brasil/porta-lata-4.png`],
    'porta-cromos': [`${mp}/brasil/porta-cromos-1.png`, `${mp}/brasil/porta-cromos-2.png`, `${mp}/brasil/porta-cromos-3.png`, `${mp}/brasil/porta-cromos-4.png`],
    'chaveiro':     [`${mp}/brasil/chaveiro-1.png`,     `${mp}/brasil/chaveiro-2.png`,     `${mp}/brasil/chaveiro-3.png`,     `${mp}/brasil/chaveiro-4.png`],
    'petisqueira':  [`${mp}/brasil/petisqueira-1.png`,  `${mp}/brasil/petisqueira-2.png`,  `${mp}/brasil/petisqueira-3.png`,  `${mp}/brasil/petisqueira-4.png`],
  },
  franca: {
    'porta-lata':   [`${mp}/franca/porta-lata-1.png`,   `${mp}/franca/porta-lata-2.png`,   `${mp}/franca/porta-lata-3.png`,   `${mp}/franca/porta-lata-4.png`],
    'porta-cromos': [`${mp}/franca/porta-cromos-1.png`, `${mp}/franca/porta-cromos-2.png`, `${mp}/franca/porta-cromos-3.png`, `${mp}/franca/porta-cromos-4.png`],
    'chaveiro':     [`${mp}/franca/chaveiro-1.png`,     `${mp}/franca/chaveiro-2.png`,     `${mp}/franca/chaveiro-3.png`,     `${mp}/franca/chaveiro-4.png`],
    'petisqueira':  [`${mp}/franca/petisqueira-1.png`,  `${mp}/franca/petisqueira-2.png`,  `${mp}/franca/petisqueira-3.png`,  `${mp}/franca/petisqueira-4.png`],
  },
  argentina: {
    'porta-lata':  [`${mp}/argentina/porta-lata-1.png`,  `${mp}/argentina/porta-lata-2.png`,  `${mp}/argentina/porta-lata-3.png`,  `${mp}/argentina/porta-lata-4.png`],
    'chaveiro':    [`${mp}/argentina/chaveiro-1.png`,    `${mp}/argentina/chaveiro-2.png`,    `${mp}/argentina/chaveiro-3.png`,    `${mp}/argentina/chaveiro-4.png`],
    'petisqueira': [`${mp}/argentina/petisqueira-1.png`, `${mp}/argentina/petisqueira-2.png`, `${mp}/argentina/petisqueira-3.png`, `${mp}/argentina/petisqueira-4.png`],
  },
  alemanha: {
    'porta-lata':   [`${mp}/alemanha/porta-lata-1.png`,   `${mp}/alemanha/porta-lata-2.png`,   `${mp}/alemanha/porta-lata-3.png`,   `${mp}/alemanha/porta-lata-4.png`],
    'porta-cromos': [`${mp}/alemanha/porta-cromos-1.png`, `${mp}/alemanha/porta-cromos-2.png`, `${mp}/alemanha/porta-cromos-3.png`, `${mp}/alemanha/porta-cromos-4.png`],
    'chaveiro':     [`${mp}/alemanha/chaveiro-1.png`,     `${mp}/alemanha/chaveiro-2.png`,     `${mp}/alemanha/chaveiro-3.png`,     `${mp}/alemanha/chaveiro-4.png`],
    'petisqueira':  [`${mp}/alemanha/petisqueira-1.png`,  `${mp}/alemanha/petisqueira-2.png`,  `${mp}/alemanha/petisqueira-3.png`,  `${mp}/alemanha/petisqueira-4.png`],
  },
  italia: {
    'porta-lata':  [`${mp}/italia/porta-lata-1.png`,  `${mp}/italia/porta-lata-2.png`,  `${mp}/italia/porta-lata-3.png`,  `${mp}/italia/porta-lata-4.png`],
    'chaveiro':    [`${mp}/italia/chaveiro-1.png`,    `${mp}/italia/chaveiro-2.png`,    `${mp}/italia/chaveiro-3.png`,    `${mp}/italia/chaveiro-4.png`],
    'petisqueira': [`${mp}/italia/petisqueira-1.png`, `${mp}/italia/petisqueira-2.png`, `${mp}/italia/petisqueira-3.png`, `${mp}/italia/petisqueira-4.png`],
  },
  espanha: {
    'porta-lata':  [`${mp}/espanha/porta-lata-1.png`,  `${mp}/espanha/porta-lata-2.png`,  `${mp}/espanha/porta-lata-3.png`,  `${mp}/espanha/porta-lata-4.png`],
    'chaveiro':    [`${mp}/espanha/chaveiro-1.png`,    `${mp}/espanha/chaveiro-2.png`,    `${mp}/espanha/chaveiro-3.png`,    `${mp}/espanha/chaveiro-4.png`],
    'petisqueira': [`${mp}/espanha/petisqueira-1.png`, `${mp}/espanha/petisqueira-2.png`, `${mp}/espanha/petisqueira-3.png`, `${mp}/espanha/petisqueira-4.png`],
  },
  inglaterra: {
    'porta-lata':  [`${mp}/inglaterra/porta-lata-1.png`,  `${mp}/inglaterra/porta-lata-2.png`,  `${mp}/inglaterra/porta-lata-3.png`,  `${mp}/inglaterra/porta-lata-4.png`],
    'chaveiro':    [`${mp}/inglaterra/chaveiro-1.png`,    `${mp}/inglaterra/chaveiro-2.png`,    `${mp}/inglaterra/chaveiro-3.png`,    `${mp}/inglaterra/chaveiro-4.png`],
    'petisqueira': [`${mp}/inglaterra/petisqueira-1.png`, `${mp}/inglaterra/petisqueira-2.png`, `${mp}/inglaterra/petisqueira-3.png`, `${mp}/inglaterra/petisqueira-4.png`],
  },
  uruguai: {
    'porta-lata':  [`${mp}/uruguai/porta-lata-1.png`,  `${mp}/uruguai/porta-lata-2.png`,  `${mp}/uruguai/porta-lata-3.png`,  `${mp}/uruguai/porta-lata-4.png`],
    'chaveiro':    [`${mp}/uruguai/chaveiro-1.png`,    `${mp}/uruguai/chaveiro-2.png`,    `${mp}/uruguai/chaveiro-3.png`,    `${mp}/uruguai/chaveiro-4.png`],
    'petisqueira': [`${mp}/uruguai/petisqueira-1.png`, `${mp}/uruguai/petisqueira-2.png`, `${mp}/uruguai/petisqueira-3.png`, `${mp}/uruguai/petisqueira-4.png`],
  },
  holanda: {
    'porta-lata':  [`${mp}/holanda/porta-lata-1.png`,  `${mp}/holanda/porta-lata-2.png`,  `${mp}/holanda/porta-lata-3.png`,  `${mp}/holanda/porta-lata-4.png`],
    'chaveiro':    [`${mp}/holanda/chaveiro-1.png`,    `${mp}/holanda/chaveiro-2.png`,    `${mp}/holanda/chaveiro-3.png`,    `${mp}/holanda/chaveiro-4.png`],
    'petisqueira': [`${mp}/holanda/petisqueira-1.png`, `${mp}/holanda/petisqueira-2.png`, `${mp}/holanda/petisqueira-3.png`, `${mp}/holanda/petisqueira-4.png`],
  },
}

function getImgs(selecaoId: string | undefined, produtoId: string): string[] | null {
  if (selecaoId) {
    const specific = SELECAO_IMGS[selecaoId]?.[produtoId]
    if (specific) return specific
  }
  return COMUM_IMGS[produtoId] ?? null
}

const PRODUTOS: Produto[] = [
  { id: 'porta-lata',   nome: 'Porta Lata Seleção',  preco: 18, desc: 'Mantém a lata fresca durante o jogo. PLA reciclável.',            corDefault: 'var(--mundial-red)',   forma: 'lata'        },
  { id: 'porta-cromos', nome: 'Porta Cromos Seleção', preco: 16, desc: 'Álbum organizador para a coleção completa. 4 bolsos por página.', corDefault: 'var(--mundial-green)', forma: 'cromos'      },
  { id: 'chaveiro',     nome: 'Chaveiro FIFA 26',     preco: 5,  desc: 'Chaveiro "26" com taça FIFA em impressão 3D. Nas cores da tua seleção.', corDefault: '#1A1A1A', forma: 'chaveiro', fixedColor: true },
  { id: 'petisqueira',  nome: 'Petisqueira Seleção',  preco: 16, desc: 'Bandeja divisória para petiscos. 4 compartimentos.',              corDefault: 'var(--mundial-green)', forma: 'petisqueira' },
]

const ESPECIAIS: Produto[] = [
  { id: 'chaveiro-taca',    nome: 'Chaveiro Taça Mundial', preco: 7,  desc: 'Taça FIFA em miniatura. Edição especial Mundial 2026.',      corDefault: '#111', forma: 'chaveiro'    },
  { id: 'petisqueira-2026', nome: 'Petisqueira Taça',       preco: 16, desc: 'Bandeja preta para petiscos. Edição especial Mundial 2026.', corDefault: '#111', forma: 'petisqueira' },
]

function isLightColor(hex: string): boolean {
  if (!hex.startsWith('#')) return false
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 150
}

function ProductShapeMini({ forma, dark }: { forma: Produto['forma']; dark: boolean }) {
  const s = dark ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.85)'
  const w = 1.6
  if (forma === 'lata') return (
    <svg width="38%" viewBox="0 0 200 240" fill="none" stroke={s} strokeWidth={w}>
      <ellipse cx="100" cy="58" rx="50" ry="13" /><line x1="50" y1="58" x2="50" y2="190" /><line x1="150" y1="58" x2="150" y2="190" />
      <ellipse cx="100" cy="190" rx="50" ry="13" /><ellipse cx="100" cy="58" rx="50" ry="13" fill="rgba(255,255,255,0.1)" />
      <path d="M100 145 l-12-5 v-14 l12-5 12 5 v14 Z" opacity="0.65" />
    </svg>
  )
  if (forma === 'cromos') return (
    <svg width="55%" viewBox="0 0 240 200" fill="none" stroke={s} strokeWidth={w}>
      <rect x="28" y="22" width="184" height="156" rx="8" /><line x1="60" y1="22" x2="60" y2="178" />
      <rect x="78"  y="48"  width="36" height="46" rx="2" opacity="0.7" /><rect x="122" y="48"  width="36" height="46" rx="2" opacity="0.7" />
      <rect x="78"  y="104" width="36" height="46" rx="2" opacity="0.45" /><rect x="122" y="104" width="36" height="46" rx="2" opacity="0.45" />
    </svg>
  )
  if (forma === 'chaveiro') return (
    <svg width="32%" viewBox="0 0 160 280" fill="none" stroke={s} strokeWidth={w}>
      <line x1="80" y1="18" x2="80" y2="210" />
      <path d="M80 32 L138 56 L80 80 Z" fill="rgba(255,255,255,0.12)" />
      <circle cx="80" cy="224" r="17" /><circle cx="80" cy="224" r="9" opacity="0.5" />
    </svg>
  )
  return (
    <svg width="68%" viewBox="0 0 260 220" fill="none" stroke={s} strokeWidth={w}>
      <ellipse cx="130" cy="110" rx="110" ry="73" /><ellipse cx="130" cy="110" rx="80" ry="53" opacity="0.6" />
      <line x1="130" y1="37" x2="130" y2="183" opacity="0.38" /><line x1="46" y1="110" x2="214" y2="110" opacity="0.38" />
      <path d="M130 126 l-11-5 v-13 l11-4 11 4 v13 Z" opacity="0.65" />
    </svg>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s-7-4.5-9-9.5C1.5 7 5 4 8 4c2 0 3 1 4 2 1-1 2-2 4-2 3 0 6.5 3 5 7.5-2 5-9 9.5-9 9.5z" />
    </svg>
  )
}

function ProdutoCard({ produto, selecao, index, onOpen }: { produto: Produto; selecao: Selecao | null; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  const { addItem, items } = useCart()
  const { isFav, toggle } = useFavorites()
  const isMobile = useIsMobile()
  const selecaoProductId = selecao ? `${produto.id}-${selecao.id}` : produto.id
  const inCart = items.some(i => i.productId === selecaoProductId)
  const fav = isFav(produto.id)
  const bg = (!produto.fixedColor && selecao) ? selecao.cores[index % selecao.cores.length] : produto.corDefault
  const dark = isLightColor(bg)
  const fgMuted = dark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.5)'
  const imgs = getImgs(selecao?.id, produto.id)

  /* ── Mobile layout: photo card, no flip ── */
  if (isMobile) {
    return (
      <div>
        <div
          onClick={onOpen}
          style={{
            aspectRatio: '4/5', borderRadius: 3, position: 'relative', overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)', cursor: 'pointer',
            background: imgs ? '#0E0E0E' : bg,
          }}
        >
          {/* Photo or placeholder */}
          {imgs ? (
            <img src={imgs[0]} alt={produto.nome} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: '#0E0E0E', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
              <ProductShapeMini forma={produto.forma} dark={false} />
              <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>Foto em breve</span>
            </div>
          )}

          {/* Gold bottom line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--mundial-gold)', opacity: 0.7, zIndex: 2 }} />

          {/* Bottom gradient + info */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
            padding: '32px 12px 10px', zIndex: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
              <button
                onClick={e => { e.stopPropagation(); if (!inCart) { addItem({ name: selecao ? `${produto.nome} — ${selecao.nome}` : produto.nome, price: produto.preco, img: imgs?.[0] ?? '', productId: selecaoProductId }) } }}
                style={{
                  flex: 1, padding: '7px 10px', borderRadius: 999,
                  background: inCart ? 'var(--mundial-gold)' : 'rgba(212,168,48,0.2)',
                  border: '1px solid rgba(212,168,48,0.6)',
                  color: inCart ? '#111' : 'var(--mundial-gold)',
                  fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontFamily: 'inherit', cursor: inCart ? 'default' : 'pointer',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {inCart ? 'No cesto ✓' : '+ Cesto'}
              </button>
              <button
                onClick={e => { e.stopPropagation(); toggle(produto.id) }}
                style={{
                  width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                  background: fav ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.4)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: fav ? '#111' : 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(4px)',
                }}
                aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <HeartIcon filled={fav} />
              </button>
            </div>
          </div>

        </div>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="serif" style={{ fontSize: 15, color: '#F4EFE6', lineHeight: 1.2 }}>{produto.nome}</div>
          <div className="serif" style={{ fontSize: 14, color: 'var(--mundial-gold)', flexShrink: 0 }}>€{produto.preco}</div>
        </div>
      </div>
    )
  }

  /* ── Desktop layout: flip card ── */
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{
        aspectRatio: '4/5', borderRadius: 3, position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 28px rgba(0,0,0,0.5)', cursor: 'pointer',
      }}
        onClick={onOpen}
      >
        {/* Front — coloured card */}
        <div style={{
          position: 'absolute', inset: 0, background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 420ms cubic-bezier(.4,0,.2,1)',
        }}>
          <svg viewBox="0 0 300 360" fill="none" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70%', opacity: dark ? 0.1 : 0.06, pointerEvents: 'none' }}>
            <path d="M150 20 L270 60 L270 180 C270 270 150 340 150 340 C150 340 30 270 30 180 L30 60 Z" stroke={dark ? '#000' : 'white'} strokeWidth="6" />
            <circle cx="150" cy="180" r="50" stroke={dark ? '#000' : 'white'} strokeWidth="3" opacity="0.5" />
            <path d="M110 180 h80 M150 140 v80" stroke={dark ? '#000' : 'white'} strokeWidth="2" opacity="0.5" />
          </svg>
          <ProductShapeMini forma={produto.forma} dark={dark} />
          <div style={{ position: 'absolute', top: 14, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="serif-it" style={{ fontSize: 26, color: fgMuted, lineHeight: 1 }}>0{index + 1}</div>
            {selecao && (
              <div style={{ fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'rgba(0,0,0,0.35)', color: 'rgba(255,255,255,0.9)', padding: '3px 8px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
                {selecao.nome}
              </div>
            )}
          </div>
          <button
            onClick={e => { e.stopPropagation(); toggle(produto.id) }}
            style={{
              position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%',
              background: fav ? (dark ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.95)') : dark ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.35)',
              border: dark ? '1.5px solid rgba(0,0,0,0.28)' : 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: fav ? (dark ? '#fff' : '#111') : dark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(4px)', transition: 'all 180ms ease',
            }}
            aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <HeartIcon filled={fav} />
          </button>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--mundial-gold)', opacity: 0.6 }} />
        </div>

        {/* Back — reveal */}
        <div style={{
          position: 'absolute', inset: 0, background: '#0E0E0E',
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(218,41,28,0.1) 0%, transparent 55%), radial-gradient(circle at 70% 70%, rgba(4,106,56,0.1) 0%, transparent 55%)',
          transform: hovered ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 420ms cubic-bezier(.4,0,.2,1)',
          display: 'flex', flexDirection: 'column', padding: '24px 20px', justifyContent: 'space-between',
        }}>
          {imgs ? (
            <div style={{ flex: 1, borderRadius: 2, overflow: 'hidden', marginBottom: 16 }}>
              <img src={imgs[0]} alt={produto.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ) : (
            <div style={{ flex: 1, borderRadius: 2, background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>Foto em breve</span>
            </div>
          )}
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--mundial-gold)', marginBottom: 6 }}>Coleção Mundial · Edição limitada</div>
            <div className="serif" style={{ fontSize: 20, color: '#F4EFE6', lineHeight: 1.15, marginBottom: 8 }}>{produto.nome}</div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: '0 0 14px', lineHeight: 1.6 }}>{produto.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="serif" style={{ fontSize: 20, color: 'var(--mundial-gold)', marginRight: 'auto' }}>€{produto.preco}</span>
              <button
                onClick={e => { e.stopPropagation(); toggle(produto.id) }}
                style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, background: fav ? 'rgba(255,255,255,0.95)' : 'transparent', border: fav ? 'none' : '1px solid rgba(212,168,48,0.4)', color: fav ? '#111' : 'rgba(244,239,230,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 180ms ease' }}
              >
                <HeartIcon filled={fav} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); if (!inCart) { addItem({ name: selecao ? `${produto.nome} — ${selecao.nome}` : produto.nome, price: produto.preco, img: imgs?.[0] ?? '', productId: selecaoProductId }) } }}
                style={{ padding: '8px 16px', borderRadius: 999, background: 'transparent', border: '1px solid rgba(212,168,48,0.5)', color: inCart ? '#111' : 'var(--mundial-gold)', backgroundColor: inCart ? 'var(--mundial-gold)' : 'transparent', fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'inherit', cursor: inCart ? 'default' : 'pointer', transition: 'background 200ms' }}
                onMouseEnter={e => { if (!inCart) { const b = e.currentTarget; b.style.background = 'var(--mundial-gold)'; b.style.color = '#111' } }}
                onMouseLeave={e => { if (!inCart) { const b = e.currentTarget; b.style.background = 'transparent'; b.style.color = 'var(--mundial-gold)' } }}
              >
                {inCart ? 'No cesto ✓' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div className="serif" style={{ fontSize: 18, color: '#F4EFE6', lineHeight: 1.2 }}>{produto.nome}</div>
        <div className="serif" style={{ fontSize: 16, color: 'var(--mundial-gold)' }}>€{produto.preco}</div>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(244,239,230,0.45)', marginTop: 4, lineHeight: 1.5 }}>{produto.desc}</div>
    </div>
  )
}

export function MundialPage() {
  const { count: cartCount } = useCart()
  const isMobile = useIsMobile()
  const [authOpen, setAuthOpen]         = useState(false)
  const [cartOpen, setCartOpen]         = useState(false)
  const [favsOpen, setFavsOpen]         = useState(false)
  const [selecao, setSelecao]           = useState<Selecao | null>(SELECOES[0])
  const [especial, setEspecial]         = useState(false)
  const [modalProduct, setModalProduct] = useState<ShopProduct | null>(null)
  const [sidebarOpen, setSidebarOpen]   = useState(false)

  const toShopProduct = (p: Produto): ShopProduct => {
    const imgs = getImgs(selecao?.id, p.id) ?? undefined
    return {
      id: selecao ? `${p.id}-${selecao.id}` : p.id, name: selecao ? `${p.nome} — ${selecao.nome}` : p.nome, price: p.preco,
      img: imgs?.[0] ?? '', imgs,
      tag: 'EDIÇÃO LIMITADA',
      universoId: 'mundial', color: selecao?.cor1 ?? p.corDefault,
      dominantColors: ['vermelho', 'verde'],
    }
  }

  const waMsg = encodeURIComponent(
    selecao
      ? `Olá! Gostaria de encomendar artigos da Coleção Mundial para a Seleção de ${selecao.nome}.`
      : `Olá! Gostaria de saber mais sobre a Coleção Mundial.`
  )

  return (
    <>
    <div style={{ background: '#111', minHeight: '100vh', color: '#F4EFE6' }}>
      <div style={{ background: 'var(--paper)' }}>
        <Announce />
        <Nav
        onOpenAuth={() => setAuthOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavsOpen(true)}
        cartCount={cartCount}
      />
      </div>

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(212,168,48,0.2)', padding: '28px 0', background: '#0D0D0D' }}>
        <div className="shell-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to="/#mundial"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.45)', transition: 'color 160ms' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--mundial-gold)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(244,239,230,0.45)')}
          >
            ← Início
          </Link>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--mundial-gold)', marginBottom: 4 }}>
              Edição limitada
            </div>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1, color: '#F4EFE6' }}>
              Coleção <em style={{ fontStyle: 'italic', color: 'var(--mundial-gold)' }}>Mundial</em>
            </div>
          </div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.35)' }}>
            {PRODUTOS.length} peças
          </div>
        </div>
      </div>

      {/* Mobile selection toggle */}
      {isMobile && (
        <div className="shell-wide" style={{ padding: '16px 0 0' }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: '1px solid rgba(212,168,48,0.3)', borderRadius: 999,
              padding: '9px 18px', cursor: 'pointer',
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(244,239,230,0.7)', fontFamily: 'inherit',
            }}
          >
            {especial
              ? <span style={{ width: 22, height: 15, borderRadius: 2, background: 'linear-gradient(135deg, var(--mundial-gold) 0%, #7a5c00 100%)', flexShrink: 0, display: 'block' }} />
              : selecao ? <FlagStrip cores={selecao.cores} dir={selecao.dir} /> : null}
            {especial ? "Edição Mundial '26" : selecao ? selecao.nome : 'Escolher Seleção'}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ marginLeft: 4 }}>
              <path d={sidebarOpen ? 'M2 7l3-3 3 3' : 'M2 3l3 3 3-3'} />
            </svg>
          </button>
        </div>
      )}

      {/* Body */}
      <div className="shell-wide" style={{ padding: isMobile ? '16px 0 80px' : '48px 0 120px', display: 'flex', gap: 52, alignItems: 'flex-start' }}>

        {/* Sidebar */}
        {(!isMobile || sidebarOpen) && (
        <aside style={{ width: isMobile ? '100%' : 210, flexShrink: 0, position: isMobile ? 'static' : 'sticky', top: 120, marginBottom: isMobile ? 20 : 0 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.35)', fontWeight: 500, marginBottom: 14 }}>
            Seleção
          </div>

          {selecao && (
            <button
              onClick={() => { setSelecao(null); setSidebarOpen(false) }}
              style={{
                width: '100%', marginBottom: 16,
                background: 'none', border: '1px solid rgba(212,168,48,0.25)',
                borderRadius: 999, padding: '7px 14px',
                fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(244,239,230,0.5)', cursor: 'pointer', fontFamily: 'inherit',
                transition: 'border-color 180ms, color 180ms',
              }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.borderColor = 'var(--mundial-gold)'; b.style.color = 'var(--mundial-gold)' }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.borderColor = 'rgba(212,168,48,0.25)'; b.style.color = 'rgba(244,239,230,0.5)' }}
            >
              × Limpar filtro
            </button>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SELECOES.map(s => {
              const active = selecao?.id === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => { const next = active ? null : s; setSelecao(next); setEspecial(false); if (next) setSidebarOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: active ? 'rgba(255,255,255,0.05)' : 'none',
                    border: 'none', padding: '8px 10px', borderRadius: 4,
                    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    color: active ? '#F4EFE6' : 'rgba(244,239,230,0.55)',
                    transition: 'color 160ms, background 160ms',
                    width: '100%',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#F4EFE6' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(244,239,230,0.55)' }}
                >
                  <FlagStrip cores={s.cores} dir={s.dir} />
                  <span style={{ fontSize: 13 }}>{s.nome}</span>
                  {active && (
                    <svg style={{ marginLeft: 'auto', flexShrink: 0 }} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--mundial-gold)" strokeWidth="1.8">
                      <path d="M2 5l2.5 2.5L8 3" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>

          {/* Sessão Especial filter */}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.35)', fontWeight: 500, marginBottom: 8 }}>
              Especiais
            </div>
            <button
              onClick={() => { const next = !especial; setEspecial(next); setSelecao(null); if (next) setSidebarOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                background: especial ? 'rgba(255,255,255,0.05)' : 'none',
                border: 'none', padding: '8px 10px', borderRadius: 4,
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                color: especial ? '#F4EFE6' : 'rgba(244,239,230,0.55)',
                transition: 'color 160ms, background 160ms',
              }}
              onMouseEnter={e => { if (!especial) e.currentTarget.style.color = '#F4EFE6' }}
              onMouseLeave={e => { if (!especial) e.currentTarget.style.color = 'rgba(244,239,230,0.55)' }}
            >
              <span style={{ width: 22, height: 15, borderRadius: 2, background: 'linear-gradient(135deg, var(--mundial-gold) 0%, #7a5c00 100%)', flexShrink: 0, display: 'block' }} />
              <span style={{ fontSize: 13 }}>Edição Mundial '26</span>
              {especial && (
                <svg style={{ marginLeft: 'auto', flexShrink: 0 }} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--mundial-gold)" strokeWidth="1.8">
                  <path d="M2 5l2.5 2.5L8 3" />
                </svg>
              )}
            </button>
          </div>

          {/* custom order note */}
          <div style={{
            marginTop: 28, paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            fontSize: 12, color: 'rgba(244,239,230,0.4)', lineHeight: 1.7,
          }}>
            Não encontrou a sua seleção? Não fique de fora, faça-nos um pedido sem custos adicionais!{' '}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Olá! Não encontrei a minha seleção na Coleção Mundial. Gostaria de saber se é possível fazer um pedido personalizado.')}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--mundial-gold)', textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              Falar connosco →
            </a>
          </div>
        </aside>
        )}

        {/* Products */}
        {(!isMobile || !sidebarOpen) && (
        <main style={{ flex: 1, minWidth: 0, width: '100%' }}>
          {selecao && !isMobile && (
            <div style={{
              marginBottom: 32, padding: '14px 20px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(212,168,48,0.2)',
              borderRadius: 4, display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <FlagStrip cores={selecao.cores} dir={selecao.dir} />
              <span style={{ fontSize: 13, color: 'rgba(244,239,230,0.7)' }}>
                A mostrar artigos personalizados para a <strong style={{ color: '#F4EFE6' }}>Seleção de {selecao.nome}</strong>
              </span>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginLeft: 'auto', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--mundial-gold)', whiteSpace: 'nowrap',
                  border: '1px solid rgba(212,168,48,0.4)', borderRadius: 999, padding: '7px 14px',
                  transition: 'background 180ms',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(212,168,48,0.1)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'transparent')}
              >
                Encomendar via WhatsApp →
              </a>
            </div>
          )}

          {especial ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: isMobile ? '24px 14px' : '36px 24px' }}>
              {ESPECIAIS.map((p, i) => (
                <ProdutoCard key={p.id} produto={p} selecao={null} index={i} onOpen={() => setModalProduct(toShopProduct(p))} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))', gap: isMobile ? '24px 14px' : '36px 24px' }}>
              {PRODUTOS.map((p, i) => (
                <ProdutoCard key={p.id} produto={p} selecao={selecao} index={i} onOpen={() => setModalProduct(toShopProduct(p))} />
              ))}
            </div>
          )}
        </main>
        )}
      </div>

      <Footer />
    </div>

    <div style={{ color: 'var(--ink)' }}>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <FavoritesDrawer open={favsOpen} onClose={() => setFavsOpen(false)} />
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </div>
    </>
  )
}
