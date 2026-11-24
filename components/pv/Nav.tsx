'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowUp } from 'lucide-react'
import { scrollToY } from '@/components/SmoothScroll'

const LINKS = [['/solutions', 'Solutions'], ['/carriers', 'Carriers'], ['/about', 'About'], ['/nxt-life', 'NXT Life'], ['/insights', 'Insights']] as const
const LOGIN = 'https://crm.nxtfinancialgroup.com/auth/login'

/** A label that rolls up to a copy of itself on hover. */
function Roll({ children }: { children: string }) {
  return <span className="pv-roll"><span>{children}</span><span aria-hidden="true">{children}</span></span>
}

/**
 * Header for the preview: clear over the top of the page, a white bar once the page has moved,
 * out of the way while scrolling down and back as soon as the visitor scrolls up. Also carries
 * the back-to-top button, whose ring fills with the page's progress.
 */
export default function PvNav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [hide, setHide] = useState(false)
  const [far, setFar] = useState(false)
  const ring = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 24)
      if (Math.abs(y - last) > 6) { setHide(y > last && y > 220); last = y }
      setFar(y > window.innerHeight * 0.9)
      const max = document.documentElement.scrollHeight - window.innerHeight
      ring.current?.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) window.__lenis?.stop(); else window.__lenis?.start()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; window.__lenis?.start() }
  }, [open])

  return (
    <>
      <a href="#main" className="pv-skip">Skip to content</a>
      <header className="pv-nav" data-solid={solid || open || undefined} data-hide={(hide && !open) || undefined}>
        <Link href="/" className="pv-logo" aria-label="NXT Financial Group, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/logo.png" alt="" width={420} height={186} />
        </Link>
        <nav aria-label="Main" className="pv-nav-links">
          <ul>
            {LINKS.map(([href, label]) => <li key={href}><Link href={href}><Roll>{label}</Roll></Link></li>)}
          </ul>
        </nav>
        <div className="pv-nav-cta">
          <Link href="/get-started" className="pv-btn pv-btn-sm" data-magnet="0.25"><span className="pv-dot" />Get started</Link>
          <a href={LOGIN} target="_blank" rel="noopener noreferrer" className="pv-btn pv-btn-sm pv-btn-soft" data-magnet="0.25"><span className="pv-dot" />Agent login</a>
        </div>
        <button type="button" className="pv-burger" aria-expanded={open} aria-controls="pv-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </header>

      <div id="pv-menu" className="pv-menu" data-open={open || undefined} inert={!open} data-lenis-prevent>
        <ul>
          {LINKS.map(([href, label], i) => (
            <li key={href} style={{ '--i': i } as CSSProperties}><Link href={href} onClick={() => setOpen(false)}>{label}</Link></li>
          ))}
        </ul>
        <div className="pv-menu-cta">
          <Link href="/get-started" className="pv-btn" onClick={() => setOpen(false)}><span className="pv-dot" />Get started</Link>
          <a href={LOGIN} target="_blank" rel="noopener noreferrer" className="pv-btn pv-btn-soft"><span className="pv-dot" />Agent login</a>
        </div>
      </div>

      <button ref={ring} type="button" className="pv-top" data-on={far || undefined} tabIndex={far ? 0 : -1} aria-label="Back to top" onClick={() => scrollToY(0)}>
        <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" pathLength={1} /></svg>
        <ArrowUp size={18} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </>
  )
}
