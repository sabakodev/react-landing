import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getWorks } from '@/lib/graphql/adapters/works'

export async function OtherWorks({ current }: { current: string }) {
	let others: Awaited<ReturnType<typeof getWorks>> = []
	try {
		const projects = await getWorks()
		others = projects.filter((p) => p.id !== current).slice(0, 2)
	} catch {
		// If WP is unreachable, render nothing
	}

	if (others.length === 0) return null

	return (
		<section
			className="border-t border-(--border) py-16"
			aria-labelledby="other-works-heading"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p
					id="other-works-heading"
					className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-8"
				>
					Other Success Stories
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-(--border)">
					{others.map((p) => (
						<Link
							key={p.id}
							href={`/work/${p.slug}`}
							className="bg-(--bg) p-6 flex items-start gap-4 group hover:bg-(--bg-subtle) transition-colors"
						>
							<div className="flex-1 min-w-0">
								{p.category && (
									<p className="text-xs font-mono text-(--text-subtle) uppercase tracking-widest mb-1">
										{p.category}
									</p>
								)}
								<p className="text-sm font-bold text-(--text) group-hover:text-(--brand) transition-colors">
									{p.title}
								</p>
							</div>
							<ArrowRight
								size={14}
								className="shrink-0 mt-0.5 text-(--text-subtle) group-hover:text-(--brand) transition-all group-hover:translate-x-1"
							/>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
