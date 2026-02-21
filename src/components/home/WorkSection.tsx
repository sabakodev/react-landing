import Link from 'next/link'
import { ArrowRight, Globe, Smartphone, Cpu } from 'lucide-react'
import { getWorks } from '@/lib/api/works'
import { Reveal } from '../ui/Reveal'

const typeIcon: Record<string, React.ElementType> = {
	web: Globe,
	mobile: Smartphone,
	iot: Cpu,
}

const typeColor: Record<string, string> = {
	web: 'text-blue-500',
	mobile: 'text-purple-500',
	iot: 'text-green-500',
}
const typeColorHover: Record<string, string> = {
	web: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900 transition-colors',
	mobile: 'group-hover:bg-purple-50 dark:group-hover:bg-purple-900 transition-colors',
	iot: 'group-hover:bg-green-50 dark:group-hover:bg-green-900 transition-colors',
}

export async function WorkSection() {
	const projects = await getWorks({ featured: true, limit: 3 })

	return (
		<section
			className="py-28 border-t border-[var(--border)] bg-[var(--bg-subtle)]"
			aria-labelledby="work-heading"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Header */}
				<div className="mb-16">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-3">
						Featured Work
					</p>
					<h2
						id="work-heading"
						className="text-4xl font-bold text-[var(--text)] leading-tight max-w-lg"
					>
						Selected projects.
					</h2>
				</div>

				{/* Projects — 3-column curated grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
					{projects.map((project, i) => {
						const Icon = typeIcon[project.type] ?? Globe
						return (
							<Reveal key={project.id} delay={i * 0.1}>
								<Link
									href={`/work/${project.slug}`}
									className="bg-[var(--bg)] p-8 flex flex-col group hover:bg-white dark:hover:bg-neutral-900 transition-colors"
								>
									<div className="flex items-center justify-between mb-8">
										<div className={`p-2 border border-[var(--border)] ${typeColor[project.type]} ${typeColorHover[project.type]}`}>
											<Icon size={16} aria-hidden="true" />
										</div>
										<span className="text-xs font-mono text-[var(--text-subtle)]">{project.year}</span>
									</div>

									<div className="flex-1">
										<span className={`text-[10px] font-mono uppercase tracking-widest ${typeColor[project.type]}`}>
											{project.category}
										</span>
										<h3 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors leading-snug my-3">
											{project.title}
										</h3>
										<p className="text-xs text-[var(--text-subtle)] mb-4">{project.client}</p>
										<p className="text-sm text-[var(--text-muted)] leading-relaxed">
											{project.description}
										</p>
									</div>

									<div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center gap-1.5 text-xs font-mono text-[var(--text-subtle)] group-hover:text-[var(--brand)] transition-colors">
										View case study
										<ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
									</div>
								</Link>
							</Reveal>
						)
					})}
				</div>

				{/* Bottom CTA */}
				<div className="mt-10 flex justify-end">
					<Link
						href="/work"
						className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group"
					>
						View all projects
						<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	)
}
