import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Work',
	description:
		'Explore SABAKO\'s portfolio of enterprise web applications, mobile products, and IoT solutions delivered for clients across Indonesia.',
	alternates: { canonical: 'https://sabako.id/work' },
	openGraph: { title: 'Work & Portfolio — SABAKO', description: 'Selected projects from SABAKO.' },
}

const projects = [
	{
		id: 'enterprise-erp',
		category: 'Web Application',
		title: 'Enterprise Resource Planning System',
		client: 'Government Agency',
		year: '2024',
		description: 'A comprehensive ERP system built for a government agency, enabling integrated management of procurement, HR, finance, and reporting across multiple departments.',
		tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
		type: 'web',
	},
	{
		id: 'logistics-mobile',
		category: 'Mobile Product',
		title: 'Real-time Logistics Tracking App',
		client: 'Logistics Company, Surabaya',
		year: '2024',
		description: 'A cross-platform mobile application enabling real-time GPS tracking, proof-of-delivery, and driver–dispatcher communication for a major logistics group.',
		tags: ['React Native', 'Firebase', 'Google Maps API'],
		type: 'mobile',
	},
	{
		id: 'smart-building',
		category: 'Connected System',
		title: 'Smart Building Management Platform',
		client: 'Commercial Developer, BSD City',
		year: '2023',
		description: 'End-to-end IoT platform including embedded firmware for sensors, MQTT messaging, and a Next.js management dashboard for a commercial property developer.',
		tags: ['IoT', 'MQTT', 'Next.js', 'TimescaleDB'],
		type: 'iot',
	},
	{
		id: 'saas-hrm',
		category: 'SaaS Platform',
		title: 'HR Management SaaS',
		client: 'Mid-size Enterprise',
		year: '2023',
		description: 'A full-featured human resource management platform with payroll, leave management, performance reviews, and subscription billing via Stripe.',
		tags: ['Next.js', 'Prisma', 'Stripe', 'AWS'],
		type: 'web',
	},
	{
		id: 'ecommerce-marketplace',
		category: 'E-commerce',
		title: 'Multi-vendor Marketplace',
		client: 'Retail Group, Jakarta',
		year: '2022',
		description: 'A high-traffic multi-vendor marketplace handling thousands of daily transactions with real-time inventory, seller dashboards, and a mobile buyer app.',
		tags: ['Next.js', 'Elasticsearch', 'Redis', 'Flutter'],
		type: 'web',
	},
	{
		id: 'water-monitoring',
		category: 'Connected System',
		title: 'Industrial Water Quality Monitor',
		client: 'Manufacturing Facility',
		year: '2022',
		description: 'IoT-based water quality monitoring system with embedded sensors, alerting, compliance reporting, and a web dashboard for facility management.',
		tags: ['Embedded C', 'MQTT', 'Node.js', 'React'],
		type: 'iot',
	},
]

const categoryColors: Record<string, string> = {
	web: 'text-blue-500',
	mobile: 'text-purple-500',
	iot: 'text-green-500',
}

export default function WorkPage() {
	return (
		<article>
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						Portfolio
					</p>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						Partner with the experienced.
					</h1>
					<p className="mt-4 text-lg text-[var(--text-muted)] max-w-xl">
						A selection of projects across web, mobile, and connected systems.
					</p>
				</div>
			</header>

			<section className="py-16" aria-label="Projects">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
						{projects.map((project) => (
							<article
								key={project.id}
								id={project.id}
								className="bg-[var(--bg)] p-8 flex flex-col group hover:bg-[var(--bg-subtle)] transition-colors"
							>
								<div className="flex items-center justify-between mb-6">
									<span className={`text-xs font-mono uppercase tracking-wider ${categoryColors[project.type] || 'text-[var(--brand)]'}`}>
										{project.category}
									</span>
									<span className="text-xs font-mono text-[var(--text-subtle)]">{project.year}</span>
								</div>

								<h2 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-2">
									{project.title}
								</h2>
								<p className="text-xs text-[var(--text-subtle)] mb-4">{project.client}</p>
								<p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-6">
									{project.description}
								</p>

								<div className="flex flex-wrap gap-2 mb-6">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-0.5 text-xs border border-[var(--border)] text-[var(--text-subtle)] bg-[var(--bg-subtle)]"
										>
											{tag}
										</span>
									))}
								</div>

								<div className="mt-auto flex items-center gap-1.5 text-xs font-mono text-[var(--text-subtle)] group-hover:text-[var(--brand)] transition-colors">
									View case study
									<ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] py-16" aria-label="Start a project">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
					<p className="text-2xl font-bold text-[var(--text)]">Have a project in mind?</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Let&apos;s Discuss
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>
		</article>
	)
}
