'use client'

import { Quote } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

const testimonials = [
	{
		id: 't1',
		quote: 'SABAKO delivered an enterprise-grade ERP system on time and within budget. Their technical depth and attention to detail set them apart from any agency we have worked with.',
		author: 'Director of IT',
		company: 'Government Agency, Jakarta',
	},
	{
		id: 't2',
		quote: 'The mobile app they built for our logistics operations completely transformed how our drivers and dispatchers communicate. Real-time, reliable, beautiful.',
		author: 'VP of Operations',
		company: 'Logistics Group, Surabaya',
	},
	{
		id: 't3',
		quote: 'From smart building sensors to the management dashboard, SABAKO handled every layer of the stack with expertise. We have never had a smoother IoT deployment.',
		author: 'CTO',
		company: 'Commercial Developer, BSD City',
	},
]

export function TestimonialsSection() {
	return (
		<section
			className="py-28 border-t border-[var(--border)]"
			aria-labelledby="testimonials-heading"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Header */}
				<Reveal>
					<div className="mb-16">
						<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-3">
							Testimonials
						</p>
						<h2
							id="testimonials-heading"
							className="text-4xl font-bold text-[var(--text)] max-w-lg leading-tight"
						>
							Trusted by those who demand the best.
						</h2>
					</div>
				</Reveal>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
					{testimonials.map((t, i) => (
						<Reveal key={t.id} delay={i * 0.1}>
							<blockquote
								className="bg-[var(--bg)] p-8 flex flex-col h-full"
							>
								<Quote
									size={24}
									className="text-[var(--brand)] opacity-60 mb-6 flex-shrink-0"
									aria-hidden="true"
								/>
								<p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1 mb-8">
									&ldquo;{t.quote}&rdquo;
								</p>
								<footer className="mt-auto border-t border-[var(--border)] pt-4">
									<cite className="not-italic">
										<p className="text-sm font-medium text-[var(--text)]">{t.author}</p>
										<p className="text-xs text-[var(--text-subtle)] mt-0.5">{t.company}</p>
									</cite>
								</footer>
							</blockquote>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
