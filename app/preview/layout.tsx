import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './preview.css'

// Typefaces for the preview, shipped with the site: Plus Jakarta Sans for everything set in type,
// Caveat for the handwritten notes. Both are under the SIL Open Font License (see ./fonts).
const sans = localFont({ src: './fonts/plus-jakarta-sans-latin-wght-normal.woff2', weight: '200 800', style: 'normal', variable: '--pv-sans', display: 'swap' })
const hand = localFont({ src: './fonts/caveat-latin-wght-normal.woff2', weight: '400 700', style: 'normal', variable: '--pv-hand', display: 'swap', preload: false })

export const metadata: Metadata = {
  title: 'Design preview: home page',
  description: 'A proposed new look for the NXT Financial Group home page.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.nxtfinancialgroup.com' },
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className={`pv ${sans.variable} ${hand.variable}`}>{children}</div>
}
