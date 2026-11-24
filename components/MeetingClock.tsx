/** A clock that fills to 45 minutes: the length of a first meeting. Decorative. */
const r2 = (n: number) => Math.round(n * 100) / 100
const CIRC = r2(2 * Math.PI * 26)

export default function MeetingClock({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none" stroke="#080e28" strokeWidth="4" strokeLinecap="round">
      <circle cx="60" cy="60" r="52" fill="#fff" />
      <circle className="pie45" cx="60" cy="60" r="26" stroke="#e8b820" strokeWidth="52" strokeLinecap="butt" strokeDasharray={`${r2(CIRC * 0.75)} ${CIRC}`} transform="rotate(-90 60 60)" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180
        return <line key={i} x1={r2(60 + Math.sin(a) * 43)} y1={r2(60 - Math.cos(a) * 43)} x2={r2(60 + Math.sin(a) * 48)} y2={r2(60 - Math.cos(a) * 48)} strokeWidth={i % 3 === 0 ? 4 : 2.5} />
      })}
      <circle cx="60" cy="60" r="52" />
      <g className="hand45" transform="rotate(270 60 60)"><line x1="60" y1="60" x2="60" y2="22" strokeWidth="4.5" /></g>
      <circle cx="60" cy="60" r="5.5" fill="#080e28" stroke="none" />
    </svg>
  )
}
