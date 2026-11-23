import { TrendingUp, ShieldCheck, HeartHandshake, Stethoscope, Umbrella, House, Landmark, Calculator, MessageCircle, Briefcase, Users, BookOpen, Gift, Handshake, Compass, Layers, Rocket, Sparkles, type LucideIcon } from 'lucide-react'

/** Icon shown in the 3D illustration for each solution. */
export const solutionIcons: Record<string, LucideIcon> = {
  annuities: TrendingUp,
  'life-insurance': ShieldCheck,
  'care-planning': HeartHandshake,
  'medicare-planning': Stethoscope,
  'disability-income': Umbrella,
  'home-auto': House,
}

const byEyebrow: Record<string, LucideIcon> = {
  annuities: TrendingUp, 'life insurance': ShieldCheck, 'care planning': HeartHandshake, 'medicare planning': Stethoscope, 'disability income': Umbrella, 'home & auto': House,
  'carrier partners': Landmark, calculators: Calculator, contact: MessageCircle, careers: Briefcase, 'about nxt': Users, insights: BookOpen, referrals: Gift, 'for advisors': Handshake, 'planning tools': Compass, solutions: Layers, 'become an nxt agent': Rocket,
}

/** Icon for a page opener, chosen from its eyebrow label. */
export const iconFor = (eyebrow?: string): LucideIcon => byEyebrow[(eyebrow ?? '').toLowerCase()] ?? Sparkles
