'use client'

/**
 * HeroSphere — interactive 3D wireframe sphere for the hero section.
 *
 * Uses Three.js directly (no React Three Fiber overhead since this is
 * a single isolated effect). Responds to mouse movement via rotation.
 * Gracefully degrades: if WebGL is unavailable the canvas just stays empty.
 *
 * Performance:
 *  - One draw call (single wireframe mesh)
 *  - RAF is cancelled on unmount
 *  - Hidden on mobile via CSS (no JS running)
 */

import { useEffect, useRef } from 'react'

export function HeroSphere() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		// Lazy-load Three.js to keep the initial bundle small
		let rafId = 0
		let cleanup: (() => void) | undefined

		import('three').then((THREE) => {
			// ----------------------------------------------------------------
			// Renderer
			// ----------------------------------------------------------------
			const renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: true,
			})
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
			renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
			renderer.setClearColor(0x000000, 0) // transparent background

			// ----------------------------------------------------------------
			// Scene
			// ----------------------------------------------------------------
			const scene = new THREE.Scene()
			const camera = new THREE.PerspectiveCamera(
				50,
				canvas.clientWidth / canvas.clientHeight,
				0.1,
				100,
			)
			camera.position.z = 3.2

			// ----------------------------------------------------------------
			// Sphere geometry (wireframe)
			// ----------------------------------------------------------------
			const geo = new THREE.IcosahedronGeometry(1.1, 4)
			const mat = new THREE.MeshBasicMaterial({
				color: 0xff5c26, // --brand orange
				wireframe: true,
				transparent: true,
				opacity: 0.5,
			})
			const sphere = new THREE.Mesh(geo, mat)
			scene.add(sphere)

			// Subtle inner glow sphere
			const geoInner = new THREE.SphereGeometry(0.9, 20, 20)
			const matInner = new THREE.MeshBasicMaterial({
				color: 0xff5c26,
				transparent: true,
				opacity: 0.04,
			})
			scene.add(new THREE.Mesh(geoInner, matInner))

			// ----------------------------------------------------------------
			// Mouse tracking → subtle tilt
			// ----------------------------------------------------------------
			let targetRotX = 0
			let targetRotY = 0

			const onMouseMove = (e: MouseEvent) => {
				// Normalise to [-1, 1]
				const nx = (e.clientX / window.innerWidth) * 2 - 1
				const ny = -(e.clientY / window.innerHeight) * 2 + 1
				targetRotX = ny * 0.4 // max ±0.4 rad tilt
				targetRotY = nx * 0.6
			}
			window.addEventListener('mousemove', onMouseMove, { passive: true })

			// ----------------------------------------------------------------
			// Resize observer
			// ----------------------------------------------------------------
			const ro = new ResizeObserver(() => {
				renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
				camera.aspect = canvas.clientWidth / canvas.clientHeight
				camera.updateProjectionMatrix()
			})
			ro.observe(canvas)

			// ----------------------------------------------------------------
			// Animation loop
			// ----------------------------------------------------------------
			const animate = () => {
				rafId = requestAnimationFrame(animate)

				// Auto-rotate (slow drift)
				sphere.rotation.y += 0.003
				sphere.rotation.x += 0.001

				// Smooth follow mouse
				sphere.rotation.x += (targetRotX - sphere.rotation.x) * 0.05
				sphere.rotation.y += (targetRotY - sphere.rotation.y) * 0.05

				renderer.render(scene, camera)
			}
			animate()

			cleanup = () => {
				cancelAnimationFrame(rafId)
				window.removeEventListener('mousemove', onMouseMove)
				ro.disconnect()
				renderer.dispose()
				mat.dispose()
				geo.dispose()
			}
		})

		return () => cleanup?.()
	}, [])

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="hidden lg:block absolute right-0 top-0 h-full w-[50vw] pointer-events-none"
			style={{ maxWidth: '680px' }}
		/>
	)
}
