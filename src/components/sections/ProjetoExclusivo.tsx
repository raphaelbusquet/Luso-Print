import { translate as t } from '../../i18n/translate'
import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

export function ProjetoExclusivo() {
  const mobile = useIsMobile()
  const [idea, setIdea] = useState('')
  const message = `${t("Olá! Quero algo exclusivo para a minha empresa e gostaria de falar com a Luso sobre um projeto personalizado.")}${idea.trim() ? `\n\n${t("A minha ideia:")} ${idea.trim()}` : ''}`
  return (
    <section id="projeto-exclusivo" style={{ marginTop: 72, padding: mobile ? 24 : 48, background: 'var(--linen)', border: '1px solid var(--rule)', borderRadius: 8, display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 24 : 48, alignItems: 'center' }}>
      <div>
        <span className="kicker">{t("À MEDIDA DA SUA IDEIA")}</span>
        <h2 className="serif" style={{ fontWeight: 400, fontSize: mobile ? 38 : 48, lineHeight: 1.1, margin: '20px 0' }}>{t("Quero algo ")}<em style={{ color: 'var(--terracotta)' }}>{t("exclusivo.")}</em></h2>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>{t("Tem uma ideia que ainda não encontrou aqui? Vamos dar-lhe forma. Criamos peças personalizadas para a sua empresa, com os formatos, as cores e os detalhes que fazem sentido para a sua marca.")}</p>
        <p style={{ fontSize: 12, color: 'var(--ink-mute)', lineHeight: 1.6 }}>{t("Conte-nos o que imagina. Conversamos consigo pelo WhatsApp para definir os detalhes e preparar um orçamento.")}</p>
      </div>
      <div>
        <label htmlFor="exclusive-project-idea" className="kicker">{t("O que gostava de criar? ")}<span style={{ letterSpacing: 0, textTransform: 'none' }}>{t("(opcional)")}</span></label>
        <textarea id="exclusive-project-idea" value={idea} onChange={e => setIdea(e.target.value)} maxLength={1500} rows={5} placeholder={t("Uma peça com a minha marca, um presente para clientes, um produto que ainda não existe…")} style={{ display: 'block', boxSizing: 'border-box', width: '100%', padding: 16, margin: '14px 0 20px', resize: 'vertical', border: '1px solid var(--rule)', borderRadius: 4, fontFamily: 'inherit', fontSize: 14, lineHeight: 1.6, background: 'var(--paper)', color: 'var(--ink)' }} />
        <a href={`https://wa.me/351928419522?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="btn btn-solid" style={{ whiteSpace: 'normal', textAlign: 'center' }}>{t("Quero algo exclusivo · Falar no WhatsApp →")}</a>
      </div>
    </section>
  )
}
