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
		const onScroll = () => setHidden(window.scrollY > 80)
		window.addEventListener('scroll', onScroll, { passive: true })
		// Set initial state in case page is already scrolled (e.g. browser back)
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
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
			<div className="w-full bg-[var(--brand)] py-2 px-6">
				<div className="mx-auto max-w-7xl flex items-center justify-center gap-3 text-xs font-mono">
					<span className="px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-white text-[var(--brand)] font-bold">
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
			className="border-y border-[var(--border)] bg-[var(--bg-subtle)] relative overflow-hidden"
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
						<div className="flex-shrink-0 w-10 h-10 text-[var(--brand)] flex items-center justify-center font-bold text-lg font-mono">
							<Sparkles size={20} className="text-[var(--brand)] hover:animate-pulse" />
						</div>
						<div>
							<div className="flex items-center gap-2 mb-1">
								<span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 bg-[var(--brand)] text-white">
									{announcement.label}
								</span>
								<span className="text-base font-bold text-[var(--text)]">{announcement.name}</span>
							</div>
							<p className="text-sm text-[var(--text-muted)] leading-relaxed">{announcement.description}</p>
						</div>
					</div>
					<div className="flex items-center gap-3 flex-shrink-0">
						<Link
							href={announcement.href}
							id="spotlight-banner-cta"
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text)] text-[var(--bg)] text-xs font-medium hover:opacity-80 transition-opacity group"
						>
							Learn More <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
						</Link>
					</div>
				</div>
			</Reveal>
		</section>
	)
}
