/* Editorial story — slow living / atelier feature */

const Edito = () => {
  const imgBox = {
    width: '440px',
    height: '330px',
    borderRadius: 2,
    backgroundColor: '#D9D5C9',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <section id="atelier" style={{
      padding: '100px 0 80px',
      background: 'var(--paper-2)',
      borderTop: '1px solid var(--rule)',
      borderBottom: '1px solid var(--rule)'
    }}>
      <div className="shell-wide" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, auto) minmax(0, 1fr) minmax(0, auto)',
        gap: 56,
        alignItems: 'center'
      }}>
        {/* Left image stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ ...imgBox, backgroundImage: 'url(assets/edito/headphone-stand.jpg)' }}></div>
          <div style={{ ...imgBox, backgroundImage: 'url(assets/edito/wall-calendar.jpg)', marginLeft: 30 }}></div>
        </div>

        {/* Center column */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', maxWidth: 560, width: '100%', margin: '0 auto', justifySelf: 'center', alignSelf: 'center'
        }}>
          <span className="kicker">02 — O nosso trabalho</span>
          <h2 className="serif" style={{
            fontSize: 'clamp(48px, 6vw, 92px)',
            lineHeight: 1, letterSpacing: '-0.01em',
            margin: '20px 0 32px', fontWeight: 400
          }}>
            Da imaginação<br />
            <em style={{ fontStyle: 'italic' }}>à matéria</em>,<br />
            sem pressa.
          </h2>

          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, margin: '24px 0 28px'
          }}>
            <span style={{ width: 32, height: 1, background: 'var(--ink-mute)' }}></span>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--terracotta)', fontSize: 22 }}>memorável</span>
            <span style={{ width: 32, height: 1, background: 'var(--ink-mute)' }}></span>
          </div>

          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto', fontSize: 16 }}>
            Desenhamos e imprimimos cada peça numa impressora 3D num cantinho do nosso lar com muito amor e carinho — porque acreditamos que o teu espaço, assim como o nosso, merece ter a tua cara.
          </p>

          {/* values strip */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 36,
            marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--rule)',
            fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--ink-soft)'
          }}>
            <span>Conexão</span><span style={{ opacity: 0.4 }}>·</span>
            <span>Acolhimento</span><span style={{ opacity: 0.4 }}>·</span>
            <span>Sofisticação</span><span style={{ opacity: 0.4 }}>·</span>
            <span>Equilíbrio</span>
          </div>
        </div>

        {/* Right image stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ ...imgBox, backgroundImage: 'url(assets/edito/bookends-arch.jpg)', marginRight: 30 }}></div>
          <div style={{ ...imgBox, backgroundImage: 'url(assets/edito/phone-stands.jpg)' }}></div>
        </div>
      </div>

      {/* vertical "Memorável" type intervention — under the row */}
      <div style={{
        marginTop: 48,
        marginBottom: -20,
        textAlign: 'center',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div className="serif-it" style={{
          fontSize: 'clamp(96px, 13vw, 180px)',
          lineHeight: 0.85,
          color: 'var(--terracotta)',
          opacity: 0.18,
          fontStyle: 'italic',
          letterSpacing: '-0.02em',
          fontWeight: 400,
          userSelect: 'none'
        }}>Memorável</div>
      </div>
    </section>);

};

window.Edito = Edito;