import { translate as t } from '../../i18n/translate'
import { useEffect, useRef, type ReactNode } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

export function ProductOverlay({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const mobile = useIsMobile()
  const dialog = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose() }
      if (event.key !== 'Tab') return
      const nodes = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]') ?? []).filter(node => node.getClientRects().length > 0)
      const first = nodes[0], last = nodes[nodes.length - 1]
      if (!first) { event.preventDefault(); return }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [onClose])
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(43,39,34,.5)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: mobile ? 12 : 32 }}>
      <div ref={dialog} role="dialog" aria-modal="true" aria-label={t(title)} tabIndex={-1} onClick={event => event.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 1240, maxHeight: '92dvh', overflowY: 'auto', background: 'var(--paper)', borderRadius: 8, padding: mobile ? '60px 20px 24px' : '56px 40px 40px' }}>
        <button type="button" onClick={onClose} aria-label={t("Fechar produto")} style={{ position: 'absolute', top: 12, right: 12, width: 40, height: 40, borderRadius: '50%', border: 0, background: 'var(--linen)', color: 'var(--ink)', cursor: 'pointer', zIndex: 1 }}>{t("✕")}</button>
        {t(children)}
      </div>
    </div>
  )
}
