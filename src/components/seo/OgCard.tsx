/**
 * Social share card rendered by next/og (Satori) for the opengraph-image routes.
 * Uses the bundled default font, so nothing is fetched at build time.
 */

export const OG_SIZE = { width: 1200, height: 630 }

export function OgCard({ eyebrow, headline }: { eyebrow?: string; headline: string }) {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				background: '#ffffff',
				color: '#0a0a0a',
				padding: '72px 80px',
				borderTop: '8px solid #FF5C26',
			}}
		>
			<div style={{ display: 'flex', fontSize: 36, fontWeight: 700, letterSpacing: 4 }}>SABAKO</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{eyebrow && (
					<div style={{ display: 'flex', fontSize: 30, color: '#FF5C26', marginBottom: 20 }}>{eyebrow}</div>
				)}
				<div style={{ display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
					{headline}
				</div>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', fontSize: 26, color: '#525252' }}>
				<div style={{ display: 'flex', width: 48, height: 4, background: '#FF5C26', marginRight: 20 }} />
				sabako.id
			</div>
		</div>
	)
}
