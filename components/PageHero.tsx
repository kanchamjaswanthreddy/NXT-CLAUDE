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

/**
 * Inner page opener: a large title on pale grey with room to breathe, and a photograph in a
 * rounded frame beside it when the page has one.
 */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '', imageDepth, visual, children }: Props) {
  const side = Boolean(visual || image)
  return (
    <section className="page-hero">
      <div className={`container grid grid-cols-1 gap-12 lg:gap-20 ${side ? 'items-end lg:grid-cols-[1.08fr_.92fr]' : ''}`}>
        <div className={side ? 'lg:pb-2' : 'max-w-[940px]'}>
          {eyebrow && <p className="chip rise mb-5" style={i(0)}>{eyebrow}</p>}
          <h1 className="display-xl rise" style={i(1)}>{title}</h1>
          {intro && <p className="lead rise mt-7 max-w-[620px] text-ink-soft" style={i(2)}>{intro}</p>}
          {children && <div className="rise mt-9" style={i(3)}>{children}</div>}
        </div>
        {visual ? (
          <div className="rise mx-auto w-full max-w-[520px] lg:max-w-none" style={i(3)}>{visual}</div>
        ) : image ? (
          <figure className="page-hero-media rise aspect-[5/4] w-full" style={i(3)}>
            <DepthPhoto src={image} depth={imageDepth ?? depthFor(image)} alt={imageAlt} sizes="(min-width: 1024px) 44vw, 100vw" priority />
          </figure>
        ) : null}
      </div>
    </section>
  )
}
