'use client'
import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Testimonial } from '@/lib/testimonials'

/** Testimonials in one sideways row: drag it with the mouse, swipe it, scroll it, or use the arrows. */
export default function Quotes({ items }: { items: Testimonial[] }) {
  const rail = useRef<HTMLUListElement>(null)
  const drag = useRef({ on: false, x: 0, left: 0, moved: false })
  const [edge, setEdge] = useState({ start: true, end: false })
  const [grabbing, setGrabbing] = useState(false)

  const measure = () => {
    const el = rail.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }
  useEffect(() => { measure() }, [])

  const step = (dir: number) => {
    const el = rail.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  const down = (e: ReactPointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { on: true, x: e.clientX, left: e.currentTarget.scrollLeft, moved: false }
  }
  const moveTo = (e: ReactPointerEvent<HTMLUListElement>) => {
    const d = drag.current
    if (!d.on) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) { d.moved = true; setGrabbing(true); e.currentTarget.setPointerCapture(e.pointerId) }
    if (d.moved) e.currentTarget.scrollLeft = d.left - dx
  }
  const up = () => { drag.current.on = false; setGrabbing(false) }

  return (
    <div className="pv-quotes">
      <ul ref={rail} className="pv-quote-rail" data-grabbing={grabbing || undefined} tabIndex={0} aria-label="Testimonials" onScroll={measure} onPointerDown={down} onPointerMove={moveTo} onPointerUp={up} onPointerCancel={up}>
        {items.map((t, i) => (
          <li key={t.name} style={{ '--i': i } as CSSProperties}>
            <figure className="pv-quote">
              <svg className="pv-quote-mark" viewBox="0 0 48 36" aria-hidden="true"><path d="M0 36V21.6C0 9.4 6.6 1.9 19.2 0l1.9 5.3C14.3 7 11 11 10.6 16.4h9.6V36H0zm26.9 0V21.6C26.9 9.4 33.5 1.9 46.1 0L48 5.3C41.2 7 37.9 11 37.5 16.4h9.6V36H26.9z" /></svg>
              <blockquote><p>{t.quote}</p></blockquote>
              <figcaption>
                {t.image ? (
                  <span className="pv-quote-face"><Image src={t.image} alt="" fill sizes="52px" /></span>
                ) : (
                  <span className="pv-quote-face" data-initials aria-hidden="true">{t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
                )}
                <span><span className="pv-quote-name">{t.name}</span><span className="pv-quote-role">{t.role}</span></span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="pv-quote-nav">
        <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Earlier testimonials" className="pv-round"><ArrowLeft size={20} /></button>
        <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="More testimonials" className="pv-round"><ArrowRight size={20} /></button>
      </div>
    </div>
  )
}
