'use client'
import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * The opening statement, set large. Words fill in from faint to solid as the paragraph scrolls
 * up the screen, and each discipline links to its own page. The text itself is the site's
 * existing introduction, unchanged.
 */
const PARTS: { text: string; href?: string }[] = [
  { text: 'An independent agency for the five decisions that shape retirement:' },
  { text: 'annuities,', href: '/solutions/annuities' },
  { text: 'life insurance,', href: '/solutions/life-insurance' },
  { text: 'care planning,', href: '/solutions/care-planning' },
  { text: 'Medicare', href: '/solutions/medicare-planning' },
  { text: 'and' },
  { text: 'disability income.', href: '/solutions/disability-income' },
  { text: 'We compare A-rated carriers and explain every term before you sign one.' },
]
const TOTAL = PARTS.reduce((n, p) => n + p.text.split(' ').length, 0)

function Word({ children, progress, i, still }: { children: ReactNode; progress: MotionValue<number>; i: number; still: boolean }) {
  const opacity = useTransform(progress, [i / TOTAL, Math.min(1, (i + 2) / TOTAL)], [0.16, 1])
  return <motion.span style={{ opacity: still ? 1 : opacity }}>{children}</motion.span>
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const still = !!useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 50%'] })
  let n = 0
  return (
    <p ref={ref} className="manifesto">
      {PARTS.map((part, pi) => {
        const words = part.text.split(' ').map((w, wi) => {
          const i = n++
          return <span key={wi}><Word progress={scrollYProgress} i={i} still={still}>{w}</Word>{' '}</span>
        })
        return part.href ? <Link key={pi} href={part.href} className="manifesto-link">{words}</Link> : <span key={pi}>{words}</span>
      })}
    </p>
  )
}
