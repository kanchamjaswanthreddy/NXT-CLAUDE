import Landscape from './scene/Landscape'
import { Moon } from './scene/parts'

const STARS = [[5, 14, 4, 0], [11, 40, 5, 0.9], [18, 20, 3, 1.5], [26, 9, 5, 0.3], [33, 34, 4, 1.9], [41, 15, 6, 1.1], [48, 44, 3, 0.6], [55, 10, 5, 1.7], [62, 30, 4, 0.2], [70, 16, 5, 1.3], [77, 42, 3, 0.8], [91, 36, 5, 0.4], [96, 12, 4, 1.6]] as const

/**
 * The same landscape as the home page hero, at night with the lights on. It closes every page:
 * the site opens at sunrise and ends here. Decorative.
 */
export default function NightStrip() {
  return (
    <div aria-hidden="true" className="night-strip">
      <div className="stars">
        {STARS.map(([l, t, size, d], i) => <i key={i} className="star" style={{ left: `${l}%`, top: `${t}%`, width: size, height: size, animationDelay: `${d}s` }} />)}
      </div>
      <i className="shooting-star" />
      <Moon className="night-moon" />
      <Landscape />
    </div>
  )
}
