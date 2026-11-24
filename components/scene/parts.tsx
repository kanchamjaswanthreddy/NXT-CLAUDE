import type { CSSProperties } from 'react'

/**
 * Hand-drawn flat vector parts for the NXT landscape. Everything here is decorative
 * (aria-hidden) and coloured from the brand palette, with the ink outline used site-wide.
 * Colours that change with the time of day are read from CSS variables set by the scene.
 */
const INK = '#080e28'
const base = { fill: 'none', stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' } as const
const r2 = (n: number) => Math.round(n * 100) / 100

export function Sun({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden="true">
      <g className="sun-rays" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180
          return <line key={i} x1={r2(60 + Math.cos(a) * 47)} y1={r2(60 + Math.sin(a) * 47)} x2={r2(60 + Math.cos(a) * 56)} y2={r2(60 + Math.sin(a) * 56)} />
        })}
      </g>
      <circle cx="60" cy="60" r="37" fill="var(--sun, #e8b820)" stroke={INK} strokeWidth="3.5" />
      <path d="M38 53 a24 24 0 0 1 21 -17" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" opacity=".6" />
    </svg>
  )
}

export function Moon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" {...base}>
      <path d="M38 5 A26 26 0 1 0 55 42 A21 21 0 0 1 38 5 Z" fill="#fff" />
    </svg>
  )
}

export function Cloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 58" className={className} aria-hidden="true" {...base}>
      <path d="M26 52 a18 18 0 0 1 2 -36 a24 24 0 0 1 46 -4 a20 20 0 0 1 34 14 a13 13 0 0 1 -2 26 Z" fill="#fff" />
    </svg>
  )
}

/** House. Windows light up as --glow goes from 0 to 1. */
export function House({ className = '', smoke = true }: { className?: string; smoke?: boolean }) {
  return (
    <svg viewBox="0 0 160 140" className={className} aria-hidden="true" {...base}>
      {smoke && (
        <g strokeWidth="2.5" fill="#fff">
          <circle className="puff" cx="112" cy="16" r="6" />
          <circle className="puff puff-2" cx="112" cy="16" r="6" />
          <circle className="puff puff-3" cx="112" cy="16" r="6" />
        </g>
      )}
      <rect x="104" y="22" width="16" height="36" fill="#e8b820" />
      <path d="M10 68 L80 14 L150 68 Z" fill="#1b3272" />
      <rect x="24" y="66" width="112" height="68" rx="3" fill="#fff" />
      <rect x="69" y="92" width="24" height="42" rx="3" fill="#e8b820" />
      <circle cx="87" cy="114" r="1.8" fill={INK} stroke="none" />
      {[36, 102].map((x) => (
        <g key={x}>
          <rect x={x} y="80" width="24" height="24" rx="3" fill="#dbe5ff" />
          <rect x={x} y="80" width="24" height="24" rx="3" fill="#ffcf3f" stroke="none" style={{ opacity: 'var(--glow, 0)' }} />
          <rect x={x} y="80" width="24" height="24" rx="3" />
          <path d={`M${x + 12} 80 V104 M${x} 92 H${x + 24}`} strokeWidth="2" />
        </g>
      ))}
    </svg>
  )
}

export function Tree({ className = '', variant = 'round' }: { className?: string; variant?: 'round' | 'pine' }) {
  return (
    <svg viewBox="0 0 60 110" className={className} aria-hidden="true" {...base}>
      <rect x="27" y="58" width="6" height="50" fill={INK} stroke="none" />
      {variant === 'round' ? (
        <>
          <circle cx="30" cy="36" r="27" fill="var(--tree, #1b3272)" />
          <path d="M14 32 a17 17 0 0 1 13 -14" stroke="#fff" strokeWidth="2.5" opacity=".45" />
        </>
      ) : (
        <path d="M30 6 L53 76 H7 Z" fill="var(--tree, #1b3272)" />
      )}
    </svg>
  )
}

export function Car({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 52" className={className} aria-hidden="true" {...base}>
      <path d="M24 24 L33 8 H62 L75 24 Z" fill="#fff" />
      <path d="M48 8 V24" strokeWidth="2.5" />
      <rect x="4" y="22" width="92" height="19" rx="9.5" fill="#e8b820" />
      <rect x="85" y="27" width="7" height="6" rx="2.5" fill="#fff" strokeWidth="2" />
      <circle cx="26" cy="42" r="8" fill={INK} stroke="none" />
      <circle cx="26" cy="42" r="3" fill="#fbf7ef" stroke="none" />
      <circle cx="74" cy="42" r="8" fill={INK} stroke="none" />
      <circle cx="74" cy="42" r="3" fill="#fbf7ef" stroke="none" />
    </svg>
  )
}

/** Mailbox. The flag group is rotated by the scene (down by default, up when mail arrives). */
export function Mailbox({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 78" className={className} aria-hidden="true" {...base}>
      <rect x="22" y="34" width="6" height="44" fill={INK} stroke="none" />
      <g className="flag">
        <path d="M43 24 V5" />
        <rect x="43" y="4" width="9" height="8" fill="#e8b820" strokeWidth="2.5" />
      </g>
      <rect x="5" y="12" width="40" height="25" rx="12.5" fill="#1b3272" />
      <path d="M17 13 a12 12 0 0 0 0 23" stroke="#fff" strokeWidth="2.5" opacity=".5" />
    </svg>
  )
}

export function Envelope({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 30" className={className} aria-hidden="true" {...base} strokeWidth={2.5}>
      <rect x="2" y="2" width="40" height="26" rx="4" fill="#fff" />
      <path d="M3 5 L22 18 L41 5" />
      <circle cx="22" cy="20" r="4" fill="#e8b820" strokeWidth="2" />
    </svg>
  )
}

export function Balloon65({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 124" className={className} aria-hidden="true" {...base}>
      <path d="M32 72 q-7 12 0 25 t0 25" strokeWidth="2" />
      <ellipse cx="32" cy="36" rx="27" ry="32" fill="#e8b820" />
      <path d="M27 72 L32 67 L37 72 Z" fill="#e8b820" strokeWidth="2.5" />
      <text x="32" y="45" textAnchor="middle" fontSize="25" fontWeight="800" fill={INK} stroke="none" style={{ fontFamily: 'var(--font-display)' }}>65</text>
    </svg>
  )
}

export function Heart({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 44" className={className} aria-hidden="true" {...base}>
      <path d="M24 40 C8 28 3 20 3 13 A10.5 10.5 0 0 1 24 10 A10.5 10.5 0 0 1 45 13 C45 20 40 28 24 40 Z" fill="#e8b820" />
    </svg>
  )
}

export function Shield({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true" {...base}>
      <path d="M24 3 L44 10 V26 C44 39 36 48 24 53 C12 48 4 39 4 26 V10 Z" fill="#e8b820" />
      <path d="M15 27 l7 7 l12 -14" />
    </svg>
  )
}
