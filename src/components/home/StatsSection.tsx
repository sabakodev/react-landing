'use client'

import { Reveal } from '@/components/ui/Reveal'

const stats = [
	{ value: '7+', label: 'Years in Operation', description: 'Est. 2018' },
	{ value: '100+', label: 'Projects Delivered', description: 'Across industries' },
	{ value: '20+', label: 'Enterprise Clients', description: 'Including government' },
	{ value: '100%', label: 'Satisfaction Rate', description: 'Client-first approach' },
]

export function StatsSection() {
	return (
		<section
			className="border-y border-(--border) bg-(--bg-subtle)"
			aria-label="Company statistics"
		>
			<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-(--border)">
					{stats.map((stat, i) => (
						<div key={stat.label} className="px-6 py-10 md:first:pl-0 md:last:pr-0">
							<Reveal delay={i * 0.1}>
								<dt className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-1">
									{stat.label}
								</dt>
								<dd className="text-4xl font-bold text-(--text) tabular-nums">
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
