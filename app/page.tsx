import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, X, Scale, Landmark, Users, PhoneCall } from 'lucide-react'
import HeroV5 from '@/components/HeroV5'
import CrossBands from '@/components/CrossBands'
import StartHere from '@/components/StartHere'
import ShapedPhoto from '@/components/ShapedPhoto'
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
      <HeroV5 />

      {/* STATS */}
      <section className="bg-sunrise text-midnight">
        <Stagger as="ul" className="container grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-4 md:py-14">
          {STATS.map(([Icon, v, suf, l]) => (
            <Item as="li" key={l} className="border-l-2 border-midnight/25 pl-5"><Icon size={22} aria-hidden="true" /><p className="mt-3 font-display text-5xl font-extrabold leading-none tracking-[-.04em] md:text-7xl"><Counter value={v} suffix={suf} /></p><p className="mt-2 text-sm font-semibold">{l}</p></Item>
          ))}
        </Stagger>
      </section>

      <CrossBands />
      <StartHere />

      {/* BRING YOUR PLAN TO LIFE */}
      <section className="relative overflow-hidden pb-20 md:pb-28">
        <div aria-hidden="true" className="glow -left-40 top-20 h-[460px] w-[460px] bg-sunrise/15" />
        <div className="container grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="relative">
            <ShapedPhoto src="/images/advisors.png" alt="NXT advisors in a planning meeting" shape="leafR" sizes="(min-width:1024px) 45vw, 100vw" className="mr-4" />
            <div className="card absolute -bottom-6 -right-2 w-[260px] rounded-2xl p-5 shadow-lift md:-right-8"><p className="label-sm">Your first meeting</p><p className="mt-1 font-display text-xl font-semibold text-navy">45 minutes. No products. Just where you stand.</p></div>
          </Reveal>
          <div>
            <Reveal><p className="label-sm mb-5">Reach your retirement goals</p><h2 className="display">A plan that fits your family, built by one advisor <span className="text-gold">who stays.</span></h2></Reveal>
            <Reveal delay={0.1}><p className="lead mt-6 text-ink-soft">The person who meets you first is the person who places your coverage, reviews it every year and picks up the phone when something changes. We map your income gap, your care plan, your Medicare choices and your legacy, then we put the whole market to work on each piece.</p></Reveal>
            <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">{['Guaranteed income sized to your essentials', 'A funded long-term care plan', 'Medicare that keeps your doctors', 'Life insurance sized honestly, not by rule of thumb'].map((t) => <Item as="li" key={t} className="flex items-start gap-3 text-[15px]"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-midnight"><Check size={11} strokeWidth={3} /></span>{t}</Item>)}</Stagger>
            <Reveal delay={0.2}><Link href="/contact" className="btn btn-primary mt-10">Book a consultation <ArrowRight size={16} /></Link></Reveal>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div className="max-w-[640px]"><p className="label-sm mb-5">Five solutions</p><h2 className="display">Everything we do fits on <span className="text-gold">one hand.</span></h2></div><Link href="/solutions" className="link self-start">All five, in detail <ArrowRight size={16} /></Link></Reveal>
          <SolutionCards />
        </div>
      </section>

      {/* CARRIERS */}
      <section className="section overflow-hidden">
        <div className="container">
          <Reveal className="mb-12 max-w-[700px] text-center md:mx-auto"><p className="label-sm mb-5">Trusted partners</p><h2 className="display">Connected to the carriers behind the <span className="text-gold">guarantees.</span></h2><p className="lead mt-5 text-ink-soft">A promise to pay is only as good as the company making it. We place business only with carriers rated A- or better by AM Best, and we compare them for you.</p></Reveal>
          <CarrierWall />
          <div className="mt-8 text-center"><Link href="/carriers" className="btn btn-outline">See all carriers by solution <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="on-dark relative isolate overflow-hidden bg-midnight">
        <Image src="/images/atrium.png" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-20" style={{ filter: 'saturate(0.5)' }} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/60" />
        <div className="container py-24 md:py-32">
          <Reveal className="max-w-[980px]"><p className="label-sm mb-6">Why independent matters</p><h2 className="display-xl text-white">A captive agent has one product line and a quota. <span className="text-sunrise">We have neither.</span></h2></Reveal>
          <Stagger className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Item className="rounded-[28px] border border-white/15 bg-white/[.06] p-8 md:p-10">
              <h3 className="text-lg font-bold !text-platinum">A captive agent</h3>
              <ul className="mt-6 divide-y divide-white/10 text-[17px] text-platinum">{['Recommends from one company\u2019s products', 'Works toward a sales quota', 'Starts the conversation with the product'].map((t) => <li key={t} className="flex items-start gap-4 py-4"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10"><X size={13} strokeWidth={3} /></span>{t}</li>)}</ul>
            </Item>
            <Item className="rounded-[28px] bg-sunrise p-8 text-midnight shadow-lift md:p-10 lg:-rotate-1">
              <h3 className="text-lg font-extrabold !text-midnight">NXT Financial Group</h3>
              <ul className="mt-6 divide-y divide-midnight/20 text-[17px] font-semibold">{['Recommends from any of forty carriers', 'Carries no quota with any of them', 'Starts with your income gap, your health, your family, your timeline'].map((t) => <li key={t} className="flex items-start gap-4 py-4"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-midnight text-sunrise"><Check size={13} strokeWidth={3} /></span>{t}</li>)}</ul>
            </Item>
          </Stagger>
          <Reveal delay={0.1} className="mt-12"><Link href="/about" className="btn btn-ghost">About NXT <ArrowUpRight size={16} /></Link></Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <section className="section">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start"><p className="label-sm mb-5">Questions, answered</p><h2 className="display">What people ask before they <span className="text-gold">call.</span></h2><p className="lead mt-5 text-ink-soft">If yours is not here, ask it. We answer every message within a business day.</p><Link href="/contact" className="btn btn-outline mt-8">Ask a question</Link></Reveal>
          <Reveal delay={0.1}><Faq /></Reveal>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="label-sm mb-5">Insights</p><h2 className="display">Read before you <span className="text-gold">decide.</span></h2></div><Link href="/insights" className="link self-start">All articles <ArrowRight size={16} /></Link></Reveal>
          <Stagger as="ul" className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Item as="li" key={p.slug}><Link href={`/insights/${p.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden rounded-[24px]"><div className="relative aspect-[4/3] bg-stone"><Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ filter: 'saturate(0.85)' }} /></div><div className="flex flex-1 flex-col p-6"><p className="mono text-xs text-gold">{p.date} · {p.readTime}</p><h3 className="display-sm mt-2 text-[1.35rem] group-hover:text-command">{p.title}</h3><p className="mt-2 flex-1 text-[14px] text-ink-soft">{p.excerpt}</p><span className="link mt-4 text-sm">Read the full story <ArrowRight size={15} /></span></div></Link></Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
