/* Featured products — editorial product grid with filter tabs */

const ProductCard = ({ p, big = false }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}>
      <div className="surface" style={{
        aspectRatio: big ? '4/5' : '3.4/4',
        position: 'relative',
        background: 'var(--linen)'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `url(${p.img}) center/cover no-repeat`,
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 900ms cubic-bezier(.2,.7,.2,1)',
          filter: 'saturate(0.95)'
        }}></div>

        {p.tag &&
        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: p.tag === 'NOVO' ? 'var(--terracotta)' : p.tag === 'PERSONALIZÁVEL' ? 'var(--ink)' : 'var(--olive)',
          color: '#fff',
          fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase',
          padding: '6px 10px', borderRadius: 999
        }}>{p.tag}</div>
        }

        {/* hover quick-add */}
        <div style={{
          position: 'absolute', left: 14, right: 14, bottom: 14,
          opacity: hover ? 1 : 0, transform: hover ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 240ms ease',
          display: 'flex', gap: 8
        }}>
          <button className="btn btn-solid" style={{ flex: 1, padding: '12px 14px', fontSize: 10, justifyContent: 'center' }}>
            Adicionar — €{p.price}
          </button>
          <button style={{
            width: 44, height: 44, border: '1px solid var(--ink)', background: 'var(--paper)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 21s-7-4.5-9-9.5C1.5 7 5 4 8 4c2 0 3 1 4 2 1-1 2-2 4-2 3 0 6.5 3 5 7.5-2 5-9 9.5-9 9.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14, gap: 12 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 4, fontSize: 9 }}>{p.collection}</div>
          <div className="serif" style={{ fontSize: big ? 22 : 18, lineHeight: 1.15 }}>{p.name}</div>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: big ? 22 : 18, color: 'var(--ink)' }}>€{p.price}</div>
      </div>
    </div>);

};

const TABS = ['Tudo', 'Sala', 'Escritório', 'Cozinha', 'Crianças', 'Decoração'];

const Products = () => {
  const { PRODUCTS } = window.LUSO_DATA;
  const [tab, setTab] = React.useState('Tudo');
  const filtered = (tab === 'Tudo' ? PRODUCTS : PRODUCTS.filter((p) => p.collection === tab)).slice(0, 8);

  return (
    <section id="colecoes" style={{ padding: '130px 0' }}>
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="kicker">03 — Coleção em destaque</span>
            <h2 style={{ fontSize: "88px" }}>
              <em style={{ fontStyle: 'italic', fontSize: "88px" }}>Estações</em> —<br />
              objetos para se viver.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
            <p style={{ color: 'var(--ink-soft)', maxWidth: 320, margin: 0, textAlign: 'right', fontSize: "20px" }}>
              Uma seleção curada do que melhor traduz o nosso pensamento esta temporada.
            </p>
            <a href="#" className="btn-ghost" style={{ fontSize: "19px" }}>Loja completa — 287 peças</a>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: 48,
          borderBottom: '1px solid var(--rule)'
        }}>
          {TABS.map((t) =>
          <button key={t}
          onClick={() => setTab(t)}
          style={{
            background: 'none', border: 'none',
            padding: '14px 18px',
            fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: tab === t ? 'var(--ink)' : 'var(--ink-mute)',
            fontWeight: tab === t ? 500 : 400,
            borderBottom: tab === t ? '1px solid var(--terracotta)' : '1px solid transparent',
            marginBottom: -1,
            transition: 'all 220ms ease'
          }}>
              {t}
            </button>
          )}
          <span style={{ marginLeft: 'auto', alignSelf: 'center', color: 'var(--ink-mute)', fontSize: 12, paddingRight: 4 }}>
            {filtered.length} peças mostradas
          </span>
        </div>

        {/* Grid: editorial — first card big */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 28, gridAutoRows: 'auto'
        }}>
          {filtered.map((p, i) =>
          <div key={p.id} style={{
            gridColumn: i === 0 ? 'span 2' : 'span 1',
            gridRow: i === 0 ? 'span 2' : 'span 1'
          }}>
              <ProductCard p={p} big={i === 0} />
            </div>
          )}
        </div>
      </div>
    </section>);

};

window.ProductCard = ProductCard;
window.Products = Products;