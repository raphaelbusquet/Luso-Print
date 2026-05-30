import { CSSProperties } from 'react'

type Props = {
  variant: string
  idx: number
}

const baseAnim = (delay = 0, from: Record<string, string> = {}, to: Record<string, string | number> = {}): CSSProperties => ({
  position: 'absolute',
  animation: `lp-shape-in 1100ms cubic-bezier(.22,.8,.2,1) ${delay}ms both`,
  // @ts-expect-error CSS custom properties
  '--from-x': from.x ?? '0px',
  '--from-y': from.y ?? '0px',
  '--from-s': from.s ?? 0.6,
  '--from-r': from.r ?? '0deg',
  '--to-o': to.o ?? 1,
  '--to-r': to.r ?? '0deg',
})

export function HeroShapes({ variant, idx }: Props) {
  const wrap: CSSProperties = {
    position: 'absolute', inset: 0,
    pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
  }

  if (variant === 'estacoes') {
    return (
      <div key={'shapes-' + idx} aria-hidden="true" style={wrap}>
        <svg viewBox="0 0 400 400" width="520" height="520" style={{
          ...baseAnim(80, { x: '-40px', y: '-20px', s: '0.85', r: '-8deg' }, { o: 0.55, r: '0deg' }),
          top: '-180px', left: '-160px',
        }}>
          <path d="M200,40 C300,40 360,120 360,210 C360,310 280,360 190,360 C100,360 40,290 40,200 C40,110 110,40 200,40 Z"
            fill="var(--sage)" opacity="0.55" />
        </svg>

        <svg viewBox="0 0 200 280" width="220" height="300" style={{
          ...baseAnim(220, { x: '40px', y: '20px', s: '0.7', r: '6deg' }, { o: 0.7 }),
          top: '12%', right: '-60px',
          animationName: 'lp-shape-in, lp-float-a',
          animationDuration: '1100ms, 9s',
          animationDelay: '220ms, 1.3s',
          animationIterationCount: '1, infinite',
          animationTimingFunction: 'cubic-bezier(.22,.8,.2,1), ease-in-out',
        }}>
          <path d="M20 280 L20 100 A80 80 0 0 1 180 100 L180 280 Z"
            fill="none" stroke="var(--olive)" strokeWidth="1.5" opacity="0.65" />
        </svg>

        <div style={{
          ...baseAnim(360, { x: '-20px', y: '0px', s: '0.5' }),
          bottom: '22%', left: '46%',
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--terracotta)', opacity: 0.85,
        }} />

        <div style={{
          ...baseAnim(440, { x: '50px', y: '40px', s: '0.6', r: '-12deg' }, { r: '-8deg' }),
          bottom: '-40px', right: '8%',
          width: 220, height: 160,
          background: 'var(--cream)', opacity: 0.6,
          transform: 'rotate(-8deg)',
        }} />

        <div style={{
          ...baseAnim(180, { x: '0', y: '-20px', s: '1' }),
          top: '14%', left: '38%',
          width: 1, height: 110,
          background: 'var(--olive)', opacity: 0.45,
        }} />
      </div>
    )
  }

  if (variant === 'mundial') {
    return (
      <div key={'shapes-' + idx} aria-hidden="true" style={wrap}>
        <div style={{
          ...baseAnim(80, { x: '-40px', y: '20px', s: '0.6' }, { o: 0.5 }),
          top: '12%', left: '-120px',
          width: 360, height: 360, borderRadius: '50%',
          background: 'var(--blue-gray)', opacity: 0.5,
        }} />

        <div style={{
          ...baseAnim(220, { x: '20px', y: '-30px', s: '0.4' }),
          top: '8%', left: '38%',
          width: 56, height: 56, borderRadius: '50%',
          background: 'var(--cream)', opacity: 0.55,
          animationName: 'lp-shape-in, lp-float-b',
          animationDuration: '1100ms, 7s',
          animationDelay: '220ms, 1.3s',
          animationIterationCount: '1, infinite',
          animationTimingFunction: 'cubic-bezier(.22,.8,.2,1), ease-in-out',
        }} />

        <svg viewBox="0 0 200 200" width="240" height="240" style={{
          ...baseAnim(340, { x: '40px', y: '40px', s: '0.6', r: '-20deg' }, { o: 0.7 }),
          bottom: '-60px', right: '20%',
        }}>
          <circle cx="100" cy="100" r="88" fill="none"
            stroke="var(--olive)" strokeWidth="1.5" opacity="0.7" strokeDasharray="2 6" />
        </svg>

        <div style={{
          ...baseAnim(160, { x: '60px', y: '-20px', s: '0.7', r: '14deg' }, { r: '18deg' }),
          top: '-30px', right: '-20px',
          width: 280, height: 110,
          background: 'var(--cream)', opacity: 0.65,
          transform: 'rotate(18deg)',
        }} />

        <svg viewBox="0 0 100 100" width="120" height="120" style={{
          ...baseAnim(460, { x: '0', y: '40px', s: '0.5', r: '40deg' }, { r: '-12deg' }),
          bottom: '18%', left: '40%',
        }}>
          <polygon points="50,8 92,86 8,86" fill="var(--sage)" opacity="0.8" />
        </svg>
      </div>
    )
  }

  if (variant === 'personal') {
    return (
      <div key={'shapes-' + idx} aria-hidden="true" style={wrap}>
        <svg viewBox="0 0 300 500" width="320" height="540" style={{
          ...baseAnim(80, { x: '-60px', y: '0px', s: '0.8' }, { o: 0.7 }),
          top: '-20px', left: '-80px',
        }}>
          <path d="M 30 0 C 200 120 -40 240 120 380 C 200 460 60 500 60 500"
            fill="none" stroke="var(--terracotta)" strokeWidth="1.5" opacity="0.6" />
          <path d="M 80 20 C 250 140 0 260 170 400"
            fill="none" stroke="var(--terracotta)" strokeWidth="1" opacity="0.45" />
        </svg>

        <svg viewBox="0 0 400 400" width="440" height="440" style={{
          ...baseAnim(220, { x: '60px', y: '20px', s: '0.7', r: '14deg' }, { o: 0.65, r: '8deg' }),
          top: '6%', right: '-160px',
          animationName: 'lp-shape-in, lp-float-a',
          animationDuration: '1100ms, 10s',
          animationDelay: '220ms, 1.3s',
          animationIterationCount: '1, infinite',
          animationTimingFunction: 'cubic-bezier(.22,.8,.2,1), ease-in-out',
        }}>
          <path d="M210,40 C310,60 360,150 350,240 C340,330 240,360 160,350 C80,340 30,260 50,170 C70,80 110,20 210,40 Z"
            fill="var(--cream)" opacity="0.7" />
        </svg>

        <svg viewBox="0 0 80 80" width="100" height="100" style={{
          ...baseAnim(340, { x: '0', y: '-30px', s: '0.4' }),
          top: '18%', left: '44%',
          animation: 'lp-shape-in 1100ms cubic-bezier(.22,.8,.2,1) 340ms both, lp-spin-slow 32s linear infinite 1.5s',
        }}>
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--olive)" strokeWidth="1" opacity="0.6" />
          <circle cx="40" cy="6" r="3" fill="var(--terracotta)" opacity="0.9" />
        </svg>

        <div style={{
          ...baseAnim(440, { x: '-40px', y: '40px', s: '0.6', r: '8deg' }, { r: '4deg' }),
          bottom: '12%', left: '4%',
          width: 140, height: 90,
          background: 'var(--blue-gray)', opacity: 0.55,
          transform: 'rotate(4deg)',
        }} />

        <div style={{
          ...baseAnim(520, { x: '40px', y: '0px', s: '0.5' }),
          bottom: '28%', right: '12%',
          display: 'flex', gap: 8,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--sage)', opacity: 0.9 }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--olive)', opacity: 0.7 }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--terracotta)', opacity: 0.9 }} />
        </div>
      </div>
    )
  }

  return null
}
