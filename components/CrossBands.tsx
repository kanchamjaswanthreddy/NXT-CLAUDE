import { allCarriers } from '@/lib/carriers'
import { solutions } from '@/lib/solutions'

const Star = ({ className = '' }: { className?: string }) => <span aria-hidden="true" className={`mx-7 ${className}`}>✦</span>

export default function CrossBands() {
  const carriers = allCarriers.slice(0, 16)
  return (
    <section aria-label="Carriers we compare and solutions we offer" className="overflow-hidden bg-cream pb-6 pt-14 md:pt-20">
      <div className="-mx-[5%] -rotate-[2.5deg] border-y-2 border-midnight bg-midnight py-4 text-white">
        <ul className="band-track flex w-max items-center font-display text-[1.5rem] font-extrabold tracking-[-.02em]">
          {[...carriers, ...carriers].map((c, i) => <li key={`${c.slug}-${i}`} aria-hidden={i >= carriers.length} className="flex items-center whitespace-nowrap">{c.name}<Star className="text-sunrise" /></li>)}
        </ul>
      </div>
      <div aria-hidden="true" className="-mx-[5%] -mt-5 rotate-2 border-y-2 border-midnight bg-white py-4 text-midnight">
        <ul className="band-track-rev flex w-max items-center font-display text-[1.5rem] font-extrabold tracking-[-.02em]">
          {[...solutions, ...solutions, ...solutions, ...solutions].map((s, i) => <li key={`${s.slug}-${i}`} className="flex items-center whitespace-nowrap">{s.title}<Star className="text-navy" /></li>)}
        </ul>
      </div>
    </section>
  )
}
