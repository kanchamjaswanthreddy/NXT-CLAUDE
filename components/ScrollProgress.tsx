'use client'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/** Reading progress along the top edge: a thin gold line led by a small sun. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const left = useTransform(p, (v) => `${Math.min(100, Math.max(0, v * 100))}%`)
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1">
      <motion.div style={{ scaleX: p }} className="h-full origin-left bg-sunrise" />
      <motion.span style={{ left }} className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-midnight bg-sunrise" />
    </div>
  )
}
