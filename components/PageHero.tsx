import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { Reveal } from './motion'
import Landscape from './scene/Landscape'
import { Cloud, Sun } from './scene/parts'
import { colorAt, HILL_A, HILL_B, PAGE_TIME, SKY } from '@/lib/sky'

interface Props {
  eyebrow?: string
  title: string
  intro?: string
  image?: string
  imageAlt?: string
  /** A code-drawn graphic to show instead of a photograph. */
  visual?: ReactNode
  children?: ReactNode
  numeral?: string
  /** Time of day, 0 (sunrise) to 1 (sunset). Defaults to the page's entry in lib/sky.ts. */
  time?: number
}

/**
 * Inner page opener. Every page sits at its own time of day in the same landscape as the home
 * page: the sky colour and the sun's position come from `time`. Text on the left; a graphic or
 * a framed photograph on the right when the page has one; hills and a road along the bottom.
 */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '', visual, children, numeral, time }: Props) {
  const word = eyebrow ?? 'NXT'
  const t = Math.min(0.78, Math.max(0.1, time ?? PAGE_TIME[(eyebrow ?? '').toLowerCase()] ?? 0.31))
  const sky = { backgroundColor: colorAt(SKY, t), '--hill-a': colorAt(HILL_A, t), '--hill-b': colorAt(HILL_B, t) } as CSSProperties
  const sun = { '--sx': `${Math.round(60 + t * 36)}%`, '--sy': `${Math.round((1 - Math.sin(Math.PI * t)) * 170 + 142)}px` } as CSSProperties
  const side = Boolean(visual || image)
  return (
    <section>
      <div className="page-hero relative overflow-hidden pt-[84px]" style={sky}>
        <Cloud className="cloud cloud-a" />
        <Cloud className="cloud cloud-b" />
        <Sun className="page-sun" style={sun} />
        <div className={`container relative z-10 grid grid-cols-1 items-center gap-12 pb-[120px] pt-12 md:pt-16 lg:gap-16 lg:pb-[150px] ${side ? 'lg:grid-cols-[1.2fr_1fr]' : ''}`}>
          <div className={side ? '' : 'max-w-[860px]'}>
            {eyebrow && <Reveal><p className="chip mb-6">{eyebrow}</p></Reveal>}
            {numeral && <Reveal><p className="numeral mb-2 text-5xl">{numeral}</p></Reveal>}
            <Reveal delay={0.08}><h1 className="display-xl">{title}</h1></Reveal>
            {intro && <Reveal delay={0.16}><p className="lead mt-7 max-w-[600px] text-midnight/85">{intro}</p></Reveal>}
            {children && <Reveal delay={0.24}><div className="mt-9">{children}</div></Reveal>}
          </div>
          {visual ? (
            <Reveal delay={0.2} className="relative mx-auto flex w-full max-w-[440px] justify-center py-4">
              <div className="relative w-full rotate-2">{visual}</div>
            </Reveal>
          ) : image ? (
            <Reveal delay={0.2} className="relative mx-auto w-full max-w-[520px] pb-3 pr-3 lg:max-w-none">
              <div className="flat relative aspect-[5/4] rotate-1 overflow-hidden"><Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /></div>
            </Reveal>
          ) : null}
        </div>
        <Landscape className="landscape-sm" />
      </div>
      <div aria-hidden="true" className="overflow-hidden border-y-2 border-midnight bg-midnight py-3 text-white">
        <ul className="band-track flex w-max items-center font-display text-sm font-extrabold uppercase tracking-[.14em]">{Array.from({ length: 24 }, (_, i) => <li key={i} className="flex items-center whitespace-nowrap">{word}<span className="mx-6 text-sunrise">✦</span></li>)}</ul>
      </div>
    </section>
  )
}
