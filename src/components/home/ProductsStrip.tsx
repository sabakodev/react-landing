import { ArrowRight } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { ProductStatusBadge } from '@/components/products/ProductStatusBadge'
import { Reveal } from '@/components/ui/Reveal'
import { bentoSpans } from '@/components/ui/gridSpans'
import { products } from '@/lib/products'

export function ProductsStrip() {
	const spans = bentoSpans(products.length, { preferPairs: true })

	return (
		<section className="pb-28" aria-labelledby="products-heading">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<Reveal>
					<div className="mb-12">
						<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-3">Products</p>
						<h2 id="products-heading" className="text-4xl font-bold text-(--text) max-w-lg leading-tight">
							We run what we build.
						</h2>
					</div>
				</Reveal>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-(--border) border border-(--border)">
					{products.map((product, i) => (
						<TrackedLink
							key={product.id}
							href="/products"
							label={product.name}
							section="home-products"
							className={`${spans.items[i]} group bg-(--bg) p-8 flex flex-col hover:bg-(--bg-subtle) transition-colors`}
						>
							<div className="flex flex-wrap items-center justify-between gap-3 mb-6">
								<h3 className="text-2xl font-bold text-(--text) group-hover:text-(--brand) transition-colors">
									{product.name}
								</h3>
								<ProductStatusBadge status={product.status} />
							</div>
							<p className="text-sm text-(--text-muted) leading-relaxed mb-6 flex-1">{product.tagline}</p>
							<span className="inline-flex items-center gap-1.5 text-xs font-mono text-(--brand) group-hover:gap-3">
								View products
								<ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
							</span>
						</TrackedLink>
					))}
				</div>
			</div>
		</section>
	)
}
