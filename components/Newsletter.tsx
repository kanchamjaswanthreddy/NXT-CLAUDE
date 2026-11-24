'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { Envelope, Mailbox } from './scene/parts'

export default function Newsletter() {
  const [done, setDone] = useState(false)
  return (
    <section className="on-dark overflow-hidden bg-navy">
      <div className="container grid grid-cols-1 items-center gap-16 py-20 md:py-28 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="label-sm mb-5">The NXT Brief</p>
          <h2 className="display">Retirement, one idea <span className="hl">at a time.</span></h2>
          <p className="lead mt-5 max-w-[520px]">A short monthly note on annuity rates, Medicare deadlines and the questions our clients are asking. No selling, unsubscribe any time.</p>
          <ul className="mt-6 space-y-2 text-[15px]">{['Plain-language explanations', 'Enrollment and deadline reminders', 'What changed in the market this month'].map((t) => <li key={t} className="flex items-center gap-2.5"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-sunrise text-midnight"><Check size={11} strokeWidth={3.5} /></span>{t}</li>)}</ul>
        </div>
        <div className="relative mt-10 lg:mt-0">
          <div aria-hidden="true" className="mail-scene"><Mailbox className="w-full" /><div className="mail-env"><Envelope /></div></div>
          <div className="flat flat-gold relative p-8 md:p-10">
            {done ? <p className="font-display text-2xl font-extrabold !text-midnight">You&rsquo;re on the list. First note lands next month.</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
                <label htmlFor="nl-email" className="field-label">Email address</label>
                <div className="flex flex-col gap-3 sm:flex-row"><input id="nl-email" type="email" required placeholder="you@example.com" className="field flex-1" /><button className="btn btn-primary">Subscribe <ArrowRight size={16} /></button></div>
                <p className="mono mt-4 text-xs !text-ink-soft">Free. Unsubscribe any time.</p>
              </form>
            )}
            <div className="mt-8 flex items-center gap-4 border-t-2 border-midnight/10 pt-6"><Image src="/logo.png" alt="NXT Financial Group" width={110} height={49} className="h-8 w-auto" /><p className="text-xs !text-ink-soft">Written by the advisors you would be speaking with.</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}
