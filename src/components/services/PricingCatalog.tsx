'use client'

/**
 * PricingCatalog — IDR website packages for Indonesian businesses.
 *
 * Four tiers: 4 columns on desktop, 2x2 on tablet, stacked on mobile.
 * Starter keeps a low entry price; the highlighted Growth tier is the intended choice.
 * Tracks tier CTA clicks via useButtonTracking.
 *
 * gate="none" renders immediately (the /id pages: the visitor chose Indonesian).
 * gate="geo" renders only for an Indonesian timezone AND an Indonesian IP:
 * the timezone is read first, and /api/geo is called only when it matches.
 */

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Rocket } from 'lucide-react'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'
import type { Locale } from '@/lib/pageCopy'

type Tier = {
	/** Also the `tier` query value; the contact API allowlists these ids */
	id: 'starter' | 'essential' | 'growth' | 'custom'
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

type CatalogCopy = {
	eyebrow: string
	heading: string
	intro: string
	popular: string
	footnote: string
	tiers: Tier[]
}

const COPY: Record<Locale, CatalogCopy> = {
	en: {
		eyebrow: 'Pricing',
		heading: 'Packages for Indonesian businesses',
		intro:
			'Fixed-price website packages for small and growing businesses in Indonesia, priced in IDR. Larger platforms are scoped under the engagement models above.',
		popular: 'Popular',
		footnote:
			'Prices in IDR and exclude VAT (PPN 11%). Hosting renews yearly after the first year. International projects quoted in USD.',
		tiers: [
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
					'Online store with local payment gateways',
					'Analytics & conversion tracking set up',
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
				],
				billingNote: 'quoted per scope',
				cta: 'Contact Us',
				ctaHref: '/contact?service=web&tier=custom',
			},
		],
	},
	// DRAFT — owner review required (Bahasa Indonesia copy)
	id: {
		eyebrow: 'Harga',
		heading: 'Paket untuk bisnis Indonesia',
		intro:
			'Paket website harga tetap untuk bisnis kecil dan berkembang di Indonesia, dengan harga dalam Rupiah. Platform yang lebih besar ditangani lewat model kerja sama di atas.',
		popular: 'Populer',
		footnote:
			'Harga dalam IDR dan belum termasuk PPN 11%. Hosting diperpanjang setiap tahun setelah tahun pertama. Proyek internasional ditawarkan dalam USD.',
		tiers: [
			{
				id: 'starter',
				name: 'Starter',
				price: 'IDR 2.499.000',
				priceLabel: 'Mulai dari',
				description: 'Situs peluncuran satu halaman dengan template kami yang sudah dioptimalkan — untuk Anda yang biasanya memakai website builder.',
				features: [
					'Situs peluncuran satu halaman',
					'Template kami yang dioptimalkan untuk performa',
					'Formulir kontak & tombol WhatsApp',
					'Domain dan kode menjadi milik Anda',
				],
				billingNote: 'sekali bayar · termasuk hosting tahun pertama',
				cta: 'Mulai dari yang Kecil',
				ctaHref: '/contact?service=web&tier=starter',
			},
			{
				id: 'essential',
				name: 'Essential',
				price: 'IDR 5.000.000',
				priceLabel: 'Mulai dari',
				description: 'Website perusahaan dengan desain khusus yang mencerminkan brand Anda, bukan template.',
				features: [
					'Desain khusus, hingga 5 halaman',
					'Cepat di jaringan seluler (lolos Core Web Vitals)',
					'Siap untuk Google: metadata, sitemap, structured data',
					'Siap dwibahasa EN / ID',
				],
				billingNote: 'sekali bayar · termasuk hosting tahun pertama',
				cta: 'Mulai Sekarang',
				ctaHref: '/contact?service=web&tier=essential',
			},
			{
				id: 'growth',
				name: 'Growth',
				price: 'IDR 12.000.000',
				priceLabel: 'Mulai dari',
				description: 'Untuk bisnis yang menerbitkan konten, berjualan, dan mengukur hasil — situs yang bisa dikelola tim Anda tanpa perlu menghubungi kami.',
				features: [
					'Semua fitur Essential',
					'CMS yang bisa diedit tim Anda',
					'Toko online dengan payment gateway lokal',
					'Analytics & pelacakan konversi sudah terpasang',
				],
				billingNote: 'sekali bayar · termasuk hosting tahun pertama',
				cta: 'Mulai Sekarang',
				ctaHref: '/contact?service=web&tier=growth',
				popular: true,
			},
			{
				id: 'custom',
				name: 'Solusi Khusus',
				price: 'IDR 35.000.000',
				priceLabel: 'Mulai dari',
				description: 'Aplikasi web, platform SaaS, dan integrasi, dengan ruang lingkup dan penawaran sesuai kebutuhan Anda.',
				features: [
					'Semua fitur Growth',
					'Fitur dan dashboard khusus',
					'Integrasi API pihak ketiga',
					'Arsitektur multi-tenant / SaaS',
				],
				billingNote: 'harga sesuai ruang lingkup',
				cta: 'Hubungi Kami',
				ctaHref: '/contact?service=web&tier=custom',
			},
		],
	},
}

const ID_TIMEZONES = new Set(['Asia/Jakarta', 'Asia/Pontianak', 'Asia/Makassar', 'Asia/Jayapura'])

const subscribeNoop = () => () => {}
const readTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

export function PricingCatalog({ gate, locale }: { gate: 'geo' | 'none'; locale: Locale }) {
	const track = useButtonTracking()
	const copy = COPY[locale]

	// Step one: timezone. The server snapshot is '' so SSR and the first client
	// render match (no hydration error); the real timezone applies after hydration.
	const tz = useSyncExternalStore(subscribeNoop, readTimeZone, () => '')
	const tzMatches = ID_TIMEZONES.has(tz)
	const [country, setCountry] = useState<string | null>(null)

	// Step two, only for an Indonesian timezone: ask the server for the IP country.
	useEffect(() => {
		if (gate !== 'geo' || !tzMatches) return
		const controller = new AbortController()
		// Testing override, honoured by /api/geo outside production only
		const geo = new URLSearchParams(window.location.search).get('geo')
		fetch(geo ? `/api/geo?geo=${encodeURIComponent(geo)}` : '/api/geo', {
			cache: 'no-store',
			signal: controller.signal,
		})
			.then((res) => (res.ok ? res.json() : null))
			.then((data: { country?: unknown } | null) => {
				setCountry(typeof data?.country === 'string' ? data.country : null)
			})
			.catch(() => {
				// Network error or abort: tiers stay hidden
			})
		return () => controller.abort()
	}, [gate, tzMatches])

	const visible = gate === 'none' || (tzMatches && country === 'ID')
	if (!visible) return null

	return (
		<section className="py-20 border-t border-(--border)" aria-labelledby="pricing-heading">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">
					{copy.eyebrow}
				</p>
				<h2 id="pricing-heading" className="text-2xl lg:text-3xl font-bold text-(--text) mb-4">
					{copy.heading}
				</h2>
				<p className="text-(--text-muted) mb-14 max-w-xl text-sm leading-relaxed">
					{copy.intro}
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-(--border)">
					{copy.tiers.map((tier) => (
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
									{copy.popular}
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
								onClick={track(tier.cta, locale === 'id' ? 'pricing-catalog-id' : 'pricing-catalog', { tier: tier.id, price: tier.price ?? 'custom' })}
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
					{copy.footnote}
				</p>
			</div>
		</section>
	)
}
