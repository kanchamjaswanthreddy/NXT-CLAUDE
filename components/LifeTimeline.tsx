'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import { Reveal } from './motion'
import Mock, { mockFor } from './Mock'

const MOMENTS: { when: string; moment: string; slug: string }[] = [
  { when: 'Working years', moment: 'You are still earning.', slug: 'disability-income' },
  { when: 'Nearing retirement', moment: 'You are about to stop working.', slug: 'annuities' },
  { when: 'Turning 65', moment: 'Medicare enrollment is opening.', slug: 'medicare-planning' },
  { when: 'Later on', moment: 'You want care on your own terms.', slug: 'care-planning' },
  { when: 'Always', moment: 'You want to leave something behind.', slug: 'life-insurance' },
]

export default function LifeTimeline() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })
  return (
    <section aria-labelledby="moments" className="section bg-cream">
      <div className="container">
        <Reveal className="mx-auto mb-16 max-w-[820px] text-center md:mb-24"><p className="chip mb-6">Start where you are</p><h2 id="moments" className="display-xl">Which moment are <span className="hl">you in?</span></h2><p className="lead mx-auto mt-6 max-w-[520px] text-ink-soft">Each one has a decision behind it. Find yours and see where to begin.</p></Reveal>
        <ol ref={ref} className="relative flex flex-col gap-16 md:gap-24">
          <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-midnight/15 md:left-1/2 md:-translate-x-1/2" />
          <motion.div aria-hidden="true" style={{ scaleY }} className="absolute bottom-0 left-[11px] top-0 w-0.5 origin-top bg-midnight md:left-1/2 md:-translate-x-1/2" />
          {MOMENTS.map((m, i) => {
            const s = solutions.find((x) => x.slug === m.slug)
            if (!s) return null
            const flip = i % 2 === 1
            return (
              <li key={m.slug} className="relative grid grid-cols-1 items-center gap-8 pl-10 md:grid-cols-2 md:gap-24 md:pl-0">
                <span aria-hidden="true" className="absolute left-0 top-2 h-6 w-6 rounded-full border-2 border-midnight bg-sunrise md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />
                <motion.div initial={{ opacity: 0, x: flip ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.6 }} className={flip ? 'md:order-2' : 'md:text-right'}>
                  <p className="mono text-xs uppercase tracking-[.1em] text-navy">{m.when}</p>
                  <h3 className="display mt-2">{m.moment}</h3>
                  <p className="mt-3 text-[17px] text-ink-soft">{s.short}</p>
                  <Link href={`/solutions/${s.slug}`} className="btn btn-outline mt-6">See {s.title} <ArrowRight size={16} /></Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: flip ? -50 : 50, rotate: flip ? -4 : 4 }} whileInView={{ opacity: 1, x: 0, rotate: flip ? -2 : 2 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.6, delay: 0.1 }} className={`flex ${flip ? 'md:order-1 md:justify-end' : ''}`}>
                  <Mock {...mockFor(m.slug)} />
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
