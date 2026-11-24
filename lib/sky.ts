/**
 * Time of day for the NXT landscape. 0 is sunrise on the left horizon, 1 is sunset on the right.
 * The home page hero animates through these stops; inner pages each sit at one fixed time.
 */
export const SKY: [number, string][] = [[0, '#33427f'], [0.12, '#fde8c9'], [0.31, '#dbe5ff'], [0.5, '#c6d7ff'], [0.69, '#f8dfa6'], [0.8, '#c497a4'], [0.9, '#2a3876'], [1, '#0e173f']]
export const HILL_A: [number, string][] = [[0, '#1c2a66'], [0.12, '#c4cff6'], [0.69, '#aebff0'], [0.88, '#182562'], [1, '#0d1642']]
export const HILL_B: [number, string][] = [[0, '#16215a'], [0.12, '#a9bbf0'], [0.69, '#93a9e8'], [0.88, '#111c52'], [1, '#0a1238']]

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const hex = (c: number[]) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

/** Colour at time t along a list of [time, colour] stops (straight RGB blend between neighbours). */
export function colorAt(stops: [number, string][], t: number): string {
  if (t <= stops[0][0]) return stops[0][1]
  for (let i = 1; i < stops.length; i++) {
    const [t1, c1] = stops[i]
    if (t <= t1) {
      const [t0, c0] = stops[i - 1]
      const k = (t - t0) / (t1 - t0)
      const a = rgb(c0)
      const b = rgb(c1)
      return hex(a.map((v, j) => v + (b[j] - v) * k))
    }
  }
  return stops[stops.length - 1][1]
}

/** Where each solution sits in the day (the same order the home page hero walks through). */
export const SOLUTION_TIME: Record<string, number> = {
  'disability-income': 0.12,
  annuities: 0.31,
  'home-auto': 0.4,
  'medicare-planning': 0.5,
  'care-planning': 0.69,
  'life-insurance': 0.76,
}

/** Time of day for other pages, keyed by the page's eyebrow label. */
export const PAGE_TIME: Record<string, number> = {
  'become an nxt agent': 0.12,
  referrals: 0.13,
  'for advisors': 0.14,
  'planning tools': 0.28,
  'about nxt': 0.31,
  solutions: 0.34,
  'home & auto': 0.44,
  'carrier partners': 0.47,
  calculators: 0.5,
  contact: 0.53,
  insights: 0.66,
  careers: 0.69,
}
