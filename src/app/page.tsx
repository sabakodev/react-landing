import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { WorkSection } from '@/components/home/WorkSection'
import { StatsSection } from '@/components/home/StatsSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CtaSection } from '@/components/home/CtaSection'

export const metadata: Metadata = {
	title: 'SABAKO — Digital Experiences. Mobile Products. Connected Systems.',
	description:
		'SABAKO is a premium IT agency & consulting firm that builds transformative web, mobile, and IoT solutions for ambitious businesses.',
	alternates: {
		canonical: 'https://sabako.id',
	},
}

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<StatsSection />
			<ServicesSection />
			<WorkSection />
			<TestimonialsSection />
			<CtaSection />
		</>
	)
}
