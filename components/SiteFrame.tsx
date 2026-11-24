'use client'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/** Routes that bring their own header and footer (the design preview). */
const OWN_FRAME = ['/preview']

/**
 * The site's header, main area, closing film and footer around a page. Pages under OWN_FRAME are
 * handed back bare so they can lay out the whole screen themselves.
 */
export default function SiteFrame({ nav, closing, footer, children }: { nav: ReactNode; closing: ReactNode; footer: ReactNode; children: ReactNode }) {
  const path = usePathname() ?? ''
  if (OWN_FRAME.some((p) => path === p || path.startsWith(p + '/'))) return <>{children}</>
  return (
    <>
      {nav}
      <main id="main" className="flex-1">{children}</main>
      {closing}
      {footer}
    </>
  )
}
