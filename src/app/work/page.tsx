import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getWorks } from '@/lib/api/works'

export const metadata: Metadata = {
	title: 'Work',
	description:
		'Explore SABAKO\'s portfolio of enterprise web applications, mobile products, and IoT solutions delivered for clients across Indonesia.',
	alternates: { canonical: 'https://sabako.id/work' },
	openGraph: { title: 'Work & Portfolio — SABAKO', description: 'Selected projects from SABAKO.' },
}

const categoryColors: Record<string, string> = {
	web: 'text-blue-500',
	mobile: 'text-purple-500',
	iot: 'text-green-500',
}

export default async function WorkPage() {
	const projects = await getWorks()

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
							<Link
								key={project.id}
								href={`/work/${project.slug}`}
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
							</Link>
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
