import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

/**
 * Contact form submission — internal API route.
 *
 * Validates and sanitizes input server-side.
 * Stores the submission in Firestore.
 *
 * POST /api/contact
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContactSubmission = {
	id: string           // generated UUID
	name: string
	email: string
	message: string
	segment: {
		service: string
		companySize: string
		preference: string
	}
	/** e.g. IP address, user-agent — omit if privacy-sensitive */
	meta?: {
		userAgent?: string
		ipAddress?: string
		country?: string
		city?: string
	}
}

type ContactFormPayload = {
	name: string
	email: string
	service?: string
	companySize?: string
	preference?: string
	message: string
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function sanitize(value: unknown): string {
	if (typeof value !== 'string') return ''
	// Strip leading/trailing whitespace and basic HTML
	return value.trim().replace(/<[^>]*>/g, '').slice(0, 2000)
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(payload: ContactFormPayload): string | null {
	if (!payload.name || payload.name.length < 2) return 'Name must be at least 2 characters.'
	if (!payload.email || !isValidEmail(payload.email)) return 'A valid email address is required.'
	if (!payload.message || payload.message.length < 10) return 'Message must be at least 10 characters.'
	return null
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
	let body: unknown
	try {
		body = await req.json()
	} catch {
		return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
	}

	const raw = body as Record<string, unknown>

	const payload: ContactFormPayload = {
		name: sanitize(raw.name),
		email: sanitize(raw.email),
		service: sanitize(raw.service),
		companySize: sanitize(raw.companySize),
		preference: sanitize(raw.preference),
		message: sanitize(raw.message),
	}

	const validationError = validate(payload)
	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 422 })
	}

	const ip = req.headers.get('cf-connecting-ip') ?? (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0].trim()

	const entry: ContactSubmission = {
		id: crypto.randomUUID(),
		name: payload.name,
		email: payload.email,
		message: payload.message,
		segment: {
			service: payload.service ?? '',
			companySize: payload.companySize ?? '',
			preference: payload.preference ?? '',
		},
		meta: {
			userAgent: req.headers.get('user-agent') ?? '',
			ipAddress: ip,
			country: req.headers.get('x-vercel-ip-country') ?? '',
			city: req.headers.get('x-vercel-ip-city') ?? '',
		},
	}

	try {
		// Save submission to Firestore
		await db.collection('contact_submissions').doc(entry.id).set({
			...entry,
			createdAt: new Date()
		})
	} catch (error) {
		console.error('Failed to save to Firestore:', error)
		return NextResponse.json(
			{ error: 'Failed to submit form. Please try again later.' },
			{ status: 500 }
		)
	}

	return NextResponse.json(
		{ success: true, id: entry.id },
		{ status: 201 },
	)
}

/** Only POST is supported */
export async function GET() {
	return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
