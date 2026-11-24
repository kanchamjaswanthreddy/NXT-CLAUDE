import Image from 'next/image'
import type { ReactNode } from 'react'
import { Reveal } from './motion'

interface Props { eyebrow?: string; title: string; intro?: string; image?: string; imageAlt?: string; children?: ReactNode; numeral?: string }

/** Flat page opener: sky background, ink type, framed photograph with an offset block, moving strip below. */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = '', children, numeral }: Props) {
  const word = eyebrow ?? 'NXT'
  return (
    <section className="relative overflow-hidden bg-sky pt-[84px]">
      <div className={`container grid grid-cols-1 items-center gap-12 pb-20 pt-14 md:pt-20 ${image ? 'lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-24' : 'lg:pb-24'}`}>
        <div className={image ? '' : 'max-w-[900px]'}>
          {eyebrow && <Reveal><p className="chip mb-6">{eyebrow}</p></Reveal>}
          {numeral && <Reveal><p className="numeral mb-2 text-5xl">{numeral}</p></Reveal>}
          <Reveal delay={0.08}><h1 className="display-xl">{title}</h1></Reveal>
          {intro && <Reveal delay={0.16}><p className="lead mt-7 max-w-[600px] text-midnight/85">{intro}</p></Reveal>}
          {children && <Reveal delay={0.24}><div className="mt-9">{children}</div></Reveal>}
        </div>
        {image && (
          <Reveal delay={0.2} className="relative mx-auto w-full max-w-[520px] pb-3 pr-3 lg:max-w-none">
            <div aria-hidden="true" className="bob-slow absolute -right-4 -top-8 h-28 w-28 rounded-full border-2 border-midnight bg-sunrise" />
            <div className="flat relative aspect-[5/4] rotate-1 overflow-hidden"><Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /></div>
          </Reveal>
        )}
      </div>
      <div aria-hidden="true" className="overflow-hidden border-y-2 border-midnight bg-midnight py-3 text-white">
        <ul className="band-track flex w-max items-center font-display text-sm font-extrabold uppercase tracking-[.14em]">{Array.from({ length: 24 }, (_, i) => <li key={i} className="flex items-center whitespace-nowrap">{word}<span className="mx-6 text-sunrise">✦</span></li>)}</ul>
      </div>
    </section>
  )
}
