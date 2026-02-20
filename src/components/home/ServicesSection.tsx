'use client'

import Link from 'next/link'
import { Globe, Smartphone, Cpu, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const services = [
	{
		id: 'web',
		icon: Globe,
		label: 'Digital Experiences',
		tagline: 'Websites, Web Apps & SaaS Platforms',
		href: '/services/web',
		description:
			'We design and build high-performance digital products — from corporate websites to complex SaaS platforms and e-commerce solutions that convert.',
		capabilities: [
			'Corporate Websites',
			'Web Applications',
			'E-commerce & Marketplaces',
			'SaaS Platforms',
		],
	},
	{
		id: 'mobile',
		icon: Smartphone,
		label: 'Mobile Products',
		tagline: 'iOS, Android & Cross-platform Apps',
		href: '/services/mobile',
		description:
			'We craft intuitive, performant mobile experiences for iOS and Android. Whether native or cross-platform, we build apps that users love.',
		capabilities: [
			'iOS Applications',
			'Android Applications',
			'React Native & Flutter',
			'App Store Optimization',
		],
	},
	{
		id: 'iot',
		icon: Cpu,
		label: 'Connected Systems',
		tagline: 'Smart Devices & Embedded Platforms',
		href: '/services/iot',
		description:
			'We engineer smart connected solutions — from embedded firmware to IoT dashboards and cloud connectivity for devices that power industry.',
		capabilities: [
			'Embedded Systems',
			'IoT Device Integration',
			'Real-time Dashboards',
			'Industrial Automation',
		],
	},
]

export function ServicesSection() {
	return (
		<section
			className="py-28"
			aria-labelledby="services-heading"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Header */}
				<Reveal>
					<div className="mb-16">
						<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-3">
							What We Do
						</p>
						<h2
							id="services-heading"
							className="text-4xl font-bold text-[var(--text)] max-w-lg leading-tight"
						>
							Services built for impact.
						</h2>
					</div>
				</Reveal>

				{/* Services grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--border)]">
					{services.map((service) => {
						const Icon = service.icon
						return (
							<Link
								key={service.id}
								href={service.href}
								aria-label={`Learn more about ${service.label}`}
								className="transition-all group bg-[var(--bg)] p-8 hover:bg-[var(--bg-subtle)] transition-colors"
							>
								<article
									className="flex flex-col"
								>
									<div className="flex items-center gap-3 mb-6">
										<div className="p-2 border border-[var(--border)] text-[var(--brand)] bg-[var(--bg-subtle)]">
											<Icon size={18} />
										</div>
										<p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
											{service.tagline}
										</p>
									</div>

									<h3 className="text-2xl font-bold text-[var(--text)] mb-4 group-hover:text-[var(--brand)] transition-colors">
										{service.label}
									</h3>

									<p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8 flex-1">
										{service.description}
									</p>

									<ul className="space-y-2 mb-8" role="list">
										{service.capabilities.map((cap) => (
											<li
												key={cap}
												className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
											>
												<span className="w-1 h-1 bg-[var(--brand)] flex-shrink-0" />
												{cap}
											</li>
										))}
									</ul>

									<span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--brand)] group-hover:gap-3">
										Learn More
										<ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
									</span>
								</article>
							</Link>
						)
					})}
				</div>
			</div>
		</section>
	)
}
