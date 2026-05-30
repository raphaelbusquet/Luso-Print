/* Copa collection — special edition section in green/yellow/blue */

const Copa = () => {
  const items = [
    { nome: 'Suporte Bandeira', preco: 24, cor: 'var(--copa-green)', forma: 'cone' },
    { nome: 'Vela Estádio',     preco: 18, cor: 'var(--copa-yellow)', forma: 'arch' },
    { nome: 'Placa Nome 22',    preco: 32, cor: 'var(--copa-blue)', forma: 'rect' },
    { nome: 'Petisqueira Onze', preco: 42, cor: 'var(--copa-green)', forma: 'circle' },
  ];

  return (
    <section style={{
      padding: '140px 0',
      background: '#1A1D1A',
      color: '#F4EFE6',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* big watermark numerals */}
      <div className="serif-it" style={{
        position:'absolute', top: 20, right: -20,
        fontSize: 'clamp(180px, 26vw, 420px)',
        lineHeight: 0.85,
        color: 'var(--copa-yellow)',
        opacity: 0.08,
        fontWeight: 400,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>'26</div>

      <div className="shell" style={{position:'relative'}}>
        <div className="section-head" style={{borderColor:'rgba(255,255,255,0.15)'}}>
          <div style={{maxWidth: 720}}>
            <div style={{display:'flex', alignItems:'center', gap: 14, marginBottom: 24}}>
              <span style={{
                fontSize: 10, letterSpacing: '0.32em', textTransform:'uppercase',
                color: 'var(--copa-yellow)', fontWeight: 500
              }}>04 — Edição limitada</span>
              <span style={{width: 60, height: 1, background:'var(--copa-yellow)', opacity: 0.6}}></span>
              <span style={{fontFamily:'var(--serif)', fontStyle:'italic', color:'rgba(255,255,255,0.6)', fontSize: 14}}>
                disponível enquanto a bola rola
              </span>
            </div>
            <h2 className="serif" style={{
              fontSize: 'clamp(56px, 8vw, 128px)',
              lineHeight: 0.9, letterSpacing: '-0.015em',
              color: '#F4EFE6', margin: 0, fontWeight: 400
            }}>
              Coleção <em style={{fontStyle:'italic', color:'var(--copa-yellow)'}}>Copa</em><br/>
              <span style={{color:'var(--copa-green)'}}>·</span>
              <span style={{color:'var(--copa-yellow)', margin:'0 18px'}}>·</span>
              <span style={{color:'var(--copa-blue)'}}>·</span>
            </h2>
          </div>
          <div style={{maxWidth: 360, paddingBottom: 14, color:'rgba(255,255,255,0.72)'}}>
            <p style={{margin:0}}>
              Pequenos rituais para acompanhar o jogo — pensados em verde, amarelo e azul, com a serenidade Lusoprint.
            </p>
            <a href="#" style={{
              display: 'inline-flex', alignItems:'center', gap: 12,
              marginTop: 22, paddingBottom: 6,
              fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase',
              color: 'var(--copa-yellow)',
              borderBottom: '1px solid var(--copa-yellow)',
            }}>Lookbook completo →</a>
          </div>
        </div>

        {/* products */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, minmax(0, 1fr))', gap: 22}}>
          {items.map((it, i) => (
            <div key={i} style={{position:'relative'}}>
              <div style={{
                aspectRatio: '4/5',
                background: it.cor,
                borderRadius: 2,
                position:'relative',
                overflow:'hidden',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {/* SVG shape representing product */}
                <ProductShape forma={it.forma} />

                {/* number badge */}
                <div className="serif-it" style={{
                  position:'absolute', top: 18, left: 22,
                  fontSize: 28, fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.65)',
                }}>0{i+1}</div>
                {/* corner ribbon */}
                <div style={{
                  position:'absolute', bottom: 18, right: 18,
                  fontSize: 9, letterSpacing: '0.26em', textTransform:'uppercase',
                  color: 'rgba(255,255,255,0.7)'
                }}>Edição limitada</div>
              </div>
              <div style={{marginTop: 16, display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div className="serif" style={{fontSize: 22, color: '#F4EFE6'}}>{it.nome}</div>
                <div className="serif" style={{fontSize: 18, color: 'rgba(255,255,255,0.7)'}}>€{it.preco}</div>
              </div>
            </div>
          ))}
        </div>

        {/* footer band — flag stripes */}
        <div style={{
          marginTop: 80, paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.15)',
          display:'flex', alignItems:'center', justifyContent:'space-between', gap: 40,
        }}>
          <div style={{display:'flex', alignItems:'center', gap: 14}}>
            <span style={{width: 22, height: 22, background:'var(--copa-green)',  borderRadius:'50%'}}></span>
            <span style={{width: 22, height: 22, background:'var(--copa-yellow)', borderRadius:'50%'}}></span>
            <span style={{width: 22, height: 22, background:'var(--copa-blue)',   borderRadius:'50%'}}></span>
            <span style={{
              marginLeft: 16, fontSize: 11, letterSpacing:'0.26em', textTransform:'uppercase',
              color:'rgba(255,255,255,0.72)'
            }}>Lançamento · Junho de 2026</span>
          </div>
          <p className="serif-it" style={{
            fontStyle:'italic', fontSize: 22, color:'rgba(255,255,255,0.65)', margin:0, maxWidth: 460, textAlign:'right'
          }}>
            "A casa, em dia de jogo, é o melhor lugar do mundo."
          </p>
        </div>
      </div>
    </section>
  );
};

const ProductShape = ({ forma }) => {
  // Stylised line-drawing of a product silhouette
  const stroke = 'rgba(255,255,255,0.85)';
  const sw = 2;
  if (forma === 'arch') return (
    <svg width="42%" viewBox="0 0 200 220" fill="none" stroke={stroke} strokeWidth={sw}>
      <path d="M40 200 V100 a60 60 0 0 1 120 0 V200" />
      <g opacity="0.6">
        {Array.from({length:9}).map((_,i)=>(
          <line key={i} x1={50+i*12} y1={60+(i<5?10*i:10*(8-i))} x2={50+i*12} y2={200} />
        ))}
      </g>
    </svg>
  );
  if (forma === 'cone') return (
    <svg width="46%" viewBox="0 0 200 220" fill="none" stroke={stroke} strokeWidth={sw}>
      <path d="M60 200 L100 60 L140 200 Z" />
      <line x1="100" y1="20" x2="100" y2="60" />
      <path d="M85 20 L100 28 L100 20" fill={stroke}/>
    </svg>
  );
  if (forma === 'rect') return (
    <svg width="62%" viewBox="0 0 260 180" fill="none" stroke={stroke} strokeWidth={sw}>
      <rect x="20" y="40" width="220" height="110" rx="10"/>
      <text x="130" y="110" textAnchor="middle" fontFamily="Cormorant" fontStyle="italic" fontSize="48" fill={stroke} stroke="none">Brasil</text>
    </svg>
  );
  return (
    <svg width="58%" viewBox="0 0 220 220" fill="none" stroke={stroke} strokeWidth={sw}>
      <circle cx="110" cy="110" r="85"/>
      <circle cx="110" cy="110" r="62" opacity="0.7"/>
      <circle cx="110" cy="110" r="38" opacity="0.5"/>
    </svg>
  );
};

window.Copa = Copa;
