import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpRight, Check, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import PvNav from '@/components/pv/Nav'
import PvMotion from '@/components/pv/Motion'
import HeroFilm from '@/components/pv/HeroFilm'
import Head, { Note, Split } from '@/components/pv/Head'
import SolutionList from '@/components/pv/SolutionList'
import Quotes from '@/components/pv/Quotes'
import PvFaq from '@/components/pv/Faq'
import { Counter } from '@/components/motion'
import { solutions } from '@/lib/solutions'
import { allCarriers, whiteLogos } from '@/lib/carriers'
import { leadership } from '@/lib/team'
import { TESTIMONIALS } from '@/lib/testimonials'
import { QA } from '@/lib/faq'
import { small } from '@/lib/media'

const v = (vars: Record<string, string | number>) => vars as CSSProperties

const WORDMARK = ['N', 'X', 'T', ' ', 'F', 'I', 'N', 'A', 'N', 'C', 'I', 'A', 'L']
const HERO_LINES = ['Income you can’t outlive.', 'Care you can choose.', 'A legacy that lands.']

const STATEMENT: { text: string; href?: string }[] = [
  { text: 'An independent agency for the five decisions that shape retirement:' },
  { text: 'annuities,', href: '/solutions/annuities' },
  { text: 'life insurance,', href: '/solutions/life-insurance' },
  { text: 'care planning,', href: '/solutions/care-planning' },
  { text: 'Medicare', href: '/solutions/medicare-planning' },
  { text: 'and' },
  { text: 'disability income.', href: '/solutions/disability-income' },
  { text: 'We compare A-rated carriers and explain every term before you sign one.' },
]
const STATEMENT_WORDS = STATEMENT.reduce((n, p) => n + p.text.split(' ').length, 0)

const STATS = [[70, '+', 'Carrier partners'], [50, '', 'States licensed'], [5, '', 'Disciplines, practiced daily'], [1, ' day', 'To hear back from us']] as const

const SOLUTION_ALT: Record<string, string> = {
  annuities: 'A retired couple laughing with their advisor',
  'life-insurance': 'A family holding hands at the water’s edge',
  'care-planning': 'A caregiver helping an older man from his chair',
  'medicare-planning': 'A nurse talking with an older woman',
  'disability-income': 'Two women going through paperwork at a desk',
  'home-auto': 'A bright office atrium',
}

const STEPS = [
  { tone: 'peri', title: 'We listen first', text: 'Before any product comes up, we map where you stand today and what the plan has to do.' },
  { tone: 'blue', title: 'We compare\nthe whole market', text: 'Rates, caps and rider costs from every carrier on the list, side by side. We carry no quota with any of them, so the recommendation is the one that fits.' },
  { tone: 'ink', title: 'You choose.\nWe handle the rest', text: 'Applications, underwriting, transfers and delivery are ours to manage. The person who met you first reviews the plan with you every year.' },
] as const
const LISTEN = ['Your income gap', 'Your health', 'Your family', 'Your timeline']
const BARS = [['Carrier A', 58], ['Carrier B', 74], ['Carrier C', 93], ['Carrier D', 66], ['Carrier E', 45]] as const

const VALUES = [
  { letter: 'P', word: 'Partnership', hand: 'Win together or not at all.', text: 'We only succeed when our advisors and clients succeed.' },
  { letter: 'R', word: 'Responsibility', hand: 'Especially when no one is watching.', text: 'Do the right thing. Integrity is not a policy. It is a standard.' },
  { letter: 'O', word: 'Ownership', hand: 'Your book, your team, your future.', text: 'The people doing the work keep what they earn.' },
  { letter: 'T', word: 'Transparency', hand: 'Never buried in fine print.', text: 'Every fee, every split, every recommendation, explained clearly.' },
  { letter: 'E', word: 'Education', hand: 'We teach before we sell.', text: 'An informed client makes the best decision. An educated advisor builds the strongest business.' },
  { letter: 'C', word: 'Commitment', hand: 'We show up, fully, every single time.', text: 'To our clients. To our advisors. To the communities we serve.' },
  { letter: 'T', word: 'Trust', hand: 'Earned, never assumed.', text: 'Trust is earned through consistency, honesty, and results. Everything we do is designed to deserve it.' },
]

const TEAM_PHOTO: Record<string, string> = {
  'Shiv Thakur': 'shiv-thakur', 'James R. Vigeant': 'james-vigeant', 'Ashish Sood': 'ashish-sood', 'Sandeep Charaya': 'sandeep-charaya',
  'Sony Pradhan': 'sony-pradhan', 'Rigoberto Ayala': 'rigoberto-ayala', 'Alana Malla': 'alana-malla',
}
const TEAM = leadership.filter((m) => TEAM_PHOTO[m.name])

const COMPANY = [['/about', 'About NXT'], ['/carriers', 'Carrier partners'], ['/nxt-life', 'NXT Life'], ['/insights', 'Insights'], ['/careers', 'Careers'], ['/partner', 'For advisors'], ['/referral', 'Refer a friend'], ['/contact', 'Contact']]
const TOOLS = [['/calculators', 'Calculators'], ['/resources', 'Planning tools'], ['/get-started', 'Get started']]
const SOCIAL = [
  ['https://www.instagram.com/nxtfinancialgroup', 'Instagram', Instagram],
  ['https://www.facebook.com/people/NXT-Financial-Group/61589938040020/', 'Facebook', Facebook],
  ['https://www.linkedin.com/company/https-nxtfinancialgroup.com-/', 'LinkedIn', Linkedin],
  ['https://www.youtube.com/@NXTFinancialGroup', 'YouTube', Youtube],
] as const

const LOGOS = allCarriers.filter((c) => c.logo).slice(0, 30)
const LOGO_ROWS = [LOGOS.filter((_, i) => i % 2 === 0), LOGOS.filter((_, i) => i % 2 === 1)]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: QA.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

function Btn({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <Link href={href} className={`pv-btn ${className}`} data-magnet="0.22"><span className="pv-dot" />{children}</Link>
}

function Wordmark({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="pv-wm-line">
        {WORDMARK.map((ch, i) => ch === ' '
          ? <span key={i} className="pv-wm-gap pv-wm-fin" />
          : <span key={i} className={`pv-wm-ch${i > 3 ? ' pv-wm-fin' : ''}`} style={v({ '--i': i })}>{ch}</span>)}
      </div>
    </div>
  )
}

function LogoRow({ row, reverse = false }: { row: typeof LOGOS; reverse?: boolean }) {
  const tiles = (hidden: boolean) => row.map((c) => (
    <li key={c.slug} className="pv-logo-tile" aria-hidden={hidden || undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.logo} alt={hidden ? '' : c.name} loading="lazy" decoding="async" data-invert={whiteLogos.has(c.slug) || undefined} />
    </li>
  ))
  return (
    <div className="pv-marq-drift" style={v({ '--dir': reverse ? -1 : 1 })}>
      <ul className="pv-marq-track" data-rev={reverse || undefined}>{tiles(false)}{tiles(true)}</ul>
    </div>
  )
}

export default function Preview() {
  let word = 0
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('pv-seen'))document.documentElement.setAttribute('data-pv-seen','');else sessionStorage.setItem('pv-seen','1')}catch(e){}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <noscript><style>{'.pv-faq-a{grid-template-rows:1fr!important}.pv-nav{background:#fff}'}</style></noscript>

      {/* Opening curtain: plain CSS, gone in under two seconds, skipped on later visits in the same session. */}
      <div className="pv-curtain" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo-white.png" alt="" width={420} height={186} />
      </div>

      <PvNav />

      <main id="main" className="pv-main">
        {/* HERO: the name cut out of the film, the film underneath, the promise riding on it. */}
        <section className="pv-hero" data-prog="exit" aria-labelledby="pv-h1">
          <div className="pv-stage">
            <div className="pv-stage-media">
              <HeroFilm />
              <div className="pv-stage-tint" aria-hidden="true" />
            </div>
            <Wordmark className="pv-wm" />
            <div className="pv-film-zone">
              <div className="pv-hero-foot">
                <div className="pv-hero-copy">
                  <h1 id="pv-h1" className="pv-hero-h1">
                    {HERO_LINES.map((line, i) => <span key={line}><i style={v({ '--i': i })}>{line}</i>{' '}</span>)}
                  </h1>
                  <div className="pv-hero-row">
                    <Btn href="/contact" className="pv-btn-light">Book a free consultation</Btn>
                    <p>A-rated carriers only. Licensed in 50 states. <br />No cost to you.</p>
                  </div>
                </div>
                <Link href="/contact" className="pv-badge" data-magnet="0.3" aria-label="Book a free consultation">
                  <svg className="pv-badge-ring" viewBox="0 0 120 120" aria-hidden="true">
                    <defs><path id="pv-ring" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" /></defs>
                    <text><textPath href="#pv-ring" textLength="280">BOOK A FREE REVIEW ✦ BOOK A FREE REVIEW ✦</textPath></text>
                  </svg>
                  <ArrowUpRight className="pv-badge-arrow" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="pv-sec pv-about" aria-labelledby="pv-about-h">
          <div className="pv-wrap">
            <Head id="pv-about-h" note="Who we are" title={'Independent\nby design'} />
            <p className="pv-scrub" data-prog="" data-from="0.9" data-to="0.55" style={v({ '--n': STATEMENT_WORDS })}>
              {STATEMENT.map((part, pi) => {
                const words = part.text.split(' ').map((w, wi) => <span key={wi}><span className="pv-sw" style={v({ '--i': word++ })}>{w}</span>{' '}</span>)
                return part.href ? <Link key={pi} href={part.href}>{words}</Link> : <span key={pi}>{words}</span>
              })}
            </p>
            <div className="pv-center" data-rv="up"><Btn href="/about">About NXT</Btn></div>

            <ul className="pv-stats" data-rv="stagger">
              {STATS.map(([n, suffix, label], i) => (
                <li key={label} style={v({ '--i': i })}>
                  <p className="pv-stat-n"><Counter value={n} suffix={suffix} /></p>
                  <p className="pv-stat-l">{label}</p>
                </li>
              ))}
            </ul>

            <div className="pv-trio">
              <div className="pv-trio-cell" data-prog="" data-rv="clip" style={v({ '--drift': '70px' })}>
                <figure className="pv-ph pv-ph-a"><Image src="/media/care.jpg" alt="A caregiver helping an older man from his chair" fill sizes="(min-width: 800px) 26vw, 46vw" style={{ objectPosition: '26% 50%' }} /></figure>
              </div>
              <div className="pv-trio-cell" data-prog="" data-rv="clip" style={v({ '--drift': '-40px', '--d': '120ms' })}>
                <Note className="pv-trio-note" flip>One advisor, year after year</Note>
                <figure className="pv-ph pv-ph-b"><Image src="/media/family-advisor.jpg" alt="A family around a table with their advisor" fill sizes="(min-width: 800px) 46vw, 94vw" style={{ objectPosition: '50% 62%' }} /></figure>
              </div>
              <div className="pv-trio-cell" data-prog="" data-rv="clip" style={v({ '--drift': '110px', '--d': '240ms' })}>
                <figure className="pv-ph pv-ph-c"><Image src="/media/health.jpg" alt="New parents holding their baby" fill sizes="(min-width: 800px) 26vw, 46vw" style={{ objectPosition: '86% 50%' }} /></figure>
              </div>
            </div>
          </div>
        </section>

        {/* CARRIERS */}
        <section className="pv-sec pv-carriers" aria-labelledby="pv-carriers-h">
          <div className="pv-wrap">
            <Head id="pv-carriers-h" note="The power of choice" title="Our Carriers" sub="A promise to pay is only as good as the company making it. We place business only with carriers rated A- or better by AM Best, and we compare them for you." />
          </div>
          <div className="pv-marq" data-prog="">
            <LogoRow row={LOGO_ROWS[0]} />
            <LogoRow row={LOGO_ROWS[1]} reverse />
          </div>
          <div className="pv-center" data-rv="up"><Btn href="/carriers" className="pv-btn-line">See all carriers by solution</Btn></div>
        </section>

        {/* SOLUTIONS */}
        <section className="pv-panel" aria-labelledby="pv-solutions-h">
          <div className="pv-wrap">
            <Head id="pv-solutions-h" note="What we do" title="Our Solutions" sub="Retirement income, protection and care, planned together by one advisor." />
            <SolutionList rows={solutions.map((s) => ({ href: `/solutions/${s.slug}`, title: s.title, text: s.short, image: small(s.image), alt: SOLUTION_ALT[s.slug] ?? '' }))} />
            <div className="pv-center" data-rv="up"><Btn href="/solutions">Explore your options</Btn></div>
          </div>
        </section>

        {/* A band of facts that slides sideways with the scroll */}
        <div className="pv-band" data-prog="" aria-hidden="true">
          <p>70+ carriers <i>✦</i> 50 states <i>✦</i> One advisor <i>✦</i> No cost to you <i>✦</i> 70+ carriers <i>✦</i> 50 states</p>
          <p>One advisor <i>✦</i> No cost to you <i>✦</i> 70+ carriers <i>✦</i> 50 states <i>✦</i> One advisor <i>✦</i> No cost to you</p>
        </div>

        {/* HOW IT WORKS: three cards that stack as the page moves */}
        <section className="pv-sec pv-steps" aria-labelledby="pv-steps-h">
          <div className="pv-wrap">
            <Head id="pv-steps-h" note="How it works" title="Three Steps" sub="The person who meets you first is the person who places your coverage, reviews it every year and picks up the phone when something changes." />
            <ol className="pv-stack" data-stack="">
              {STEPS.map((s, i) => (
                <li key={s.title} className="pv-step" data-tone={s.tone} style={v({ '--i': i })}>
                  <div className="pv-step-copy">
                    <p className="pv-step-n" aria-hidden="true">0{i + 1}</p>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  {i === 0 && (
                    <div className="pv-art pv-art-pad" data-rv="art">
                      <div className="pv-sheets">
                      <div className="pv-sheet-back" aria-hidden="true" />
                      <div className="pv-sheet">
                        <p className="pv-hand">First conversation</p>
                        <ul>
                          {LISTEN.map((t, k) => (
                            <li key={t} style={v({ '--i': k })}>
                              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="6.5" /><path pathLength={1} d="M7 12.4l3.5 3.5 6.7-7.6" /></svg>{t}
                            </li>
                          ))}
                        </ul>
                        <p className="pv-sheet-foot">No products on the table yet.</p>
                      </div>
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="pv-art pv-art-bars" data-rv="art" aria-hidden="true">
                      <p className="pv-hand">Side by side</p>
                      <ul>
                        {BARS.map(([name, w], k) => (
                          <li key={name} data-best={k === 2 || undefined} style={v({ '--w': `${w}%`, '--i': k })}>
                            <span>{name}</span><i>{k === 2 && <em><Check size={14} strokeWidth={3} />Fits you best</em>}</i>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="pv-art pv-art-doc" data-rv="art" aria-hidden="true">
                      <div className="pv-doc-wrap">
                      <div className="pv-doc">
                        <span style={v({ '--w': '44%' })} /><span style={v({ '--w': '88%' })} /><span style={v({ '--w': '76%' })} /><span style={v({ '--w': '82%' })} /><span style={v({ '--w': '58%' })} />
                        <svg className="pv-sign" viewBox="0 0 230 74" fill="none"><path pathLength={1} d="M6 54C20 28 33 9 41 13c9 5-16 45-6 47 9 2 22-35 32-33 8 2-6 29 2 31 9 2 16-23 26-23 7 0 0 21 8 21 10 0 18-19 30-21 13-2 30 7 90-8" /></svg>
                        <b />
                      </div>
                      <div className="pv-stamp">
                        <svg viewBox="0 0 120 120"><defs><path id="pv-ring-2" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs><text><textPath href="#pv-ring-2" textLength="272">REVIEWED EVERY YEAR ✦ REVIEWED EVERY YEAR ✦</textPath></text></svg>
                        <Check size={30} strokeWidth={2.5} />
                      </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* VALUES */}
        <section className="pv-sec pv-values-sec" aria-labelledby="pv-values-h">
          <div className="pv-wrap">
            <Head id="pv-values-h" note="What we stand for" title="Our Values" sub="Seven promises that guide every plan we place and every advisor we train. Together they spell what we do." />
            <ul className="pv-values" data-rv="stagger">
              {VALUES.map((val, i) => (
                <li key={val.word} className="pv-val" style={v({ '--i': i })}>
                  <span className="pv-val-l" aria-hidden="true">{val.letter}</span>
                  <h3>{val.word}</h3>
                  <p className="pv-hand">{val.hand}</p>
                  <p className="pv-val-t">{val.text}</p>
                </li>
              ))}
              <li className="pv-val pv-val-cta" style={v({ '--i': 7 })}>
                <p className="pv-val-word"><span className="pv-sr">Protect</span><span aria-hidden="true">{VALUES.map((val, i) => <span key={i} style={v({ '--i': i })}>{val.letter}</span>)}</span></p>
                <p className="pv-val-t">Seven letters, one job.</p>
                <Link href="/about" className="pv-val-link">Read our story <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" /></Link>
              </li>
            </ul>
          </div>
        </section>

        {/* TEAM */}
        <section className="pv-sec pv-team-sec" aria-labelledby="pv-team-h">
          <div className="pv-wrap">
            <Head id="pv-team-h" note="Real people, real answers" title="Team NXT" sub="The leadership behind every plan we place and every advisor we train." />
            <ul className="pv-team" data-rv="stagger">
              {TEAM.map((m, i) => {
                const card = (
                  <>
                    <Image src={`/media/team/${TEAM_PHOTO[m.name]}.jpg`} alt="" fill sizes="(min-width: 900px) 24vw, 46vw" />
                    <span className="pv-person-meta"><span className="pv-person-name">{m.name}</span><span className="pv-person-role">{m.role}</span></span>
                  </>
                )
                return (
                  <li key={m.name} style={v({ '--i': i })}>
                    {m.link ? <Link href={m.link} className="pv-person" data-tilt="">{card}</Link> : <div className="pv-person" data-tilt="">{card}</div>}
                  </li>
                )
              })}
            </ul>
            <div className="pv-center" data-rv="up"><Btn href="/about#team">Meet the team</Btn></div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="pv-panel pv-quotes-sec" aria-labelledby="pv-quotes-h">
          <div className="pv-wrap">
            <Head id="pv-quotes-h" note="In their words" title="Kind Words" />
          </div>
          <Quotes items={TESTIMONIALS} />
        </section>

        {/* FAQ */}
        <section className="pv-sec pv-faq-sec" aria-labelledby="pv-faq-h">
          <div className="pv-wrap">
            <Head id="pv-faq-h" note="Ask us anything" title="Got Questions?" />
            <div className="pv-faq-grid">
              <div className="pv-faq-side" data-rv="up">
                <h3>What people ask before they call.</h3>
                <p>If yours is not here, ask it. We answer every message within a business day.</p>
                <Btn href="/contact" className="pv-btn-line">Ask a question</Btn>
              </div>
              <PvFaq />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: uncovered as the page lifts away, the name rising along its bottom edge. */}
      <footer className="pv-foot" data-prog="reveal">
        <div className="pv-foot-in">
          <div className="pv-foot-cta">
            <h2 aria-label="See where you stand." data-rv="split"><Split text="See where you stand." /></h2>
            <div data-rv="up">
              <p>A first conversation costs you nothing.</p>
              <Btn href="/contact" className="pv-btn-light">Book a free consultation</Btn>
            </div>
          </div>

          <div className="pv-foot-cols">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="pv-foot-logo" src="/media/logo-white.png" alt="NXT Financial Group" width={420} height={186} loading="lazy" />
              <ul className="pv-foot-contact">
                <li><a href="tel:8572053333">857-205-3333</a></li>
                <li><a href="mailto:info@nxtfinancialgroup.com">info@nxtfinancialgroup.com</a></li>
                <li>75 Pleasant Street, Unit 207, Malden, MA 02148</li>
              </ul>
              <ul className="pv-foot-social">
                {SOCIAL.map(([href, label, Icon]) => <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={17} /></a></li>)}
              </ul>
            </div>
            <nav aria-label="Solutions"><h3>Solutions</h3><ul>{solutions.map((s) => <li key={s.slug}><Link href={`/solutions/${s.slug}`}>{s.title}</Link></li>)}</ul></nav>
            <nav aria-label="Company"><h3>Company</h3><ul>{COMPANY.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul></nav>
            <nav aria-label="Tools"><h3>Tools</h3><ul>{TOOLS.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul></nav>
          </div>

          <p className="pv-foot-legal">NXT Financial Group is a licensed independent insurance agency headquartered in Massachusetts. Annuity and insurance guarantees are backed by the claims-paying ability of the issuing carrier. Product availability, features and rates vary by carrier and state. We do not offer every plan available in your area; contact Medicare.gov or 1-800-MEDICARE for all options. Estimates on this site are illustrative and not an offer of coverage.</p>

          <div className="pv-foot-wm-wrap" data-rv="wm"><Wordmark className="pv-foot-wm" /></div>

          <div className="pv-foot-base">
            <p>© {new Date().getFullYear()} NXT Financial Group, NXT World Holdings, Inc. All Rights Reserved.</p>
            <ul><li><Link href="/privacy-policy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li></ul>
          </div>
        </div>
      </footer>

      <PvMotion />
    </>
  )
}
