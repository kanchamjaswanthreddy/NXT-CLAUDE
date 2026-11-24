import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronRight, Minus } from 'lucide-react'
import FilmHero from '@/components/FilmHero'
import Manifesto from '@/components/Manifesto'
import SolutionsFilm from '@/components/SolutionsFilm'
import DepthPhoto from '@/components/DepthPhoto'
import ScrollWords from '@/components/ScrollWords'
import CarrierDots from '@/components/CarrierDots'
import CarrierWall from '@/components/CarrierWall'
import Faq from '@/components/Faq'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import { Reveal, Stagger, Item, Counter } from '@/components/motion'
import { posts } from '@/lib/insights'
import { small } from '@/lib/media'

const STATS = [[70, '+', 'Carrier partners'], [50, '', 'States licensed'], [5, '', 'Disciplines, practiced daily'], [1, ' day', 'To hear back from us']] as const

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
    { '@type': 'Question', name: 'Where are you licensed?', acceptedAnswer: { '@type': 'Answer', text: 'Our headquarters is in Malden, Massachusetts, and we are licensed to serve clients in all 50 states.' } },
  ],
}

const PLAN = ['Guaranteed income sized to your essentials', 'A funded long-term care plan', 'Medicare that keeps your doctors', 'Life insurance sized honestly, not by rule of thumb']
const CAPTIVE = ['Recommends from one company’s products', 'Works toward a sales quota', 'Starts the conversation with the product']
const INDEPENDENT = ['Recommends from every carrier on the list', 'Carries no quota with any of them', 'Starts with your income gap, your health, your family, your timeline']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />

      {/* The film, full screen, drawing back into a frame as the page moves. */}
      <FilmHero />

      {/* WHO WE ARE: the introduction fills in word by word, then the numbers. */}
      <section className="bg-white pb-[clamp(5rem,11vw,10rem)] pt-[clamp(2rem,6vw,5rem)]">
        <div className="container">
          <Manifesto />
          <ul className="mt-[clamp(4rem,9vw,8rem)] grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-10">
            {STATS.map(([v, suf, label]) => (
              <li key={label} className="border-t border-midnight/15 pt-6">
                <p className="stat-num"><Counter value={v} suffix={suf} /></p>
                <p className="mt-3 text-ink-soft">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOLUTIONS: one pinned scene, five photographs dissolving into each other. */}
      <SolutionsFilm />

      {/* BRING YOUR PLAN TO LIFE */}
      <section className="section bg-white">
        <div className="container grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <Reveal>
            <figure className="tile aspect-[4/5] w-full lg:aspect-[5/6]">
              <DepthPhoto src="/media/family-advisor.jpg" depth="/media/depth/family-advisor.jpg" alt="A family around a table with their advisor" sizes="(min-width: 1024px) 46vw, 100vw" />
            </figure>
          </Reveal>
          <div>
            <p className="chip mb-4">Reach your retirement goals</p>
            <h2 className="display">A plan that fits your family, built by one advisor who stays.</h2>
            <p className="lead mt-6 text-ink-soft">The person who meets you first is the person who places your coverage, reviews it every year and picks up the phone when something changes. We map your income gap, your care plan, your Medicare choices and your legacy, then we put the whole market to work on each piece.</p>
            <ul className="mt-9 border-t border-midnight/10">
              {PLAN.map((t) => <li key={t} className="flex items-center gap-4 border-b border-midnight/10 py-4 font-medium tracking-[-.015em] text-midnight"><Check size={18} strokeWidth={2.25} className="shrink-0 text-gold" aria-hidden="true" />{t}</li>)}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-10">Book a consultation</Link>
          </div>
        </div>
      </section>

      {/* CARRIERS */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mx-auto mb-16 max-w-[860px] text-center">
            <p className="chip mb-4">Trusted partners</p>
            <h2 className="display">Connected to the carriers behind the guarantees.</h2>
            <p className="lead mx-auto mt-6 max-w-[640px] text-ink-soft">A promise to pay is only as good as the company making it. We place business only with carriers rated A- or better by AM Best, and we compare them for you.</p>
          </Reveal>
          <CarrierWall />
          <div className="mt-16 text-center"><Link href="/carriers" className="link">See all carriers by solution <ChevronRight size={17} /></Link></div>
        </div>
      </section>

      {/* WHY INDEPENDENT: one carrier against the whole list */}
      <section className="section on-dark bg-midnight">
        <div className="container">
          <p className="label-sm mb-5">Why independent matters</p>
          <ScrollWords as="h2" className="display-xl max-w-[14.5em]" text="A captive agent has one product line and a quota. We have neither." />
          <Stagger className="mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-1 gap-x-20 gap-y-16 lg:grid-cols-2">
            <Item>
              <h3 className="text-[1.375rem] font-semibold tracking-[-.03em] !text-silver">A captive agent</h3>
              <div className="mt-7"><CarrierDots mode="one" /></div>
              <ul className="mt-8 border-t border-white/10">{CAPTIVE.map((t) => <li key={t} className="flex items-start gap-4 border-b border-white/10 py-4 text-silver"><Minus size={18} className="mt-1 shrink-0" aria-hidden="true" />{t}</li>)}</ul>
            </Item>
            <Item>
              <h3 className="text-[1.375rem] font-semibold tracking-[-.03em]">NXT Financial Group</h3>
              <div className="mt-7"><CarrierDots mode="all" /></div>
              <ul className="mt-8 border-t border-white/15">{INDEPENDENT.map((t) => <li key={t} className="flex items-start gap-4 border-b border-white/15 py-4 font-medium text-white"><Check size={18} strokeWidth={2.25} className="mt-1 shrink-0 text-sunrise" aria-hidden="true" />{t}</li>)}</ul>
            </Item>
          </Stagger>
          <Link href="/about" className="link mt-14">About NXT <ChevronRight size={17} /></Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="chip mb-4">Questions, answered</p>
            <h2 className="display">What people ask before they call.</h2>
            <p className="lead mt-6 text-ink-soft">If yours is not here, ask it. We answer every message within a business day.</p>
            <Link href="/contact" className="link mt-7">Ask a question <ChevronRight size={17} /></Link>
          </div>
          <Faq />
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="section bg-stone">
        <div className="container">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div><p className="chip mb-4">Insights</p><h2 className="display">Read before you decide.</h2></div>
            <Link href="/insights" className="link self-start md:self-auto md:pb-2">All articles <ChevronRight size={17} /></Link>
          </div>
          <Stagger as="ul" className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Item as="li" key={p.slug}>
                <Link href={`/insights/${p.slug}`} className="group block">
                  <div className="tile aspect-[4/3] bg-platinum"><Image src={small(p.image)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045]" /></div>
                  <p className="mt-6 text-[.875rem] text-ink-soft">{p.date}, {p.readTime}</p>
                  <h3 className="mt-2 text-[1.375rem] font-semibold leading-[1.18] tracking-[-.03em] text-midnight">{p.title}</h3>
                  <p className="mt-3 text-[.9375rem] text-ink-soft">{p.excerpt}</p>
                  <span className="link mt-4 text-[.9375rem]">Read the full story <ChevronRight size={16} /></span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
