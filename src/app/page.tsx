import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { WorkSection } from '@/components/home/WorkSection'
import { StatsSection } from '@/components/home/StatsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CtaSection } from '@/components/home/CtaSection'
import { ProductSpotlightBanner } from '@/components/home/ProductSpotlight'
import { getFeaturedAnnouncement } from '@/lib/api/announcements'
import { SITE_DESCRIPTION } from '@/lib/seo/jsonld'
import { localeAlternates } from '@/lib/seo/metadata'
import { serviceSummaries } from '@/lib/services'

export const metadata: Metadata = {
	title: 'SABAKO — Rewrite your business.',
	description: SITE_DESCRIPTION,
	alternates: localeAlternates('en', '', '/id'),
}

export default async function HomePage() {
	const announcement = await getFeaturedAnnouncement()
	const services = serviceSummaries()

	return (
		<>
			<HeroSection services={services} />
			{announcement && <ProductSpotlightBanner announcement={announcement} />}
			<StatsSection />
			<ServicesSection services={services} />
			<WorkSection />
			{/* <TestimonialsSection /> */}
			<CtaSection />
		</>
	)
}
