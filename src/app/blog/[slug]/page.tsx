import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react'
import { BlogPost, getPost, getPosts } from '@/lib/graphql/adapters/posts'

// Allow images from WP CMS domain
export const revalidate = 60

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric', month: 'long', day: 'numeric',
	})
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const params = await props.params
	const post = await getPost(params.slug)
	if (!post) return { title: 'Post Not Found' }

	return {
		title: post.title,
		description: post.excerpt,
		alternates: { canonical: `https://sabako.id/blog/${params.slug}` },
		openGraph: {
			title: `${post.title} — SABAKO Blog`,
			description: post.excerpt,
			type: 'article',
			publishedTime: post.date,
			...(post.coverImage ? { images: [{ url: post.coverImage, alt: post.coverImageAlt }] } : {}),
		},
	}
}

export async function generateStaticParams() {
	try {
		const posts = await getPosts()
		return posts.map((p) => ({ slug: p.slug }))
	} catch {
		return []
	}
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params
	const post = await getPost(params.slug)

	return (
		<article>
			{/* Header */}
			<header className="border-b border-(--border) pt-32 pb-16">
				<div className="mx-auto max-w-3xl px-6 lg:px-8">
					<Link
						href="/blog"
						className="inline-flex items-center gap-1.5 text-xs font-mono text-(--text-subtle) hover:text-(--text) transition-colors mb-8 group"
					>
						<ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
						Back to Blog
					</Link>

					{post && <HeaderSection post={post} />}

					{!post && (
						<h1 className="text-4xl font-bold text-(--text) leading-tight mt-2 mb-6">
							Article not found
						</h1>
					)}
				</div>
			</header>

			{post && <ContentSection post={post} />}

			{/* Bottom nav */}
			<section className="border-t border-(--border) bg-(--bg-subtle) py-16">
				<div className="mx-auto max-w-3xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
					<Link
						href="/blog"
						className="inline-flex items-center gap-1.5 text-sm text-(--text-muted) hover:text-(--text) transition-colors group"
					>
						<ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
						All Articles
					</Link>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 px-6 py-3 bg-(--text) text-(--bg) text-sm font-medium hover:opacity-80 transition-opacity group"
					>
						Start a Project
						<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</section>
		</article>
	)
}

export function HeaderSection({ post }: { post: BlogPost }) {
	return (
		<>
			<div className="flex flex-wrap items-center gap-3 mb-4">
				<span className="text-xs font-mono px-2 py-0.5 border border-(--brand) text-(--brand)">
					{post.category}
				</span>
				{post.tags.slice(0, 3).map((tag) => (
					<span
						key={tag}
						className="text-xs font-mono px-2 py-0.5 border border-(--border) text-(--text-subtle)"
					>
						{tag}
					</span>
				))}
			</div>

			<h1 className="text-4xl font-bold text-(--text) leading-tight mt-2 mb-6">
				{post.title}
			</h1>

			<div className="flex items-center gap-4 text-xs text-(--text-subtle)">
				<span className="flex items-center gap-1.5">
					<Calendar size={12} />
					{formatDate(post.date)}
				</span>
				<span className="flex items-center gap-1.5">
					<Clock size={12} />
					{post.readTime}
				</span>
				{post.author && (
					<span className="font-mono">{post.author}</span>
				)}
			</div>
		</>
	)
}

export function ContentSection({ post }: { post: BlogPost }) {
	return (
		<>
			{/* Featured image */}
			{post.coverImage && (
				<div className="mx-auto max-w-3xl px-6 lg:px-8 mt-10">
					<div className="relative w-full aspect-video overflow-hidden bg-(--bg-subtle)">
						<Image
							src={post.coverImage}
							alt={post.coverImageAlt ?? post.title}
							fill
							className="object-cover"
							priority
							sizes="(max-width: 768px) 100vw, 800px"
						/>
					</div>
				</div>
			)}

			{/* Content — WP HTML rendered */}
			<section className="py-16">
				<div className="mx-auto max-w-3xl px-6 lg:px-8">
					{post.content ? (
						<div
							className="wp-content prose prose-neutral dark:prose-invert max-w-none text-(--text-muted) leading-relaxed"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					) : (
						<p className="text-(--text-subtle) italic">No content available.</p>
					)}
				</div>
			</section>
		</>
	)
}