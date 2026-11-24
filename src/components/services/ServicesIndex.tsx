import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { serviceIcons } from '@/components/services/serviceIcons'
import { pageCopy } from '@/lib/pageCopy'
import type { Locale } from '@/lib/pageCopy'
import { localizeService, publishedServices, publishedServicesId, serviceHref } from '@/lib/services'

export function ServicesIndex({ locale }: { locale: Locale }) {
	const copy = pageCopy[locale]
	const services = (locale === 'id' ? publishedServicesId() : publishedServices()).map((s) => localizeService(s, locale))
	return (
		<article>
			<header className="border-b border-(--border) pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">
						{copy.servicesEyebrow}
					</p>
					<h1 className="text-5xl font-bold text-(--text) max-w-2xl leading-tight">
						{copy.servicesH1}
					</h1>
					<p className="mt-4 text-lg text-(--text-muted) max-w-xl">
						{copy.servicesIntro}
					</p>
				</div>
			</header>

			<section className="py-20" aria-label="Our services">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-(--border) border border-(--border)">
						{services.map((service) => {
							const Icon = serviceIcons[service.icon]
							return (
								<Link
									key={service.slug}
									href={serviceHref(service, locale)}
									className="bg-(--bg) p-10 flex flex-col group hover:bg-(--bg-subtle) transition-colors"
								>
									<div className="flex items-center gap-3 mb-8">
										<div className="p-2.5 border border-(--border) text-(--brand) bg-(--bg-subtle)">
											<Icon size={22} />
										</div>
									</div>

									<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-2">
										{service.tagline}
									</p>

									<h2 className="text-3xl font-bold text-(--text) mb-6 group-hover:text-(--brand) transition-colors">
										{service.navLabel}
									</h2>

									<p className="text-sm text-(--text-muted) leading-relaxed flex-1 mb-8">
										{service.description}
									</p>

									<span className="inline-flex items-center gap-1.5 text-sm font-mono text-(--brand) group-hover:gap-3 transition-all">
										{copy.explore}
										<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
									</span>
								</Link>
							)
						})}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="border-t border-(--border) bg-(--bg-subtle) py-20" aria-label="Call to action">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-2xl font-bold text-(--text) mb-4">{copy.consultHeading}</p>
					<p className="text-(--text-muted) mb-8 max-w-md">
						{copy.consultBody}
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						{copy.consultButton}
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>
		</article>
	)
}
