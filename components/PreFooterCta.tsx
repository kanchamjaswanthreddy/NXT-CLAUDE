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
    <section aria-labelledby="prefooter-cta" className="overflow-hidden bg-white">
      <div aria-hidden="true" className="border-y border-platinum py-4">
        <ul className="band-track flex w-max items-center font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-[-.04em]">{[...LINES, ...LINES, ...LINES, ...LINES].map((t, i) => <li key={i} className="flex items-center whitespace-nowrap"><span className={i % 2 ? 'text-navy' : 'outline-navy'}>{t}</span><span className="mx-8 text-gold">✦</span></li>)}</ul>
      </div>
      <div className="container py-16 md:py-24">
        <div className="on-dark relative isolate flex flex-col gap-10 overflow-hidden rounded-[32px] bg-midnight p-8 md:p-14 lg:flex-row lg:items-end lg:justify-between lg:p-20">
          <svg viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="spin-slower pointer-events-none absolute -right-48 -top-48 -z-10 h-[560px] w-[560px] text-sunrise/45"><circle cx="300" cy="300" r="296" strokeDasharray="4 14" /><circle cx="300" cy="300" r="240" /><circle cx="300" cy="300" r="180" strokeDasharray="60 18" /><circle cx="300" cy="300" r="118" /></svg>
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
