import { type NextRequest, NextResponse } from 'next/server'

/**
 * Contact form submission — internal API route.
 *
 * Validates and sanitizes input server-side.
 * Stores the submission in-memory for now (plug in your DB/email service here).
 *
 * POST /api/contact
 */

// ---------------------------------------------------------------------------
// Types — plug your DB schema into ContactSubmission
// ---------------------------------------------------------------------------

export type ContactSubmission = {
	id: string           // generated UUID
	name: string
	email: string
	service: string
	companySize: string
	message: string
	/** e.g. IP address, user-agent — omit if privacy-sensitive */
	meta?: {
		userAgent?: string
	}
}

type ContactFormPayload = {
	name: string
	email: string
	service?: string
	companySize?: string
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
// In-memory store (replace with DB call — see comment below)
// ---------------------------------------------------------------------------

/**
 * TO CONNECT YOUR DATABASE:
 *
 * Replace the `submissions.push(entry)` line below with your preferred
 * storage call, for example:
 *
 *   // Prisma
 *   await prisma.contactSubmission.create({ data: entry })
 *
 *   // Supabase
 *   await supabase.from('contact_submissions').insert(entry)
 *
 *   // Resend / email
 *   await resend.emails.send({ to: 'sales@sabako.id', ... })
 *
 * The `ContactSubmission` type above mirrors the expected schema.
 */
const submissions: ContactSubmission[] = []

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
		message: sanitize(raw.message),
	}

	const validationError = validate(payload)
	if (validationError) {
		return NextResponse.json({ error: validationError }, { status: 422 })
	}

	const entry: ContactSubmission = {
		id: crypto.randomUUID(),
		name: payload.name,
		email: payload.email,
		service: payload.service ?? '',
		companySize: payload.companySize ?? '',
		message: payload.message,
		meta: {
			userAgent: req.headers.get('user-agent') ?? undefined,
		},
	}

	// ---- Plug your DB/email service call here ----
	submissions.push(entry)
	// -----------------------------------------------

	// Dev: log to console
	if (process.env.NODE_ENV === 'development') {
		console.log('[contact] New submission:', entry)
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
