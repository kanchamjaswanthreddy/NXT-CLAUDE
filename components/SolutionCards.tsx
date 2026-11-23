import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { Stagger, Item } from './motion'
import Tilt from './Tilt'

export default function SolutionCards() {
  return (
    <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {solutions.map((s, i) => (
        <Item key={s.slug}>
          <Tilt>
            <Link href={`/solutions/${s.slug}`} className="depth-card on-dark group relative isolate flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[28px] p-7 md:p-8">
              <Image src={s.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/10 transition-opacity duration-500 group-hover:opacity-80" />
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-midnight/70 px-3 py-1 font-display text-lg font-extrabold tracking-[-.03em] text-sunrise backdrop-blur">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy transition-all duration-300 group-hover:rotate-45 group-hover:bg-sunrise group-hover:text-midnight"><ArrowUpRight size={22} /></span>
              </div>
              <div>
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
