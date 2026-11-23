'use client'
import Link from 'next/link'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, MapPin, BadgeCheck, TrendingUp } from 'lucide-react'
import { useRef, type MouseEvent } from 'react'
import Illo3D from './Illo3D'

const ease = [0.22, 0.61, 0.36, 1] as const
const up = (d: number) => ({ initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease } })

export default function HeroV6() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const stageScale = useTransform(scrollYProgress, [0, 0.3], [0.94, 1])
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 16 })
  const sy = useSpring(my, { stiffness: 80, damping: 16 })
  const farX = useTransform(sx, (v) => v * 26)
  const farY = useTransform(sy, (v) => v * 26)
  const nearX = useTransform(sx, (v) => v * -44)
  const nearY = useTransform(sy, (v) => v * -44)
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section ref={ref} className="on-dark relative isolate overflow-hidden bg-midnight pt-[84px]">
      <div aria-hidden="true" className="glow -left-40 top-0 -z-10 h-[560px] w-[560px] bg-command/60" />
      <div aria-hidden="true" className="glow -right-40 top-40 -z-10 h-[520px] w-[520px] bg-sunrise/15" />
      <motion.div aria-hidden="true" style={{ y: wordY }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }} className="wordmark-grad select-none whitespace-nowrap px-3 pt-8 text-center font-display text-[clamp(3rem,13.4vw,13.5rem)] font-extrabold leading-[.86] tracking-[-.05em] md:pt-12">NXT FINANCIAL</motion.div>

      <div className="container pb-16 md:pb-24">
        <motion.div onMouseMove={move} style={{ scale: stageScale }} className="stage relative isolate -mt-2 grid min-h-[600px] grid-cols-1 items-end overflow-hidden rounded-[36px] border border-white/10 lg:grid-cols-[1.1fr_1fr]">
          <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
          <div className="relative p-7 pt-10 md:p-12 lg:p-14">
            <motion.p {...up(0.1)} className="label-sm mb-6">Retirement &amp; protection planning</motion.p>
            <motion.h1 {...up(0.18)} className="display text-white md:text-[3.6rem]">Income you can&rsquo;t <span className="text-sunrise">outlive.</span> Care you can <span className="text-sunrise">choose.</span> A legacy that <span className="text-sunrise">lands.</span></motion.h1>
            <motion.p {...up(0.26)} className="lead mt-6 max-w-[540px]">An independent agency for the five decisions that shape retirement: annuities, life insurance, care planning, Medicare and disability income. We compare A-rated carriers and explain every term before you sign one.</motion.p>
            <motion.div {...up(0.34)} className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn btn-cta">Book a free consultation <ArrowRight size={16} /></Link>
              <Link href="/solutions" className="btn btn-ghost">Explore solutions</Link>
            </motion.div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px] p-6 lg:self-center lg:p-10">
            <motion.div style={{ x: farX, y: farY }}><Illo3D icon={TrendingUp} /></motion.div>
            <motion.div style={{ x: nearX, y: nearY }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="glass-card absolute left-0 top-[12%] w-[200px] p-4 md:w-[214px]">
              <p className="text-[11px] font-extrabold uppercase tracking-[.1em] !text-sunrise">Guaranteed income</p><p className="mt-1 font-display text-3xl font-extrabold !text-white">$4,850<span className="text-base font-semibold text-platinum">/mo</span></p><p className="mt-1 text-xs">Illustrative lifetime payout</p>
            </motion.div>
            <motion.div style={{ x: nearX, y: nearY }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.75, ease }} className="glass-card absolute bottom-[10%] right-0 w-[220px] p-4 md:w-[236px]">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sunrise text-midnight"><ShieldCheck size={20} /></span><div><p className="text-sm font-bold !text-white">Care plan funded</p><p className="text-xs">Hybrid LTC · $300k benefit</p></div></div>
            </motion.div>
          </div>
        </motion.div>
        <motion.ul {...up(0.5)} className="mt-8 flex flex-wrap justify-center gap-3">
          <li className="pill-dark"><ShieldCheck size={16} className="text-sunrise" /> A-rated carriers only</li>
          <li className="pill-dark"><MapPin size={16} className="text-sunrise" /> Licensed in 50 states</li>
          <li className="pill-dark"><BadgeCheck size={16} className="text-sunrise" /> No cost to you</li>
        </motion.ul>
      </div>
    </section>
  )
}
