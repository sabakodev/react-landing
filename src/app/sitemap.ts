import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/graphql/adapters/posts'
import { getWorks } from '@/lib/graphql/adapters/works'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://sabako.id'

	// Static routes based on the src/app directory structure
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1.0,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/work`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/services/web`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/services/mobile`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/services/iot`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${baseUrl}/terms`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
	]

	// Fetch dynamic blog posts
	let blogRoutes: MetadataRoute.Sitemap = []
	try {
		const posts = await getPosts()
		blogRoutes = posts.map((post) => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: post.date ? new Date(post.date) : new Date(),
			changeFrequency: 'monthly',
			priority: 0.6,
		}))
	} catch (error) {
		console.error('Failed to fetch posts for sitemap:', error)
	}

	// Fetch dynamic works/portfolio
	let workRoutes: MetadataRoute.Sitemap = []
	try {
		const works = await getWorks()
		workRoutes = works.map((work) => ({
			url: `${baseUrl}/work/${work.slug}`,
			lastModified: work.year ? new Date(work.year) : new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		}))
	} catch (error) {
		console.error('Failed to fetch works for sitemap:', error)
	}

	return [...staticRoutes, ...workRoutes, ...blogRoutes]
}
