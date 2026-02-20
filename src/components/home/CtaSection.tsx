'use client'

import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

export function CtaSection() {
	return (
		<section
			className="py-28 border-t border-[var(--border)] bg-[var(--bg-subtle)] relative overflow-hidden"
			aria-labelledby="cta-heading"
		>
			{/* Subtle accent */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(58,92,232,0.06) 0%, transparent 70%)',
				}}
				aria-hidden="true"
			/>

			<Reveal>
				<div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						Ready to Build?
					</p>
					<h2
						id="cta-heading"
						className="text-5xl font-bold text-[var(--text)] max-w-2xl mx-auto leading-tight mb-6"
					>
						Let&apos;s turn your idea into reality.
					</h2>
					<p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-12">
						Whether you need a web app, mobile product, or IoT solution — our team is ready to consult, architect, and deliver.
					</p>

					<div className="flex flex-wrap justify-center gap-4">
						<Link
							href="/contact"
							id="cta-start-project"
							className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-80 transition-opacity group"
						>
							Start a Project
							<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</Link>
						<a
							href="mailto:sales@sabako.id"
							id="cta-email"
							className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--text)] text-sm font-medium hover:bg-[var(--bg)] transition-colors"
						>
							<Mail size={16} />
							sales@sabako.id
						</a>
					</div>

					{/* Office hours */}
					<div className="mt-12 inline-flex items-center gap-3 text-xs font-mono text-[var(--text-subtle)]">
						<span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
						Available Monday–Friday, 08:30–18:00 WIB · Saturday, 10:00–14:00 WIB
					</div>
				</div>
			</Reveal>
		</section>
	)
}
