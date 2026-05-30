/* Top navigation + announcement bar + logo wordmark */

const Wordmark = ({ size = 64, variant = 'header' }) => {
  const src = variant === 'light'
    ? 'assets/brand/lusoprint-light.png'
    : 'assets/brand/lusoprint-header.png';
  return (
    <img
      src={src}
      alt="Lusoprint"
      style={{
        height: size,
        width: 'auto',
        maxWidth: 'none',
        flexShrink: 0,
        display: 'block'
      }} />
  );
};

const Announce = () =>
<div style={{
  background: 'var(--ink)', color: 'var(--paper)',
  fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
  padding: '10px 0', textAlign: 'center', fontWeight: 400
}}>
    <div className="shell-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ opacity: 0.6 }}>ATELIER LISBOA · PORTUGAL</span>
      <span>Envios gratuitos em encomendas acima de €60 — Edição de Verão disponível</span>
      <span style={{ opacity: 0.6, display: 'flex', gap: 18 }}>
        <span></span><span style={{ opacity: 0.4 }}>·</span><span>PT</span><span style={{ opacity: 0.4 }}>·</span><span>€ EUR</span>
      </span>
    </div>
  </div>;

const NAV_LINKS = [
['Universos', '#universos'],
['Coleções', '#colecoes'],
['Diário', '#diario'],
['Atelier', '#atelier'],
['Contacto', '#contacto']];


const Nav = ({ onCart }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(244,239,230,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'all 300ms ease'
    }}>
      <div className="shell-wide" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 0', gap: 28
      }}>
        {/* Left — logo */}
        <a href="#top" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Wordmark size={52} />
        </a>

        {/* Center — primary nav */}
        <nav style={{
          display: 'flex', justifyContent: 'center', gap: 30, flexShrink: 1,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', fontSize: 12
        }}>
          {NAV_LINKS.map(([label, href]) =>
            <a key={label} href={href} style={{ position: 'relative', whiteSpace: 'nowrap' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--terracotta)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink)'}>
              {label}
            </a>
          )}
        </nav>

        {/* Right — account / wishlist / cart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 18, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)', flexShrink: 0 }}>
          <span style={{ cursor: 'pointer' }}>Conta</span>
          <span style={{ cursor: 'pointer' }}>Favoritos</span>
          <span onClick={onCart} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--ink)' }}>
            Cesto
            <span style={{ background: 'var(--terracotta)', color: '#fff', width: 20, height: 20, borderRadius: '50%',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, letterSpacing: 0
            }}>2</span>
          </span>
        </div>
      </div>
    </header>);

};

window.Wordmark = Wordmark;
window.Announce = Announce;
window.Nav = Nav;
