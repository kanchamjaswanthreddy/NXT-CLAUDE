import { allCarriers } from '@/lib/carriers'

/**
 * One dot per carrier in the site's own carrier list (lib/carriers.ts).
 * `one` lights a single dot (a captive agent's shelf); `all` lights every dot in a slow wave.
 * Hovering a lit dot shows the carrier's name.
 */
export default function CarrierDots({ mode }: { mode: 'one' | 'all' }) {
  return (
    <div>
      <ul className={`dot-grid ${mode === 'all' ? 'dot-grid-all' : 'dot-grid-one'}`} aria-hidden="true">
        {allCarriers.map((c, i) => (
          <li key={c.slug} title={mode === 'all' ? c.name : undefined} className={mode === 'all' || i === 0 ? 'is-lit' : ''} style={mode === 'all' ? { animationDelay: `${(i % 23) * 70 + Math.floor(i / 23) * 160}ms` } : undefined} />
        ))}
      </ul>
      <p className={`mono mt-4 text-[11px] uppercase tracking-[.1em] ${mode === 'all' ? '!text-midnight' : ''}`}>{mode === 'all' ? 'Every dot is a carrier on our list' : 'One carrier'}</p>
    </div>
  )
}
