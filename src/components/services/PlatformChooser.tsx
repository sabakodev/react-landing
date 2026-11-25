import { ArrowRight, CheckCircle } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import type { PlatformChoice } from '@/lib/services'

type Props = {
	choice: PlatformChoice
	eyebrow: string
	chooseWhenLabel: string
	tradeOffLabel: string
	contactHref: string
	section: string
}

/** Side-by-side comparison: when native fits and when cross-platform fits. Stacks on small screens. */
export function PlatformChooser({ choice, eyebrow, chooseWhenLabel, tradeOffLabel, contactHref, section }: Props) {
	return (
		<section className="border-t border-(--border) py-20" aria-labelledby="platform-choice-heading">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">{eyebrow}</p>
				<h2 id="platform-choice-heading" className="text-2xl lg:text-3xl font-bold text-(--text) mb-4">
					{choice.heading}
				</h2>
				<p className="text-sm text-(--text-muted) leading-relaxed max-w-xl mb-10">{choice.intro}</p>

				<ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-(--border) border border-(--border)" role="list">
					{choice.options.map((option) => (
						<li key={option.key} className="bg-(--bg) grid grid-rows-subgrid row-span-3 gap-0">
							<h3 className="px-8 py-4 border-b border-(--border) bg-(--bg-subtle) text-sm font-mono uppercase tracking-widest text-(--brand)">
								{option.name}
							</h3>
							<div className="p-8">
								<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-4">
									{chooseWhenLabel}
								</p>
								<ul className="space-y-3" role="list">
									{option.chooseWhen.map((point) => (
										<li key={point} className="flex items-start gap-3 text-sm text-(--text-muted)">
											<CheckCircle size={16} className="text-(--brand) shrink-0 mt-0.5" aria-hidden="true" />
											{point}
										</li>
									))}
								</ul>
							</div>
							<div className="px-8 py-6 border-t border-(--border)">
								<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-2">{tradeOffLabel}</p>
								<p className="text-sm text-(--text-muted) leading-relaxed">{option.tradeOff}</p>
							</div>
						</li>
					))}
				</ul>

				<TrackedLink
					href={contactHref}
					label="platform_not_sure"
					section={section}
					className="mt-6 inline-flex items-center gap-2 text-sm text-(--text) hover:text-(--brand) transition-colors group"
				>
					{choice.closing}
					<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
				</TrackedLink>
			</div>
		</section>
	)
}
