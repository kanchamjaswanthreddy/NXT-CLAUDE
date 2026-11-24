import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, X, Scale, Landmark, Users, PhoneCall } from 'lucide-react'
import HeroFlat from '@/components/HeroFlat'
import CrossBands from '@/components/CrossBands'
import LifeTimeline from '@/components/LifeTimeline'
import SolutionCards from '@/components/SolutionCards'
import CarrierWall from '@/components/CarrierWall'
import Faq from '@/components/Faq'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import { Reveal, Stagger, Item, Counter } from '@/components/motion'
import { posts } from '@/lib/insights'

const STATS = [[Landmark, 70, '+', 'Carrier partners'], [Users, 50, '', 'States licensed'], [Scale, 5, '', 'Disciplines, practiced daily'], [PhoneCall, 1, ' day', 'To hear back from us']] as const

export const metadata: Metadata = {
  title: 'NXT Financial Group | IMO — Independent Marketing Organization',
  description: 'NXT Financial Group is a leading IMO (Independent Marketing Organization) comparing 70+ top-rated insurance carriers. Annuities, life insurance, Medicare, disability, care planning and home & auto — all 50 states.',
  openGraph: { title: 'NXT Financial Group | IMO — Independent Marketing Organization', description: 'Compare 70+ carriers across 6 insurance disciplines. One advisor, one plan, every option.', images: ['/og-image.png'] },
  alternates: { canonical: 'https://www.nxtfinancialgroup.com' },
}

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does it cost anything to work with NXT?', acceptedAnswer: { '@type': 'Answer', text: 'No. We are compensated by the carrier that issues your policy or contract. You never pay us a fee, and our compensation does not change the rate you receive.' } },
    { '@type': 'Question', name: 'Are you tied to one insurance company?', acceptedAnswer: { '@type': 'Answer', text: 'No. We are independent and hold appointments with many carriers rated A- or better by AM Best. We carry no quota with any of them, so the recommendation is the one that fits.' } },
    { '@type': 'Question', name: 'I am turning 65. When should I call?', acceptedAnswer: { '@type': 'Answer', text: 'Ideally three to six months before your birthday. Your initial enrollment window opens three months before the month you turn 65 and closes three months after.' } },
    { '@type': 'Question', name: 'Can you review policies I already own?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A policy review is often the most useful first meeting: we look at what you have, what it costs and whether it still does the job.' } },
    { '@type': 'Question', name: 'Where are you licensed?', acceptedAnswer: { '@type': 'Answer', text: 'Our headquarters is in Everett, Massachusetts, and we are licensed to serve clients in all 50 states.' } },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />
      <HeroFlat />

      {/* STATS */}
      <section className="bg-sky pb-16 md:pb-24">
        <Stagger as="ul" className="container grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map(([Icon, v, suf, l]) => (
            <Item as="li" key={l} className="flat p-5 md:p-7"><span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-midnight bg-sunrise text-midnight"><Icon size={20} aria-hidden="true" /></span><p className="mt-4 font-display text-5xl font-extrabold leading-none tracking-[-.04em] text-midnight md:text-6xl"><Counter value={v} suffix={suf} /></p><p className="mt-2 text-sm font-semibold text-ink-soft">{l}</p></Item>
          ))}
        </Stagger>
      </section>

      <CrossBands />
      <LifeTimeline />

      {/* BRING YOUR PLAN TO LIFE */}
      <section className="section bg-white">
        <div className="container grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="relative pb-4 pr-4">
            <div aria-hidden="true" className="bob-slow absolute -left-6 -top-8 h-24 w-24 rounded-full border-2 border-midnight bg-sky" />
            <div className="on-dark relative -rotate-2 rounded-[28px] border-2 border-midnight bg-navy p-8 shadow-[10px_10px_0_var(--color-sunrise)] md:p-12">
              <p className="label-sm">Your first meeting</p>
              <p className="display-xl mt-6 text-white">45 minutes. No products. Just where you stand.</p>
            </div>
          </Reveal>
          <div>
            <Reveal><p className="chip mb-5">Reach your retirement goals</p><h2 className="display">A plan that fits your family, built by one advisor <span className="hl">who stays.</span></h2></Reveal>
            <Reveal delay={0.1}><p className="lead mt-6 text-ink-soft">The person who meets you first is the person who places your coverage, reviews it every year and picks up the phone when something changes. We map your income gap, your care plan, your Medicare choices and your legacy, then we put the whole market to work on each piece.</p></Reveal>
            <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">{['Guaranteed income sized to your essentials', 'A funded long-term care plan', 'Medicare that keeps your doctors', 'Life insurance sized honestly, not by rule of thumb'].map((t) => <Item as="li" key={t} className="flex items-start gap-3 text-[15px] font-medium text-midnight"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-midnight text-sunrise"><Check size={11} strokeWidth={3.5} /></span>{t}</Item>)}</Stagger>
            <Reveal delay={0.2}><Link href="/contact" className="btn btn-primary mt-10">Book a consultation <ArrowRight size={16} /></Link></Reveal>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section bg-sky">
        <div className="container">
          <Reveal className="mx-auto mb-14 max-w-[900px] text-center"><p className="chip mb-5">Five solutions</p><h2 className="display-xl">Everything we do fits on <span className="hl">one hand.</span></h2><Link href="/solutions" className="link mt-6">All five, in detail <ArrowRight size={16} /></Link></Reveal>
          <SolutionCards />
        </div>
      </section>

      {/* CARRIERS */}
      <section className="section overflow-hidden bg-cream">
        <div className="container">
          <Reveal className="mb-12 max-w-[760px] text-center md:mx-auto"><p className="chip mb-5">Trusted partners</p><h2 className="display">Connected to the carriers behind the <span className="hl">guarantees.</span></h2><p className="lead mt-5 text-ink-soft">A promise to pay is only as good as the company making it. We place business only with carriers rated A- or better by AM Best, and we compare them for you.</p></Reveal>
          <CarrierWall />
          <div className="mt-8 text-center"><Link href="/carriers" className="btn btn-outline">See all carriers by solution <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="on-dark bg-midnight">
        <div className="container py-24 md:py-32">
          <Reveal className="max-w-[980px]"><p className="label-sm mb-6">Why independent matters</p><h2 className="display-xl text-white">A captive agent has one product line and a quota. <span className="hl">We have neither.</span></h2></Reveal>
          <Stagger className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Item className="rounded-[22px] border-2 border-white/40 p-8 md:p-10">
              <h3 className="font-display text-xl font-bold !text-platinum">A captive agent</h3>
              <ul className="mt-6 divide-y divide-white/15 text-[17px] text-platinum">{['Recommends from one company\u2019s products', 'Works toward a sales quota', 'Starts the conversation with the product'].map((t) => <li key={t} className="flex items-start gap-4 py-4"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white/40"><X size={12} strokeWidth={3} /></span>{t}</li>)}</ul>
            </Item>
            <Item className="rounded-[22px] border-2 border-midnight bg-sky p-8 text-midnight shadow-[10px_10px_0_var(--color-sunrise)] md:p-10 lg:-rotate-1">
              <h3 className="font-display text-xl font-extrabold !text-midnight">NXT Financial Group</h3>
              <ul className="mt-6 divide-y divide-midnight/20 text-[17px] font-semibold">{['Recommends from any of forty carriers', 'Carries no quota with any of them', 'Starts with your income gap, your health, your family, your timeline'].map((t) => <li key={t} className="flex items-start gap-4 py-4"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-midnight text-sunrise"><Check size={13} strokeWidth={3.5} /></span>{t}</li>)}</ul>
            </Item>
          </Stagger>
          <Reveal delay={0.1} className="mt-14"><Link href="/about" className="btn btn-ghost">About NXT <ArrowUpRight size={16} /></Link></Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <section className="section">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start"><p className="chip mb-5">Questions, answered</p><h2 className="display">What people ask before they <span className="hl">call.</span></h2><p className="lead mt-5 text-ink-soft">If yours is not here, ask it. We answer every message within a business day.</p><Link href="/contact" className="btn btn-outline mt-8">Ask a question</Link></Reveal>
          <Reveal delay={0.1}><Faq /></Reveal>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section bg-sky">
        <div className="container">
          <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="chip mb-5">Insights</p><h2 className="display">Read before you <span className="hl">decide.</span></h2></div><Link href="/insights" className="link self-start">All articles <ArrowRight size={16} /></Link></Reveal>
          <Stagger as="ul" className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Item as="li" key={p.slug}><Link href={`/insights/${p.slug}`} className="flat flat-hover group flex h-full flex-col overflow-hidden"><div className="relative aspect-[4/3] bg-stone"><Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ filter: 'saturate(0.85)' }} /></div><div className="flex flex-1 flex-col p-6"><p className="mono text-xs text-gold">{p.date} · {p.readTime}</p><h3 className="display-sm mt-2 text-[1.35rem] group-hover:text-command">{p.title}</h3><p className="mt-2 flex-1 text-[14px] text-ink-soft">{p.excerpt}</p><span className="link mt-4 text-sm">Read the full story <ArrowRight size={15} /></span></div></Link></Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
