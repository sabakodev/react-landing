import type { Metadata } from 'next'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import { ServicesSection } from '@/components/home/ServicesSection'
import { SITE_URL } from '@/lib/seo/jsonld'
import { baseOpenGraph, localeAlternates, twitterCard } from '@/lib/seo/metadata'
import { pageCopy } from '@/lib/pageCopy'
import { serviceSummaries } from '@/lib/services'

const copy = pageCopy.id

export const metadata: Metadata = {
	title: { absolute: copy.homeMetaTitle },
	description: copy.homeIntro,
	alternates: localeAlternates('id', '', '/id'),
	openGraph: {
		...baseOpenGraph,
		locale: 'id_ID',
		url: `${SITE_URL}/id`,
		title: copy.homeMetaTitle,
		description: copy.homeIntro,
	},
	twitter: twitterCard(copy.homeMetaTitle, copy.homeIntro),
}

/** Focused Bahasa Indonesia landing: hero + services + consultation CTA. */
export default function IdHomePage() {
	return (
		<div lang="id">
			<section className="relative flex flex-col justify-center overflow-hidden" aria-label="Hero">
				<div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
				<div className="relative max-w-7xl px-6 lg:px-24 pt-40 pb-24">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 border border-(--border) bg-(--bg-subtle) text-xs font-mono text-(--text-muted) mb-8">
						<Sparkles size={12} className="text-(--brand)" />
						{copy.homeEyebrow}
					</div>
					<h1 className="text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-(--text) max-w-4xl">
						{copy.homeH1}
					</h1>
					<p className="mt-8 text-lg text-(--text-muted) max-w-xl leading-relaxed">
						{copy.homeIntro}
					</p>
					<div className="mt-10 flex flex-wrap gap-4">
						<TrackedLink
							href="/contact"
							label="Start a Project (id)"
							section="hero-id"
							className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
						>
							{copy.startProject}
							<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</TrackedLink>
						<TrackedLink
							href="/work"
							label="View Work (id)"
							section="hero-id"
							className="inline-flex items-center gap-2 px-6 py-3 border border-(--border) text-(--text) text-sm font-medium hover:border-(--border-strong) hover:bg-(--bg-subtle) transition-colors"
						>
							{copy.viewWork}
						</TrackedLink>
					</div>
				</div>
			</section>

			<ServicesSection services={serviceSummaries('id')} locale="id" />

			<section className="border-t border-(--border) bg-(--bg-subtle) py-20" aria-label="Konsultasi">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-2xl font-bold text-(--text) mb-4">{copy.consultHeading}</p>
					<p className="text-(--text-muted) mb-8 max-w-md">{copy.consultBody}</p>
					<div className="flex flex-wrap gap-4">
						<TrackedLink
							href="/contact"
							label="Consult (id)"
							section="consult-id"
							className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
						>
							{copy.consultButton}
							<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</TrackedLink>
						<TrackedLink
							href="mailto:sales@sabako.id"
							label="sales@sabako.id (id)"
							section="consult-id"
							className="inline-flex items-center gap-2 px-6 py-3 border border-(--border) text-(--text) text-sm font-medium hover:bg-(--bg) transition-colors"
						>
							<Mail size={16} />
							sales@sabako.id
						</TrackedLink>
					</div>
				</div>
			</section>
		</div>
	)
}
