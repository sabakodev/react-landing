import { Reveal } from '@/components/ui/Reveal'

// Server module (no 'use client') so other server pages can import these values.
export const companyStats = [
	{ value: `${new Date().getFullYear() - 2018}+`, label: 'Years in Operation', description: 'Established in 2018' },
	{ value: '100+', label: 'Projects Delivered', description: 'Across multiple industries' },
	{ value: '20+', label: 'Enterprise Clients', description: 'Including government' },
]

export function StatsSection() {
	return (
		<section
			className="border-y border-(--border) bg-(--bg-subtle)"
			aria-label="Company statistics"
		>
			<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<dl className="grid grid-cols-3 divide-x divide-(--border)">
					{companyStats.map((stat, i) => (
						<div key={stat.label} className="px-4 sm:px-6 py-10 md:first:pl-0 md:last:pr-0">
							<Reveal delay={i * 0.1}>
								<dt className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-1">
									{stat.label}
								</dt>
								<dd className="text-3xl sm:text-4xl font-bold text-(--text) tabular-nums">
									{stat.value}
								</dd>
								<dd className="text-xs text-(--text-subtle) mt-1">
									{stat.description}
								</dd>
							</Reveal>
						</div>
					))}
				</dl>
			</div>
		</section>
	)
}
