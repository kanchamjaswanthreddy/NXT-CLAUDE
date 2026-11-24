import { Check, TrendingUp, ShieldCheck, HeartHandshake, Stethoscope, Umbrella } from 'lucide-react'
import MeetingClock from './MeetingClock'

const ROWS = [
  [TrendingUp, 'Annuities', 'Income'],
  [ShieldCheck, 'Life Insurance', 'Legacy'],
  [HeartHandshake, 'Care Planning', 'Care'],
  [Stethoscope, 'Medicare Planning', 'Health'],
  [Umbrella, 'Disability Income', 'Paycheck'],
] as const

/**
 * "Your plan" board: the five decisions tick off one by one (decorative), with the first-meeting
 * card pinned to its corner. The card's wording is the site's own.
 */
export default function PlanBoard() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] pb-24 pt-6">
      <div aria-hidden="true" className="bob-slow absolute -left-6 -top-2 h-28 w-28 rounded-full border-2 border-midnight bg-sky md:-left-10" />
      <div aria-hidden="true" className="flat relative -rotate-1 p-5 md:p-6">
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
      <div className="flat flat-gold absolute bottom-0 right-0 flex max-w-[340px] rotate-2 items-center gap-4 p-4 md:-right-8">
        <MeetingClock className="h-[88px] w-[88px] shrink-0" />
        <div>
          <p className="chip">Your first meeting</p>
          <p className="mt-2 font-display text-[1.15rem] font-extrabold leading-[1.15] text-midnight">45 minutes. No products. Just where you stand.</p>
        </div>
      </div>
    </div>
  )
}
