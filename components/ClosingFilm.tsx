'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, type CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Phone } from 'lucide-react'
import Film from './Film'
import { FILMS } from '@/lib/media'
import { PIN_TALL, useMedia } from '@/lib/use-media'
import { useRamp } from '@/lib/ramp'

const HIDE = ['/contact', '/get-started', '/privacy-policy', '/terms']
const css = (vars: Record<string, unknown>) => vars as CSSProperties

function Closing() {
  const ref = useRef<HTMLDivElement>(null)
  const fx = useMedia(PIN_TALL)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const frame = useRamp(scrollYProgress, [0.2, 0.8], [1, 0])
  const scale = useRamp(scrollYProgress, [0.1, 0.9], [1.16, 1])
  const copyOpacity = useRamp(scrollYProgress, [0.56, 0.8], [0, 1])
  const copyY = useRamp(scrollYProgress, [0.56, 0.84], [44, 0])
  const reach = useTransform(copyOpacity, (v) => (v < 0.02 ? 'hidden' : 'visible'))

  return (
    <section aria-labelledby="closing-h" className="closing on-dark">
      <div ref={ref} className="closing-track">
        <div className="closing-stage">
          <motion.div className="film" style={fx ? css({ '--e': frame }) : undefined}>
            <Film film={FILMS.closing} scale={fx ? scale : undefined} />
            <div aria-hidden="true" className="closing-shade" />
          </motion.div>
          <motion.div className="closing-copy" style={fx ? { opacity: copyOpacity, y: copyY, visibility: reach } : undefined}>
            <p className="text-[.9375rem] font-semibold !text-white/75">Your first meeting</p>
            <h2 id="closing-h" className="display mt-3">45 minutes. No products. Just where you stand.</h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn btn-light">Book a free consultation</Link>
              <a href="tel:8572053333" className="btn btn-ghost"><Phone size={16} /> 857-205-3333</a>
            </div>
            <Link href="/solutions" className="link mt-6 justify-center !text-white">Explore solutions <ChevronRight size={17} /></Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Closing frame above the footer on every page except forms and legal pages. The evening film
 * rises as a rounded window and opens to fill the screen as you reach it: the home page's opening
 * move, in reverse.
 */
export default function ClosingFilm() {
  const pathname = usePathname()
  if (HIDE.some((p) => pathname.startsWith(p))) return null
  return <Closing />
}
