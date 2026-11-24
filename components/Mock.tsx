import { Check, HeartHandshake, ShieldCheck, House, Sparkles, type LucideIcon } from 'lucide-react'

export type Visual = 'months' | 'growth' | 'compare' | 'badge'
export interface MockSpec { visual: Visual; icon?: LucideIcon; caption: string }

/** Which animated graphic represents each solution. */
export const SOLUTION_MOCKS: Record<string, MockSpec> = {
  'disability-income': { visual: 'months', caption: 'Monthly paycheck' },
  annuities: { visual: 'growth', caption: 'Lifetime income' },
  'medicare-planning': { visual: 'compare', caption: 'Plan comparison' },
  'care-planning': { visual: 'badge', icon: HeartHandshake, caption: 'Care plan' },
  'life-insurance': { visual: 'badge', icon: ShieldCheck, caption: 'Family protection' },
  'home-auto': { visual: 'badge', icon: House, caption: 'Home and auto' },
}
export const mockFor = (slug: string): MockSpec => SOLUTION_MOCKS[slug] ?? { visual: 'badge', icon: Sparkles, caption: 'Your plan' }

/** Small animated product-style card, drawn in code. Decorative only. */
export default function Mock({ visual, icon: Icon, caption, className = '' }: MockSpec & { className?: string }) {
  return (
    <div aria-hidden="true" className={`flat w-full max-w-[380px] p-5 ${className}`}>
      <div className="flex items-center justify-between"><span className="chip">{caption}</span><span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full border-2 border-midnight bg-sunrise" /><i className="h-2.5 w-2.5 rounded-full border-2 border-midnight bg-sky" /></span></div>
      {visual === 'months' && (
        <div className="mt-5 flex h-36 items-end gap-2.5">
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={`growbar flex-1 rounded-t-lg border-2 border-midnight ${i > 2 ? 'bg-sunrise' : 'bg-navy'}`} style={{ height: '100%', animationDelay: `${i * 0.15}s` }} />)}
        </div>
      )}
      {visual === 'growth' && (
        <div className="mt-5 flex h-36 items-end gap-2.5">
          {[38, 50, 62, 74, 86, 100].map((h, i) => <div key={i} className="growbar flex-1 rounded-t-lg border-2 border-midnight bg-navy" style={{ height: `${h}%`, animationDelay: `${i * 0.18}s` }} />)}
        </div>
      )}
      {visual === 'compare' && (
        <div className="mt-5 grid grid-cols-[1.3fr_1fr_1fr] gap-x-2 gap-y-2 text-sm font-semibold text-midnight">
          <span /><span className="mono rounded-lg border-2 border-midnight bg-sky py-1 text-center text-xs">PLAN A</span><span className="mono rounded-lg border-2 border-midnight bg-sunrise py-1 text-center text-xs">PLAN B</span>
          {['Your doctors', 'Your prescriptions', 'Your budget'].map((r, i) => [
            <span key={r} className="py-1.5">{r}</span>,
            <span key={`${r}a`} className="flex items-center justify-center"><span className="tick flex h-6 w-6 items-center justify-center rounded-full bg-midnight text-sunrise" style={{ animationDelay: `${i * 0.7}s` }}><Check size={13} strokeWidth={3.5} /></span></span>,
            <span key={`${r}b`} className="flex items-center justify-center"><span className="tick flex h-6 w-6 items-center justify-center rounded-full bg-midnight text-sunrise" style={{ animationDelay: `${0.35 + i * 0.7}s` }}><Check size={13} strokeWidth={3.5} /></span></span>,
          ])}
        </div>
      )}
      {visual === 'badge' && Icon && (
        <div className="relative mt-5 flex h-36 items-center justify-center rounded-2xl border-2 border-midnight bg-sky">
          <span className="pulse-ring absolute h-20 w-20 rounded-full border-2 border-midnight" />
          <span className="bob relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-midnight bg-sunrise text-midnight"><Icon size={36} strokeWidth={1.8} /></span>
        </div>
      )}
    </div>
  )
}
