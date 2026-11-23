import { allCarriers } from '@/lib/carriers'
import { solutions } from '@/lib/solutions'

const Star = ({ className = '' }: { className?: string }) => <span aria-hidden="true" className={`mx-7 ${className}`}>✦</span>

export default function CrossBands() {
  const carriers = allCarriers.slice(0, 16)
  return (
    <section aria-label="Carriers we compare and solutions we offer" className="overflow-hidden bg-white py-14 md:py-20">
      <div className="-mx-[5%] -rotate-[2.5deg] bg-sunrise py-5 text-midnight">
        <ul className="band-track flex w-max items-center font-display text-[1.6rem] font-extrabold tracking-[-.02em]">
          {[...carriers, ...carriers].map((c, i) => <li key={`${c.slug}-${i}`} aria-hidden={i >= carriers.length} className="flex items-center whitespace-nowrap">{c.name}<Star /></li>)}
        </ul>
      </div>
      <div aria-hidden="true" className="-mx-[5%] -mt-6 rotate-2 bg-navy py-5 text-white">
        <ul className="band-track-rev flex w-max items-center font-display text-[1.6rem] font-extrabold tracking-[-.02em]">
          {[...solutions, ...solutions, ...solutions, ...solutions].map((s, i) => <li key={`${s.slug}-${i}`} className="flex items-center whitespace-nowrap">{s.title}<Star className="text-sunrise" /></li>)}
        </ul>
      </div>
    </section>
  )
}
