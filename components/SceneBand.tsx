import type { CSSProperties, ReactNode } from 'react'
import Landscape from './scene/Landscape'
import { Cloud, Sun } from './scene/parts'
import { colorAt, HILL_A, HILL_B, SKY } from '@/lib/sky'

/**
 * A full-width band of the NXT landscape with content set in its sky: used to give one statement
 * on a page room to breathe. `time` picks the hour (0 sunrise to 1 sunset); the sun sits on the
 * horizon, rising behind the hills.
 */
export default function SceneBand({ time = 0.12, children }: { time?: number; children: ReactNode }) {
  const t = Math.min(0.78, Math.max(0.1, time))
  const sky = { backgroundColor: colorAt(SKY, t), '--hill-a': colorAt(HILL_A, t), '--hill-b': colorAt(HILL_B, t) } as CSSProperties
  return (
    <section className="scene-band relative overflow-hidden" style={sky}>
      <Cloud className="cloud cloud-a" />
      <Cloud className="cloud cloud-b" />
      <Sun className="band-sun" />
      <div className="container relative z-10 pb-[230px] pt-24 text-center md:pb-[300px] md:pt-32">{children}</div>
      <Landscape className="landscape-sm" />
    </section>
  )
}
