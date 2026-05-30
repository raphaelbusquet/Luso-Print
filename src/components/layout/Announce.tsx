import { useIsMobile } from '../../hooks/useIsMobile'

export function Announce() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
        padding: '7px 16px', textAlign: 'center', fontWeight: 400,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        Envios grátis ≥ €60 · Mundial disponível
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--paper)',
      fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
      padding: '10px 0', textAlign: 'center', fontWeight: 400,
    }}>
      <div className="shell-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ opacity: 0.6 }}>LISBOA · PORTUGAL</span>
        <span>Envios gratuitos em encomendas acima de €60 — Edição Mundial disponível</span>
        <span style={{ opacity: 0.6, display: 'flex', gap: 18 }}>
          <span></span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>PT</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>€ EUR</span>
        </span>
      </div>
    </div>
  )
}
