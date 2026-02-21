'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Props = {
	children: ReactNode
	className?: string
	delay?: number
	direction?: 'up' | 'down' | 'left' | 'right' | 'none'
	duration?: number
	once?: boolean
}

const offsets = {
	up: { y: 32 },
	down: { y: -32 },
	left: { x: 32 },
	right: { x: -32 },
	none: {},
}

export function Reveal({
	children,
	className,
	delay = 0,
	direction = 'up',
	duration = 0.5,
	once = true,
}: Props) {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref, { once, margin: '-80px' })

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, ...offsets[direction] }}
			animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] }}
			transition={{
				duration,
				delay,
				ease: [0.21, 0.47, 0.32, 0.98],
			}}
		>
			{children}
		</motion.div>
	)
}
