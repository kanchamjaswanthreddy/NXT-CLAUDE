import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Mock, { mockFor } from '@/components/Mock'
import { Reveal, Stagger, Item } from '@/components/motion'
import { solutions, getSolution } from '@/lib/solutions'
import { carrierGroups } from '@/lib/carriers'

type Params = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return solutions.map((s) => ({ slug: s.slug })) }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { slug } = await params; const s = getSolution(slug); return s ? { title: `${s.title} — Compare Top Carriers`, description: `${s.short} NXT Financial Group compares 70+ carriers to find the right ${s.title.toLowerCase()} coverage for you.`, alternates: { canonical: `https://www.nxtfinancialgroup.com/solutions/${slug}` } } : {} }

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) notFound()
  const group = carrierGroups.find((g) => g.solution === slug)
  const i = solutions.findIndex((x) => x.slug === slug)
  const next = solutions[(i + 1) % solutions.length]
  return (
    <>
      <PageHero eyebrow={s.title} title={s.headline} intro={s.intro} visual={<Mock {...mockFor(slug)} className="max-w-none" />}>
        <Link href="/contact" className="btn btn-primary">Talk to an advisor about {s.title.toLowerCase()} <ArrowRight size={16} /></Link>
      </PageHero>

      <section className="section bg-cream">
        <div className="container">
          <Reveal className="mb-12 max-w-[760px]"><p className="chip mb-5">What we place</p><h2 className="display">{s.title}, in its <span className="hl">forms.</span></h2></Reveal>
          <Stagger as="ul" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {s.sub.map((p, n) => <Item as="li" key={p.name} className="flat flat-hover flex flex-col gap-4 p-7"><span className="mono text-xs text-ink-soft">{String(n + 1).padStart(2, '0')} / {String(s.sub.length).padStart(2, '0')}</span><h3 className="display-sm">{p.name}</h3><p className="text-[16px] text-ink-soft">{p.summary}</p></Item>)}
          </Stagger>
        </div>
      </section>

      <section className="section bg-sky">
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal className="flat p-8 md:p-10"><p className="chip mb-5">Is this for you?</p><h2 className="display-sm mb-6">It usually fits when</h2><ul className="space-y-4">{s.fit.map((f) => <li key={f} className="flex gap-3 text-[16px] text-midnight"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-midnight text-sunrise"><Check size={11} strokeWidth={3.5} /></span>{f}</li>)}</ul></Reveal>
          <Reveal delay={0.1} className="on-dark rounded-[22px] border-2 border-midnight bg-navy p-8 shadow-[8px_8px_0_var(--color-sunrise)] md:p-10"><p className="label-sm mb-5">How it goes</p><h2 className="display-sm mb-6">Three steps, no pressure</h2><ol className="space-y-5">{s.process.map((p, n) => <li key={p} className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sunrise font-display text-lg font-extrabold text-midnight">{n + 1}</span><p className="pt-1.5 text-[16px] !text-white">{p}</p></li>)}</ol></Reveal>
        </div>
      </section>

      {group && (
        <section className="section bg-cream">
          <div className="container">
            <Reveal className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="chip mb-5">Carrier partners</p><h2 className="display">Who we shop for {s.title.toLowerCase()}</h2></div><Link href={`/carriers#${group.key}`} className="link">Full carrier list <ArrowRight size={16} /></Link></Reveal>
            <ul className="flex flex-wrap gap-3">{group.carriers.map((c) => <li key={c.slug} className="flex items-center gap-3 rounded-full border-2 border-midnight bg-white px-5 py-2.5"><span className="font-display text-[17px] font-bold text-midnight">{c.name}</span>{c.rating && <span className="mono rounded-full bg-sky px-2 py-0.5 text-xs text-midnight">{c.rating}</span>}</li>)}</ul>
          </div>
        </section>
      )}

      <section className="bg-sky">
        <div className="container grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-2">
          <Reveal><p className="chip mb-4">Next solution</p><Link href={`/solutions/${next.slug}`} className="group inline-block"><span className="display-xl block">{next.title}</span><span className="mt-3 block text-lg text-ink-soft">{next.short}</span><span className="btn btn-outline mt-6">See {next.title} <ArrowRight size={16} /></span></Link></Reveal>
          <Reveal delay={0.1} className="flex justify-center md:justify-end"><div className="w-full max-w-[380px] -rotate-2"><Mock {...mockFor(next.slug)} /></div></Reveal>
        </div>
      </section>
    </>
  )
}
