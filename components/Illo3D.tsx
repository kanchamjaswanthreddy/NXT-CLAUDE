import type { LucideIcon } from 'lucide-react'

/** Code-drawn 3D-style illustration: a glossy tile carrying an icon, with orbit rings and floating spheres. */
export default function Illo3D({ icon: Icon, className = '' }: { icon: LucideIcon; className?: string }) {
  return (
    <div aria-hidden="true" className={`illo relative aspect-square ${className}`}>
      <div className="illo-glow" />
      <div className="illo-ring illo-ring-a" />
      <div className="illo-ring illo-ring-b" />
      <div className="illo-tile float-a"><Icon className="h-[46%] w-[46%]" strokeWidth={1.6} /></div>
      <span className="orb orb-gold float-b" style={{ left: '5%', top: '13%', width: '20%' }} />
      <span className="orb orb-blue float-c" style={{ right: '4%', top: '7%', width: '13%' }} />
      <span className="orb orb-pearl float-a" style={{ right: '9%', bottom: '9%', width: '17%' }} />
      <span className="orb orb-gold float-c" style={{ left: '15%', bottom: '5%', width: '9%' }} />
    </div>
  )
}
