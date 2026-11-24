import { Balloon65, Car, Envelope, Heart, House, Mailbox, Tree } from './parts'

/**
 * The NXT landscape: hills, a road, a house, trees and a mailbox, anchored to the bottom of its
 * parent. `active` (0 to 4) plays one small story in the scene:
 *   0 a car on the way to work, 1 mail arriving, 2 a 65th-birthday balloon, 3 a heart over the home.
 *   4 has no prop of its own: the scene's time of day (stars, lit windows) carries it.
 * Colours come from CSS variables set by the parent, so the same drawing works at any hour.
 */
export default function Landscape({ active = -1, className = '' }: { active?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`landscape ${className}`} data-active={active}>
      <svg className="hills" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" stroke="#080e28" strokeWidth="3" strokeLinejoin="round">
        <path d="M-10 122 C 150 12, 380 0, 600 62 C 760 106, 860 122, 900 122 Z" fill="var(--hill-a, #b9c8f6)" vectorEffect="non-scaling-stroke" />
        <path d="M560 122 C 760 34, 1080 -4, 1290 52 C 1380 78, 1440 112, 1460 122 Z" fill="var(--hill-b, #9fb4ec)" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="ground"><div className="road" /></div>
      <Tree className="ls-tree-a" />
      <Tree className="ls-tree-b" variant="pine" />
      <Tree className="ls-tree-c" />
      <House className="ls-house" />
      <Mailbox className="ls-mailbox" />
      <div className="ls-env"><Envelope /></div>
      <div className="ls-balloon"><Balloon65 /></div>
      <div className="ls-heart"><Heart /></div>
      <div className="ls-car"><Car /></div>
    </div>
  )
}
