import { Fragment, type CSSProperties, type ReactNode } from 'react'

const v = (vars: Record<string, string | number>) => vars as CSSProperties

/**
 * Text cut into words and letters so each letter can rise on its own. Reads as ordinary text.
 * A line break in the text ("\n") starts a new line, which lets a heading hug its widest line.
 */
export function Split({ text }: { text: string }) {
  let i = 0
  const lines = text.split('\n')
  const words = (line: string) => line.split(' ').map((word, wi) => (
    <Fragment key={wi}>
      <span className="pv-w">
        {Array.from(word).map((ch, ci) => <span key={ci} className="pv-c" style={v({ '--i': i++ })}>{ch}</span>)}
      </span>{' '}
    </Fragment>
  ))
  return lines.length === 1 ? <>{words(lines[0])}</> : <>{lines.map((line, li) => <span key={li} className="pv-line">{words(line)}</span>)}</>
}

/** The hand-drawn arrow that hangs off a note. */
export function NoteArrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg className="pv-note-arrow" viewBox="0 0 60 48" fill="none" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path pathLength={1} d="M56 5C40 3 22 10 10 36" />
      <path pathLength={1} d="M4 22c2 6 4 11 6 15 5-3 10-5 15-6" />
    </svg>
  )
}

/** A handwritten aside with its arrow. */
export function Note({ children, className = '', flip = false }: { children: ReactNode; className?: string; flip?: boolean }) {
  return (
    <span className={`pv-note ${className}`} data-rv="note" data-flip={flip || undefined}>
      <span className="pv-note-t">{children}</span>
      <NoteArrow flip={flip} />
    </span>
  )
}

/**
 * Section opener: a very large centred heading whose letters rise in, a handwritten note pinned
 * to its corner, and an optional line of supporting text.
 */
export default function Head({ id, note, title, sub, tone = 'ink' }: { id: string; note: string; title: string; sub?: ReactNode; tone?: 'ink' | 'light' }) {
  return (
    <header className="pv-head" data-tone={tone}>
      <div className="pv-head-title">
        <Note>{note}</Note>
        <h2 id={id} className="pv-h" aria-label={title.replace(/\n/g, ' ')} data-rv="split"><Split text={title} /></h2>
      </div>
      {sub ? <p className="pv-sub" data-rv="up">{sub}</p> : null}
    </header>
  )
}
