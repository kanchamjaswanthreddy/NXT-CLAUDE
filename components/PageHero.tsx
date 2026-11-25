import type { CSSProperties, ReactNode } from 'react'
import DepthPhoto from './DepthPhoto'
import { depthFor } from '@/lib/media'

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
const POOL = ['retirement', 'family', 'care', 'medicare', 'professional', 'advisors']

/**
 * Inner page opener: a large title beside a small composition: the page's photograph with two
 * smaller ones, three facts on floating cards, turning orbit rings and lines that carry light
 * between the pieces.
 */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '', imageDepth, visual, children }: Props) {
  const main = image ?? '/media/family-advisor.jpg'
  const [a, b] = POOL.filter((k) => !main.includes(k)).map((k) => `/media/${k}-800.jpg`)
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
          <div className="ha">
            <span className="ha-glow" aria-hidden="true" />
            <span className="ha-ring" aria-hidden="true" />
            <span className="ha-ring" aria-hidden="true" />
            <span className="ha-ring" aria-hidden="true" />
            <svg className="ha-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path id="ha-l1" d="M88 16 C 74 30, 66 12, 50 26" />
              <path id="ha-l2" d="M10 84 C 24 70, 30 88, 46 74" />
              <path id="ha-l3" d="M94 56 C 84 66, 80 52, 70 60" />
              <path id="ha-l4" d="M16 12 C 22 26, 12 34, 22 46" />
              {['ha-l1', 'ha-l2', 'ha-l3', 'ha-l4'].map((id, k) => (
                <circle key={id} r="1.1" className="ha-dot">
                  <animateMotion dur={`${2.2 + k * 0.35}s`} begin={`${k * 0.5}s`} repeatCount="indefinite"><mpath href={`#${id}`} /></animateMotion>
                </circle>
              ))}
            </svg>
            <figure className="ha-main rise" style={i(2)}>
              <DepthPhoto src={main} depth={imageDepth ?? depthFor(main)} alt={imageAlt} sizes="(min-width: 1024px) 30vw, 70vw" priority />
            </figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ha-thumb ha-thumb-a rise" style={i(4)} src={a} alt="" width={800} height={600} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ha-thumb ha-thumb-b rise" style={i(5)} src={b} alt="" width={800} height={600} />
            <p className="ha-card ha-card-n rise" style={i(5)}><b>70+</b><span>carriers compared<br />by one advisor</span></p>
            <p className="ha-card ha-card-s rise" style={i(6)}><i aria-hidden="true" />Licensed in 50 states</p>
            <p className="ha-card ha-card-c rise" style={i(7)}>No cost to you</p>
          </div>
        )}
      </div>
    </section>
  )
}
