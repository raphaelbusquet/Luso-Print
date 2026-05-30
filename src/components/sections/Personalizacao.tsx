import { useState, useEffect, useRef } from 'react'
import { generateSignImage } from '../../lib/openai-image'
import { useCart } from '../../context/CartContext'
import { supabase } from '../../lib/supabase'

const PASTEL_LETRA = [
  { name: 'Branco',      hex: '#F5F1EA' },
  { name: 'Bege',        hex: '#E8DFCC' },
  { name: 'Rosa Pó',     hex: '#F2CFC8' },
  { name: 'Areia',       hex: '#E7CFA8' },
  { name: 'Sálvia',      hex: '#C9D4B5' },
  { name: 'Azul Névoa',  hex: '#B6CAD4' },
  { name: 'Lilás',       hex: '#D6C8DE' },
  { name: 'Pêssego',     hex: '#F2C9A6' },
  { name: 'Cinza Claro', hex: '#D6D2CB' },
  { name: 'Marfim',      hex: '#EFE6D3' },
]

const PASTEL_NOME = [
  { name: 'Branco',       hex: '#FAF6EF' },
  { name: 'Pó de Rosa',   hex: '#E8B8B5' },
  { name: 'Terracota',    hex: '#C9826E' },
  { name: 'Azul Pó',      hex: '#A8B4B3' },
  { name: 'Oliva',        hex: '#8D9274' },
  { name: 'Bege',         hex: '#D9CEBC' },
  { name: 'Caramelo',     hex: '#C29A6E' },
  { name: 'Lavanda',      hex: '#B9A6C2' },
  { name: 'Hortelã',      hex: '#A5C7B3' },
  { name: 'Amarelo Pál.', hex: '#E8D480' },
]

type Swatch = { name: string; hex: string }

function SwatchPicker({ palette, sel, set, label }: {
  palette: Swatch[]
  sel: number
  set: (i: number) => void
  label: string
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="kicker">{label}</span>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: 15 }}>
          {palette[sel].name}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {palette.map((c, i) => (
          <button
            key={c.name}
            onClick={() => set(i)}
            aria-label={c.name}
            title={c.name}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: c.hex, padding: 0, cursor: 'pointer',
              border: sel === i ? '1.5px solid var(--ink)' : '1px solid var(--rule)',
              outline: sel === i ? '2px solid var(--paper)' : 'none',
              outlineOffset: -5,
              boxShadow: sel === i ? '0 0 0 2px var(--ink)' : 'none',
              transition: 'all 180ms ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── CSS sign preview (live, no API) ──────────────────────────────────────────

function SignPreview({ name, letraColor, nomeColor, size }: {
  name: string
  letraColor: string
  nomeColor: string
  size: 15 | 23
}) {
  const initial = (name.charAt(0) || 'A').toUpperCase()
  const shadow = 'rgba(43,39,34,0.18)'

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(145deg, #EDE6D6 0%, #D8CEBC 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        background: 'linear-gradient(160deg, #F2EAD8 0%, #E0D4C0 100%)',
        borderRadius: 14,
        padding: '36px 56px 28px',
        boxShadow: [
          '0 12px 40px rgba(43,39,34,0.18)',
          '0 3px 8px rgba(43,39,34,0.10)',
          'inset 0 1px 0 rgba(255,255,255,0.45)',
          'inset 0 -1px 0 rgba(43,39,34,0.06)',
        ].join(', '),
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 2,
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ width: 32, height: 1, background: 'rgba(43,39,34,0.15)', marginBottom: 12 }} />
        <span style={{
          fontFamily: '"Cormorant", "Cormorant Garamond", serif',
          fontSize: 'clamp(110px, 18vw, 160px)',
          fontStyle: 'italic', fontWeight: 400,
          lineHeight: 0.85, color: letraColor, display: 'block',
          textShadow: [
            `1px 1px 0 ${shadow}`,
            `2px 2px 0 ${shadow}`,
            `3px 3px 6px rgba(43,39,34,0.12)`,
          ].join(', '),
          transition: 'color 300ms ease',
        }}>
          {initial}
        </span>
        <span style={{
          fontFamily: '"Cormorant", "Cormorant Garamond", serif',
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontStyle: 'italic', fontWeight: 300,
          letterSpacing: '0.1em', color: nomeColor, display: 'block',
          textShadow: `1px 1px 3px rgba(43,39,34,0.1)`,
          transition: 'color 300ms ease',
          marginTop: 4,
        }}>
          {name || 'Nome'}
        </span>
        <div style={{ width: 32, height: 1, background: 'rgba(43,39,34,0.15)', marginTop: 14 }} />
      </div>
      <div style={{
        position: 'absolute', bottom: 18, right: 22,
        fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'rgba(43,39,34,0.35)', fontFamily: 'var(--sans)',
      }}>Lusoprint</div>
      <div style={{
        position: 'absolute', top: 18, left: 20,
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        color: 'rgba(43,39,34,0.45)', fontSize: 13,
      }}>Letra inicial · {size} cm</div>
    </div>
  )
}

// ── Loading dots ──────────────────────────────────────────────────────────────

function LoadingDots({ label }: { label: string }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(244,239,230,0.82)',
      backdropFilter: 'blur(6px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 20,
      animation: 'lp-fadein 300ms ease',
      zIndex: 3,
    }}>
      <div style={{ display: 'flex', gap: 10 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: 'var(--terracotta)',
            animation: `lp-dot-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
      <div style={{
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: 18, color: 'var(--ink-soft)',
      }}>
        {label}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

import { useIsMobile } from '../../hooks/useIsMobile'

type ViewState = 'photo' | 'css' | 'loading' | 'finalising' | 'last' | 'done' | 'error'

export function Personalizacao() {
  const isMobile = useIsMobile()
  const [name, setName] = useState('')
  const [letraIdx, setLetraIdx] = useState(5)
  const [nomeIdx, setNomeIdx] = useState(2)
  const [mono, setMono] = useState(false)
  const [size, setSize] = useState<15 | 23>(15)
  const [view, setView] = useState<ViewState>('photo')
  const [aiImages, setAiImages] = useState<string[]>([])
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [genError, setGenError] = useState<string | null>(null)

  const timer1Ref = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timer2Ref = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const isLoading = view === 'loading' || view === 'finalising' || view === 'last'
  const letraColor = mono ? PASTEL_NOME[nomeIdx].hex : PASTEL_LETRA[letraIdx].hex
  const nomeColor  = PASTEL_NOME[nomeIdx].hex

  const handleNameChange = (val: string) => {
    const next = val.slice(0, 16)
    setName(next)
    if (next === '') {
      if (aiImages.length > 0) {
        setCarouselIdx(aiImages.length - 1)
        setView('done')
      } else {
        setView('photo')
      }
    } else {
      if (view === 'photo' || view === 'done' || view === 'error') setView('css')
    }
  }

  const activateCss = () => {
    if (!name) return
    if (view === 'photo' || view === 'done' || view === 'error') setView('css')
  }

  const handleLetra = (i: number) => { setLetraIdx(i); activateCss() }
  const handleNome  = (i: number) => { setNomeIdx(i);  activateCss() }

  const clearTimers = () => {
    if (timer1Ref.current) clearTimeout(timer1Ref.current)
    if (timer2Ref.current) clearTimeout(timer2Ref.current)
  }

  const saveImageToProfile = async (imageUrl: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    try {
      let blob: Blob
      if (imageUrl.startsWith('data:')) {
        const [meta, b64] = imageUrl.split(',')
        const mime = meta.split(':')[1].split(';')[0]
        const bytes = atob(b64)
        const arr = new Uint8Array(bytes.length)
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
        blob = new Blob([arr], { type: mime })
      } else {
        blob = await fetch(imageUrl).then(r => r.blob())
      }

      const path = `${user.id}/${Date.now()}.png`
      const { error: uploadErr } = await supabase.storage
        .from('generated-images')
        .upload(path, blob, { contentType: 'image/png' })
      if (uploadErr) throw uploadErr

      const { data: { publicUrl } } = supabase.storage
        .from('generated-images')
        .getPublicUrl(path)

      const { error: insertErr } = await supabase.from('generated_images').insert({
        user_id: user.id,
        image_url: publicUrl,
        name: name || 'Nome',
        letra_color: mono ? PASTEL_NOME[nomeIdx].name : PASTEL_LETRA[letraIdx].name,
        nome_color: PASTEL_NOME[nomeIdx].name,
        size,
        mono,
      })
      if (insertErr) throw insertErr
    } catch (e) {
      console.error('Erro ao guardar imagem no perfil:', e)
    }
  }

  const handleGenerate = async () => {
    if (isLoading) return
    abortRef.current = false
    setView('loading')
    setGenError(null)

    timer1Ref.current = setTimeout(() => {
      if (!abortRef.current) setView('finalising')
    }, 11000)

    timer2Ref.current = setTimeout(() => {
      if (!abortRef.current) setView('last')
    }, 26000)

    try {
      const url = await generateSignImage({
        name: name || 'Nome',
        letraColorName: PASTEL_LETRA[letraIdx].name,
        letraHex: letraColor,
        nomeColorName: PASTEL_NOME[nomeIdx].name,
        nomeHex: nomeColor,
        mono,
        size,
      })
      if (!abortRef.current) {
        setAiImages(prev => {
          const next = [...prev, url]
          setCarouselIdx(next.length - 1)
          return next
        })
        setView('done')
        saveImageToProfile(url)
      }
    } catch (e) {
      if (!abortRef.current) {
        setGenError(e instanceof Error ? e.message : 'Erro desconhecido')
        setView('error')
      }
    } finally {
      clearTimers()
    }
  }

  useEffect(() => () => {
    abortRef.current = true
    clearTimers()
  }, [])

  useEffect(() => {
    if (view === 'done' && isMobile && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [view, isMobile])

  const btnLabel =
    isLoading        ? 'Gerando…' :
    view === 'done'  ? 'Gerar novamente' :
    view === 'error' ? 'Tentar novamente' :
    'Ver preview'

  return (
    <section id="personal" style={{ padding: '40px 0 100px', background: 'var(--linen)' }}>
      <div className="shell" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.05fr) minmax(0, 1fr)',
        gap: isMobile ? 32 : 70,
        alignItems: 'stretch',
      }}>

        {/* ── Left panel ── */}
        <div ref={previewRef} style={{
          minHeight: isMobile ? 280 : 420, background: '#F1EBDD',
          position: 'relative', borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 30px 80px -50px rgba(43,39,34,0.45)',
        }}>
          {/* 1 — default product photo */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/assets/products/bebe-crianca/letreiro-heitor-dino-3.png)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: view === 'photo' ? 1 : 0,
            transition: 'opacity 500ms ease',
          }} />

          {/* 2 — CSS live preview */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: (view === 'css' || isLoading) ? 1 : 0,
            transition: 'opacity 500ms ease',
            pointerEvents: 'none',
          }}>
            <SignPreview name={name} letraColor={letraColor} nomeColor={nomeColor} size={size} />
          </div>

          {/* 3 — AI generated images (carousel) */}
          {aiImages.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Letreiro preview ${i + 1}`}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: view === 'done' && carouselIdx === i ? 1 : 0,
                transition: 'opacity 500ms ease',
              }}
            />
          ))}

          {/* Carousel arrows */}
          {view === 'done' && aiImages.length > 1 && (
            <>
              <button
                onClick={() => setCarouselIdx(i => Math.max(0, i - 1))}
                disabled={carouselIdx === 0}
                style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  zIndex: 4, width: 38, height: 38, borderRadius: '50%',
                  background: 'rgba(244,239,230,0.88)', backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(43,39,34,0.12)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--ink)', opacity: carouselIdx === 0 ? 0.3 : 1,
                  transition: 'opacity 150ms',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6" />
                </svg>
              </button>
              <button
                onClick={() => setCarouselIdx(i => Math.min(aiImages.length - 1, i + 1))}
                disabled={carouselIdx === aiImages.length - 1}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  zIndex: 4, width: 38, height: 38, borderRadius: '50%',
                  background: 'rgba(244,239,230,0.88)', backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(43,39,34,0.12)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--ink)', opacity: carouselIdx === aiImages.length - 1 ? 0.3 : 1,
                  transition: 'opacity 150ms',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </button>
              <div style={{
                position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
                zIndex: 4, display: 'flex', gap: 6,
              }}>
                {aiImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIdx(i)}
                    style={{
                      width: carouselIdx === i ? 18 : 7,
                      height: 7, borderRadius: 999, padding: 0, border: 'none', cursor: 'pointer',
                      background: carouselIdx === i ? 'var(--paper)' : 'rgba(244,239,230,0.55)',
                      transition: 'all 200ms ease',
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Loading overlay */}
          {isLoading && (
            <LoadingDots label={
              view === 'last'       ? 'Últimos detalhes…' :
              view === 'finalising' ? 'Finalizando…' :
              'Gerando imagem…'
            } />
          )}

          {/* Error banner */}
          {view === 'error' && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(201,130,110,0.92)', color: '#fff',
              padding: '12px 18px', fontSize: 12, lineHeight: 1.5,
              backdropFilter: 'blur(4px)', zIndex: 3,
            }}>
              <strong>Erro:</strong> {genError}
            </div>
          )}

          {/* Watermarks — only on default photo */}
          {view === 'photo' && (
            <>
              <div style={{
                position: 'absolute', top: 22, left: 24,
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                color: '#fff', fontSize: 16,
                textShadow: '0 2px 8px rgba(0,0,0,0.35)',
              }}>nº 0114</div>
              <div style={{
                position: 'absolute', bottom: 22, right: 24, color: '#fff', fontSize: 10,
                letterSpacing: '0.26em', textTransform: 'uppercase',
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}>Personalizado · Lusoprint</div>
            </>
          )}

          {/* AI badge */}
          {view === 'done' && (
            <div style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(43,39,34,0.72)', color: 'rgba(244,239,230,0.9)',
              backdropFilter: 'blur(6px)',
              fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
              padding: '5px 10px', borderRadius: 999, zIndex: 5,
            }}>
              {aiImages.length > 1
                ? `IA · ${carouselIdx + 1}/${aiImages.length}`
                : 'Pré-visualização IA'}
            </div>
          )}
        </div>

        {/* ── Right: configurator ── */}
        <div>
          <span className="kicker">03 — Personalização</span>
          <h2 className="serif" style={{
            margin: '14px 0 24px 0',
            fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1,
            letterSpacing: '-0.01em', fontWeight: 400,
          }}>
            O nome de quem<br />
            <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>se ama</em>, em casa.
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 480, marginBottom: 32, fontSize: 16, lineHeight: 1.7 }}>
            Escolha a inicial, o nome e o tom de cada peça. Imprimimos no atelier, com o cuidado de quem o vai oferecer.
          </p>

          <div style={{
            background: 'var(--paper)', padding: isMobile ? '20px 16px' : 32, borderRadius: 4,
            border: '1px solid var(--rule)',
          }}>
            <label style={{ display: 'block' }}>
              <div className="kicker" style={{ marginBottom: 10 }}>Nome desejado</div>
              <input
                value={name}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="Escreva aqui…"
                style={{
                  width: '100%', padding: '12px 0',
                  fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 28,
                  border: 'none', borderBottom: '1px solid var(--ink)',
                  background: 'transparent', color: 'var(--ink)', outline: 'none',
                }}
              />
              <div style={{ fontSize: 10, color: 'var(--ink-mute)', marginTop: 4 }}>
                {name.length}/16 carateres
              </div>
            </label>

            {/* Monochromatic toggle */}
            <div style={{
              marginTop: 24, marginBottom: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span className="kicker">Cores</span>
              <button
                type="button"
                onClick={() => { setMono(m => !m); activateCss() }}
                aria-pressed={mono}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}
              >
                <span style={{
                  fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontFamily: 'var(--sans)', fontWeight: 500,
                  color: mono ? 'var(--ink)' : 'var(--ink-mute)',
                  transition: 'color 200ms',
                }}>
                  Monocromático
                </span>
                {/* Toggle track */}
                <span style={{
                  position: 'relative', display: 'inline-block',
                  width: 36, height: 20, borderRadius: 999,
                  background: mono ? 'var(--ink)' : 'var(--rule)',
                  transition: 'background 220ms ease',
                  flexShrink: 0,
                }}>
                  {/* Toggle thumb */}
                  <span style={{
                    position: 'absolute', top: 3,
                    left: mono ? 19 : 3,
                    width: 14, height: 14, borderRadius: '50%',
                    background: 'var(--paper)',
                    boxShadow: '0 1px 3px rgba(43,39,34,0.2)',
                    transition: 'left 220ms ease',
                  }} />
                </span>
              </button>
            </div>

            {/* Cor da inicial — hidden in mono mode */}
            <div style={{
              marginTop: 14,
              maxHeight: mono ? 0 : 110,
              overflow: 'hidden',
              opacity: mono ? 0 : 1,
              transition: 'max-height 300ms ease, opacity 200ms ease',
              padding: mono ? 0 : '0 4px 8px 4px',
              margin: mono ? 0 : '14px -4px 0',
            }}>
              <SwatchPicker palette={PASTEL_LETRA} sel={letraIdx} set={handleLetra} label="Cor da inicial" />
            </div>

            <div style={{ marginTop: mono ? 14 : 22, padding: '0 4px 8px 4px', margin: `${mono ? 14 : 22}px -4px 0` }}>
              <SwatchPicker palette={PASTEL_NOME} sel={nomeIdx} set={handleNome} label={mono ? 'Cor do letreiro' : 'Cor do nome'} />
            </div>

            <div style={{
              marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--rule)',
              display: 'flex', flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div>
                {/* Size selector */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  {([15, 23] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      style={{
                        padding: '6px 14px', borderRadius: 3, cursor: 'pointer',
                        fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        border: size === s ? '1.5px solid var(--ink)' : '1px solid var(--rule)',
                        background: size === s ? 'var(--ink)' : 'transparent',
                        color: size === s ? 'var(--paper)' : 'var(--ink-soft)',
                        transition: 'all 180ms ease',
                      }}
                    >
                      {s} cm
                    </button>
                  ))}
                </div>
                <div className="serif" style={{ fontSize: 26 }}>
                  €{size === 15 ? 29 : 35}
                  <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}> · entrega 5 dias</span>
                </div>
                <div className="kicker" style={{ marginTop: 4 }}>Letra inicial · {size} cm</div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexDirection: isMobile ? 'column' : 'row' }}>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="btn"
                  style={{
                    padding: '12px 18px', minWidth: 158,
                    justifyContent: 'center', gap: 8,
                    opacity: isLoading ? 0.8 : 1,
                  }}
                >
                  {isLoading ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      style={{ animation: 'lp-spin-slow 0.8s linear infinite', flexShrink: 0 }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                  {btnLabel}
                </button>
                <button
                  className="btn btn-solid"
                  disabled={!name}
                  onClick={() => {
                    if (!name) return
                    addItem({
                      name,
                      letraColorName: mono ? PASTEL_NOME[nomeIdx].name : PASTEL_LETRA[letraIdx].name,
                      letraHex: letraColor,
                      nomeColorName: PASTEL_NOME[nomeIdx].name,
                      nomeHex: nomeColor,
                      size, price: size === 15 ? 29 : 35,
                      mono,
                      previewUrl: aiImages[carouselIdx] ?? undefined,
                    })
                    setAdded(true)
                    setTimeout(() => setAdded(false), 2500)
                  }}
                  style={{ opacity: name ? 1 : 0.45 }}
                >
                  {added ? 'Adicionado ✓' : <><span>Adicionar</span><span className="arr">→</span></>}
                </button>
              </div>
            </div>
          </div>

          {view === 'css' && (
            <p style={{
              marginTop: 12, fontSize: 11, color: 'var(--ink-mute)',
              letterSpacing: '0.04em', lineHeight: 1.6,
            }}>
              ← Pré-visualização tipográfica ao vivo. Clique em "Ver preview" para gerar uma imagem realista com IA.
            </p>
          )}
          {view === 'done' && (
            <p style={{
              marginTop: 12, fontSize: 11, color: 'var(--ink-mute)',
              letterSpacing: '0.04em', lineHeight: 1.6,
            }}>
              Imagem gerada por IA — a peça final é impressa em 3D no atelier com as cores escolhidas.
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes lp-dot-pulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </section>
  )
}
