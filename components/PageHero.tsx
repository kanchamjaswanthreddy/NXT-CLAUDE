import type { ReactNode } from 'react'
import { Reveal } from './motion'
import Illo3D from './Illo3D'
import { iconFor } from '@/lib/icons'

interface Props { eyebrow?: string; title: string; intro?: string; image?: string; imageAlt?: string; children?: ReactNode; numeral?: string }

/** Dark page opener: giant outlined keyword, text left, 3D illustration right, moving strip below. `image` is accepted for compatibility but no longer shown. */
export default function PageHero({ eyebrow, title, intro, children, numeral }: Props) {
  const word = eyebrow ?? 'NXT'
  return (
    <section className="hero-dark on-dark relative isolate overflow-hidden bg-midnight pt-[84px]">
      <div aria-hidden="true" className="glow -left-40 -top-20 -z-10 h-[520px] w-[520px] bg-command/50" />
      <div aria-hidden="true" className="glow -right-32 bottom-0 -z-10 h-[420px] w-[420px] bg-sunrise/15" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <div aria-hidden="true" className="outline-text pointer-events-none absolute -left-2 top-[92px] -z-10 select-none whitespace-nowrap font-display text-[clamp(6rem,19vw,18rem)] font-extrabold uppercase leading-[.8] tracking-[-.06em]">{word}</div>
      <div className="container grid grid-cols-1 items-center gap-12 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-28">
        <div>
          {eyebrow && <Reveal><p className="label-sm mb-6">{eyebrow}</p></Reveal>}
          {numeral && <Reveal><p className="numeral mb-2 text-5xl">{numeral}</p></Reveal>}
          <Reveal delay={0.08}><h1 className="display-xl text-white">{title}</h1></Reveal>
          {intro && <Reveal delay={0.16}><p className="lead mt-7 max-w-[600px]">{intro}</p></Reveal>}
          {children && <Reveal delay={0.24}><div className="mt-9">{children}</div></Reveal>}
        </div>
        <Reveal delay={0.2} className="mx-auto hidden w-full max-w-[460px] sm:block"><Illo3D icon={iconFor(eyebrow)} /></Reveal>
      </div>
      <div aria-hidden="true" className="overflow-hidden border-t border-white/10 bg-navy py-3 text-white">
        <ul className="band-track flex w-max items-center font-display text-sm font-extrabold uppercase tracking-[.14em]">{Array.from({ length: 24 }, (_, i) => <li key={i} className="flex items-center whitespace-nowrap">{word}<span className="mx-6 text-sunrise">✦</span></li>)}</ul>
      </div>
    </section>
  )
}
