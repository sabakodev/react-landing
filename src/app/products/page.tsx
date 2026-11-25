import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { ProductStatusBadge } from '@/components/products/ProductStatusBadge'
import { JsonLd } from '@/components/seo/JsonLd'
import { bentoSpans } from '@/components/ui/gridSpans'
import { products } from '@/lib/products'
import { breadcrumb, softwareApplication } from '@/lib/seo/jsonld'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
	title: 'Products — SERP API and Styx Crawler',
	description:
		'Infrastructure built and operated by SABAKO: a SERP API and Styx, an invite-only crawler-as-a-service.',
	path: '/products',
})

export default function ProductsPage() {
	const spans = bentoSpans(products.length, { preferPairs: true })

	return (
		<article>
			<JsonLd
				data={[
					breadcrumb([
						{ name: 'Home', path: '/' },
						{ name: 'Products', path: '/products' },
					]),
					...products.map(softwareApplication),
				]}
			/>
			<header className="border-b border-(--border) pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">Products</p>
					<h1 className="text-5xl font-bold text-(--text) max-w-2xl leading-tight">
						Infrastructure we build and run ourselves.
					</h1>
					<p className="mt-4 text-lg text-(--text-muted) max-w-xl">
						The same team that builds for our clients operates these in production every day.
					</p>
				</div>
			</header>

			<section className="py-20" aria-label="Our products">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-(--border) border border-(--border)">
						{products.map((product, i) => (
							<div
								key={product.id}
								id={product.id}
								className={`${spans.items[i]} bg-(--bg) p-10 flex flex-col`}
							>
								<div className="mb-8">
									<ProductStatusBadge status={product.status} />
								</div>

								{product.descriptor && (
									<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mb-2">
										{product.descriptor}
									</p>
								)}

								<h2 className="text-3xl font-bold text-(--text) mb-6">{product.name}</h2>

								<p className="text-sm text-(--text-muted) leading-relaxed flex-1 mb-8">{product.tagline}</p>

								<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
									<TrackedLink
										href={product.cta.href}
										label={`${product.name}: ${product.cta.label}`}
										section="products"
										className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
									>
										{product.cta.label}
										<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
									</TrackedLink>
									{product.secondary && (
										<TrackedLink
											href={product.secondary.href}
											label={`${product.name}: ${product.secondary.label}`}
											section="products"
											className="text-sm font-mono text-(--brand) hover-underline"
										>
											{product.secondary.label}
										</TrackedLink>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="border-t border-(--border) bg-(--bg-subtle) py-16" aria-label="Talk to us">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-lg text-(--text-muted)">
						Need something built on top of these, or something like them?{' '}
						<TrackedLink
							href="/contact"
							label="Talk to us"
							section="products-cta"
							className="inline-flex items-center gap-1.5 font-medium text-(--text) hover:text-(--brand) transition-colors group"
						>
							Talk to us
							<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
						</TrackedLink>
					</p>
				</div>
			</section>
		</article>
	)
}
