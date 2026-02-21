'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import react-leaflet to avoid SSR issues
const MapContainer = dynamic(
	() => import('react-leaflet').then((m) => m.MapContainer),
	{ ssr: false },
)
const TileLayer = dynamic(
	() => import('react-leaflet').then((m) => m.TileLayer),
	{ ssr: false },
)
const Marker = dynamic(
	() => import('react-leaflet').then((m) => m.Marker),
	{ ssr: false },
)
const Popup = dynamic(
	() => import('react-leaflet').then((m) => m.Popup),
	{ ssr: false },
)

// SABAKO Office — Jl. Bangka Raya No. 48, Mampang Prapatan, Jakarta
const OFFICE_LAT = -6.2487
const OFFICE_LNG = 106.8148

export default function OfficeMap() {
	// Fix Leaflet default icon path in Next.js
	useEffect(() => {
		// Dynamic import avoids both SSR and the require lint rule
		import('leaflet').then((L) => {
			// @ts-expect-error: _getIconUrl is not in the type definitions
			delete L.Icon.Default.prototype._getIconUrl
			L.Icon.Default.mergeOptions({
				iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
				iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
				shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
			})
		})
	}, [])

	return (
		<div className="relative z-0 w-full h-[400px] border border-(--border) overflow-hidden">
			{/* Leaflet CSS */}
			<link
				rel="stylesheet"
				href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
				crossOrigin=""
			/>
			<MapContainer
				center={[OFFICE_LAT, OFFICE_LNG]}
				zoom={16}
				style={{ width: '100%', height: '100%' }}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[OFFICE_LAT, OFFICE_LNG]}>
					<Popup>
						<strong>SABAKO</strong>
						<br />
						Jl. Bangka Raya No. 48
						<br />
						Mampang Prapatan 12720
						<br />
						Jakarta, Indonesia
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}
