/* Personalização — interactive name preview (twin pastel color pickers) */

const PASTEL_LETRA = [
  { name: 'Branco',     hex: '#F5F1EA' },
  { name: 'Bege',       hex: '#E8DFCC' },
  { name: 'Rosa Pó',    hex: '#F2CFC8' },
  { name: 'Areia',      hex: '#E7CFA8' },
  { name: 'Sálvia',     hex: '#C9D4B5' },
  { name: 'Azul Névoa', hex: '#B6CAD4' },
  { name: 'Lilás',      hex: '#D6C8DE' },
  { name: 'Pêssego',    hex: '#F2C9A6' },
  { name: 'Cinza Claro',hex: '#D6D2CB' },
  { name: 'Marfim',     hex: '#EFE6D3' },
];

const PASTEL_NOME = [
  { name: 'Branco',     hex: '#FAF6EF' },
  { name: 'Pó de Rosa', hex: '#E8B8B5' },
  { name: 'Terracota',  hex: '#C9826E' },
  { name: 'Azul Pó',    hex: '#A8B4B3' },
  { name: 'Oliva',      hex: '#8D9274' },
  { name: 'Bege',       hex: '#D9CEBC' },
  { name: 'Caramelo',   hex: '#C29A6E' },
  { name: 'Lavanda',    hex: '#B9A6C2' },
  { name: 'Hortelã',    hex: '#A5C7B3' },
  { name: 'Amarelo Pál.',hex: '#E8D480' },
];

const Personalizacao = () => {
  const [name, setName] = React.useState('Ethan');
  const [letraIdx, setLetraIdx] = React.useState(5); // Azul Névoa as default to match cover
  const [nomeIdx, setNomeIdx]   = React.useState(0); // Branco

  const swatch = (palette, sel, set, label) => (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <span className="kicker">{label}</span>
        <span style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          color: 'var(--ink-soft)', fontSize: 15,
        }}>{palette[sel].name}</span>
      </div>
      <div style={{display:'flex', flexWrap:'wrap', gap: 10}}>
        {palette.map((c, i) => (
          <button key={c.name} onClick={() => set(i)} aria-label={c.name} title={c.name}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: c.hex,
              padding: 0, cursor:'pointer',
              border: sel===i ? '1.5px solid var(--ink)' : '1px solid var(--rule)',
              outline: sel===i ? '2px solid var(--paper)' : 'none',
              outlineOffset: -5,
              boxShadow: sel===i ? '0 0 0 2px var(--ink)' : 'none',
              transition: 'all 180ms ease',
            }}/>
        ))}
      </div>
    </div>
  );

  return (
    <section style={{ padding: '40px 0 100px', background: 'var(--linen)' }}>
      <div className="shell" style={{
        display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
        gap: 70, alignItems: 'center'
      }}>
        {/* Left — product photo */}
        <div style={{
          aspectRatio: '5/4',
          background: '#F1EBDD',
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 30px 80px -50px rgba(43,39,34,0.45)',
        }}>
          <div style={{
            position:'absolute', inset: 0,
            backgroundImage: 'url(assets/products/ethan-letter.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>

          {/* corner watermark */}
          <div style={{
            position: 'absolute', top: 22, left: 24, fontFamily: 'var(--serif)', fontStyle: 'italic',
            color: '#fff', fontSize: 16,
            textShadow: '0 2px 8px rgba(0,0,0,0.35)',
          }}>nº 0114</div>
          <div style={{
            position: 'absolute', bottom: 22, right: 24, color: '#fff', fontSize: 10,
            letterSpacing: '0.26em', textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}>Personalizado · Lusoprint</div>
        </div>

        {/* Right — configurator */}
        <div>
          <span className="kicker">03 — Personalização</span>
          <h2 className="serif" style={{
            margin: '14px 0 24px 0',
            fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1, letterSpacing: '-0.01em',
            fontWeight: 400,
          }}>
            O nome de quem<br /><em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>se ama</em>, em casa.
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 480, marginBottom: 32, fontSize: 16, lineHeight: 1.7 }}>
            Escolha a inicial, o nome e o tom de cada peça. Imprimimos no atelier, com o cuidado de quem o vai oferecer.
          </p>

          {/* configurator block */}
          <div style={{
            background: 'var(--paper)',
            padding: 32, borderRadius: 4,
            border: '1px solid var(--rule)',
          }}>
            {/* Name input */}
            <label style={{ display: 'block' }}>
              <div className="kicker" style={{ marginBottom: 10 }}>Nome desejado</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 16))}
                placeholder="Escreva aqui…"
                style={{
                  width: '100%', padding: '12px 0',
                  fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 28,
                  border: 'none', borderBottom: '1px solid var(--ink)', background: 'transparent',
                  color: 'var(--ink)', outline: 'none',
                }} />
              <div style={{ fontSize: 10, color: 'var(--ink-mute)', marginTop: 4 }}>{name.length}/16 carateres</div>
            </label>

            {/* Two color pickers */}
            <div style={{ marginTop: 26 }}>
              {swatch(PASTEL_LETRA, letraIdx, setLetraIdx, 'Cor da inicial')}
            </div>
            <div style={{ marginTop: 22 }}>
              {swatch(PASTEL_NOME, nomeIdx, setNomeIdx, 'Cor do nome')}
            </div>

            {/* Price + CTA */}
            <div style={{
              marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--rule)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            }}>
              <div>
                <div className="serif" style={{ fontSize: 26 }}>
                  €29
                  <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}> · entrega 5 dias</span>
                </div>
                <div className="kicker" style={{ marginTop: 4 }}>Tamanho L · 26cm</div>
              </div>
              <button className="btn btn-solid">
                Adicionar ao cesto <span className="arr">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Personalizacao = Personalizacao;
