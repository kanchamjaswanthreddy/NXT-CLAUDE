import type { ReactNode } from 'react'
import { Reveal } from './motion'
import ShapedPhoto, { shapeFor } from './ShapedPhoto'

interface Props { eyebrow?: string; title: string; intro?: string; image?: string; imageAlt?: string; children?: ReactNode; numeral?: string }

/** Bold gold page opener: giant outlined keyword, text left, shaped photograph right, moving strip below. */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '', children, numeral }: Props) {
  const word = eyebrow ?? 'NXT'
  return (
    <section className="hero-gold relative isolate overflow-hidden bg-sunrise pt-[84px]">
      <div aria-hidden="true" className="outline-dark pointer-events-none absolute -left-2 top-[92px] -z-10 select-none whitespace-nowrap font-display text-[clamp(6rem,19vw,18rem)] font-extrabold uppercase leading-[.8] tracking-[-.06em]">{word}</div>
      <svg viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="pointer-events-none absolute -bottom-72 -right-64 -z-10 hidden h-[640px] w-[640px] text-navy/25 lg:block"><circle cx="300" cy="300" r="296" strokeDasharray="4 14" /><circle cx="300" cy="300" r="240" /><circle cx="300" cy="300" r="180" strokeDasharray="60 18" /><circle cx="300" cy="300" r="118" /></svg>
      <div className={`container grid grid-cols-1 gap-12 pb-20 pt-16 md:pt-24 ${image ? 'lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:pb-28' : 'lg:pb-28'}`}>
        <div className={image ? '' : 'max-w-[900px]'}>
          {eyebrow && <Reveal><p className="label-sm mb-6">{eyebrow}</p></Reveal>}
          {numeral && <Reveal><p className="numeral mb-2 text-5xl">{numeral}</p></Reveal>}
          <Reveal delay={0.08}><h1 className="display-xl text-midnight">{title}</h1></Reveal>
          {intro && <Reveal delay={0.16}><p className="lead mt-7 max-w-[600px] font-medium text-midnight/85">{intro}</p></Reveal>}
          {children && <Reveal delay={0.24}><div className="mt-9">{children}</div></Reveal>}
        </div>
        {image && (
          <Reveal delay={0.2} className="mx-auto w-full max-w-[520px] pr-4 lg:max-w-none">
            <ShapedPhoto src={image} alt={imageAlt} shape={shapeFor(title)} frame="navy" priority />
          </Reveal>
        )}
      </div>
      <div aria-hidden="true" className="overflow-hidden bg-midnight py-3 text-sunrise">
        <ul className="band-track flex w-max items-center font-display text-sm font-extrabold uppercase tracking-[.14em]">{Array.from({ length: 24 }, (_, i) => <li key={i} className="flex items-center whitespace-nowrap">{word}<span className="mx-6 text-white">✦</span></li>)}</ul>
      </div>
    </section>
  )
}
