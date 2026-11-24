'use client'

import { useId, useRef, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'
import type { PlatformChoice } from '@/lib/services'

type Props = {
	choice: PlatformChoice
	eyebrow: string
	chooseWhenLabel: string
	tradeOffLabel: string
	section: string
}

/** Two-option tablist: when native fits and when cross-platform fits. */
export function PlatformChooser({ choice, eyebrow, chooseWhenLabel, tradeOffLabel, section }: Props) {
	const track = useButtonTracking()
	const baseId = useId()
	const [selected, setSelected] = useState(0)
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
	const option = choice.options[selected]

	const select = (index: number) => {
		if (index === selected) return
		setSelected(index)
		track(`platform_${choice.options[index].key}`, section)()
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		const count = choice.options.length
		let next: number | null = null
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (selected + 1) % count
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (selected - 1 + count) % count
		if (e.key === 'Home') next = 0
		if (e.key === 'End') next = count - 1
		if (next === null) return
		e.preventDefault()
		select(next)
		tabRefs.current[next]?.focus()
	}

	return (
		<section className="border-t border-(--border) py-20" aria-labelledby={`${baseId}-heading`}>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">{eyebrow}</p>
				<h2 id={`${baseId}-heading`} className="text-2xl lg:text-3xl font-bold text-(--text) mb-4">
					{choice.heading}
				</h2>
				<p className="text-sm text-(--text-muted) leading-relaxed max-w-xl mb-10">{choice.intro}</p>

				<div className="max-w-3xl border border-(--border)">
					<div role="tablist" aria-labelledby={`${baseId}-heading`} className="grid grid-cols-2 gap-px bg-(--border) border-b border-(--border)">
						{choice.options.map((opt, index) => {
							const active = index === selected
							return (
								<button
									key={opt.key}
									ref={(el) => {
										tabRefs.current[index] = el
									}}
									type="button"
									role="tab"
									id={`${baseId}-tab-${opt.key}`}
									aria-selected={active}
									aria-controls={`${baseId}-panel`}
									tabIndex={active ? 0 : -1}
									onClick={() => select(index)}
									onKeyDown={onKeyDown}
									className={`px-6 py-4 text-sm font-mono uppercase tracking-widest transition-colors focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--brand) ${active
										? 'bg-(--bg-subtle) text-(--brand)'
										: 'bg-(--bg) text-(--text-muted) hover:text-(--text)'
										}`}
								>
									{opt.name}
								</button>
							)
						})}
					</div>

					<div
						role="tabpanel"
						id={`${baseId}-panel`}
						aria-labelledby={`${baseId}-tab-${option.key}`}
						tabIndex={0}
						className="p-8 focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--brand)"
					>
						<h3 className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-4">{chooseWhenLabel}</h3>
						<ul className="space-y-3 mb-8" role="list">
							{option.chooseWhen.map((point) => (
								<li key={point} className="flex items-start gap-3 text-sm text-(--text-muted)">
									<CheckCircle size={16} className="text-(--brand) shrink-0 mt-0.5" />
									{point}
								</li>
							))}
						</ul>
						<p className="text-sm text-(--text-muted) leading-relaxed">
							<span className="font-mono text-xs uppercase tracking-widest text-(--text-subtle) mr-2">{tradeOffLabel}</span>
							{option.tradeOff}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
