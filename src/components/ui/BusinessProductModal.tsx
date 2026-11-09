import { translate as t } from '../../i18n/translate'
import { useState } from 'react'
import { BUSINESS_SOLUTIONS, businessContact } from '../../data/empresas'
import { NailKitGallery } from './NailKitGallery'
import { NailKitOptions, type NailKitVersion } from './NailKitOptions'
import { ProductOverlay } from './ProductOverlay'
import { useIsMobile } from '../../hooks/useIsMobile'

type Solution = (typeof BUSINESS_SOLUTIONS)[number]

export function BusinessProductModal({ solution, onClose }: { solution: Solution; onClose: () => void }) {
  const mobile = useIsMobile()
  const [nailKit, setNailKit] = useState<NailKitVersion>('master')
  const [selectedPhotos, setSelectedPhotos] = useState<Record<string, string>>({})
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
                <p style={{ fontFamily: 'var(--serif)', fontSize: 28, margin: '0 0 12px' }}>{t("€")}{t(solution.price)} <span style={{ fontFamily: 'var(--sans)', fontSize: 13 }}>{t("/ unidade")}</span></p>
              ))}
              <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{t(solution.description)}</p>
              {t(solution.id === 'kit-nail-instrutor' && (
                <p style={{ color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.7, borderLeft: '2px solid var(--terracotta)', paddingLeft: 14 }}>
                  <em>{t("Material didático demonstrativo. As brocas e lixas do kit não substituem ferramentas de uso profissional.")}</em>
                </p>
              ))}
              {t(solution.id === 'kit-nail-instrutor' ? <NailKitOptions kit={nailKit} onKitChange={setNailKit} /> : (
                <a href={businessContact(solution.title)} target="_blank" rel="noopener noreferrer" className="btn-ghost">{t("Pedir informações →")}</a>
              ))}
        </div>
      </div>
    </ProductOverlay>
  )
}
