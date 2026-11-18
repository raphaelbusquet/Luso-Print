import { translate as t } from '../../i18n/translate'
import { useState } from 'react'
import { BUSINESS_SOLUTIONS, businessContact } from '../../data/empresas'
import { NailKitGallery } from './NailKitGallery'
import { NailKitOptions, type NailKitVersion } from './NailKitOptions'
import { ProductOverlay } from './ProductOverlay'
import { useIsMobile } from '../../hooks/useIsMobile'
import { blackFridayBusinessPrice, isBlackFridayActive } from '../../lib/blackFriday'

type Solution = (typeof BUSINESS_SOLUTIONS)[number]

const ORGANIZER_COLORS = [
  { name: 'Rosa', hex: '#e5afc0' },
  { name: 'Azul', hex: '#a8bfd8' },
  { name: 'Branco off-white', hex: '#f4f1e9' },
  { name: 'Cinza prateado', hex: '#b9bcc1' },
  { name: 'Dourado', hex: '#c6a45d' },
  { name: 'Verde claro', hex: '#b8cdae' },
  { name: 'Nude', hex: '#d7b7a4' },
  { name: 'Bege', hex: '#dfcfb8' },
  { name: 'Marrom', hex: '#8b6654' },
]

export function BusinessProductModal({ solution, onClose }: { solution: Solution; onClose: () => void }) {
  const mobile = useIsMobile()
  const [nailKit, setNailKit] = useState<NailKitVersion>('master')
  const [selectedPhotos, setSelectedPhotos] = useState<Record<string, string>>({})
  const [organizerQty, setOrganizerQty] = useState(1)
  const [plateColor, setPlateColor] = useState('')
  const [nameColor, setNameColor] = useState('')
  const organizerPrice = blackFridayBusinessPrice(solution.id, 'price' in solution && typeof solution.price === 'number' ? solution.price : 0)
  const organizerSecondPrice = solution.id === 'organizador-atendimento-f1' && organizerPrice === 12.9 ? 9.9 : organizerPrice
  const organizerTotal = organizerPrice + (organizerQty > 1 ? organizerSecondPrice : 0) + Math.max(0, organizerQty - 2) * organizerPrice
  const organizerMessage = encodeURIComponent(`Olá! Gostaria de encomendar ${organizerQty} × ${solution.title}. Cor da placa: ${plateColor || 'por escolher'}. Cor do nome: ${nameColor || 'por escolher'}. Total indicado: €${organizerTotal.toFixed(2).replace('.', ',')}.`)
  const colorsReady = Boolean(plateColor && nameColor)
  return (
    <ProductOverlay title={t(solution.title)} onClose={onClose}>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.1fr 1fr', gap: mobile ? 24 : 40, alignItems: 'start' }}>
        <div>
              {t(solution.id === 'kit-nail-instrutor' ? (
                <NailKitGallery />
              ) : (
                <img src={selectedPhotos[solution.id] ?? solution.image} alt={t(solution.title)} style={{ width: '100%', display: 'block', borderRadius: 4, ...(solution.id === 'kit-pedi-instrutor' ? { aspectRatio: '3/4', objectFit: 'contain' as const } : {}) }} />
              ))}
              {t('images' in solution && solution.images && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
                  {t(solution.images.map((src, index) => (
                    <button key={src} onClick={() => setSelectedPhotos(current => ({ ...current, [solution.id]: src }))} aria-label={t(`Ver fotografia ${index + 1} de ${solution.title}`)} aria-pressed={(selectedPhotos[solution.id] ?? solution.image) === src} style={{ width: 80, padding: 3, background: 'transparent', cursor: 'pointer', border: `1px solid ${(selectedPhotos[solution.id] ?? solution.image) === src ? 'var(--terracotta)' : 'var(--rule)'}`, borderRadius: 4 }}>
                      <img src={src} alt={t("")} style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                    </button>
                  )))}
                </div>
              ))}
        </div>
        <div>
              <p className="kicker" style={{ color: 'var(--ink-mute)', marginTop: 20 }}>{t(['kit-nail-instrutor', 'kit-pedi-instrutor'].includes(solution.id) ? 'FORMAÇÃO & DEMONSTRAÇÃO' : 'À MEDIDA DA SUA MARCA')}</p>
              <h2 className="serif" style={{ fontWeight: 400, fontSize: 34, margin: '12px 0' }}>{t(solution.title)}</h2>
              {t('price' in solution && solution.price !== undefined && (
                <p style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 12px' }}>{blackFridayBusinessPrice(solution.id, solution.price) < solution.price && <s style={{ fontSize: 18, color: 'var(--ink-mute)', marginRight: 10 }}>€{solution.price}</s>}<span style={{ color: blackFridayBusinessPrice(solution.id, solution.price) < solution.price ? 'var(--terracotta)' : 'inherit' }}>€{blackFridayBusinessPrice(solution.id, solution.price)}</span> <span style={{ fontFamily: 'var(--sans)', fontSize: 13 }}>{t("/ unidade")}</span></p>
              ))}
              {t(solution.id === 'organizador-atendimento-f1' && <>
                <fieldset style={{ border: 0, padding: 0, margin: '24px 0' }}>
                  <legend className="kicker" style={{ marginBottom: 14 }}>Cor da placa{plateColor && <span style={{ letterSpacing: 0, textTransform: 'none' }}> — {plateColor}</span>}</legend>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {ORGANIZER_COLORS.map(color => <button key={`plate-${color.name}`} type="button" onClick={() => setPlateColor(color.name)} aria-label={`Cor da placa: ${color.name}`} aria-pressed={plateColor === color.name} title={color.name} style={{ width: 38, height: 38, borderRadius: '50%', background: color.hex, border: plateColor === color.name ? '3px solid var(--linen)' : '1px solid rgba(40,36,32,.08)', outline: plateColor === color.name ? '2px solid var(--ink)' : 'none', outlineOffset: 2, boxShadow: '0 2px 5px rgba(30,26,22,.12)', cursor: 'pointer' }} />)}
                  </div>
                </fieldset>
                <fieldset style={{ border: 0, padding: 0, margin: '24px 0' }}>
                  <legend className="kicker" style={{ marginBottom: 14 }}>Cor do nome{ nameColor && <span style={{ letterSpacing: 0, textTransform: 'none' }}> — {nameColor}</span>}</legend>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {ORGANIZER_COLORS.map(color => <button key={`name-${color.name}`} type="button" onClick={() => setNameColor(color.name)} aria-label={`Cor do nome: ${color.name}`} aria-pressed={nameColor === color.name} title={color.name} style={{ width: 38, height: 38, borderRadius: '50%', background: color.hex, border: nameColor === color.name ? '3px solid var(--linen)' : '1px solid rgba(40,36,32,.08)', outline: nameColor === color.name ? '2px solid var(--ink)' : 'none', outlineOffset: 2, boxShadow: '0 2px 5px rgba(30,26,22,.12)', cursor: 'pointer' }} />)}
                  </div>
                </fieldset>
                <div style={{ margin: '0 0 20px', color: 'var(--terracotta)', fontSize: 13, lineHeight: 1.6 }}>{isBlackFridayActive() && t('Black Friday: a 2.ª unidade fica por €9,90.')}<label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, color: 'var(--ink-soft)' }}>{t('Quantidade')}<input type="number" min={1} step={1} value={organizerQty} onChange={event => setOrganizerQty(Math.max(1, Math.floor(Number(event.target.value) || 1)))} style={{ width: 70, padding: 7, border: '1px solid var(--rule)', borderRadius: 4, font: 'inherit' }} /></label><strong style={{ display: 'block', marginTop: 8, color: 'var(--ink)' }}>{t('Total:')} €{organizerTotal.toFixed(2).replace('.', ',')}</strong></div>
              </>)}
              <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{t(solution.description)}</p>
              {t(solution.id === 'kit-nail-instrutor' && (
                <p style={{ color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.7, borderLeft: '2px solid var(--terracotta)', paddingLeft: 14 }}>
                  <em>{t("Material didático demonstrativo. As brocas e lixas do kit não substituem ferramentas de uso profissional.")}</em>
                </p>
              ))}
              {t(solution.id === 'kit-nail-instrutor' ? <NailKitOptions kit={nailKit} onKitChange={setNailKit} /> : (
                <a href={solution.id === 'organizador-atendimento-f1' ? (colorsReady ? `https://wa.me/351928419522?text=${organizerMessage}` : undefined) : businessContact(solution.title)} aria-disabled={solution.id === 'organizador-atendimento-f1' && !colorsReady} onClick={event => { if (solution.id === 'organizador-atendimento-f1' && !colorsReady) event.preventDefault() }} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={solution.id === 'organizador-atendimento-f1' && !colorsReady ? { opacity: .5, cursor: 'default' } : undefined}>{t(solution.id === 'organizador-atendimento-f1' && !colorsReady ? 'Escolha as duas cores para continuar' : 'Pedir informações →')}</a>
              ))}
        </div>
      </div>
    </ProductOverlay>
  )
}
