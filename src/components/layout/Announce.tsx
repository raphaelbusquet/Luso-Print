import { LanguageSelector } from '../../i18n/LanguageSelector'
import { translate as t } from '../../i18n/translate'
import { useIsMobile } from '../../hooks/useIsMobile'

export function Announce() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
        padding: '7px 16px', textAlign: 'center', fontWeight: 400,
        lineHeight: 1.5,
      }}><span>{t("Portugal · Envios grátis acima de €60")}</span>
        <LanguageSelector /></div>
    )
  }

  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--paper)',
      fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
      padding: '10px 0', textAlign: 'center', fontWeight: 400,
    }}>
      <div className="shell-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ opacity: 0.6 }}>{t("LISBOA · PORTUGAL")}</span>
        <span>{t("Envios gratuitos para Portugal em encomendas acima de €60")}</span>
        <span style={{ opacity: 0.6, display: 'flex', gap: 18 }}>
          <span></span>
          <span style={{ opacity: 0.4 }}>{t("·")}</span>
          <LanguageSelector />
          <span style={{ opacity: 0.4 }}>{t("·")}</span>
          <span>{t("€ EUR")}</span>
        </span>
      </div>
    </div>
  )
}
