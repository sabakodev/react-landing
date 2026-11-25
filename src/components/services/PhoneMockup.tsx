'use client'

/**
 * PhoneMockup — three CSS-only phones showing crops of one long app screenshot.
 *
 * From lg up: a tilted group (perspective on the container, rotateX/Y/Z on the
 * group), centre phone forward, side phones behind. The centre screen scrolls
 * the screenshot upward with the page and the group eases its tilt slightly.
 * Below lg: one upright phone, no tilt. Static under prefers-reduced-motion.
 */

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'

const SRC = '/images/services/mobile-app-1.png'
const IMG_W = 430
const IMG_H = 4578
/** The centre screen travels through the first ~900px of the screenshot */
const SCROLL_TRAVEL = `-${((900 / IMG_H) * 100).toFixed(2)}%`
const ALT = 'Screens from a mobile app built by SABAKO: an events feed and venue list'

function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<div
			className={`rounded-[2.75rem] border border-(--border-strong) bg-(--bg-subtle) p-2.5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] ${className}`}
		>
			{/* Screen: fixed 430:932 aspect so the box is reserved before the image loads */}
			<div className="relative aspect-[430/932] overflow-hidden rounded-[2.25rem] bg-black ring-1 ring-(--border)">
				{children}
				{/* Dynamic island */}
				<div className="pointer-events-none absolute left-1/2 top-2.5 h-5 w-[30%] -translate-x-1/2 rounded-full bg-black" />
			</div>
		</div>
	)
}

/** A static crop of the screenshot starting at `offset` (fraction of its height). */
function StaticScreen({ offset }: { offset: number }) {
	return (
		<Image
			src={SRC}
			alt=""
			width={IMG_W}
			height={IMG_H}
			sizes="200px"
			className="absolute inset-x-0 top-0 h-auto w-full"
			style={{ transform: `translateY(-${offset * 100}%)` }}
		/>
	)
}

export function PhoneMockup() {
	const reduceMotion = useReducedMotion()
	const { scrollY } = useScroll()
	const imageY = useTransform(scrollY, [0, 800], ['0%', SCROLL_TRAVEL])
	// Read by the lg-only tilt below; eases the group a few degrees flatter on scroll
	const tilt = useTransform(scrollY, [0, 800], ['0deg', '-8deg'])

	const groupStyle = reduceMotion ? undefined : ({ '--scroll-tilt': tilt } as MotionStyle)

	return (
		<div className="relative mx-auto w-full max-w-[260px] lg:max-w-none lg:h-[600px] lg:[perspective:1800px]">
			<motion.div
				style={groupStyle}
				className="relative lg:absolute lg:inset-0 lg:[transform-style:preserve-3d] lg:[transform:rotateX(calc(28deg_+_var(--scroll-tilt,0deg)))_rotateY(-16deg)_rotateZ(-14deg)]"
			>
				{/* Side phones: decorative, desktop only, behind the centre phone */}
				<div
					aria-hidden="true"
					className="hidden lg:block absolute left-1/2 top-1/2 w-[200px] [transform:translate(-50%,-50%)_translate3d(-190px,30px,-120px)]"
				>
					<PhoneFrame>
						<StaticScreen offset={0.22} />
					</PhoneFrame>
				</div>
				<div
					aria-hidden="true"
					className="hidden lg:block absolute left-1/2 top-1/2 w-[200px] [transform:translate(-50%,-50%)_translate3d(190px,-30px,-120px)]"
				>
					<PhoneFrame>
						<StaticScreen offset={0.62} />
					</PhoneFrame>
				</div>

				{/* Centre phone */}
				<div className="relative w-full lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[240px] lg:[transform:translate(-50%,-50%)_translateZ(40px)]">
					<PhoneFrame>
						<motion.div
							className="absolute inset-x-0 top-0"
							style={reduceMotion ? undefined : { y: imageY }}
						>
							<Image
								src={SRC}
								alt={ALT}
								width={IMG_W}
								height={IMG_H}
								sizes="(min-width: 1024px) 240px, 260px"
								className="h-auto w-full"
							/>
						</motion.div>
					</PhoneFrame>
				</div>
			</motion.div>
		</div>
	)
}
