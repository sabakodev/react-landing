'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Globe, Smartphone, Cpu } from 'lucide-react'
import clsx from 'clsx'
import { useButtonTracking } from '@/lib/analytics/useButtonTracking'

type ServiceItem = {
	label: string
	href: string
	description: string
	icon: React.ReactNode
}

type NavItem = {
	label: string
	href?: string
	children?: ServiceItem[]
}

const services: ServiceItem[] = [
	{
		label: 'Digital Experiences',
		href: '/services/web',
		description: 'Websites, Web Apps & SaaS Platforms',
		icon: <Globe size={16} />,
	},
	{
		label: 'Mobile Products',
		href: '/services/mobile',
		description: 'iOS, Android & Cross-platform Apps',
		icon: <Smartphone size={16} />,
	},
	{
		label: 'Connected Systems',
		href: '/services/iot',
		description: 'Smart Devices & Embedded Systems',
		icon: <Cpu size={16} />,
	},
]

const navItems: NavItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Services', children: services },
	{ label: 'Work', href: '/work' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact', href: '/contact' },
]

export function Navbar() {
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const pathname = usePathname()
	const dropdownRef = useRef<HTMLLIElement>(null)
	const track = useButtonTracking()

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 40)
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Close menu on route change
	useEffect(() => {
		/* eslint-disable react-hooks/set-state-in-effect */
		setMenuOpen(false)
		setDropdownOpen(false)
		/* eslint-enable react-hooks/set-state-in-effect */
	}, [pathname])

	// Close dropdown on outside click
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [])

	// Lock scroll when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : ''
		return () => { document.body.style.overflow = '' }
	}, [menuOpen])

	const isActive = (href: string) =>
		href === '/' ? pathname === '/' : pathname.startsWith(href)

	return (
		<>
			<header
				className={clsx(
					'w-full transition-all duration-300 border-b',
					scrolled
						? 'border-(--border) bg-(--bg)/75 backdrop-blur-xl'
						: 'border-transparent bg-transparent',
				)}
			>
				<nav
					className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8"
					aria-label="Main navigation"
				>
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center gap-2.5 group"
						aria-label="SABAKO home"
						onClick={track('SABAKO Logo', 'navbar')}
					>
						<Image
							src="/sabako-light.svg"
							alt="SABAKO logo"
							width={32}
							height={32}
							className="h-7 w-7 hidden dark:block"
						/>
						<Image
							src="/sabako-dark.svg"
							alt="SABAKO logo"
							width={32}
							height={32}
							className="h-7 w-7 block dark:hidden"
						/>
						<span className="text-lg font-bold tracking-tight font-mono text-(--text) group-hover:text-(--brand) transition-colors">
							SABAKO
						</span>
					</Link>

					{/* Desktop Nav */}
					<ul className="hidden lg:flex items-center gap-1" role="list">
						{navItems.map((item) =>
							item.children ? (
								<li key={item.label} className="relative" ref={dropdownRef}>
									<button
										id="services-menu-button"
										aria-haspopup="true"
										aria-expanded={dropdownOpen}
										onClick={() => setDropdownOpen((v) => !v)}
										className={clsx(
											'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
											'text-(--text-muted) hover:text-(--text)',
										)}
									>
										{item.label}
										<ChevronDown
											size={14}
											className={clsx('transition-transform duration-200', dropdownOpen && 'rotate-180')}
										/>
									</button>

									{/* Dropdown */}
									{dropdownOpen && (
										<div
											role="menu"
											aria-labelledby="services-menu-button"
											className={clsx(
												'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72',
												'border border-(--border) bg-(--bg)',
												'shadow-lg shadow-black/5',
												'animate-fade-up',
											)}
										>
											{services.map((service) => (
												<Link
													key={service.href}
													href={service.href}
													role="menuitem"
													onClick={track(service.label, 'navbar-services-dropdown')}
													className={clsx(
														'flex items-start gap-3 px-4 py-3',
														'text-(--text-muted) hover:text-(--text) hover:bg-(--bg-subtle)',
														'border-b border-(--border) last:border-b-0',
														'transition-colors group',
													)}
												>
													<span className="mt-0.5 text-(--brand) shrink-0">
														{service.icon}
													</span>
													<span>
														<span className="block text-sm font-medium text-(--text) group-hover:text-(--brand) transition-colors">
															{service.label}
														</span>
														<span className="block text-xs text-(--text-subtle) mt-0.5">
															{service.description}
														</span>
													</span>
												</Link>
											))}
										</div>
									)}
								</li>
							) : (
								<li key={item.label}>
									<Link
										href={item.href!}
										onClick={track(item.label, 'navbar')}
										className={clsx(
											'px-3 py-2 text-sm font-medium transition-colors block',
											isActive(item.href!)
												? 'text-(--text)'
												: 'text-(--text-muted) hover:text-(--text)',
										)}
									>
										{item.label}
									</Link>
								</li>
							),
						)}
					</ul>

					{/* Desktop CTA */}
					<div className="hidden lg:flex items-center gap-4">
						<Link
							href="/contact"
							id="nav-cta-button"
							onClick={track('Start a Project', 'navbar-cta')}
							className={clsx(
								'px-4 py-2 text-sm font-medium',
								'bg-(--text) text-(--bg)',
								'hover:opacity-80 transition-opacity',
							)}
						>
							Start a Project
						</Link>
					</div>

					{/* Mobile Hamburger */}
					<button
						id="mobile-menu-toggle"
						onClick={() => setMenuOpen((v) => !v)}
						className="lg:hidden p-2 text-(--text-muted) hover:text-(--text) transition-colors"
						aria-label={menuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={menuOpen}
					>
						{menuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</nav>
			</header>

			{/* Mobile Menu */}
			<div
				className={clsx(
					'fixed inset-0 z-40 lg:hidden transition-all duration-300',
					menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
				)}
			>
				{/* Backdrop */}
				<div
					className="absolute inset-0 bg-black/40 backdrop-blur-xs"
					onClick={() => setMenuOpen(false)}
				/>
				{/* Panel */}
				<div
					className={clsx(
						'absolute top-0 right-0 h-full w-full max-w-sm border-l border-(--border)',
						'bg-(--bg) flex flex-col',
						'transition-transform duration-300',
						menuOpen ? 'translate-x-0' : 'translate-x-full',
					)}
				>
					<div className="flex items-center justify-between px-6 h-16 border-b border-(--border)">
						<span className="text-sm font-mono font-bold text-(--text)">Navigation</span>
						<button
							onClick={() => setMenuOpen(false)}
							className="p-2 text-(--text-muted) hover:text-(--text)"
							aria-label="Close menu"
						>
							<X size={20} />
						</button>
					</div>
					<nav className="flex-1 overflow-y-auto py-6 px-6" aria-label="Mobile navigation">
						<ul className="space-y-1" role="list">
							{navItems.map((item) =>
								item.children ? (
									<li key={item.label} className="pt-3">
										<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) mt-6 mb-2 first:mt-0">
											{item.label}
										</p>
										{item.children.map((child) => (
											<Link
												key={child.href}
												href={child.href}
												onClick={track(child.label, 'mobile-navbar-services')}
												className={clsx(
													'flex items-start gap-3 py-3 border-b border-(--border)',
													'text-(--text-muted) hover:text-(--text) transition-colors',
												)}
											>
												<span className="mt-0.5 text-(--brand)">{child.icon}</span>
												<span>
													<span className="block text-sm font-medium text-(--text)">
														{child.label}
													</span>
													<span className="block text-xs text-(--text-subtle)">
														{child.description}
													</span>
												</span>
											</Link>
										))}
									</li>
								) : (
									<li key={item.label}>
										<Link
											href={item.href!}
											onClick={track(item.label, 'mobile-navbar')}
											className={clsx(
												'flex items-center justify-between py-3 border-b border-(--border)',
												'text-sm font-medium transition-colors',
												isActive(item.href!)
													? 'text-(--text)'
													: 'text-(--text-muted) hover:text-(--text)',
											)}
										>
											{item.label}
										</Link>
									</li>
								),
							)}
						</ul>
					</nav>
					<div className="px-6 py-6 border-t border-(--border)">
						<Link
							href="/contact"
							onClick={track('Start a Project', 'mobile-navbar-cta')}
							className="block w-full text-center py-3 text-sm font-medium bg-(--text) text-(--bg) hover:opacity-80 transition-opacity"
						>
							Start a Project
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}