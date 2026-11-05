import { Link } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useIsMobile'

export function Empresas() {
  const mobile = useIsMobile()
  return (
    <section id="empresas" style={{ background: 'var(--linen)', padding: mobile ? '64px 0' : '100px 0' }}>
      <div className="shell" style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 32 : 72, alignItems: 'center' }}>
        <Link to="/empresas" aria-label="Explorar soluções para empresas">
          <img src="/assets/empresas/placa-luso-nfc-atual-1.png" alt="Placa personalizada Luso Print com ligações digitais" style={{ width: '100%', display: 'block', borderRadius: 4 }} />
        </Link>
        <div>
          <span className="kicker">03 — PARA EMPRESAS</span>
          <h2 className="serif" style={{ fontSize: mobile ? 48 : 'clamp(48px, 5vw, 80px)', lineHeight: 1.05, fontWeight: 400, margin: '24px 0' }}>
            Da Luso <em style={{ color: 'var(--terracotta)' }}>para sua empresa.</em>
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 18, lineHeight: 1.7, maxWidth: 500 }}>Ideias que dão forma à sua marca. Brindes personalizados, chaveiros multifuncionais e peças com NFC, pensados para criar ligações com os seus clientes.</p>
          <Link to="/empresas" className="btn btn-solid" style={{ marginTop: 20 }}>Descobrir as soluções <span aria-hidden="true">→</span></Link>
          <a href="https://wa.me/351939158345?text=Ol%C3%A1!%20Quero%20algo%20exclusivo%20para%20a%20minha%20empresa%20e%20gostaria%20de%20falar%20sobre%20um%20projeto%20personalizado." target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ display: 'block', width: 'fit-content', marginTop: 20 }}>Quero algo exclusivo →</a>
          <p style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 18 }}>Projetos à medida · Orçamento sob consulta</p>
        </div>
      </div>
    </section>
  )
}
