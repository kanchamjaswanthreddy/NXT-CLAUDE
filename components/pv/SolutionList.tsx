'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export interface Row { href: string; title: string; text: string; image: string; alt: string }

/**
 * The solutions as one tall list. With a mouse, the row under the pointer steps forward and its
 * photograph follows the pointer; on touch screens each row carries a small picture instead.
 */
export default function SolutionList({ rows }: { rows: Row[] }) {
  const [active, setActive] = useState(-1)
  const list = useRef<HTMLUListElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })
  const lean = useSpring(useTransform(useVelocity(sx), (v) => Math.max(-9, Math.min(9, v / 90))), { stiffness: 180, damping: 22 })

  const move = (e: ReactPointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const r = list.current?.getBoundingClientRect()
    if (!r) return
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  // Keyboard: there is no pointer to follow, so park the photograph beside the focused row.
  const focusRow = (i: number, row: HTMLElement) => {
    const r = list.current?.getBoundingClientRect()
    if (r && row.matches(':focus-visible')) {
      const b = row.getBoundingClientRect()
      x.set(r.width * 0.5)
      y.set(Math.max(0, b.top - r.top - 60))
    }
    setActive(i)
  }

  return (
    <ul ref={list} className="pv-sol" data-rv="rows" onPointerMove={move} onPointerLeave={() => setActive(-1)}>
      {rows.map((r, i) => (
        <li key={r.href} style={{ '--i': i } as CSSProperties}>
          <Link href={r.href} className="pv-sol-row" data-active={active === i || undefined} onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i) }} onFocus={(e) => focusRow(i, e.currentTarget)} onBlur={() => setActive(-1)}>
            <span className="pv-sol-t"><span className="pv-sol-arrow" aria-hidden="true"><ArrowRight strokeWidth={2.25} /></span>{r.title}</span>
            <span className="pv-sol-d">{r.text}</span>
            <span className="pv-sol-thumb" aria-hidden="true"><Image src={r.image} alt="" fill sizes="120px" /></span>
          </Link>
        </li>
      ))}
      <motion.li className="pv-sol-float" aria-hidden="true" role="presentation" style={{ x: sx, y: sy, rotate: lean }} data-on={active >= 0 || undefined}>
        <span className="pv-sol-float-in">
          {rows.map((r, i) => <Image key={r.href} src={r.image} alt="" fill sizes="400px" data-on={active === i || undefined} />)}
        </span>
      </motion.li>
    </ul>
  )
}
