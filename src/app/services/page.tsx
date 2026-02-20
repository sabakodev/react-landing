import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Smartphone, Cpu, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Services',
	description:
		'Explore SABAKO\'s services — Digital Experiences (Web), Mobile Products (App), and Connected Systems (IoT). End-to-end technology consulting.',
	alternates: { canonical: 'https://sabako.id/services' },
	openGraph: {
		title: 'Services — SABAKO',
		description: 'Web Development, App Development, and IoT Solutions.',
	},
}

const services = [
	{
		icon: Globe,
		label: 'Digital Experiences',
		tagline: 'Websites, Web Apps & SaaS Platforms',
		href: '/services/web',
		description:
			'We design and build high-performance digital products — from corporate websites to complex SaaS platforms and e-commerce solutions that convert.',
	},
	{
		icon: Smartphone,
		label: 'Mobile Products',
		tagline: 'iOS, Android & Cross-platform Apps',
		href: '/services/mobile',
		description:
			'We craft intuitive, performant mobile experiences for iOS and Android. Whether native or cross-platform, we build apps that users love.',
	},
	{
		icon: Cpu,
		label: 'Connected Systems',
		tagline: 'Smart Devices & Embedded Platforms',
		href: '/services/iot',
		description:
			'We engineer smart connected solutions — from embedded firmware to IoT dashboards and cloud connectivity for devices that power industry.',
	},
]

export default function ServicesPage() {
	return (
		<article>
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						Services
					</p>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						End-to-end technology, delivered.
					</h1>
					<p className="mt-4 text-lg text-[var(--text-muted)] max-w-xl">
						From early-stage consulting to production-ready products — we cover the full spectrum of digital development.
					</p>
				</div>
			</header>

			<section className="py-20" aria-label="Our services">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
						{services.map((service) => {
							const Icon = service.icon
							return (
								<Link
									key={service.href}
									href={service.href}
									className="bg-[var(--bg)] p-10 flex flex-col group hover:bg-[var(--bg-subtle)] transition-colors"
								>
									<div className="flex items-center gap-3 mb-8">
										<div className="p-2.5 border border-[var(--border)] text-[var(--brand)] bg-[var(--bg-subtle)]">
											<Icon size={22} />
										</div>
									</div>

									<p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2">
										{service.tagline}
									</p>

									<h2 className="text-3xl font-bold text-[var(--text)] mb-6 group-hover:text-[var(--brand)] transition-colors">
										{service.label}
									</h2>

									<p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-8">
										{service.description}
									</p>

									<span className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--brand)] group-hover:gap-3 transition-all">
										Explore
										<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
									</span>
								</Link>
							)
						})}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] py-20" aria-label="Call to action">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
					<p className="text-2xl font-bold text-[var(--text)] mb-4">Not sure which service you need?</p>
					<p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
						We offer free initial consultations to help scope your project and recommend the right approach.
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Schedule a Consultation
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>
		</article>
	)
}
