import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { serviceIcons } from '@/components/services/serviceIcons'
import { pageCopy } from '@/lib/pageCopy'
import type { Locale } from '@/lib/pageCopy'
import { localizeService, publishedServices, publishedServicesId, serviceHref } from '@/lib/services'

export function OtherServices({ current, locale = 'en' }: { current: string; locale?: Locale }) {
	const others = (locale === 'id' ? publishedServicesId() : publishedServices())
		.filter((s) => s.slug !== current)
		.map((s) => localizeService(s, locale))

	return (
		<section
			className="border-t border-(--border) py-16"
			aria-labelledby="other-services-heading"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p
					id="other-services-heading"
					className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-8"
				>
					{pageCopy[locale].otherServices}
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-(--border)">
					{others.map((s) => {
						const Icon = serviceIcons[s.icon]
						return (
							<Link
								key={s.slug}
								href={serviceHref(s, locale)}
								className="bg-(--bg) p-6 flex items-start gap-4 group hover:bg-(--bg-subtle) transition-colors"
							>
								<div className="p-2 border border-(--border) text-(--brand) shrink-0 group-hover:border-(--brand) transition-colors">
									<Icon size={16} aria-hidden="true" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-bold text-(--text) group-hover:text-(--brand) transition-colors mb-1">
										{s.navLabel}
									</p>
									<p className="text-xs text-(--text-subtle) leading-relaxed">{s.shortDescription}</p>
								</div>
								<ArrowRight
									size={14}
									className="shrink-0 mt-0.5 text-(--text-subtle) group-hover:text-(--brand) transition-all group-hover:translate-x-1"
								/>
							</Link>
						)
					})}
				</div>
			</div>
		</section>
	)
}
