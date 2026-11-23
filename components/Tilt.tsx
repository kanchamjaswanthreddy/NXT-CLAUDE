'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

/** Tilts its content in 3D toward the pointer. */
export default function Tilt({ children, className, max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sy = useSpring(ry, { stiffness: 180, damping: 18 })
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max)
  }
  const leave = () => { rx.set(0); ry.set(0) }
  return <motion.div onMouseMove={move} onMouseLeave={leave} style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }} className={className}>{children}</motion.div>
}
