import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { WorkSection } from '@/components/home/WorkSection'
import { StatsSection } from '@/components/home/StatsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CtaSection } from '@/components/home/CtaSection'
import { ProductSpotlightBanner } from '@/components/home/ProductSpotlight'
import { getFeaturedAnnouncement } from '@/lib/api/announcements'

export const metadata: Metadata = {
	title: 'SABAKO — Rewrite your business.',
	description:
		'We are an agency that expertise on digital transformation solutions. We build web, mobile, and IoT solutions for ambitious businesses.',
	alternates: {
		canonical: 'https://sabako.id',
	},
}

export default async function HomePage() {
	const announcement = await getFeaturedAnnouncement()

	return (
		<>
			<HeroSection />
			{announcement && <ProductSpotlightBanner announcement={announcement} />}
			<StatsSection />
			<ServicesSection />
			<WorkSection />
			{/* <TestimonialsSection /> */}
			<CtaSection />
		</>
	)
}
