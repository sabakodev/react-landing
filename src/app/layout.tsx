import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/global/Navbar'
import { Footer } from '@/components/global/Footer'
import { CloudflareAnalytics } from '@/components/analytics/CloudflareAnalytics'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { CookieConsentBanner } from '@/components/analytics/CookieConsentBanner'
import { ProductSpotlightPill } from '@/components/home/ProductSpotlight'
import { getFeaturedAnnouncement } from '@/lib/api/announcements'
import { JsonLd } from '@/components/seo/JsonLd'
import { organization, website, SITE_DESCRIPTION } from '@/lib/seo/jsonld'
import { serviceSummaries } from '@/lib/services'
import { baseOpenGraph, HOME_TITLE, twitterCard } from '@/lib/seo/metadata'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	display: 'swap',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://sabako.id'),
	title: {
		default: 'SABAKO — Digital Experiences. Mobile Products. Connected Systems.',
		template: '%s | SABAKO',
	},
	description: SITE_DESCRIPTION,
	keywords: [
		'IT agency',
		'web development',
		'app development',
		'IoT prototyping',
		'digital agency',
		'connected systems',
		'consulting',
		'SABAKO',
		'Jakarta',
	],
	authors: [{ name: 'SABAKO', url: 'https://sabako.id' }],
	creator: 'SABAKO',
	publisher: 'SABAKO',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: baseOpenGraph,
	twitter: twitterCard(HOME_TITLE, SITE_DESCRIPTION),
	// A config `icons` replaces file-based icons, so the PNG app/apple-icon route is named here (iOS ignores SVG)
	icons: {
		icon: '/sabako-bimi.svg',
		shortcut: '/sabako-bimi.svg',
		apple: { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
	},
}

async function SpotlightBar() {
	const announcement = await getFeaturedAnnouncement()
	if (!announcement) return null
	return <ProductSpotlightPill announcement={announcement} />
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const services = serviceSummaries()
	return (
		<html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<head>
				<JsonLd data={[organization(), website()]} />
				<CloudflareAnalytics />
			</head>
			<body className="flex min-h-screen flex-col antialiased">
				<div className="sticky top-0 z-50">
					<SpotlightBar />
					<Navbar serviceSummaries={services} />
				</div>
				<main className="flex-1">{children}</main>
				<Footer serviceSummaries={services} />
				<GoogleAnalytics />
				<MetaPixel />
				<CookieConsentBanner />
			</body>
		</html>
	)
}
