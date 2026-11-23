import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { solutionIcons } from '@/lib/icons'
import { Stagger, Item } from './motion'
import Tilt from './Tilt'
import Illo3D from './Illo3D'

export default function SolutionCards() {
  return (
    <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {solutions.map((s, i) => (
        <Item key={s.slug}>
          <Tilt>
            <Link href={`/solutions/${s.slug}`} className="depth-card on-dark group relative isolate flex min-h-[440px] flex-col overflow-hidden rounded-[28px] p-7 md:p-8">
              <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
              <div className="flex items-start justify-between">
                <span className="font-display text-2xl font-extrabold tracking-[-.03em] text-sunrise">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:rotate-45 group-hover:border-sunrise group-hover:bg-sunrise group-hover:text-midnight"><ArrowUpRight size={22} /></span>
              </div>
              <Illo3D icon={solutionIcons[s.slug] ?? Sparkles} className="mx-auto -mt-2 w-[66%] transition-transform duration-500 group-hover:scale-110" />
              <div className="mt-auto">
                <h3 className="display-sm text-white">{s.title}</h3>
                <p className="mt-2 max-w-[340px] text-[15px]">{s.short}</p>
              </div>
            </Link>
          </Tilt>
        </Item>
      ))}
    </Stagger>
  )
}
