import Link from 'next/link'
import { ArrowUpRight, TrendingUp, ShieldCheck, HeartHandshake, Stethoscope, Umbrella, House, Sparkles, type LucideIcon } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { Stagger, Item } from './motion'

const ICONS: Record<string, LucideIcon> = { annuities: TrendingUp, 'life-insurance': ShieldCheck, 'care-planning': HeartHandshake, 'medicare-planning': Stethoscope, 'disability-income': Umbrella, 'home-auto': House }
const TONES = ['bg-white', 'bg-sky', 'bg-cream']

export default function SolutionCards() {
  return (
    <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {solutions.map((s, i) => {
        const Icon = ICONS[s.slug] ?? Sparkles
        return (
          <Item key={s.slug}>
            <Link href={`/solutions/${s.slug}`} className={`flat flat-hover group flex min-h-[300px] flex-col justify-between p-7 ${TONES[i % TONES.length]}`}>
              <div className="flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-midnight bg-sunrise text-midnight shadow-[4px_4px_0_var(--color-midnight)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"><Icon size={30} strokeWidth={1.8} /></span>
                <span className="mono text-xs text-ink-soft">{String(i + 1).padStart(2, '0')} / {String(solutions.length).padStart(2, '0')}</span>
              </div>
              <div>
                <h3 className="display-sm">{s.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{s.short}</p>
                <span className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-midnight bg-white text-midnight transition-all duration-300 group-hover:rotate-45 group-hover:bg-midnight group-hover:text-sunrise"><ArrowUpRight size={20} /></span>
              </div>
            </Link>
          </Item>
        )
      })}
    </Stagger>
  )
}
