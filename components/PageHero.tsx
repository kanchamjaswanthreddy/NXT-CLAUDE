import Image from 'next/image'
import type { ReactNode } from 'react'
import { Reveal } from './motion'

interface Props { eyebrow?: string; title: string; intro?: string; image?: string; imageAlt?: string; children?: ReactNode; numeral?: string }

/** Dark page opener: full-width photograph behind the text when the page has one, giant outlined keyword, moving strip below. */
export default function PageHero({ eyebrow, title, intro, image, children, numeral }: Props) {
  const word = eyebrow ?? 'NXT'
  return (
    <section className="hero-dark on-dark relative isolate overflow-hidden bg-midnight pt-[84px]">
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="-z-30 object-cover" />}
      {image && <div aria-hidden="true" className="photo-fade absolute inset-0 -z-20" />}
      {!image && <div aria-hidden="true" className="glow -left-40 -top-20 -z-20 h-[520px] w-[520px] bg-command/50" />}
      {!image && <div aria-hidden="true" className="glow -right-32 bottom-0 -z-20 h-[420px] w-[420px] bg-sunrise/15" />}
      <div aria-hidden="true" className="outline-text pointer-events-none absolute -left-2 top-[92px] -z-10 select-none whitespace-nowrap font-display text-[clamp(6rem,19vw,18rem)] font-extrabold uppercase leading-[.8] tracking-[-.06em]">{word}</div>
      <div className="container pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="max-w-[820px]">
          {eyebrow && <Reveal><p className="label-sm mb-6">{eyebrow}</p></Reveal>}
          {numeral && <Reveal><p className="numeral mb-2 text-5xl">{numeral}</p></Reveal>}
          <Reveal delay={0.08}><h1 className="display-xl text-white">{title}</h1></Reveal>
          {intro && <Reveal delay={0.16}><p className="lead mt-7 max-w-[620px] !text-white/85">{intro}</p></Reveal>}
          {children && <Reveal delay={0.24}><div className="mt-9">{children}</div></Reveal>}
        </div>
      </div>
      <div aria-hidden="true" className="overflow-hidden border-t border-white/10 bg-navy py-3 text-white">
        <ul className="band-track flex w-max items-center font-display text-sm font-extrabold uppercase tracking-[.14em]">{Array.from({ length: 24 }, (_, i) => <li key={i} className="flex items-center whitespace-nowrap">{word}<span className="mx-6 text-sunrise">✦</span></li>)}</ul>
      </div>
    </section>
  )
}
