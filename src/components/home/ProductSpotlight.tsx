'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { FeaturedAnnouncement } from '@/lib/api/announcements'
import { Reveal } from '../ui/Reveal'

/**
 * VARIANT A — Slim announcement bar above the navbar.
 * Sticky (as part of the layout wrapper), not dismissible.
 * Auto-hides after scrolling 80px so the navbar takes over cleanly.
 */
export function ProductSpotlightPill({ announcement }: { announcement: FeaturedAnnouncement }) {
	const [hidden, setHidden] = useState(false)

	useEffect(() => {
		let rafId: number
		// hiddenRef lets the scroll handler read current state without stale closure.
		// We use a ref so we never need to re-subscribe to the scroll event.
		const hiddenRef = { current: false }

		const onScroll = () => {
			cancelAnimationFrame(rafId)
			rafId = requestAnimationFrame(() => {
				const y = window.scrollY
				if (!hiddenRef.current && y > 80) {
					// ── Hide: threshold crossed going down ──────────────────
					hiddenRef.current = true
					setHidden(true)
				}
				// Note: we intentionally do NOT un-hide (one-way latch).
				// This prevents the feedback loop where hiding the banner
				// reduces page height → lowers scrollY → re-shows banner → loop.
			})
		}

		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			cancelAnimationFrame(rafId)
		}
	}, [])

	return (
		<div
			role="banner"
			aria-label={`Announcement spotlight: ${announcement.name}`}
			style={{
				// Use max-height + overflow for a collapse that takes no space when hidden,
				// avoiding layout shift and ghost spacing.
				maxHeight: hidden ? '0px' : '40px',
				overflow: 'hidden',
				transition: 'max-height 0.3s ease',
			}}
		>
			<div className="w-full bg-(--brand) py-2 px-6">
				<div className="mx-auto max-w-7xl flex items-center justify-center gap-3 text-xs font-mono">
					<span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-white text-(--brand) font-bold">
						{announcement.label}
					</span>
					<span className="text-white font-semibold">{announcement.name}</span>
					<span className="text-white/50 hidden sm:inline">·</span>
					<span className="text-white/80 hidden sm:inline">{announcement.description}</span>
					<Link
						href={announcement.href}
						className="inline-flex items-center gap-1 text-white underline underline-offset-2 hover:no-underline group font-medium"
					>
						Learn more <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
					</Link>
				</div>
			</div>
		</div>
	)
}

/**
 * VARIANT B — Full-width advertisement banner after the hero section.
 * More prominent, card-style. Not dismissible.
 */
export function ProductSpotlightBanner({ announcement }: { announcement: FeaturedAnnouncement }) {
	return (
		<section
			role="banner"
			aria-label={`Announcement spotlight: ${announcement.name}`}
			className="border-y border-(--border) bg-(--bg-subtle) relative overflow-hidden"
		>
			<Reveal>
				{/* Decorative gradient */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{ background: 'radial-gradient(ellipse 60% 100% at 0% 50%, rgba(58,92,232,0.05) 0%, transparent 60%)' }}
					aria-hidden="true"
				/>
				<div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
					<div className="flex items-start gap-4 flex-1 min-w-0">
						<div className="shrink-0 w-10 h-10 text-(--brand) flex items-center justify-center font-bold text-lg font-mono">
							<Sparkles size={20} className="text-(--brand) hover:animate-pulse" />
						</div>
						<div>
							<div className="flex items-center gap-2 mb-1">
								<span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 bg-(--brand) text-white">
									{announcement.label}
								</span>
								<span className="text-base font-bold text-(--text)">{announcement.name}</span>
							</div>
							<p className="text-sm text-(--text-muted) leading-relaxed">{announcement.description}</p>
						</div>
					</div>
					<div className="flex items-center gap-3 shrink-0">
						<Link
							href={announcement.href}
							id="spotlight-banner-cta"
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--text) text-(--bg) text-xs font-medium hover:opacity-80 transition-opacity group"
						>
							Learn More <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
						</Link>
					</div>
				</div>
			</Reveal>
		</section>
	)
}
