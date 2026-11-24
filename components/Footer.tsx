import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react'
import { solutions } from '@/lib/solutions'

const COMPANY = [['/about', 'About NXT'], ['/carriers', 'Carrier partners'], ['/nxt-life', 'NXT Life'], ['/insights', 'Insights'], ['/careers', 'Careers'], ['/partner', 'For advisors'], ['/referral', 'Refer a friend'], ['/contact', 'Contact']]
const TOOLS = [['/calculators', 'Calculators'], ['/resources', 'Planning tools'], ['/get-started', 'Get started']]
const SOCIAL = [
  ['https://www.instagram.com/nxtfinancialgroup', 'Instagram', Instagram],
  ['https://www.facebook.com/people/NXT-Financial-Group/61589938040020/', 'Facebook', Facebook],
  ['https://www.linkedin.com/company/https-nxtfinancialgroup.com-/', 'LinkedIn', Linkedin],
  ['https://www.youtube.com/@NXTFinancialGroup', 'YouTube', Youtube],
] as const

const head = 'mb-4 text-[.8125rem] font-semibold text-midnight'
const item = 'text-ink-soft transition-colors hover:text-midnight'

export default function Footer() {
  return (
    <footer className="bg-stone text-[.875rem]">
      <div className="container pb-10 pt-16 md:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.7fr_1fr_1fr_1fr] md:gap-x-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="NXT Financial Group" className="inline-block"><Image src="/media/logo.png" alt="NXT Financial Group" width={240} height={106} className="h-14 w-auto" /></Link>
            <p className="mt-6 max-w-[340px] leading-relaxed text-ink-soft">Independent retirement and protection planning. Annuities, life insurance, care planning, Medicare and disability income from A-rated carriers, in all 50 states.</p>
            <ul className="mt-6 space-y-1.5 text-midnight">
              <li><a href="tel:8572053333" className="hover:underline">857-205-3333</a></li>
              <li><a href="mailto:info@nxtfinancialgroup.com" className="hover:underline">info@nxtfinancialgroup.com</a></li>
              <li className="text-ink-soft">75 Pleasant Street, Unit 207, Malden, MA 02148</li>
            </ul>
            <ul className="mt-6 flex gap-2">
              {SOCIAL.map(([href, label, Icon]) => (
                <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight/[.06] text-midnight transition-colors hover:bg-midnight hover:text-white"><Icon size={17} /></a></li>
              ))}
            </ul>
          </div>
          <nav aria-label="Solutions"><h3 className={head}>Solutions</h3><ul className="space-y-2.5">{solutions.map((s) => <li key={s.slug}><Link href={`/solutions/${s.slug}`} className={item}>{s.title}</Link></li>)}</ul></nav>
          <nav aria-label="Company"><h3 className={head}>Company</h3><ul className="space-y-2.5">{COMPANY.map(([h, l]) => <li key={h}><Link href={h} className={item}>{l}</Link></li>)}</ul></nav>
          <nav aria-label="Tools" className="col-span-2 md:col-span-1"><h3 className={head}>Tools</h3><ul className="space-y-2.5">{TOOLS.map(([h, l]) => <li key={h}><Link href={h} className={item}>{l}</Link></li>)}</ul></nav>
        </div>

        <div className="mt-14 border-t border-midnight/10 pt-6 text-[.8125rem] text-ink-soft">
          <p className="max-w-[980px] leading-relaxed">NXT Financial Group is a licensed independent insurance agency headquartered in Massachusetts. Annuity and insurance guarantees are backed by the claims-paying ability of the issuing carrier. Product availability, features and rates vary by carrier and state. We do not offer every plan available in your area; contact Medicare.gov or 1-800-MEDICARE for all options. Estimates on this site are illustrative and not an offer of coverage.</p>
          <div className="mt-6 flex flex-col gap-3 border-t border-midnight/10 pt-5 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} NXT Financial Group, NXT World Holdings, Inc. All Rights Reserved.</p>
            <ul className="flex gap-6"><li><Link href="/privacy-policy" className={item}>Privacy</Link></li><li><Link href="/terms" className={item}>Terms</Link></li></ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
