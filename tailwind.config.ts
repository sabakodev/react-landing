import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'media',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
				mono: ['var(--font-geist-mono)', 'monospace'],
			},
			colors: {
				brand: {
					50: '#f0f4ff',
					100: '#dce6ff',
					200: '#b9ccff',
					300: '#8aaaff',
					400: '#5c84ff',
					500: '#3a5ce8',
					600: '#2a43c9',
					700: '#1e30a0',
					800: '#172281',
					900: '#111868',
					950: '#0a0f40',
				},
			},
			animation: {
				'fade-up': 'fadeUp 0.6s ease forwards',
				'fade-in': 'fadeIn 0.5s ease forwards',
				'slide-in': 'slideIn 0.5s ease forwards',
				'marquee': 'marquee 30s linear infinite',
				'marquee2': 'marquee2 30s linear infinite',
				'blink': 'blink 1.2s step-end infinite',
			},
			keyframes: {
				fadeUp: {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideIn: {
					'0%': { opacity: '0', transform: 'translateX(-16px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				marquee2: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0%)' },
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'grid-light': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/svg%3E\")",
				'grid-dark': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23262626' stroke-width='1'/%3E%3C/svg%3E\")",
			},
		},
	},
	plugins: [],
}
export default config
