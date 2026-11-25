import { ArrowRight } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { Locale } from '@/lib/pageCopy'

/** Indicative USD starting rates, shown on EN and ID pages alike. */
export const ENGAGEMENT_RATES = {
	fixed: 'From USD 40,000',
	team: 'From USD 90 / hour · about USD 14,400 per engineer per month',
	retainer: 'From USD 3,600 / month',
} as const

type ModelKey = keyof typeof ENGAGEMENT_RATES

const COPY: Record<
	Locale,
	{
		eyebrow: string
		heading: string
		suitsLabel: string
		cta: string
		footnote: string
		models: { key: ModelKey; name: string; suits: string }[]
	}
> = {
	en: {
		eyebrow: 'Engagement',
		heading: 'Three ways to work with us.',
		suitsLabel: 'Suits',
		cta: 'Discuss this model',
		footnote: 'Indicative starting rates, excluding tax. Every engagement is quoted after a scoping call.',
		models: [
			{ key: 'fixed', name: 'Fixed-scope project', suits: 'A defined product or platform with an agreed scope.' },
			{
				key: 'team',
				name: 'Dedicated team',
				suits: 'An ongoing roadmap that needs senior engineers embedded with your team.',
			},
			{ key: 'retainer', name: 'Retainer & support', suits: 'Keeping a live system healthy and improving.' },
		],
	},
	// DRAFT — owner review required (Bahasa Indonesia copy)
	id: {
		eyebrow: 'Model Kerja Sama',
		heading: 'Tiga cara bekerja dengan kami.',
		suitsLabel: 'Cocok untuk',
		cta: 'Diskusikan model ini',
		footnote: 'Tarif awal indikatif, belum termasuk pajak. Setiap kerja sama diberi penawaran setelah sesi penentuan ruang lingkup.',
		models: [
			{
				key: 'fixed',
				name: 'Proyek lingkup tetap',
				suits: 'Produk atau platform yang jelas dengan ruang lingkup yang disepakati.',
			},
			{
				key: 'team',
				name: 'Tim khusus',
				suits: 'Roadmap berkelanjutan yang membutuhkan engineer senior yang bekerja langsung bersama tim Anda.',
			},
			{
				key: 'retainer',
				name: 'Retainer & dukungan',
				suits: 'Menjaga sistem yang sudah berjalan tetap sehat dan terus membaik.',
			},
		],
	},
}

export function EngagementModels({ serviceSlug, locale }: { serviceSlug: string; locale: Locale }) {
	const copy = COPY[locale]
	const section = `service-${serviceSlug}-engagement-models${locale === 'id' ? '-id' : ''}`

	return (
		<section className="py-20 border-t border-(--border)" aria-labelledby="engagement-models-heading">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">{copy.eyebrow}</p>
				<h2 id="engagement-models-heading" className="text-2xl lg:text-3xl font-bold text-(--text) mb-14">
					{copy.heading}
				</h2>

				<ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-(--border) border border-(--border)" role="list">
					{copy.models.map((model) => (
						<li key={model.key} className="bg-(--bg) p-8 flex flex-col">
							<h3 className="text-lg font-bold text-(--text) mb-4">{model.name}</h3>
							<p className="text-[10px] font-mono uppercase tracking-widest text-(--text-subtle) mb-1">
								{copy.suitsLabel}
							</p>
							<p className="text-sm text-(--text-muted) leading-relaxed mb-6 flex-1">{model.suits}</p>
							<p className="text-sm font-bold text-(--text) mb-6">{ENGAGEMENT_RATES[model.key]}</p>
							<TrackedLink
								href={`/contact?service=${serviceSlug}&model=${model.key}`}
								label={model.name}
								section={section}
								className="inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-medium border border-(--border) text-(--text) hover:border-(--brand) hover:text-(--brand) transition-colors group"
							>
								{copy.cta}
								<span className="sr-only">: {model.name}</span>
								<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
							</TrackedLink>
						</li>
					))}
				</ul>

				<p className="text-[10px] font-mono text-(--text-subtle) mt-6">{copy.footnote}</p>
			</div>
		</section>
	)
}
