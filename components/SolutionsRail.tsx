'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import SolutionPanel from './SolutionPanel'

/**
 * The solutions, as a rail of illustrated panels.
 * On wide screens the section pins and vertical scrolling moves the rail sideways, one-to-one.
 * On phones and tablets, and for visitors who prefer reduced motion, it is an ordinary grid.
 */
export default function SolutionsRail() {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const sticky = useRef<HTMLDivElement>(null)
  const panels = useRef<(HTMLElement | null)[]>([])
  const [pin, setPin] = useState(false)
  const [dist, setDist] = useState(0)
  const [current, setCurrent] = useState(0)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)')
    const apply = () => setPin(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!pin || !el) { setDist(0); return }
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [pin])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(solutions.length - 1, Math.max(0, Math.round(v * (solutions.length - 1))))
    setCurrent((p) => (p === i ? p : i))
  })

  // Keyboard users: when focus lands in a panel that is off screen, scroll the rail to it.
  const reveal = (i: number) => {
    const el = panels.current[i]
    const w = wrap.current
    if (!pin || !el || !w || dist === 0) return
    if (sticky.current) sticky.current.scrollLeft = 0 // undo any sideways scroll the browser made to reach the focused link
    const target = Math.min(dist, Math.max(0, el.offsetLeft - (window.innerWidth - el.offsetWidth) / 2))
    window.scrollTo({ top: w.getBoundingClientRect().top + window.scrollY + target })
  }

  const total = String(solutions.length).padStart(2, '0')

  return (
    <section aria-labelledby="solutions-h" className="bg-sky">
      <div ref={wrap} className="relative" style={pin ? { height: `calc(100vh + ${dist}px)` } : undefined}>
        <div ref={sticky} onScroll={(e) => { if (e.currentTarget.scrollLeft !== 0) e.currentTarget.scrollLeft = 0 }} className={pin ? 'rail-pin sticky top-0 flex h-screen flex-col justify-center pt-[84px]' : 'section'}>
          <motion.div
            ref={track}
            style={pin ? { x } : undefined}
            className={pin ? 'flex w-max items-stretch gap-8 pl-[max(40px,calc((100vw-1280px)/2+40px))] pr-[12vw]' : 'container grid grid-cols-1 gap-8 md:grid-cols-2'}
          >
            <div className={pin ? 'flex w-[400px] shrink-0 flex-col justify-center pr-4' : 'md:col-span-2'}>
              <p className="chip mb-6 self-start">Five solutions</p>
              <h2 id="solutions-h" className="display-xl">Everything we do fits on <span className="hl">one hand.</span></h2>
              <Link href="/solutions" className="link mt-7 self-start">All five, in detail <ArrowRight size={16} /></Link>
              {pin && <p className="mono mt-10 flex items-center gap-3 text-xs uppercase tracking-[.1em] text-midnight"><span className="nudge-x inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-midnight bg-white"><ArrowRight size={16} /></span>Keep scrolling</p>}
            </div>
            {solutions.map((s, i) => (
              <div key={s.slug} ref={(el) => { panels.current[i] = el }} onFocusCapture={() => reveal(i)} className={pin ? 'w-[460px] shrink-0' : ''}>
                <SolutionPanel s={s} index={i} total={solutions.length} />
              </div>
            ))}
          </motion.div>
          {pin && (
            <div className="container mt-8 flex items-center gap-5">
              <p className="mono w-16 text-sm text-midnight" aria-hidden="true">{String(current + 1).padStart(2, '0')} / {total}</p>
              <div className="h-2 flex-1 overflow-hidden rounded-full border-2 border-midnight bg-white"><motion.div className="h-full origin-left bg-midnight" style={{ scaleX: scrollYProgress }} /></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
