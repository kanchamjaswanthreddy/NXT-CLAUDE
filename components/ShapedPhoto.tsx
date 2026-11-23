import Image from 'next/image'
import type { CSSProperties } from 'react'

export type Shape = 'blob' | 'leaf' | 'leafR' | 'circle' | 'slant' | 'hex' | 'ticket'

const STYLE: Record<Shape, CSSProperties> = {
  blob: { borderRadius: '58% 42% 55% 45% / 48% 55% 45% 52%' },
  leaf: { borderRadius: '28px 42% 28px 42%' },
  leafR: { borderRadius: '42% 28px 42% 28px' },
  circle: { borderRadius: '50%' },
  slant: { clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)' },
  hex: { clipPath: 'polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)' },
  ticket: { borderRadius: '40px' },
}
const RATIO: Record<Shape, string> = { blob: 'aspect-square', circle: 'aspect-square', hex: 'aspect-[8/7]', leaf: 'aspect-[5/4]', leafR: 'aspect-[5/4]', slant: 'aspect-[5/4]', ticket: 'aspect-[5/4] -rotate-3' }
const CYCLE: Shape[] = ['leaf', 'slant', 'blob', 'ticket', 'hex', 'leafR', 'circle']

/** Stable shape per page, so each page opener looks different. */
export function shapeFor(key: string): Shape {
  let h = 0
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return CYCLE[h % CYCLE.length]
}

interface Props { src: string; alt?: string; shape?: Shape; frame?: 'gold' | 'navy'; priority?: boolean; sizes?: string; className?: string }

/** Photo cut to a shape, with an offset colour block behind it in the same shape. */
export default function ShapedPhoto({ src, alt = '', shape = 'leaf', frame = 'gold', priority = false, sizes = '(min-width:1024px) 45vw, 100vw', className = '' }: Props) {
  const morph = shape === 'blob' ? ' blob-morph' : ''
  return (
    <div className={`relative ${RATIO[shape]} ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 translate-x-4 translate-y-4 ${frame === 'navy' ? 'bg-navy' : 'bg-sunrise'}${morph}`} style={STYLE[shape]} />
      <div className={`absolute inset-0 overflow-hidden${morph}`} style={STYLE[shape]}><Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" /></div>
    </div>
  )
}
