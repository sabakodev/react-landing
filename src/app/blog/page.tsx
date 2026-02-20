import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getPosts } from '@/lib/api/posts'

export const metadata: Metadata = {
	title: 'Blog & Insights',
	description:
		'Articles, case studies, and technical insights from the SABAKO team — covering web development, mobile, IoT, and software architecture.',
	alternates: { canonical: 'https://sabako.id/blog' },
	openGraph: { title: 'Blog & Insights — SABAKO', description: 'Technical articles and case studies from SABAKO.' },
}


function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric', month: 'long', day: 'numeric',
	})
}

export default async function BlogPage() {
	const posts = await getPosts()
	const [featured, ...rest] = posts

	return (
		<article>
			<header className="border-b border-[var(--border)] pt-32 pb-16">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<p className="text-xs font-mono uppercase tracking-widest text-[var(--brand)] mb-4">
						Blog & Insights
					</p>
					<h1 className="text-5xl font-bold text-[var(--text)] max-w-2xl leading-tight">
						Thinking out loud.
					</h1>
					<p className="mt-4 text-lg text-[var(--text-muted)] max-w-xl">
						Technical articles, case studies, and perspectives from the SABAKO team.
					</p>
				</div>
			</header>

			<section className="py-16" aria-label="Blog posts">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">

					{/* Featured post */}
					<Link
						href={`/blog/${featured.slug}`}
						className="group block border border-[var(--border)] p-8 mb-12 hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)] transition-colors"
					>
						<div className="flex items-center gap-3 mb-4">
							<span className="text-xs font-mono px-2 py-0.5 border border-[var(--brand)] text-[var(--brand)]">
								{featured.category}
							</span>
							<span className="text-xs font-mono text-[var(--text-subtle)] uppercase tracking-widest">
								Featured
							</span>
						</div>
						<h2 className="text-2xl font-bold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-3 max-w-2xl">
							{featured.title}
						</h2>
						<p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xl mb-6">
							{featured.excerpt}
						</p>
						<div className="flex items-center gap-4 text-xs text-[var(--text-subtle)]">
							<span className="flex items-center gap-1.5">
								<Calendar size={12} />
								{formatDate(featured.date)}
							</span>
							<span className="flex items-center gap-1.5">
								<Clock size={12} />
								{featured.readTime}
							</span>
							<span className="flex items-center gap-1.5 text-[var(--brand)] ml-auto group-hover:gap-2.5 transition-all font-mono">
								Read Article <ArrowRight size={12} />
							</span>
						</div>
					</Link>

					{/* Post grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
						{rest.map((post) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								className="bg-[var(--bg)] p-6 flex flex-col group hover:bg-[var(--bg-subtle)] transition-colors"
							>
								<h2 className="text-base font-bold text-[var(--text)] group-hover:text-[var(--brand)] transition-colors mb-3 leading-snug">
									{post.title}
								</h2>
								<p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-4">
									{post.excerpt}
								</p>
								<div className="flex items-center gap-3 text-xs text-[var(--text-subtle)] mt-auto">
									<span className="font-mono text-[var(--brand)] border border-[var(--brand)] px-1.5 py-0.5">{post.category}</span>
									<span className="flex items-center gap-1">
										<Calendar size={10} />
										{formatDate(post.date)}
									</span>
									<span className="flex items-center gap-1">
										<Clock size={10} />
										{post.readTime}
									</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</article>
	)
}
