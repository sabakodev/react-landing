'use client'

/**
 * ClientLogoStrip — virtualized infinite marquee
 *
 * This version handles images with completely arbitrary, varying widths natively.
 * It strictly creates only enough DOM nodes to fill wide screens and then
 * mechanically recycles off-screen logos to the end, keeping memory footprint static.
 */

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { clients } from '@/app/(marketing)/clients/_data'

function toAltLabel(raw: string) {
	return raw
		.replace(/\.[^.]+$/, '')
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase())
}

export function ClientLogoStrip() {
	const trackRef = useRef<HTMLDivElement>(null)
	const hoverRef = useRef(false)

	useEffect(() => {
		const track = trackRef.current
		if (!track) return

		let animationId: number
		let offset = 0
		const speed = 0.5 // pixels per frame

		const loop = () => {
			if (!hoverRef.current && track.children.length > 0) {
				const firstChild = track.children[0] as HTMLElement

				// Calculate exact pixel width of the first DOM item.
				// Next.js local images load intrinsic aspect-ratios immediately, 
				// so the offsetWidth correctly represents dynamic widths.
				// We add 48px to account for the `gap-12` (3rem) spacing.
				const itemTotalWidth = firstChild.getBoundingClientRect().width + 48

				offset += speed

				// When the item translates exactly its full width out of view, 
				// physically recycle the DOM node to the end.
				if (offset >= itemTotalWidth && itemTotalWidth > 0) {
					offset -= itemTotalWidth
					track.appendChild(firstChild)
				}

				// Apply translation
				track.style.transform = `translate3d(${-offset}px, 0, 0)`
			}
			animationId = requestAnimationFrame(loop)
		}

		animationId = requestAnimationFrame(loop)
		return () => cancelAnimationFrame(animationId)
	}, [])

	return (
		<section
			aria-label="Our clients"
			className="py-12 border-t border-(--border) overflow-hidden"
		>
			<p className="text-xs font-mono uppercase tracking-widest text-(--text-subtle) text-center mb-8">
				Trusted by leading organisations
			</p>

			<div
				className="flex"
				style={{
					maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
					WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
				}}
			>
				<div
					ref={trackRef}
					className="flex items-center gap-12 w-max"
					onMouseEnter={() => (hoverRef.current = true)}
					onMouseLeave={() => (hoverRef.current = false)}
				>
					{/* 
					  We render 3 times the base clients so we have enough DOM nodes to span 
					  even ultrawide 4K monitors before they recycle. Once they scroll past, 
					  the JS loop above recycles their exact DOM nodes to the end without 
					  allocating any new memory. 
					*/}
					{[...clients, ...clients, ...clients].map((client, idx) => (
						<div
							key={`logo-${client.label}-${idx}`}
							className="shrink-0 h-8 flex items-center dark:invert dark:hover:invert-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
						>
							<Image
								src={client.image}
								alt={toAltLabel(client.label)}
								height={32}
								style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
								unoptimized={true} // ensure instantaneous sizing mapping when recycled
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
