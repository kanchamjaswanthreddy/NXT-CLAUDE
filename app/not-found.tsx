import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Landscape from '@/components/scene/Landscape'
import { Moon } from '@/components/scene/parts'

const STARS = [[6, 16, 4, 0], [14, 38, 5, 0.9], [23, 12, 3, 1.5], [31, 30, 5, 0.3], [42, 9, 4, 1.9], [58, 14, 6, 1.1], [66, 34, 3, 0.6], [74, 10, 5, 1.7], [83, 28, 4, 0.2], [92, 16, 5, 1.3]] as const

/** Not found. The landscape at night: the page is missing, the lights are still on. */
export default function NotFound() {
  return (
    <section className="night-page on-dark">
      <div className="stars" aria-hidden="true">
        {STARS.map(([l, t, size, d], i) => <i key={i} className="star" style={{ left: `${l}%`, top: `${t}%`, width: size, height: size, animationDelay: `${d}s` }} />)}
      </div>
      <Moon className="night-moon" />
      <div className="container relative z-10 max-w-[640px] pt-40 text-center">
        <p className="label-sm mb-6">404</p>
        <h1 className="display-xl">That page isn&rsquo;t here.</h1>
        <p className="lead mx-auto mt-6 max-w-[460px]">It may have moved. Browse every coverage line we place, or ask an advisor directly.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/solutions" className="btn btn-cta">All solutions <ArrowRight size={16} /></Link>
          <Link href="/contact" className="btn btn-ghost">Ask an advisor</Link>
        </div>
      </div>
      <Landscape />
    </section>
  )
}
