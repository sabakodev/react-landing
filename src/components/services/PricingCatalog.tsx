'use client'

/**
 * PricingCatalog — Website Development pricing tiers.
 *
 * Three-column card layout (stacked on mobile).
 * CTA labels can be randomized via jargonSet pattern.
 * Tracks tier CTA clicks via useButtonTracking.
 */

import Link from 'next/link'
import { CheckCircle, ArrowRight, Sparkles, Rocket } from 'lucide-react'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'


type Tier = {
	id: string
	name: string
	price: string | null   // null = "Let's talk"
	priceLabel: string
	description: string
	features: string[]
	cta: string
	ctaHref: string
	popular?: boolean
}

const TIERS: Tier[] = [
	{
		id: 'essential',
		name: 'Essential',
		price: 'IDR 2.499.000',
		priceLabel: 'Starting from',
		description: 'The right foundation for businesses making their first digital move.',
		features: [
			'Company profile / landing page',
			'Up to 5 pages',
			'Contact form integration',
			'Fully responsive design',
			'Basic SEO setup',
			'2 revision rounds',
			'Basic hosting',
		],
		cta: 'Get Started',
		ctaHref: '/contact?service=web&tier=essential',
	},
	{
		id: 'growth',
		name: 'Growth',
		price: 'IDR 5.699.000',
		priceLabel: 'Starting from',
		description: 'For businesses ready to scale with content and commerce capabilities.',
		features: [
			'Everything in Essential',
			'Free domain for first year',
			'Multi-page architecture',
			'Blog / CMS integration',
			'Basic e-commerce functionality',
			'Performance optimization',
			'3 months post-launch support',
		],
		cta: 'Get Started',
		ctaHref: '/contact?service=web&tier=growth',
		popular: true,
	},
	{
		id: 'custom',
		name: 'Custom Solution',
		price: null,
		priceLabel: "Let's talk",
		description: 'Complex, fully tailored projects — enterprise apps, SaaS platforms, and custom integrations.',
		features: [
			'Everything in Growth',
			'Custom feature development',
			'Third-party API integrations',
			'Multi-tenant / SaaS architecture',
			'Enterprise-grade security',
			'Dedicated project manager',
		],
		cta: 'Contact Us',
		ctaHref: '/contact?service=web&tier=custom',
	},
]

export function PricingCatalog() {
	const track = useButtonTracking()

	// Timezone check: only show IDR pricing for SE Asian visitors.
	// Reading at render time is fine — Intl is always available.
	// During SSR this returns '' so the section is hidden server-side (safe hydration).
	const tz = typeof window !== 'undefined'
		? Intl.DateTimeFormat().resolvedOptions().timeZone
		: ''

	return tz.startsWith('Asia') && (
		<section className="py-20 border-t border-[var(--border)]" aria-labelledby="pricing-heading">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
					Pricing
				</p>
				<h2 id="pricing-heading" className="text-2xl lg:text-3xl font-bold text-[var(--text)] mb-4">
					Transparent starting prices.
				</h2>
				<p className="text-[var(--text-muted)] mb-14 max-w-xl text-sm leading-relaxed">
					Every project is unique — these are starting points. Final pricing depends on scope, timeline, and integrations required. We always provide a detailed quote before work begins.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
					{TIERS.map((tier) => (
						<div
							key={tier.id}
							className={`relative flex flex-col p-8 ${tier.popular
								? 'bg-[var(--bg-subtle)]'
								: 'bg-[var(--bg)]'
								}`}
						>
							{/* Popular badge */}
							{tier.popular && (
								<div className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1.5 bg-[var(--brand)] text-white text-[10px] font-mono uppercase tracking-widest">
									<Rocket size={10} />
									Popular
								</div>
							)}

							{/* Header */}
							<div className="mb-6">
								<p className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-2">
									{tier.name}
								</p>
								<div className="mb-3">
									{tier.price ? (
										<>
											<p className="text-[10px] font-mono text-[var(--text-subtle)] mb-1">{tier.priceLabel}</p>
											<p className="text-2xl font-bold text-[var(--text)]">
												{tier.price}
												<span className="text-xs font-mono font-normal text-[var(--text-subtle)] ml-1.5">/ year</span>
											</p>
										</>
									) : (
										<p className="text-2xl font-bold text-[var(--brand)]">{tier.priceLabel}</p>
									)}
								</div>
								<p className="text-xs text-[var(--text-muted)] leading-relaxed">{tier.description}</p>
							</div>

							{/* Features */}
							<ul className="space-y-3 mb-8 flex-1">
								{tier.features.map((feature) => (
									<li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
										<CheckCircle
											size={14}
											className="text-[var(--brand)] flex-shrink-0 mt-0.5"
										/>
										{feature}
									</li>
								))}
							</ul>

							{/* CTA */}
							<Link
								href={tier.ctaHref}
								id={`pricing-cta-${tier.id}`}
								onClick={track(tier.cta, 'pricing-catalog', { tier: tier.id, price: tier.price ?? 'custom' })}
								className={`inline-flex items-center justify-center gap-2 w-full py-3 text-sm font-medium transition-all group ${tier.popular
									? 'bg-[var(--text)] text-[var(--bg)] hover:opacity-80'
									: 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)]'
									}`}
							>
								{tier.cta}
								<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
							</Link>
						</div>
					))}
				</div>

				<p className="text-[10px] font-mono text-[var(--text-subtle)] mt-6">
					Prices in IDR and exclude VAT (PPN 11%). International projects quoted in USD.
				</p>
			</div>
		</section>
	)
}
