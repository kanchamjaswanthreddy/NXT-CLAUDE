import type { ReactElement } from 'react'

/**
 * One hand-drawn, animated scene per solution. Decorative only (aria-hidden): each restates in
 * a picture what the card's own text already says. Drawn on a 400 x 280 canvas in the site's
 * flat style: ink outline, palette fills, CSS keyframe motion defined in globals.css.
 */
const INK = '#080e28'
const GOLD = '#e8b820'
const NAVY = '#1b3272'
const S = { fill: 'none', stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' } as const
const mono = { fontFamily: 'var(--font-mono)', letterSpacing: '1.4px' } as const
const display = { fontFamily: 'var(--font-display)' } as const
const sans = { fontFamily: 'var(--font-sans)' } as const
const delay = (s: number) => ({ animationDelay: `${s}s` })

function Frame({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 400 280" className="h-full w-full" aria-hidden="true" {...S}>{children}</svg>
}

/** Annuities: a year of paydays. A coin lands on every month. */
function Annuities() {
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
  return (
    <Frame>
      <rect x="92" y="30" width="216" height="222" rx="16" fill="#fff" />
      <path d="M92 76 V46 a16 16 0 0 1 16 -16 h184 a16 16 0 0 1 16 16 V76 Z" fill={NAVY} />
      <rect x="138" y="18" width="11" height="26" rx="5.5" fill="#fff" />
      <rect x="251" y="18" width="11" height="26" rx="5.5" fill="#fff" />
      <text x="200" y="62" textAnchor="middle" fontSize="12" fill="#fff" stroke="none" style={mono}>LIFETIME INCOME</text>
      {months.map((m, i) => {
        const x = 105 + (i % 4) * 50
        const y = 92 + Math.floor(i / 4) * 50
        return (
          <g key={i}>
            <rect x={x} y={y} width="40" height="40" rx="8" fill="#fbf7ef" strokeWidth="2" />
            <text x={x + 5} y={y + 11} fontSize="8" fill="#55556b" stroke="none" style={mono}>{m}</text>
            <g className="svg-pop tick" style={delay(0.3 + i * 0.3)}>
              <circle cx={x + 21} cy={y + 24} r="11" fill={GOLD} strokeWidth="2" />
              <text x={x + 21} y={y + 28.5} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK} stroke="none" style={sans}>$</text>
            </g>
          </g>
        )
      })}
      <g className="bob" style={delay(0.6)}>
        <g transform="translate(300 196) rotate(9)">
          <rect x="0" y="0" width="66" height="46" rx="6" fill="#fff" />
          <path d="M2 4 L33 27 L64 4" />
          <circle cx="33" cy="31" r="7.5" fill={GOLD} strokeWidth="2.5" />
        </g>
      </g>
      <g className="bob-slow">
        {[0, 1, 2].map((i) => <rect key={i} x="36" y={226 - i * 13} width="46" height="15" rx="7.5" fill={GOLD} strokeWidth="2.5" />)}
      </g>
    </Frame>
  )
}

/** Life insurance: the lights stay on. Windows come on one by one under a night sky. */
function Life() {
  const stars = [[52, 40], [96, 84], [330, 96], [356, 170], [44, 150], [300, 34], [74, 206], [338, 232]]
  return (
    <Frame>
      {stars.map(([x, y], i) => <circle key={i} className="svg-pop star-dot" cx={x} cy={y} r="2.6" fill="#fff" stroke="none" style={delay(i * 0.35)} />)}
      <path d="M200 24 L306 58 V140 C306 204 264 246 200 268 C136 246 94 204 94 140 V58 Z" stroke="#fff" strokeWidth="2.5" strokeDasharray="2 11" opacity=".45" />
      <path d="M316 20 A22 22 0 1 0 331 52 A18 18 0 0 1 316 20 Z" fill="#fff" />
      <rect x="238" y="82" width="17" height="34" fill="#fff" />
      <path d="M110 138 L200 66 L290 138 Z" fill="#c4cff6" />
      <rect x="130" y="134" width="140" height="96" rx="3" fill="#fff" />
      <rect x="186" y="178" width="28" height="52" rx="3" fill={NAVY} />
      <circle cx="207" cy="206" r="2" fill="#fff" stroke="none" />
      {[[146, 152], [226, 152]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="28" height="28" rx="3" fill="#33427f" />
          <rect className="lit" x={x} y={y} width="28" height="28" rx="3" fill="#ffcf3f" stroke="none" style={delay(i * 0.6)} />
          <rect x={x} y={y} width="28" height="28" rx="3" />
          <path d={`M${x + 14} ${y} v28 M${x} ${y + 14} h28`} strokeWidth="2" />
        </g>
      ))}
      <circle cx="200" cy="108" r="11" fill="#33427f" />
      <circle className="lit" cx="200" cy="108" r="11" fill="#ffcf3f" stroke="none" style={delay(1.2)} />
      <circle cx="200" cy="108" r="11" />
      <path d="M62 230 H338" stroke="#fff" opacity=".6" />
      {[0, 1.8].map((d, i) => (
        <path key={i} className="puff" style={delay(d)} d="M246 76 c-7 -5 -9 -9 -9 -12 a4.6 4.6 0 0 1 9 -1.6 a4.6 4.6 0 0 1 9 1.6 c0 3 -2 7 -9 12 Z" fill={GOLD} strokeWidth="2" />
      ))}
    </Frame>
  )
}

/** Care planning: care you can choose. The selection moves between settings. */
function Care() {
  const rows = ['At home', 'Assisted living', 'Nursing care']
  return (
    <Frame>
      <rect x="70" y="24" width="260" height="222" rx="16" fill="#fff" />
      <text x="90" y="54" fontSize="10.5" fill="#55556b" stroke="none" style={mono}>WHERE YOU RECEIVE CARE</text>
      {rows.map((_, i) => <rect key={i} x="88" y={68 + i * 54} width="224" height="44" rx="11" fill="#fbf7ef" strokeWidth="2" />)}
      <g className="choose">
        <rect x="88" y="68" width="224" height="44" rx="11" fill={GOLD} strokeWidth="2.5" />
        <circle cx="111" cy="90" r="4.5" fill={INK} stroke="none" />
      </g>
      {rows.map((r, i) => (
        <g key={r}>
          <circle cx="111" cy={90 + i * 54} r="9" strokeWidth="2" />
          <text x="130" y={95 + i * 54} fontSize="15" fontWeight="700" fill={INK} stroke="none" style={sans}>{r}</text>
        </g>
      ))}
      <g className="bob">
        <rect x="196" y="226" width="170" height="38" rx="19" fill={NAVY} />
        <path d="M218 235 l9 3 v7 c0 6 -4 10 -9 12 c-5 -2 -9 -6 -9 -12 v-7 Z" fill={GOLD} strokeWidth="2" />
        <text x="236" y="250" fontSize="13" fontWeight="700" fill="#fff" stroke="none" style={sans}>Savings protected</text>
      </g>
    </Frame>
  )
}

/** Medicare: the seven-month window around turning 65, and plans compared on what matters. */
function Medicare() {
  const cells = ['-3', '-2', '-1', '65', '+1', '+2', '+3']
  const rows = ['Your doctors', 'Your prescriptions', 'Your budget']
  return (
    <Frame>
      <text x="200" y="30" textAnchor="middle" fontSize="10.5" fill={INK} stroke="none" style={mono}>INITIAL ENROLLMENT WINDOW</text>
      {cells.map((c, i) => (
        <g key={c}>
          <rect x={36 + i * 48} y="42" width="40" height="46" rx="10" fill={i === 3 ? GOLD : '#fff'} strokeWidth="2.5" />
          <text x={56 + i * 48} y="71" textAnchor="middle" fontSize={i === 3 ? 18 : 15} fontWeight="800" fill={INK} stroke="none" style={display}>{c}</text>
        </g>
      ))}
      <rect className="sweep7" x="32" y="38" width="48" height="54" rx="13" stroke={NAVY} strokeWidth="4" />
      <text x="104" y="106" textAnchor="middle" fontSize="9" fill={INK} stroke="none" style={mono}>MONTHS BEFORE</text>
      <text x="296" y="106" textAnchor="middle" fontSize="9" fill={INK} stroke="none" style={mono}>MONTHS AFTER</text>
      <rect x="56" y="124" width="288" height="136" rx="16" fill="#fff" />
      <rect x="208" y="136" width="56" height="24" rx="8" fill="#dbe5ff" strokeWidth="2" />
      <rect x="274" y="136" width="56" height="24" rx="8" fill={GOLD} strokeWidth="2" />
      <text x="236" y="152.5" textAnchor="middle" fontSize="10" fill={INK} stroke="none" style={mono}>PLAN A</text>
      <text x="302" y="152.5" textAnchor="middle" fontSize="10" fill={INK} stroke="none" style={mono}>PLAN B</text>
      {rows.map((r, i) => (
        <g key={r}>
          <text x="74" y={188 + i * 28} fontSize="14" fontWeight="600" fill={INK} stroke="none" style={sans}>{r}</text>
          {[236, 302].map((cx, j) => (
            <g key={cx} className="svg-pop tick" style={delay(0.4 + i * 0.7 + j * 0.35)}>
              <circle cx={cx} cy={183 + i * 28} r="10" fill={INK} stroke="none" />
              <path d={`M${cx - 4.5} ${183 + i * 28} l3.2 3.4 l6 -6.6`} stroke={GOLD} strokeWidth="2.6" />
            </g>
          ))}
        </g>
      ))}
    </Frame>
  )
}

/** Disability income: the paycheck stays dry. Rain falls, the umbrella holds, the stamp lands. */
function Disability() {
  const rain = [[52, 24], [92, 6], [140, 18], [262, 10], [308, 26], [350, 8], [30, 70], [372, 64], [70, 118], [338, 110]]
  return (
    <Frame>
      {rain.map(([x, y], i) => <path key={i} className="rain" style={delay(i * 0.23)} d={`M${x} ${y} l-5 14`} stroke={NAVY} strokeWidth="3.5" />)}
      <rect x="84" y="104" width="232" height="152" rx="14" fill="#fff" />
      <text x="104" y="131" fontSize="10.5" fill="#55556b" stroke="none" style={mono}>PAYCHECK</text>
      <rect x="104" y="142" width="124" height="16" rx="8" fill={NAVY} stroke="none" />
      {[[168, 192], [186, 150], [204, 172]].map(([y, w]) => <rect key={y} x="104" y={y} width={w} height="8" rx="4" fill="#dfe4f4" stroke="none" />)}
      <path d="M200 96 V112" />
      <path d="M96 92 A104 66 0 0 1 304 92 Z" fill={GOLD} />
      <path d="M200 26 L148 92 M200 26 V92 M200 26 L252 92" strokeWidth="2.5" />
      <path d="M200 26 V16" />
      <g className="svg-pop stamp">
        <g transform="rotate(-11 262 216)">
          <rect x="208" y="200" width="108" height="32" rx="7" fill="#fff" stroke={NAVY} strokeWidth="3.5" />
          <text x="262" y="221" textAnchor="middle" fontSize="12" fontWeight="500" fill={NAVY} stroke="none" style={mono}>PROTECTED</text>
        </g>
      </g>
    </Frame>
  )
}

/** Home and auto: one house, one car, one policy between them. */
function HomeAuto() {
  return (
    <Frame>
      <path d="M150 74 C 196 16, 300 26, 318 150" strokeWidth="2.5" strokeDasharray="2 10" />
      <g className="bob">
        <rect x="186" y="16" width="112" height="32" rx="16" fill={NAVY} />
        <text x="242" y="37" textAnchor="middle" fontSize="11" fill="#fff" stroke="none" style={mono}>BUNDLED</text>
      </g>
      <path d="M30 232 H370" />
      <g transform="translate(44 84) scale(1.06)">
        <rect x="104" y="22" width="16" height="36" fill={GOLD} />
        <path d="M10 68 L80 14 L150 68 Z" fill={NAVY} />
        <rect x="24" y="66" width="112" height="68" rx="3" fill="#fff" />
        <rect x="69" y="92" width="24" height="42" rx="3" fill={GOLD} />
        {[36, 102].map((x) => <g key={x}><rect x={x} y="80" width="24" height="24" rx="3" fill="#dbe5ff" /><path d={`M${x + 12} 80 V104 M${x} 92 H${x + 24}`} strokeWidth="2" /></g>)}
      </g>
      <g className="idle">
        <g transform="translate(228 156) scale(1.4)">
          <path d="M24 24 L33 8 H62 L75 24 Z" fill="#fff" />
          <path d="M48 8 V24" strokeWidth="2.5" />
          <rect x="4" y="22" width="92" height="19" rx="9.5" fill={GOLD} />
          <circle cx="26" cy="42" r="8" fill={INK} stroke="none" />
          <circle cx="26" cy="42" r="3" fill="#fbf7ef" stroke="none" />
          <circle cx="74" cy="42" r="8" fill={INK} stroke="none" />
          <circle cx="74" cy="42" r="3" fill="#fbf7ef" stroke="none" />
        </g>
      </g>
    </Frame>
  )
}

export const SOLUTION_ILLOS: Record<string, () => ReactElement> = {
  annuities: Annuities,
  'life-insurance': Life,
  'care-planning': Care,
  'medicare-planning': Medicare,
  'disability-income': Disability,
  'home-auto': HomeAuto,
}

/** Panel colour behind each scene. */
export const SOLUTION_TONES: Record<string, string> = {
  annuities: '#dbe5ff',
  'life-insurance': '#1b3272',
  'care-planning': '#fde8c9',
  'medicare-planning': '#c6d7ff',
  'disability-income': '#f8dfa6',
  'home-auto': '#dbe5ff',
}

export default function SolutionIllo({ slug }: { slug: string }) {
  const Illo = SOLUTION_ILLOS[slug]
  return Illo ? <Illo /> : null
}
