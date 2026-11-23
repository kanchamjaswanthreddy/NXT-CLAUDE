import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { Stagger, Item } from './motion'

export default function SolutionCards() {
  return (
    <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {solutions.map((s, i) => (
        <Item key={s.slug}>
          <Link href={`/solutions/${s.slug}`} className="tilt-card on-dark group relative isolate flex min-h-[400px] flex-col justify-between overflow-hidden rounded-[28px] bg-midnight p-7 md:p-8">
            <Image src={s.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/25" />
            <div className="flex items-start justify-between">
              <span className="font-display text-[5rem] font-extrabold leading-[.85] tracking-[-.05em] text-sunrise">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy transition-all duration-300 group-hover:rotate-45 group-hover:bg-sunrise group-hover:text-midnight"><ArrowUpRight size={22} /></span>
            </div>
            <div>
              <h3 className="display-sm text-white">{s.title}</h3>
              <p className="mt-2 max-w-[340px] text-[15px]">{s.short}</p>
            </div>
          </Link>
        </Item>
      ))}
    </Stagger>
  )
}
