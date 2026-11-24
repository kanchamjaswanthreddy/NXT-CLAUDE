'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Phone } from 'lucide-react'

const HIDE = ['/contact', '/get-started', '/privacy-policy', '/terms']
const LINES = ['Income you can’t outlive', 'Care you can choose', 'A legacy that lands']

/** Closing call to action shown above the footer on every page except forms and legal pages. */
export default function PreFooterCta() {
  const pathname = usePathname()
  if (HIDE.some((p) => pathname.startsWith(p))) return null
  return (
    <section aria-labelledby="prefooter-cta" className="overflow-hidden bg-cream">
      <div aria-hidden="true" className="border-y-2 border-midnight bg-white py-4">
        <ul className="band-track flex w-max items-center font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-[-.04em]">{[...LINES, ...LINES, ...LINES, ...LINES].map((t, i) => <li key={i} className="flex items-center whitespace-nowrap"><span className={i % 2 ? 'text-midnight' : 'outline-navy'}>{t}</span><span className="mx-8 text-sunrise">✦</span></li>)}</ul>
      </div>
      <div className="container py-16 md:py-24">
        <div className="on-dark flex flex-col gap-10 rounded-[28px] border-2 border-midnight bg-midnight p-8 shadow-[10px_10px_0_var(--color-sunrise)] md:p-14 lg:flex-row lg:items-end lg:justify-between lg:p-20">
          <div className="max-w-[720px]">
            <p className="label-sm mb-6">Your first meeting</p>
            <h2 id="prefooter-cta" className="display-xl text-white">45 minutes. No products. Just where you <span className="text-sunrise">stand.</span></h2>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <Link href="/contact" className="btn btn-cta">Book a free consultation <ArrowRight size={16} /></Link>
            <a href="tel:8572053333" className="btn btn-ghost"><Phone size={16} /> 857-205-3333</a>
            <Link href="/solutions" className="link justify-center !text-sunrise">Explore solutions <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
