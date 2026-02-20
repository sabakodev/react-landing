'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const projects = [
	{
		id: 'enterprise-erp',
		category: 'Web Application',
		title: 'Enterprise Resource Planning System',
		client: 'Government Agency',
		tags: ['React', 'Node.js', 'PostgreSQL'],
		year: '2024',
	},
	{
		id: 'logistics-mobile',
		category: 'Mobile Product',
		title: 'Real-time Logistics Tracking App',
		client: 'Logistics Company',
		tags: ['React Native', 'GPS', 'Firebase'],
		year: '2024',
	},
	{
		id: 'smart-building',
		category: 'Connected System',
		title: 'Smart Building Management Platform',
		client: 'Commercial Developer',
		tags: ['IoT', 'MQTT', 'Next.js'],
		year: '2023',
	},
	{
		id: 'saas-hrm',
		category: 'SaaS Platform',
		title: 'HR Management SaaS',
		client: 'Mid-size Enterprise',
		tags: ['Next.js', 'Prisma', 'Stripe'],
		year: '2023',
	},
]

export function WorkSection() {
	return (
		<section
			className="py-28 border-t border-[var(--border)] bg-[var(--bg-subtle)]"
			aria-labelledby="work-heading"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Header */}
				<Reveal>
					<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
						<div>
							<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-3">
								Featured Work
							</p>
							<h2
								id="work-heading"
								className="text-4xl font-bold text-[var(--text)] leading-tight"
							>
								Selected projects.
							</h2>
						</div>
						<Link
							href="/work"
							className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors hover-underline group whitespace-nowrap"
						>
							View all projects
							<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
						</Link>
					</div>
				</Reveal>

				{/* Projects list */}
				<div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
					{projects.map((project, index) => (
						<Link
							key={project.id}
							href={`/work#${project.id}`}
							className="grid grid-cols-12 items-center gap-4 py-6 group hover:bg-[var(--bg)] px-4 -mx-4 transition-colors"
						>
							{/* Index */}
							<span className="col-span-1 text-xs font-mono text-[var(--text-subtle)] tabular-nums">
								{String(index + 1).padStart(2, '0')}
							</span>

							{/* Category */}
							<span className="col-span-2 hidden sm:block text-xs font-mono text-[var(--text-subtle)] uppercase tracking-wider">
								{project.category}
							</span>

							{/* Title */}
							<div className="col-span-11 sm:col-span-5">
								<p className="text-base font-medium text-[var(--text)] group-hover:text-[var(--brand)] transition-colors">
									{project.title}
								</p>
								<p className="text-xs text-[var(--text-subtle)] mt-0.5 sm:hidden">
									{project.category}
								</p>
							</div>

							{/* Tags */}
							<div className="col-span-8 hidden md:flex items-center gap-2">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="px-2 py-0.5 text-xs border border-[var(--border)] text-[var(--text-subtle)] bg-[var(--bg)]"
									>
										{tag}
									</span>
								))}
							</div>

							{/* Year + Arrow */}
							<div className="col-span-3 md:col-span-2 flex items-center justify-end gap-3">
								<span className="text-xs font-mono text-[var(--text-subtle)]">
									{project.year}
								</span>
								<ArrowRight
									size={14}
									className="text-[var(--text-subtle)] group-hover:text-[var(--brand)] transition-all group-hover:translate-x-1"
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
