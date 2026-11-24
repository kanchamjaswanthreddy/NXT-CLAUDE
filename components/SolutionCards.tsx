import { solutions } from '@/lib/solutions'
import { Stagger, Item } from './motion'
import SolutionPanel from './SolutionPanel'

/** All solutions as a grid of illustrated cards (used on the Solutions page). */
export default function SolutionCards() {
  return (
    <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {solutions.map((s, i) => <Item key={s.slug}><SolutionPanel s={s} index={i} total={solutions.length} /></Item>)}
    </Stagger>
  )
}
