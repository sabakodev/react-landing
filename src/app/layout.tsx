import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { CardComponent } from '@/components/landing'
import { FooterComponent, NavbarComponent } from '@/components/global'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'SABAKO',
	description: 'Creative Digital Agency',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const navbar = [
		{ href: '/', label: 'HOME' },
		{ href: '/works', label: 'WORKS' },
		{ href: '/clients', label: 'CLIENTS' },
		{ href: '/about', label: 'ABOUT' },
		{ href: '/contact', label: 'CONTACT' },
	]

	const cards = [
		{
			href: '/works',
			title: 'Works',
			description: 'Learn about what we do in our studio.',
		},
		{
			href: '/clients',
			title: 'Clients',
			description: 'Discover who we work for and what we achieve on their projects.',
		},
		{
			href: '/about',
			title: 'About',
			description: 'Get to know who we are and find out our teams.',
		},
		{
			href: '/contact',
			title: 'Contact',
			description: 'Get in touch with us, business inquiries and more.',
		},
	]

	return (
		<html lang="en">
			<body className={`flex min-h-screen flex-col items-center justify-between lg:pb-24 ${inter.className}`}>
				<NavbarComponent links={navbar} />
				<div className="mt-36">
					{children}
				</div>
				<CardComponent cards={cards} />
				<FooterComponent />
			</body>
		</html>
	)
}
