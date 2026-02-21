'use client'

/**
 * ClientLogoStrip — infinite marquee of client logos.
 *
 * Two duplicated sets give seamless looping.
 * Logos are grayscale by default, full-color on hover.
 * Animation pauses on hover so the user can read them.
 */

import Image from 'next/image'
import { clients } from '@/app/(marketing)/clients/_data'

// Build a clean alt label from the filename, e.g. "otabyte.png" → "Otabyte"
function toAltLabel(raw: string) {
	return raw
		.replace(/\.[^.]+$/, '')      // strip extension
		.replace(/[-_]/g, ' ')         // hyphens/underscores → spaces
		.replace(/\b\w/g, (c) => c.toUpperCase()) // title-case
}

export function ClientLogoStrip() {
	return (
		<section
			aria-label="Our clients"
			className="py-12 border-t border-(--border) overflow-hidden"
		>
			<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) text-center mb-8">
				Trusted by leading organisations
			</p>

			{/*
			 * Marquee: two identical sets side by side.
			 * CSS animation scrolls both leftward — when the first set exits,
			 * the second seamlessly takes its place.
			 */}
			<div
				className="flex"
				style={{
					maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
					WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
				}}
			>
				<div
					className="flex items-center gap-12 animate-marquee"
					style={{ animationDuration: '32s' }}
					aria-hidden="false"
				>
					{/* Set A */}
					{clients.map((client) => (
						<div
							key={`a-${client.label}`}
							className="shrink-0 h-8 flex items-center dark:invert dark:hover:invert-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
						>
							<Image
								src={client.image}
								alt={toAltLabel(client.label)}
								height={32}
								style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
							/>
						</div>
					))}
					{/* Set B — duplicate for seamless loop */}
					{clients.map((client) => (
						<div
							key={`b-${client.label}`}
							className="shrink-0 h-8 flex items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
							aria-hidden="true"
						>
							<Image
								src={client.image}
								alt=""
								height={32}
								style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
