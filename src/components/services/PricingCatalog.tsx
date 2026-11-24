'use client'

/**
 * PricingCatalog — Website Development pricing tiers.
 *
 * Four tiers: 4 columns on desktop, 2x2 on tablet, stacked on mobile.
 * Starter keeps a low entry price; the highlighted Growth tier is the intended choice.
 * CTA labels can be randomized via jargonSet pattern.
 * Tracks tier CTA clicks via useButtonTracking.
 */

import { useSyncExternalStore } from 'react'
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
	/** Under the price; hosting is bundled only in the packaged tiers */
	billingNote?: string
}

const TIERS: Tier[] = [
	{
		id: 'starter',
		name: 'Starter',
		price: 'IDR 2.499.000',
		priceLabel: 'Starting from',
		description: 'A one-page launch site on our tuned template — for when you would otherwise reach for a site builder.',
		features: [
			'One-page launch site',
			'Our performance-tuned template',
			'Contact form & WhatsApp button',
			'You own the domain and the code',
			'1 revision round',
		],
		billingNote: 'one-time · includes first-year hosting',
		cta: 'Start Small',
		ctaHref: '/contact?service=web&tier=starter',
	},
	{
		id: 'essential',
		name: 'Essential',
		price: 'IDR 5.000.000',
		priceLabel: 'Starting from',
		description: 'A custom-designed company site that looks like your brand, not a template.',
		features: [
			'Custom design, up to 5 pages',
			'Fast on mobile data (passes Core Web Vitals)',
			'Google-ready: metadata, sitemap, structured data',
			'Bilingual EN / ID ready',
			'2 revision rounds',
		],
		billingNote: 'one-time · includes first-year hosting',
		cta: 'Get Started',
		ctaHref: '/contact?service=web&tier=essential',
	},
	{
		id: 'growth',
		name: 'Growth',
		price: 'IDR 12.000.000',
		priceLabel: 'Starting from',
		description: 'For businesses that publish, sell and measure — a site your team runs without calling us.',
		features: [
			'Everything in Essential',
			'CMS your team can edit',
			'Blog and landing pages for campaigns',
			'Online store with local payment gateways',
			'Analytics & conversion tracking set up',
			'A named engineer for 3 months after launch',
		],
		billingNote: 'one-time · includes first-year hosting',
		cta: 'Get Started',
		ctaHref: '/contact?service=web&tier=growth',
		popular: true,
	},
	{
		id: 'custom',
		name: 'Custom Solution',
		price: 'IDR 35.000.000',
		priceLabel: 'From',
		description: 'Web apps, SaaS platforms and integrations, scoped and quoted for your requirements.',
		features: [
			'Everything in Growth',
			'Custom features and dashboards',
			'Third-party API integrations',
			'Multi-tenant / SaaS architecture',
			'Security review before launch',
			'Dedicated project manager',
		],
		billingNote: 'quoted per scope',
		cta: 'Contact Us',
		ctaHref: '/contact?service=web&tier=custom',
	},
]

const subscribeNoop = () => () => {}
const readTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

export function PricingCatalog() {
	const track = useButtonTracking()

	// Timezone check: only show IDR pricing for SE Asian visitors.
	// The server snapshot is '' so SSR and the first client render match (no hydration error);
	// the real timezone is applied right after hydration.
	const tz = useSyncExternalStore(subscribeNoop, readTimeZone, () => '')

	return tz.startsWith('Asia') && (
		<section className="py-20 border-t border-(--border)" aria-labelledby="pricing-heading">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">
					Pricing
				</p>
				<h2 id="pricing-heading" className="text-2xl lg:text-3xl font-bold text-(--text) mb-4">
					Transparent starting prices.
				</h2>
				<p className="text-(--text-muted) mb-14 max-w-xl text-sm leading-relaxed">
					Site builders and AI generators are cheaper — until you need speed, ownership, or someone accountable. Packaged tiers include the build and your first year of hosting; we send a detailed quote before work begins.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-(--border)">
					{TIERS.map((tier) => (
						<div
							key={tier.id}
							className={`relative flex flex-col p-8 ${tier.popular
								? 'bg-(--bg-subtle)'
								: 'bg-(--bg)'
								}`}
						>
							{/* Popular badge */}
							{tier.popular && (
								<div className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1.5 bg-(--brand) text-white text-[10px] font-mono uppercase tracking-widest">
									<Rocket size={10} />
									Popular
								</div>
							)}

							{/* Header */}
							<div className="mb-6">
								<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-2">
									{tier.name}
								</p>
								<div className="mb-3">
									{tier.price ? (
										<>
											<p className="text-[10px] font-mono text-(--text-subtle) mb-1">{tier.priceLabel}</p>
											<p className="text-2xl font-bold text-(--text)">
												{tier.price}
												{tier.billingNote && (
													<span className="block mt-1 text-[10px] font-mono font-normal text-(--text-subtle)">{tier.billingNote}</span>
												)}
											</p>
										</>
									) : (
										<p className="text-2xl font-bold text-(--brand)">{tier.priceLabel}</p>
									)}
								</div>
								<p className="text-xs text-(--text-muted) leading-relaxed">{tier.description}</p>
							</div>

							{/* Features */}
							<ul className="space-y-3 mb-8 flex-1">
								{tier.features.map((feature) => (
									<li key={feature} className="flex items-start gap-2.5 text-sm text-(--text-muted)">
										<CheckCircle
											size={14}
											className="text-(--brand) shrink-0 mt-0.5"
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
									? 'bg-(--text) text-(--bg) hover:opacity-80'
									: 'border border-(--border) text-(--text) hover:border-(--brand) hover:text-(--brand)'
									}`}
							>
								{tier.cta}
								<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
							</Link>
						</div>
					))}
				</div>

				<p className="text-[10px] font-mono text-(--text-subtle) mt-6">
					Prices in IDR and exclude VAT (PPN 11%). Hosting renews yearly after the first year. International projects quoted in USD.
				</p>
			</div>
		</section>
	)
}
