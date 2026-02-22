import * as admin from 'firebase-admin'

if (!admin.apps.length) {
	try {
		// Initialize Firebase Admin with credentials from environment variables.
		// Required ENV vars:
		// - FIREBASE_PROJECT_ID
		// - FIREBASE_CLIENT_EMAIL
		// - FIREBASE_PRIVATE_KEY (note: make sure to handle escaped newlines \\n -> \n)

		const privateKey = process.env.FIREBASE_PRIVATE_KEY
			? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
			: undefined

		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: process.env.FIREBASE_PROJECT_ID,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				privateKey: privateKey,
			}),
		})
	} catch (error) {
		console.error('Firebase Admin initialization error', error)
	}
}

export const db = admin.firestore()
export const adminAuth = admin.auth()
