import { allCarriers } from '@/lib/carriers'
import { solutions } from '@/lib/solutions'

const Star = ({ className = '' }: { className?: string }) => <span aria-hidden="true" className={`mx-7 ${className}`}>✦</span>

export default function CrossBands() {
  const carriers = allCarriers.slice(0, 16)
  return (
    <section aria-label="Carriers we compare and solutions we offer" className="overflow-hidden bg-midnight pb-16 pt-6 md:pb-24">
      <div className="-mx-[5%] -rotate-[2.5deg] border-y border-white/15 bg-navy py-5 text-white shadow-lift">
        <ul className="band-track flex w-max items-center font-display text-[1.6rem] font-extrabold tracking-[-.02em]">
          {[...carriers, ...carriers].map((c, i) => <li key={`${c.slug}-${i}`} aria-hidden={i >= carriers.length} className="flex items-center whitespace-nowrap">{c.name}<Star className="text-sunrise" /></li>)}
        </ul>
      </div>
      <div aria-hidden="true" className="-mx-[5%] -mt-6 rotate-2 bg-white py-5 text-navy shadow-lift">
        <ul className="band-track-rev flex w-max items-center font-display text-[1.6rem] font-extrabold tracking-[-.02em]">
          {[...solutions, ...solutions, ...solutions, ...solutions].map((s, i) => <li key={`${s.slug}-${i}`} className="flex items-center whitespace-nowrap">{s.title}<Star className="text-gold" /></li>)}
        </ul>
      </div>
    </section>
  )
}
