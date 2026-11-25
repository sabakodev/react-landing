import { ArrowRight } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { Locale } from '@/lib/pageCopy'

/**
 * Indicative USD starting rates, shown on EN and ID pages alike.
 * Basis: USD 90 / hour. Team = 160 h per engineer per month; retainer = 40 h per month;
 * fixed scope = about two engineers for six weeks.
 */
export const ENGAGEMENT_RATES = {
	fixed: 'USD 40,000',
	team: 'USD 14,400',
	retainer: 'USD 3,600',
} as const

type ModelKey = keyof typeof ENGAGEMENT_RATES

/** The model most clients start with: gets the badge and the only filled button. */
const USUAL_START: ModelKey = 'fixed'

type ModelCopy = {
	key: ModelKey
	name: string
	bestFor: string
	includes: string
	/** What the starting figure is counted per, e.g. "per month" */
	unit: string
	cta: string
}

const COPY: Record<
	Locale,
	{
		eyebrow: string
		heading: string
		note: string
		bestForLabel: string
		includesLabel: string
		from: string
		usualStart: string
		models: ModelCopy[]
	}
> = {
	en: {
		eyebrow: 'Engagement',
		heading: 'Three ways to work with us.',
		note: 'Indicative starting rates, excluding tax. Every engagement is quoted after a scoping call.',
		bestForLabel: 'Best for',
		includesLabel: 'Includes',
		from: 'From',
		usualStart: 'Where most clients start',
		models: [
			{
				key: 'fixed',
				name: 'Fixed-scope project',
				bestFor: 'A defined product or platform with an agreed scope.',
				includes: 'At the starting figure, about two engineers for six weeks.',
				unit: 'per project',
				cta: 'Scope a project',
			},
			{
				key: 'team',
				name: 'Dedicated team',
				bestFor: 'An ongoing roadmap that needs senior engineers embedded with your team.',
				includes: '160 hours per engineer each month, at USD 90 / hour.',
				unit: 'per engineer / month',
				cta: 'Build a team',
			},
			{
				key: 'retainer',
				name: 'Retainer & support',
				bestFor: 'Keeping a live system healthy and improving.',
				includes: '40 hours each month for fixes, updates and improvements.',
				unit: 'per month',
				cta: 'Set up support',
			},
		],
	},
	// DRAFT — owner review required (Bahasa Indonesia copy)
	id: {
		eyebrow: 'Model Kerja Sama',
		heading: 'Tiga cara bekerja dengan kami.',
		note: 'Tarif awal indikatif, belum termasuk pajak. Setiap kerja sama diberi penawaran setelah sesi penentuan ruang lingkup.',
		bestForLabel: 'Cocok untuk',
		includesLabel: 'Termasuk',
		from: 'Mulai',
		usualStart: 'Titik awal kebanyakan klien',
		models: [
			{
				key: 'fixed',
				name: 'Proyek lingkup tetap',
				bestFor: 'Produk atau platform yang jelas dengan ruang lingkup yang disepakati.',
				includes: 'Pada angka awal, sekitar dua engineer selama enam minggu.',
				unit: 'per proyek',
				cta: 'Tentukan lingkup proyek',
			},
			{
				key: 'team',
				name: 'Tim khusus',
				bestFor: 'Roadmap berkelanjutan yang membutuhkan engineer senior yang bekerja langsung bersama tim Anda.',
				includes: '160 jam per engineer setiap bulan, dengan tarif USD 90 / jam.',
				unit: 'per engineer / bulan',
				cta: 'Bentuk tim',
			},
			{
				key: 'retainer',
				name: 'Retainer & dukungan',
				bestFor: 'Menjaga sistem yang sudah berjalan tetap sehat dan terus membaik.',
				includes: '40 jam setiap bulan untuk perbaikan, pembaruan, dan peningkatan.',
				unit: 'per bulan',
				cta: 'Atur dukungan',
			},
		],
	},
}

const LABEL = 'text-[10px] font-mono uppercase tracking-widest text-(--text-subtle) mb-1'

export function EngagementModels({ serviceSlug, locale }: { serviceSlug: string; locale: Locale }) {
	const copy = COPY[locale]
	const section = `service-${serviceSlug}-engagement-models${locale === 'id' ? '-id' : ''}`

	return (
		<section className="py-20 border-t border-(--border)" aria-labelledby="engagement-models-heading">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">{copy.eyebrow}</p>
				<h2 id="engagement-models-heading" className="text-2xl lg:text-3xl font-bold text-(--text) mb-4">
					{copy.heading}
				</h2>
				<p className="text-sm text-(--text-muted) leading-relaxed max-w-xl mb-10">{copy.note}</p>

				<ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-(--border) border border-(--border)" role="list">
					{copy.models.map((model) => {
						const usual = model.key === USUAL_START
						return (
							<li key={model.key} className={`p-8 flex flex-col ${usual ? 'bg-(--bg-subtle)' : 'bg-(--bg)'}`}>
								{/* Fixed-height slot keeps the three titles on one line */}
								<p className={`h-6 mb-3 ${usual ? '' : 'hidden md:block'}`}>
									{usual && (
										<span className="inline-block px-2 py-1 bg-(--brand) text-white text-[10px] font-mono uppercase tracking-widest">
											{copy.usualStart}
										</span>
									)}
								</p>
								<h3 className="text-lg font-bold text-(--text) mb-6">{model.name}</h3>

								<p className={LABEL}>{copy.bestForLabel}</p>
								<p className="text-sm text-(--text-muted) leading-relaxed mb-5">{model.bestFor}</p>

								<p className={LABEL}>{copy.includesLabel}</p>
								<p className="text-sm text-(--text-muted) leading-relaxed mb-8 flex-1">{model.includes}</p>

								<p className="border-t border-(--border) pt-6 mb-6">
									<span className="block text-xs text-(--text-subtle) mb-1">{copy.from}</span>
									<span className="text-xl font-bold text-(--text)">{ENGAGEMENT_RATES[model.key]}</span>{' '}
									<span className="text-xs text-(--text-muted)">{model.unit}</span>
								</p>

								<TrackedLink
									href={`/contact?service=${serviceSlug}&model=${model.key}`}
									label={model.name}
									section={section}
									className={`inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-medium transition group ${usual
										? 'border border-(--text) bg-(--text) text-(--bg) hover:opacity-80'
										: 'border border-(--border) text-(--text) hover:border-(--brand) hover:text-(--brand)'
										}`}
								>
									{model.cta}
									<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
								</TrackedLink>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}
