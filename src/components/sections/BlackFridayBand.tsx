import { translate as t } from '../../i18n/translate'
import { useIsMobile } from '../../hooks/useIsMobile'

export function BlackFridayBand() {
  const mobile = useIsMobile()

  return (
    <section aria-label={t('Black Friday LusoPrint, de 18 a 27 de novembro')} style={{ background: 'var(--ink)', color: 'var(--paper)', padding: mobile ? '14px 18px' : '18px 32px', borderTop: '1px solid rgba(244,239,230,0.14)', borderBottom: '1px solid rgba(244,239,230,0.14)' }}>
      <div className="shell-wide" style={{ minHeight: mobile ? 48 : 64, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: mobile ? 12 : 20 }}>
        <span style={{ width: 1, height: mobile ? 34 : 42, background: 'rgba(244,239,230,0.3)' }} />
        <span style={{ display: 'flex', alignItems: mobile ? 'flex-start' : 'baseline', flexDirection: mobile ? 'column' : 'row', gap: mobile ? 6 : 22 }}>
          <strong style={{ fontFamily: 'var(--serif)', fontSize: mobile ? 25 : 36, lineHeight: 1, fontWeight: 400, letterSpacing: '0.12em' }}>{t('BLACK FRIDAY')}</strong>
          <span style={{ fontSize: mobile ? 9 : 12, letterSpacing: mobile ? '0.16em' : '0.22em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.78)' }}>{t('LUSO · 18 — 27 NOVEMBRO')}</span>
        </span>
        <span aria-hidden="true" style={{ display: mobile ? 'none' : 'block', width: 54, height: 1, background: 'var(--terracotta)', opacity: 0.8 }} />
        {!mobile && <span style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.68)' }}>{t('Uma edição especial da LusoPrint')}</span>}
      </div>
    </section>
  )
}
