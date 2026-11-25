import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** PNG apple-touch icon (iOS ignores SVG icons). */
export default function AppleIcon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: '#0a0a0a',
					color: '#FF5C26',
					fontSize: 120,
					fontWeight: 700,
				}}
			>
				S
			</div>
		),
		size,
	)
}
