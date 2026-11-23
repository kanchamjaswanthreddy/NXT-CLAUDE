'use client'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { Reveal } from './motion'

// Each situation points at one solution page. Labels are editable copy.
const SITUATIONS = [
  { label: 'Planning retirement income', slug: 'annuities' },
  { label: 'Protecting my family', slug: 'life-insurance' },
  { label: 'Turning 65 soon', slug: 'medicare-planning' },
  { label: 'Thinking about future care', slug: 'care-planning' },
  { label: 'Worried about losing my paycheck', slug: 'disability-income' },
]

export default function StartHere() {
  const [pick, setPick] = useState(0)
  const s = solutions.find((x) => x.slug === SITUATIONS[pick].slug) ?? solutions[0]
  return (
    <section aria-labelledby="start-here" className="pb-20 md:pb-28">
      <div className="container">
        <Reveal className="on-dark relative isolate grid grid-cols-1 items-center gap-12 overflow-hidden rounded-[32px] bg-navy p-8 md:p-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:p-20">
          <div aria-hidden="true" className="arch absolute -right-10 -top-24 -z-10 h-[340px] w-[260px] border-2 border-sunrise/50" />
          <div>
            <p className="label-sm mb-6">Start here</p>
            <h2 id="start-here" className="display text-white">Where are you <span className="text-sunrise">right now?</span></h2>
            <p className="lead mt-5 max-w-[520px]">Pick the one closest to you and we will point you to a starting place.</p>
            <div role="group" aria-label="Your situation" className="mt-8 flex flex-wrap gap-3">
              {SITUATIONS.map((o, i) => (
                <button key={o.slug} type="button" onClick={() => setPick(i)} aria-pressed={pick === i} className={`min-h-[50px] rounded-full border-2 px-5 text-[15px] font-bold transition-all hover:-translate-y-0.5 ${pick === i ? 'border-sunrise bg-sunrise text-midnight' : 'border-white/40 text-white hover:border-white'}`}>{o.label}</button>
              ))}
            </div>
          </div>
          <div aria-live="polite" className="-rotate-2 rounded-3xl bg-white p-8 shadow-[14px_14px_0_var(--color-sunrise)] md:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[.12em] !text-gold">A good place to start</p>
            <AnimatePresence mode="wait">
              <motion.div key={s.slug} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.22 }}>
                <h3 className="display mt-3 !text-navy">{s.title}</h3>
                <p className="mt-3 text-[17px] !text-ink-soft">{s.short}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`/solutions/${s.slug}`} className="btn btn-primary">See how it works <ArrowRight size={16} /></Link>
                  <Link href="/contact" className="btn btn-outline">Talk it through</Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
