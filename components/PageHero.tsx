import Image from 'next/image'
import type { ReactNode } from 'react'
import { Reveal } from './motion'

interface Props { eyebrow?: string; title: string; intro?: string; image?: string; imageAlt?: string; visual?: ReactNode; children?: ReactNode; numeral?: string }

/** Flat shapes shown when a page has neither a photo nor its own graphic. */
function Shapes() {
  return (
    <div aria-hidden="true" className="relative mx-auto hidden h-[300px] w-full max-w-[420px] lg:block">
      <div className="bob-slow absolute right-6 top-0 h-40 w-40 rounded-full border-2 border-midnight bg-sunrise" />
      <div className="bob absolute left-4 top-16 h-44 w-44 rotate-6 rounded-[28px] border-2 border-midnight bg-white shadow-[6px_6px_0_var(--color-midnight)]" />
      <div className="bob absolute bottom-2 right-16 h-24 w-56 -rotate-3 rounded-full border-2 border-midnight bg-navy" style={{ animationDelay: '1.2s' }} />
      <div className="pulse-ring absolute left-24 top-32 h-16 w-16 rounded-full border-2 border-midnight" />
      <div className="absolute left-24 top-32 h-16 w-16 rounded-full border-2 border-midnight bg-sky" />
    </div>
  )
}

/** Flat page opener: sky background, ink type, then a graphic, a framed photograph, or flat shapes; moving strip below. */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '', visual, children, numeral }: Props) {
  const word = eyebrow ?? 'NXT'
  return (
    <section className="relative overflow-hidden bg-sky pt-[84px]">
      <div className="container grid grid-cols-1 items-center gap-12 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          {eyebrow && <Reveal><p className="chip mb-6">{eyebrow}</p></Reveal>}
          {numeral && <Reveal><p className="numeral mb-2 text-5xl">{numeral}</p></Reveal>}
          <Reveal delay={0.08}><h1 className="display-xl">{title}</h1></Reveal>
          {intro && <Reveal delay={0.16}><p className="lead mt-7 max-w-[600px] text-midnight/85">{intro}</p></Reveal>}
          {children && <Reveal delay={0.24}><div className="mt-9">{children}</div></Reveal>}
        </div>
        {visual ? (
          <Reveal delay={0.2} className="relative mx-auto flex w-full max-w-[440px] justify-center py-6">
            <div aria-hidden="true" className="bob-slow absolute -right-2 -top-2 h-32 w-32 rounded-full border-2 border-midnight bg-sunrise" />
            <div className="relative w-full rotate-2">{visual}</div>
          </Reveal>
        ) : image ? (
          <Reveal delay={0.2} className="relative mx-auto w-full max-w-[520px] pb-3 pr-3 lg:max-w-none">
            <div aria-hidden="true" className="bob-slow absolute -right-4 -top-8 h-28 w-28 rounded-full border-2 border-midnight bg-sunrise" />
            <div className="flat relative aspect-[5/4] rotate-1 overflow-hidden"><Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /></div>
          </Reveal>
        ) : <Reveal delay={0.2}><Shapes /></Reveal>}
      </div>
      <div aria-hidden="true" className="overflow-hidden border-y-2 border-midnight bg-midnight py-3 text-white">
        <ul className="band-track flex w-max items-center font-display text-sm font-extrabold uppercase tracking-[.14em]">{Array.from({ length: 24 }, (_, i) => <li key={i} className="flex items-center whitespace-nowrap">{word}<span className="mx-6 text-sunrise">✦</span></li>)}</ul>
      </div>
    </section>
  )
}
