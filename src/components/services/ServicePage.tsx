import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react'
import { OtherServices } from '@/components/services/OtherServices'
import { PricingCatalog } from '@/components/services/PricingCatalog'
import { JsonLd } from '@/components/seo/JsonLd'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { getWorks } from '@/lib/graphql/adapters/works'
import type { Work } from '@/lib/graphql/adapters/works'
import { breadcrumb, faqPage, service as serviceJsonLd } from '@/lib/seo/jsonld'
import { SITE_URL } from '@/lib/seo/jsonld'
import { baseOpenGraph, localeAlternates, twitterCard } from '@/lib/seo/metadata'
import { serviceIcons } from '@/components/services/serviceIcons'
import { localePrefix, pageCopy } from '@/lib/pageCopy'
import type { Locale } from '@/lib/pageCopy'
import { localizeService, serviceHref } from '@/lib/services'
import type { Service } from '@/lib/services'

export function serviceMetadata(service: Service, locale: Locale): Metadata {
	const s = localizeService(service, locale)
	const url = `${SITE_URL}${serviceHref(s, locale)}`
	return {
		title: s.metaTitle,
		description: s.metaDescription,
		alternates: s.id
			? localeAlternates(locale, serviceHref(s, 'en'), serviceHref(s, 'id'))
			: { canonical: url },
		openGraph: {
			...baseOpenGraph,
			locale: locale === 'id' ? 'id_ID' : 'en_US',
			url,
			title: s.metaTitle,
			description: s.metaDescription,
			// English service pages have their own app/services/[slug]/opengraph-image
			...(locale === 'en'
				? { images: [{ url: `${serviceHref(s, 'en')}/opengraph-image`, width: 1200, height: 630, alt: s.name }] }
				: {}),
		},
		twitter: twitterCard(s.metaTitle, s.metaDescription),
	}
}

/** CMS works tagged with the service's WordPress category. Never throws. */
async function getRelatedWorks(service: Service): Promise<Work[]> {
	try {
		const works = await getWorks()
		return works.filter((w) => w.categories.some((c) => c.slug === service.wpCategory)).slice(0, 4)
	} catch (error) {
		console.error(`Failed to fetch related works for ${service.slug}:`, error)
		return []
	}
}

export async function ServicePage({ service: baseService, locale }: { service: Service; locale: Locale }) {
	const service = localizeService(baseService, locale)
	const copy = pageCopy[locale]
	const Icon = serviceIcons[service.icon]
	const relatedWorks = await getRelatedWorks(service)
	const showEngagementNote = relatedWorks.length === 0 && Boolean(service.engagementNote)
	const showcase = service.showcase ?? []
	const partners = service.partners ?? []
	const hasShowcase = showcase.length > 0 || partners.length > 0
	const sectionSuffix = locale === 'id' ? '-id' : ''
	const workLinkHref = hasShowcase ? '#showcase' : showEngagementNote ? '#client-engagements' : '/work'

	return (
		<article lang={locale === 'id' ? 'id' : undefined}>
			<JsonLd
				data={[
					serviceJsonLd(service, locale),
					breadcrumb([
						{ name: copy.home, path: localePrefix(locale) || '/' },
						{ name: copy.services, path: `${localePrefix(locale)}/services` },
						{ name: service.navLabel, path: serviceHref(service, locale) },
					]),
					...(service.faqs.length ? [faqPage(service.faqs)] : []),
				]}
			/>
			<header className="border-b border-(--border) pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 border border-(--border) text-(--brand)">
							<Icon size={20} />
						</div>
						<p className="text-xs font-mono uppercase tracking-widest text-(--brand)">
							{service.navLabel}
						</p>
					</div>
					<h1 className="text-5xl font-bold text-(--text) max-w-2xl leading-tight">
						{service.h1}
					</h1>
					<p className="mt-6 text-lg text-(--text-muted) max-w-xl leading-relaxed">
						{service.intro}
					</p>
					<div className="mt-8 flex flex-wrap gap-4">
						<TrackedLink href={`/contact?service=${service.contactValue}`} label={service.ctaLabel} section={`service-${service.slug}-hero${sectionSuffix}`} className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group">
							{service.ctaLabel} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</TrackedLink>
						<TrackedLink href={workLinkHref} label={service.workLinkLabel} section={`service-${service.slug}-hero${sectionSuffix}`} className="inline-flex items-center gap-2 px-6 py-3 border border-(--border) text-(--text) text-sm font-medium hover:bg-(--bg-subtle) transition-colors">
							{service.workLinkLabel}
						</TrackedLink>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					<section aria-labelledby="capabilities-heading">
						<h2 id="capabilities-heading" className="text-2xl font-bold text-(--text) mb-8">{copy.whatWeDeliver}</h2>
						<ul className="space-y-3" role="list">
							{service.capabilities.map((cap) => (
								<li key={cap} className="flex items-center gap-3 text-sm text-(--text-muted)">
									<CheckCircle size={16} className="text-(--brand) shrink-0" />
									{cap}
								</li>
							))}
						</ul>
					</section>

					<section aria-labelledby="approach-heading">
						<h2 id="approach-heading" className="text-2xl font-bold text-(--text) mb-6">{copy.ourApproach}</h2>
						<div className="space-y-4 text-sm text-(--text-muted) leading-relaxed">
							{service.process.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>

						{service.techStack.length > 0 && (
							<div className="mt-10">
								<h3 className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-4">{copy.techStack}</h3>
								<div className="flex flex-wrap gap-2">
									{service.techStack.map((tech) => (
										<span key={tech} className="px-2.5 py-1 text-xs border border-(--border) text-(--text-muted) bg-(--bg-subtle) font-mono">
											{tech}
										</span>
									))}
								</div>
							</div>
						)}
					</section>
				</div>
			</div>

			{relatedWorks.length > 0 && (
				<section className="border-t border-(--border) py-16" aria-labelledby="related-work-heading">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<p
							id="related-work-heading"
							className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-8"
						>
							{copy.relatedWork}
						</p>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-(--border)">
							{relatedWorks.map((work) => (
								<Link
									key={work.id}
									href={`/work/${work.slug}`}
									className="bg-(--bg) p-6 flex items-start gap-4 group hover:bg-(--bg-subtle) transition-colors"
								>
									<div className="flex-1 min-w-0">
										{(work.engagementLabel || work.category) && (
											<p className="text-xs font-mono text-(--text-subtle) uppercase tracking-widest mb-1">
												{work.engagementLabel ?? work.category}
											</p>
										)}
										<p className="text-sm font-bold text-(--text) group-hover:text-(--brand) transition-colors">
											{work.title}
										</p>
										{work.client && <p className="text-xs text-(--text-subtle) mt-1">{work.client}</p>}
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
			)}

			{hasShowcase && (
				<section id="showcase" className="border-t border-(--border) py-16" aria-label={showcase.length > 0 ? copy.showcaseHeading : copy.partnersHeading}>
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						{showcase.length > 0 && (
							<>
								<h2
									id="showcase-heading"
									className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-8"
								>
									{copy.showcaseHeading}
								</h2>
								<ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-(--border) border border-(--border)" role="list">
									{showcase.map((item) => (
										<li key={item.name} className="bg-(--bg)">
											<ShowcaseBody
												href={item.href}
												externalLabel={copy.externalLinkLabel}
												className="h-full p-8 flex flex-col gap-4"
											>
												<span className="self-start px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-(--border) text-(--brand)">
													{item.role}
												</span>
												<span className="flex items-center gap-2 text-xl font-bold text-(--text) group-hover:text-(--brand) transition-colors">
													{item.name}
													{item.href && <ArrowUpRight size={16} aria-hidden="true" className="text-(--text-subtle) group-hover:text-(--brand) transition-colors" />}
												</span>
												<span className="text-sm text-(--text-muted) leading-relaxed">{item.blurb}</span>
											</ShowcaseBody>
										</li>
									))}
								</ul>
							</>
						)}

						{partners.length > 0 && (
							<div className={showcase.length > 0 ? 'mt-12' : undefined}>
								<h3 className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-6">
									{copy.partnersHeading}
								</h3>
								<ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-(--border) border border-(--border)" role="list">
									{partners.map((partner) => (
										<li key={partner.name} className="bg-(--bg)">
											<ShowcaseBody
												href={partner.href}
												externalLabel={copy.externalLinkLabel}
												className="h-full p-6 flex items-start justify-between gap-4"
											>
												<span>
													<span className="block text-base font-bold text-(--text) group-hover:text-(--brand) transition-colors">
														{partner.name}
													</span>
													<span className="mt-1 block text-xs text-(--text-subtle) leading-relaxed">{partner.blurb}</span>
												</span>
												{partner.href && <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 mt-1 text-(--text-subtle) group-hover:text-(--brand) transition-colors" />}
											</ShowcaseBody>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</section>
			)}

			{showEngagementNote && (
				<section
					id="client-engagements"
					className="border-t border-(--border) py-16"
					aria-labelledby="client-engagements-heading"
				>
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<p
							id="client-engagements-heading"
							className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-8"
						>
							{copy.clientEngagements}
						</p>
						<p className="max-w-3xl text-base text-(--text-muted) leading-relaxed">{service.engagementNote}</p>
						<TrackedLink
							href={`/contact?service=${service.contactValue}`}
							label={service.ctaLabel}
							section={`service-${service.slug}-engagements${sectionSuffix}`}
							className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-(--text) hover:text-(--brand) transition-colors group"
						>
							{service.ctaLabel} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
						</TrackedLink>
					</div>
				</section>
			)}

			{service.faqs.length > 0 && (
				<section className="border-t border-(--border) py-16" aria-labelledby="faq-heading">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<h2 id="faq-heading" className="text-2xl font-bold text-(--text) mb-8">{copy.faqHeading}</h2>
						<dl className="max-w-3xl divide-y divide-(--border) border-y border-(--border)">
							{service.faqs.map((faq) => (
								<div key={faq.question} className="py-6">
									<dt className="text-base font-bold text-(--text) mb-2">{faq.question}</dt>
									<dd className="text-sm text-(--text-muted) leading-relaxed">{faq.answer}</dd>
								</div>
							))}
						</dl>
					</div>
				</section>
			)}

			{/* Pricing tiers are English-only copy, so they are shown on English pages only */}
			{service.showPricing && locale === 'en' && <PricingCatalog />}
			<OtherServices current={service.slug} locale={locale} />
		</article>
	)
}

/** Outbound link when an href exists, plain block otherwise. */
function ShowcaseBody({
	href,
	externalLabel,
	className,
	children,
}: {
	href?: string
	externalLabel: string
	className: string
	children: React.ReactNode
}) {
	if (!href) return <div className={className}>{children}</div>
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener"
			className={`${className} group hover:bg-(--bg-subtle) transition-colors`}
		>
			{children}
			<span className="sr-only">({externalLabel})</span>
		</a>
	)
}
