/**
 * Products SABAKO builds and operates. Plain data with no server imports, so
 * client components can use it too. The taglines are the only descriptive copy;
 * do not add feature claims, numbers or pricing here.
 */

export type ProductStatus = 'public' | 'invite-only'

export type Product = {
	id: string
	name: string
	descriptor?: string
	status: ProductStatus
	tagline: string
	cta: { label: string; href: string }
	secondary?: { label: string; href: string }
}

export const PRODUCT_STATUS_LABEL: Record<ProductStatus, string> = {
	public: 'Available on request',
	'invite-only': 'Invite only',
}

export const products: Product[] = [
	{
		id: 'serp',
		name: 'SERP API',
		status: 'public',
		tagline: 'Search engine results, delivered as an API.',
		cta: { label: 'Request API access', href: '/contact?product=serp' },
	},
	{
		id: 'styx',
		name: 'Styx',
		descriptor: 'Crawler-as-a-Service',
		status: 'invite-only',
		tagline: 'Web crawling as a managed service, for teams we work with directly.',
		cta: { label: 'Request access', href: '/contact?product=styx' },
		secondary: { label: 'How our crawler behaves', href: '/bot' },
	},
]
