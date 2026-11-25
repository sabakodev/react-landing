'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics/trackEvent'
import { pageCopy } from '@/lib/pageCopy'
import type { Locale } from '@/lib/pageCopy'

const CYCLE_MS = 2200

/**
 * Low-commitment CTA that closes the home services grid. Deliberately styled
 * apart from the service cards so it never reads as another service.
 */
export function IdeaCard({ className = '', locale = 'en' }: { className?: string; locale?: Locale }) {
	const copy = pageCopy[locale]
	const words = copy.ideaVerbs.split('|')
	const reduceMotion = useReducedMotion()
	const [index, setIndex] = useState(0)

	useEffect(() => {
		if (reduceMotion) return
		const id = setInterval(() => setIndex((i) => (i + 1) % words.length), CYCLE_MS)
		return () => clearInterval(id)
	}, [reduceMotion, words.length])

	return (
		<div
			className={`${className} relative overflow-hidden bg-(--bg) p-8 lg:p-12 flex flex-col justify-between gap-10`}
		>
			{/* Dotted field + warm glow, so the card reads as an invitation, not a service */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-40"
				style={{
					backgroundImage: 'radial-gradient(var(--border-strong, var(--border)) 1px, transparent 1px)',
					backgroundSize: '16px 16px',
				}}
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full"
				style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--brand) 22%, transparent) 0%, transparent 70%)' }}
			/>

			<div className="relative">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-6">{copy.ideaEyebrow}</p>
				<h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-(--text) leading-[1.05]">
					{copy.ideaHeading}
				</h3>
				<p className="mt-5 text-2xl lg:text-3xl font-bold text-(--text-muted) flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-x-3 gap-y-1">
					<span className="relative inline-block min-w-[6.5ch] text-(--brand)" aria-live="off">
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={words[index]}
								className="inline-block"
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -12 }}
								transition={{ duration: 0.25 }}
							>
								{words[index]}
							</motion.span>
						</AnimatePresence>
					</span>
					<span>{copy.ideaPromise}</span>
				</p>
			</div>

			<div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
				<Link
					href="/contact"
					onClick={() =>
						trackEvent('idea_card_consult_click', { page_section: 'home-services', locale })
					}
					className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
				>
					{copy.ideaCta}
					<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
				</Link>
				<p className="text-xs font-mono text-(--text-subtle)">{copy.ideaMicrocopy}</p>
			</div>
		</div>
	)
}
