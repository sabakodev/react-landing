import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Globe, Smartphone, Cpu } from 'lucide-react'
import { getWork, getWorks } from '@/lib/api/works'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
	const works = await getWorks()
	return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const work = await getWork(params.slug)
    if (!work) return { title: 'Project Not Found' }
    return {
		title: `${work.title} — Case Study`,
		description: work.description,
		alternates: { canonical: `https://sabako.id/work/${work.slug}` },
		openGraph: {
			title: `${work.title} — SABAKO`,
			description: work.description,
		},
	}
}

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

export default async function WorkCaseStudyPage(props: Props) {
    const params = await props.params;
    const work = await getWork(params.slug)
    if (!work) notFound()

    const Icon = typeIcon[work.type] ?? Globe

    return (
		<article>
			{/* Header */}
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<Link
						href="/work"
						className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors mb-10 group"
					>
						<ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
						All Projects
					</Link>

					<div className="flex items-center gap-3 mb-6">
						<div className={`p-2 border border-[var(--border)] ${typeColor[work.type]}`}>
							<Icon size={18} aria-hidden="true" />
						</div>
						<span className={`text-xs font-mono uppercase tracking-widest ${typeColor[work.type]}`}>
							{work.category}
						</span>
						<span className="text-xs font-mono text-[var(--text-subtle)]">· {work.year}</span>
					</div>

					<h1 className="text-5xl font-bold text-[var(--text)] max-w-3xl leading-tight">
						{work.title}
					</h1>
					<p className="mt-4 text-base text-[var(--text-muted)] font-medium">
						{work.client}
					</p>

					<div className="flex flex-wrap gap-2 mt-8">
						{work.tags.map((tag) => (
							<span
								key={tag}
								className="px-2.5 py-1 text-xs border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-subtle)] font-mono"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</header>

			{/* Overview */}
			<section className="py-16 border-b border-[var(--border)]" aria-label="Project overview">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="max-w-3xl">
						<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">Overview</p>
						<p className="text-xl text-[var(--text-muted)] leading-relaxed">{work.description}</p>
					</div>
				</div>
			</section>

			{/* Challenge / Solution / Outcome */}
			{(work.challenge || work.solution || work.outcome) && (
				<section className="border-b border-[var(--border)]" aria-label="Case study details">
					<div className="mx-auto max-w-7xl divide-y divide-[var(--border)]">
						{work.challenge && (
							<div className="px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
								<div className="lg:col-span-3">
									<p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
										The Challenge
									</p>
								</div>
								<div className="lg:col-span-9">
									<p className="text-[var(--text-muted)] leading-relaxed">{work.challenge}</p>
								</div>
							</div>
						)}
						{work.solution && (
							<div className="px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[var(--bg-subtle)]">
								<div className="lg:col-span-3">
									<p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
										Our Solution
									</p>
								</div>
								<div className="lg:col-span-9">
									<p className="text-[var(--text-muted)] leading-relaxed">{work.solution}</p>
								</div>
							</div>
						)}
						{work.outcome && (
							<div className="px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
								<div className="lg:col-span-3">
									<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)]">
										The Outcome
									</p>
								</div>
								<div className="lg:col-span-9">
									<p className="text-[var(--text)] leading-relaxed font-medium">{work.outcome}</p>
								</div>
							</div>
						)}
					</div>
				</section>
			)}

			{/* CTA */}
			<section className="py-20 bg-[var(--bg-subtle)]" aria-label="Start a project">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
					<div>
						<p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2">
							Build with us
						</p>
						<p className="text-2xl font-bold text-[var(--text)]">
							Ready to start your project?
						</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link
							href="/contact"
							className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
						>
							Get in Touch
							<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</Link>
						<Link
							href="/work"
							className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text)] text-sm font-medium hover:bg-[var(--bg)] transition-colors"
						>
							View All Work
						</Link>
					</div>
				</div>
			</section>
		</article>
	)
}
