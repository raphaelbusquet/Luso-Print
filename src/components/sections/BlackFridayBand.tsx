import { translate as t } from '../../i18n/translate'
import { useIsMobile } from '../../hooks/useIsMobile'

export function BlackFridayBand() {
  const mobile = useIsMobile()

  return (
    <section aria-label={t('Black Friday — 40% OFF até 28/11')} style={{ width: '100%', boxSizing: 'border-box', background: 'var(--ink)', color: 'var(--paper)', padding: mobile ? '14px 18px' : '18px 32px', borderTop: '1px solid rgba(244,239,230,0.14)', borderBottom: '1px solid rgba(244,239,230,0.14)' }}>
      <div style={{ maxWidth: 1520, marginInline: 'auto', textAlign: 'center', minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: mobile ? 'center' : 'space-between', flexDirection: mobile ? 'column' : 'row', flexWrap: 'wrap', gap: mobile ? 12 : 24 }}>
        <strong style={{ fontFamily: 'var(--serif)', fontSize: mobile ? 'clamp(21px, 7vw, 36px)' : 'clamp(36px, 4vw, 60px)', lineHeight: 1, fontWeight: 400, letterSpacing: mobile ? '0.16em' : '0.24em' }}>{t('BLACK FRIDAY')}</strong>
        <span style={{ fontSize: mobile ? 11 : 14, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{t('— 40% OFF até 28/11')}</span>
      </div>
    </section>
  )
}
