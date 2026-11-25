import type { CSSProperties, ReactNode } from 'react'
import { Car, HeartHandshake, ShieldCheck, Stethoscope, Sunrise, Users, Wallet } from 'lucide-react'

interface Props {
  /** Short label above the title, usually the section name. */
  eyebrow?: string
  title: string
  intro?: string
  /** A photograph from /public/media. If it has a depth map it moves as the page scrolls. */
  image?: string
  imageAlt?: string
  /** Depth map for the photograph, when it is not one of the standard /media files. */
  imageDepth?: string
  /** Anything to show in place of a photograph. */
  visual?: ReactNode
  children?: ReactNode
  /** Kept for callers that still pass them; no longer shown. */
  numeral?: string
  time?: number
}

const i = (n: number) => ({ '--i': n }) as CSSProperties
const KINDS = [
  { title: 'Annuities', Icon: Sunrise }, { title: 'Life Insurance', Icon: Users }, { title: 'Care Planning', Icon: HeartHandshake },
  { title: 'Medicare Planning', Icon: Stethoscope }, { title: 'Disability Income', Icon: Wallet }, { title: 'Home & Auto', Icon: Car },
]

/**
 * Inner page opener: a large title beside a moving diagram, with no photographs: the six kinds of
 * cover circle one advisor, light runs down each spoke, and three facts float around it. On a
 * solution page that solution's tile is the lit one.
 */
export default function PageHero({ eyebrow, title, intro, visual, children }: Props) {
  return (
    <section className="page-hero">
      <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.04fr_.96fr] lg:gap-16">
        <div>
          {eyebrow && <p className="chip rise mb-5" style={i(0)}>{eyebrow}</p>}
          <h1 className="display-xl rise" style={i(1)}>{title}</h1>
          {intro && <p className="lead rise mt-7 max-w-[620px] text-ink-soft" style={i(2)}>{intro}</p>}
          {children && <div className="rise mt-9" style={i(3)}>{children}</div>}
        </div>
        {visual ? (
          <div className="rise mx-auto w-full max-w-[520px] lg:max-w-none" style={i(3)}>{visual}</div>
        ) : (
          <div className="ha" aria-hidden="true">
            <span className="ha-glow" />
            <span className="ha-ring" />
            <span className="ha-ring" />
            <span className="ha-ring" />
            <ul className="ha-orbit">
              {KINDS.map(({ title: t, Icon }, k) => (
                <li key={t} style={{ '--k': k } as CSSProperties} data-on={eyebrow === t || undefined}>
                  <i />
                  <span className="ha-up"><span className="ha-chip"><span className="ha-ic"><Icon strokeWidth={1.75} /></span><b>{t}</b></span></span>
                </li>
              ))}
            </ul>
            <span className="ha-core"><ShieldCheck strokeWidth={1.6} /></span>
            <p className="ha-card ha-card-n rise" style={i(5)}><b>70+</b><span>carriers compared<br />by one advisor</span></p>
            <p className="ha-card ha-card-s rise" style={i(6)}><i />Licensed in 50 states</p>
            <p className="ha-card ha-card-c rise" style={i(7)}>No cost to you</p>
          </div>
        )}
      </div>
    </section>
  )
}
