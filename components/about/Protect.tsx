'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

export interface ProtectValue { letter: string; word: string; desc: string }

/**
 * The seven values, spelled P-R-O-T-E-C-T. With motion the section holds still while the page
 * scrolls: each letter lights in turn and its principle is set out beneath it, and any letter can
 * be clicked to jump to it. Without motion (or scripting) it is a plain list of all seven.
 */
export default function Protect({ values }: { values: ProtectValue[] }) {
  const root = useRef<HTMLElement>(null)
  const [live, setLive] = useState(false)
  const [at, setAt] = useState(0)
  const n = values.length

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 560px)')
    const mode = () => setLive(mq.matches)
    mode(); mq.addEventListener('change', mode)
    return () => mq.removeEventListener('change', mode)
  }, [])

  useEffect(() => {
    if (!live) return
    let raf = 0
    const read = () => {
      raf = 0
      const el = root.current; if (!el) return
      const r = el.getBoundingClientRect()
      const p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)))
      setAt(Math.floor(p * n))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [live, n])

  const go = (k: number) => {
    const el = root.current; if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    const y = top + ((k + 0.5) / n) * (el.offsetHeight - innerHeight)
    const l = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis
    if (l) l.scrollTo(y); else scrollTo({ top: y, behavior: 'smooth' })
  }

  const cur = values[at]
  return (
    <section ref={root} className="pt bg-stone" data-live={live || undefined} style={{ '--n': n, '--at': at } as CSSProperties} aria-labelledby="pt-h">
      <h2 id="pt-h" className="sr-only">Our values: P.R.O.T.E.C.T</h2>

      <div className="pt-stage">
        <div className="pt-head">
          <p className="chip">Our values</p>
          <p className="pt-lead">Seven principles that guide every decision we make — for our advisors and for the families we serve.</p>
        </div>

        <div className="pt-letters" role="tablist" aria-label="P.R.O.T.E.C.T">
          {values.map((v, k) => (
            <button key={k} type="button" role="tab" aria-selected={k === at} aria-controls="pt-panel" aria-label={`${v.letter}: ${v.word}`}
              data-state={k < at ? 'past' : k === at ? 'on' : 'next'} onClick={() => go(k)}>
              <span>{v.letter}</span>
            </button>
          ))}
          <i className="pt-rail" aria-hidden="true"><b /></i>
        </div>

        <div id="pt-panel" role="tabpanel" className="pt-panel" key={at}>
          <div className="pt-ticks" aria-hidden="true">{values.map((_, k) => <i key={k} data-on={k <= at || undefined} />)}</div>
          <h3><span>{cur.letter}</span>{cur.word.slice(1)}</h3>
          <p>{cur.desc}</p>
        </div>
      </div>

      <div className="pt-plain container">
        <p className="chip">Our values</p>
        <p className="pt-word" aria-hidden="true">P.R.O.T.E.C.T</p>
        <p className="pt-lead">Seven principles that guide every decision we make — for our advisors and for the families we serve.</p>
        <ol>
          {values.map((v, k) => (
            <li key={k}><b aria-hidden="true">{v.letter}</b><div><h3>{v.word}</h3><p>{v.desc}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  )
}
