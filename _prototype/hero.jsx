/* Hero — clean editorial carousel
   3 slides: Estações · Coleção Copa · Personalização */

const SLIDES = [
{
  id: 'estacoes',
  eyebrow: 'EDIÇÃO N.º 1 · VERÃO 2026',
  badge: 'Novo · Coleção Estações',
  titleLines: ['Dá forma'],
  italic: 'à tua imaginação.',
  lede: 'Decoração feita com calma e intenção, para casas que valorizam beleza nos pequenos detalhes.',
  ctaPrimary: { label: 'Ver coleções', href: '#colecoes' },
  ctaSecondary: { label: 'Conheça o atelier', href: '#atelier' },
  image: 'assets/products/aparalivros-figuras.jpg',
  caption: { eyebrow: 'Em destaque', title: 'Aparador de Livros', sub: 'Coleção Decor · desde €30' },
  theme: { bg: 'var(--linen)', fg: 'var(--ink)', muted: 'var(--ink-soft)', rule: 'var(--rule)', accent: 'var(--terracotta)' },
  shapes: 'estacoes'
},
{
  id: 'copa',
  eyebrow: 'EDIÇÃO LIMITADA · JUNHO E JULHO 2026',
  badge: 'Em pré-venda — apenas 30 peças',
  titleLines: ['Coleção'],
  italic: 'Copa \u201926.',
  lede: 'Peças criadas para celebrar cada jogo, cada encontro e cada momento vivido em conjunto.',
  ctaPrimary: { label: 'Descobrir a coleção', href: '#copa' },
  ctaSecondary: { label: 'Ver lookbook', href: '#copa' },
  image: 'assets/products/copa-monster.png',
  caption: { eyebrow: 'Pré-venda aberta', title: 'Copo Monster Copa', sub: 'Edição limitada · € 25' },
  theme: { bg: 'var(--linen)', fg: 'var(--ink)', muted: 'var(--ink-soft)', rule: 'var(--rule)', accent: 'var(--terracotta)' },
  flagDots: true,
  shapes: 'copa'
},
{
  id: 'personal',
  eyebrow: 'PERSONALIZAÇÃO · FEITO À MÃO',
  badge: 'Nome, tipografia e cor',
  titleLines: ['O nome'],
  italic: 'de quem se ama.',
  lede: 'Peças únicas inspiradas na magia dos pequenos detalhes e no amor presente em cada nome.',
  ctaPrimary: { label: 'Começar a personalizar', href: '#personal' },
  ctaSecondary: { label: 'Como funciona', href: '#personal' },
  image: 'assets/products/sophia-name.jpg',
  caption: { eyebrow: 'Em destaque', title: 'Letreiro Sophia', sub: 'Personalizado · desde €15' },
  theme: { bg: 'var(--linen)', fg: 'var(--ink)', muted: 'var(--ink-soft)', rule: 'var(--rule)', accent: 'var(--terracotta)' },
  shapes: 'personal'
}];


const Hero = () => {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = SLIDES.length;
  const slide = SLIDES[idx];
  const t = slide.theme;

  // auto-advance
  React.useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIdx((i) => (i + 1) % total), 8000);
    return () => clearTimeout(id);
  }, [idx, paused, total]);

  const go = (next) => setIdx((next % total + total) % total);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        background: t.bg,
        color: t.fg,
        transition: 'background 600ms ease, color 600ms ease',
        overflow: 'hidden'
      }}>

      {/* Dynamic decorative shapes layer (changes with carousel) */}
      <HeroShapes variant={slide.shapes} idx={idx} />

      {/* slides */}
      <div className="shell-wide" style={{
        position: 'relative', zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
        gap: 80,
        alignItems: 'center',
        minHeight: '74vh',
        padding: '60px 0 50px'
      }}>

        {/* Left — text (animated key on idx for fade) */}
        <div key={'L' + idx} style={{ paddingBottom: 10, position: 'relative', animation: 'lp-fadein 700ms cubic-bezier(.2,.7,.2,1)' }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 30, flexWrap: 'wrap' }}>
            <span className="kicker" style={{ color: t.muted, fontSize: "13px" }}>{slide.eyebrow}</span>
            <span style={{ width: 40, height: 1, background: t.rule }}></span>
            <span className="kicker" style={{ color: t.accent, fontSize: "13px" }}>{slide.badge}</span>
          </div>

          <h1 className="serif" style={{
            margin: 0,
            fontSize: 'clamp(60px, 8.6vw, 136px)',
            lineHeight: 0.94,
            letterSpacing: '-0.018em',
            fontWeight: 400,
            color: t.fg
          }}>
            {slide.titleLines.map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
            <em style={{ fontWeight: 400, fontStyle: 'italic', color: t.accent }}>{slide.italic}</em>
          </h1>

          <p className="lede" style={{ maxWidth: 520, marginTop: 30, color: t.muted, fontSize: 28, lineHeight: 1.45 }}>{slide.lede}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 38 }}>
            <a href={slide.ctaPrimary.href} className="btn"
            style={{
              background: t.fg, color: t.bg, borderColor: t.fg
            }}
            onMouseEnter={(e) => {e.currentTarget.style.background = t.accent;e.currentTarget.style.borderColor = t.accent;e.currentTarget.style.color = '#fff';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = t.fg;e.currentTarget.style.borderColor = t.fg;e.currentTarget.style.color = t.bg;}}>
              {slide.ctaPrimary.label} <span className="arr">→</span>
            </a>
            <a href={slide.ctaSecondary.href} style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16,
              color: t.muted, borderBottom: `1px solid ${t.muted}`, paddingBottom: 4
            }}>{slide.ctaSecondary.label}</a>
          </div>

          {/* Copa-specific flag-dots indicator */}
          {slide.flagDots &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 32 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--copa-green)' }}></span>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--copa-yellow)' }}></span>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--copa-blue)' }}></span>
              <span style={{ marginLeft: 8, fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: t.muted }}>
                Lançamento · 12 Junho
              </span>
            </div>
          }
        </div>

        {/* Right — single clean image */}
        <div key={'R' + idx} style={{
          position: 'relative',
          width: '100%',
          maxWidth: 460,
          justifySelf: 'end',
          aspectRatio: '0.86 / 1',
          animation: 'lp-fadein 800ms cubic-bezier(.2,.7,.2,1)'
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `#E6E0D3 url(${slide.image}) center/cover no-repeat`,
            borderRadius: 2,
            boxShadow: '0 30px 80px -40px rgba(43,39,34,0.35)'
          }}></div>

          {/* simple caption tag */}
          <div style={{
            position: 'absolute', left: 18, bottom: 18,
            background: t.bg, color: t.fg,
            padding: '14px 18px',
            borderLeft: `2px solid ${t.accent}`,
            maxWidth: 240
          }}>
            <div className="kicker" style={{ color: t.accent, marginBottom: 4 }}>{slide.caption.eyebrow}</div>
            <div className="serif" style={{ fontSize: 20, lineHeight: 1.15, color: t.fg }}>{slide.caption.title}</div>
            <div style={{ color: t.muted, marginTop: 2, fontSize: "12px" }}>{slide.caption.sub}</div>
          </div>
        </div>
      </div>

      {/* Carousel controls — bottom band */}
      <div className="shell-wide" style={{
        position: 'relative', zIndex: 2,
        display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr)',
        alignItems: 'center', gap: 24,
        padding: '20px 0 24px',
        borderTop: `1px solid ${t.rule}`
      }}>
        {/* index counter */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span className="serif" style={{ fontStyle: 'italic', fontSize: 40, color: t.fg, lineHeight: 1 }}>
            0{idx + 1}
          </span>
          <span style={{ letterSpacing: '0.26em', textTransform: 'uppercase', color: t.muted, fontSize: "13px" }}>
            / 0{total} · {slide.id === 'copa' ? 'Coleção Copa' : slide.id === 'estacoes' ? 'Estações' : 'Personalização'}
          </span>
        </div>

        {/* dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {SLIDES.map((s, i) =>
          <button key={s.id} onClick={() => go(i)} aria-label={`Ir para slide ${i + 1}`}
          style={{
            width: i === idx ? 42 : 10, height: 10, padding: 0,
            background: i === idx ? t.accent : t.rule,
            border: 'none', borderRadius: 999,
            cursor: 'pointer',
            transition: 'all 360ms cubic-bezier(.2,.7,.2,1)'
          }} />
          )}
        </div>

        {/* arrows + autoplay state */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 18 }}>
          <span style={{ letterSpacing: '0.28em', textTransform: 'uppercase', color: t.muted, fontSize: 10 }}>
            {paused ? 'Pausado' : 'Auto'}
          </span>
          <button onClick={() => go(idx - 1)} aria-label="Anterior" style={arrowBtn(t)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button onClick={() => go(idx + 1)} aria-label="Próximo" style={arrowBtn(t)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes lp-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes lp-shape-in {
          0%   { opacity: 0; transform: translate(var(--from-x, 0), var(--from-y, 0)) scale(var(--from-s, 0.7)) rotate(var(--from-r, 0deg)); }
          100% { opacity: var(--to-o, 1); transform: translate(0,0) scale(1) rotate(var(--to-r, 0deg)); }
        }
        @keyframes lp-float-a {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          50%     { transform: translate(0,-14px) rotate(2deg); }
        }
        @keyframes lp-float-b {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          50%     { transform: translate(8px,10px) rotate(-3deg); }
        }
        @keyframes lp-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>);

};

const arrowBtn = (t) => ({
  width: 44, height: 44, borderRadius: '50%',
  border: `1px solid ${t.rule}`,
  background: 'transparent', color: t.fg,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', transition: 'all 240ms ease'
});

/* ------------------------------------------------------------------
   HeroShapes — decorative organic shapes that animate per carousel
   slide. Uses brand palette: terracotta, blue-gray, cream, olive, sage.
   Shapes live behind text/image but on top of bg. Pointer-events none.
------------------------------------------------------------------- */
const HeroShapes = ({ variant, idx }) => {
  // shared wrapper — re-keyed by idx so animations re-fire on slide change
  const Wrap = ({ children }) => (
    <div key={'shapes-' + idx} aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1
    }}>
      {children}
    </div>
  );

  // base style helper for an animated shape
  const baseAnim = (delay = 0, from = {}, to = {}) => ({
    position: 'absolute',
    animation: `lp-shape-in 1100ms cubic-bezier(.22,.8,.2,1) ${delay}ms both`,
    '--from-x': from.x || '0px',
    '--from-y': from.y || '0px',
    '--from-s': from.s || 0.6,
    '--from-r': from.r || '0deg',
    '--to-o': to.o ?? 1,
    '--to-r': to.r || '0deg'
  });

  if (variant === 'estacoes') {
    return (
      <Wrap>
        {/* large sage blob — top left */}
        <svg viewBox="0 0 400 400" width="520" height="520" style={{
          ...baseAnim(80, { x: '-40px', y: '-20px', s: 0.85, r: '-8deg' }, { o: 0.55, r: '0deg' }),
          top: '-180px', left: '-160px'
        }}>
          <path d="M200,40 C300,40 360,120 360,210 C360,310 280,360 190,360 C100,360 40,290 40,200 C40,110 110,40 200,40 Z"
            fill="var(--sage)" opacity="0.55" />
        </svg>

        {/* olive arch — right of image */}
        <svg viewBox="0 0 200 280" width="220" height="300" style={{
          ...baseAnim(220, { x: '40px', y: '20px', s: 0.7, r: '6deg' }, { o: 0.7 }),
          top: '12%', right: '-60px',
          animationName: 'lp-shape-in, lp-float-a',
          animationDuration: '1100ms, 9s',
          animationDelay: '220ms, 1.3s',
          animationIterationCount: '1, infinite',
          animationTimingFunction: 'cubic-bezier(.22,.8,.2,1), ease-in-out'
        }}>
          <path d="M20 280 L20 100 A80 80 0 0 1 180 100 L180 280 Z"
            fill="none" stroke="var(--olive)" strokeWidth="1.5" opacity="0.65" />
        </svg>

        {/* terracotta line/dot */}
        <div style={{
          ...baseAnim(360, { x: '-20px', y: '0px', s: 0.5 }),
          bottom: '22%', left: '46%',
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--terracotta)', opacity: 0.85
        }}></div>

        {/* cream rectangle accent — bottom right */}
        <div style={{
          ...baseAnim(440, { x: '50px', y: '40px', s: 0.6, r: '-12deg' }, { r: '-8deg' }),
          bottom: '-40px', right: '8%',
          width: 220, height: 160,
          background: 'var(--cream)', opacity: 0.6,
          transform: 'rotate(-8deg)'
        }}></div>

        {/* thin olive line — top middle */}
        <div style={{
          ...baseAnim(180, { x: '0', y: '-20px', s: 1 }),
          top: '14%', left: '38%',
          width: 1, height: 110,
          background: 'var(--olive)', opacity: 0.45
        }}></div>
      </Wrap>
    );
  }

  if (variant === 'copa') {
    return (
      <Wrap>
        {/* blue-gray big circle — left */}
        <div style={{
          ...baseAnim(80, { x: '-40px', y: '20px', s: 0.6 }, { o: 0.5 }),
          top: '12%', left: '-120px',
          width: 360, height: 360, borderRadius: '50%',
          background: 'var(--blue-gray)', opacity: 0.5
        }}></div>

        {/* small terracotta circle */}
        <div style={{
          ...baseAnim(220, { x: '20px', y: '-30px', s: 0.4 }),
          top: '8%', left: '38%',
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--terracotta)', opacity: 0.85,
          animationName: 'lp-shape-in, lp-float-b',
          animationDuration: '1100ms, 7s',
          animationDelay: '220ms, 1.3s',
          animationIterationCount: '1, infinite',
          animationTimingFunction: 'cubic-bezier(.22,.8,.2,1), ease-in-out'
        }}></div>

        {/* olive ring */}
        <svg viewBox="0 0 200 200" width="240" height="240" style={{
          ...baseAnim(340, { x: '40px', y: '40px', s: 0.6, r: '-20deg' }, { o: 0.7 }),
          bottom: '-60px', right: '20%'
        }}>
          <circle cx="100" cy="100" r="88" fill="none"
            stroke="var(--olive)" strokeWidth="1.5" opacity="0.7" strokeDasharray="2 6" />
        </svg>

        {/* cream stripe — top right */}
        <div style={{
          ...baseAnim(160, { x: '60px', y: '-20px', s: 0.7, r: '14deg' }, { r: '18deg' }),
          top: '-30px', right: '-20px',
          width: 280, height: 110,
          background: 'var(--cream)', opacity: 0.65,
          transform: 'rotate(18deg)'
        }}></div>

        {/* sage triangle */}
        <svg viewBox="0 0 100 100" width="120" height="120" style={{
          ...baseAnim(460, { x: '0', y: '40px', s: 0.5, r: '40deg' }, { r: '-12deg' }),
          bottom: '18%', left: '40%'
        }}>
          <polygon points="50,8 92,86 8,86" fill="var(--sage)" opacity="0.8" />
        </svg>
      </Wrap>
    );
  }

  if (variant === 'personal') {
    return (
      <Wrap>
        {/* terracotta wave/curve — left */}
        <svg viewBox="0 0 300 500" width="320" height="540" style={{
          ...baseAnim(80, { x: '-60px', y: '0px', s: 0.8 }, { o: 0.7 }),
          top: '-20px', left: '-80px'
        }}>
          <path d="M 30 0 C 200 120 -40 240 120 380 C 200 460 60 500 60 500"
            fill="none" stroke="var(--terracotta)" strokeWidth="1.5" opacity="0.6" />
          <path d="M 80 20 C 250 140 0 260 170 400"
            fill="none" stroke="var(--terracotta)" strokeWidth="1" opacity="0.45" />
        </svg>

        {/* cream organic blob — right */}
        <svg viewBox="0 0 400 400" width="440" height="440" style={{
          ...baseAnim(220, { x: '60px', y: '20px', s: 0.7, r: '14deg' }, { o: 0.65, r: '8deg' }),
          top: '6%', right: '-160px',
          animationName: 'lp-shape-in, lp-float-a',
          animationDuration: '1100ms, 10s',
          animationDelay: '220ms, 1.3s',
          animationIterationCount: '1, infinite',
          animationTimingFunction: 'cubic-bezier(.22,.8,.2,1), ease-in-out'
        }}>
          <path d="M210,40 C310,60 360,150 350,240 C340,330 240,360 160,350 C80,340 30,260 50,170 C70,80 110,20 210,40 Z"
            fill="var(--cream)" opacity="0.7" />
        </svg>

        {/* small olive ring */}
        <svg viewBox="0 0 80 80" width="100" height="100" style={{
          ...baseAnim(340, { x: '0', y: '-30px', s: 0.4 }),
          top: '18%', left: '44%',
          animation: 'lp-shape-in 1100ms cubic-bezier(.22,.8,.2,1) 340ms both, lp-spin-slow 32s linear infinite 1.5s'
        }}>
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--olive)" strokeWidth="1" opacity="0.6" />
          <circle cx="40" cy="6" r="3" fill="var(--terracotta)" opacity="0.9" />
        </svg>

        {/* blue-gray rectangle accent */}
        <div style={{
          ...baseAnim(440, { x: '-40px', y: '40px', s: 0.6, r: '8deg' }, { r: '4deg' }),
          bottom: '12%', left: '4%',
          width: 140, height: 90,
          background: 'var(--blue-gray)', opacity: 0.55,
          transform: 'rotate(4deg)'
        }}></div>

        {/* sage dot cluster */}
        <div style={{
          ...baseAnim(520, { x: '40px', y: '0px', s: 0.5 }),
          bottom: '28%', right: '12%',
          display: 'flex', gap: 8
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--sage)', opacity: 0.9 }}></span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--olive)', opacity: 0.7 }}></span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--terracotta)', opacity: 0.9 }}></span>
        </div>
      </Wrap>
    );
  }

  return null;
};

window.Hero = Hero;