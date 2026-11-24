'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { QA } from '@/lib/faq'

/** Questions as a column of rounded bars; one opens at a time. */
export default function PvFaq() {
  const [open, setOpen] = useState(0)
  return (
    <ul className="pv-faq" data-rv="stagger">
      {QA.map(([q, a], i) => (
        <li key={q} className="pv-faq-item" data-open={open === i || undefined} style={{ '--i': i } as React.CSSProperties}>
          <h3>
            <button type="button" className="pv-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`pv-faq-${i}`}>
              <span>{q}</span>
              <span className="pv-faq-plus" aria-hidden="true"><Plus size={18} strokeWidth={2.25} /></span>
            </button>
          </h3>
          <div id={`pv-faq-${i}`} className="pv-faq-a" inert={open !== i}>
            <div><p>{a}</p></div>
          </div>
        </li>
      ))}
    </ul>
  )
}
