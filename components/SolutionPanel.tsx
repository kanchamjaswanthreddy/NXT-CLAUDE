import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Solution } from '@/lib/solutions'
import SolutionIllo, { SOLUTION_TONES } from './illos/SolutionIllos'

/** One solution as an illustrated card: animated scene on top, what it covers underneath. */
export default function SolutionPanel({ s, index, total, className = '' }: { s: Solution; index: number; total: number; className?: string }) {
  return (
    <article className={`flat flex h-full flex-col overflow-hidden ${className}`}>
      <div className="rail-illo border-b-2 border-midnight" style={{ background: SOLUTION_TONES[s.slug] ?? '#dbe5ff' }}><SolutionIllo slug={s.slug} /></div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="mono text-xs text-ink-soft">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
        <h3 className="display mt-2 !text-[2rem]">{s.title}</h3>
        <p className="mt-2 text-[16px] text-ink-soft">{s.short}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {s.sub.slice(0, 4).map((p) => <li key={p.name} className="rounded-full border-[1.5px] border-midnight bg-cream px-3 py-1 text-[13px] font-semibold text-midnight">{p.name}</li>)}
        </ul>
        <div className="mt-auto pt-6"><Link href={`/solutions/${s.slug}`} className="btn btn-outline btn-sm">See {s.title} <ArrowRight size={15} /></Link></div>
      </div>
    </article>
  )
}
