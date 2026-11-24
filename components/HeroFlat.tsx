import Link from 'next/link'
import { ArrowRight, Check, TrendingUp, ShieldCheck, HeartHandshake, Stethoscope, Umbrella, PhoneCall } from 'lucide-react'
import { Reveal } from './motion'

const ROWS = [
  [TrendingUp, 'Annuities', 'Income'],
  [ShieldCheck, 'Life Insurance', 'Legacy'],
  [HeartHandshake, 'Care Planning', 'Care'],
  [Stethoscope, 'Medicare Planning', 'Health'],
  [Umbrella, 'Disability Income', 'Paycheck'],
] as const

/** Animated plan board: the five decisions tick off one by one. Drawn in code, no photos. */
function PlanBoard() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[500px] pb-10 pt-24">
      <div className="bob-slow absolute -right-2 top-8 h-40 w-40 rounded-full border-2 border-midnight bg-sunrise md:-right-8 md:h-48 md:w-48" />
      <div className="flat relative p-5 md:p-6">
        <div className="flex items-center justify-between">
          <span className="chip">Your plan</span>
          <span className="mono text-xs text-ink-soft">05 decisions</span>
        </div>
        <ul className="mt-5 flex flex-col gap-2.5">
          {ROWS.map(([Icon, title, tag], i) => (
            <li key={title} className="flex items-center gap-3 rounded-2xl border-2 border-midnight bg-cream px-3 py-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-midnight bg-sky text-midnight"><Icon size={20} /></span>
              <span className="flex-1"><span className="block font-display text-[17px] font-bold leading-tight text-midnight">{title}</span><span className="mono block text-[11px] uppercase tracking-[.08em] text-ink-soft">{tag}</span></span>
              <span className="tick flex h-7 w-7 items-center justify-center rounded-full bg-midnight text-sunrise" style={{ animationDelay: `${0.4 + i * 0.8}s` }}><Check size={15} strokeWidth={3.5} /></span>
            </li>
          ))}
        </ul>
        <div className="mt-5 h-3 overflow-hidden rounded-full border-2 border-midnight bg-white"><div className="fillbar h-full bg-navy" /></div>
      </div>
      <div className="flat flat-gold bob absolute left-0 top-0 z-10 w-[190px] -rotate-3 p-3.5 md:-left-8">
        <p className="mono text-[10px] uppercase tracking-[.1em] text-ink-soft">Guaranteed income</p>
        <p className="font-display text-[1.7rem] font-extrabold leading-tight text-midnight">$4,850<span className="text-sm font-semibold text-ink-soft">/mo</span></p>
        <p className="text-[11px] text-ink-soft">Illustrative lifetime payout</p>
      </div>
      <div className="flat bob absolute -right-2 bottom-0 flex rotate-2 items-center gap-2.5 px-4 py-3 md:-right-10" style={{ animationDelay: '1.2s', background: 'var(--color-midnight)' }}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sunrise text-midnight"><PhoneCall size={15} /></span>
        <span className="text-sm font-bold text-white">45-minute first meeting</span>
      </div>
    </div>
  )
}

export default function HeroFlat() {
  return (
    <section className="relative overflow-hidden bg-sky pt-[84px]">
      <div className="container grid grid-cols-1 items-center gap-14 pb-16 pt-12 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-24">
        <div>
          <Reveal><p className="chip mb-7">Independent retirement &amp; protection planning</p></Reveal>
          <Reveal delay={0.06}><h1 className="display-xl">Income you can&rsquo;t outlive. Care you can choose. <span className="hl">A legacy that lands.</span></h1></Reveal>
          <Reveal delay={0.12}><p className="lead mt-8 max-w-[560px] text-midnight/85">An independent agency for the five decisions that shape retirement: annuities, life insurance, care planning, Medicare and disability income. We compare A-rated carriers and explain every term before you sign one.</p></Reveal>
          <Reveal delay={0.18}><div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-primary">Book a free consultation <ArrowRight size={16} /></Link>
            <Link href="/solutions" className="btn btn-outline">Explore solutions</Link>
          </div></Reveal>
          <Reveal delay={0.24}><ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-midnight">
            {['A-rated carriers only', 'Licensed in 50 states', 'No cost to you'].map((t) => <li key={t} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-midnight text-sunrise"><Check size={11} strokeWidth={3.5} /></span>{t}</li>)}
          </ul></Reveal>
        </div>
        <Reveal delay={0.15}><PlanBoard /></Reveal>
      </div>
    </section>
  )
}
