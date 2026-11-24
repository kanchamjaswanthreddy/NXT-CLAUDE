import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import SolutionCards from '@/components/SolutionCards'
import FutureFlowSection from '@/components/FutureFlowSection'

export const metadata: Metadata = {
  title: 'Insurance Solutions — 6 Disciplines + FutureFlow',
  description: 'Annuities, life insurance, care planning, Medicare planning, disability income, home & auto insurance, and FutureFlow — AI-powered personal finance. Six disciplines, 70+ carriers, one IMO.',
  alternates: { canonical: 'https://www.nxtfinancialgroup.com/solutions' },
}

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Six disciplines that protect what matters. One place to plan them all."
        intro="From retirement income to your front door — we cover the decisions that shape your financial life, and we do them for a living."
      />

      <section className="section bg-cream">
        <div className="container">
          <SolutionCards />
        </div>
      </section>

      <FutureFlowSection />
    </>
  )
}
