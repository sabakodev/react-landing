import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { WorkSection } from '@/components/home/WorkSection'
import { StatsSection } from '@/components/home/StatsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CtaSection } from '@/components/home/CtaSection'
import { ProductSpotlightBanner } from '@/components/home/ProductSpotlight'
import { ProductsStrip } from '@/components/home/ProductsStrip'
import { ClientLogoStrip } from '@/components/work/ClientLogoStrip'
import { getFeaturedAnnouncement } from '@/lib/api/announcements'
import { SITE_DESCRIPTION } from '@/lib/seo/jsonld'
import { HOME_TITLE, localeAlternates, pageMetadata } from '@/lib/seo/metadata'
import { serviceSummaries } from '@/lib/services'

export const metadata: Metadata = {
	// absolute: the title already names the brand, so the "| SABAKO" template is skipped
	...pageMetadata({ title: { absolute: HOME_TITLE }, description: SITE_DESCRIPTION, path: '' }),
	alternates: localeAlternates('en', '', '/id'),
}

export default async function HomePage() {
	const announcement = await getFeaturedAnnouncement()
	const services = serviceSummaries()

	return (
		<>
			<HeroSection services={services} />
			<ClientLogoStrip label="Trusted by teams at" />
			{announcement && <ProductSpotlightBanner announcement={announcement} />}
			<StatsSection />
			<ServicesSection services={services} />
			<ProductsStrip />
			<WorkSection />
			{/* <TestimonialsSection /> */}
			<CtaSection />
		</>
	)
}
