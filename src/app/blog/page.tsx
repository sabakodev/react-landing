import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { getPosts } from '@/lib/graphql/adapters/posts'
import { BlogGrid } from '@/components/blog/BlogGrid'

export const metadata: Metadata = {
	title: 'Blog & Insights',
	description:
		'Articles, case studies, and technical insights from the SABAKO team — covering web development, mobile, IoT, and software architecture.',
	alternates: { canonical: 'https://sabako.id/blog' },
	openGraph: { title: 'Blog & Insights — SABAKO', description: 'Technical articles and case studies from SABAKO.' },
}

export const revalidate = 10

const PAGE_SIZE = 6

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric', month: 'long', day: 'numeric',
	})
}

export default async function BlogPage() {
	// First batch: server-rendered for SEO
	const all = await getPosts()
	const [featured, ...rest] = all
	const initialItems = rest.slice(0, PAGE_SIZE - 1)
	const initialCursor = initialItems.length ? initialItems[initialItems.length - 1].slug : null
	const initialHasMore = rest.length > PAGE_SIZE - 1

	return (
		<article>
			<header className="border-b border-(--border) pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-(--brand) mb-4">
						Blog &amp; Insights
					</p>
					<h1 className="text-5xl font-bold text-(--text) max-w-2xl leading-tight">
						Thinking out loud.
					</h1>
					<p className="mt-4 text-lg text-(--text-muted) max-w-xl">
						Technical articles, case studies, and perspectives from our team.
					</p>
				</div>
			</header>

			<section className="py-16" aria-label="Blog posts">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					{!featured ? (
						<p className="py-8 text-(--text-subtle) font-mono text-sm text-center">
							No articles published yet — check back soon.
						</p>
					) : (
						<>
							{/* Featured post — always server-rendered */}
							<Link
								href={`/blog/${featured.slug}`}
								className="group block border border-(--border) p-8 mb-12 hover:border-(--border-strong) hover:bg-(--bg-subtle) transition-colors"
							>
								<div className="flex items-center gap-3 mb-4">
									<span className="text-xs font-mono px-2 py-0.5 border border-(--brand) text-(--brand)">
										{featured.category}
									</span>
									<span className="text-xs font-mono text-(--text-subtle) uppercase tracking-widest">
										Featured
									</span>
								</div>
								<h2 className="text-2xl font-bold text-(--text) group-hover:text-(--brand) transition-colors mb-3 max-w-2xl">
									{featured.title}
								</h2>
								<p className="text-(--text-muted) text-sm leading-relaxed max-w-xl mb-6 line-clamp-2" dangerouslySetInnerHTML={{ __html: featured.excerpt }} />
								<div className="flex items-center gap-4 text-xs text-(--text-subtle)">
									<span className="flex items-center gap-1.5">
										<Calendar size={12} />
										{formatDate(featured.date)}
									</span>
									{/* <span className="flex items-center gap-1.5">
										<User size={12} />
										{featured.author}
									</span> */}
									<span className="flex items-center gap-1.5 text-(--brand) ml-auto group-hover:gap-2.5 transition-all font-mono">
										Read Article <ArrowRight size={12} />
									</span>
								</div>
							</Link>

							{/* Infinite scroll grid — remaining posts */}
							<BlogGrid
								initialItems={initialItems}
								initialCursor={initialCursor}
								initialHasMore={initialHasMore}
								pageSize={PAGE_SIZE}
							/>
						</>
					)}
				</div>
			</section>
		</article>
	)
}
