import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Navbar } from '@/components/global/Navbar'
import { Footer } from '@/components/global/Footer'
import { CloudflareAnalytics } from '@/components/analytics/CloudflareAnalytics'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { CookieConsentBanner } from '@/components/analytics/CookieConsentBanner'
import { ProductSpotlightPill } from '@/components/home/ProductSpotlight'
import { getFeaturedAnnouncement } from '@/lib/api/announcements'

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
	description:
		'We are an agency that expertise on digital transformation solutions. We build web, mobile, and IoT solutions for ambitious businesses.',
	keywords: [
		'IT agency',
		'web development',
		'app development',
		'IoT solutions',
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
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://sabako.id',
		siteName: 'SABAKO',
		title: 'SABAKO — Transform your business experience',
		description:
			'We are an agency that expertise on digital transformation solutions. We build web, mobile, and IoT solutions for ambitious businesses.',
		images: [
			{
				url: '/sky.jpg',
				width: 1200,
				height: 630,
				alt: 'SABAKO — IT Agency & Consulting',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'SABAKO — Evolution of Digital Experiences',
		description:
			'We are an agency that expertise on digital transformation solutions. We build web, mobile, and IoT solutions for ambitious businesses.',
		images: ['/sky.jpg'],
		creator: '@	',
	},
	icons: {
		icon: '/sabako-bimi.svg',
		shortcut: '/sabako-bimi.svg',
		apple: '/sabako-bimi.svg',
	},
}

async function SpotlightBar() {
	const announcement = await getFeaturedAnnouncement()
	if (!announcement) return null
	return <ProductSpotlightPill announcement={announcement} />
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: 'SABAKO',
							url: 'https://sabako.id',
							logo: 'https://sabako.id/sabako-bimi.svg',
							description:
								'We are an agency that expertise on digital transformation solutions. We build web, mobile, and IoT solutions for ambitious businesses.',
							address: {
								'@type': 'PostalAddress',
								streetAddress: 'Jl. Bangka Raya No. 48',
								addressLocality: 'Mampang Prapatan',
								postalCode: '12720',
								addressRegion: 'Jakarta',
								addressCountry: 'ID',
							},
							contactPoint: {
								'@type': 'ContactPoint',
								telephone: '+62 857-6061-6555',
								contactType: 'sales',
								email: 'sales@sabako.id',
							},
							sameAs: [],
						}),
					}}
				/>
				<CloudflareAnalytics />
			</head>
			<body className="flex min-h-screen flex-col antialiased">
				<div className="sticky top-0 z-50">
					<SpotlightBar />
					<Navbar />
				</div>
				<main className="flex-1">{children}</main>
				<Footer />
				<GoogleAnalytics />
				<CookieConsentBanner />
			</body>
		</html>
	)
}
