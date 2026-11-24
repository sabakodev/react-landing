import { Globe, Smartphone, Cpu, BrainCircuit, Code, Lightbulb } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/** Maps the catalog's serializable icon keys to components (client- and server-safe). */
export const serviceIcons = {
	globe: Globe,
	smartphone: Smartphone,
	cpu: Cpu,
	brain: BrainCircuit,
	code: Code,
	lightbulb: Lightbulb,
} satisfies Record<string, LucideIcon>

export type ServiceIconKey = keyof typeof serviceIcons
