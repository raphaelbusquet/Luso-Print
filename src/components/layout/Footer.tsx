import { Link } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useIsMobile'

type FooterLink = { label: string; to: string; external?: boolean }

const FOOTER_COLS: [string, FooterLink[]][] = [
  ['Loja', [
    { label: 'Novidades',       to: '/loja?tag=NOVO' },
    { label: 'Personalização',  to: '/#personal' },
    { label: 'Edição limitada', to: '/#mundial' },
    { label: 'Diário',          to: '/diario' },
  ]],
  ['Universos', [
    { label: 'Família',          to: '/loja/mamaes' },
    { label: 'Bebés & Crianças', to: '/loja/bebes' },
    { label: 'Escritório', to: '/loja/escrit' },
    { label: 'Cozinha',    to: '/loja/cozinha' },
    { label: 'Sala',       to: '/loja/sala' },
  ]],
  ['Atelier', [
    { label: 'Sobre',            to: '/#sobre' },
    { label: 'Materiais',        to: '/#sobre' },
    { label: 'Sustentabilidade', to: '/#sobre' },
  ]],
  ['Apoio', [
    { label: 'Envios e Trocas', to: '/termos' },
    { label: 'Termos legais',   to: '/termos' },
    { label: 'Privacidade',     to: '/termos' },
    { label: 'Contacto',        to: '/#contacto' },
  ]],
]

const linkStyle = { color: 'rgba(244,239,230,0.85)' }

function FooterLink({ link }: { link: FooterLink }) {
  if (link.external) {
    return <a href={link.to} target="_blank" rel="noreferrer" style={linkStyle}>{link.label}</a>
  }
  if (link.to.startsWith('/#')) {
    return <a href={link.to} style={linkStyle}>{link.label}</a>
  }
  return <Link to={link.to} style={linkStyle}>{link.label}</Link>
}

export function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', padding: isMobile ? '48px 0 22px' : '64px 0 22px' }}>
      <div className="shell-wide">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
          gap: isMobile ? '40px 24px' : 60,
          alignItems: 'start',
        }}>
          <div style={isMobile ? { gridColumn: 'span 2' } : {}}>
            <img
              src="/assets/brand/lusoprint-light.png"
              alt="Lusoprint"
              style={{ height: 110, width: 'auto' }}
            />
            <p style={{ marginTop: 22, color: 'rgba(244,239,230,0.7)', maxWidth: 340, lineHeight: 1.7, fontSize: 15 }}>
              Ateliê de design e impressão 3D. Pequenas séries de objetos para a casa, feitas em Lisboa desde 2026.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              {[
                {
                  label: 'Instagram',
                  href: 'https://instagram.com/lusoprint',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>,
                },
                {
                  label: 'Pinterest',
                  href: 'https://pin.it/3Acb2Whch',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.55c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.1-2.36 3.1-5.15 0-2.13-1.44-3.62-3.5-3.62-2.38 0-3.78 1.79-3.78 3.63 0 .72.28 1.49.62 1.91.07.08.08.16.06.24l-.23.95c-.04.14-.12.18-.28.11-1.03-.48-1.67-1.98-1.67-3.19 0-2.59 1.88-4.97 5.42-4.97 2.84 0 5.05 2.03 5.05 4.73 0 2.82-1.78 5.09-4.24 5.09-.83 0-1.61-.43-1.87-.94l-.51 1.9c-.18.71-.68 1.59-1.02 2.13.77.24 1.58.37 2.42.37 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>,
                },
                {
                  label: 'TikTok',
                  href: 'https://tiktok.com/@luso.print',
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>,
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: 42, height: 42, borderRadius: '50%',
                    border: '1px solid rgba(244,239,230,0.25)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(244,239,230,0.7)',
                    transition: 'border-color 200ms, color 200ms',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--paper)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(244,239,230,0.6)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(244,239,230,0.7)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(244,239,230,0.25)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map(([head, items]) => (
            <div key={head}>
              <div className="kicker" style={{ color: 'rgba(244,239,230,0.55)', marginBottom: 18, fontSize: 11 }}>{head}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
                {items.map(link => (
                  <li key={link.label}><FooterLink link={link} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(244,239,230,0.12)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          color: 'rgba(244,239,230,0.55)', fontSize: 13,
        }}>
          <div>© 2026 Lusoprint — todos os direitos reservados.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link to="/termos" style={{ color: 'inherit' }}>Termos</Link>
            <Link to="/termos" style={{ color: 'inherit' }}>Privacidade</Link>
            <a href="#cookie-settings" style={{ color: 'inherit' }} onClick={e => { e.preventDefault(); window.dispatchEvent(new Event('lp:open-cookie-settings')) }}>Cookies</a>
          </div>
          <div>Lisboa, Portugal</div>
        </div>
      </div>
    </footer>
  )
}
