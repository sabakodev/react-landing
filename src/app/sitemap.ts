import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/graphql/adapters/posts'
import { getWorks } from '@/lib/graphql/adapters/works'
import { publishedServices, publishedServicesId, serviceHref } from '@/lib/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://sabako.id'

	// hreflang alternates, set identically on each English page and its /id counterpart
	const languages = (enPath: string, idPath: string) => ({
		languages: { en: `${baseUrl}${enPath}`, id: `${baseUrl}${idPath}`, 'x-default': `${baseUrl}${enPath}` },
	})

	// Static routes based on the src/app directory structure.
	// No lastModified: there is no real edit date to report for these.
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			changeFrequency: 'yearly',
			priority: 1.0,
			alternates: languages('', '/id'),
		},
		{
			url: `${baseUrl}/about`,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			changeFrequency: 'yearly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/work`,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/services`,
			changeFrequency: 'monthly',
			priority: 0.8,
			alternates: languages('/services', '/id/services'),
		},
		{
			url: `${baseUrl}/privacy`,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${baseUrl}/terms`,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: `${baseUrl}/bot`,
			changeFrequency: 'yearly',
			priority: 0.5,
		},
	]

	// Service pages — only published catalog entries
	const serviceRoutes: MetadataRoute.Sitemap = publishedServices().map((service) => ({
		url: `${baseUrl}${serviceHref(service)}`,
		changeFrequency: 'monthly',
		priority: 0.7,
		...(service.id ? { alternates: languages(serviceHref(service), serviceHref(service, 'id')) } : {}),
	}))

	// Bahasa Indonesia pages (/id)
	const idRoutes: MetadataRoute.Sitemap = [
		{ url: `${baseUrl}/id`, changeFrequency: 'monthly', priority: 0.9, alternates: languages('', '/id') },
		{ url: `${baseUrl}/id/services`, changeFrequency: 'monthly', priority: 0.8, alternates: languages('/services', '/id/services') },
		...publishedServicesId().map((service): MetadataRoute.Sitemap[number] => ({
			url: `${baseUrl}${serviceHref(service, 'id')}`,
			changeFrequency: 'monthly',
			priority: 0.7,
			alternates: languages(serviceHref(service), serviceHref(service, 'id')),
		})),
	]

	// Fetch dynamic blog posts
	let blogRoutes: MetadataRoute.Sitemap = []
	try {
		const posts = await getPosts()
		blogRoutes = posts.map((post) => ({
			url: `${baseUrl}/blog/${post.slug}`,
			...(post.modified || post.date ? { lastModified: new Date(post.modified || post.date) } : {}),
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
			...(work.modified ? { lastModified: new Date(work.modified) } : {}),
			changeFrequency: 'monthly',
			priority: 0.7,
		}))
	} catch (error) {
		console.error('Failed to fetch works for sitemap:', error)
	}

	return [...staticRoutes, ...serviceRoutes, ...idRoutes, ...workRoutes, ...blogRoutes]
}
