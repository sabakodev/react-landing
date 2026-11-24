'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { serviceIcons } from '@/components/services/serviceIcons'
import { bentoSpans } from '@/components/ui/gridSpans'
import { IdeaCard } from '@/components/home/IdeaCard'
import { pageCopy } from '@/lib/pageCopy'
import type { Locale } from '@/lib/pageCopy'
import type { ServiceSummary } from '@/lib/services'

/** `services` comes from the server (serviceSummaries) so the catalog never ships in client JS. */
export function ServicesSection({ services, locale = 'en' }: { services: ServiceSummary[]; locale?: Locale }) {
	const copy = pageCopy[locale]
	const spans = bentoSpans(services.length, { withCta: true })

	return (
		<section
			className="py-28"
			aria-labelledby="services-heading"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Header */}
				<Reveal>
					<div className="mb-16">
						<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-3">
							{copy.servicesSectionEyebrow}
						</p>
						<h2
							id="services-heading"
							className="text-4xl font-bold text-(--text) max-w-lg leading-tight"
						>
							{copy.servicesSectionHeading}
						</h2>
					</div>
				</Reveal>

				{/* Services grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-(--border) border border-(--border)">
					{services.map((service, i) => {
						const Icon = serviceIcons[service.icon]
						return (
							<Link
								key={service.slug}
								href={service.href}
								aria-label={`${copy.learnMoreAbout} ${service.navLabel}`}
								className={`${spans.items[i]} group bg-(--bg) p-8 hover:bg-(--bg-subtle) transition-colors`}
							>
								<article
									className="flex h-full flex-col"
								>
									<div className="flex items-center gap-3 mb-6">
										<div className="p-2 border border-(--border) text-(--brand) bg-(--bg-subtle)">
											<Icon size={18} />
										</div>
										<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle)">
											{service.tagline}
										</p>
									</div>

									<h3 className="text-2xl font-bold text-(--text) mb-4 group-hover:text-(--brand) transition-colors">
										{service.navLabel}
									</h3>

									<p className="text-sm text-(--text-muted) leading-relaxed mb-8 flex-1">
										{service.description}
									</p>

									<ul className="space-y-2 mb-8" role="list">
										{service.highlights.slice(0, 3).map((cap) => (
											<li
												key={cap}
												className="flex items-center gap-2 text-xs text-(--text-muted)"
											>
												<span className="w-1 h-1 bg-(--brand) shrink-0" />
												{cap}
											</li>
										))}
									</ul>

									<span className="inline-flex items-center gap-1.5 text-xs font-mono text-(--brand) group-hover:gap-3">
										{copy.learnMore}
										<ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
									</span>
								</article>
							</Link>
						)
					})}
					<IdeaCard className={spans.cta} locale={locale} />
				</div>
			</div>
		</section>
	)
}
