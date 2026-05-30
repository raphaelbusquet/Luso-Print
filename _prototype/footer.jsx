/* Newsletter + Footer */

const Newsletter = () =>
<section style={{
  padding: '100px 0',
  background: 'var(--terracotta)',
  color: '#FBEDE2',
  position: 'relative', overflow: 'hidden'
}}>
    {/* watermark */}
    <div className="serif-it" style={{
    position: 'absolute', bottom: -60, left: -40,
    fontSize: 'clamp(180px, 30vw, 500px)',
    lineHeight: 0.8,
    color: 'rgba(255,255,255,0.10)',
    pointerEvents: 'none',
    userSelect: 'none'
  }}>devagar</div>

    <div className="shell" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 60, alignItems: 'center' }}>
      <div>
        <span style={{
        fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.7)', fontWeight: 500
      }}>05 — NEWSLETTER LUSOPRINT</span>
        <h2 className="serif" style={{
        fontSize: 'clamp(48px, 6vw, 92px)', lineHeight: 1, letterSpacing: '-0.01em',
        margin: '18px 0 22px', color: '#FBEDE2', fontWeight: 400
      }}>
          Cartas de quem<br />
          <em style={{ fontStyle: 'italic' }}>habita devagar</em>.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 440, margin: 0, fontSize: 16, lineHeight: 1.7 }}>
          Uma vez por mês — novidades do atelier, pré-vendas em primeira mão e ensaios sobre casa, beleza e tempo.
        </p>
      </div>

      <div>
        <form onSubmit={(e) => {e.preventDefault();alert('Obrigada — bem-vindas as cartas.');}}
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.25)',
        backdropFilter: 'blur(8px)',
        padding: 28,
        borderRadius: 2
      }}>
          <label className="kicker" style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 10 }}>
            O seu correio
          </label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'stretch', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: 8 }}>
            <input type="email" placeholder="exemplo@correio.pt" required
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#FBEDE2', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22
          }} />
            <button type="submit" style={{
            background: '#FBEDE2', color: 'var(--terracotta)', border: 'none',
            padding: '10px 18px', borderRadius: 999,
            fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600,
            cursor: 'pointer'
          }}>Subscrever →</button>
          </div>
          <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginTop: 18,
          fontSize: 11, color: 'rgba(255,255,255,0.7)'
        }}>
            <input type="checkbox" defaultChecked style={{ accentColor: '#FBEDE2' }} />
            Aceito receber correio editorial e respeito da privacidade.
          </div>
        </form>
        <div style={{ display: 'flex', gap: 28, marginTop: 22, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
          <span>↳ 8.420 leitoras</span>
          <span>↳ Próxima edição: 12 Junho</span>
          <span>↳ Sem spam, sempre.</span>
        </div>
      </div>
    </div>
  </section>;


const Footer = () =>
<footer id="contacto" style={{
  background: 'var(--ink)', color: 'var(--paper)',
  padding: '64px 0 22px'
}}>
    <div className="shell-wide">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: 60, alignItems: 'start' }}>
        <div>
          <Wordmark size={110} variant="light" />
          <p style={{ marginTop: 22, color: 'rgba(244,239,230,0.7)', maxWidth: 340, lineHeight: 1.7, fontSize: 15 }}>
            Ateliê de design e impressão 3D. Pequenas séries de objetos para a casa, feitas em Lisboa desde 2026.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            {['Instagram', 'Pinterest', 'Vimeo'].map((s) =>
          <a key={s} href="#" style={{
            width: 42, height: 42, borderRadius: '50%',
            border: '1px solid rgba(244,239,230,0.25)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(244,239,230,0.8)'
          }}>{s[0]}</a>
          )}
          </div>
        </div>

        {[
      ['Loja', ['Novidades', 'Estações', 'Edição limitada', 'Personalização', 'Cartões oferta']],
      ['Universos', ['Sala', 'Cozinha', 'Quarto', 'Escritório', 'Crianças']],
      ['Atelier', ['Sobre', 'Materiais', 'Processo', 'Sustentabilidade']],
      ['Apoio', ['Envios', 'Trocas', 'Cuidados', 'Perguntas', 'Contacto']]].
      map(([head, items]) =>
      <div key={head}>
            <div className="kicker" style={{ color: 'rgba(244,239,230,0.55)', marginBottom: 18, fontSize: 11 }}>{head}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
              {items.map((it) =>
          <li key={it}><a href="#" style={{ color: 'rgba(244,239,230,0.85)' }}>{it}</a></li>
          )}
            </ul>
          </div>
      )}
      </div>

      <div style={{
      marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(244,239,230,0.12)',
      display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
      color: 'rgba(244,239,230,0.55)', fontSize: 13
    }}>
        <div>© 2026 Lusoprint — todos os direitos reservados.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ color: 'inherit' }}>Termos</a>
          <a href="#" style={{ color: 'inherit' }}>Privacidade</a>
          <a href="#" style={{ color: 'inherit' }}>Cookies</a>
        </div>
        <div>Lisboa, Portugal</div>
      </div>
    </div>
  </footer>;
window.Newsletter = Newsletter;
window.Footer = Footer;