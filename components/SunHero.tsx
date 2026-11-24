'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type AnimationPlaybackControls, type MotionStyle } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { solutions } from '@/lib/solutions'
import Landscape from './scene/Landscape'
import { Cloud, Moon, Sun } from './scene/parts'
import { HILL_A, HILL_B, SKY } from '@/lib/sky'

/**
 * Home page hero. One day stands for one working life: the visitor drags the sun along its arc
 * (or uses the arrows, the dots, or the keyboard) and the sky, the landscape and the card below
 * the headline move through five moments, each pointing at the solution that fits it.
 * The moment wording is editable copy; each entry maps to a solution page by slug.
 */
const MOMENTS = [
  { when: 'Working years', moment: 'You are still earning.', slug: 'disability-income' },
  { when: 'Nearing retirement', moment: 'You are about to stop working.', slug: 'annuities' },
  { when: 'Turning 65', moment: 'Medicare enrollment is opening.', slug: 'medicare-planning' },
  { when: 'Later on', moment: 'You want care on your own terms.', slug: 'care-planning' },
  { when: 'Always', moment: 'You want to leave something behind.', slug: 'life-insurance' },
] as const

/** Sun positions along the arc (0 = sunrise on the left horizon, 1 = sunset on the right). */
const STOPS = [0.12, 0.31, 0.5, 0.69, 0.88]
const nearest = (v: number) => STOPS.reduce((best, s, i) => (Math.abs(s - v) < Math.abs(STOPS[best] - v) ? i : best), 0)
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

const STARS = [[8, 12, 5, 0], [19, 34, 4, 0.7], [27, 9, 6, 1.3], [36, 22, 4, 0.3], [44, 6, 5, 1.8], [53, 16, 4, 1.1], [61, 8, 6, 0.5], [69, 26, 4, 1.6], [77, 11, 5, 0.9], [86, 30, 4, 0.2], [93, 14, 5, 1.4], [13, 48, 4, 1.0], [89, 50, 4, 0.6], [49, 30, 3, 2.0]] as const

interface Geo { w: number; h: number; cx: number; rx: number; ry: number; horizon: number }
const css = (vars: Record<string, string | number>) => vars as CSSProperties

export default function SunHero() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const geoRef = useRef<Geo | null>(null)
  const anim = useRef<AnimationPlaybackControls | null>(null)
  const dragging = useRef(false)
  const activeRef = useRef(0)
  const [geo, setGeo] = useState<Geo | null>(null)
  const [active, setActive] = useState(0)
  const [dark, setDark] = useState(true)
  const [touched, setTouched] = useState(false)
  const reduce = useReducedMotion()

  const t = useMotionValue(0)
  const sx = useMotionValue(-400)
  const sy = useMotionValue(-400)

  // Time of day drives every colour in the scene.
  const sky = useTransform(t, SKY.map((x) => x[0]), SKY.map((x) => x[1]))
  const hillA = useTransform(t, HILL_A.map((x) => x[0]), HILL_A.map((x) => x[1]))
  const hillB = useTransform(t, HILL_B.map((x) => x[0]), HILL_B.map((x) => x[1]))
  const tree = useTransform(t, [0.69, 0.88], ['#1b3272', '#0a1136'])
  const glow = useTransform(t, [0, 0.08, 0.76, 0.88], [1, 0, 0, 1])
  const stars = useTransform(t, [0, 0.1, 0.78, 0.9], [0.8, 0, 0, 1])
  const clouds = useTransform(t, [0, 0.1, 0.72, 0.88], [0.2, 1, 1, 0.12])
  const sunFill = useTransform(t, [0.69, 0.9], ['#e8b820', '#f0a43c'])

  const place = useCallback((v: number) => {
    const g = geoRef.current
    if (!g) return
    sx.set(g.cx - g.rx * Math.cos(Math.PI * v))
    sy.set(g.horizon - g.ry * Math.sin(Math.PI * v))
  }, [sx, sy])

  useMotionValueEvent(t, 'change', (v) => {
    place(v)
    const i = nearest(v)
    if (i !== activeRef.current) { activeRef.current = i; setActive(i) }
    const d = v > 0.845 || v < 0.06
    setDark((prev) => (prev === d ? prev : d))
  })

  // Measure the scene and rebuild the arc whenever it resizes.
  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      const small = w < 1024
      const horizon = h - (small ? 84 : 140)
      const g: Geo = { w, h, cx: w / 2, rx: small ? w * 0.4 : Math.min(w * 0.46, 700), ry: horizon - (small ? 44 : 84), horizon }
      geoRef.current = g
      setGeo(g)
      place(t.get())
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [place, t])

  // Sunrise on load.
  useEffect(() => {
    if (reduce) { t.set(STOPS[0]); return }
    anim.current = animate(t, STOPS[0], { duration: 1.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 })
    return () => anim.current?.stop()
  }, [reduce, t])

  const go = useCallback((i: number) => {
    const idx = clamp(i, 0, STOPS.length - 1)
    anim.current?.stop()
    if (reduce) t.set(STOPS[idx])
    else anim.current = animate(t, STOPS[idx], { type: 'spring', stiffness: 110, damping: 19 })
    setTouched(true)
  }, [reduce, t])

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragging.current = true
    anim.current?.stop()
    setTouched(true)
  }
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = geoRef.current
    const el = sceneRef.current
    if (!dragging.current || !g || !el) return
    const rect = el.getBoundingClientRect()
    const ang = Math.atan2(Math.max(0, g.horizon - (e.clientY - rect.top)) / g.ry, (e.clientX - rect.left - g.cx) / g.rx)
    t.set(clamp(1 - ang / Math.PI, 0.05, 0.95))
  }
  const onUp = () => {
    if (!dragging.current) return
    dragging.current = false
    go(nearest(t.get()))
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const k = e.key
    if (k === 'ArrowRight' || k === 'ArrowUp') { e.preventDefault(); go(activeRef.current + 1) }
    else if (k === 'ArrowLeft' || k === 'ArrowDown') { e.preventDefault(); go(activeRef.current - 1) }
    else if (k === 'Home') { e.preventDefault(); go(0) }
    else if (k === 'End') { e.preventDefault(); go(STOPS.length - 1) }
  }

  const m = MOMENTS[active]
  const s = solutions.find((x) => x.slug === m.slug) ?? solutions[0]
  const pts = geo ? STOPS.map((v) => ({ x: geo.cx - geo.rx * Math.cos(Math.PI * v), y: geo.horizon - geo.ry * Math.sin(Math.PI * v) })) : []

  return (
    <motion.section
      aria-label="Introduction"
      className={`sun-hero relative overflow-hidden pt-[84px] ${dark ? 'is-dark' : ''}`}
      style={{ backgroundColor: sky, '--hill-a': hillA, '--hill-b': hillB, '--tree': tree, '--glow': glow, '--stars': stars, '--clouds': clouds, '--sun': sunFill } as MotionStyle}
    >
      <div className="sun-hero-content container pointer-events-none relative z-20 text-center">
        <h1 className="sun-h1 pointer-events-auto inline-block font-display font-extrabold">
          <span className="rise block" style={css({ '--i': 0 })}>Income you can&rsquo;t outlive.</span>
          <span className="rise block" style={css({ '--i': 1 })}>Care you can choose.</span>
          <span className="rise block" style={css({ '--i': 2 })}><span className="hl">A legacy that lands.</span></span>
        </h1>
        <div className="sun-card rise pointer-events-auto mx-auto mt-5 w-full" style={css({ '--i': 4 })}>
          <div className="flat relative px-9 py-4 sm:px-14 sm:py-5" aria-live="polite">
            <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Earlier moment" className="round-btn absolute -left-3 top-1/2 -translate-y-1/2 sm:-left-5"><ArrowLeft size={18} /></button>
            <div key={active} className="swap-in">
              <p className="mono text-[11px] uppercase tracking-[.1em] text-navy">{active + 1} / {MOMENTS.length} · {m.when}</p>
              <p className="mt-1 font-display text-[1.3rem] font-extrabold leading-tight text-midnight sm:text-[1.5rem]">{m.moment}</p>
              <p className="mt-1 text-[14.5px] leading-snug text-ink-soft"><Link href={`/solutions/${s.slug}`} className="font-bold text-midnight underline decoration-sunrise decoration-2 underline-offset-4">{s.title}</Link>: {s.short}</p>
            </div>
            <button type="button" onClick={() => go(active + 1)} disabled={active === MOMENTS.length - 1} aria-label="Later moment" className="round-btn absolute -right-3 top-1/2 -translate-y-1/2 sm:-right-5"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>

      <div className="sun-cta rise z-20" style={css({ '--i': 6 })}>
        <Link href="/contact" className="btn btn-primary">Book a free consultation <ArrowRight size={16} /></Link>
        <Link href="/solutions" className="btn btn-outline">Explore solutions</Link>
      </div>

      <div ref={sceneRef} className="sun-scene">
        <div className="stars" aria-hidden="true">
          {STARS.map(([l, tp, size, d], i) => <i key={i} className="star" style={{ left: `${l}%`, top: `${tp}%`, width: size, height: size, animationDelay: `${d}s` }} />)}
        </div>
        <Moon className="sun-moon" />
        <Cloud className="cloud cloud-a" />
        <Cloud className="cloud cloud-b" />
        <Cloud className="cloud cloud-c" />
        {geo && (
          <svg className="sun-arc" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
            <path d={`M ${geo.cx - geo.rx} ${geo.horizon} A ${geo.rx} ${geo.ry} 0 0 1 ${geo.cx + geo.rx} ${geo.horizon}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="1 13" strokeLinecap="round" />
          </svg>
        )}
        <motion.div
          role="slider"
          tabIndex={0}
          aria-label="Time of life. Use the arrow keys to move the sun."
          aria-orientation="horizontal"
          aria-valuemin={1}
          aria-valuemax={MOMENTS.length}
          aria-valuenow={active + 1}
          aria-valuetext={`${m.when}: ${m.moment}`}
          className="sun-thumb"
          style={{ x: sx, y: sy }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onKey}
        >
          <Sun className="sun-svg" />
          {!touched && <span className="sun-hint chip" aria-hidden="true">Drag the sun</span>}
        </motion.div>
        <Landscape active={active} />
        {pts.map((p, i) => (
          <button key={i} type="button" onClick={() => go(i)} aria-label={`${MOMENTS[i].when}: ${MOMENTS[i].moment}`} aria-pressed={active === i} title={MOMENTS[i].when} className={`sun-stop ${active === i ? 'is-on' : ''}`} style={{ left: p.x, top: p.y }} />
        ))}
      </div>
    </motion.section>
  )
}
