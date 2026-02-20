import Link from 'next/link'
import { Globe, Smartphone, Cpu, ArrowRight } from 'lucide-react'

type ServiceKey = 'web' | 'mobile' | 'iot'

const services: Record<ServiceKey, { label: string; description: string; href: string; icon: React.ElementType }> = {
	web: {
		label: 'Digital Experiences',
		description: 'Websites, web apps, SaaS platforms, and e-commerce.',
		href: '/services/web',
		icon: Globe,
	},
	mobile: {
		label: 'Mobile Products',
		description: 'iOS, Android, and cross-platform apps.',
		href: '/services/mobile',
		icon: Smartphone,
	},
	iot: {
		label: 'Connected Systems',
		description: 'IoT platforms, firmware, and real-time dashboards.',
		href: '/services/iot',
		icon: Cpu,
	},
}

export function OtherServices({ current }: { current: ServiceKey }) {
	const others = (Object.keys(services) as ServiceKey[]).filter((k) => k !== current)

	return (
		<section
			className="border-t border-[var(--border)] py-16"
			aria-labelledby="other-services-heading"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p
					id="other-services-heading"
					className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-8"
				>
					Explore Other Services
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)]">
					{others.map((key) => {
						const s = services[key]
						const Icon = s.icon
						return (
							<Link
								key={key}
								href={s.href}
								className="bg-[var(--bg)] p-6 flex items-start gap-4 group hover:bg-[var(--bg-subtle)] transition-colors"
							>
								<div className="p-2 border border-[var(--border)] text-[var(--brand)] flex-shrink-0 group-hover:border-[var(--brand)] transition-colors">
									<Icon size={16} aria-hidden="true" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-1">
										{s.label}
									</p>
									<p className="text-xs text-[var(--text-subtle)] leading-relaxed">{s.description}</p>
								</div>
								<ArrowRight
									size={14}
									className="flex-shrink-0 mt-0.5 text-[var(--text-subtle)] group-hover:text-[var(--brand)] transition-all group-hover:translate-x-1"
								/>
							</Link>
						)
					})}
				</div>
			</div>
		</section>
	)
}
