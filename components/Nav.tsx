'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

interface DropdownItem {
  href: string
  label: string
}

interface NavItem {
  key: string
  href: string
  label: string
  children?: DropdownItem[]
}

const NAV_ITEMS: NavItem[] = [
  { key: 'solutions', href: '/solutions', label: 'Solutions' },
  {
    key: 'about',
    href: '/about',
    label: 'About',
    children: [
      { href: '/about', label: 'About Us' },
      { href: '/about#why-nxt', label: 'Why NXT' },
      { href: '/about#team', label: 'Meet Our Team' },
      { href: '/contact', label: 'Contact an Agent' },
    ],
  },
  {
    key: 'calculators',
    href: '/calculators',
    label: 'Calculators',
    children: [
      { href: '/calculators#life', label: 'Life Insurance Needs' },
      { href: '/calculators#income', label: 'Retirement Income Gap' },
      { href: '/calculators#annuity', label: 'Annuity Calculator' },
      { href: '/calculators#401k', label: '401(k) Calculator' },
      { href: '/calculators#mortgage', label: 'Mortgage Calculator' },
      { href: '/calculators#care', label: 'Care Cost Calculator' },
      { href: '/calculators#rule72', label: 'Rule of 72' },
      { href: '/calculators#smoking', label: 'Smoking Cost' },
      { href: '/calculators#breakfast', label: 'Breakfast Savings' },
    ],
  },
  { key: 'carriers', href: '/carriers', label: 'Carriers' },
  { key: 'nxt-life', href: '/nxt-life', label: 'NXT Life' },
  { key: 'insights', href: '/insights', label: 'Insights' },
  { key: 'careers', href: '/careers', label: 'Careers' },
]

const MOBILE_SECTIONS = [
  { heading: null, links: [{ href: '/', label: 'Home' }, { href: '/solutions', label: 'Solutions' }] },
  { heading: 'About', links: NAV_ITEMS[1].children! },
  { heading: 'Calculators', links: NAV_ITEMS[2].children! },
  { heading: null, links: [{ href: '/carriers', label: 'Carriers' }, { href: '/nxt-life', label: 'NXT Life' }, { href: '/insights', label: 'Insights' }, { href: '/careers', label: 'Careers' }] },
]

const LOGIN = 'https://crm.nxtfinancialgroup.com/auth/login'
const linkClass = (active: boolean) => `nav-link relative flex items-center gap-1 py-2 text-[.875rem] tracking-[-.01em] ${active ? 'font-medium' : ''}`

/**
 * Site header. Clear over the top of each page, frosted glass once the page has moved or a menu
 * is open, and dark glass with white type while a dark section is passing underneath.
 */
export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Full-width dark sections of the current page. The closing film is left out: it arrives as
    // a window on white, so the light bar is right for it.
    const sections = () => Array.from(document.querySelectorAll<HTMLElement>('main .on-dark')).filter((el) => el.offsetWidth >= window.innerWidth * 0.9)
    let list = sections()
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      setDark(list.some((el) => { const r = el.getBoundingClientRect(); return r.top <= 30 && r.bottom >= 30 }))
    }
    handleScroll()
    const refresh = window.setTimeout(() => { list = sections(); handleScroll() }, 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => { window.clearTimeout(refresh); window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleScroll) }
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => { setActiveDropdown(null); setOpen(false) }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setActiveDropdown(null); setOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const show = useCallback((key: string) => {
    if (closeTimeoutRef.current) { clearTimeout(closeTimeoutRef.current); closeTimeoutRef.current = null }
    setActiveDropdown(key)
  }, [])
  const hideSoon = useCallback(() => { closeTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 160) }, [])

  const isActive = (item: NavItem): boolean => {
    const base = item.href.split('#')[0]
    if (pathname === base || pathname?.startsWith(base + '/')) return true
    return Boolean(item.children?.some((c) => { const b = c.href.split('#')[0]; return pathname === b || pathname?.startsWith(b + '/') }))
  }

  return (
    <>
      <header className="nav fixed inset-x-0 top-0 z-50" data-solid={scrolled || open || activeDropdown !== null} data-tone={dark && !open ? 'dark' : 'light'}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-midnight focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

        <nav aria-label="Main" className="mx-auto flex h-[60px] max-w-[1480px] items-center justify-between gap-6 px-[22px] md:px-[44px]">
          <Link href="/" onClick={() => setOpen(false)} aria-label="NXT Financial Group home" className="nav-logo shrink-0">
            <Image src="/media/logo.png" alt="NXT Financial Group" width={200} height={88} priority className="h-[38px] w-auto" />
            <Image src="/media/logo-white.png" alt="" aria-hidden="true" width={200} height={88} className="h-[38px] w-auto" />
          </Link>

          <ul className="hidden items-center gap-5 whitespace-nowrap lg:flex xl:gap-8">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item)
              const expanded = activeDropdown === item.key
              return (
                <li key={item.key} className="relative" onMouseEnter={item.children ? () => show(item.key) : undefined} onMouseLeave={item.children ? hideSoon : undefined}>
                  {item.children ? (
                    <button type="button" className={linkClass(active)} data-active={active} aria-expanded={expanded} aria-haspopup="true" onClick={() => setActiveDropdown(expanded ? null : item.key)}>
                      {item.label}
                      <ChevronDown size={13} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link href={item.href} className={linkClass(active)} data-active={active} aria-current={active ? 'page' : undefined}>{item.label}</Link>
                  )}

                  <AnimatePresence>
                    {item.children && expanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="nav-menu absolute left-1/2 top-full z-50 mt-2 min-w-[232px] -translate-x-1/2 p-2"
                      >
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href} onClick={() => setActiveDropdown(null)} className="block rounded-xl px-3.5 py-2.5 text-[.9375rem] text-ink transition-colors hover:bg-midnight/[.06]">
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={LOGIN} target="_blank" rel="noopener noreferrer" className="nav-link text-[.875rem]">Agent login</a>
            <Link href="/get-started" className="btn btn-primary btn-sm">Get started</Link>
          </div>

          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} className="nav-burger relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-nav" data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-x-0 bottom-0 top-[60px] z-[49] overflow-y-auto bg-white lg:hidden">
            <div className="container flex flex-col pb-10 pt-2">
              {MOBILE_SECTIONS.map((section, sectionIdx) => (
                <div key={sectionIdx} className="flex flex-col">
                  {section.heading && <p className="mb-1 mt-8 text-[.8125rem] font-medium text-ink-soft">{section.heading}</p>}
                  {section.links.map(({ href, label }) => (
                    <Link key={href} href={href} onClick={() => setOpen(false)} className={`block border-b border-midnight/10 font-semibold tracking-[-.03em] text-midnight ${section.heading ? 'py-3 text-[1.25rem]' : 'py-4 text-[1.75rem]'}`}>
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="mt-9 flex flex-col gap-3">
                <Link href="/get-started" onClick={() => setOpen(false)} className="btn btn-primary">Get started</Link>
                <a href={LOGIN} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn btn-outline">Agent login</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
