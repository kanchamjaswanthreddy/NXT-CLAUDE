'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ShieldCheck, MapPin, BadgeCheck } from 'lucide-react'
import { useRef } from 'react'

const ease = [0.22, 0.61, 0.36, 1] as const
const up = (d: number) => ({ initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease } })

function Rings({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
      <circle cx="300" cy="300" r="296" strokeWidth="1.2" strokeDasharray="4 14" />
      <circle cx="300" cy="300" r="240" strokeWidth="1.2" />
      <circle cx="300" cy="300" r="180" strokeWidth="1.2" strokeDasharray="60 18" />
      <circle cx="300" cy="300" r="118" strokeWidth="1.2" />
    </svg>
  )
}

export default function HeroV5() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yWord = useTransform(scrollYProgress, [0, 1], [0, 160])

  return (
    <section ref={ref} className="on-dark relative isolate overflow-hidden bg-midnight pt-[84px]">
      <motion.div aria-hidden="true" style={{ y: yWord }} className="outline-text pointer-events-none absolute -right-6 top-24 -z-10 select-none whitespace-nowrap font-display text-[clamp(13rem,34vw,32rem)] font-extrabold leading-[.8] tracking-[-.06em]">NXT</motion.div>
      <Rings className="pointer-events-none absolute -bottom-80 -left-72 -z-10 hidden h-[640px] w-[640px] text-sunrise/30 lg:block" />

      <div className="container grid grid-cols-1 items-center gap-16 pb-24 pt-14 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-32">
        <div>
          <motion.p {...up(0)} className="label-sm mb-7">NXT Financial Group | Retirement &amp; protection planning</motion.p>
          <motion.h1 {...up(0.08)} className="display-xl text-white">Income you can&rsquo;t <span className="gold-chip">outlive.</span> Care you can <span className="text-sunrise">choose.</span> A legacy that <span className="text-sunrise">lands.</span></motion.h1>
          <motion.p {...up(0.16)} className="lead mt-8 max-w-[560px]">An independent agency for the five decisions that shape retirement: annuities, life insurance, care planning, Medicare and disability income. We compare A-rated carriers and explain every term before you sign one.</motion.p>
          <motion.div {...up(0.24)} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-cta">Book a free consultation <ArrowRight size={16} /></Link>
            <Link href="/solutions" className="btn btn-ghost">Explore solutions</Link>
          </motion.div>
          <motion.ul {...up(0.34)} className="mt-10 flex flex-wrap gap-3">
            <li className="pill"><ShieldCheck size={16} className="text-gold" /> A-rated carriers only</li>
            <li className="pill"><MapPin size={16} className="text-gold" /> Licensed in 50 states</li>
            <li className="pill"><BadgeCheck size={16} className="text-gold" /> No cost to you</li>
          </motion.ul>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] lg:max-w-[520px]">
          <Rings className="spin-slower pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 text-sunrise/70" />
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease }} style={{ y, borderRadius: '58% 42% 55% 45% / 48% 55% 45% 52%' }} className="blob-morph relative mx-auto aspect-square w-[92%] overflow-hidden border-[3px] border-sunrise">
            <Image src="/images/family-advisor.png" alt="A family meeting with their NXT advisor" fill priority sizes="(min-width:1024px) 40vw, 80vw" className="object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} style={{ y: y2 }} className="absolute -left-2 top-[14%] w-[210px] -rotate-3 rounded-2xl bg-white p-4 shadow-lift md:-left-10">
            <p className="label-sm">Guaranteed income</p><p className="mt-2 font-display text-3xl font-extrabold text-navy">$4,850<span className="text-base font-semibold text-ink-soft">/mo</span></p><p className="mt-1 text-xs !text-ink-soft">Illustrative lifetime payout</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.75, ease }} style={{ y: y2 }} className="absolute -right-2 top-[52%] w-[230px] rotate-2 rounded-2xl bg-white p-4 shadow-lift md:-right-8">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-midnight"><ShieldCheck size={20} /></span><div><p className="text-sm font-bold !text-navy">Care plan funded</p><p className="text-xs !text-ink-soft">Hybrid LTC · $300k benefit</p></div></div>
          </motion.div>
          <Link href="/contact" aria-label="Book a free consultation" className="group absolute -bottom-8 left-2 flex h-[150px] w-[150px] items-center justify-center rounded-full bg-sunrise text-midnight shadow-lift transition-transform hover:scale-105 md:left-0">
            <svg viewBox="0 0 150 150" aria-hidden="true" className="spin-slow absolute inset-0 h-full w-full">
              <defs><path id="hero-ring" d="M75 75 m-56 0 a56 56 0 1 1 112 0 a56 56 0 1 1 -112 0" /></defs>
              <text fontSize="11.5" fontWeight="800" letterSpacing="1.4" fill="currentColor"><textPath href="#hero-ring">BOOK A FREE CONSULTATION ✦ NO COST TO YOU ✦</textPath></text>
            </svg>
            <ArrowUpRight size={40} strokeWidth={1.8} className="transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  )
}
