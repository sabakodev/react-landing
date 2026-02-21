'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MouseIcon, Sparkles } from 'lucide-react'
import { HeroSphere } from './HeroSphere'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'

const words = ['Digital Experiences', 'Mobile Products', 'Connected Systems']

export function HeroSection() {
	const track = useButtonTracking()
	const [wordIndex, setWordIndex] = useState(0)
	const [displayed, setDisplayed] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const currentWord = words[wordIndex]

		if (!isDeleting && displayed === currentWord) {
			timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200)
		} else if (isDeleting && displayed === '') {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setIsDeleting(false)
			setWordIndex((i) => (i + 1) % words.length)
		} else {
			const speed = isDeleting ? 40 : 70
			timeoutRef.current = setTimeout(() => {
				setDisplayed(
					isDeleting
						? currentWord.slice(0, displayed.length - 1)
						: currentWord.slice(0, displayed.length + 1),
				)
			}, speed)
		}

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [displayed, isDeleting, wordIndex])

	return (
		<section
			className="relative min-h-svh flex flex-col justify-center overflow-hidden cursor-crosshair"
			aria-label="Hero section"
		>
			{/* Grid background */}
			<div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

			{/* Gradient overlay */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,92,232,0.08) 0%, transparent 70%)',
				}}
				aria-hidden="true"
			/>

			{/* Accent line */}
			<div
				className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-(--brand) to-transparent opacity-40"
				aria-hidden="true"
			/>

			{/* 3D sphere — desktop only, mouse-reactive */}
			<HeroSphere />

			<div className="relative max-w-7xl px-6 lg:px-24 pt-32 pb-24">
				{/* Badge */}
				<div
					className="inline-flex items-center gap-2 px-3 py-1.5 border border-(--border) bg-(--bg-subtle) text-xs font-mono text-(--text-muted) mb-8 animate-fade-up"
					style={{ animationDelay: '0.1s', opacity: 0 }}
				>
					<Sparkles size={12} className="text-(--brand)" />
					IT Agency &amp; Consulting — Jakarta, Indonesia
				</div>

				{/* Headline */}
				<h1
					className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-(--text) max-w-4xl animate-fade-up"
					style={{ animationDelay: '0.2s', opacity: 0 }}
				>
					We build{' '}<br />
					<span className="relative">
						<span className="text-(--brand)">
							{displayed}
							<span className="animate-blink text-(--brand)">|</span>
						</span>
					</span>
					<br />
					for ambitious
					<br />
					businesses.
				</h1>

				{/* Description */}
				<p
					className="mt-8 text-lg text-(--text-muted) max-w-xl leading-relaxed animate-fade-up"
					style={{ animationDelay: '0.35s', opacity: 0 }}
				>
					From enterprise web platforms to cross-platform mobile apps and IoT-connected systems — SABAKO delivers technology that scales.
				</p>

				{/* CTAs */}
				<div
					className="mt-10 flex flex-wrap gap-4 animate-fade-up"
					style={{ animationDelay: '0.5s', opacity: 0 }}
				>
					<Link
						href="/contact"
						id="hero-start-project"
						className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
						onClick={track('Start a Project', 'hero')}
					>
						Start a Project
						<ArrowRight
							size={16}
							className="transition-transform group-hover:translate-x-1"
						/>
					</Link>
					<Link
						href="/work"
						id="hero-view-work"
						className="inline-flex items-center gap-2 px-6 py-3 border border-(--border) text-(--text) text-sm font-medium hover:border-(--border-strong) hover:bg-(--bg-subtle) transition-colors"
						onClick={track('View Our Work', 'hero')}
					>
						View Our Work
					</Link>
				</div>



				{/* Service pills */}
				{/* <ServicePills data={[
					'Web Development',
					'App Development',
					'IoT Solutions',
					'SaaS Platforms',
					'Mobile Apps',
					'Smart Devices',
				]} /> */}
			</div>

			{/* Scroll indicator */}
			<div
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-(--text-subtle) animate-fade-in"
				style={{ animationDelay: '1s', opacity: 0 }}
				aria-hidden="true"
			>
				<span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
				{/* <div className="animate-ping w-px h-8 bg-linear-to-t from-(--border-strong) to-transparent" /> */}
				<MouseIcon size={24} className="animate-bounce opacity-50" />
			</div>
		</section>
	)
}

export function ServicePills({ data }: { data: string[] }) {
	return (
		<div
			className="mt-16 flex flex-wrap gap-3 animate-fade-up"
			style={{ animationDelay: '0.65s', opacity: 0 }}
		>
			{data.map((tag) => (
				<span
					key={tag}
					className="px-3 py-1.5 text-xs font-mono border border-(--border) text-(--text-muted) bg-(--bg-subtle)"
				>
					{tag}
				</span>
			))}
		</div>
	)
}